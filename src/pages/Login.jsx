import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Snackbar,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Fade,
  IconButton
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import GigaLogo from '../assets/giga-loogo.svg';
import { useAuth } from '../contexts/AuthContext';
import illustration from '../assets/resume-illustration.svg';

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
  },
  error: '#E63946',      // Error red
};

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    overflow: 'hidden',
  },
  // Left section (form)
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    padding: '2rem',
    backgroundColor: colors.background.paper,
    '@media (max-width: 900px)': {
      width: '100%',
    },
  },
  // Right section (illustration)
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    padding: '2rem',
    backgroundColor: colors.primary.main,
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  formContainer: {
    maxWidth: '400px',
    width: '100%',
    margin: '0 auto',
    padding: '2rem',
  },
  logo: {
    width: '40px',
    height: '40px',
    marginRight: '0.5rem',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  logoText: {
    fontWeight: 700,
    fontSize: '1.5rem',
    color: colors.text.primary,
  },
  welcomeText: {
    color: colors.text.primary,
    fontWeight: 700,
    marginBottom: '0.5rem',
    fontSize: '1.75rem',
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '0.5rem',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E2E8F0',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary.main,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary.main,
    },
  },
  formDivider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    color: colors.text.secondary,
    '&::before, &::after': {
      content: '""',
      flex: 1,
      borderBottom: '1px solid #E2E8F0',
    },
    '&::before': {
      marginRight: '0.5rem',
    },
    '&::after': {
      marginLeft: '0.5rem',
    },
  },
  button: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    marginTop: '1rem',
    backgroundColor: colors.primary.main,
    color: colors.text.light,
    '&:hover': {
      backgroundColor: colors.primary.dark,
    },
  },
  registerLink: {
    textAlign: 'center',
    marginTop: '1.5rem',
  },
  registerText: {
    color: colors.text.secondary,
  },
  registerButton: {
    color: colors.primary.main,
    fontWeight: 600,
    textTransform: 'none',
    padding: '0 4px',
  },
  loader: {
    marginLeft: '10px',
    color: 'white',
  },
  // Right side content styles
  welcomeRight: {
    color: colors.text.light,
    fontWeight: 700,
    fontSize: '1.75rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  subtitleRight: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  illustration: {
    width: '80%',
    maxWidth: '300px',
    marginBottom: '2rem',
    filter: 'brightness(1.05)',
  },
}));

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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

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

  const navigateToRegister = () => {
    navigate('/');
  };

  return (
    <Box className={classes.root}>
      {/* Left Section - Form */}
      <Fade in={true} timeout={600}>
        <Box className={classes.leftSection}>
          <Box className={classes.formContainer}>
            <Box className={classes.logoContainer}>
              <img src={GigaLogo} alt="Gigaversity Logo" className={classes.logo} />
              <Typography className={classes.logoText}>
                Gigaversity
              </Typography>
            </Box>
            
            <Typography variant="h4" className={classes.welcomeText}>
              Welcome Back!
            </Typography>
            <Typography variant="body1" className={classes.subtitle}>
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
                error={!!errors.email}
                helperText={errors.email}
                placeholder="Enter your email"
              />
              
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                placeholder="Enter your password"
              />
              
              <Button
                className={classes.button}
                type="submit"
                fullWidth
                variant="contained"
                disabled={authLoading}
              >
                {authLoading ? (
                  <>
                    Logging In
                    <CircularProgress size={20} className={classes.loader} />
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
              
              <Typography className={classes.formDivider}>or</Typography>
              
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
            </form>
          </Box>
        </Box>
      </Fade>
      
      {/* Right Section - Illustration */}
      <Fade in={true} timeout={800}>
        <Box className={classes.rightSection}>
          <img src={illustration} alt="Resume Builder" className={classes.illustration} />
          <Typography variant="h4" className={classes.welcomeRight}>
            Resume Builder
          </Typography>
          <Typography variant="body1" className={classes.subtitleRight}>
            Create professional resumes in minutes
          </Typography>
        </Box>
      </Fade>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;