import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

/**
 * OAuth Callback Component
 * Handles the redirect from backend OAuth and authenticates the user
 */
const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // Parse query parameters from URL
        const urlParams = new URLSearchParams(location.search);
        
        // Extract OAuth data from query parameters
        const oauthData = {
          token: urlParams.get('token'),
          user_id: urlParams.get('user_id'),
          user_name: urlParams.get('user_name'),
          user_email: urlParams.get('user_email'),
          oauth_provider: urlParams.get('oauth_provider'),
          login_method: urlParams.get('login_method'),
          timestamp: urlParams.get('timestamp')
        };

        // Validate required parameters
        if (!oauthData.token || !oauthData.user_id) {
          throw new Error('Invalid OAuth callback: Missing required parameters');
        }

        // Use the URL parameters directly, no API call needed
        localStorage.setItem('token', oauthData.token);
        localStorage.setItem('user', JSON.stringify({
          id: oauthData.user_id,
          name: oauthData.user_name,
          email: oauthData.user_email,
          provider: oauthData.oauth_provider,
          login_method: oauthData.login_method,
          timestamp: oauthData.timestamp
        }));

        setCurrentUser({
          id: oauthData.user_id,
          name: oauthData.user_name,
          email: oauthData.user_email,
          provider: oauthData.oauth_provider,
          login_method: oauthData.login_method,
          timestamp: oauthData.timestamp
        });

        // Get redirect URL from session storage or default to resume builder
        const redirectUrl = sessionStorage.getItem('redirectUrl') || '/resume-builder';
        sessionStorage.removeItem('redirectUrl');
        
        // Navigate to the intended destination
        navigate(redirectUrl, { replace: true });
      } catch (error) {
        console.error('OAuth callback processing failed:', error);
        setError(error.message || 'Authentication failed. Please try again.');
        
        // Navigate to login page after a delay
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    processOAuthCallback();
  }, [location, navigate, setCurrentUser]);

  // Render loading state
  if (isProcessing) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={3}
      >
        <CircularProgress size={48} />
        <Typography variant="h6" color="textSecondary">
          Completing your sign-in...
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please wait while we authenticate your account.
        </Typography>
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={3}
        px={3}
      >
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Authentication Failed
          </Typography>
          <Typography variant="body2">
            {error}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Redirecting to login page...
          </Typography>
        </Alert>
      </Box>
    );
  }

  // This should not render as the component navigates away
  return null;
};

export default OAuthCallback;