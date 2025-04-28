import classicPreview from '../assets/templates/classic-preview.jpeg';
import modernPreview from '../assets/templates/modern-preview.jpeg';
import creativePreview from '../assets/templates/creative-preview.jpeg';
import executivePreview from '../assets/templates/executive-preview.jpeg';
// Import template preview images for new templates
// These would need to be created based on the PDFs provided
// For now, we'll assume they exist with these names
import professionalPreview from '../assets/templates/professional-preview.jpg';
import creativeBluePreview from '../assets/templates/creative-blue-preview.jpg';

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
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean, light blue template with modern elegant design',
    previewImage: professionalPreview,
    isDefault: false
  },
  {
    id: 'creativeBlue',
    name: 'Creative Blue',
    description: 'A modern blue template focused on web and creative professionals',
    previewImage: creativeBluePreview,
    isDefault: false
  }
];

export default templatesData;