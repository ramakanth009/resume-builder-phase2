import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';

/**
 * PublicLayout component
 * Layout for public routes (login, registration)
 * Redirects to resume builder if already authenticated
 */
const PublicLayout = () => {
  const { currentUser, loading } = useAuth();
  
  // Show loading state while auth is being checked
  if (loading) {
    return <Loading message="Loading..." />;
  }
  
  // Redirect to resume builder if already authenticated
  if (currentUser) {
    return <Navigate to="/resume-builder" replace />;
  }
  
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main content area - render child routes */}
      <Outlet />
    </Box>
  );
};

export default PublicLayout;