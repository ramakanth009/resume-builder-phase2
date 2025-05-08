import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Loading...</p>
      </div>
    );
  }
  
  // Redirect to login if no user exists
  if (!currentUser) {
    // Save the attempted URL for redirecting after login
    sessionStorage.setItem('redirectUrl', location.pathname);
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;