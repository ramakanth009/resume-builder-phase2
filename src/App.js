import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './App.css';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ResumeBuilder from './pages/ResumeBuilder';

// Contexts
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes - no navbar, redirect if authenticated */}
              <Route element={<PublicLayout />}>
                {/* Landing page (Registration) is the root route */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Login page */}
                <Route path="/login" element={<Login />} />
              </Route>
              
              {/* Protected routes - with navbar, require authentication */}
              <Route element={<AuthLayout />}>
                {/* Resume builder route */}
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                
                {/* Add more authenticated routes here */}
              </Route>
              
              {/* Fallback for any unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;