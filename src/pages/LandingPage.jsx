import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Snackbar,
  CircularProgress,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
  Grid
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/resume-illustration.svg';
import { useAuth } from '../contexts/AuthContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GigaLogo from '../assets/giga-loogo.svg';

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { register, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    
    setLoading(true);
    
    try {
      // Use the register function from AuthContext
      const response = await register(formData.name, formData.email, formData.password);
      
      setSnackbar({
        open: true,
        message: 'Registration successful! Redirecting to login...',
        severity: 'success',
      });
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Registration failed. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
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

  const handleTogglePasswordVisibility = (field) => () => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Inline styles to avoid issues with makeStylesWithTheme
  const styles = {
    root: {
      minHeight: '100vh',
      padding: '2rem 0',
      background: '#f9f9f9',
    },
    paper: {
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
      maxWidth: '400px',
      maxHeight: '390px',
      display: 'block',
      margin: '0 auto',
    },
    loginLink: {
      textAlign: 'center',
      marginTop: '1.5rem',
    },
    loginText: {
      color: '#718096',
    },
    loginButton: {
      color: '#3182ce',
      fontWeight: 600,
      textTransform: 'none',
      padding: '0 4px',
    },
    loader: {
      marginLeft: '10px',
      color: 'white',
    },
    logo: {
      width: '32px',
      height: '32px',
      marginRight: '0.5rem',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem',
    }
  };

  return (
    <Box sx={styles.root}>
      <Container maxWidth="lg">
        <Box sx={styles.logoContainer}>
          <img src={GigaLogo} alt="Gigaversity Logo" style={styles.logo} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Gigaversity
          </Typography>
        </Box>
        
        <Box mb={4}>
          <Typography variant="h3" align="center" sx={styles.title} gutterBottom>
            Student Resume Builder
          </Typography>
          <Typography variant="h6" align="center" sx={styles.subtitle}>
            Create a professional resume in minutes, completely free!
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {/* Left side - Registration Form */}
          <Grid item xs={12} md={6}>
            <Paper sx={styles.paper} elevation={0}>
              <Typography variant="h5" gutterBottom sx={styles.title}>
                Create your account
              </Typography>
              <Typography variant="body2" gutterBottom sx={styles.subtitle}>
                Get started with your free account to create and manage your resumes.
              </Typography>
              
              <form style={styles.form} onSubmit={handleSubmit}>
                <TextField
                  sx={styles.textField}
                  variant="outlined"
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                
                <TextField
                  sx={styles.textField}
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
                  sx={styles.textField}
                  variant="outlined"
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword.password ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility('password')}
                          edge="end"
                        >
                          {showPassword.password ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  sx={styles.textField}
                  variant="outlined"
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility('confirmPassword')}
                          edge="end"
                        >
                          {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Button
                  sx={styles.button}
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || authLoading}
                >
                  {loading || authLoading ? (
                    <>
                      Creating Account
                      <CircularProgress size={20} sx={styles.loader} />
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>
              
              <Box sx={styles.loginLink}>
                <Typography sx={styles.loginText} variant="body2" display="inline">
                  Already have an account?
                </Typography>
                <Button
                  sx={styles.loginButton}
                  onClick={navigateToLogin}
                >
                  Log in
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* Right side - Info and Illustration */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              ...styles.paper, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }} elevation={0}>
              <img src={illustration} alt="Resume Building" style={styles.illustration} />
              <Typography variant="h5" gutterBottom align="center" sx={styles.title}>
                Why Choose Our Resume Builder?
              </Typography>
              <Typography variant="body1" paragraph>
                ✓ Free for all students
              </Typography>
              <Typography variant="body1" paragraph>
                ✓ ATS-friendly resume templates
              </Typography>
              <Typography variant="body1" paragraph>
                ✓ Live preview as you type
              </Typography>
              <Typography variant="body1" paragraph>
                ✓ Save and edit multiple versions
              </Typography>
              <Typography variant="body1">
                ✓ Professionally designed templates
              </Typography>
            </Paper>
          </Grid>
        </Grid>
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

export default LandingPage;