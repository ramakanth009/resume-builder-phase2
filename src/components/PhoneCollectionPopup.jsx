import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: '16px',
      padding: '8px',
      maxWidth: '420px',
      width: '100%',
      margin: '16px',
      boxShadow: '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)',
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px 8px 24px',
    borderBottom: 'none'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: 0
  },
  content: {
    padding: '16px 24px 24px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: '1.4'
  },
  phoneField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
    '& .MuiFormHelperText-root': {
      marginLeft: '4px',
      marginTop: '4px'
    }
  },
  buttonContainer: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  },
  addButton: {
    flex: 1,
    borderRadius: '16px',
    textTransform: 'none',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #27286c 0%, #233f94 100%)',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(39, 40, 108, 0.3)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: '$pulse 1.5s infinite',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 40px rgba(39, 40, 108, 0.4)',
      background: 'linear-gradient(135deg, #233f94 0%, #27286c 100%)',
    },
    '&:disabled': {
      background: '#a0aec0 !important',
      color: 'white !important',
      boxShadow: 'none',
      cursor: 'not-allowed',
    }
  },
  skipButton: {
    flex: 1,
    borderRadius: '16px',
    textTransform: 'none',
    fontWeight: 500,
    color: '#a0aec0',
    background: 'rgba(0, 0, 0, 0.01)',
    fontSize: '1rem',
    border: 'none',
    opacity: 0.7,
    filter: 'grayscale(0.5)',
    transition: 'all 0.2s',
    margin:"1px",
    '&:hover': {
      background: 'none !important',
      color: '#233f94',
      border:"none !important",
    },
    '&:disabled': {
      color: '#e0e0e0 !important',
      background: '#f5f5f5 !important',
      cursor: 'not-allowed',
    }
  },
  phoneIcon: {
    color: '#4285f4'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  blurOverlay: {
    position: 'fixed',
    zIndex: 1300,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    pointerEvents: 'auto'
  },
  '@keyframes pulse': {
    '0%': { boxShadow: '0 0 0 0 rgba(39,40,108,0.2)' },
    '70%': { boxShadow: '0 0 0 10px rgba(39,40,108,0)' },
    '100%': { boxShadow: '0 0 0 0 rgba(39,40,108,0)' },
  }
}));

/**
 * PhoneCollectionPopup - Collects phone numbers from OAuth users
 * 
 * @param {boolean} open - Whether the popup is open
 * @param {function} onClose - Function to close the popup
 * @param {string} userName - User's display name for personalization
 * @param {function} onPhoneAdded - Function called when phone number is added
 * @param {function} onSkipped - Function called when user skips
 */
const PhoneCollectionPopup = ({ 
  open, 
  onClose, 
  userName, 
  onPhoneAdded, 
  onSkipped 
}) => {
  const classes = useStyles();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  /**
   * Validate phone number format
   * Accepts formats like +1234567890, +91 9876543210, 1234567890
   */
  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return phoneRegex.test(phoneNumber.replace(/\s+/g, ''));
  };

  /**
   * Handle phone number input change
   */
  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhone(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  /**
   * Handle adding phone number
   */
  const handleAddPhone = async () => {
    // Validation
    if (!phone.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!validatePhone(phone.trim())) {
      setError('Please enter a valid phone number (e.g., +91 9876543210)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onPhoneAdded(phone.trim());
      
      setSnackbar({
        open: true,
        message: 'Phone number saved successfully!',
        severity: 'success'
      });
      
      // Close popup after short delay to show success message
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (err) {
      setError(err.message || 'Failed to save phone number. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle skipping phone collection
   */
  const handleSkip = async () => {
    setLoading(true);
    try {
      await onSkipped();
      onClose();
    } catch (err) {
      console.error('Error logging skip action:', err);
      // Don't show error for skip action, just close
      onClose();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle closing the popup
   */
  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  /**
   * Handle closing snackbar
   */
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  /**
   * Handle Enter key press in phone field
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && phone.trim() && !loading) {
      handleAddPhone();
    }
  };

  return (
    <>
      {open && (
        <div className={classes.blurOverlay} />
      )}
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick' && !loading) {
            handleClose();
          }
        }}
        className={classes.dialog}
        disableEscapeKeyDown={loading}
        aria-labelledby="phone-collection-title"
        aria-describedby="phone-collection-description"
      >
        <DialogTitle className={classes.header} id="phone-collection-title">
          <Typography className={classes.title}>
            <RocketLaunchIcon style={{ verticalAlign: 'middle', marginRight: 6, color: '#233f94' }} fontSize="medium" />
            Complete Your Profile
          </Typography>
        </DialogTitle>
        
        <DialogContent className={classes.content}>
          <Typography 
            className={classes.description}
            id="phone-collection-description"
          >
            Hi {userName}! <b>Unlock the full experience</b> by adding your phone number.<br />
            {/* <AutoAwesomeIcon style={{ verticalAlign: 'middle', color: '#fbc02d', marginRight: 4 }} fontSize="small" />
            Get instant updates, recover your account easily, and enjoy a more secure, personalized journey.<br /> */}
            <span style={{ color: '#233f94', fontWeight: 500 }}>We’ll never spam or share your number.</span>
          </Typography>
          
          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={handlePhoneChange}
            onKeyPress={handleKeyPress}
            error={!!error}
            helperText={error || 'Enter your phone number (e.g., +91 9876543210)'}
            placeholder="Enter your phone number"
            disabled={loading}
            className={classes.phoneField}
            variant="outlined"
            size="medium"
            autoComplete="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon className={classes.phoneIcon} fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          
          <Box className={classes.buttonContainer}>
            <Button
              variant="contained"
              onClick={handleAddPhone}
              disabled={loading || !phone.trim()}
              className={classes.addButton}
              aria-label="Add phone number"
            >
              {loading ? (
                <Box className={classes.loadingContainer}>
                  Adding...
                  <CircularProgress size={16} color="inherit" />
                </Box>
              ) : (
                'Add Phone Number'
              )}
            </Button>
            
            <Tooltip title="We recommend adding your phone for a better experience!" arrow placement="top">
              <span>
                <Button
                  variant="outlined"
                  onClick={handleSkip}
                  disabled={loading}
                  className={classes.skipButton}
                  aria-label="Skip adding phone number"
                  tabIndex={0}
                >
                  Skip for Now
                </Button>
              </span>
            </Tooltip>
          </Box>
          <Typography variant="caption" align="center" style={{ color: '#b0b0b0', marginTop: 4 }}>
            <LightbulbIcon style={{ verticalAlign: 'middle', marginRight: 4, color: '#fbc02d' }} fontSize="small" />
            Adding your phone helps us keep your account safe!
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
    </>
  );
};

export default PhoneCollectionPopup;