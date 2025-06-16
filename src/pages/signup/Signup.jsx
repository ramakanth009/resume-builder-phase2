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
import { useStyles } from "./Signup.styles";
import SignupLeftSection from "./Signupleft";

const Signup = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { register, loading: authLoading, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
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
      await register(
        formData.name,
        formData.email,
        formData.phone,
        formData.password
      );
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
        <Box
          className={classes.rightSection}
          sx={{ padding: "0.25rem 0.5rem", overflow: "auto" }}
        >
          <Box
            className={classes.formContainer}
            sx={{
              maxWidth: "420px",
              padding: "0.25rem",
              "@media (max-width: 600px)": {
                padding: "0.5rem",
              },
              "@media (max-width: 375px)": {
                padding: "0.25rem",
              },
            }}
          >
            <Box
              className={classes.logoContainer}
              sx={{ marginBottom: "0.75rem" }}
            >
              <img
                src={GigaLogo}
                alt="Gigaversity"
                className={classes.logo}
                style={{ width: 32, height: 32 }}
              />
              <Typography
                className={classes.logoText}
                sx={{ fontSize: "1.25rem" }}
              >
                Gigaversity
              </Typography>
            </Box>

            <Typography
              className={classes.welcomeText}
              sx={{
                fontSize: "1.5rem",
                marginBottom: "0.25rem",
                "@media (max-width: 600px)": {
                  fontSize: "1.25rem",
                },
                "@media (max-width: 375px)": {
                  fontSize: "1.125rem",
                },
              }}
            >
              Sign Up
            </Typography>
            <Typography
              className={classes.subtitle}
              sx={{
                marginBottom: "0.75rem",
                fontSize: "0.875rem",
                "@media (max-width: 600px)": {
                  fontSize: "0.8rem",
                  marginBottom: "0.5rem",
                },
              }}
            >
              Create your account to get started
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
              {/* Google OAuth Button - Moved to top */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleGoogleLogin}
                disabled={loading || authLoading || isGoogleLoading}
                sx={{
                  mb: 1,
                  padding: "0.5rem",
                  fontSize: "0.975rem",
                  textTransform: "none",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.24)",
                  border:"1px solid #000000",

                  "&:hover": {
                    backgroundColor: "#ffffff",
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // position: "relative"
                }}
              >
                <Box
                  sx={{
                    // position: "absolute",
                    // left: "1px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // bgcolor: "white",
                    borderRadius: "2px",
                    // padding: "6px",
                    marginRight: "2px",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </Box>
                <Box sx={{ ml: 4 }}>
                  {isGoogleLoading ? (
                    <>
                      Connecting to Google
                      <CircularProgress
                        size={16}
                        sx={{ ml: 1 }}
                        color="inherit"
                      />
                    </>
                  ) : (
                    "Continue with Google"
                  )}
                </Box>
              </Button>

              <Typography
                className={classes.formDivider}
                sx={{
                  margin: "0.5rem 0",
                  fontSize: "0.875rem",
                }}
              >
                or
              </Typography>

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
                size="small"
                sx={{
                  marginBottom: "0.5rem",
                  "& .MuiInputBase-root": {
                    height: "40px",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "0.75rem",
                    margin: "2px 0 0 0",
                  },
                }}
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
                size="small"
                sx={{
                  marginBottom: "0.5rem",
                  "& .MuiInputBase-root": {
                    height: "40px",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "0.75rem",
                    margin: "2px 0 0 0",
                  },
                }}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                placeholder="Enter your phone number"
                size="small"
                sx={{
                  marginBottom: "0.5rem",
                  "& .MuiInputBase-root": {
                    height: "40px",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "0.75rem",
                    margin: "2px 0 0 0",
                  },
                }}
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
                size="small"
                sx={{
                  marginBottom: "0.5rem",
                  "& .MuiInputBase-root": {
                    height: "40px",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "0.75rem",
                    margin: "2px 0 0 0",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility("password")}
                        edge="end"
                        size="small"
                      >
                        {showPassword.password ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
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
                size="small"
                sx={{
                  marginBottom: "0.75rem",
                  "& .MuiInputBase-root": {
                    height: "40px",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "0.75rem",
                    margin: "2px 0 0 0",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility(
                          "confirmPassword"
                        )}
                        edge="end"
                        size="small"
                      >
                        {showPassword.confirmPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
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
                sx={{
                  padding: "0.5rem",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {loading || authLoading ? (
                  <>
                    Creating Account
                    <CircularProgress size={16} className={classes.loader} />
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>

              <Box className={classes.loginLink} sx={{ marginTop: "0.5rem" }}>
                <Typography
                  className={classes.loginText}
                  variant="body2"
                  sx={{
                    fontSize: "0.8rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Already have an account?
                </Typography>
                <Button
                  className={classes.loginButton}
                  onClick={() => navigate("/login")}
                  fullWidth
                  sx={{
                    padding: "0.5rem",
                    fontSize: "0.875rem",
                  }}
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

export default Signup;
