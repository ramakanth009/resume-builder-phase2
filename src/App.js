import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ResumeBuilder from './pages/ResumeBuilder';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import { AuthProvider } from './contexts/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Simulate checking authentication
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <Loading message="Checking authentication..." />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// NavbarWrapper to get current route for highlighting active tab
const NavbarWrapper = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1] || 'home';
  
  return <Navbar currentPage={currentPage} />;
};

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
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
              
              {/* Redirect any unknown routes to the landing page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;