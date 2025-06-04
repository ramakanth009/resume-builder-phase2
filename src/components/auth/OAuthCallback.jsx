// // src/components/auth/OAuthCallback.jsx
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress, Alert } from '@mui/material';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { handleOAuthCallback } from '../../utils/googleAuth';

// const OAuthCallback = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { loginWithOAuth } = useAuth();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(true);

//   useEffect(() => {
//     const processCallback = async () => {
//       try {
//         const urlParams = new URLSearchParams(location.search);
        
//         // Check for error parameter
//         const errorParam = urlParams.get('error');
//         if (errorParam) {
//           setError(errorParam);
//           setProcessing(false);
//           setTimeout(() => navigate('/login'), 3000);
//           return;
//         }

//         // Handle OAuth callback
//         const oauthData = handleOAuthCallback(urlParams);
        
//         if (oauthData) {
//           // Use the auth context to login with OAuth data
//           await loginWithOAuth(oauthData);
          
//           // Check for redirect URL in session storage
//           const redirectUrl = sessionStorage.getItem('redirectUrl');
//           if (redirectUrl) {
//             sessionStorage.removeItem('redirectUrl');
//             navigate(redirectUrl);
//           } else {
//             navigate('/resume-builder');
//           }
//         } else {
//           setError('Invalid OAuth callback data');
//           setProcessing(false);
//           setTimeout(() => navigate('/login'), 3000);
//         }
//       } catch (error) {
//         console.error('OAuth callback error:', error);
//         setError(error.message || 'Authentication failed');
//         setProcessing(false);
//         setTimeout(() => navigate('/login'), 3000);
//       }
//     };

//     processCallback();
//   }, [location.search, navigate, loginWithOAuth]);

//   if (processing) {
//     return (
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="100vh"
//         padding="2rem"
//       >
//         <CircularProgress size={60} thickness={4} />
//         <Typography variant="h6" style={{ marginTop: '2rem' }}>
//           Completing authentication...
//         </Typography>
//         <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
//           Please wait while we sign you in
//         </Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="100vh"
//         padding="2rem"
//       >
//         <Alert severity="error" style={{ marginBottom: '2rem', maxWidth: '400px' }}>
//           <Typography variant="h6">Authentication Failed</Typography>
//           <Typography variant="body2">{error}</Typography>
//         </Alert>
//         <Typography variant="body2" color="textSecondary">
//           Redirecting to login page...
//         </Typography>
//       </Box>
//     );
//   }

//   return null;
// };

// export default OAuthCallback;
// src/components/auth/OAuthCallback.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { handleOAuthCallback } from '../../utils/googleAuth';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { loginWithOAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Check for error parameter first
        const errorParam = urlParams.get('error');
        if (errorParam) {
          setError(errorParam);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // Process OAuth callback
        const oauthData = handleOAuthCallback(urlParams);
        
        if (oauthData) {
          // Use the loginWithOAuth method from AuthContext
          await loginWithOAuth(oauthData);
          
          // Check for redirect URL in session storage
          const redirectUrl = sessionStorage.getItem('redirectUrl');
          if (redirectUrl) {
            sessionStorage.removeItem('redirectUrl');
            navigate(redirectUrl);
          } else {
            navigate('/resume-builder');
          }
        } else {
          setError('Invalid OAuth callback data');
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        setError(error.message || 'Authentication failed');
        setTimeout(() => navigate('/login'), 3000);
      } finally {
        setLoading(false);
      }
    };

    processOAuthCallback();
  }, [navigate, loginWithOAuth]);

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant="h6">
          Completing authentication...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
        px={2}
      >
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          Authentication failed: {error}
        </Alert>
        <Typography variant="body2" color="textSecondary">
          Redirecting to login page...
        </Typography>
      </Box>
    );
  }

  return null;
};

export default OAuthCallback;