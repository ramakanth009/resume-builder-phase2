// import React, { Suspense, useState, useEffect, useMemo } from 'react';
// import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import CssBaseline from '@mui/material/CssBaseline';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import './App.css';

// // Import existing pages and components
// import LandingPage from './pages/landingpage/Landingpage';
// import Signup from './pages/signup/Signup';
// import Navbar from './common/Navbar';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { TemplateProvider } from './contexts/TemplateContext';
// import { FontProvider, useFont } from './contexts/FontContext';
// import { createDynamicTheme } from './theme/dynamicTheme';

// // Lazy load components
// const Login = React.lazy(() => import('./pages/login/Login'));
// const ResumeBuilder = React.lazy(() => import('./pages/ResumeBuilder'));

// // Import new password recovery components
// const ForgotPassword = React.lazy(() => import('./pages/login/ForgotPassword'));
// const ResetPassword = React.lazy(() => import('./pages/login/ResetPassword'));

// // Loading component with spinner
// const LoadingComponent = () => (
//   <Box 
//     display="flex" 
//     justifyContent="center" 
//     alignItems="center" 
//     minHeight="100vh"
//   >
//     <CircularProgress />
//   </Box>
// );

// // ProtectedRoute component
// const ProtectedRoute = ({ children }) => {
//   const { currentUser, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return <LoadingComponent />;
//   }

//   if (!currentUser) {
//     sessionStorage.setItem('redirectUrl', location.pathname);
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// // NavbarWrapper to conditionally render navbar
// const NavbarWrapper = () => {
//   const location = useLocation();
//   const { currentUser } = useAuth();
//   const currentPath = location.pathname;

//   // Add password recovery pages to auth pages list
//   const isAuthPage = ['/login', '/', '/signup', '/forgot-password', '/reset-password'].includes(currentPath);
//   const shouldShowNavbar = currentUser && !isAuthPage;

//   const currentPage = shouldShowNavbar ? 
//     location.pathname.split('/')[1] || 'home' : '';

//   return shouldShowNavbar ? <Navbar currentPage={currentPage} /> : null;
// };

// // ThemedApp component
// const ThemedApp = () => {
//   const [appIsReady, setAppIsReady] = useState(false);
//   const { selectedFont } = useFont();

//   const dynamicTheme = useMemo(() => 
//     createDynamicTheme(selectedFont),
//     [selectedFont]
//   );

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setAppIsReady(true);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!appIsReady) {
//     return <LoadingComponent />;
//   }
  
//   return (
//     <StyledEngineProvider injectFirst>
//       <ThemeProvider theme={dynamicTheme}>
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <CssBaseline />
//           <AuthProvider>
//             <TemplateProvider>
//               <Router>
//                 <NavbarWrapper />
//                 <Suspense fallback={<LoadingComponent />}>
//                   <Routes>
//                     {/* Public routes */}
//                     <Route path="/" element={<LandingPage />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />
                    
//                     {/* Password recovery routes */}
//                     <Route path="/forgot-password" element={<ForgotPassword />} />
//                     <Route path="/reset-password" element={<ResetPassword />} />
                    
//                     {/* Protected routes */}
//                     <Route 
//                       path="/resume-builder" 
//                       element={
//                         <ProtectedRoute>
//                           <ResumeBuilder />
//                         </ProtectedRoute>
//                       } 
//                     />
//                     <Route 
//                       path="/resume-builder/edit/:resumeId" 
//                       element={
//                         <ProtectedRoute>
//                           <ResumeBuilder />
//                         </ProtectedRoute>
//                       } 
//                     />
                    
//                     {/* Catch all route - redirect to home */}
//                     <Route path="*" element={<Navigate to="/" replace />} />
//                   </Routes>
//                 </Suspense>
//               </Router>
//             </TemplateProvider>
//           </AuthProvider>
//         </LocalizationProvider>
//       </ThemeProvider>
//     </StyledEngineProvider>
//   );
// };

// // Main App component
// function App() {
//   return (
//     <FontProvider>
//       <ThemedApp />
//     </FontProvider>
//   );
// }

// export default App;
import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './App.css';

// Import existing pages and components
import LandingPage from './pages/landingpage/Landingpage';
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

  useEffect(() => {
    // Apply font class to body for global font changes
    document.body.className = font || 'font-inter';
  }, [font]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>
          <NavbarWrapper />
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              {/* Public routes */}
              <Route 
                path="/" 
                element={
                  currentUser ? (
                    <Navigate to="/resume-builder" replace />
                  ) : (
                    <LandingPage />
                  )
                } 
              />
              
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
                path="/signup" 
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
            </Routes>
          </Suspense>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
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