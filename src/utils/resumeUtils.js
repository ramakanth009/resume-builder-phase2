// src/utils/pdfUtils.js
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { getTemplateById } from '../templates/templateRegistry';
import ResumeDocument from '../components/resumeBuilder/ResumeDocument';

/**
 * Generates a resume PDF using the specified template and resume data
 * 
 * @param {Object} resumeData - The resume data to render
 * @param {string} templateId - The ID of the template to use (falls back to default if not found)
 * @param {string} fileName - Base name for the PDF file (without extension)
 * @returns {Promise<boolean>} - Success status
 */
export const generateResumePDF = async (resumeData, templateId = 'classic', fileName = 'resume') => {
  try {
    // Validate inputs
    if (!resumeData || !resumeData.header) {
      throw new Error('Invalid resume data structure');
    }

    // Get template configuration
    const template = getTemplateById(templateId);
    
    // Format filename
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    // Generate PDF blob with specified template
    const blob = await pdf(
      <ResumeDocument 
        resumeData={resumeData} 
        template={template} 
      />
    ).toBlob();
    
    // Save the file
    saveAs(blob, `${safeFileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/**
 * Generates an ATS-optimized version of the resume
 * Currently uses the same generation mechanism as standard PDF
 * but could be enhanced with ATS-specific optimizations if needed
 * 
 * @param {Object} resumeData - The resume data to render
 * @param {string} templateId - The ID of the template to use (falls back to default if not found)
 * @param {string} fileName - Base name for the PDF file (without extension)
 * @returns {Promise<boolean>} - Success status
 */
export const generateATSOptimizedPDF = async (resumeData, templateId = 'classic', fileName = 'resume_ats') => {
  // For now, use the same function but could be enhanced with ATS-specific features
  return generateResumePDF(resumeData, templateId, fileName);
};

/**
 * Prepare a PDF blob without downloading it
 * This is useful for preview or sending to servers
 * 
 * @param {Object} resumeData - The resume data to render
 * @param {string} templateId - The ID of the template to use
 * @returns {Promise<Blob>} - PDF blob
 */
export const preparePDFBlob = async (resumeData, templateId = 'classic') => {
  try {
    // Get template configuration
    const template = getTemplateById(templateId);
    
    // Generate PDF blob with specified template
    const blob = await pdf(
      <ResumeDocument 
        resumeData={resumeData} 
        template={template} 
      />
    ).toBlob();
    
    return blob;
  } catch (error) {
    console.error('Error preparing PDF blob:', error);
    throw error;
  }
};

export default {
  generateResumePDF,
  generateATSOptimizedPDF,
  preparePDFBlob
};