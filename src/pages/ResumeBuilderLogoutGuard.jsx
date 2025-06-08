import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'; // Adjust import path as needed

const ResumeBuilderLogoutGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [pendingNavigation, setPendingNavigation] = React.useState(null);

  const handleLogoutAndNavigate = useCallback(async () => {
    try {
      await logout();
      if (pendingNavigation) {
        navigate(pendingNavigation, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Still navigate even if logout fails
      navigate(pendingNavigation || '/', { replace: true });
    }
  }, [logout, navigate, pendingNavigation]);

  const handleConfirmLogout = () => {
    setShowConfirmDialog(false);
    handleLogoutAndNavigate();
  };

  const handleCancelLogout = () => {
    setShowConfirmDialog(false);
    setPendingNavigation(null);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Handle browser refresh/close
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave? You will be logged out.';
      return 'Are you sure you want to leave? You will be logged out.';
    };

    const handlePopState = (event) => {
      // Handle browser back button
      event.preventDefault();
      
      // Push the current state back to prevent navigation
      window.history.pushState(null, '', location.pathname);
      
      // Show confirmation dialog
      setShowConfirmDialog(true);
      setPendingNavigation('/'); // Default to home page
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // Push current state to enable popstate detection
    window.history.pushState(null, '', location.pathname);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname]);

  return (
    <>
      {children}
      
      {/* Logout Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={handleCancelLogout}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to leave the resume builder? You will be logged out and any unsaved changes may be lost.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Stay
          </Button>
          <Button onClick={handleConfirmLogout} color="error" variant="contained">
            Logout & Leave
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResumeBuilderLogoutGuard;