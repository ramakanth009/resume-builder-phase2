import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { useAuth } from '../contexts/AuthContext';
import { Snackbar, Alert } from '@mui/material';

/**
 * LoadingScreen component serves as a transition screen between authentication
 * and the main application. It handles login process and displays inspirational
 * quotes while authentication is in progress.
 */
const LoadingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get the destination and login data from location state
  const destination = location.state?.destination || '/resume-builder';
  const loginData = location.state?.loginData;
  
  // Handle error display
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });
  
  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
    // Redirect to login page if there was an error
    if (error) {
      navigate('/login', { replace: true });
    }
  };
  
  // Custom message based on state
  const getMessage = () => {
    if (error) {
      return 'Login failed. Redirecting back...';
    }
    if (loginData) {
      return 'Logging you in...';
    }
    return 'Getting things ready...';
  };
  
  // Handle login if credentials are provided
  useEffect(() => {
    let timer;
    
    const performLogin = async () => {
      if (loginData) {
        try {
          await login(loginData.email, loginData.password);
          // Successful login - redirect after a brief delay 
          // so user can see the loading screen with quotes
          timer = setTimeout(() => {
            navigate(destination, { replace: true });
          }, 2000);
        } catch (err) {
          setError(err.message || 'Login failed');
          setSnackbar({
            open: true,
            message: err.message || 'Login failed. Please check your credentials.',
            severity: 'error'
          });
        } finally {
          setLoading(false);
        }
      } else {
        // If no login data, just show loading for a moment then redirect
        timer = setTimeout(() => {
          navigate(destination, { replace: true });
        }, 3000);
      }
    };
    
    performLogin();
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [login, loginData, navigate, destination]);
  
  return (
    <>
      <Loading message={getMessage()} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoadingScreen;