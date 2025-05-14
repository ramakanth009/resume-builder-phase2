// import React, { Suspense, useState, useEffect } from 'react';
// import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import CssBaseline from '@mui/material/CssBaseline';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import theme from './theme';
// import './App.css';
// import LandingPage from './pages/landingpage/LandingPage';
// import Navbar from './common/Navbar';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import { TemplateProvider } from './contexts/TemplateContext';

// // Lazy load components
// const Login = React.lazy(() => import('./pages/login/Login'));
// const ResumeBuilder = React.lazy(() => import('./pages/ResumeBuilder'));

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
  
//   // Show loading state while checking authentication
//   if (loading) {
//     return <LoadingComponent />;
//   }
  
//   // Redirect to login if no user exists
//   if (!currentUser) {
//     // Save the attempted URL for redirecting after login
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
  
//   // Only show navbar when user is authenticated and not on auth pages
//   const isAuthPage = ['/login', '/'].includes(currentPath);
//   const shouldShowNavbar = currentUser && !isAuthPage;
  
//   // If we should show navbar, determine which tab should be active
//   const currentPage = shouldShowNavbar ? location.pathname.split('/')[1] || 'home' : '';
  
//   return shouldShowNavbar ? <Navbar currentPage={currentPage} /> : null;
// };

// function App() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   // Add this useEffect to ensure we don't render routes until auth is checked
//   useEffect(() => {
//     // Wait a small amount of time to ensure localStorage is checked
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
//       <ThemeProvider theme={theme}>
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <CssBaseline />
//           <AuthProvider>
//             <TemplateProvider>
//               <Router>
//                 <NavbarWrapper />
//                 <Suspense fallback={<LoadingComponent />}>
//                   <Routes>
//                     {/* Landing page (Registration) is the root route */}
//                     <Route path="/" element={<LandingPage />} />
                    
//                     {/* Login page */}
//                     <Route path="/login" element={<Login />} />
                    
//                     {/* Protected route for resume builder */}
//                     <Route 
//                       path="/resume-builder" 
//                       element={
//                         <ProtectedRoute>
//                           <ResumeBuilder />
//                         </ProtectedRoute>
//                       } 
//                     />
                    
//                     {/* Protected route for editing existing resume */}
//                     <Route 
//                       path="/resume-builder/edit/:resumeId" 
//                       element={
//                         <ProtectedRoute>
//                           <ResumeBuilder />
//                         </ProtectedRoute>
//                       } 
//                     />
                    
//                     {/* Redirect any unknown routes to the landing page */}
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
// }

// export default App;
import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
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

// ThemedApp component that uses FontContext and ThemeContext
const ThemedApp = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { selectedFont } = useFont();
  const { themeObject } = useTheme();
  
  // Create a memoized theme that updates when the selected font or theme changes
  const dynamicTheme = useMemo(() => 
    createDynamicTheme(selectedFont, themeObject),
    [selectedFont, themeObject]
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

// Main App component with FontProvider and ThemeProvider
function App() {
  return (
    <FontProvider>
      <CustomThemeProvider>
        <ThemedApp />
      </CustomThemeProvider>
    </FontProvider>
  );
}

export default App;