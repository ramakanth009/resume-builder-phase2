import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Alert,
  Slide,
} from '@mui/material';
import {
  Close as CloseIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { addPhoneNumber, skipPhonePopup } from '../utils/api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PhoneCollectionPopup = ({ open, onClose, userName = 'User' }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await addPhoneNumber(phone);
      if (response.status === 'success') {
        setSuccess('Phone number saved successfully!');
        setTimeout(() => {
          onClose(true); // Pass true to indicate success
        }, 1500);
      }
    } catch (error) {
      setError(error.message || 'Failed to save phone number');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      await skipPhonePopup();
      onClose(false); // Pass false to indicate skipped
    } catch (error) {
      console.error('Failed to log skip action:', error);
      onClose(false); // Still close on error
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      handleSkip();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: 400,
          mx: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <PhoneIcon color="primary" />
          <Typography variant="h6" component="span">
            Complete Your Profile
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          disabled={loading}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Hi {userName}! Please add your phone number to complete your profile. 
          This helps us provide better support and keep your account secure.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError('');
            }}
            placeholder="+1234567890 or 1234567890"
            disabled={loading || success}
            autoFocus
            sx={{ mb: 2 }}
            helperText="Enter your phone number with or without country code"
          />
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={handleSkip}
          disabled={loading || success}
          color="inherit"
        >
          Skip for now
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !phone.trim() || success}
          sx={{ minWidth: 100 }}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PhoneCollectionPopup;