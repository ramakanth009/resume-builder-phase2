// src/components/auth/GoogleOAuthButton.jsx
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { initiateGoogleLogin, checkOAuthStatus } from '../../utils/googleAuth';

const GoogleOAuthButton = ({ 
  disabled = false, 
  fullWidth = false, 
  size = 'large',
  variant = 'outlined',
  className = '',
  style = {}
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOAuthEnabled, setIsOAuthEnabled] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  // Check if OAuth is configured on component mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const isEnabled = await checkOAuthStatus();
        setIsOAuthEnabled(isEnabled);
      } catch (error) {
        console.error('Failed to check OAuth status:', error);
        setIsOAuthEnabled(false);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkStatus();
  }, []);

  const handleGoogleLogin = async () => {
    if (disabled || isLoading || !isOAuthEnabled) return;

    try {
      setIsLoading(true);
      initiateGoogleLogin();
    } catch (error) {
      console.error('Error initiating Google login:', error);
      setIsLoading(false);
    }
  };

  // Don't render if OAuth is not configured
  if (isCheckingStatus) {
    return (
      <Box display="flex" justifyContent="center" p={1}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (!isOAuthEnabled) {
    return null;
  }

  return (
    <Button
      className={className}
      style={{
        backgroundColor: '#4285f4',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        fontWeight: 600,
        textTransform: 'none',
        fontSize: size === 'large' ? '1rem' : '0.9rem',
        border: variant === 'outlined' ? '1px solid #4285f4' : 'none',
        ...style,
      }}
      variant={variant}
      fullWidth={fullWidth}
      onClick={handleGoogleLogin}
      disabled={disabled || isLoading}
      startIcon={
        isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <GoogleIcon />
        )
      }
    >
      {isLoading ? 'Signing in...' : 'Continue with Google'}
    </Button>
  );
};

export default GoogleOAuthButton;