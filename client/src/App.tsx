import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import AddBookPage from './pages/AddBookPage';
import NotFoundPage from './pages/NotFoundPage';
import BookDetailsPage from './pages/BookDetailsPage';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute.tsx';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={ <HomePage /> } />

          {/*Auth*/}
          <Route path="/auth/login" element={ <LoginPage /> } />
          <Route path="/auth/register" element={ <RegisterPage /> } />

          {/*Books*/}
          <Route path="/book/add" element={
            <ProtectedRoute>
              <AddBookPage />
            </ProtectedRoute>
          } />
          <Route path="/book/:id" element={ <BookDetailsPage /> } />

          <Route path="*" element={ <NotFoundPage /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App;
