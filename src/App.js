import React, { Suspense, useState, useEffect, useMemo } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './App.css';
import ResumeBuilderWithGuard from './pages/ResumeBuilderLogoutGuard';

// Import existing pages and components
// import Landingpage from './pages/landingpage/Landingpage';
import Signup from './pages/signup/Signup';
import Navbar from './common/Navbar';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TemplateProvider } from './contexts/TemplateContext';
import { FontProvider, useFont } from './contexts/FontContext';
import { createDynamicTheme } from './theme/dynamicTheme';

// Lazy load components
const Login = React.lazy(() => import('./pages/login/Login'));
const ResumeBuilder = React.lazy(() => import('./pages/ResumeBuilder'));

// Import password recovery components
const ForgotPassword = React.lazy(() => import('./pages/login/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/login/ResetPassword'));

// Import OAuth callback component
const OAuthCallback = React.lazy(() => import('./components/auth/OAuthCallback'));

// Error Boundary Component for Production
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error in development, suppress in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Application Error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh"
          flexDirection="column"
          sx={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', p: 3 }}
        >
          <h1>Something went wrong</h1>
          <p>Please refresh the page or try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '16px'
            }}
          >
            Refresh Page
          </button>
        </Box>
      );
    }

    return this.props.children;
  }
}

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

  // Add OAuth callback and password recovery pages to auth pages list
  const isAuthPage = [
    '/login', 
    '/', 
    '/signup', 
    '/forgot-password', 
    '/reset-password',
    '/auth/callback'
  ].includes(currentPath);
  
  const shouldShowNavbar = currentUser && !isAuthPage;

  const currentPage = shouldShowNavbar ? 
    location.pathname.split('/')[1] || 'home' : '';

  return shouldShowNavbar ? (
    <Navbar 
      currentPage={currentPage}
      onTemplateClick={() => {}}
      onLoadDummyData={() => {}}
    />
  ) : null;
};

// Main App component wrapped with providers
const AppContent = () => {
  const { font } = useFont();
  const { currentUser } = useAuth();
  
  // Create dynamic theme based on font selection
  const theme = useMemo(() => createDynamicTheme(font), [font]);

  // Get basename from environment for production deployment
  const basename = process.env.PUBLIC_URL || '';

  useEffect(() => {
    // Apply font class to body for global font changes
    document.body.className = font || 'font-inter';
  }, [font]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router basename={basename}>
            <NavbarWrapper />
            <Suspense fallback={<LoadingComponent />}>
              <Routes>
                {/* Public routes */}
                {/* <Route 
                  path="/" 
                  element={
                    currentUser ? (
                      <Navigate to="/resume-builder" replace />
                    ) : (
                      <Landingpage />
                    )
                  } 
                /> */}
                
                <Route 
                  path="/login" 
                  element={
                    currentUser ? (
                      <Navigate to="/resume-builder" replace />
                    ) : (
                      <Login />
                    )
                  } 
                />
                
                <Route 
                  path="/" 
                  element={
                    currentUser ? (
                      <Navigate to="/resume-builder" replace />
                    ) : (
                      <Signup />
                    )
                  } 
                />

                {/* Password recovery routes */}
                <Route 
                  path="/forgot-password" 
                  element={
                    currentUser ? (
                      <Navigate to="/resume-builder" replace />
                    ) : (
                      <ForgotPassword />
                    )
                  } 
                />
                
                <Route 
                  path="/reset-password" 
                  element={
                    currentUser ? (
                      <Navigate to="/resume-builder" replace />
                    ) : (
                      <ResetPassword />
                    )
                  } 
                />

                {/* OAuth callback route */}
                <Route 
                  path="/auth/callback" 
                  element={<OAuthCallback />} 
                />

                {/* Protected routes */}
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

                {/* Catch-all redirect */}
                <Route 
                  path="*" 
                  element={
                    currentUser ? (
                      <Navigate to="/resume-builder" replace />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  } 
                />
                <Route 
  path="/resume-builder" 
  element={
    <ProtectedRoute>
      <ResumeBuilderWithGuard />
    </ProtectedRoute>
  } 
/>
              </Routes>
            </Suspense>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

// Root App component with all providers
const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <TemplateProvider>
          <FontProvider>
            <AppContent />
          </FontProvider>
        </TemplateProvider>
      </AuthProvider>
    </StyledEngineProvider>
  );
};

export default App;