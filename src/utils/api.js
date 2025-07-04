// Base URL for API requests - Updated for production deployment
// const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
// const BASE_URL = process.env.REACT_APP_API_URL || 'https://gigaresume.onrender.com';
const BASE_URL = process.env.REACT_APP_API_URL || 'https://airesume.gigaversity.in';

// Production console log control
const isDevelopment = process.env.NODE_ENV === 'development';
const shouldLog = isDevelopment || process.env.REACT_APP_DISABLE_LOGS !== 'true';

const log = (...args) => {
  if (shouldLog) {
    console.log(...args);
  }
};

const logError = (...args) => {
  if (shouldLog) {
    console.error(...args);
  }
};

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
    log(`Making API request to: ${BASE_URL}${endpoint}`);
    
    // Make the API request
    const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
    
    // Parse the JSON response
    const data = await response.json();
    
    // If response is not ok, throw an error with the message from the server
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    // Check for 401 Unauthorized
    if (response.status === 401) {
      // Token is invalid, clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Force redirect to login page - use hash router format
      window.location.href = '/#/login';
      
      throw new Error(data.message || 'Session expired. Please login again.');
    }
    
    // Return the data
    return data;
  } catch (error) {
    logError('API Request Error:', error);
    
    // Check if it's a network error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    
    // Pass through the error message directly from the backend
    throw error;
  }
};

// =============================================================================
// AUTHENTICATION ENDPOINTS
// =============================================================================

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
    throw error; // Pass through backend error
  }
};

/**
 * User login with improved concurrency handling
 * @param {Object} credentials - User login credentials
 * @returns {Promise} - Login response with token
 */
export const loginUser = (() => {
  const pendingRequests = new Map();
  
  return async (credentials) => {
    // Create a unique key for this login request
    const requestKey = credentials.email;
    
    // If there's already a request for this email, return that promise
    if (pendingRequests.has(requestKey)) {
      return pendingRequests.get(requestKey);
    }
    
    // Create a new request promise
    const requestPromise = (async () => {
      try {
        const response = await apiRequest('/auth/login', {
          method: 'POST',
          body: credentials,
        });
        return response;
      } catch (error) {
        throw error; // Pass through backend error
      } finally {
        // Remove this request from pending after a small delay
        setTimeout(() => {
          pendingRequests.delete(requestKey);
        }, 100);
      }
    })();
    
    // Store the promise in the pending map
    pendingRequests.set(requestKey, requestPromise);
    
    return requestPromise;
  };
})();

/**
 * User logout - clears token and user data from localStorage
 * @returns {Promise} - Logout response
 */
export const logoutUser = async () => {
  try {
    // Call the backend logout API to blacklist the token
    await apiRequest('/auth/logout', {
      method: 'POST',
    });
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return { status: 'success', message: 'Logged out successfully' };
  } catch (error) {
    // Still clear localStorage even if there's an error with the API call
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    throw error; // Pass through backend error
  }
};

// =============================================================================
// GOOGLE OAUTH ENDPOINTS
// =============================================================================

/**
 * Initiate Google OAuth login
 * Redirects to backend's Google OAuth endpoint
 */
export const initiateGoogleLogin = () => {
  const googleAuthUrl = `${BASE_URL}/auth/google/login`;
  window.location.href = googleAuthUrl;
};



/**
 * Check OAuth configuration status
 */
export const checkOAuthStatus = async () => {
  return apiRequest('/auth/oauth/status');
};

// =============================================================================
// PASSWORD RESET ENDPOINTS
// =============================================================================

/**
 * Request password reset
 * @param {string} email - User email
 * @returns {Promise} - Response indicating reset email status
 */
export const forgotPassword = async (email) => {
  try {
    const response = await apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    });
    return response;
  } catch (error) {
    throw error; // Pass through backend error
  }
};

/**
 * Reset password with token
 * @param {string} token - Password reset token
 * @param {string} newPassword - New password
 * @returns {Promise} - Password reset response
 */
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await apiRequest('/auth/reset-password', {
      method: 'POST',
      body: {
        token,
        new_password: newPassword,
      },
    });
    return response;
  } catch (error) {
    throw error; // Pass through backend error
  }
};

/**
 * Validate password strength according to backend requirements
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// =============================================================================
// RESUME ENDPOINTS
// =============================================================================

/**
 * Generate resume with validation for required fields
 * @param {Object} resumeData - Resume data to generate
 * @returns {Promise} - Generated resume
 */
export const generateResume = async (resumeData) => {
  // Format the data for API request - flatten header fields for generate endpoint
  const formattedData = {
  // Only include the fields the backend/AI expects!
    name: resumeData.header?.name,
    email: resumeData.header?.email,
    phone: resumeData.header?.phone,
    github: resumeData.header?.github,
    linkedin: resumeData.header?.linkedin,
    portfolio: resumeData.header?.portfolio,
    degree: resumeData.education?.degree,
    specialization: resumeData.education?.specialization,
    institution: resumeData.education?.institution,
    graduation_year: resumeData.education?.graduation_year || resumeData.education?.graduationYear,
    skills: resumeData.skills,
    projects: resumeData.projects,
    certifications: resumeData.certifications,
    summary: resumeData.summary,
    work_experience: resumeData.work_experience,
    target_role: resumeData.target_role,
    customSections: resumeData.customSections,
    genai_skills: {
      used_tools: (resumeData.genai_tools || []).map(tool => ({
        tool_id: tool.tool_id || tool.toolName || tool.name,
        usage_descriptions: Array.isArray(tool.usageCases) ? 
          tool.usageCases : 
          (tool.usage_descriptions || [])
      })),
      not_used_tools: [] // Assuming no tools are not used in this case
    }
  // Add any other fields the AI model expects, but nothing extra!
};
  
  try {
    log('Sending formatted data to generate resume:', formattedData);
    const response = await apiRequest('/generate_resume', {
      method: 'POST',
      body: formattedData,
    });
    return response;
  } catch (error) {
    logError('Generate resume error:', error);
    throw error; // Pass through backend error
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
    throw error; // Pass through backend error
  }
};

/**
 * Get a specific resume by ID for editing
 * @param {number} resumeId - Resume ID
 * @returns {Promise} - Resume data
 */
export const getResumeById = async (resumeId) => {
  try {
    // Specifically call the edit endpoint
    const response = await apiRequest(`/resumes/${resumeId}`, {
      method: 'GET',
      headers: {
        'X-Action': 'edit' // Add header to indicate edit action
      }
    });

    return response;
  } catch (error) {
    throw error; // Pass through backend error
  }
};

/**
 * Update an existing resume by ID
 * @param {number} resumeId - Resume ID to update
 * @param {Object} resumeData - Updated resume data
 * @returns {Promise} - Updated resume response
 */
export const updateResume = async (resumeId, resumeData) => {
  try {
    // Ensure resumeId is provided
    if (!resumeId) {
      throw new Error('Resume ID is required');
    }

    // Prepare workExperience from work_experience for update format compatibility
    const workExperience = resumeData.work_experience?.map(exp => ({
      position: exp.position || '',
      companyName: exp.company_name || exp.companyName || '',
      duration: exp.duration || '',
      responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities : 
                      (exp.description ? exp.description.split('\n').filter(Boolean) : [])
    })) || [];

    // Prepare aiExperience from genai_skills.used_tools for UI compatibility
    const aiExperience =
      Array.isArray(resumeData.aiExperience)
        ? resumeData.aiExperience
        : (resumeData.genai_tools || []).map(tool => ({
            toolName: tool.toolName || tool.name || tool.tool_id || '',
            usageCases: Array.isArray(tool.usageCases)
              ? tool.usageCases
              : (tool.usage_descriptions || []),
            impact: tool.impact || tool.description || ''
          }));
    
    // Format the data for the API - ensure proper structure and fields
    const formattedData = {
      header: {
        name: resumeData.header.name,
        email: resumeData.header.email,
        phone: resumeData.header.phone,
        github: resumeData.header.github,
        linkedin: resumeData.header.linkedin,
        portfolio: resumeData.header.portfolio
      },
      summary: resumeData.summary,
      education: {
        ...resumeData.education,
        graduationYear: resumeData.education.graduation_year || resumeData.education.graduationYear
      },
      skills: resumeData.skills,
      projects: resumeData.projects.map(proj => ({
        ...proj,
        responsibilities: Array.isArray(proj.responsibilities) ? proj.responsibilities :
                          (proj.description ? proj.description.split('\n').filter(Boolean) : [])
      })),
      certifications: resumeData.certifications,
      // work_experience: resumeData.work_experience,
      workExperience: workExperience,
      aiExperience: aiExperience,
      target_role: resumeData.target_role,
      customSections: resumeData.customSections,
      // Preserve genai_tools data during updates
      genai_tools: resumeData.genai_tools || [],
      // Include genai_skills format for API compatibility
      // genai_skills: {
      //   used_tools: (resumeData.genai_tools || []).map(tool => ({
      //     tool_id: tool.tool_id,
      //     usage_descriptions: tool.usage_descriptions || []
      //   })),
      //   not_used_tools: []
      // }
    };

    // Make PUT request to update the resume
    const response = await apiRequest(`/resumes/${resumeId}`, {
      method: 'PUT',
      body: formattedData,
    });

    return response;
  } catch (error) {
    throw error; // Pass through backend error
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
    throw error; // Pass through backend error
  }
};

// =============================================================================
// PROJECT RECOMMENDATION ENDPOINTS
// =============================================================================

/**
 * Get available target roles
 * @returns {Promise} - List of target roles
 */
export const getTargetRoles = async () => {
  try {
    return await apiRequest('/target_roles');
  } catch (error) {
    throw error; // Pass through backend error
  }
};

/**
 * Get project recommendations for a role
 * @param {string} role - Role name or display name
 * @returns {Promise} - List of recommended projects
 */
export const getProjectRecommendations = async (role) => {
  try {
    return await apiRequest(`/project_recommendations/${encodeURIComponent(role)}`);
  } catch (error) {
    throw error; // Pass through backend error
  }
};

/**
 * Get details of a specific project
 * @param {string} projectKey - Project key identifier
 * @returns {Promise} - Project details
 */
export const getProjectDetails = async (projectKey) => {
  try {
    return await apiRequest(`/project_details/${encodeURIComponent(projectKey)}`);
  } catch (error) {
    throw error; // Pass through backend error
  }
};

/**
 * Get skill recommendations for a role
 * @param {string} role - Role name or display name
 * @returns {Promise} - List of recommended skills
 */
export const getSkillRecommendations = async (role) => {
  try {
    return await apiRequest(`/skill_recommendations/${encodeURIComponent(role)}`);
  } catch (error) {
    throw error; // Pass through backend error
  }
};

/**
 * Get GenAI tools for a specific role
 * @param {string} role - Role name or display name
 * @returns {Promise} - List of GenAI tools with usage options
 */
export const getGenAITools = async (role) => {
  try {
    return await apiRequest(`/genai_skills/${encodeURIComponent(role)}`);
  } catch (error) {
    throw error; // Pass through backend error
  }
};

/**
 * Save GenAI tool usage for a role
 * @param {string} role - Role name or display name
 * @param {Object} usageData - Tool usage data
 * @returns {Promise} - Save response
 */
export const saveGenAIToolUsage = async (role, usageData) => {
  try {
    return await apiRequest(`/genai_skills/${encodeURIComponent(role)}/save_usage`, {
      method: 'POST',
      body: usageData,
    });
  } catch (error) {
    throw error; // Pass through backend error
  }
};
// =============================================================================
// PHONE COLLECTION ENDPOINTS (NEW)
// =============================================================================

/**
 * Check if user needs to see phone collection popup
 * @returns {Promise<Object>} Response with show_popup boolean and user_name
 */
export const checkPhonePopupNeeded = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/user/phone-popup-check`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to check phone popup status');
    }

    return data;
  } catch (error) {
    console.error('Error checking phone popup status:', error);
    throw error;
  }
};

/**
 * Add phone number to user profile
 * @param {string} phoneNumber - The phone number to add
 * @returns {Promise<Object>} Response with success status
 */
export const addPhoneNumber = async (phoneNumber) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/user/add-phone-simple`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add phone number');
    }

    return data;
  } catch (error) {
    console.error('Error adding phone number:', error);
    throw error;
  }
};

/**
 * Log that user skipped the phone collection popup
 * @returns {Promise<Object>} Response with success status
 */
export const skipPhonePopup = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/user/skip-phone-popup`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to log skip action');
    }

    return data;
  } catch (error) {
    console.error('Error logging skip action:', error);
    throw error;
  }
};


// Update the default export to include the new functions
export default {
  apiRequest,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  validatePassword,
  generateResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
  logoutUser,
  getTargetRoles,
  getProjectRecommendations, 
  getProjectDetails,
  getSkillRecommendations,
  getGenAITools,
  saveGenAIToolUsage,
  // OAuth functions
  initiateGoogleLogin,
  // handleOAuthCallback,
  checkOAuthStatus,
  checkPhonePopupNeeded,
  addPhoneNumber,
  skipPhonePopup
};