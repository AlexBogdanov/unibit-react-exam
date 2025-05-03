import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import { Snackbar } from '@mui/material';

import { useAuth } from './context/AuthContext.tsx';
import { useSnackbar } from './context/SnackbarContext';

import HomePage from './pages/HomePage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import AddBookPage from './pages/AddBookPage';
import NotFoundPage from './pages/NotFoundPage';
import BookPreviewPage from './pages/BookPreviewPage.tsx';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {
  const { isAuthenticated } = useAuth();
  const { message, isOpen, hideSnackbar } = useSnackbar();

  return (
    <>
      <Router>
        <Navbar />
        <div className="layout">
          <Routes>
            {/*Books*/}
            <Route path="/" element={ <HomePage /> } />
            <Route path="/book" element={
              <ProtectedRoute>
                <AddBookPage />
              </ProtectedRoute>
            } />
            <Route path="/book/edit/:id" element={ <>Book Edit</> } />
            <Route path="/book/:id" element={ <BookPreviewPage /> } />

            {/*Auth*/}
            <Route path="/auth/login" element={
              isAuthenticated() ? (
                <Navigate to="/" />
              ) : (
                <LoginPage />
              )
            } />
            <Route path="/auth/register" element={
              isAuthenticated() ? (
                <Navigate to="/" />
              ) : (
                <RegisterPage />
              )
            } />

            <Route path="*" element={ <NotFoundPage /> } />
          </Routes>
        </div>
      </Router>

      <Snackbar
        key="snackbar"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={ message }
        open={ isOpen }
        onClose={ hideSnackbar }
        autoHideDuration={ 5000 }
      />
    </>
  )
}

export default App;
