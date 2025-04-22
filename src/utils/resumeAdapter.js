/**
 * This adapter transforms the backend API response structure to match what the frontend components expect
 * It resolves the field name and structure mismatches between backend and frontend
 */

/**
 * Adapts the generated resume structure from backend format to frontend-compatible format
 * @param {Object} generatedResume - Resume data from backend API
 * @returns {Object} - Adapted resume data for frontend
 */
export const adaptGeneratedResume = (generatedResume) => {
  if (!generatedResume) return null;

  return {
    // Keep header as is
    header: {
      ...generatedResume.header
    },
    
    // Keep summary as is
    summary: generatedResume.summary,
    
    // Keep target_role as is
    target_role: generatedResume.target_role,
    
    // Convert education array to single object (using first item if array)
    education: Array.isArray(generatedResume.education) && generatedResume.education.length > 0
      ? {
          degree: generatedResume.education[0].degree,
          specialization: generatedResume.education[0].specialization,
          institution: generatedResume.education[0].institution,
          graduation_year: generatedResume.education[0].graduationYear
        }
      : generatedResume.education || {},
    
    // Rename workExperience to work_experience
    work_experience: Array.isArray(generatedResume.workExperience)
      ? generatedResume.workExperience.map(exp => ({
          position: exp.position,
          company_name: exp.companyName,
          duration: exp.duration,
          description: exp.description || '',
          responsibilities: exp.responsibilities || []
        }))
      : generatedResume.work_experience || [],
    
    // Rename projects to Academic_projects
    Academic_projects: Array.isArray(generatedResume.projects)
      ? generatedResume.projects.map(proj => ({
          name: proj.name,
          skills_used: proj.technologies || proj.skills_used || '',
          description: proj.description || ''
        }))
      : generatedResume.Academic_projects || [],
    
    // Keep skills as is
    skills: generatedResume.skills || [],
    
    // Keep certifications as is
    certifications: generatedResume.certifications || [],
    
    // Keep customSections as is
    customSections: generatedResume.customSections || {}
  };
};

export default { adaptGeneratedResume };