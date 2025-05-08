import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Fade,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useStyles } from './Login.styles';
import LoginRightSection from './LoginRightSection';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GigaLogo from '../../assets/giga-loogo.svg';

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });
  
  // Feature items with staggered animation
  const featureItems = [
    "Free for all students",
    "ATS-friendly templates",
    "Live preview as you type",
    "Multiple design options",
  ];

  // Animation states for features
  const [visibleFeatures, setVisibleFeatures] = useState([]);

  // Set up staggered animation for features
  React.useEffect(() => {
    const timer = setTimeout(() => {
      featureItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleFeatures(prev => [...prev, index]);
        }, index * 150);
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear login error when user modifies form
    if (loginError) {
      setLoginError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Attempt to login with credentials
      const response = await login(formData.email, formData.password);
      
      if (response && response.status === 'success') {
        // Navigate to resume builder on successful login
        navigate('/resume-builder');
      } else {
        // Handle unexpected response format
        throw new Error(response?.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Set error message from backend
      setLoginError(error.message || 'Invalid email or password. Please try again.');
      
      setSnackbar({
        open: true,
        message: error.message || 'Invalid email or password. Please try again.',
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

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const navigateToRegister = () => {
    navigate('/');
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
            
            <Typography className={classes.welcomeText}>
              Welcome Back!
            </Typography>
            
            <Typography className={classes.subtitle}>
              Log in to continue to your account
            </Typography>
            
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!loginError}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!loginError}
                placeholder="Enter your password"
                disabled={isLoading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              {/* Display login error message from backend */}
              {loginError && (
                <Typography color="error" variant="body2" sx={{ mt: 1, mb: 1 }}>
                  {loginError}
                </Typography>
              )}
              
              <Button
                className={classes.button}
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Logging In
                    <CircularProgress size={20} className={classes.loader} />
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
              
              <Typography className={classes.formDivider}>or</Typography>
              
              <Box className={classes.signupLink}>
                <Typography className={classes.signupText} variant="body2" display="inline">
                  Don't have an account?
                </Typography>
                <Button
                  className={classes.signupButton}
                  onClick={navigateToRegister}
                  disabled={isLoading}
                >
                  Sign up
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Fade>
      
      {!isMobile && (
        <LoginRightSection
          classes={classes}
          featureItems={featureItems}
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

export default Login;