import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Fade,
  Snackbar,
  Alert,
  Link as MuiLink
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { forgotPassword } from '../../utils/api';
import { useStyles } from './ForgotPassword.styles';
import ForgotPasswordRightSection from './ForgotPasswordRightSection';
import GigaLogo from '../../assets/giga-loogo.svg';

const ForgotPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  // Animation states for features
  const [visibleFeatures, setVisibleFeatures] = useState([]);

  const securityFeatures = [
    "Secure token-based reset",
    "1-hour token expiry",
    "Single-use reset links",
    "Email verification required",
  ];

  // Set up staggered animation for features
  React.useEffect(() => {
    const timer = setTimeout(() => {
      securityFeatures.forEach((_, index) => {
        setTimeout(() => {
          setVisibleFeatures(prev => [...prev, index]);
        }, index * 150);
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear email error when user modifies input
    if (emailError) {
      setEmailError('');
    }
    
    // Reset success state if user modifies email after success
    if (isEmailSent) {
      setIsEmailSent(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email format
    if (!email.trim()) {
      setEmailError('Email address is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setEmailError('');
    
    try {
      const response = await forgotPassword(email.trim().toLowerCase());
      
      if (response && response.status === 'success') {
        setIsEmailSent(true);
        setSnackbar({
          open: true,
          message: 'Password reset instructions sent! Check your email.',
          severity: 'success',
        });
      } else {
        throw new Error(response?.message || 'Failed to send reset email');
      }
    } catch (error) {
      setEmailError(error.message || 'Failed to send reset email. Please try again.');
      setSnackbar({
        open: true,
        message: error.message || 'Failed to send reset email. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleResendEmail = () => {
    setIsEmailSent(false);
    setEmail('');
  };

  return (
    <Box className={classes.root}>
      <Fade in={true} timeout={600}>
        <Box className={classes.leftSection}>
          <Box className={classes.formContainer}>
            <Box className={classes.logoContainer}>
              <img src={GigaLogo} alt="Gigaversity Logo" className={classes.logo} />
              <Typography className={classes.logoText}>
                Gigaversity
              </Typography>
            </Box>
            
            {!isEmailSent ? (
              <>
                <Typography className={classes.welcomeText}>
                  Forgot Password?
                </Typography>
                
                <Typography className={classes.subtitle}>
                  Enter your email address and we'll send you a link to reset your password
                </Typography>
                
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                    className={classes.textField}
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    autoFocus
                  />
                  
                  <Button
                    className={classes.button}
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading || !email.trim()}
                  >
                    {isLoading ? (
                      <>
                        Sending Reset Link
                        <CircularProgress size={20} className={classes.loader} />
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <Box className={classes.successContainer}>
                <Typography className={classes.successIcon}>
                  ✉️
                </Typography>
                
                <Typography className={classes.successTitle}>
                  Check Your Email
                </Typography>
                
                <Typography className={classes.successMessage}>
                  We've sent password reset instructions to:
                </Typography>
                
                <Typography className={classes.emailDisplay}>
                  {email}
                </Typography>
                
                <Typography className={classes.successSubtext}>
                  If you don't see the email, check your spam folder or try again with a different email address.
                </Typography>
                
                <Box className={classes.successActions}>
                  <Button
                    className={classes.resendButton}
                    onClick={handleResendEmail}
                    variant="outlined"
                    fullWidth
                  >
                    Try Different Email
                  </Button>
                  
                  <Typography className={classes.resendText}>
                    Didn't receive the email? Check your spam folder or{' '}
                    <MuiLink
                      component="button"
                      type="button"
                      onClick={handleResendEmail}
                      className={classes.resendLink}
                    >
                      try again
                    </MuiLink>
                  </Typography>
                </Box>
              </Box>
            )}
            
            <Typography className={classes.formDivider}>or</Typography>
            
            <Box className={classes.backToLogin}>
              <Typography className={classes.backText} variant="body2">
                Remember your password?
              </Typography>
              <Button
                className={classes.backButton}
                onClick={navigateToLogin}
                disabled={isLoading}
                fullWidth
              >
                Back to Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
      
      {!isMobile && (
        <ForgotPasswordRightSection
          classes={classes}
          securityFeatures={securityFeatures}
          visibleFeatures={visibleFeatures}
        />
      )}
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} elevation={6} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;