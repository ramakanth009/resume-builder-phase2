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
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (err) {
        // If user data is invalid, clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);
  
  // Login function
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
  
  // Register function
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
  
  // Fixed Logout function with simplified implementation
const logout = async () => {
  setLoading(true);
  setError('');
  
  try {
    // Call the logoutUser function to make API request and clear localStorage
    await logoutUser();
    
    // Update state
    setCurrentUser(null);
  } catch (err) {
    console.error('Logout error:', err);
    
    // Even if there's an error, make sure the user is logged out locally
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
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
      {!loading ? children : <div>Loading...</div>}
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