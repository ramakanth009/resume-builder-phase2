import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useStyles } from './Login.styles';
import LoginLeftSection from './LoginLeftSection';
import LoginRightSection from './LoginRightSection';

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { login, error: authError, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
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
  useEffect(() => {
    const timer = setTimeout(() => {
      featureItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleFeatures(prev => [...prev, index]);
        }, index * 150);
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Navigate directly to loading screen with login credentials
    navigate('/loading', { 
      state: { 
        destination: '/resume-builder',
        loginData: {
          email: formData.email,
          password: formData.password
        } 
      }
    });
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
      <LoginLeftSection
        classes={classes}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        authLoading={authLoading}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleTogglePasswordVisibility={handleTogglePasswordVisibility}
        navigateToRegister={navigateToRegister}
      />
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