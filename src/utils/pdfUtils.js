// src/utils/pdfUtils.js
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ResumeDocument from '../components/previewComponents/ResumeDocument';
import { getTemplatePDFComponent } from '../templates/pdfTemplateRegistry';

export const generateResumePDF = async (resumeData, templateId = 'classic', fileName = 'resume') => {
  try {
    // Format filename
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    // Get the template component for PDF generation
    const PDFComponent = getTemplatePDFComponent(templateId);
    
    if (!PDFComponent) {
      throw new Error(`Template component not found for ID: ${templateId}`);
    }

    // Generate PDF blob with template component
    const blob = await pdf(
      <ResumeDocument 
        resumeData={resumeData} 
        PDFComponent={PDFComponent} 
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