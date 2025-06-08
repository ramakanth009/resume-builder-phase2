// src/utils/googleAuth.js
import { apiRequest } from './api';

/**
 * Check if Google OAuth is configured on the server
 * @returns {Promise<boolean>} - Whether OAuth is configured
 */
export const checkOAuthStatus = async () => {
  try {
    const response = await apiRequest('/auth/oauth/status');
    return response.oauth_configured || false;
  } catch (error) {
    console.error('Error checking OAuth status:', error);
    return false;
  }
};

/**
 * Initiate Google OAuth login flow
 * Redirects user to Google OAuth consent screen
 */
export const initiateGoogleLogin = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'https://airesume.gigaversity.in';
  window.location.href = `${baseUrl}/auth/google/login`;
};

/**
 * Handle OAuth callback parameters from URL
 * @param {URLSearchParams} urlParams - URL search parameters
 * @returns {Object|null} - Auth data or null if invalid
 */
export const handleOAuthCallback = (urlParams) => {
  const token = urlParams.get('token');
  const userId = urlParams.get('user_id');
  const userName = urlParams.get('user_name');
  const userEmail = urlParams.get('user_email');
  const oauthProvider = urlParams.get('oauth_provider');
  const loginMethod = urlParams.get('login_method');
  const timestamp = urlParams.get('timestamp');
  const error = urlParams.get('error');

  // Check for error in callback
  if (error) {
    throw new Error(error);
  }

  // Validate required fields
  if (!token || !userId || !userName || !userEmail) {
    return null;
  }

  return {
    token,
    user: {
      id: parseInt(userId),
      name: userName,
      email: userEmail,
    },
    oauthProvider,
    loginMethod,
    timestamp,
  };
};

export default {
  checkOAuthStatus,
  initiateGoogleLogin,
  handleOAuthCallback,
};