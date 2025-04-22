// API utility functions for making HTTP requests to the backend

// Base URL for API requests
const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

/**
 * Makes authenticated API requests with the JWT token from localStorage
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Fetch options (method, body, etc)
 * @returns {Promise} - Fetch promise
 */
export const apiRequest = async (endpoint, options = {}) => {
  // Get the JWT token from localStorage
  const token = localStorage.getItem('token');
  
  // Default headers with Content-Type and Authorization if token exists
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  // Prepare the fetch options
  const fetchOptions = {
    ...options,
    headers,
  };
  
  // For POST/PUT requests with a body, stringify the data
  if (options.body && typeof options.body === 'object') {
    fetchOptions.body = JSON.stringify(options.body);
  }
  
  try {
    // Make the API request
    const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
    
    // Parse the JSON response
    const data = await response.json();
    
    // If response is not ok, throw an error with the message from the server
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    // Return the data
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    // Re-throw the error to be handled by the calling function
    throw error;
  }
};

/**
 * User registration
 * @param {Object} userData - User registration data
 * @returns {Promise} - Registration response
 */
export const registerUser = async (userData) => {
  try {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: userData,
    });
    return response;
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

/**
 * User login
 * @param {Object} credentials - User login credentials
 * @returns {Promise} - Login response with token
 */
export const loginUser = async (credentials) => {
  try {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: credentials,
    });
    return response;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

/**
 * Generate resume with validation for required fields
 * @param {Object} resumeData - Resume data to generate
 * @returns {Promise} - Generated resume
 */
export const generateResume = async (resumeData) => {
  // Validate required fields based on backend expectations
  const requiredFields = [
    'name', 'email', 'phone', 'target_role',
    'degree', 'specialization', 'institution', 'graduation_year',
    'skills', 'Academic_projects', 'certifications'
  ];
  
  // Check that each required field exists in resumeData
  const formattedData = {
    ...resumeData,
    // Extract fields from header object if they exist
    name: resumeData.header?.name,
    email: resumeData.header?.email,
    phone: resumeData.header?.phone,
    github: resumeData.header?.github,
    linkedin: resumeData.header?.linkedin,
    portfolio: resumeData.header?.portfolio,
    // Extract fields from education object if they exist
    degree: resumeData.education?.degree,
    specialization: resumeData.education?.specialization,
    institution: resumeData.education?.institution,
    graduation_year: resumeData.education?.graduation_year,
  };
  
  // Check for missing fields
  const missingFields = requiredFields.filter(field => {
    const value = formattedData[field];
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return !value || value.trim() === '';
  });
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  try {
    const response = await apiRequest('/generate_resume', {
      method: 'POST',
      body: formattedData,
    });
    return response;
  } catch (error) {
    throw new Error(error.message || 'Failed to generate resume');
  }
};

/**
 * Get all resumes for the current user
 * @returns {Promise} - List of resumes
 */
export const getUserResumes = async () => {
  try {
    return await apiRequest('/user/resumes');
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch resumes');
  }
};

/**
 * Get a specific resume by ID
 * @param {number} resumeId - Resume ID
 * @returns {Promise} - Resume data
 */
export const getResumeById = async (resumeId) => {
  try {
    return await apiRequest(`/resumes/${resumeId}`);
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch resume');
  }
};

/**
 * Delete a resume by ID
 * @param {number} resumeId - Resume ID
 * @returns {Promise} - Delete response
 */
export const deleteResume = async (resumeId) => {
  try {
    return await apiRequest(`/resumes/${resumeId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error(error.message || 'Failed to delete resume');
  }
};

/**
 * User logout - invalidates the token on the server
 * @returns {Promise} - Logout response
 */
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token');
    
    // If no token exists, just return success
    if (!token) {
      return { status: 'success', message: 'Already logged out' };
    }
    
    // Make the call to logout endpoint
    const response = await apiRequest('/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Clear localStorage regardless of response
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return response;
  } catch (error) {
    // Still clear localStorage even if API call fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Log error but don't throw it to prevent navigation issues
    console.error('Logout error:', error);
    return { status: 'success', message: 'Logged out locally' };
  }
};

export default {
  apiRequest,
  registerUser,
  loginUser,
  generateResume,
  getUserResumes,
  getResumeById,
  deleteResume,
  logoutUser
};