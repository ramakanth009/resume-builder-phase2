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
  leftSection: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: colors.backgroundGradient,
    position: "relative",
    overflow: "hidden",
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
    // marginTop: "1rem",
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
  // Left side content
  welcomeLeft: {
    color: colors.white,
    fontWeight: 700,
    fontSize: "1.75rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  subtitleLeft: {
    color: "rgba(255,255,255,0.8)",
    marginBottom: "1.5rem",
    textAlign: "center",
    maxWidth: "300px",
  },
  featuresContainer: {
    width: "100%",
    maxWidth: "280px",
    marginTop: "1rem",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
    color: "rgba(255,255,255,0.9)",
    opacity: 0,
    transform: "translateY(20px)",
    animation: "$slideIn 0.6s forwards",
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
      [
        "Free for students",
        "ATS Templates",
        "Live Preview",
        "Design Options",
      ].forEach((_, i) => {
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

        <Fade in timeout={1000}>
          <Typography
            variant="h2"
            sx={{
              color: "white",
              mb: 4,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Build Your Future
          </Typography>
        </Fade>

        {visibleFeatures.map((_, i) => (
          <Fade key={i} in timeout={500}>
            <Box
              className={classes.featureItem}
              sx={{ animationDelay: `${i * 0.2}s` }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: colors.featurePink,
                  borderRadius: "50%",
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                ✓
              </Box>
              <Typography variant="h6">
                {["Free for students", "ATS Templates", "Live Preview", "Design Options"][i]}
              </Typography>
            </Box>
          </Fade>
        ))}
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
