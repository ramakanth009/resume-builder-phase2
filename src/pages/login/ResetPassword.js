import React, { useState, useEffect } from 'react';
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
  Alert,
  Chip
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { resetPassword, validatePassword } from '../../utils/api';
import { useStyles } from './ResetPassword.styles';
import ResetPasswordRightSection from './ResetPasswordRightSection';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GigaLogo from '../../assets/giga-loogo.svg';

const ResetPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    errors: []
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  // Animation states for features
  const [visibleFeatures, setVisibleFeatures] = useState([]);

  const securityFeatures = [
    "Strong password encryption",
    "Immediate token invalidation",
    "Account security verification",
    "Login required after reset",
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

  // Extract token from URL on component mount
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      // No token in URL, redirect to forgot password
      setSnackbar({
        open: true,
        message: 'Invalid or missing reset token. Please request a new password reset.',
        severity: 'error',
      });
      setTimeout(() => {
        navigate('/forgot-password');
      }, 3000);
    }
  }, [searchParams, navigate]);

  // Validate password in real-time
  useEffect(() => {
    if (formData.password) {
      const validation = validatePassword(formData.password);
      setPasswordValidation(validation);
    } else {
      setPasswordValidation({ isValid: false, errors: [] });
    }
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear specific field error when user modifies it
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate password
    const passwordValidationResult = validatePassword(formData.password);
    if (!passwordValidationResult.isValid) {
      newErrors.password = passwordValidationResult.errors[0]; // Show first error
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!token) {
      setSnackbar({
        open: true,
        message: 'Invalid reset token. Please request a new password reset.',
        severity: 'error',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await resetPassword(token, formData.password);
      
      if (response && response.status === 'success') {
        setIsSuccess(true);
        setSnackbar({
          open: true,
          message: 'Password reset successfully! You can now log in with your new password.',
          severity: 'success',
        });
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        throw new Error(response?.message || 'Failed to reset password');
      }
    } catch (error) {
      let errorMessage = error.message || 'Failed to reset password. Please try again.';
      
      // Handle specific error cases
      if (errorMessage.includes('expired')) {
        errorMessage = 'Reset link has expired. Please request a new password reset.';
        setTimeout(() => {
          navigate('/forgot-password');
        }, 3000);
      } else if (errorMessage.includes('invalid') || errorMessage.includes('not found')) {
        errorMessage = 'Invalid reset link. Please request a new password reset.';
        setTimeout(() => {
          navigate('/forgot-password');
        }, 3000);
      }
      
      setSnackbar({
        open: true,
        message: errorMessage,
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

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToForgotPassword = () => {
    navigate('/forgot-password');
  };

  // Show success state
  if (isSuccess) {
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
              
              <Box className={classes.successContainer}>
                <Typography className={classes.successIcon}>
                  ✅
                </Typography>
                
                <Typography className={classes.successTitle}>
                  Password Reset Successful!
                </Typography>
                
                <Typography className={classes.successMessage}>
                  Your password has been updated successfully. You can now log in with your new password.
                </Typography>
                
                <Button
                  className={classes.button}
                  onClick={navigateToLogin}
                  variant="contained"
                  fullWidth
                >
                  Continue to Login
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
        
        {!isMobile && (
          <ResetPasswordRightSection
            classes={classes}
            securityFeatures={securityFeatures}
            visibleFeatures={visibleFeatures}
            isSuccess={true}
          />
        )}
      </Box>
    );
  }

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
              Reset Your Password
            </Typography>
            
            <Typography className={classes.subtitle}>
              Enter your new password below. Make sure it's strong and secure.
            </Typography>
            
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="New Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                placeholder="Enter your new password"
                disabled={isLoading}
                autoFocus
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
              
              {/* Password strength indicator */}
              {formData.password && (
                <Box className={classes.passwordStrengthContainer}>
                  <Typography className={classes.passwordStrengthTitle}>
                    Password Requirements:
                  </Typography>
                  <Box className={classes.passwordRequirements}>
                    {passwordValidation.errors.map((error, index) => (
                      <Chip
                        key={index}
                        label={error}
                        size="small"
                        className={classes.requirementChip}
                        color="error"
                        variant="outlined"
                      />
                    ))}
                    {passwordValidation.isValid && (
                      <Chip
                        label="All requirements met ✓"
                        size="small"
                        className={classes.requirementChip}
                        color="success"
                        variant="filled"
                      />
                    )}
                  </Box>
                </Box>
              )}
              
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                placeholder="Confirm your new password"
                disabled={isLoading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                className={classes.button}
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading || !passwordValidation.isValid || !formData.confirmPassword}
              >
                {isLoading ? (
                  <>
                    Resetting Password
                    <CircularProgress size={20} className={classes.loader} />
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </form>
            
            <Typography className={classes.formDivider}>or</Typography>
            
            <Box className={classes.actionLinks}>
              <Button
                className={classes.linkButton}
                onClick={navigateToLogin}
                disabled={isLoading}
                fullWidth
              >
                Back to Login
              </Button>
              
              <Button
                className={classes.linkButton}
                onClick={navigateToForgotPassword}
                disabled={isLoading}
                fullWidth
                variant="outlined"
              >
                Request New Reset Link
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
      
      {!isMobile && (
        <ResetPasswordRightSection
          classes={classes}
          securityFeatures={securityFeatures}
          visibleFeatures={visibleFeatures}
          isSuccess={false}
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

export default ResetPassword;