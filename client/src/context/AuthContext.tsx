import { createContext, useContext, useState, ReactNode } from 'react';

import * as authApi from '../features/auth/auth.api.ts';

import { User, LoginBody } from '../features/auth/auth.model.ts';

type AuthContextType = {
  user: User | null;
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

  const isAuthenticated = () => !!user;

  const login = (email: string, password: string): Promise<void> => {
    const loginBody: LoginBody = {
      email,
      password,
    };

    return authApi.login(loginBody)
      .then(user => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.removeItem('token');
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
