import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Enhanced PDF generator that creates an ATS and OCR-friendly resume while maintaining visual fidelity
 * @param {Object} resumeData - Resume data object
 * @param {string} fileName - Name for the downloaded file
 * @returns {Promise} - Promise that resolves when PDF is generated and downloaded
 */
export const generateEnhancedPDF = async (resumeData, fileName = 'resume') => {
  try {
    // Initialize PDF with A4 dimensions and compression enabled
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true // Enable PDF compression
    });

    // Set document properties for ATS optimization
    pdf.setProperties({
      title: resumeData.header?.name || 'Professional Resume',
      subject: `Resume - ${resumeData.target_role || 'Professional'}`,
      author: resumeData.header?.name || 'Job Applicant',
      keywords: resumeData.skills ? resumeData.skills.join(', ') : 'resume, CV, job application',
      creator: 'Resume Builder Application'
    });

    // Page dimensions and margins
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15; // 15mm margins
    const contentWidth = pageWidth - (margin * 2);
    
    // Track Y position throughout the document
    let yPos = margin;
    
    // Configure base measurements
    const lineHeight = 6.5;
    const sectionSpacing = lineHeight * 1.5;
    
    // Setup font for the document - using standard embedded fonts
    pdf.setFont('helvetica', 'normal');
    
    // Header Section - render name
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text(resumeData.header.name || 'Resume', pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight * 1.5;
    
    // Contact information row with proper spacing and alignment
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    // Contact info
    const contactInfo = [];
    if (resumeData.header.email) contactInfo.push(`Email: ${resumeData.header.email}`);
    if (resumeData.header.phone) contactInfo.push(`Phone: ${resumeData.header.phone}`);
    
    if (contactInfo.length > 0) {
      const contactText = contactInfo.join(' | ');
      const splitContact = pdf.splitTextToSize(contactText, contentWidth);
      pdf.text(splitContact, pageWidth / 2, yPos, { align: 'center' });
      yPos += splitContact.length * lineHeight;
    }
    
    // Links section with clickable hyperlinks
    const links = [];
    if (resumeData.header.github) links.push({ text: 'GitHub', url: ensureUrl(resumeData.header.github) });
    if (resumeData.header.linkedin) links.push({ text: 'LinkedIn', url: ensureUrl(resumeData.header.linkedin) });
    if (resumeData.header.portfolio) links.push({ text: 'Portfolio', url: ensureUrl(resumeData.header.portfolio) });
    
    if (links.length > 0) {
      const linkText = links.map(l => l.text).join(' | ');
      const textWidth = pdf.getTextWidth(linkText);
      const startX = pageWidth / 2 - textWidth / 2;
      
      let currentX = startX;
      for (let i = 0; i < links.length; i++) {
        // Set color for links
        pdf.setTextColor(49, 130, 206); // #3182ce blue
        
        // Add clickable link
        pdf.textWithLink(links[i].text, currentX, yPos, {
          url: links[i].url
        });
        
        currentX += pdf.getTextWidth(links[i].text);
        
        // Add separator if not the last link
        if (i < links.length - 1) {
          pdf.setTextColor(0); // Reset to black
          const separator = ' | ';
          pdf.text(separator, currentX, yPos);
          currentX += pdf.getTextWidth(separator);
        }
      }
      
      pdf.setTextColor(0); // Reset to black
      yPos += lineHeight * 1.5;
    }
    
    // Add target role if available
    if (resumeData.target_role) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      const roleText = `Target Role: ${resumeData.target_role}`;
      pdf.text(roleText, pageWidth / 2, yPos, { align: 'center' });
      yPos += lineHeight * 1.5;
    }
    
    // Professional Summary
    if (resumeData.summary) {
      yPos = addSection(pdf, 'Professional Summary', yPos, margin, pageWidth);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const splitSummary = pdf.splitTextToSize(resumeData.summary, contentWidth);
      pdf.text(splitSummary, margin, yPos);
      yPos += splitSummary.length * lineHeight + sectionSpacing;
      
      // Check for page break
      yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
    }
    
    // Skills Section - important for ATS
    if (resumeData.skills && resumeData.skills.length > 0) {
      yPos = addSection(pdf, 'Skills', yPos, margin, pageWidth);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const skillsText = resumeData.skills.join(' • ');
      const splitSkills = pdf.splitTextToSize(skillsText, contentWidth);
      pdf.text(splitSkills, margin, yPos);
      yPos += splitSkills.length * lineHeight + sectionSpacing;
      
      // Check for page break
      yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
    }
    
    // Work Experience Section
    const workExperience = resumeData.workExperience || resumeData.work_experience || [];
    if (workExperience.length > 0) {
      yPos = addSection(pdf, 'Work Experience', yPos, margin, pageWidth);
      
      workExperience.forEach((exp, index) => {
        // Check for page break
        yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
        
        // Job title and company
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        const title = exp.position || '';
        const company = exp.companyName || exp.company_name || '';
        pdf.text(`${title}${company ? ' | ' + company : ''}`, margin, yPos);
        yPos += lineHeight;
        
        // Duration
        if (exp.duration) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'italic');
          pdf.text(exp.duration, margin, yPos);
          yPos += lineHeight;
        }
        
        // Responsibilities with bullet points
        const responsibilities = exp.responsibilities || [];
        if (responsibilities.length > 0) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          
          responsibilities.forEach(responsibility => {
            // Check for page break
            yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
            
            const bulletText = `• ${responsibility}`;
            const splitText = pdf.splitTextToSize(bulletText, contentWidth - 5);
            pdf.text(splitText, margin + 5, yPos);
            yPos += splitText.length * lineHeight;
          });
        } else if (exp.description) {
          // If no responsibilities array but has description
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          
          const splitDesc = pdf.splitTextToSize(exp.description, contentWidth);
          pdf.text(splitDesc, margin, yPos);
          yPos += splitDesc.length * lineHeight;
        }
        
        // Add space between experiences
        yPos += index < workExperience.length - 1 ? lineHeight : 0;
        
        // Check for page break
        yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
      });
      
      yPos += sectionSpacing / 2;
    }
    
    // Education Section
    if (resumeData.education) {
      yPos = addSection(pdf, 'Education', yPos, margin, pageWidth);
      
      // Handle both array and object formats
      const educationItems = Array.isArray(resumeData.education) 
        ? resumeData.education 
        : [resumeData.education];
      
      educationItems.forEach((edu, index) => {
        // Check for page break
        yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
        
        if (edu.degree || edu.specialization) {
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          
          const degree = edu.degree || '';
          const specialization = edu.specialization ? ` in ${edu.specialization}` : '';
          pdf.text(`${degree}${specialization}`, margin, yPos);
          yPos += lineHeight;
        }
        
        if (edu.institution) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          pdf.text(edu.institution, margin, yPos);
          yPos += lineHeight;
        }
        
        const gradYear = edu.graduationYear || edu.graduation_year;
        if (gradYear) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'italic');
          pdf.text(`Graduated: ${gradYear}`, margin, yPos);
          yPos += lineHeight;
        }
        
        // Add space between education items
        yPos += index < educationItems.length - 1 ? lineHeight / 2 : 0;
      });
      
      yPos += sectionSpacing / 2;
    }
    
    // Projects Section
    const projects = resumeData.projects || resumeData.Academic_projects || [];
    if (projects.length > 0) {
      yPos = addSection(pdf, 'Projects', yPos, margin, pageWidth);
      
      projects.forEach((project, index) => {
        // Check for page break
        yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
        
        // Project name
        if (project.name) {
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(project.name, margin, yPos);
          yPos += lineHeight;
        }
        
        // Skills used
        const skills = project.skills_used || 
          (Array.isArray(project.technologies) ? project.technologies.join(', ') : '');
          
        if (skills) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'italic');
          const skillsText = `Skills: ${skills}`;
          const splitSkills = pdf.splitTextToSize(skillsText, contentWidth);
          pdf.text(splitSkills, margin, yPos);
          yPos += splitSkills.length * lineHeight;
        }
        
        // Project responsibilities with bullet points
        const responsibilities = project.responsibilities || [];
        if (responsibilities.length > 0) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          
          responsibilities.forEach(responsibility => {
            // Check for page break
            yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
            
            const bulletText = `• ${responsibility}`;
            const splitText = pdf.splitTextToSize(bulletText, contentWidth - 5);
            pdf.text(splitText, margin + 5, yPos);
            yPos += splitText.length * lineHeight;
          });
        } else if (project.description) {
          // If no responsibilities array but has description
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          
          const splitDesc = pdf.splitTextToSize(project.description, contentWidth);
          pdf.text(splitDesc, margin, yPos);
          yPos += splitDesc.length * lineHeight;
        }
        
        // Add space between projects
        yPos += index < projects.length - 1 ? lineHeight : 0;
        
        // Check for page break
        yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
      });
      
      yPos += sectionSpacing / 2;
    }
    
    // Certifications Section
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      yPos = addSection(pdf, 'Certifications', yPos, margin, pageWidth);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      resumeData.certifications.forEach(cert => {
        // Check for page break
        yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
        
        const bulletText = `• ${cert}`;
        const splitText = pdf.splitTextToSize(bulletText, contentWidth - 5);
        pdf.text(splitText, margin + 5, yPos);
        yPos += splitText.length * lineHeight;
      });
      
      yPos += sectionSpacing / 2;
    }
    
    // Custom Sections
    if (resumeData.customSections && Object.keys(resumeData.customSections).length > 0) {
      Object.entries(resumeData.customSections).forEach(([sectionName, content]) => {
        // Skip empty sections
        if (Array.isArray(content) && content.length === 0) return;
        if (typeof content === 'string' && !content.trim()) return;
        
        // Check for page break
        yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
        
        yPos = addSection(pdf, sectionName.replace(/_/g, ' '), yPos, margin, pageWidth);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        if (Array.isArray(content)) {
          content.forEach(item => {
            // Check for page break
            yPos = checkForPageBreak(pdf, yPos, pageHeight, margin);
            
            const bulletText = `• ${item}`;
            const splitText = pdf.splitTextToSize(bulletText, contentWidth - 5);
            pdf.text(splitText, margin + 5, yPos);
            yPos += splitText.length * lineHeight;
          });
        } else if (typeof content === 'string') {
          const splitText = pdf.splitTextToSize(content, contentWidth);
          pdf.text(splitText, margin, yPos);
          yPos += splitText.length * lineHeight;
        }
        
        yPos += sectionSpacing / 2;
      });
    }
    
    // Prepare the filename
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    // Add invisible text layer with full resume content for better ATS parsing
    addATSOptimizationLayer(pdf, resumeData);
    
    // Save the PDF - with optimization for file size
    pdf.save(`${safeFileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating enhanced PDF:', error);
    throw error;
  }
};

/**
 * Add an invisible text layer with complete resume content for ATS optimization
 * @param {Object} pdf - jsPDF instance
 * @param {Object} resumeData - Resume data
 */
function addATSOptimizationLayer(pdf, resumeData) {
  // Add a new page at the end that will be hidden visually but contains all text
  const lastPage = pdf.internal.getNumberOfPages();
  pdf.addPage();
  
  // Set text color to transparent for this page - visible to ATS but not to humans
  pdf.setTextColor(255, 255, 255, 0);
  pdf.setFontSize(8);
  
  let atsText = '';
  
  // Add header information
  atsText += `${resumeData.header.name || ''}\n`;
  atsText += `Email: ${resumeData.header.email || ''}\n`;
  atsText += `Phone: ${resumeData.header.phone || ''}\n`;
  
  if (resumeData.header.github) atsText += `GitHub: ${resumeData.header.github}\n`;
  if (resumeData.header.linkedin) atsText += `LinkedIn: ${resumeData.header.linkedin}\n`;
  if (resumeData.header.portfolio) atsText += `Portfolio: ${resumeData.header.portfolio}\n`;
  
  // Add target role
  if (resumeData.target_role) atsText += `Target Role: ${resumeData.target_role}\n\n`;
  
  // Add summary
  if (resumeData.summary) atsText += `PROFESSIONAL SUMMARY\n${resumeData.summary}\n\n`;
  
  // Add skills
  if (resumeData.skills && resumeData.skills.length > 0) {
    atsText += `SKILLS\n${resumeData.skills.join(', ')}\n\n`;
  }
  
  // Add work experience
  const workExperience = resumeData.workExperience || resumeData.work_experience || [];
  if (workExperience.length > 0) {
    atsText += 'WORK EXPERIENCE\n';
    
    workExperience.forEach(exp => {
      const title = exp.position || '';
      const company = exp.companyName || exp.company_name || '';
      const duration = exp.duration || '';
      
      atsText += `${title} | ${company}\n${duration}\n`;
      
      // Add responsibilities
      const responsibilities = exp.responsibilities || [];
      if (responsibilities.length > 0) {
        responsibilities.forEach(resp => {
          atsText += `• ${resp}\n`;
        });
      } else if (exp.description) {
        atsText += `${exp.description}\n`;
      }
      
      atsText += '\n';
    });
  }
  
  // Add education
  if (resumeData.education) {
    atsText += 'EDUCATION\n';
    
    const educationItems = Array.isArray(resumeData.education) 
      ? resumeData.education 
      : [resumeData.education];
    
    educationItems.forEach(edu => {
      const degree = edu.degree || '';
      const specialization = edu.specialization ? ` in ${edu.specialization}` : '';
      const institution = edu.institution || '';
      const year = edu.graduationYear || edu.graduation_year || '';
      
      atsText += `${degree}${specialization}\n${institution}\nGraduated: ${year}\n\n`;
    });
  }
  
  // Add projects
  const projects = resumeData.projects || resumeData.Academic_projects || [];
  if (projects.length > 0) {
    atsText += 'PROJECTS\n';
    
    projects.forEach(project => {
      atsText += `${project.name || ''}\n`;
      
      const skills = project.skills_used || 
        (Array.isArray(project.technologies) ? project.technologies.join(', ') : '');
        
      if (skills) atsText += `Skills: ${skills}\n`;
      
      // Add responsibilities
      const responsibilities = project.responsibilities || [];
      if (responsibilities.length > 0) {
        responsibilities.forEach(resp => {
          atsText += `• ${resp}\n`;
        });
      } else if (project.description) {
        atsText += `${project.description}\n`;
      }
      
      atsText += '\n';
    });
  }
  
  // Add certifications
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    atsText += 'CERTIFICATIONS\n';
    resumeData.certifications.forEach(cert => {
      atsText += `• ${cert}\n`;
    });
    atsText += '\n';
  }
  
  // Add custom sections
  if (resumeData.customSections && Object.keys(resumeData.customSections).length > 0) {
    Object.entries(resumeData.customSections).forEach(([sectionName, content]) => {
      atsText += `${sectionName.replace(/_/g, ' ').toUpperCase()}\n`;
      
      if (Array.isArray(content)) {
        content.forEach(item => {
          atsText += `• ${item}\n`;
        });
      } else if (typeof content === 'string') {
        atsText += `${content}\n`;
      }
      
      atsText += '\n';
    });
  }
  
  // Add the ATS text to the hidden page
  const splitText = pdf.splitTextToSize(atsText, 180);
  pdf.text(splitText, 15, 15);
  
  // Remove the last page from view (keep it in the document for ATS)
  // This is done by adding a clipping path that hides the content
  pdf.clip([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);
}

/**
 * Ensure a URL has http/https protocol
 * @param {string} url - URL to check
 * @returns {string} - URL with protocol
 */
function ensureUrl(url) {
  if (!url) return '';
  return url.match(/^https?:\/\//) ? url : `https://${url}`;
}

/**
 * Add a section header to the PDF with proper styling
 * @param {Object} pdf - jsPDF instance
 * @param {string} title - Section title
 * @param {number} yPos - Current y position
 * @param {number} margin - Page margin
 * @param {number} pageWidth - Page width
 * @returns {number} - Updated y position
 */
function addSection(pdf, title, yPos, margin, pageWidth) {
  // Check if we need a page break
  yPos = checkForPageBreak(pdf, yPos, pdf.internal.pageSize.getHeight(), margin);
  
  // Add section title
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(title, margin, yPos);
  
  // Add underline
  yPos += 1;
  pdf.setDrawColor(49, 130, 206); // #3182ce blue
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  
  return yPos + 5; // Return new position after title
}

/**
 * Check if a page break is needed and add a new page if necessary
 * @param {Object} pdf - jsPDF instance
 * @param {number} yPos - Current y position
 * @param {number} pageHeight - Page height
 * @param {number} margin - Page margin
 * @returns {number} - Updated y position
 */
function checkForPageBreak(pdf, yPos, pageHeight, margin) {
  if (yPos > pageHeight - margin - 10) {
    pdf.addPage();
    return margin + 10;
  }
  return yPos;
}

/**
 * Hybrid approach that uses both text-based PDF generation for ATS-compatibility
 * and overlay of the visual template for pixel-perfect accuracy
 * @param {Object} resumeData - Resume data object
 * @param {string} fileName - Name for the downloaded file
 * @returns {Promise} - Promise that resolves when PDF is generated and downloaded
 */
export const generateHybridPDF = async (resumeData, fileName = 'resume') => {
  try {
    // First, capture the visual representation
    const resumeElement = document.querySelector('.resume-container');
    
    if (!resumeElement) {
      throw new Error('Resume element not found');
    }
    
    // Create a clone to manipulate for capture
    const clone = resumeElement.cloneNode(true);
    clone.style.width = '210mm'; // A4 width
    clone.style.height = 'auto';
    clone.style.minHeight = '297mm'; // A4 height
    clone.style.padding = '15mm';
    clone.style.backgroundColor = '#ffffff';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    
    // Capture the visual representation
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      allowTaint: false
    });
    
    // Remove the clone
    document.body.removeChild(clone);
    
    // Calculate dimensions for A4
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create a text-based PDF first (for ATS compatibility)
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add the visual representation as an overlay
    const imgData = canvas.toDataURL('image/jpeg', 0.95); // Use JPEG for better compression
    
    // Set up content for multiple pages if needed
    let heightLeft = imgHeight;
    let position = 0;
    let pageCount = 1;
    
    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = -pageHeight * pageCount;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      pageCount++;
    }
    
    // Add hidden ATS-friendly text layer
    addATSOptimizationLayer(pdf, resumeData);
    
    // Set document properties for ATS optimization
    pdf.setProperties({
      title: resumeData.header?.name || 'Professional Resume',
      subject: `Resume - ${resumeData.target_role || 'Professional'}`,
      author: resumeData.header?.name || 'Job Applicant',
      keywords: resumeData.skills ? resumeData.skills.join(', ') : 'resume, CV, job application',
      creator: 'Resume Builder Application'
    });
    
    // Save with proper filename
    const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pdf.save(`${safeFileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating hybrid PDF:', error);
    throw error;
  }
};

// Export the main recommended method as default
export default {
  generateEnhancedPDF,
  generateHybridPDF,
  
  // Keep original methods for backward compatibility
  generateResumePDF,
  generateATSOptimizedPDF: generateEnhancedPDF // Replace with enhanced version
};