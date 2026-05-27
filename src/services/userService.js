import { supabase } from "../lib/supabase";

export const fetchUserProfile = async (userId) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const checkUsernameExists = async (username) => {
  const { data } = await supabase.from("users").select("username").eq("username", username).maybeSingle();

  return !!data;
};

export const checkEmailExists = async (email) => {
  const { data } = await supabase.from("users").select("email").eq("email", email).maybeSingle();

  return !!data;
};

export const createUserProfile = async ({ userId, email, username, fullName }) => {
  const { data: existingProfile } = await supabase.from("users").select("id").eq("id", userId).maybeSingle();

  if (existingProfile) {
    return existingProfile;
  }

  const { data, error } = await supabase
    .from("users")
    .insert({
      id: userId,
      email,
      username,
      full_name: fullName,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
