import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Snackbar, Alert, Box, CircularProgress, Typography, Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Loading from './Loading';
import { useAuth } from '../contexts/AuthContext';

// Color palette matching the green theme from reference image
const colors = {
  primary: {
    main: '#0EB582',    // Primary green
    light: '#E6F7F2',   // Light green background
    dark: '#0A8F66',    // Darker green for hover states
  },
  text: {
    primary: '#2E384D',  // Dark text
    secondary: '#6B7A99', // Medium gray text
    light: '#FFFFFF',    // White text
  },
  background: {
    default: '#F5F7FA',  // Light gray background
    paper: '#FFFFFF',    // White background
    overlay: 'rgba(14, 181, 130, 0.05)', // Very light green overlay
  },
  error: '#E63946',      // Error red
};

const useStyles = makeStyles(() => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(14, 181, 130, 0.1)',
    backdropFilter: 'blur(4px)',
    zIndex: 1300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: colors.background.paper,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
    maxWidth: '90%',
    width: '350px',
    transition: 'all 0.3s ease',
  },
  errorMessage: {
    color: colors.error,
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: 500,
  },
  progressWrapper: {
    marginBottom: '1.5rem',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBackground: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: colors.primary.light,
    opacity: 0.3,
  },
  progress: {
    color: colors.primary.main,
  },
  alertRoot: {
    width: '100%',
    '& .MuiAlert-message': {
      width: '100%',
    }
  },
}));

/**
 * LoadingScreen component serves as a transition screen between authentication
 * and the main application. It handles login process and displays a loading indicator.
 */
const LoadingScreen = () => {
  const classes = useStyles();
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
      return 'Logging you in';
    }
    return 'Getting things ready';
  };
  
  // Handle login if credentials are provided
  useEffect(() => {
    let timer;
    
    const performLogin = async () => {
      if (loginData) {
        try {
          await login(loginData.email, loginData.password);
          // Successful login - redirect after a brief delay 
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
  
  // If error is detected, show a minimal error state
  if (error) {
    return (
      <Box className={classes.overlay}>
        <Fade in={true} timeout={300}>
          <Box className={classes.messageContainer}>
            <Box className={classes.progressWrapper}>
              <Box className={classes.progressBackground} />
              <CircularProgress size={48} className={classes.progress} />
            </Box>
            <Typography variant="subtitle1" align="center">
              Something went wrong
            </Typography>
            <Typography variant="body2" className={classes.errorMessage}>
              {error}
            </Typography>
          </Box>
        </Fade>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            className={classes.alertRoot}
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            elevation={6}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  }
  
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
          className={classes.alertRoot}
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