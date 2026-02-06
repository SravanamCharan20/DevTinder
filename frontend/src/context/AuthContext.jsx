import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchProfile,
  loginRequest,
  logoutRequest,
  signupRequest,
} from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      const profile = await fetchProfile();
      setUser(profile);
    } catch (error) {
      setUser(null);
    } finally {
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const login = useCallback(
    async (credentials) => {
      await loginRequest(credentials);
      await loadProfile();
    },
    [loadProfile]
  );

  const signup = useCallback(async (payload) => {
    await signupRequest(payload);
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      login,
      logout,
      signup,
      refreshUser: loadProfile,
    }),
    [user, initializing, login, logout, signup, loadProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
