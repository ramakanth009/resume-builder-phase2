import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  InputAdornment
} from '@mui/material';
import GigaLogo from '../../assets/giga-loogo.svg';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginLeftSection = ({
  classes,
  formData,
  setFormData,
  errors,
  setErrors,
  showPassword,
  setShowPassword,
  authLoading,
  handleSubmit,
  handleChange,
  handleTogglePasswordVisibility,
  navigateToRegister
}) => (
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
);

export default LoginLeftSection;
