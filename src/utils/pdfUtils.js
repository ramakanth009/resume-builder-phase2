import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates an ATS-optimized text-based PDF with improved formatting
 * @param {Object} resumeData - Resume data object
 * @param {string} fileName - Name for the downloaded file
 * @returns {Promise} - Promise that resolves when PDF is generated and downloaded
 */
export const generateATSOptimizedPDF = (resumeData, fileName = 'resume') => {
  try {
    // Create PDF with A4 dimensions (210 x 297 mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15; // 15mm margins
    const contentWidth = pageWidth - (margin * 2);
    
    // Set initial position
    let yPos = margin + 5;
    const lineHeight = 7;
    
    // Add name as title (centered)
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(resumeData.header.name || 'Resume', pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight * 1.5;
    
    // Add contact information (with proper wrapping for long text)
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    const contactInfo = [];
    if (resumeData.header.email) contactInfo.push(`Email: ${resumeData.header.email}`);
    if (resumeData.header.phone) contactInfo.push(`Phone: ${resumeData.header.phone}`);
    
    // Add LinkedIn and GitHub on a new line if they exist
    const socialLinks = [];
    if (resumeData.header.linkedin) socialLinks.push(`LinkedIn: ${resumeData.header.linkedin}`);
    if (resumeData.header.github) socialLinks.push(`GitHub: ${resumeData.header.github}`);
    
    // Place contact info centered
    if (contactInfo.length > 0) {
      const contactText = contactInfo.join(' | ');
      const splitContact = pdf.splitTextToSize(contactText, contentWidth);
      pdf.text(splitContact, pageWidth / 2, yPos, { align: 'center' });
      yPos += splitContact.length * lineHeight;
    }
    
    // Place social links on next line if they exist
    if (socialLinks.length > 0) {
      const socialText = socialLinks.join(' | ');
      const splitSocial = pdf.splitTextToSize(socialText, contentWidth);
      pdf.text(splitSocial, pageWidth / 2, yPos, { align: 'center' });
      yPos += splitSocial.length * lineHeight + lineHeight * 0.5;
    }
    
    // Add summary if available
    if (resumeData.summary) {
      yPos = addSection(pdf, 'Professional Summary', yPos, margin);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const splitSummary = pdf.splitTextToSize(resumeData.summary, contentWidth);
      pdf.text(splitSummary, margin, yPos);
      yPos += splitSummary.length * lineHeight * 0.85 + lineHeight;
    }
    
    // Add skills section
    if (resumeData.skills && resumeData.skills.length > 0) {
      yPos = addSection(pdf, 'Skills', yPos, margin);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const skillsText = resumeData.skills.join(', ');
      const splitSkills = pdf.splitTextToSize(skillsText, contentWidth);
      pdf.text(splitSkills, margin, yPos);
      yPos += splitSkills.length * lineHeight * 0.85 + lineHeight;
    }
    
    // Add work experience section
    const workExperience = resumeData.workExperience || resumeData.work_experience;
    if (workExperience && workExperience.length > 0) {
      yPos = addSection(pdf, 'Work Experience', yPos, margin);
      
      workExperience.forEach(exp => {
        // Check for new page
        if (yPos > pageHeight - margin) {
          pdf.addPage();
          yPos = margin + 5;
        }
        
        // Company and position
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        const company = exp.companyName || exp.company_name || '';
        const position = exp.position || '';
        const positionLine = `${position} | ${company}`;
        const splitPosition = pdf.splitTextToSize(positionLine, contentWidth);
        pdf.text(splitPosition, margin, yPos);
        yPos += splitPosition.length * lineHeight * 0.85;
        
        // Duration
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'italic');
        if (exp.duration) {
          pdf.text(exp.duration, margin, yPos);
          yPos += lineHeight;
        }
        
        // Responsibilities
        pdf.setFont('helvetica', 'normal');
        const responsibilities = exp.responsibilities || [];
        
        if (responsibilities.length > 0) {
          yPos += lineHeight * 0.5;
        }
        
        responsibilities.forEach(resp => {
          // Check for new page
          if (yPos > pageHeight - margin) {
            pdf.addPage();
            yPos = margin + 5;
          }
          
          const bulletText = `• ${resp}`;
          const splitText = pdf.splitTextToSize(bulletText, contentWidth - 5);
          pdf.text(splitText, margin + 5, yPos);
          yPos += splitText.length * lineHeight * 0.85 + 2;
        });
        
        yPos += lineHeight;
      });
    }
    
    // Add education section
    if (resumeData.education) {
      yPos = addSection(pdf, 'Education', yPos, margin);
      
      // Check for new page
      if (yPos > pageHeight - margin) {
        pdf.addPage();
        yPos = margin + 5;
      }
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      
      // Handle both array and object formats
      const educationItems = Array.isArray(resumeData.education) 
        ? resumeData.education 
        : [resumeData.education];
      
      educationItems.forEach(edu => {
        // Check for new page
        if (yPos > pageHeight - margin) {
          pdf.addPage();
          yPos = margin + 5;
        }
        
        const degree = edu.degree || '';
        const splitDegree = pdf.splitTextToSize(degree, contentWidth);
        pdf.text(splitDegree, margin, yPos);
        yPos += splitDegree.length * lineHeight * 0.85;
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const institution = edu.institution || '';
        const splitInstitution = pdf.splitTextToSize(institution, contentWidth);
        pdf.text(splitInstitution, margin, yPos);
        yPos += splitInstitution.length * lineHeight * 0.85;
        
        const gradYear = edu.graduationYear || edu.graduation_year || '';
        if (gradYear) {
          pdf.setFont('helvetica', 'italic');
          pdf.text(`Graduated: ${gradYear}`, margin, yPos);
          yPos += lineHeight;
        }
        
        yPos += lineHeight * 0.5;
      });
    }
    
    // Add projects section
    const projects = resumeData.projects || resumeData.Academic_projects;
    if (projects && projects.length > 0) {
      yPos = addSection(pdf, 'Projects', yPos, margin);
      
      projects.forEach(project => {
        // Check for new page
        if (yPos > pageHeight - margin) {
          pdf.addPage();
          yPos = margin + 5;
        }
        
        // Project name
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        const projectName = project.name || '';
        const splitName = pdf.splitTextToSize(projectName, contentWidth);
        pdf.text(splitName, margin, yPos);
        yPos += splitName.length * lineHeight * 0.85;
        
        // Project responsibilities or description
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        // Handle responsibilities array
        if (project.responsibilities && project.responsibilities.length > 0) {
          yPos += lineHeight * 0.5;
          
          project.responsibilities.forEach(resp => {
            if (yPos > pageHeight - margin) {
              pdf.addPage();
              yPos = margin + 5;
            }
            
            const bulletText = `• ${resp}`;
            const splitText = pdf.splitTextToSize(bulletText, contentWidth - 5);
            pdf.text(splitText, margin + 5, yPos);
            yPos += splitText.length * lineHeight * 0.85 + 2;
          });
        }
        
        // Handle direct description
        if (project.description) {
          if (yPos > pageHeight - margin) {
            pdf.addPage();
            yPos = margin + 5;
          }
          
          const splitDesc = pdf.splitTextToSize(project.description, contentWidth);
          pdf.text(splitDesc, margin, yPos);
          yPos += splitDesc.length * lineHeight * 0.85 + 2;
        }
        
        // Handle skills used
        if (project.skills_used || (project.technologies && project.technologies.length > 0)) {
          if (yPos > pageHeight - margin) {
            pdf.addPage();
            yPos = margin + 5;
          }
          
          const skillsText = project.skills_used || 
            (Array.isArray(project.technologies) ? project.technologies.join(', ') : '');
            
          if (skillsText) {
            pdf.setFont('helvetica', 'italic');
            const skillsLabel = `Skills: ${skillsText}`;
            const splitSkills = pdf.splitTextToSize(skillsLabel, contentWidth);
            pdf.text(splitSkills, margin, yPos);
            yPos += splitSkills.length * lineHeight * 0.85 + 2;
          }
        }
        
        yPos += lineHeight;
      });
    }
    
    // Add certifications section
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      yPos = addSection(pdf, 'Certifications', yPos, margin);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      resumeData.certifications.forEach(cert => {
        // Check for new page
        if (yPos > pageHeight - margin) {
          pdf.addPage();
          yPos = margin + 5;
        }
        
        const bulletText = `• ${cert}`;
        const splitText = pdf.splitTextToSize(bulletText, contentWidth - 5);
        pdf.text(splitText, margin + 5, yPos);
        yPos += splitText.length * lineHeight * 0.85 + 2;
      });
    }
    
    // Add custom sections
    if (resumeData.customSections && Object.keys(resumeData.customSections).length > 0) {
      Object.entries(resumeData.customSections).forEach(([sectionName, content]) => {
        if (yPos > pageHeight - margin - 15) {
          pdf.addPage();
          yPos = margin + 5;
        }
        
        yPos = addSection(pdf, sectionName.replace(/_/g, ' '), yPos, margin);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        if (Array.isArray(content)) {
          content.forEach(item => {
            if (yPos > pageHeight - margin) {
              pdf.addPage();
              yPos = margin + 5;
            }
            
            const bulletText = `• ${item}`;
            const splitText = pdf.splitTextToSize(bulletText, contentWidth - 5);
            pdf.text(splitText, margin + 5, yPos);
            yPos += splitText.length * lineHeight * 0.85 + 2;
          });
        } else if (typeof content === 'string') {
          const splitText = pdf.splitTextToSize(content, contentWidth);
          pdf.text(splitText, margin, yPos);
          yPos += splitText.length * lineHeight * 0.85 + lineHeight;
        }
      });
    }
    
    // Add metadata for ATS optimization
    pdf.setProperties({
      title: 'Resume',
      subject: 'Professional Resume',
      author: resumeData.header.name || 'Job Applicant',
      keywords: resumeData.skills ? resumeData.skills.join(', ') : 'resume, CV, job application',
      creator: 'Resume Builder Application'
    });
    
    // Save the PDF
    pdf.save(`${fileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating ATS-optimized PDF:', error);
    throw error;
  }
};

// Helper function to add a section header
function addSection(pdf, title, yPos, margin) {
  // Get page height from pdf object
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Check if we need a new page
  if (yPos > pageHeight - margin - 15) {
    pdf.addPage();
    yPos = margin + 5;
  }
  
  // Add section title
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(title, margin, yPos);
  
  // Add underline
  yPos += 1;
  pdf.setDrawColor(100, 100, 100);
  pdf.line(margin, yPos, pdf.internal.pageSize.getWidth() - margin, yPos);
  
  return yPos + 5; // Return new position after title
}

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
    console.error('Error generating visual PDF:', error);
    throw error;
  }
};

// For backward compatibility
export const generateResumePDF = generateATSOptimizedPDF;

export default {
  generateVisualResumePDF,
  generateATSOptimizedPDF,
  generateResumePDF
};