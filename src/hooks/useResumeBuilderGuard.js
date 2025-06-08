// hooks/useResumeBuilderGuard.js
import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useResumeBuilderGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleLogoutAndNavigate = useCallback(async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/', { replace: true });
    }
  }, [logout, navigate]);

  const confirmLogout = () => {
    setShowConfirmDialog(false);
    handleLogoutAndNavigate();
  };

  const cancelLogout = () => {
    setShowConfirmDialog(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'You will be logged out if you leave.';
      return 'You will be logged out if you leave.';
    };

    const handlePopState = (event) => {
      event.preventDefault();
      window.history.pushState(null, '', location.pathname);
      setShowConfirmDialog(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', location.pathname);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname]);

  return { showConfirmDialog, confirmLogout, cancelLogout };
};