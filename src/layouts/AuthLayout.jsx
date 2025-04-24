import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';

/**
 * AuthLayout component
 * Protects routes that require authentication
 * Includes the Navbar for authenticated users
 */
const AuthLayout = () => {
  const { currentUser, loading } = useAuth();
  
  // Show loading state while auth is being checked
  if (loading) {
    return <Loading message="Checking authentication..." />;
  }
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Include Navbar for authenticated users */}
      <Navbar />
      
      {/* Main content area - render child routes */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;