import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.tsx';
import { useSnackbar } from '../context/SnackbarContext.tsx';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { showSnackbar } = useSnackbar();

  if (!isAuthenticated()) {
    showSnackbar('You have to be logged in to access this page');

    return (
      <Navigate to="/auth/login" state={{ from: location }} replace />
    );
  }

  return (
    <>{ children }</>
  );
}

export default ProtectedRoute;
