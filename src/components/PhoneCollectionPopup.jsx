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
    color: '#666'
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
    padding: '10px 16px'
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
  }
}));

const PhoneCollectionPopup = ({ open, onClose, userName, onPhoneAdded, onSkipped }) => {
  const classes = useStyles();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validatePhone = (phoneNumber) => {
    // Basic phone validation - accepts formats like +1234567890, +91 9876543210, 1234567890
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return phoneRegex.test(phoneNumber.replace(/\s+/g, ''));
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhone(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleAddPhone = async () => {
    if (!phone.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!validatePhone(phone.trim())) {
      setError('Please enter a valid phone number');
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
      
      // Close popup after short delay
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (err) {
      setError(err.message || 'Failed to save phone number');
    } finally {
      setLoading(false);
    }
  };

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

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.dialog}
        disableEscapeKeyDown={loading}
      >
        <DialogTitle className={classes.header}>
          <Typography className={classes.title}>
            Complete Your Profile
          </Typography>
          <IconButton 
            onClick={handleClose} 
            className={classes.closeButton}
            disabled={loading}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        
        <DialogContent className={classes.content}>
          <Typography className={classes.description}>
            Hi {userName}! To help us serve you better, please add your phone number to your profile.
          </Typography>
          
          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={handlePhoneChange}
            error={!!error}
            helperText={error}
            placeholder="Enter your phone number"
            disabled={loading}
            className={classes.phoneField}
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
            >
              {loading ? (
                <>
                  Adding...
                  <CircularProgress size={16} style={{ marginLeft: 8 }} />
                </>
              ) : (
                'Add Phone Number'
              )}
            </Button>
            
            <Button
              variant="outlined"
              onClick={handleSkip}
              disabled={loading}
              className={classes.skipButton}
            >
              Skip for Now
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} elevation={6}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PhoneCollectionPopup;