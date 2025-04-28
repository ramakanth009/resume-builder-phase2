/**
 * Utility functions for handling resume data
 */

// Clean string values
export const cleanString = (str) => {
  if (!str) return '';
  return typeof str === 'string' ? str.trim() : String(str).trim();
};

// Ensure a value is an array
export const ensureArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(cleanString).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map(item => cleanString(item)).filter(Boolean);
  return [];
};

// Normalize object keys to lowercase
export const normalizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return {};
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});
};

/**
 * Transform header data to a consistent format
 */
export const transformHeaderData = (headerData = {}) => {
  const normalized = normalizeObject(headerData);
  
  return {
    name: cleanString(headerData?.name || normalized?.name || ''),
    email: cleanString(headerData?.email || normalized?.email || ''),
    phone: cleanString(headerData?.phone || normalized?.phone || ''),
    github: cleanString(headerData?.github || normalized?.github || ''),
    linkedin: cleanString(headerData?.linkedin || normalized?.linkedin || ''),
    portfolio: cleanString(headerData?.portfolio || normalized?.portfolio || '')
  };
};

/**
 * Transform work experience data to a consistent format
 * Supports both work_experience and workExperience formats
 */
export const transformWorkExperience = (workExp = []) => {
  if (!workExp) return [];
  const workArray = Array.isArray(workExp) ? workExp : [workExp];

  return workArray
    .filter(exp => exp && typeof exp === 'object')
    .map(exp => {
      const normalized = normalizeObject(exp);
      
      // Handle responsibilities - support both description and responsibilities
      let responsibilities = [];
      if (Array.isArray(exp.responsibilities)) {
        responsibilities = exp.responsibilities;
      } else if (typeof exp.description === "string") {
        responsibilities = exp.description.split('\n').filter(Boolean);
      } else if (typeof normalized.description === "string") {
        responsibilities = normalized.description.split('\n').filter(Boolean);
      }

      // Create a unified object with both field naming formats
      return {
        // Common fields
        position: cleanString(exp.position || normalized.position),
        duration: cleanString(exp.duration || normalized.duration),
        
        // Both naming formats for company
        company_name: cleanString(exp.company_name || exp.companyName || normalized.companyname || normalized.company_name),
        companyName: cleanString(exp.companyName || exp.company_name || normalized.companyname || normalized.company_name),
        
        // Both versions of description/responsibilities
        description: responsibilities.join('\n'),
        responsibilities: responsibilities.map(cleanString).filter(Boolean),
      };
    })
    .filter(exp => exp.position || exp.companyName || exp.company_name);
};

/**
 * Transform education data to a consistent format
 */
export const transformEducation = (edu = {}) => {
  if (!edu) return {};
  const normalized = normalizeObject(edu);

  // Return both field formats for graduation year
  return {
    degree: cleanString(edu.degree || normalized.degree),
    specialization: cleanString(edu.specialization || normalized.specialization),
    institution: cleanString(edu.institution || normalized.institution),
    graduationYear: cleanString(edu.graduationYear || edu.graduation_year || normalized.graduationyear || normalized.graduation_year),
    graduation_year: cleanString(edu.graduation_year || edu.graduationYear || normalized.graduation_year || normalized.graduationyear)
  };
};

/**
 * Transform projects data to a consistent format
 */
export const transformProjects = (projects = []) => {
  if (!projects) return [];
  const projectArray = Array.isArray(projects) ? projects : [projects];

  return projectArray
    .filter(proj => proj && typeof proj === 'object')
    .map(proj => {
      const normalized = normalizeObject(proj);
      
      // Handle skills and technologies consistently
      let skills = [];
      let skillsString = '';
      
      if (Array.isArray(proj.technologies)) {
        skills = proj.technologies;
        skillsString = skills.join(', ');
      } else if (typeof proj.skills_used === 'string') {
        skillsString = proj.skills_used;
        skills = skillsString.split(',').map(s => s.trim()).filter(Boolean);
      } else if (typeof normalized.skills_used === 'string') {
        skillsString = normalized.skills_used;
        skills = skillsString.split(',').map(s => s.trim()).filter(Boolean);
      }
      
      // Handle responsibilities and description consistently
      let responsibilities = [];
      let description = '';
      
      if (Array.isArray(proj.responsibilities)) {
        responsibilities = proj.responsibilities;
        description = responsibilities.join('\n');
      } else if (typeof proj.description === 'string') {
        description = proj.description;
        responsibilities = description.split('\n').filter(Boolean);
      }

      return {
        name: cleanString(proj.name || normalized.name),
        description: description,
        responsibilities: responsibilities,
        skills_used: skillsString,
        technologies: skills,
        link: cleanString(proj.link || normalized.link || '')
      };
    })
    .filter(proj => proj.name);
};

/**
 * Transform skills data to a consistent format
 */
export const transformSkills = (skillsData) => {
  if (!skillsData) return [];

  let skills = [];
  
  if (Array.isArray(skillsData)) {
    skills = skillsData;
  } else if (typeof skillsData === 'string') {
    skills = skillsData.split(',');
  } else if (skillsData?.skills) {
    skills = Array.isArray(skillsData.skills) ? skillsData.skills : [skillsData.skills];
  } else if (skillsData?.Skills) {
    skills = Array.isArray(skillsData.Skills) ? skillsData.Skills : [skillsData.Skills];
  }

  return skills.map(cleanString).filter(Boolean);
};

/**
 * Transform certifications data to a consistent format
 */
export const transformCertifications = (certData) => {
  if (!certData) return [];
  
  let certs = [];
  if (Array.isArray(certData)) {
    certs = certData;
  } else if (typeof certData === 'string') {
    certs = certData.split(',');
  } else if (certData?.certifications) {
    certs = Array.isArray(certData.certifications) ? 
      certData.certifications : 
      [certData.certifications];
  } else if (typeof certData === 'object') {
    certs = Object.values(certData);
  }

  return certs.map(cleanString).filter(Boolean);
};

/**
 * Prepare data from form for API submission
 * Ensures compatibility with both generate and update endpoints
 */
export const prepareResumeDataForApi = (formData) => {
  if (!formData) return null;
  
  try {
    // Create a deep copy to avoid mutations
    const apiData = JSON.parse(JSON.stringify(formData));
    
    // Transform each section of the resume for API compatibility
    return {
      header: transformHeaderData(formData.header),
      summary: cleanString(formData.summary),
      target_role: cleanString(formData.target_role),
      education: transformEducation(formData.education),
      skills: transformSkills(formData.skills),
      work_experience: transformWorkExperience(formData.work_experience),
      workExperience: transformWorkExperience(formData.work_experience),
      projects: transformProjects(formData.projects),
      certifications: transformCertifications(formData.certifications),
      customSections: formData.customSections || {}
    };
  } catch (error) {
    console.error('Data preparation error:', error);
    // Return original data if transformation fails
    return formData;
  }
};

/**
 * Transform the entire resume data from any format to our standardized format
 * Handles both generate and update endpoint responses
 */
export const transformResumeData = (apiResponse) => {
  if (!apiResponse || !apiResponse.resume) {
    throw new Error('Invalid API response: missing resume data');
  }

  const { resume } = apiResponse;
  const normalized = normalizeObject(resume);
  
  try {
    // Transform each section of the resume
    return {
      header: transformHeaderData(resume.header || normalized.header),
      summary: cleanString(resume.summary || normalized.summary),
      skills: transformSkills(resume.skills || normalized.skills),
      work_experience: transformWorkExperience(
        resume.workExperience || 
        resume.work_experience ||
        normalized.workexperience ||
        normalized.work_experience
      ),
      workExperience: transformWorkExperience(
        resume.workExperience || 
        resume.work_experience ||
        normalized.workexperience ||
        normalized.work_experience
      ),
      education: transformEducation(resume.education || normalized.education),
      projects: transformProjects(
        resume.projects || 
        normalized.projects
      ),
      certifications: transformCertifications(
        resume.certifications || 
        normalized.certifications
      ),
      customSections: resume.customSections || {},
      target_role: cleanString(resume.target_role || normalized.target_role)
    };
  } catch (error) {
    console.error('Data transformation error:', error);
    throw new Error(`Failed to transform resume data: ${error.message}`);
  }
};

/**
 * Export all utility functions
 */
export default {
  cleanString,
  ensureArray,
  normalizeObject,
  transformHeaderData,
  transformWorkExperience,
  transformEducation,
  transformProjects,
  transformSkills,
  transformCertifications,
  transformResumeData,
  prepareResumeDataForApi
};