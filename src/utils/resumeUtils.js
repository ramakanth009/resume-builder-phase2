// src/utils/pdfUtils.js
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { getTemplateById } from '../templates/templateRegistry';
import ResumeDocument from '../components/resumeBuilder/ResumeDocument';

export const generateResumePDF = async (resumeData, templateId = 'classic', fileName = 'resume') => {
  try {
    // Get template configuration
    const template = getTemplateById(templateId);
    
    // Format filename
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    // Generate PDF with template-specific component
    const blob = await pdf(
      <ResumeDocument 
        resumeData={resumeData} 
        template={template} 
      />
    ).toBlob();
    
    // Optimize file size (if needed)
    // For most resumes, @react-pdf generates files under 2MB already
    
    // Save the file
    saveAs(blob, `${safeFileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export default {
  generateResumePDF
};