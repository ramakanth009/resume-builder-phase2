import React, { useState } from 'react';
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
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/resume-illustration.svg';
import GigaLogo from '../assets/giga-loogo.svg';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    minHeight: '100vh',
    padding: '2rem 0',
    background: '#f5f7fa',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  paper: {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  title: {
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#2d3748',
  },
  subtitle: {
    marginBottom: '2rem',
    color: '#718096',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    flex: 1,
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
  },
  button: {
    padding: '0.75rem',
    borderRadius: '8px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    marginTop: '1rem',
    backgroundColor: '#3182ce',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  illustration: {
    width: '100%',
    height: 'auto',
    maxWidth: '300px',
    display: 'block',
    margin: '0 auto',
  },
  infoBox: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f0f5ff',
    borderRadius: '10px',
    height: '100%',
  },
  registerLink: {
    textAlign: 'center',
    marginTop: 'auto',
    paddingTop: '1.5rem',
  },
  registerText: {
    color: '#718096',
  },
  registerButton: {
    color: '#3182ce',
    fontWeight: 600,
    textTransform: 'none',
    padding: '0 4px',
  },
  loader: {
    marginLeft: '10px',
    color: 'white',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  logo: {
    width: '32px',
    height: '32px',
    marginRight: '0.5rem',
  },
  logoText: {
    fontWeight: 700,
    fontSize: '1.25rem',
  },
  contentContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  }
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
      <Container>
        {/* Logo */}
        <Box className={classes.logoContainer}>
          <img src={GigaLogo} alt="Gigaversity Logo" className={classes.logo} />
          <Typography variant="h6" className={classes.logoText}>
            Gigaversity
          </Typography>
        </Box>
        
        {/* Title (only visible on non-mobile) */}
        {!isMobile && (
          <Box mb={4}>
            <Typography variant="h3" align="center" className={classes.title} gutterBottom>
              Student Resume Builder
            </Typography>
            <Typography variant="h6" align="center" className={classes.subtitle}>
              Welcome back! Log in to your account
            </Typography>
          </Box>
        )}
        
        {/* Mobile Title (only visible on mobile) */}
        {isMobile && (
          <Box mb={3}>
            <Typography variant="h5" align="center" className={classes.title} gutterBottom>
              Log In
            </Typography>
          </Box>
        )}
        
        {/* Content Container */}
        <Box className={classes.contentContainer}>
          <Grid container spacing={3}>
            {/* Login Form */}
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper} elevation={0}>
                {!isMobile && (
                  <Typography variant="h5" gutterBottom className={classes.title}>
                    Log in to your account
                  </Typography>
                )}
                
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
              </Paper>
            </Grid>
            
            {/* Info Box (hidden on mobile) */}
            {!isMobile && (
              <Grid item xs={12} md={6}>
                <Paper className={classes.infoBox} elevation={0}>
                  <img src={illustration} alt="Resume Building" className={classes.illustration} />
                  <Typography variant="h5" gutterBottom align="center" className={classes.title} sx={{ mt: 3 }}>
                    Build Your Professional Resume
                  </Typography>
                  <Typography variant="body1" paragraph align="center">
                    Sign in to continue building your future with our professional resume tools.
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" paragraph>
                      • Create ATS-friendly resumes
                    </Typography>
                    <Typography variant="body2" paragraph>
                      • Access multiple resume templates
                    </Typography>
                    <Typography variant="body2" paragraph>
                      • Save and manage your resume history
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
      
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