// src/templates/pdfTemplateRegistry.js
import templatesData from '../data/templatesData';

// Import template styles
import classicStyles from './pdf/classicStyles';
import modernStyles from './pdf/modernStyles';
import creativeStyles from './pdf/creativeStyles';
import executiveStyles from './pdf/executiveStyles';
import professionalStyles from './pdf/professionalStyles';
import creativeBlueStyles from './pdf/creativeBlueStyles';

// Map template IDs to style objects
const templateStylesMap = {
  classic: classicStyles,
  modern: modernStyles,
  creative: creativeStyles,
  executive: executiveStyles,
  professional: professionalStyles,
  creativeBlue: creativeBlueStyles,
};

// Auto-populate registry from templatesData
const templateRegistry = {};
templatesData.forEach(template => {
  const templateId = template.id;
  templateRegistry[templateId] = templateStylesMap[templateId] || templateStylesMap.classic;
});

export const getTemplateStyles = (templateId = 'classic') => {
  return templateRegistry[templateId] || templateRegistry.classic;
};

export const registerTemplateStyle = (templateId, styles) => {
  if (templateId && styles) {
    templateRegistry[templateId] = styles;
  }
};

export const getRegisteredTemplateIds = () => {
  return Object.keys(templateRegistry);
};

export default {
  getTemplateStyles,
  registerTemplateStyle,
  getRegisteredTemplateIds,
};