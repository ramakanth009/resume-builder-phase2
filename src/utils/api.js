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
  return apiRequest('/auth/register', {
    method: 'POST',
    body: userData,
  });
};

/**
 * User login
 * @param {Object} credentials - User login credentials
 * @returns {Promise} - Login response with token
 */
export const loginUser = async (credentials) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: credentials,
  });
};

/**
 * Generate resume
 * @param {Object} resumeData - Resume data to generate
 * @returns {Promise} - Generated resume
 */
export const generateResume = async (resumeData) => {
  return apiRequest('/generate_resume', {
    method: 'POST',
    body: resumeData,
  });
};

/**
 * Get all resumes for the current user
 * @returns {Promise} - List of resumes
 */
export const getUserResumes = async () => {
  return apiRequest('/user/resumes');
};

/**
 * Get a specific resume by ID
 * @param {number} resumeId - Resume ID
 * @returns {Promise} - Resume data
 */
export const getResumeById = async (resumeId) => {
  return apiRequest(`/resumes/${resumeId}`);
};

/**
 * Delete a resume by ID
 * @param {number} resumeId - Resume ID
 * @returns {Promise} - Delete response
 */
export const deleteResume = async (resumeId) => {
  return apiRequest(`/resumes/${resumeId}`, {
    method: 'DELETE',
  });
};

export default {
  apiRequest,
  registerUser,
  loginUser,
  generateResume,
  getUserResumes,
  getResumeById,
  deleteResume,
};