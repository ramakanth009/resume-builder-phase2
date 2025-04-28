// In src/utils/resumeAdapter.js, modify the adaptGeneratedResume function:

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
    
    // Pass through BOTH work_experience and workExperience for flexibility
    // This ensures that regardless of which format is used, we'll have data available
    work_experience: generatedResume.work_experience || 
                    generatedResume.workExperience || 
                    [],
    workExperience: generatedResume.workExperience || 
                   generatedResume.work_experience || 
                   [],
    
    // Pass through projects for flexibility
    projects: generatedResume.projects || [],
    
    // Keep skills as is
    skills: generatedResume.skills || [],
    
    // Keep certifications as is
    certifications: generatedResume.certifications || [],
    
    // Keep customSections as is
    customSections: generatedResume.customSections || {}
  };
};