import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Reusable Google OAuth Button Component
 * Can be used across different parts of the application
 */
const GoogleOAuthButton = ({ 
  variant = 'outlined',
  size = 'medium',
  fullWidth = true,
  disabled = false,
  children,
  onError,
  sx = {},
  ...props 
}) => {
  const { loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      await loginWithGoogle();
      // Navigation will be handled by OAuth callback
    } catch (error) {
      setIsLoading(false);
      
      // Call error handler if provided
      if (onError) {
        onError(error);
      } else {
        console.error('Google OAuth error:', error);
      }
    }
  };

  const defaultStyles = {
    textTransform: 'none',
    borderColor: '#dadce0',
    color: '#3c4043',
    '&:hover': {
      backgroundColor: '#f8f9fa',
      borderColor: '#dadce0'
    },
    '&:disabled': {
      backgroundColor: '#f8f9fa',
      color: '#5f6368'
    },
    ...sx
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      startIcon={isLoading ? null : <GoogleIcon />}
      onClick={handleGoogleLogin}
      disabled={disabled || isLoading}
      sx={defaultStyles}
      {...props}
    >
      {isLoading ? (
        <>
          Connecting to Google
          <CircularProgress size={20} sx={{ ml: 1 }} />
        </>
      ) : (
        children || 'Continue with Google'
      )}
    </Button>
  );
};

export default GoogleOAuthButton;