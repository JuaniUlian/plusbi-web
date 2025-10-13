'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'admin' | 'guest' | null;

interface User {
  email: string;
  type: UserType;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  loginAsGuest: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  isPaidUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  email: 'juanulian@quest.ar',
  password: 'Juani.2025'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('quest_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = { email, type: 'admin' };
      setUser(adminUser);
      localStorage.setItem('quest_user', JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const loginAsGuest = () => {
    const guestUser: User = { email: 'guest@quest.ar', type: 'guest' };
    setUser(guestUser);
    localStorage.setItem('quest_user', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quest_user');
  };

  const isAuthenticated = user !== null;
  const isPaidUser = user?.type === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, loginAsGuest, logout, isAuthenticated, isPaidUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
