import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  user: string | null;
  login: (user: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem('user') || null,
  );

  const login = (username: string, password: string): Promise<void> => {
    console.log(username, password);
    return Promise.resolve();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
