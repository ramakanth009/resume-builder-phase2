// // src/templates/pdfTemplateRegistry.js
// import React from 'react';
// import ClassicPDFTemplate from './pdf/ClassicPDFTemplate';
// import ModernPDFTemplate from './pdf/ModernPDFTemplate';
// import CreativePDFTemplate from './pdf/CreativePDFTemplate';
// import ExecutivePDFTemplate from './pdf/ExecutivePDFTemplate';
// import ProfessionalPDFTemplate from './pdf/ProfessionalPDFTemplate';
// import CreativeBluePDFTemplate from './pdf/CreativeBluePDFTemplate';

// import classicStyles from './pdf/classicStyles';
// import modernStyles from './pdf/modernStyles';
// import creativeStyles from './pdf/creativeStyles';
// import executiveStyles from './pdf/executiveStyles';
// import professionalStyles from './pdf/professionalStyles';
// import creativeBlueStyles from './pdf/CreativeBlueStyles';

// // Complete template registry with both styles and PDF components
// const templateRegistry = {
//   classic: { 
//     styles: classicStyles,
//     PDFComponent: ClassicPDFTemplate 
//   },
//   modern: { 
//     styles: modernStyles,
//     PDFComponent: ModernPDFTemplate 
//   },
//   creative: { 
//     styles: creativeStyles,
//     PDFComponent: CreativePDFTemplate 
//   },
//   executive: { 
//     styles: executiveStyles,
//     PDFComponent: ExecutivePDFTemplate 
//   },
//   professional: { 
//     styles: professionalStyles,
//     PDFComponent: ProfessionalPDFTemplate 
//   },
//   creativeBlue: { 
//     styles: creativeBlueStyles,
//     PDFComponent: CreativeBluePDFTemplate 
//   }
// };

// // Get template styles by ID
// export const getTemplateStyles = (templateId) => {
//   return (templateRegistry[templateId] || templateRegistry.classic).styles;
// };

// // Get template PDF component by ID
// export const getTemplatePDFComponent = (templateId) => {
//   return (templateRegistry[templateId] || templateRegistry.classic).PDFComponent;
// };

// // Get list of registered template IDs
// export const getRegisteredTemplateIds = () => {
//   return Object.keys(templateRegistry);
// };

// // Get template by ID with fallback to default
// export const getTemplateById = (templateId) => {
//   return templateRegistry[templateId] || templateRegistry.classic;
// };

// // Get all available templates
// export const getAllTemplates = () => {
//   return Object.keys(templateRegistry).map(id => ({
//     id,
//     name: id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1')
//   }));
// };

// // Register a new template
// export const registerTemplate = (id, templateConfig) => {
//   if (!id || templateRegistry[id]) return false;
//   templateRegistry[id] = templateConfig;
//   return true;
// };

// export default templateRegistry;

// src/templates/pdfTemplateRegistry.js
import ClassicPDFTemplate from './pdf/ClassicPDFTemplate';
import ModernPDFTemplate from './pdf/ModernPDFTemplate';
import CreativePDFTemplate from './pdf/CreativePDFTemplate';
import ExecutivePDFTemplate from './pdf/ExecutivePDFTemplate';
import ProfessionalPDFTemplate from './pdf/ProfessionalPDFTemplate';
import CreativeBluePDFTemplate from './pdf/CreativeBluePDFTemplate';

// Simplified template registry with only PDF components
const templateRegistry = {
  classic: { 
    PDFComponent: ClassicPDFTemplate 
  },
  modern: { 
    PDFComponent: ModernPDFTemplate 
  },
  creative: { 
    PDFComponent: CreativePDFTemplate 
  },
  executive: { 
    PDFComponent: ExecutivePDFTemplate 
  },
  professional: { 
    PDFComponent: ProfessionalPDFTemplate 
  },
  creativeBlue: { 
    PDFComponent: CreativeBluePDFTemplate 
  }
};

// Get template styles by ID - now returns an empty object since styles are defined in components
export const getTemplateStyles = () => ({});

// Get template PDF component by ID
export const getTemplatePDFComponent = (templateId) => {
  return (templateRegistry[templateId] || templateRegistry.classic).PDFComponent;
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