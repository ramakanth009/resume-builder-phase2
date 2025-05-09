// resumeAdapter.js - Handles data conversion between frontend and API formats

/**
 * Adapts the generated resume from API format to frontend format
 * Handles both generate and update endpoint response structures
 * @param {Object} generatedResume - The resume data from API
 * @param {string|number|null} resumeId - Optional resume ID to include
 * @returns {Object} - Adapted resume for frontend use
 */
export const adaptGeneratedResume = (generatedResume, resumeId = null) => {
  if (!generatedResume) return null;

  // Create a normalized version that works with both generate and update formats
  const adaptedResume = {
    // Preserve the ID from either explicit ID, resume object, or the root level resume_id
    id: resumeId || generatedResume.id || generatedResume.resume_id,
    
    // Keep header as is
    header: { ...generatedResume.header },
    
    // Keep summary as is
    summary: generatedResume.summary || '',
    
    // Keep target_role as is or set default
    target_role: generatedResume.target_role || '',
    
    // Convert education array to education object if needed
    education: normalizeEducation(generatedResume.education),
    
    // Support both work_experience and workExperience formats
    work_experience: normalizeWorkExperience(generatedResume.work_experience || generatedResume.workExperience || []),
    workExperience: normalizeWorkExperience(generatedResume.workExperience || generatedResume.work_experience || []),
    
    // Convert projects with responsibilities/description normalization
    projects: normalizeProjects(generatedResume.projects || []),
    
    // Keep skills as is
    skills: generatedResume.skills || [],
    
    // Normalize certifications
    certifications: normalizeCertifications(generatedResume.certifications || []),
    
    // Keep customSections as is
    customSections: generatedResume.customSections || {}
  };

  return adaptedResume;
};

/**
 * Normalizes education data structure between object and array formats
 * @param {Object|Array} education - Education data from API
 * @returns {Object} - Normalized education object
 */
const normalizeEducation = (education) => {
  if (!education) return {};
  
  // If it's already an array, return it
  if (Array.isArray(education)) {
    return education;
  }
  
  // If it's an object, just return it
  if (typeof education === 'object') {
    // Ensure both graduation_year and graduationYear fields exist
    return {
      ...education,
      graduation_year: education.graduation_year || education.graduationYear || '',
      graduationYear: education.graduationYear || education.graduation_year || '',
    };
  }
  
  // Default empty object if none of the above
  return {};
};

/**
 * Normalizes work experience data to support both API formats
 * @param {Array} workExperience - Work experience data from API
 * @returns {Array} - Normalized work experience array
 */
const normalizeWorkExperience = (workExperience) => {
  if (!workExperience || !Array.isArray(workExperience)) return [];
  
  return workExperience.map(exp => {
    // Convert description to responsibilities if not already present
    let responsibilities = exp.responsibilities || [];
    let description = exp.description || '';
    
    if (!responsibilities.length && description) {
      responsibilities = description.split('\n').filter(item => item.trim());
    }
    
    if (!description && responsibilities.length) {
      description = responsibilities.join('\n');
    }
    
    // Ensure both company_name and companyName exist
    const companyName = exp.companyName || exp.company_name || '';
    const company_name = exp.company_name || exp.companyName || '';
    
    return {
      ...exp,
      company_name,
      companyName,
      description,
      responsibilities,
    };
  });
};

/**
 * Normalizes project data to support both API formats
 * @param {Array} projects - Projects data from API
 * @returns {Array} - Normalized projects array
 */
const normalizeProjects = (projects) => {
  if (!projects || !Array.isArray(projects)) return [];
  
  return projects.map(project => {
    // Convert description to responsibilities if not already present
    let responsibilities = project.responsibilities || [];
    let description = project.description || '';
    
    if (!responsibilities.length && description) {
      responsibilities = description.split('\n').filter(item => item.trim());
    }
    
    if (!description && responsibilities.length) {
      description = responsibilities.join('\n');
    }
    
    // Handle skills/technologies mapping
    let skills_used = project.skills_used || '';
    let technologies = project.technologies || [];
    
    if (!skills_used && Array.isArray(technologies) && technologies.length) {
      skills_used = technologies.join(', ');
    }
    
    if (!technologies.length && skills_used) {
      technologies = skills_used.split(',').map(s => s.trim());
    }
    
    return {
      ...project,
      description,
      responsibilities,
      skills_used,
      technologies,
    };
  });
};

/**
 * Normalizes certification data to support both string and object formats
 * @param {Array} certifications - Certifications data from API
 * @returns {Array} - Normalized certifications array
 */
const normalizeCertifications = (certifications) => {
  if (!certifications || !Array.isArray(certifications)) return [];
  
  return certifications.map(cert => {
    // If it's already a string, return it as is
    if (typeof cert === 'string') {
      return cert;
    }
    
    // If it's an object with a name, return the full object
    if (typeof cert === 'object' && cert.name) {
      return {
        name: cert.name || '',
        issuer: cert.issuer || '',
        url: cert.url || ''
      };
    }
    
    // If it has no name but has other properties, use those
    if (typeof cert === 'object') {
      if (cert.issuer) {
        return {
          name: cert.issuer, // Use issuer as name if available
          issuer: cert.issuer,
          url: cert.url || ''
        };
      }
      
      return JSON.stringify(cert); // Fallback to string representation
    }
    
    return ''; // Fallback empty string
  }).filter(Boolean); // Remove any empty entries
};

export default {
  adaptGeneratedResume
};