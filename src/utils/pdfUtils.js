import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ResumeDocument from '../components/previewComponents/ResumeDocument';
import { getTemplatePDFComponent } from '../templates/pdfTemplateRegistry';

export const generateResumePDF = async (resumeData, templateId = 'classic', fileName = 'resume') => {
  try {
    // Validate input
    if (!resumeData || !resumeData.header) {
      throw new Error('Invalid resume data structure');
    }
    
    // Format filename
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    // Get template component
    const PDFComponent = getTemplatePDFComponent(templateId);
    
    if (!PDFComponent) {
      throw new Error(`Template component not found for ID: ${templateId}`);
    }

    // Generate PDF blob with error handling
    let blob;
    try {
      blob = await pdf(
        <ResumeDocument 
          resumeData={resumeData} 
          PDFComponent={PDFComponent} 
        />
      ).toBlob();
    } catch (pdfError) {
      console.error('PDF generation error:', pdfError);
      throw new Error(`Error generating PDF: ${pdfError.message}`);
    }
    
    // Save the file
    saveAs(blob, `${safeFileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error in generateResumePDF:', error);
    throw error;
  }
};