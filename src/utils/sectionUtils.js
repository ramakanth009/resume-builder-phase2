// utils/sectionUtils.js - Utilities for section-based routing

export const steps = [
  "Personal Info",
  "Social Links",
  "Education",
  "Skills",
  "AI Skills",
  "Projects",
  "Experience",
  "Certifications",
  "Custom Sections",
  // "Terms & Policies",
];

// Section slug mapping for URL routing
export const SECTION_SLUGS = {
  'personal-info': 0,
  'social-links': 1,
  'education': 2,
  'skills': 3,
  'ai-skills': 4,
  'projects': 5,
  'experience': 6,
  'certifications': 7,
  'custom-sections': 8,
  // 'terms-policies': 9,
};

export const SLUG_TO_SECTION = {
  0: 'personal-info',
  1: 'social-links',
  2: 'education',
  3: 'skills',
  4: 'ai-skills',
  5: 'projects',
  6: 'experience',
  7: 'certifications',
  8: 'custom-sections',
  // 9: 'terms-policies',
};

/**
 * Get the step index from a URL section slug
 * @param {string} section - The section slug from URL
 * @returns {number} The step index (0-based)
 */
export const getStepFromSection = (section) => {
  if (!section || !(section in SECTION_SLUGS)) {
    return 0; // Default to first section
  }
  return SECTION_SLUGS[section];
};

/**
 * Get the section slug from a step index
 * @param {number} step - The step index (0-based)
 * @returns {string} The section slug for URL
 */
export const getSectionFromStep = (step) => {
  return SLUG_TO_SECTION[step] || 'personal-info';
};

/**
 * Validate if a section slug is valid
 * @param {string} section - The section slug to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidSection = (section) => {
  return section && section in SECTION_SLUGS;
};

/**
 * Get the next section slug
 * @param {string} currentSection - Current section slug
 * @returns {string|null} Next section slug or null if at the end
 */
export const getNextSection = (currentSection) => {
  const currentStep = getStepFromSection(currentSection);
  const nextStep = currentStep + 1;
  
  if (nextStep < steps.length) {
    return getSectionFromStep(nextStep);
  }
  
  return null;
};

/**
 * Get the previous section slug
 * @param {string} currentSection - Current section slug
 * @returns {string|null} Previous section slug or null if at the beginning
 */
export const getPreviousSection = (currentSection) => {
  const currentStep = getStepFromSection(currentSection);
  const previousStep = currentStep - 1;
  
  if (previousStep >= 0) {
    return getSectionFromStep(previousStep);
  }
  
  return null;
};

/**
 * Build the full path for a section
 * @param {string} section - The section slug
 * @param {string|null} resumeId - Optional resume ID for edit mode
 * @returns {string} The full path
 */
export const buildSectionPath = (section, resumeId = null) => {
  const basePath = resumeId 
    ? `/resume-builder/edit/${resumeId}` 
    : '/resume-builder';
  
  return `${basePath}/${section}`;
};

/**
 * Get all available sections for navigation
 * @returns {Array} Array of section objects with slug and label
 */
export const getAllSections = () => {
  return steps.map((label, index) => ({
    slug: getSectionFromStep(index),
    label,
    index
  }));
};