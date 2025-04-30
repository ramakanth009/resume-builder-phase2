import React, { useState, useEffect } from 'react';
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
  IconButton,
  InputAdornment
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import GigaLogo from '../assets/giga-loogo.svg';
import { useAuth } from '../contexts/AuthContext';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Enhanced color palette with additional colors for gradients and animations
const colors = {
  primaryDarkNavy: "#27286c", // Base dark navy
  white: "#ffffff",
  lightBlue: "#60cae6",
  royalBlue: "#233f94",
  goldenYellow: "#ffc615",
  navyVariant: "#2a2b6a",
  skyBlue: "#427bbf",
  midBlue: "#354fa2",
  // Additional colors for gradients
  deepIndigo: "#1a1b4b",
  electricBlue: "#4e7ac7",
  accentTeal: "#38b6d2",
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    height: "100vh",
    overflow: "hidden",
  },
  // Left section remains mostly unchanged
  leftSection: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0px 100px 100px 0px",
    backgroundColor: colors.white,
    position: "relative",
    zIndex: 1,
  },
  // Enhanced right section with gradient
  rightSection: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: "0.5rem 1rem",
    background: `linear-gradient(135deg, ${colors.primaryDarkNavy} 0%, ${colors.deepIndigo} 100%)`,
    position: "relative",
    overflow: "hidden",
  },
  // Background decoration elements
  backgroundCircle: {
    position: "absolute",
    borderRadius: "50%",
    opacity: 0.1,
    background: colors.electricBlue,
    transition: "all 0.8s ease-in-out",
  },
  formContainer: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "0.5rem",
    boxSizing: "border-box",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: "0.5rem",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: colors.navyVariant,
  },
  welcomeText: {
    color: colors.navyVariant,
    fontWeight: 700,
    marginBottom: "0.5rem",
    fontSize: "1.75rem",
  },
  subtitle: {
    color: colors.midBlue,
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.skyBlue,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.lightBlue,
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.lightBlue,
    },
  },
  formDivider: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
    color: colors.midBlue,
    "&::before, &::after": {
      content: '""',
      flex: 1,
      borderBottom: `1px solid ${colors.skyBlue}`,
    },
    "&::before": { marginRight: "0.5rem" },
    "&::after": { marginLeft: "0.5rem" },
  },
  button: {
    padding: "0.75rem",
    borderRadius: "8px",
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",
    marginTop: "0.5rem",
    backgroundColor: colors.royalBlue,
    color: colors.white,
    "&:hover": {
      backgroundColor: colors.midBlue,
    },
  },
  signupLink: {
    textAlign: "center",
  },
  signupText: {
    color: colors.midBlue,
  },
  signupButton: {
    color: colors.royalBlue, 
    fontWeight: 600,
    textTransform: "none",
    padding: "0 4px",
  },
  loader: {
    marginLeft: "8px",
    color: colors.white,
  },
  // Enhanced right section content
  rightContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
    zIndex: 2,
  },
  welcomeRight: {
    color: colors.white,
    fontWeight: 700,
    fontSize: "1.75rem",
    marginBottom: "1rem",
    textAlign: "center",
    textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
  },
  subtitleRight: {
    color: "rgba(255,255,255,0.8)",
    marginBottom: "1.5rem",
    textAlign: "center",
    maxWidth: "300px",
  },
  processContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.5rem',
    marginTop: '2rem',
    width: '100%',
    maxWidth: '280px',
  },
  processStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transform: 'translateX(0)',
    transition: 'transform 0.3s ease-out',
    '&:hover': {
      transform: 'translateX(8px)',
    },
  },
  processIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    backgroundColor: colors.accentTeal,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  processText: {
    color: colors.white,
    fontSize: '0.9rem',
  },
  
  // Student benefits styles
  studentBenefits: {
    marginTop: '2.5rem',
    width: '100%',
    maxWidth: '320px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '1.5rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  benefitsTitle: {
    color: colors.accentTeal,
    marginBottom: '1.5rem',
    fontWeight: 700,
    fontSize: '1.2rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
    color: colors.white,
    transform: "translateX(0)",
    transition: "all 0.3s ease-out",
    padding: "0.5rem 0.75rem",
    borderRadius: "8px",
    "&:hover": {
      transform: "translateX(8px)",
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
  },
  checkmark: {
    marginRight: "1rem",
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: colors.accentTeal,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    background: "rgba(56,182,210,0.15)",
    border: `1px solid ${colors.accentTeal}`,
  },
  // Remove these style blocks:
  /* statsContainer, statItem, statNumber, statText, testimonialBox, testimonialText, testimonialAuthor */
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
    }, 800); // Start after the main fade-in
    
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
      {/* Left Section - Form (now white) */}
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
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                placeholder="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
              
              <Box className={classes.signupLink}>
                <Typography className={classes.signupText} variant="body2" display="inline">
                  Don't have an account?
                </Typography>
                <Button
                  className={classes.signupButton}
                  onClick={navigateToRegister}
                >
                  Sign up
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Fade>
      
      {/* Enhanced Right Section with animations and decorative elements */}
      <Fade in={true} timeout={800}>
        <Box className={classes.rightSection}>
          {/* Decorative background circles */}
          <Box 
            className={classes.backgroundCircle} 
            sx={{ 
              top: '10%', 
              right: '-5%', 
              width: '300px', 
              height: '300px',
              animation: 'float 15s infinite ease-in-out'
            }}
          />
          <Box 
            className={classes.backgroundCircle} 
            sx={{ 
              bottom: '5%', 
              left: '-10%', 
              width: '250px', 
              height: '250px',
              animation: 'float 12s infinite ease-in-out reverse'
            }}
          />
          <Box 
            className={classes.backgroundCircle} 
            sx={{ 
              top: '50%', 
              left: '30%', 
              width: '100px', 
              height: '100px',
              animation: 'pulse 8s infinite ease-in-out'
            }}
          />
          
          {/* Enhanced right side content */}
          <Box className={classes.rightContentContainer}>
            <Fade in={true} timeout={1000}>
              <Typography className={classes.welcomeRight}>
                Resume <span className={classes.highlightText}>Builder</span>
              </Typography>
            </Fade>
            
            <Fade in={true} timeout={1200}>
              <Typography className={classes.subtitleRight}>
                Create professional, ATS-friendly resumes that get you noticed
              </Typography>
            </Fade>
            
            {/* Process visualization */}
            <Box className={classes.processContainer}>
              <Fade in={true} timeout={1400}>
                <Box className={classes.processStep}>
                  <Box className={classes.processIcon}>1</Box>
                  <Typography variant="body2" className={classes.processText}>
                    Fill in your details with our guided form
                  </Typography>
                </Box>
              </Fade>
              
              <Fade in={true} timeout={1600}>
                <Box className={classes.processStep}>
                  <Box className={classes.processIcon}>2</Box>
                  <Typography variant="body2" className={classes.processText}>
                    Choose from multiple professional templates
                  </Typography>
                </Box>
              </Fade>
              
              <Fade in={true} timeout={1800}>
                <Box className={classes.processStep}>
                  <Box className={classes.processIcon}>3</Box>
                  <Typography variant="body2" className={classes.processText}>
                    Download your ATS-optimized resume instantly
                  </Typography>
                </Box>
              </Fade>
            </Box>
            
            {/* Student specific benefits */}
            <Box className={classes.studentBenefits}>
              <Fade in={true} timeout={2400}>
                <Typography variant="subtitle1" className={classes.benefitsTitle}>
                  <span className={classes.highlightText}>Student Benefits:</span>
                </Typography>
              </Fade>
              
              {featureItems.map((text, i) => (
                <Fade 
                  in={visibleFeatures.includes(i)} 
                  timeout={600}
                  key={i}
                >
                  <Box className={classes.featureItem}>
                    <span className={classes.checkmark}>✓</span>
                    <Typography variant="body2">{text}</Typography>
                  </Box>
                </Fade>
              ))}
            </Box>
          </Box>
          
          {/* Global animation styles */}
          <style jsx global>{`
            @keyframes float {
              0% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(5deg); }
              100% { transform: translateY(0) rotate(0deg); }
            }
            
            @keyframes pulse {
              0% { transform: scale(1); opacity: 0.1; }
              50% { transform: scale(1.2); opacity: 0.2; }
              100% { transform: scale(1); opacity: 0.1; }
            }
          `}</style>
        </Box>
      </Fade>
      
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