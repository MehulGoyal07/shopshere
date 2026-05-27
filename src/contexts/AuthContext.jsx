/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";

import { signInUser, signOutUser, signUpUser, getCurrentSession, getCurrentUser, onAuthStateChanged } from "../services/authService";

import { fetchUserProfile, createUserProfile, checkUsernameExists, checkEmailExists } from "../services/userService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();

    const {
      data: { subscription },
    } = onAuthStateChanged(async (event, session) => {
      console.log("Auth Event:", event);

      if (event === "SIGNED_IN" && session) {
        await handleUserSession(session.user.id);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const initializeAuth = async () => {
    try {
      const {
        data: { session },
        error,
      } = await getCurrentSession();

      if (error) {
        throw new Error(error.message);
      }

      if (session) {
        await handleUserSession(session.user.id);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Initialize Auth Error:", error.message);
      setLoading(false);
    }
  };
  const handleUserSession = async (userId) => {
    try {
      let profile = await fetchUserProfile(userId);

      if (!profile) {
        const {
          data: { user: authUser },
        } = await getCurrentUser();

        if (authUser) {
          profile = await createUserProfile({
            userId: authUser.id,
            email: authUser.email,
            username: authUser.user_metadata?.username || authUser.email.split("@")[0],
            fullName: authUser.user_metadata?.full_name || authUser.email.split("@")[0],
          });
        }
      }

      setUser(profile);
    } catch (error) {
      console.error("Handle Session Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (fullName, username, email, password) => {
    try {
      setLoading(true);

      const usernameExists = await checkUsernameExists(username);

      if (usernameExists) {
        throw new Error("Username already taken");
      }

      const emailExists = await checkEmailExists(email);

      if (emailExists) {
        throw new Error("Email already registered");
      }

      const { data, error } = await signUpUser(email, password, fullName, username);

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error("User creation failed");
      }
      const profile = await createUserProfile({
        userId: data.user.id,
        email,
        username,
        fullName,
      });

      setUser(profile);

      return profile;
    } catch (error) {
      console.error("Signup Error:", error.message);

      throw error;
    } finally {
      setLoading(false);
    }
  };
  const login = async (email, password) => {
    try {
      setLoading(true);

      const { data, error } = await signInUser(email, password);

      if (error) {
        if (error.message === "Invalid login credentials") {
          throw new Error("Invalid email or password");
        }

        throw new Error(error.message);
      }
      await handleUserSession(data.user.id);
    } catch (error) {
      console.error("Login Error:", error.message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await signOutUser();

      if (error) {
        throw new Error(error.message);
      }

      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error.message);

      throw error;
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
