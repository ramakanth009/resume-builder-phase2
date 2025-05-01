// src/data/templatesData.js

// Try to import images with require() to ensure they're properly processed by webpack
const classicPreview = require('../assets/templates/classic.png');
const modernPreview = require('../assets/templates/modern.png');
const creativePreview = require('../assets/templates/creative.png');
const executivePreview = require('../assets/templates/executive.png'); 
const professionalPreview = require('../assets/templates/professional.png');

// If imports aren't working, provide fallback placeholders
const fallbackImagePath = '/api/placeholder/400/320';

// Template data for resume templates
const templatesData = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'A clean, professional template with a traditional layout',
    previewImage: classicPreview || fallbackImagePath,
    isDefault: true
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A contemporary template with a sleek, minimalist design',
    previewImage: modernPreview || fallbackImagePath,
    isDefault: false
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A bold template that showcases your personality',
    previewImage: creativePreview || fallbackImagePath,
    isDefault: false
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'A formal template ideal for senior positions',
    previewImage: executivePreview || fallbackImagePath,
    isDefault: false
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean, light blue template with modern elegant design',
    previewImage: professionalPreview || fallbackImagePath,
    isDefault: false
  }
];

export default templatesData;