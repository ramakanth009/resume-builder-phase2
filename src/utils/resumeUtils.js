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
 */
export const transformWorkExperience = (workExp = []) => {
  if (!workExp) return [];
  const workArray = Array.isArray(workExp) ? workExp : [workExp];

  return workArray
    .filter(exp => exp && typeof exp === 'object')
    .map(exp => {
      const normalized = normalizeObject(exp);
      let responsibilities = Array.isArray(exp.responsibilities)
        ? exp.responsibilities
        : typeof normalized.description === "string"
        ? [normalized.description]
        : [];

      return {
        position: cleanString(exp.position || normalized.position),
        companyName: cleanString(exp.companyName || exp.company_name || normalized.companyname || normalized.company_name),
        duration: cleanString(exp.duration || normalized.duration),
        responsibilities: responsibilities.map(cleanString).filter(Boolean),
      };
    })
    .filter(exp => exp.position || exp.companyName);
};

/**
 * Transform education data to a consistent format
 */
export const transformEducation = (edu = {}) => {
  if (!edu) return {};
  const normalized = normalizeObject(edu);

  return {
    degree: cleanString(edu.degree || normalized.degree),
    specialization: cleanString(edu.specialization || normalized.specialization),
    institution: cleanString(edu.institution || normalized.institution),
    graduationYear: cleanString(edu.graduationYear || edu.graduation_year || normalized.graduationyear || normalized.graduation_year)
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
      
      let skills = [];
      if (Array.isArray(proj.technologies)) {
        skills = proj.technologies;
      } else if (typeof proj.skills_used === 'string') {
        skills = proj.skills_used.split(',');
      } else if (typeof normalized.skills_used === 'string') {
        skills = normalized.skills_used.split(',');
      }

      return {
        name: cleanString(proj.name || normalized.name),
        description: cleanString(proj.description || normalized.description),
        skills_used: skills.map(cleanString).filter(Boolean).join(', ')
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
 * Transform the entire resume data from any format to our standardized format
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
      education: transformEducation(resume.education || normalized.education),
      Academic_projects: transformProjects(
        resume.projects || 
        resume.Academic_projects ||
        normalized.projects ||
        normalized.academic_projects
      ),
      certifications: transformCertifications(
        resume.certifications || 
        normalized.certifications
      ),
      customSections: resume.customSections || {}
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
  transformResumeData
};