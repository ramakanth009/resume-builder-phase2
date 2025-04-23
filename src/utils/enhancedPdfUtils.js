// src/utils/enhancedPdfUtils.js
import { generateResumePDF, generateATSOptimizedPDF } from './enhanced-pdf-utils';

// Export the enhanced versions
export const generateVisualResumePDF = generateResumePDF;

export default {
  generateVisualResumePDF,
  generateATSOptimizedPDF
};