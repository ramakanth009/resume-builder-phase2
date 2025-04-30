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
import { useAuth } from "../contexts/AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GigaLogo from "../assets/giga-loogo.svg";

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
  featurePink: "#FF80AB",
  backgroundGradient: "linear-gradient(135deg, #2A2B6A 0%, #3F51B5 100%)",
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    height: "100vh",
  },
  // Condensed left side styles
  leftSection: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: colors.backgroundGradient,
    position: "relative",
    overflow: "hidden",
    padding: "1rem", // Reduced padding
  },
  rightSection: {
    flex: "1 1 300px", // grow/shrink, min-width 300px
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: "0.5rem 1rem", // minimal vertical + horizontal padding
    backgroundColor: colors.white,
  },
  formContainer: {
    width: "100%",
    maxWidth: "500px", // optional cap for very wide screens
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
  // Condensed left side content
  leftContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem', // Reduced padding
    width: '100%',
    position: 'relative',
    zIndex: 2,
  },
  mainHeadline: {
    color: colors.white,
    fontWeight: 800,
    fontSize: '2rem', // Reduced from 2.6rem
    textAlign: 'center',
    marginBottom: '0.5rem', // Reduced from 1rem
    lineHeight: 1.2,
  },
  highlightedText: {
    color: colors.featurePink,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: '-5px',
      width: '100%',
      height: '4px',
      backgroundColor: colors.featurePink,
      borderRadius: '2px',
    },
  },
  tagline: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: '1rem', // Reduced from 2rem
    fontWeight: 400,
    fontSize: '0.9rem', // Added smaller font size
  },
  // Condensed stats grid
  statsGridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem', // Reduced gap
    width: '100%',
    maxWidth: '900px',
    marginBottom: '1rem', // Reduced from 2rem
    justifyContent: 'center',
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px', // Smaller radius
    padding: '0.5rem 0.75rem', // Reduced padding
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    flex: '1 1 150px', // Smaller flex basis
    maxWidth: '200px', // Reduced max width
    minWidth: '130px', // Reduced min width
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.15)',
      transform: 'translateY(-3px)',
    },
  },
  statNumber: {
    color: colors.featurePink,
    fontWeight: 800,
    fontSize: '1.5rem', // Reduced from 2rem
    marginBottom: '0.25rem', // Reduced margin
  },
  statDescription: {
    color: colors.white,
    fontSize: '0.8rem', // Reduced from 0.9rem
  },
  // Condensed features
  featuresContainer: {
    width: "100%",
    maxWidth: "280px", // Reduced from 320px
    marginTop: "1rem", // Reduced from 2rem
    padding: "0 1rem", // Reduced padding
  },
  featuresHeading: {
    color: colors.white,
    fontWeight: 600,
    marginBottom: "0.75rem", // Reduced from 1.5rem
    textAlign: "center",
    fontSize: "1.1rem", // Reduced from 1.5rem
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    margin: "0.75rem 0", // Reduced from 1.5rem
    color: "rgba(255,255,255,0.9)",
    opacity: 0,
    transform: "translateY(20px)",
    animation: "$slideIn 0.6s forwards",
    gap: "0.75rem", // Reduced from 1rem
  },
  "@keyframes slideIn": {
    to: { opacity: 1, transform: "translateY(0)" },
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
  featureIcon: {
    width: "22px", // Reduced from 28px
    height: "22px", // Reduced from 28px
    backgroundColor: colors.featurePink,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    fontWeight: "bold",
    flexShrink: 0,
    marginTop: "2px", // Reduced from 4px
    fontSize: "0.75rem", // Added smaller font size
  },
  featureTitle: {
    color: colors.white,
    fontWeight: 600,
    marginBottom: "0.25rem", // Reduced from 0.5rem
    fontSize: "0.9rem", // Reduced from 1.1rem
  },
  featureDescription: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.8rem", // Reduced from 0.9rem
    lineHeight: "1.4", // Reduced from 1.5
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

  return (
    <Box className={classes.root}>
      <Box className={classes.leftSection}>
        <Box
          className={classes.animatedShape}
          sx={{ top: "-100px", left: "-50px", width: "300px", height: "300px" }}
        />
        <Box
          className={classes.animatedShape}
          sx={{ bottom: "-150px", right: "-100px", width: "400px", height: "400px" }}
        />

        {/* Condensed left content */}
        <Fade in timeout={1000}>
          <Box className={classes.leftContentContainer}>
            {/* Simplified headline with reduced linebreak */}
            <Typography variant="h2" className={classes.mainHeadline}>
              Launch Your Career
              <span className={classes.highlightedText}> With Confidence</span>
            </Typography>
            
            <Typography variant="subtitle1" className={classes.tagline}>
              The resume builder for students
            </Typography>
            
            {/* More compact statistics */}
            <Box className={classes.statsGridContainer}>
              <Fade in timeout={1200}>
                <Box className={classes.statCard}>
                  <Typography variant="h3" className={classes.statNumber}>68%</Typography>
                  <Typography variant="body2" className={classes.statDescription}>
                    More interview callbacks
                  </Typography>
                </Box>
              </Fade>
              
              <Fade in timeout={1400}>
                <Box className={classes.statCard}>
                  <Typography variant="h3" className={classes.statNumber}>7.4s</Typography>
                  <Typography variant="body2" className={classes.statDescription}>
                    Average recruiter review time
                  </Typography>
                </Box>
              </Fade>
              
              <Fade in timeout={1600}>
                <Box className={classes.statCard}>
                  <Typography variant="h3" className={classes.statNumber}>100%</Typography>
                  <Typography variant="body2" className={classes.statDescription}>
                    Free for students
                  </Typography>
                </Box>
              </Fade>
            </Box>
            
            {/* Condensed features with shorter descriptions */}
            <Box className={classes.featuresContainer}>
              <Typography variant="h6" className={classes.featuresHeading}>
                Why Choose Us?
              </Typography>
              
              {visibleFeatures.map((index) => (
                <Fade key={index} in timeout={500 + (index * 100)}>
                  <Box
                    className={classes.featureItem}
                    sx={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <Box className={classes.featureIcon}>✓</Box>
                    <Box>
                      <Typography variant="subtitle2" className={classes.featureTitle}>
                        {["ATS-Optimized", "Real-Time Preview", "Multiple Templates", "One-Click Download"][index]}
                      </Typography>
                      <Typography variant="body2" className={classes.featureDescription}>
                        {[
                          "Pass automated screening systems used by top companies.",
                          "See changes instantly as you type.",
                          "Choose from professional templates for various roles.",
                          "Export your resume as PDF with a single click."
                        ][index]}
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              ))}
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