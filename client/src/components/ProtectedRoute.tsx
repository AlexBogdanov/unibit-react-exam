import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.tsx';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return (
      <Navigate to="/auth/login" />
    );
  }

  return (
    <>{ children }</>
  );
}

export default ProtectedRoute;
