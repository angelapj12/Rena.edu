import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types';

export interface AuthUser extends User {
  // Firebase compatibility
  uid?: string;
  displayName?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  userProfile: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = (userData: User) => {
    const authUser: AuthUser = {
      ...userData,
      uid: userData.firebase_uid,
      displayName: userData.display_name,
    };
    setUser(authUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile: user,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
