import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useStyles } from "../Styles.resumebuilder";
import GigaLogo from "../../assets/giga-loogo.svg";

const LandingRightSection = ({
  formData,
  setFormData,
  errors,
  setErrors,
  loading,
  authLoading,
  showPassword,
  setShowPassword,
  handleSubmit,
  handleChange,
  handleTogglePasswordVisibility,
  navigate,
}) => {
  const classes = useStyles();

  return (
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
  );
};

export default LandingRightSection;
