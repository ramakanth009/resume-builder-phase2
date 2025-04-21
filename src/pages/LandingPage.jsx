import React, { useState } from 'react';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import { 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Snackbar,
  CircularProgress
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/resume-illustration.svg';

const useStyles = makeStylesWithTheme((theme) => ({
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
    display: 'block',
    margin: '0 auto',
  },
  infoBox: {
    padding: '2rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
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
  }
}));

const LandingPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
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
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Registration successful! Redirecting to login...',
          severity: 'success',
        });
        
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: data.message || 'Registration failed. Please try again.',
          severity: 'error',
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An error occurred. Please try again later.',
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

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3" align="center" className={classes.title} gutterBottom>
            Student Resume Builder
          </Typography>
          <Typography variant="h6" align="center" className={classes.subtitle}>
            Create a professional resume in minutes, completely free!
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper} elevation={0}>
            <Typography variant="h5" gutterBottom className={classes.title}>
              Create your account
            </Typography>
            <Typography variant="body2" gutterBottom className={classes.subtitle}>
              Get started with your free account to create and manage your resumes.
            </Typography>
            
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                className={classes.textField}
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
                disabled={loading}
              >
                {loading ? (
                  <>
                    Creating Account
                    <CircularProgress size={20} className={classes.loader} />
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
            
            <div className={classes.loginLink}>
              <Typography className={classes.loginText} variant="body2" display="inline">
                Already have an account?
              </Typography>
              <Button
                className={classes.loginButton}
                onClick={navigateToLogin}
              >
                Log in
              </Button>
            </div>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper className={classes.infoBox} elevation={0}>
            <img src={illustration} alt="Resume Building" className={classes.illustration} />
            <Typography variant="h5" gutterBottom align="center" className={classes.title}>
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
    </Container>
  );
};

export default LandingPage;