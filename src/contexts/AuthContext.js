import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, initiateGoogleLogin } from '../utils/api';

// Create the authentication context
const AuthContext = createContext(null);

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing user session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          try {
            // Parse user data
            const user = JSON.parse(userData);
            
            // Optional: Verify token expiration if using JWT
            const isTokenValid = verifyTokenExpiration(token);
            
            if (user && user.id && isTokenValid) {
              setCurrentUser(user);
            } else {
              // Invalid user data or expired token
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
          } catch (err) {
            // If user data is invalid, clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Function to check if JWT token is expired
  const verifyTokenExpiration = (token) => {
    try {
      // For JWT: Split the token to get payload part
      const payload = token.split('.')[1];
      // Decode base64
      const decodedPayload = atob(payload);
      const tokenData = JSON.parse(decodedPayload);
      
      // Check if token has expired
      const currentTime = Math.floor(Date.now() / 1000);
      return tokenData.exp > currentTime;
    } catch (error) {
      return false; // If we can't verify, consider invalid
    }
  };
  
  // Regular email/password login function
  const login = async (email, password) => {
    setLoading(true);
    
    try {
      const response = await loginUser({ email, password });
      
      if (response.status === 'success' && response.token) {
        // Store token and user data in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Update current user state
        setCurrentUser(response.user);
        return response;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      // Pass through the backend error directly
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth login function
  const loginWithGoogle = async () => {
    try {
      // Store current location for redirect after OAuth
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/') {
        sessionStorage.setItem('redirectUrl', currentPath);
      }
      
      // Initiate Google OAuth flow
      initiateGoogleLogin();
    } catch (error) {
      console.error('Google OAuth initiation failed:', error);
      throw new Error('Failed to initiate Google login. Please try again.');
    }
  };
  
  // Register function that passes through backend errors
  const register = async (name, email, phone, password) => {
    setLoading(true);
    
    try {
      const response = await registerUser({ name, email, phone, password });
      
      if (response.status === 'success') {
        return response;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      // Pass through the backend error directly
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    setLoading(true);
    
    try {
      // Call the logoutUser function to make API request
      await logoutUser();
      
      // Always clear local storage and state, even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentUser(null);
      
      return { status: 'success', message: 'Logged out successfully' };
    } catch (error) {
      // Still clear localStorage even if there's an error with the API call
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentUser(null);
      
      // Pass through the backend error
      return { status: 'success', message: 'Logged out locally' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update current user data in context and localStorage (NEW)
   * @param {Object} updatedFields - Fields to update in user object
   */
  const updateUserData = (updatedFields) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updatedFields };
      
      // Update state
      setCurrentUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    }
    return null;
  };
  
  // Value to be provided by the context
  const value = {
    currentUser,
    loading,
    login,
    loginWithGoogle,
    register,
    logout,
    setCurrentUser, // Expose setCurrentUser for OAuth callback
    updateUserData  // NEW: Add updateUserData method for phone collection
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;