import { createContext, useContext, useState, ReactNode } from 'react';

import * as authApi from '../features/auth/auth.api.ts';

import { User, LoginBody } from '../features/auth/auth.model.ts';

type AuthContextType = {
  getUser: () => User | null;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const stringifiedUser = localStorage.getItem('user');
  const [user, setUser] = useState<User | null>(
    stringifiedUser ? JSON.parse(stringifiedUser) : null,
  );

  const getUser = () => {
    if (user) {
      return user;
    }

    const userFromStorage = localStorage.getItem('user');

    if (userFromStorage) {
      return JSON.parse(userFromStorage) as User;
    }

    return null;
  };

  const isAuthenticated = () => !!user;

  const login = async (email: string, password: string): Promise<void> => {
    const loginBody: LoginBody = {
      email,
      password,
    };

    const user = await authApi.login(loginBody);

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ getUser, isAuthenticated, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {{
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}}
