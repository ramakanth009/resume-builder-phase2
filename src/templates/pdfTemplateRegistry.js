// src/templates/pdfTemplateRegistry.js
import classicStyles from './pdf/classicStyles';
import modernStyles from './pdf/modernStyles';
import creativeStyles from './pdf/creativeStyles';
import executiveStyles from './pdf/executiveStyles';
import professionalStyles from './pdf/professionalStyles';
import creativeBlueStyles from './pdf/CreativeBlueStyles';

// Template registry for PDF generation
const templateRegistry = {
  classic: { styles: classicStyles },
  modern: { styles: modernStyles },
  creative: { styles: creativeStyles },
  executive: { styles: executiveStyles },
  professional: { styles: professionalStyles },
  creativeBlue: { styles: creativeBlueStyles }
};

// Get template styles by ID
export const getTemplateStyles = (templateId) => {
  return (templateRegistry[templateId] || templateRegistry.classic).styles;
};

// Get list of registered template IDs
export const getRegisteredTemplateIds = () => {
  return Object.keys(templateRegistry);
};

// Get template by ID with fallback to default
export const getTemplateById = (templateId) => {
  return templateRegistry[templateId] || templateRegistry.classic;
};

// Get all available templates
export const getAllTemplates = () => {
  return Object.keys(templateRegistry).map(id => ({
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1')
  }));
};

// Register a new template
export const registerTemplate = (id, templateConfig) => {
  if (!id || templateRegistry[id]) return false;
  templateRegistry[id] = templateConfig;
  return true;
};

export default templateRegistry;