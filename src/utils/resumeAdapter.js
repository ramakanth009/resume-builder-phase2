import { normalizeEducationData } from '../components/resumeBuilder/ResumeBuilderFunctions';

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

  // Handle both structures - keep original properties to preserve all data
  return {
    // Keep header as is
    header: { ...generatedResume.header },
    
    // Keep summary as is
    summary: generatedResume.summary,
    
    // Keep target_role as is or set default
    target_role: generatedResume.target_role || '',
    
    // Normalize education data structure
    education: normalizeEducationData(generatedResume.education),
    
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