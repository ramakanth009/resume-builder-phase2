/**
 * Normalizes education data to handle both API response format and form format
 * @param {Object} educationData - Education data from API or form
 * @returns {Object} - Normalized education object
 */
export const normalizeEducationData = (educationData) => {
  // If it's an array (API response format), use the first entry
  if (Array.isArray(educationData) && educationData.length > 0) {
    const edu = educationData[0];
    
    // Extract specialization if degree is in format "X in Y"
    let degree = edu.degree || '';
    let specialization = edu.specialization || '';
    
    if (!specialization && degree.includes(' in ')) {
      const parts = degree.split(' in ');
      degree = parts[0];
      specialization = parts[1];
    }
    
    return {
      degree: degree,
      specialization: specialization,
      institution: edu.institution || '',
      graduation_year: edu.graduationYear || edu.graduation_year || '',
    };
  }
  
  // If it's already an object format (form data), return as is
  return educationData || {};
};