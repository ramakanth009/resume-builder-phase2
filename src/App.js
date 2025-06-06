import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './App.css';
import LandingPage from './pages/landingpage/LandingPage';
import Navbar from './common/Navbar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TemplateProvider } from './contexts/TemplateContext';
import { FontProvider, useFont } from './contexts/FontContext';
import { createDynamicTheme } from './theme/dynamicTheme';

// Lazy load components
const Login = React.lazy(() => import('./pages/login/Login'));
const ResumeBuilder = React.lazy(() => import('./pages/ResumeBuilder'));

// Loading component with spinner
const LoadingComponent = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingComponent />;
  }

  if (!currentUser) {
    sessionStorage.setItem('redirectUrl', location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
};

// NavbarWrapper to conditionally render navbar
const NavbarWrapper = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const currentPath = location.pathname;

  const isAuthPage = ['/login', '/'].includes(currentPath);
  const shouldShowNavbar = currentUser && !isAuthPage;

  const currentPage = shouldShowNavbar ? location.pathname.split('/')[1] || 'home' : '';

  return shouldShowNavbar ? <Navbar currentPage={currentPage} /> : null;
};

// ThemedApp component
const ThemedApp = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { selectedFont } = useFont();

  const dynamicTheme = useMemo(() => 
    createDynamicTheme(selectedFont),
    [selectedFont]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!appIsReady) {
    return <LoadingComponent />;
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={dynamicTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <AuthProvider>
            <TemplateProvider>
              <Router>
                <NavbarWrapper />
                <Suspense fallback={<LoadingComponent />}>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                      path="/resume-builder" 
                      element={
                        <ProtectedRoute>
                          <ResumeBuilder />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/resume-builder/edit/:resumeId" 
                      element={
                        <ProtectedRoute>
                          <ResumeBuilder />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </Router>
            </TemplateProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

// Main App component
function App() {
  return (
    <FontProvider>
      <ThemedApp />
    </FontProvider>
  );
}

export default App;
