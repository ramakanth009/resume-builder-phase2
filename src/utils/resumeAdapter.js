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
    
    // Handle AI Experience - NEW FEATURE
    aiExperience: normalizeAIExperience(generatedResume.aiExperience || []),
    
    // Handle GenAI tools - NEW FEATURE
    genai_tools: normalizeGenAITools(
      generatedResume.genai_tools || 
      generatedResume.used_tools || 
      []
    ),
    
    // Keep customSections as is
    customSections: generatedResume.customSections || {}
  };

    // IMPORTANT: Ensure aiExperience data is properly synced with genai_tools
  // If we have aiExperience data but no genai_tools, convert aiExperience to genai_tools format
  if (adaptedResume.aiExperience && adaptedResume.aiExperience.length > 0 && 
      (!adaptedResume.genai_tools || adaptedResume.genai_tools.length === 0)) {
    adaptedResume.genai_tools = adaptedResume.aiExperience.map(aiExp => ({
      tool_id: aiExp.toolName.toLowerCase().replace(/\s+/g, '_'),
      name: aiExp.toolName,
      description: aiExp.impact || '',
      usage_descriptions: aiExp.usageCases || []
    }));
  }

  if (adaptedResume.genai_tools && adaptedResume.genai_tools.length > 0 && 
      (!adaptedResume.aiExperience || adaptedResume.aiExperience.length === 0)) {
    adaptedResume.aiExperience = adaptedResume.genai_tools.map(tool => ({
      toolName: tool.name || `AI Tool ${tool.tool_id}`,
      usageCases: tool.usage_descriptions || [],
      impact: tool.description || `Enhanced productivity using ${tool.name || 'AI tools'}`
    }));
  }

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

/**
 * Normalizes AI Experience data from API response
 * @param {Array} aiExperience - AI experience data from API
 * @returns {Array} - Normalized AI experience array
 */
const normalizeAIExperience = (aiExperience) => {
  if (!aiExperience || !Array.isArray(aiExperience)) return [];
  
  return aiExperience.map(aiExp => ({
    toolName: aiExp.toolName || '',
    impact: aiExp.impact || '',
    usageCases: Array.isArray(aiExp.usageCases) ? aiExp.usageCases : []
  }));
};

/**
 * Normalizes GenAI tools data from API response
 * @param {Array} genaiTools - GenAI tools data from API
 * @returns {Array} - Normalized GenAI tools array
 */
const normalizeGenAITools = (genaiTools) => {
  if (!genaiTools || !Array.isArray(genaiTools)) return [];
  
  return genaiTools.map(tool => {
    // Handle case where tool is from aiExperience format
    if (tool.toolName) {
      return {
        tool_id: tool.toolName.toLowerCase().replace(/\s+/g, '_'),
        name: tool.toolName,
        description: tool.impact || '',
        usage_descriptions: tool.usageCases || []
      };
    }
    
    // Handle case where tool is from used_tools format
    if (tool.tool_id && !tool.name) {
      return {
        tool_id: tool.tool_id,
        name: tool.tool_id.toString().split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        description: '',
        usage_descriptions: tool.usage_descriptions || []
      };
    }
    
    // Default case - standard format
    return {
      tool_id: tool.tool_id || tool.id,
      name: tool.name || '',
      description: tool.description || '',
      usage_descriptions: Array.isArray(tool.usage_descriptions) 
        ? tool.usage_descriptions 
        : []
    };
  }).filter(tool => tool.tool_id || tool.name); // Only keep tools with valid IDs or names
};

export default {
  adaptGeneratedResume,
  normalizeEducation,
  normalizeWorkExperience,
  normalizeProjects,
  normalizeCertifications,
  normalizeAIExperience,
  normalizeGenAITools
};