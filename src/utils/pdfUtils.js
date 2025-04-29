// src/utils/pdfUtils.js
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ResumePDF from '../components/resumeBuilder/ResumePDF';
import { getRegisteredTemplateIds } from '../templates/pdfTemplateRegistry';

export const generateResumePDF = async (resumeData, templateId = 'classic', fileName = 'resume') => {
  try {
    // Validate inputs
    if (!resumeData || !resumeData.header) {
      throw new Error('Invalid resume data structure');
    }

    // Validate template ID
    const validTemplateIds = getRegisteredTemplateIds();
    const safeTemplateId = validTemplateIds.includes(templateId) ? templateId : 'classic';
    
    // Format filename
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    // Generate PDF blob with specified template
    const blob = await pdf(<ResumePDF resumeData={resumeData} templateId={safeTemplateId} />).toBlob();
    
    // Save the file
    saveAs(blob, `${safeFileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const generateATSOptimizedPDF = async (resumeData, templateId = 'classic', fileName = 'resume') => {
  return generateResumePDF(resumeData, templateId, fileName);
};

export default {
  generateResumePDF,
  generateATSOptimizedPDF
};