import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Link as MuiLink,
  Slide,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { forgotPassword } from "../../utils/api";
import { useStyles } from "./Login.styles";
import LoginRightSection from "./LoginRightSection";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GigaLogo from "../../assets/giga-loogo.svg";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { login, loginWithGoogle } = useAuth();

  // View states
  const [viewMode, setViewMode] = useState("login"); // 'login' or 'forgot-password'

  // Login form data
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  // Forgot password form data
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
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
  React.useEffect(() => {
    const timer = setTimeout(() => {
      featureItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleFeatures((prev) => [...prev, index]);
        }, index * 150);
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });

    // Clear errors when user modifies form
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle forgot password email change
  const handleForgotPasswordEmailChange = (e) => {
    const value = e.target.value;
    setForgotPasswordEmail(value);

    // Clear email error when user modifies input
    if (errors.email) {
      setErrors({
        ...errors,
        email: "",
      });
    }

    // Reset success state if user modifies email after success
    if (isEmailSent) {
      setIsEmailSent(false);
    }
  };

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    try {
      const response = await login(loginFormData.email, loginFormData.password);

      if (response && response.status === "success") {
        navigate("/resume-builder");
      } else {
        throw new Error(response?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.message || "Invalid email or password. Please try again.";
      setErrors({ general: errorMessage });

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth login
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrors({});

    try {
      await loginWithGoogle();
      // The actual navigation will be handled by the OAuth callback
    } catch (error) {
      setIsGoogleLoading(false);
      setSnackbar({
        open: true,
        message: error.message || "Google login failed. Please try again.",
        severity: "error",
      });
    }
  };

  // Handle forgot password submission
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!forgotPasswordEmail.trim()) {
      setErrors({ email: "Email address is required" });
      return;
    }

    if (!validateEmail(forgotPasswordEmail)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await forgotPassword(
        forgotPasswordEmail.trim().toLowerCase()
      );

      if (response && response.status === "success") {
        setIsEmailSent(true);
        setSnackbar({
          open: true,
          message: "Password reset instructions sent! Check your email.",
          severity: "success",
        });
      } else {
        throw new Error(response?.message || "Failed to send reset email");
      }
    } catch (error) {
      const errorMessage =
        error.message || "Failed to send reset email. Please try again.";
      setErrors({ email: errorMessage });
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
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
    navigate("/");
  };

  // Switch to forgot password view
  const switchToForgotPassword = () => {
    setViewMode("forgot-password");
    setErrors({});
    setIsEmailSent(false);
    setForgotPasswordEmail("");
  };

  // Switch back to login view
  const switchToLogin = () => {
    setViewMode("login");
    setErrors({});
    setIsEmailSent(false);
    setForgotPasswordEmail("");
  };

  // Handle try different email in forgot password success state
  const handleTryDifferentEmail = () => {
    setIsEmailSent(false);
    setForgotPasswordEmail("");
  };

  // Render login form
  const renderLoginForm = () => (
    <Slide direction="right" in={viewMode === "login"} timeout={300}>
      <Box>
        <Typography className={classes.welcomeText} sx={{ 
          fontSize: "1.5rem", 
          marginBottom: "0.25rem",
          "@media (max-width: 600px)": {
            fontSize: "1.25rem",
          },
        }}>Welcome Back!</Typography>

        <Typography className={classes.subtitle} sx={{ 
          marginBottom: "0.75rem",
          fontSize: "0.875rem",
          "@media (max-width: 600px)": {
            fontSize: "0.8rem",
            marginBottom: "0.5rem",
          },
        }}>
          Log in to continue to your account
        </Typography>

        <form className={classes.form} onSubmit={handleLoginSubmit}>
          {/* Google OAuth Button - Moved to top */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            sx={{
               mb: 1,
               padding: "0.5rem",
               fontSize: "0.975rem",
               textTransform: "none",
               backgroundColor: "#4285F4",
               color: "#ffffff",
               boxShadow: "0 1px 2px rgba(0,0,0,0.24)",
              //  border:"1px solid #000000",

              "&:hover": {
               backgroundColor: "#357ae8",
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
                    bgcolor: "white",
                    borderRadius: "2px",
                    padding: "4px",
                    // marginRight: "1px",
              }}
            >
              <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </Box>
            <Box sx={{ ml: 1 }}>
              {isGoogleLoading ? (
                <>
                  Connecting to Google
                  <CircularProgress size={16} sx={{ ml: 1 }} color="inherit" />
                </>
              ) : (
                'Continue with Google'
              )}
            </Box>
          </Button>

          <Typography className={classes.formDivider} sx={{ 
            margin: "0.5rem 0",
            fontSize: "0.875rem",
          }}>or</Typography>

          <TextField
            className={classes.textField}
            variant="outlined"
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={loginFormData.email}
            onChange={handleLoginChange}
            error={!!errors.email || !!errors.general}
            placeholder="Enter your email"
            disabled={isLoading || isGoogleLoading}
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
            type={showPassword ? "text" : "password"}
            value={loginFormData.password}
            onChange={handleLoginChange}
            error={!!errors.password || !!errors.general}
            placeholder="Enter your password"
            disabled={isLoading || isGoogleLoading}
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
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    disabled={isLoading || isGoogleLoading}
                    size="small"
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Display login error message */}
          {errors.general && (
            <Typography color="error" variant="body2" sx={{ mt: 0.5, mb: 0.5, fontSize: "0.75rem" }}>
              {errors.general}
            </Typography>
          )}

          {/* Forgot Password Link */}
          <Box className={classes.forgotPasswordContainer} sx={{ marginBottom: "0.5rem" }}>
            <MuiLink
              component="button"
              type="button"
              onClick={switchToForgotPassword}
              className={classes.forgotPasswordLink}
              disabled={isLoading || isGoogleLoading}
              sx={{ fontSize: "0.8rem" }}
            >
              Forgot your password?
            </MuiLink>
          </Box>

          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading || isGoogleLoading}
            sx={{
              padding: "0.5rem",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
            }}
          >
            {isLoading ? (
              <>
                Logging In
                <CircularProgress size={16} className={classes.loader} />
              </>
            ) : (
              "Log In"
            )}
          </Button>

          <Box className={classes.signupLink} sx={{ marginTop: "0.5rem" }}>
            <Typography className={classes.signupText} variant="body2" sx={{ 
              fontSize: "0.8rem",
              marginBottom: "0.25rem",
            }}>
              Don't have an account?
            </Typography>
            <Button
              className={classes.signupButton}
              onClick={navigateToRegister}
              disabled={isLoading || isGoogleLoading}
              fullWidth
              sx={{
                padding: "0.5rem",
                fontSize: "0.875rem",
              }}
            >
              Sign up
            </Button>
          </Box>
        </form>
      </Box>
    </Slide>
  );

  // Render forgot password form
  const renderForgotPasswordForm = () => (
    <Slide direction="left" in={viewMode === "forgot-password"} timeout={300}>
      <Box>
        {!isEmailSent ? (
          <>
            <Box className={classes.backButtonContainer} sx={{ marginBottom: "0.5rem" }}>
              <IconButton
                onClick={switchToLogin}
                className={classes.backButton}
                disabled={isLoading}
                size="small"
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography className={classes.welcomeText} sx={{ 
              fontSize: "1.5rem", 
              marginBottom: "0.25rem",
              "@media (max-width: 600px)": {
                fontSize: "1.25rem",
              },
            }}>
              Forgot Password?
            </Typography>

            <Typography className={classes.subtitle} sx={{ 
              marginBottom: "0.75rem",
              fontSize: "0.875rem",
              "@media (max-width: 600px)": {
                fontSize: "0.8rem",
                marginBottom: "0.5rem",
              },
            }}>
              Enter your email address and we'll send you a link to reset your
              password
            </Typography>

            <form
              className={classes.form}
              onSubmit={handleForgotPasswordSubmit}
            >
              <TextField
                className={classes.textField}
                variant="outlined"
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={forgotPasswordEmail}
                onChange={handleForgotPasswordEmailChange}
                error={!!errors.email}
                helperText={errors.email}
                placeholder="Enter your email address"
                disabled={isLoading}
                autoFocus
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
              />

              <Button
                className={classes.button}
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading || !forgotPasswordEmail.trim()}
                sx={{
                  padding: "0.5rem",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {isLoading ? (
                  <>
                    Sending Reset Link
                    <CircularProgress size={16} className={classes.loader} />
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <Typography className={classes.formDivider} sx={{ 
                margin: "0.5rem 0",
                fontSize: "0.875rem",
              }}>or</Typography>

              <Box className={classes.signupLink} sx={{ marginTop: "0.5rem" }}>
                <Typography className={classes.signupText} variant="body2" sx={{ 
                  fontSize: "0.8rem",
                  marginBottom: "0.25rem",
                }}>
                  Remember your password?
                </Typography>
                <Button
                  className={classes.signupButton}
                  onClick={switchToLogin}
                  disabled={isLoading}
                  fullWidth
                  sx={{
                    padding: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  Back to Login
                </Button>
              </Box>
            </form>
          </>
        ) : (
          <Box className={classes.successContainer}>
            <Box className={classes.backButtonContainer} sx={{ marginBottom: "0.5rem" }}>
              <IconButton
                onClick={switchToLogin}
                className={classes.backButton}
                size="small"
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography className={classes.successIcon} sx={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>✉️</Typography>

            <Typography className={classes.successTitle} sx={{ 
              fontSize: "1.5rem", 
              marginBottom: "0.5rem",
              "@media (max-width: 600px)": {
                fontSize: "1.25rem",
              },
            }}>
              Check Your Email
            </Typography>

            <Typography className={classes.successMessage} sx={{ 
              marginBottom: "0.25rem",
              fontSize: "0.875rem",
            }}>
              We've sent password reset instructions to:
            </Typography>

            <Typography className={classes.emailDisplay} sx={{ 
              marginBottom: "0.5rem",
              fontSize: "0.9rem",
            }}>
              {forgotPasswordEmail}
            </Typography>

            <Typography className={classes.successSubtext} sx={{ 
              marginBottom: "0.75rem",
              fontSize: "0.8rem",
            }}>
              If you don't see the email, check your spam folder or try again
              with a different email address.
            </Typography>

            <Box className={classes.successActions}>
              <Button
                className={classes.resendButton}
                onClick={handleTryDifferentEmail}
                variant="outlined"
                fullWidth
                sx={{
                  padding: "0.5rem",
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                }}
              >
                Try Different Email
              </Button>

              <Typography className={classes.resendText} sx={{ fontSize: "0.75rem" }}>
                Didn't receive the email? Check your spam folder or{" "}
                <MuiLink
                  component="button"
                  type="button"
                  onClick={handleTryDifferentEmail}
                  className={classes.resendLink}
                  sx={{ fontSize: "0.75rem" }}
                >
                  try again
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Slide>
  );

  return (
    <Box className={classes.root}>
      {!isMobile && (
        <LoginRightSection
          classes={classes}
          featureItems={featureItems}
          visibleFeatures={visibleFeatures}
        />
      )}
      <Fade in={true} timeout={600}>
        <Box className={classes.leftSection} sx={{ padding: "0.25rem 0.5rem", overflow: "auto" }}>
          <Box className={classes.formContainer} sx={{ 
            maxWidth: "420px", 
            padding: "0.25rem",
            "@media (max-width: 600px)": {
              padding: "0.5rem",
            },
            "@media (max-width: 375px)": {
              padding: "0.25rem",
            },
          }}>
            <Box className={classes.logoContainer} sx={{ marginBottom: "0.75rem" }}>
              <img
                src={GigaLogo}
                alt="Gigaversity Logo"
                className={classes.logo}
                style={{ width: 32, height: 32 }}
              />
              <Typography className={classes.logoText} sx={{ fontSize: "1.25rem" }}>Gigaversity</Typography>
            </Box>

            {/* Render different forms based on view mode */}
            <Box className={classes.formWrapper}>
              {viewMode === "login" && renderLoginForm()}
              {viewMode === "forgot-password" && renderForgotPasswordForm()}
            </Box>
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

export default Login;