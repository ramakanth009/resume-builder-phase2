import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ResumePDF from '../components/resumeBuilder/ResumePDF';

/**
 * Generate and download a PDF version of the resume using react-pdf
 * @param {Object} resumeData - Resume data object
 * @param {string} fileName - Name for the downloaded file (without extension)
 * @param {string} templateName - Template style to use ('modern', 'classic', 'minimal')
 * @returns {Promise<boolean>} - True if PDF generation successful
 */
export const generateResumePDF = async (resumeData, fileName = 'resume', templateName = 'classic') => {
  try {
    // Validate inputs
    if (!resumeData || !resumeData.header) {
      throw new Error('Invalid resume data structure');
    }

    // Format filename
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    // Generate PDF blob with selected template
    const blob = await pdf(<ResumePDF resumeData={resumeData} templateName={templateName} />).toBlob();
    
    // Save the file using FileSaver
    saveAs(blob, `${safeFileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/**
 * Format generated PDF for ATS compatibility
 * This approach uses react-pdf which creates a more accessible PDF than html2canvas
 * @param {Object} resumeData - Resume data object
 * @param {string} fileName - Name for the downloaded file
 * @param {string} templateName - Template style to use
 * @returns {Promise<boolean>} - True if PDF generation successful
 */
export const generateATSOptimizedPDF = async (resumeData, fileName = 'resume', templateName = 'classic') => {
  // The ResumePDF component already creates an ATS-friendly PDF with proper text layers
  return generateResumePDF(resumeData, fileName, templateName);
};

/**
 * Legacy method kept for backward compatibility using jsPDF and html2canvas
 * Note: This method is kept for reference but not recommended for production use
 * @deprecated Use generateResumePDF instead which provides better ATS compatibility
 */
export const generateLegacyPDF = async (resumeData, fileName = 'resume') => {
  console.warn('generateLegacyPDF is deprecated. Use generateResumePDF for better ATS compatibility');
  
  try {
    // Dynamically import the required libraries only if this method is called
    const jsPDF = (await import('jspdf')).default;
    const html2canvas = (await import('html2canvas')).default;
    
    // Select the resume container
    const resumeElement = document.querySelector('.resume-container');
    if (!resumeElement) {
      throw new Error('Resume element not found');
    }
    
    // Create a clone to manipulate for capture
    const clone = resumeElement.cloneNode(true);
    clone.style.width = '210mm'; // A4 width
    clone.style.height = 'auto';
    clone.style.padding = '15mm';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    
    // Capture the visual representation
    const canvas = await html2canvas(clone, {
      scale: 1.5,
      useCORS: true,
      logging: false,
      letterRendering: true,
      allowTaint: false
    });
    
    // Remove the clone
    document.body.removeChild(clone);
    
    // Create PDF with A4 dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add the image to the PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.85);
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    
    // Set document properties for ATS optimization
    pdf.setProperties({
      title: resumeData.header?.name || 'Professional Resume',
      subject: `Resume - ${resumeData.target_role || 'Professional'}`,
      author: resumeData.header?.name || 'Job Applicant',
      keywords: resumeData.skills ? resumeData.skills.join(', ') : 'resume, CV'
    });
    
    // Save with proper filename
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pdf.save(`${safeFileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating legacy PDF:', error);
    throw error;
  }
};

export default {
  generateResumePDF,
  generateATSOptimizedPDF,
  generateLegacyPDF
};