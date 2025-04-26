/**
 * This adapter transforms the backend API response structure to match what the frontend components expect
 * It resolves the field name and structure mismatches between backend and frontend
 */

/**
 * Adapts the generated resume structure from backend format to frontend-compatible format
 * @param {Object} generatedResume - Resume data from backend API
 * @param {number} resumeId - Optional explicit ID to assign to the resume
 * @returns {Object} - Adapted resume data for frontend
 */
export const adaptGeneratedResume = (generatedResume, resumeId = null) => {
  if (!generatedResume) return null;

  // Handle both structures - keep original properties to preserve all data
  return {
    // Preserve the ID from either explicit ID, resume object, or the root level resume_id
    id: resumeId || generatedResume.id || generatedResume.resume_id,
    
    // Keep header as is
    header: { ...generatedResume.header },
    
    // Keep summary as is
    summary: generatedResume.summary,
    
    // Keep target_role as is or set default
    target_role: generatedResume.target_role || '',
    
    // Convert education array to single object (using first item if array)
    education: Array.isArray(generatedResume.education) 
      ? generatedResume.education
      : generatedResume.education || {},
    
    // Pass through both work_experience and workExperience for flexibility
    work_experience: generatedResume.work_experience || [],
    workExperience: generatedResume.workExperience || [],
    
    // Pass through both projects and Academic_projects for flexibility
    projects: generatedResume.projects || [],
    Academic_projects: generatedResume.Academic_projects || [],
    
    // Keep skills as is
    skills: generatedResume.skills || [],
    
    // Keep certifications as is
    certifications: generatedResume.certifications || [],
    
    // Keep customSections as is
    customSections: generatedResume.customSections || {}
  };
};

export default { adaptGeneratedResume };