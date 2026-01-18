import React, { createContext, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getMe } from "../../redux/slices/authSlice";
import type { RootState } from "../../redux/store";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { user, token, loading } = useAppSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (token && !user) {
      dispatch(getMe());
    }
  }, [dispatch, token, user]);

  const value = {
    isAuthenticated: !!token && !!user,
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
