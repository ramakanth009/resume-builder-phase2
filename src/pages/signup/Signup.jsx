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
import { useAuth } from "../../contexts/AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GigaLogo from "../../assets/giga-loogo.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GoogleIcon from "@mui/icons-material/Google";
import { useStyles } from "./Signup.styles";
import SignupLeftSection from './Signupleft';

const SignupPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { register, loading: authLoading, loginWithGoogle } = useAuth();

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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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

  // Google OAuth handler
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setSnackbar({ open: false, message: "", severity: "success" });
    try {
      await loginWithGoogle();
      // Navigation handled by OAuth callback
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Google login failed. Please try again.",
        severity: "error",
      });
      setIsGoogleLoading(false);
    }
  };

  // Featured stats data
  const statsData = [
    { number: "71%", description: "More interview callbacks" },
    { number: "7.4s", description: "Average review time" },
  ];

  return (
    <Box className={classes.root}>
      <SignupLeftSection
        classes={classes}
        statsData={statsData}
        visibleFeatures={visibleFeatures}
      />

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
                        {showPassword.password ? <VisibilityOff /> : <Visibility />}
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
                        onClick={handleTogglePasswordVisibility("confirmPassword")}
                        edge="end"
                      >
                        {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
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

              {/* Google OAuth Button */}
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                disabled={loading || authLoading || isGoogleLoading}
                sx={{
                  mb: 2,
                  textTransform: 'none',
                  borderColor: '#dadce0',
                  color: '#3c4043',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    borderColor: '#dadce0'
                  }
                }}
              >
                {isGoogleLoading ? (
                  <>
                    Connecting to Google
                    <CircularProgress size={20} sx={{ ml: 1 }} />
                  </>
                ) : (
                  'Continue with Google'
                )}
              </Button>

              <Box className={classes.loginLink}>
                <Typography className={classes.loginText} variant="body2">
                  Already have an account?
                </Typography>
                <Button
                  className={classes.loginButton}
                  onClick={() => navigate("/login")}
                  fullWidth
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

export default SignupPage;