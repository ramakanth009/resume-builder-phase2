// Base URL for API requests
const BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
// const BASE_URL = process.env.REACT_APP_API_URL || 'https://gigaresume.onrender.com';
// const BASE_URL = process.env.REACT_APP_API_URL || 'https://airesume.gigaversity.in';

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
    // Pass through the error message directly from the backend
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
 * Generate resume with validation for required fields
 * @param {Object} resumeData - Resume data to generate
 * @returns {Promise} - Generated resume
 */
export const generateResume = async (resumeData) => {
  // Format the data for API request - flatten header fields for generate endpoint
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
    graduation_year: resumeData.education?.graduation_year || resumeData.education?.graduationYear,
  };
  
  try {
    const response = await apiRequest('/generate_resume', {
      method: 'POST',
      body: formattedData,
    });
    return response;
  } catch (error) {
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
      // Include both formats for maximum compatibility
      work_experience: resumeData.work_experience,
      workExperience: workExperience,
      target_role: resumeData.target_role,
      customSections: resumeData.customSections
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
 * @returns {Promise} - List of GenAI tools
 */
export const getGenAITools = async (role) => {
  try {
    return await apiRequest(`/genai_tools/${encodeURIComponent(role)}`);
  } catch (error) {
    throw error; // Pass through backend error
  }
};

// Update the default export to include the new function
export default {
  apiRequest,
  registerUser,
  loginUser,
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
  getGenAITools
};