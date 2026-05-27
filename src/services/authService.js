import { supabase } from "../lib/supabase";

export const signUpUser = async (email, password, fullName, username) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username,
      },
    },
  });
};

export const signInUser = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOutUser = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentSession = async () => {
  return await supabase.auth.getSession();
};

export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

export const onAuthStateChanged = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};
