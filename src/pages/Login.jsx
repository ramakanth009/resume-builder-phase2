import React, { useState, useEffect } from 'react';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Snackbar,
  CircularProgress,
  Fade,
  IconButton
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/resume-illustration.svg';
import { useAuth } from '../contexts/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    minHeight: '100vh',
    padding: '2rem 0',
    background: 'linear-gradient(135deg, #f9f9f9 0%, #f5f7fa 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  paper: {
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative',
    zIndex: 2,
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '5px',
      background: 'linear-gradient(90deg, #3182ce 0%, #4fd1c5 100%)',
    },
  },
  title: {
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#2d3748',
    position: 'relative',
    display: 'inline-block',
  },
  titleHighlight: {
    position: 'relative',
    zIndex: 1,
    '&::after': {
      content: 'none', // Remove the underline effect
    },
  },
  subtitle: {
    marginBottom: '2rem',
    color: '#718096',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  textFieldWrapper: {
    position: 'relative',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      paddingLeft: '3rem', // Make space for the icon
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      borderColor: '#3182ce',
      boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.1)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1.5px',
      transition: 'border-color 0.3s ease',
    },
  },
  button: {
    padding: '0.85rem',
    borderRadius: '12px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    marginTop: '1.5rem',
    background: 'linear-gradient(90deg, #3182ce 0%, #4299e1 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(66, 153, 225, 0.25)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(90deg, #2b6cb0 0%, #3182ce 100%)',
      boxShadow: '0 6px 16px rgba(66, 153, 225, 0.35)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    }
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#718096',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px', // Fixed width for better alignment
    height: '24px', // Fixed height for better alignment
  },
  passwordVisibilityToggle: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#718096',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px', // Fixed width for better alignment
    height: '24px', // Fixed height for better alignment
  },
  loader: {
    marginLeft: '10px',
    color: 'white',
  },
  contentBox: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row'
    },
    gap: '2.5rem',
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
    zIndex: 1,
  },
  formContainer: {
    width: '100%',
    maxWidth: {
      xs: '100%',
      md: '450px'
    },
  },
  infoContainer: {
    width: '100%',
    maxWidth: {
      xs: '100%',
      md: '450px'
    },
  },
  featurePoint: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    position: 'relative',
    paddingLeft: '2rem',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: 'rgba(49, 130, 206, 0.1)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#3182ce',
    },
  },
  decorCircle1: {
    position: 'absolute',
    top: '15%',
    right: '10%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(66, 153, 225, 0.05) 0%, rgba(66, 153, 225, 0) 70%)',
    zIndex: 0,
  },
  decorCircle2: {
    position: 'absolute',
    bottom: '10%',
    left: '5%',
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(79, 209, 197, 0.05) 0%, rgba(79, 209, 197, 0) 70%)',
    zIndex: 0,
  },
  welcomeAnimation: {
    opacity: 0,
    animation: '$fadeIn 0.8s forwards',
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  formAnimation: {
    opacity: 0,
    animation: '$fadeInDelay 0.8s forwards 0.3s',
  },
  '@keyframes fadeInDelay': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  illustrationContainer: {
    position: 'relative',
    marginTop: '2rem',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '80%',
      height: '15px',
      bottom: '-15px',
      left: '10%',
      borderRadius: '50%',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      filter: 'blur(8px)',
      animation: '$shadowPulse 6s ease-in-out infinite',
    },
  },
  '@keyframes shadowPulse': {
    '0%': {
      transform: 'scaleX(1)',
      opacity: 0.4,
    },
    '50%': {
      transform: 'scaleX(0.85)',
      opacity: 0.2,
    },
    '100%': {
      transform: 'scaleX(1)',
      opacity: 0.4,
    },
  },
  featureTitle: {
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: '1.5rem',
    marginTop: '1.5rem',
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { login, error: authError, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Set animation complete after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(formData.email, formData.password);
      
      setSnackbar({
        open: true,
        message: 'Login successful! Redirecting to resume builder...',
        severity: 'success',
      });
      
      // Redirect to resume builder page
      setTimeout(() => {
        navigate('/resume-builder');
      }, 1000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Login failed. Please check your credentials.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const navigateToRegister = () => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className={classes.root} maxWidth="xl">
      <Box className={classes.decorCircle1} />
      <Box className={classes.decorCircle2} />
      
      <Fade in={true} timeout={800} style={{ transitionDelay: '100ms' }}>
        <Box mb={4} className={classes.welcomeAnimation}>
          <Typography variant="h3" align="center" className={classes.title} gutterBottom>
            Welcome to <span className={classes.titleHighlight}>Resume Builder</span>
          </Typography>
          <Typography variant="h6" align="center" className={classes.subtitle}>
            Log in to continue building your professional journey
          </Typography>
        </Box>
      </Fade>
      
      <Box className={classes.contentBox}>
        {/* Left side - Login Form */}
        <Box className={classes.formContainer}>
          <Fade in={true} timeout={800} style={{ transitionDelay: '300ms' }}>
            <Paper className={classes.paper} elevation={0}>
              <Box className={classes.formAnimation}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                  Log in to your account
                </Typography>
                <Typography variant="body2" gutterBottom className={classes.subtitle}>
                  Continue building and managing your professional resumes
                </Typography>
                
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Box className={classes.textFieldWrapper}>
                    <EmailIcon className={classes.inputIcon} />
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      placeholder="your.email@example.com"
                    />
                  </Box>
                  
                  <Box className={classes.textFieldWrapper}>
                    <LockIcon className={classes.inputIcon} />
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      placeholder="Enter your password"
                    />
                    <IconButton 
                      className={classes.passwordVisibilityToggle}
                      onClick={togglePasswordVisibility}
                      tabIndex={-1}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Box>
                  
                  <Button
                    className={classes.button}
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={authLoading}
                    endIcon={<ArrowForwardIcon />}
                  >
                    {authLoading ? (
                      <>
                        Logging In
                        <CircularProgress size={20} className={classes.loader} />
                      </>
                    ) : (
                      'Log In to Resume Builder'
                    )}
                  </Button>
                </form>
                
                <Box className={classes.registerLink}>
                  <Typography className={classes.registerText} variant="body2" display="inline">
                    Don't have an account?
                  </Typography>
                  <Button
                    className={classes.registerButton}
                    onClick={navigateToRegister}
                  >
                    Sign up
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Fade>
        </Box>
        
        {/* Right side - Info and Illustration */}
        <Box className={classes.infoContainer}>
          <Fade in={true} timeout={800} style={{ transitionDelay: '500ms' }}>
            <Paper className={classes.infoBox} elevation={0}>
              <Box className={classes.illustrationContainer}>
                <img src={illustration} alt="Resume Building" className={classes.illustration} />
              </Box>
              
              <Typography variant="h5" gutterBottom align="center" className={classes.featureTitle}>
                Your Professional Journey Starts Here
              </Typography>
              
              <Box sx={{ my: 2 }}>
                <Typography variant="body1" className={classes.featurePoint}>
                  Build ATS-optimized resumes in minutes
                </Typography>
                <Typography variant="body1" className={classes.featurePoint}>
                  Multiple templates to showcase your skills
                </Typography>
                <Typography variant="body1" className={classes.featurePoint}>
                  Easy editing with real-time preview
                </Typography>
                <Typography variant="body1" className={classes.featurePoint}>
                  Secure cloud storage for all your versions
                </Typography>
              </Box>
            </Paper>
          </Fade>
        </Box>
      </Box>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} 
          sx={{ 
            borderRadius: '10px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '0.75rem 1rem',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;