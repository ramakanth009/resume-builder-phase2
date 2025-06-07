// src/pages/auth/OAuthCallback.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    padding: theme.spacing(2),
  },
  content: {
    textAlign: 'center',
    maxWidth: '500px',
    padding: theme.spacing(4),
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  title: {
    color: '#fff',
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  message: {
    color: '#b0b3b8',
    marginBottom: theme.spacing(3),
  },
  loader: {
    color: '#4285f4',
    marginBottom: theme.spacing(2),
  },
  errorAlert: {
    marginTop: theme.spacing(2),
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    color: '#f44336',
    border: '1px solid rgba(211, 47, 47, 0.3)',
  },
  successAlert: {
    marginTop: theme.spacing(2),
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: '#4caf50',
    border: '1px solid rgba(76, 175, 80, 0.3)',
  },
}));

/**
 * OAuth Callback Component
 * Handles the OAuth callback from Google and processes authentication
 */
const OAuthCallback = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOAuthLogin } = useAuth();
  
  const [status, setStatus] = useState('processing'); // 'processing', 'success', 'error'
  const [message, setMessage] = useState('Completing authentication...');
  const [error, setError] = useState('');

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // Extract URL parameters from the callback
        const urlParams = new URLSearchParams(location.search);
        
        // Check for error parameter first
        const errorParam = urlParams.get('error');
        if (errorParam) {
          setStatus('error');
          setError(errorParam);
          setMessage('Authentication failed');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }
        
        // Process OAuth login using AuthContext
        const result = await handleOAuthLogin(urlParams);
        
        if (result.status === 'success') {
          setStatus('success');
          setMessage(`Welcome, ${result.user.name}! Redirecting to your dashboard...`);
          
          // Check for saved redirect URL
          const redirectUrl = sessionStorage.getItem('redirectUrl') || '/resume-builder';
          sessionStorage.removeItem('redirectUrl');
          
          // Redirect after short delay to show success message
          setTimeout(() => {
            navigate(redirectUrl, { replace: true });
          }, 2000);
        } else {
          throw new Error(result.message || 'Authentication failed');
        }
        
      } catch (err) {
        console.error('OAuth callback processing error:', err);
        setStatus('error');
        setError(err.message || 'An unexpected error occurred during authentication');
        setMessage('Authentication failed');
        
        // Redirect to login after showing error
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    processOAuthCallback();
  }, [location.search, handleOAuthLogin, navigate]);

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        {status === 'processing' && (
          <>
            <CircularProgress size={60} className={classes.loader} />
            <Typography variant="h5" className={classes.title}>
              Authenticating...
            </Typography>
            <Typography variant="body1" className={classes.message}>
              {message}
            </Typography>
          </>
        )}
        
        {status === 'success' && (
          <>
            <Typography variant="h5" className={classes.title}>
              Authentication Successful!
            </Typography>
            <Typography variant="body1" className={classes.message}>
              {message}
            </Typography>
            <Alert severity="success" className={classes.successAlert}>
              You have been successfully logged in with Google.
            </Alert>
          </>
        )}
        
        {status === 'error' && (
          <>
            <Typography variant="h5" className={classes.title}>
              Authentication Failed
            </Typography>
            <Typography variant="body1" className={classes.message}>
              {message}
            </Typography>
            <Alert severity="error" className={classes.errorAlert}>
              {error || 'An error occurred during authentication. Please try again.'}
            </Alert>
            <Typography variant="body2" style={{ color: '#b0b3b8', marginTop: '16px' }}>
              Redirecting to login page...
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default OAuthCallback;