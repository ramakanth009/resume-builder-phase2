// src/utils/pdfUtils.js
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { getTemplateById, getRegisteredTemplateIds } from '../templates/pdfTemplateRegistry';
import ResumePDF from '../components/resumeBuilder/ResumePDF';

export const generateResumePDF = async (resumeData, templateId = 'classic', fileName = 'resume') => {
  try {
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

export default {
  generateResumePDF
};