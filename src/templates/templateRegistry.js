// // src/templates/templateRegistry.js
// import ClassicPDFTemplate from './pdf/ClassicPDFTemplate';
// import ModernPDFTemplate from './pdf/ModernPDFTemplate';
// import CreativePDFTemplate from './pdf/CreativePDFTemplate';
// import ExecutivePDFTemplate from './pdf/ExecutivePDFTemplate';
// import ProfessionalPDFTemplate from './pdf/ProfessionalPDFTemplate';
// import TwoColumnPDFTemplate from './pdf/TwoColumnPDFTemplate';
// import ExecutiveModernPDFTemplate from './pdf/ExecutiveModernPDFTemplate';
// import BlueCorporatePDFTemplate from './pdf/BlueCorporatePDFTemplate';

// // Simplified template registry with only PDF components
// const templateRegistry = {
//   classic: { 
//     PDFComponent: ClassicPDFTemplate 
//   },
//   modern: { 
//     PDFComponent: ModernPDFTemplate 
//   },
//   creative: { 
//     PDFComponent: CreativePDFTemplate 
//   },
//   executive: { 
//     PDFComponent: ExecutivePDFTemplate 
//   },
//   professional: { 
//     PDFComponent: ProfessionalPDFTemplate 
//   },
//   twoColumn: { PDFComponent: TwoColumnPDFTemplate },
// executiveModern: { PDFComponent: ExecutiveModernPDFTemplate },
// blueCorporate: { PDFComponent: BlueCorporatePDFTemplate }
// };

// // Get template styles by ID - now returns an empty object since styles are defined in components
// export const getTemplateStyles = () => ({});

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

// export default templateRegistry;