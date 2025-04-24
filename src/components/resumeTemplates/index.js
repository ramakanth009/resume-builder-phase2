import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';

/**
 * Export all resume templates 
 */
export {
  ModernTemplate,
  ClassicTemplate,
  MinimalTemplate
};

/**
 * Get template component by name
 * @param {string} templateName - Name of the template to get
 * @returns {React.Component} The template component
 */
export const getTemplateByName = (templateName) => {
  switch (templateName?.toLowerCase()) {
    case 'modern':
      return ModernTemplate;
    case 'minimal':
      return MinimalTemplate;
    case 'classic':
    default:
      return ClassicTemplate;
  }
};

/**
 * Get all available templates with metadata
 * @returns {Array} Array of template objects with id, name, and description
 */
export const getAllTemplates = () => [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, contemporary design with a professional look',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional layout, perfect for most industries',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple, elegant design with focus on content',
  },
];