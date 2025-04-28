import classicPreview from '../assets/templates/classic-preview.jpeg';
import modernPreview from '../assets/templates/modern-preview.jpeg';
import creativePreview from '../assets/templates/creative-preview.jpeg';
import executivePreview from '../assets/templates/executive-preview.jpeg';

// Import template preview images

// Template data for resume templates
const templatesData = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'A clean, professional template with a traditional layout',
    previewImage: classicPreview,
    isDefault: true
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A contemporary template with a sleek, minimalist design',
    previewImage: modernPreview,
    isDefault: false
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A bold template that showcases your personality',
    previewImage: creativePreview,
    isDefault: false
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'A formal template ideal for senior positions',
    previewImage: executivePreview,
    isDefault: false
  }
];

export default templatesData;