// src/data/templatesData.js

// Use absolute paths to reference images in the public folder
// This approach bypasses webpack and ensures images load correctly
const templatesData = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'A clean, professional template with a traditional layout',
    previewImage: `${process.env.PUBLIC_URL}/assets/templates/classic.png`,
    isDefault: true
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A contemporary template with a sleek, minimalist design',
    previewImage: `${process.env.PUBLIC_URL}/assets/templates/modern.png`,
    isDefault: false
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A bold template that showcases your personality',
    previewImage: `${process.env.PUBLIC_URL}/assets/templates/creative.png`,
    isDefault: false
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'A formal template ideal for senior positions',
    previewImage: `${process.env.PUBLIC_URL}/assets/templates/executive.png`,
    isDefault: false
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean, light blue template with modern elegant design',
    previewImage: `${process.env.PUBLIC_URL}/assets/templates/professional.png`,
    isDefault: false
  }
];

export default templatesData;