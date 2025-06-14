import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { Close as CloseIcon, Phone as PhoneIcon } from '@mui/icons-material';
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
  closeButton: {
    padding: '4px',
    color: '#666',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.04)',
    }
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
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 600,
    padding: '10px 16px',
    backgroundColor: '#4285f4',
    '&:hover': {
      backgroundColor: '#3367d6',
    },
    '&:disabled': {
      backgroundColor: '#e0e0e0',
      color: '#9e9e9e'
    }
  },
  skipButton: {
    flex: 1,
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 500,
    padding: '10px 16px',
    color: '#666',
    borderColor: '#ddd',
    '&:hover': {
      borderColor: '#bbb',
      backgroundColor: '#f5f5f5'
    }
  },
  phoneIcon: {
    color: '#4285f4'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
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
      setError('Please enter a valid phone number (e.g., +1234567890, 1234567890)');
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
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.dialog}
        disableEscapeKeyDown={loading}
        aria-labelledby="phone-collection-title"
        aria-describedby="phone-collection-description"
      >
        <DialogTitle className={classes.header} id="phone-collection-title">
          <Typography className={classes.title}>
            Complete Your Profile
          </Typography>
          <IconButton 
            onClick={handleClose} 
            className={classes.closeButton}
            disabled={loading}
            size="small"
            aria-label="Close dialog"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        
        <DialogContent className={classes.content}>
          <Typography 
            className={classes.description}
            id="phone-collection-description"
          >
            Hi {userName}! To help us serve you better, please add your phone number to your profile.
          </Typography>
          
          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={handlePhoneChange}
            onKeyPress={handleKeyPress}
            error={!!error}
            helperText={error || 'Enter your phone number (e.g., +1234567890)'}
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
            
            <Button
              variant="outlined"
              onClick={handleSkip}
              disabled={loading}
              className={classes.skipButton}
              aria-label="Skip adding phone number"
            >
              Skip for Now
            </Button>
          </Box>
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