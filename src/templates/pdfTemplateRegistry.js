import React from 'react';

// Import template previews (React components for web UI)
import ClassicTemplate from './preview/ClassicTemplate';
import ModernTemplate from './preview/ModernTemplate';
import CreativeTemplate from './preview/CreativeTemplate';
import ExecutiveTemplate from './preview/ExecutiveTemplate';
import ProfessionalTemplate from './preview/ProfessionalTemplate';
import CreativeBlueTemplate from './preview/CreativeBlueTemplate';

// Import PDF templates (React-PDF components for PDF generation)
import ClassicPDFTemplate from './pdf/ClassicPDFTemplate';
import ModernPDFTemplate from './pdf/ModernPDFTemplate';
import CreativePDFTemplate from './pdf/CreativePDFTemplate';
import ExecutivePDFTemplate from './pdf/ExecutivePDFTemplate';
import ProfessionalPDFTemplate from './pdf/ProfessionalPDFTemplate';
import CreativeBluePDFTemplate from './pdf/CreativeBluePDFTemplate';

// Import preview images
import classicPreview from '../assets/templates/classic-preview.jpeg';
import modernPreview from '../assets/templates/modern-preview.jpeg';
import creativePreview from '../assets/templates/creative-preview.jpeg';
import executivePreview from '../assets/templates/executive-preview.jpeg';
import professionalPreview from '../assets/templates/professional-preview.jpg';
import creativeBluePreview from '../assets/templates/creative-blue-preview.jpg';

/**
 * Central registry of all resume templates
 * This allows easy addition of new templates while maintaining
 * a single source of truth for both preview and PDF generation
 */
const templateRegistry = {
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'A clean, professional template with a traditional layout',
    previewImage: classicPreview,
    PreviewComponent: ClassicTemplate,
    PDFComponent: ClassicPDFTemplate,
    isDefault: true
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'A contemporary template with a sleek, minimalist design',
    previewImage: modernPreview,
    PreviewComponent: ModernTemplate,
    PDFComponent: ModernPDFTemplate,
    isDefault: false
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'A bold template that showcases your personality',
    previewImage: creativePreview,
    PreviewComponent: CreativeTemplate,
    PDFComponent: CreativePDFTemplate,
    isDefault: false
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    description: 'A formal template ideal for senior positions',
    previewImage: executivePreview,
    PreviewComponent: ExecutiveTemplate,
    PDFComponent: ExecutivePDFTemplate,
    isDefault: false
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'A clean, light blue template with modern elegant design',
    previewImage: professionalPreview,
    PreviewComponent: ProfessionalTemplate,
    PDFComponent: ProfessionalPDFTemplate,
    isDefault: false
  },
  creativeBlue: {
    id: 'creativeBlue',
    name: 'Creative Blue',
    description: 'A modern blue template focused on web and creative professionals',
    previewImage: creativeBluePreview,
    PreviewComponent: CreativeBlueTemplate,
    PDFComponent: CreativeBluePDFTemplate,
    isDefault: false
  }
};

/**
 * Get a template by ID, with fallback to default template
 * @param {string} templateId - ID of the template to retrieve
 * @returns {Object} - Template configuration
 */
export const getTemplateById = (templateId) => {
  // If requested template doesn't exist, return default template
  if (!templateRegistry[templateId]) {
    const defaultTemplate = Object.values(templateRegistry).find(template => template.isDefault);
    return defaultTemplate || templateRegistry.classic; // Fallback to classic if no default is set
  }
  
  return templateRegistry[templateId];
};

/**
 * Get list of all available templates (for selection UI)
 * @returns {Array} - Array of template metadata
 */
export const getAllTemplates = () => {
  return Object.values(templateRegistry).map(({id, name, description, previewImage, isDefault}) => ({
    id,
    name,
    description,
    previewImage,
    isDefault
  }));
};

/**
 * Register a new template in the system
 * @param {string} id - Unique identifier for the template
 * @param {Object} templateConfig - Template configuration
 * @returns {boolean} - Success status
 */
export const registerTemplate = (id, templateConfig) => {
  if (!id || !templateConfig || templateRegistry[id]) {
    return false; // Invalid ID or duplicate template
  }
  
  // Validate required fields
  const requiredFields = ['name', 'description', 'PreviewComponent', 'PDFComponent'];
  const missingFields = requiredFields.filter(field => !templateConfig[field]);
  
  if (missingFields.length > 0) {
    console.error(`Template registration failed: missing required fields: ${missingFields.join(', ')}`);
    return false;
  }
  
  // Add ID to template config
  templateRegistry[id] = {
    ...templateConfig,
    id,
    isDefault: templateConfig.isDefault || false
  };
  
  return true;
};

export default templateRegistry;