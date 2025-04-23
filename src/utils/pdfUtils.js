import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates a high-fidelity PDF from the resume preview container with exact style matching
 * and active links preserved in the output PDF
 * @param {string} fileName - Name for the downloaded file
 * @returns {Promise} - Promise that resolves when PDF is generated and downloaded
 */
export const generateVisualResumePDF = async (fileName = 'resume') => {
  try {
    // Find the resume preview container
    const resumeElement = document.querySelector('.resume-container');
    
    if (!resumeElement) {
      throw new Error('Resume element not found');
    }

    // Create a clone of the element to manipulate for PDF generation
    const clone = resumeElement.cloneNode(true);
    
    // Apply PDF-specific styling to ensure proper layout
    clone.style.width = '210mm'; // A4 width
    clone.style.minHeight = '297mm'; // A4 height
    clone.style.height = 'auto';
    clone.style.backgroundColor = '#ffffff';
    clone.style.padding = '20mm 15mm'; // Proper margins for A4
    clone.style.boxSizing = 'border-box';
    clone.style.overflow = 'hidden';
    
    // Store link information for adding active links later
    const linkInfo = [];
    
    // Process all links in the document to ensure they'll be active in the PDF
    const links = clone.querySelectorAll('a');
    links.forEach((link, index) => {
      // Ensure links don't overflow
      link.style.wordBreak = 'break-word';
      link.style.overflowWrap = 'break-word';
      
      // Store link href and position info for later
      const href = link.getAttribute('href');
      if (href) {
        // Add a data attribute to identify this link later
        link.setAttribute('data-pdf-link-id', `link-${index}`);
        linkInfo.push({
          id: `link-${index}`,
          href: href
        });
      }
    });
    
    // Center align the name at the top
    const nameElement = clone.querySelector('.resume-name');
    if (nameElement) {
      nameElement.style.textAlign = 'center';
      nameElement.style.fontWeight = 'bold';
    }
    
    // Temporarily append the clone to the document body but hide it
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    
    // Options for better quality and text rendering
    const options = {
      scale: 3, // Higher scale for better quality
      useCORS: true, // Enable loading of external images
      logging: false,
      letterRendering: true, // Improves text rendering
      allowTaint: false,
      backgroundColor: '#ffffff', // Ensure white background
      windowWidth: 794, // A4 width in px (210mm at 96dpi)
      windowHeight: 1123, // A4 height in px (297mm at 96dpi)
    };
    
    // Render the element to canvas
    const canvas = await html2canvas(clone, options);
    
    // Get link positions from rendered canvas
    const linkPositions = [];
    for (const link of linkInfo) {
      const element = clone.querySelector(`[data-pdf-link-id="${link.id}"]`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const cloneRect = clone.getBoundingClientRect();
        
        // Calculate relative position within the clone
        const relativeRect = {
          left: rect.left - cloneRect.left,
          top: rect.top - cloneRect.top,
          width: rect.width,
          height: rect.height
        };
        
        linkPositions.push({
          ...link,
          position: relativeRect
        });
      }
    }
    
    // Remove the clone from the document
    document.body.removeChild(clone);
    
    // Calculate dimensions for A4 PDF (210mm × 297mm)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF with A4 dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Handle multi-page PDFs if content exceeds A4 height
    let heightLeft = imgHeight;
    let position = 0;
    let pageCount = 1;
    
    // Add the first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    
    // Add hyperlinks to the PDF
    for (const link of linkPositions) {
      // Convert positions from pixels to mm for PDF coordinates
      const scaleFactor = imgWidth / canvas.width;
      const x = link.position.left * scaleFactor;
      const y = link.position.top * scaleFactor;
      const width = link.position.width * scaleFactor;
      const height = link.position.height * scaleFactor;
      
      // Only add links that are on this page
      if (y < pageHeight) {
        pdf.link(x, y, width, height, { url: link.href });
      }
    }
    
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = -pageHeight * pageCount;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      
      // Add hyperlinks that appear on this page
      for (const link of linkPositions) {
        const scaleFactor = imgWidth / canvas.width;
        const x = link.position.left * scaleFactor;
        const y = (link.position.top * scaleFactor) - (pageHeight * pageCount);
        const width = link.position.width * scaleFactor;
        const height = link.position.height * scaleFactor;
        
        // Only add links that are on this page
        if (y >= 0 && y < pageHeight) {
          pdf.link(x, y, width, height, { url: link.href });
        }
      }
      
      heightLeft -= pageHeight;
      pageCount++;
    }
    
    // Add metadata for better accessibility and SEO
    pdf.setProperties({
      title: 'Professional Resume',
      subject: 'Resume',
      author: document.querySelector('.resume-name')?.textContent || 'Job Applicant',
      keywords: 'resume, CV, job application',
      creator: 'Resume Builder Application'
    });
    
    // Save the PDF
    pdf.save(`${fileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// Original functions remain unchanged
export { generateResumePDF, generateATSOptimizedPDF } from '../utils/pdfUtils';

export default {
  generateVisualResumePDF,
  generateResumePDF,
  generateATSOptimizedPDF
};