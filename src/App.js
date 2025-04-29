import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ResumeBuilder from './pages/ResumeBuilder';
import Navbar from './common/Navbar';
import Loading from './common/Loading';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TemplateProvider } from './contexts/TemplateContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth(); // Use auth context directly
  
  if (loading) {
    return <Loading message="Checking authentication..." />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// NavbarWrapper to conditionally render navbar
const NavbarWrapper = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const currentPath = location.pathname;
  
  // Only show navbar when user is authenticated and not on auth pages
  const shouldShowNavbar = currentUser && currentPath !== '/' && currentPath !== '/login';
  
  // If we should show navbar, determine which tab should be active
  const currentPage = shouldShowNavbar ? location.pathname.split('/')[1] || 'home' : '';
  
  return shouldShowNavbar ? <Navbar currentPage={currentPage} /> : null;
};

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <TemplateProvider>
            <Router>
              <NavbarWrapper />
              <Routes>
                {/* Landing page (Registration) is the root route */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Login page */}
                <Route path="/login" element={<Login />} />
                
                {/* Protected route for resume builder */}
                <Route 
                  path="/resume-builder" 
                  element={
                    <ProtectedRoute>
                      <ResumeBuilder />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected route for editing existing resume */}
                <Route 
                  path="/resume-builder/edit/:resumeId" 
                  element={
                    <ProtectedRoute>
                      <ResumeBuilder />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Redirect any unknown routes to the landing page */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </TemplateProvider>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;