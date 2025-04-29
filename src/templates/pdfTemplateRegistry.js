// src/templates/templateRegistry.js
import React from 'react';
import classicStyles from './pdf/classicStyles';
import modernStyles from './pdf/modernStyles';
import creativeStyles from './pdf/creativeStyles';
import executiveStyles from './pdf/executiveStyles';
import professionalStyles from './pdf/professionalStyles';
import creativeBlueStyles from './pdf/creativeBlueStyles';

// Import template preview components
import ClassicTemplate from './preview/ClassicTemplate';
import ModernTemplate from './preview/ModernTemplate';
import CreativeTemplate from './preview/CreativeTemplate';
import ExecutiveTemplate from './preview/ExecutiveTemplate';
import ProfessionalTemplate from './preview/ProfessionalTemplate';
import CreativeBlueTemplate from './preview/CreativeBlueTemplate';

// Import PDF template components
import ClassicPDFTemplate from './pdf/ClassicPDFTemplate';
import ModernPDFTemplate from './pdf/ModernPDFTemplate';
import CreativePDFTemplate from './pdf/CreativePDFTemplate';
import ExecutivePDFTemplate from './pdf/ExecutivePDFTemplate';
import ProfessionalPDFTemplate from './pdf/ProfessionalPDFTemplate';
import CreativeBluePDFTemplate from './pdf/CreativeBluePDFTemplate';

const templateRegistry = {
  classic: {
    name: 'Classic',
    description: 'A clean, professional template with a traditional layout',
    styles: classicStyles,
    PreviewComponent: ClassicTemplate,
    PDFComponent: ClassicPDFTemplate,
  },
  modern: {
    name: 'Modern',
    description: 'A contemporary template with a sleek, minimalist design',
    styles: modernStyles,
    PreviewComponent: ModernTemplate,
    PDFComponent: ModernPDFTemplate,
  },
  // Add other templates similarly
};

export const getTemplateById = (id) => {
  return templateRegistry[id] || templateRegistry.classic;
};

export const getAllTemplates = () => {
  return Object.entries(templateRegistry).map(([id, template]) => ({
    id,
    name: template.name,
    description: template.description,
  }));
};

export default templateRegistry;