import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../utils/api';

// Create the authentication context
const AuthContext = createContext(null);

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
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
            console.error('Error parsing user data:', err);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
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
      console.error('Token verification error:', error);
      return false; // If we can't verify, consider invalid
    }
  };
  
  // Login function with improved error handling
  const login = async (email, password) => {
    setLoading(true);
    setError('');
    
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
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Register function with improved error handling
  const register = async (name, email, password) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await registerUser({ name, email, password });
      
      if (response.status === 'success') {
        return response;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function with improved error handling
  const logout = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Call the logoutUser function to make API request
      await logoutUser();
      
      // Always clear local storage and state, even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentUser(null);
      
      return { status: 'success', message: 'Logged out successfully' };
    } catch (err) {
      console.error('Logout error:', err);
      
      // Still clear localStorage even if there's an error with the API call
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCurrentUser(null);
      
      setError(err.message || 'Failed to logout');
      return { status: 'success', message: 'Logged out locally' };
    } finally {
      setLoading(false);
    }
  };
  
  // Value to be provided by the context
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout
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