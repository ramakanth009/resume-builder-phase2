// src/templates/templateRegistry.js
import pdfTemplateRegistry, { getTemplateStyles } from './pdfTemplateRegistry';

// Template registry that combines both preview and PDF components
const templateRegistry = {
  // Use the same structure as pdfTemplateRegistry but will add preview components later
  ...pdfTemplateRegistry
};

// Get template by ID with fallback to default
export const getTemplateById = (templateId) => {
  return templateRegistry[templateId] || templateRegistry.classic;
};

// Get all available templates
export const getAllTemplates = () => {
  return Object.keys(templateRegistry).map(id => ({
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1'),
    // Add more properties as needed
  }));
};

export { getTemplateStyles };
export default templateRegistry;