import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useAuth } from "../../contexts/AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GigaLogo from "../../assets/giga-loogo.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";

// → Mapped to your color distribution
const colors = {
  primaryDarkNavy: "#27286c", // ~25%
  white: "#ffffff", // ~20%
  lightBlue: "#60cae6", // ~15%
  royalBlue: "#233f94", // ~12%
  goldenYellow: "#ffc615", // ~10%
  navyVariant: "#2a2b6a", // ~8%
  skyBlue: "#427bbf", // ~7%
  midBlue: "#354fa2", // ~3%
  backgroundGradient: "linear-gradient(135deg, #2A2B6A 0%, #3F51B5 100%)",
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    height: "100vh",
  },
  // Enhanced left side styles
  leftSection: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: colors.backgroundGradient,
    position: "relative",
    overflow: "hidden",
    padding: "1rem", // Increased padding
  },
  rightSection: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: "0.5rem 1rem",
    backgroundColor: colors.white,
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
  loginLink: {
    textAlign: "center",
  },
  loginText: {
    color: colors.midBlue,
  },
  loginButton: {
    color: colors.royalBlue,
    fontWeight: 600,
    textTransform: "none",
    padding: "0 4px",
  },
  loader: {
    marginLeft: "8px",
    color: colors.white,
  },
  // Enhanced left side content
  leftContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem', // Increased padding
    width: '100%',
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px', // Added max width
  },
  mainHeadline: {
    color: colors.white,
    fontWeight: 800,
    fontSize: '2.4rem', // Increased from 2rem
    textAlign: 'center',
    marginBottom: '1rem', // Increased from 0.5rem
    lineHeight: 1.2,
  },
  highlightedText: {
    color: colors.goldenYellow,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: '-5px',
      width: '100%',
      height: '4px',
      backgroundColor: colors.goldenYellow,
      borderRadius: '2px',
    },
  },
  tagline: {
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: '2rem', // Increased from 1rem
    fontWeight: 400,
    fontSize: '1.1rem', // Increased from 0.9rem
  },
  // Enhanced stats grid
  statsGridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem', // Reduced gap
    width: '100%',
    maxWidth: '900px',
    marginBottom: '1rem', // Increased margin
    justifyContent: 'center',
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '12px', // Increased radius
    padding: '1rem 1.5rem', // Increased padding
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    flex: '1 1 180px', // Increased flex basis
    maxWidth: '220px', // Increased max width
    minWidth: '160px', // Increased min width
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.2)',
      transform: 'translateY(-3px)',
    },
  },
  statNumber: {
    color: colors.goldenYellow,
    fontWeight: 800,
    fontSize: '1.8rem', // Increased from 1.5rem
    marginBottom: '0.5rem', // Increased margin
  },
  statDescription: {
    color: colors.white,
    fontSize: '0.95rem', // Increased from 0.8rem
  },
  // Enhanced features grid
  featuresContainer: {
    width: "100%",
    maxWidth: "800px", // Increased from 280px
    marginTop: "1rem", // Increased from 1rem
    padding: "0 1rem",
  },
  featuresHeading: {
    color: colors.white,
    fontWeight: 700,
    marginBottom: "1.5rem", // Increased from 0.75rem
    textAlign: "center",
    fontSize: "1.4rem", // Increased from 1.1rem
  },
  featuresGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    width: '100%',
  },
  featureItem: {
    flex: '1 1 calc(50% - 0.75rem)',
    minWidth: '280px',
    display: "flex",
    alignItems: "flex-start",
    padding: "1.2rem",
    color: "rgba(255,255,255,0.9)",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    gap: "1rem",
    transform: "translateY(0)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.15)",
      transform: "translateY(-5px)",
    },
  },
  featureIcon: {
    width: "32px", // Increased from 22px
    height: "32px", // Increased from 22px
    backgroundColor: colors.goldenYellow,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.navyVariant,
    fontWeight: "bold",
    flexShrink: 0,
    marginTop: "0.2rem", // Unchanged
    fontSize: "0.9rem", // Increased from 0.75rem
  },
  featureContent: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  featureTitle: {
    color: colors.white,
    fontWeight: 700,
    fontSize: '1.1rem', // Increased from 0.9rem
  },
  featureDescription: {
    color: "rgba(255,255,255,0.8)",
    fontSize: '0.95rem', // Increased from 0.8rem
    lineHeight: "1.5", // Increased from 1.4
  },
  animatedShape: {
    position: "absolute",
    borderRadius: "30% 70% 70% 30% 0% 70%",
    background: "rgba(255,255,255,0.1)",
    animation: "$float 20s infinite",
  },
  "@keyframes float": {
    "0%": { transform: "rotate(0deg) translateX(0)" },
    "50%": { transform: "rotate(180deg) translateX(20px)" },
    "100%": { transform: "rotate(360deg) translateX(0)" },
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { register, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [visibleFeatures, setVisibleFeatures] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      [0, 1, 2, 3].forEach((i) => {
        setTimeout(() => setVisibleFeatures((prev) => [...prev, i]), i * 150);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((e) => ({ ...e, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      setSnackbar({
        open: true,
        message: "Registration successful!",
        severity: "success",
      });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Registration failed.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = (field) => () => {
    setShowPassword((s) => ({ ...s, [field]: !s[field] }));
  };
  const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  // Featured stats data
  const statsData = [
    { number: "71%", description: "More interview callbacks" },
    { number: "7.4s", description: "Average review time" }
  ];

  // Feature data with icons
  const featureData = [
    {
      title: "ATS-Optimized",
      description: "Pass automated screening systems used by top companies",
      icon: <CheckCircleIcon fontSize="small" />
    },
    {
      title: "Real-Time Preview",
      description: "See changes instantly as you type your information",
      icon: <VisibilityIcon fontSize="small" />
    },
    {
      title: "Multiple Templates",
      description: "Choose from professional designs for various roles",
      icon: <FormatListBulletedIcon fontSize="small" />
    },
    {
      title: "One-Click Download",
      description: "Export your resume as PDF with a single click",
      icon: <GetAppIcon fontSize="small" />
    }
  ];

  return (
    <Box className={classes.root}>
      <Box className={classes.leftSection}>
        {/* Background decorative elements */}
        <Box
          className={classes.animatedShape}
          sx={{ top: "-100px", left: "-50px", width: "300px", height: "300px" }}
        />
        <Box
          className={classes.animatedShape}
          sx={{ bottom: "-150px", right: "-100px", width: "400px", height: "400px" }}
        />

        {/* Enhanced left content */}
        <Fade in timeout={1000}>
          <Box className={classes.leftContentContainer}>
            {/* Enhanced headline */}
            <Typography variant="h2" className={classes.mainHeadline}>
              Launch Your Career
              <span className={classes.highlightedText}> With Confidence</span>
            </Typography>
            
            <Typography variant="subtitle1" className={classes.tagline}>
              The professional resume builder designed for students
            </Typography>
            
            {/* Enhanced statistics */}
            <Box className={classes.statsGridContainer}>
              {statsData.map((stat, index) => (
                <Fade in timeout={1200 + (index * 200)} key={index}>
                  <Box className={classes.statCard}>
                    <Typography variant="h3" className={classes.statNumber}>{stat.number}</Typography>
                    <Typography variant="body2" className={classes.statDescription}>
                      {stat.description}
                    </Typography>
                  </Box>
                </Fade>
              ))}
            </Box>
            
            {/* Enhanced features section - now using Box instead of Grid */}
            <Box className={classes.featuresContainer}>
              <Typography variant="h6" className={classes.featuresHeading}>
                Why Choose Us?
              </Typography>
              
              <Box className={classes.featuresGrid}>
                {featureData.map((feature, index) => (
                  <Fade in={visibleFeatures.includes(index)} timeout={600} key={index}>
                    <Box className={classes.featureItem}>
                      <Box className={classes.featureIcon}>
                        {feature.icon}
                      </Box>
                      <Box className={classes.featureContent}>
                        <Typography variant="subtitle2" className={classes.featureTitle}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" className={classes.featureDescription}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Fade>
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Box>

      <Fade in timeout={800}>
        <Box className={classes.rightSection}>
          <Box className={classes.formContainer}>
            <Box className={classes.logoContainer}>
              <img src={GigaLogo} alt="Gigaversity" className={classes.logo} />
              <Typography className={classes.logoText}>Gigaversity</Typography>
            </Box>

            <Typography className={classes.welcomeText}>Sign Up</Typography>
            <Typography className={classes.subtitle}>
              Create your account to get started
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
                placeholder="Enter your name"
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
                placeholder="Enter your email"
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Password"
                name="password"
                type={showPassword.password ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                placeholder="Create a password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility("password")}
                        edge="end"
                      >
                        {showPassword.password ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword.confirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                placeholder="Confirm your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility(
                          "confirmPassword"
                        )}
                        edge="end"
                      >
                        {showPassword.confirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                className={classes.button}
                type="submit"
                fullWidth
                disabled={loading || authLoading}
              >
                {loading || authLoading ? (
                  <>
                    Creating Account
                    <CircularProgress size={20} className={classes.loader} />
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>

              <Typography className={classes.formDivider}>or</Typography>

              <Box className={classes.loginLink}>
                <Typography
                  className={classes.loginText}
                  variant="body2"
                  display="inline"
                >
                  Already have an account?
                </Typography>
                <Button
                  className={classes.loginButton}
                  onClick={() => navigate("/login")}
                >
                  Log in
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Fade>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
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
};

export default LandingPage;