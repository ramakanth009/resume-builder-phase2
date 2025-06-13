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
  InputAdornment,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import { addPhoneNumber, skipPhonePopup } from '../utils/api';

/**
 * Phone number collection popup shown to Google OAuth users
 * who don't have a phone number in their profile
 */
const PhoneNumberPopup = ({ open, onClose, userName }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Reset state when dialog opens
  React.useEffect(() => {
    if (open) {
      setPhone('');
      setError('');
      setLoading(false);
    }
  }, [open]);
  
  // Handle phone input change
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (error) setError('');
  };
  
  // Simple phone validation (more complex validation on server)
  const validatePhone = (phoneNumber) => {
    // Simple regex for basic validation
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return phoneRegex.test(phoneNumber.trim());
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    if (!phone.trim()) {
      setError('Phone number is required');
      return;
    }
    
    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setLoading(true);
    
    try {
      // Call API to save phone number
      const response = await addPhoneNumber(phone);
      
      if (response.status === 'success') {
        // Close popup on success
        onClose(true); // true indicates successful submission
      } else {
        setError(response.message || 'Error saving phone number');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle skip button click
  const handleSkip = async () => {
    setLoading(true);
    try {
      // Log skip action (optional)
      await skipPhonePopup();
    } catch (error) {
      console.error('Error logging skip:', error);
    } finally {
      setLoading(false);
      onClose(false); // false indicates skipped
    }
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={() => !loading && handleSkip()}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h6" component="div" fontWeight="600">
          Add Your Phone Number
        </Typography>
        <IconButton 
          edge="end" 
          onClick={handleSkip}
          disabled={loading}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 2, mt: 1 }}>
          <Typography variant="body1" color="text.secondary">
            {userName ? `Hi ${userName}! ` : ''}
            Please add your phone number to complete your profile.
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            value={phone}
            onChange={handlePhoneChange}
            error={!!error}
            helperText={error || "Example: +1 234 567 8900 or 2345678900"}
            placeholder="+1 234 567 8900"
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          <DialogActions sx={{ px: 0, pb: 2, justifyContent: 'space-between' }}>
            <Button 
              onClick={handleSkip} 
              color="inherit"
              disabled={loading}
            >
              Skip for Now
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Save'
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneNumberPopup;