import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates a PDF from the resume preview container with improved layout matching
 * @param {string} fileName - Name for the downloaded file
 * @returns {Promise} - Promise that resolves when PDF is generated and downloaded
 */
export const generateResumePDF = async (fileName = 'resume') => {
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
    
    // Enhance links for better PDF export
    const links = clone.querySelectorAll('a');
    links.forEach(link => {
      // Style links to be visibly clickable
      link.style.color = '#3182ce'; // Blue color for links
      link.style.textDecoration = 'none';
      link.style.fontWeight = '500';
      link.style.wordBreak = 'break-word';
      link.style.overflowWrap = 'break-word';
      
      // Set target attribute for opening in new tab
      link.setAttribute('target', '_blank');
      
      // Get the URL from the href
      const url = link.getAttribute('href');
      
      // If this is a GitHub, LinkedIn, or Portfolio link, replace the inner text
      if (url) {
        if (url.includes('github.com')) {
          link.innerText = 'GitHub';
        } else if (url.includes('linkedin.com')) {
          link.innerText = 'LinkedIn';
        } else if (
          !url.includes('mailto:') && 
          (url.includes('.com') || url.includes('.dev') || url.includes('.io') || url.includes('.net'))
        ) {
          link.innerText = 'Portfolio';
        }
      }
    });
    
    // Center align the name at the top
    const nameElement = clone.querySelector('.resume-name');
    if (nameElement) {
      nameElement.style.textAlign = 'center';
    }
    
    // Temporarily append the clone to the document body but hide it
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    
    // Options for better quality and text rendering
    const options = {
      scale: 2, // Higher scale for better quality
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
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = -pageHeight * pageCount;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      pageCount++;
    }
    
    // Add metadata for ATS optimization
    pdf.setProperties({
      title: 'Resume',
      subject: 'Professional Resume',
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

/**
 * Generates an ATS-optimized text-based PDF with improved formatting and hyperlinks
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
    
    // Add contact information with proper formatting
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    const contactInfo = [];
    if (resumeData.header.email) contactInfo.push(`Email: ${resumeData.header.email}`);
    if (resumeData.header.phone) contactInfo.push(`Phone: ${resumeData.header.phone}`);
    
    // Place contact info centered
    if (contactInfo.length > 0) {
      const contactText = contactInfo.join(' | ');
      const splitContact = pdf.splitTextToSize(contactText, contentWidth);
      pdf.text(splitContact, pageWidth / 2, yPos, { align: 'center' });
      yPos += splitContact.length * lineHeight;
    }
    
    // Add social links with clickable text
    const socialLinks = [];
    
    if (resumeData.header.github) {
      // Calculate position for GitHub link
      const githubText = "GitHub";
      const githubX = pageWidth / 2 - pdf.getTextWidth("GitHub | LinkedIn | Portfolio") / 2;
      socialLinks.push({ text: githubText, url: resumeData.header.github, x: githubX });
    }
    
    if (resumeData.header.linkedin) {
      // Calculate position for LinkedIn link
      const linkedinText = "LinkedIn";
      const linkedinX = pageWidth / 2 - pdf.getTextWidth("LinkedIn | Portfolio") / 2 + 
                       (resumeData.header.github ? pdf.getTextWidth("GitHub | ") : 0);
      socialLinks.push({ text: linkedinText, url: resumeData.header.linkedin, x: linkedinX });
    }
    
    if (resumeData.header.portfolio) {
      // Calculate position for Portfolio link
      const portfolioText = "Portfolio";
      const portfolioX = pageWidth / 2 + 
                        (resumeData.header.github && resumeData.header.linkedin ? 
                         pdf.getTextWidth("GitHub | LinkedIn | ") / 2 - pdf.getTextWidth("Portfolio") / 2 : 
                         (resumeData.header.github || resumeData.header.linkedin ? 
                          pdf.getTextWidth("GitHub | ") / 2 : -pdf.getTextWidth("Portfolio") / 2));
      socialLinks.push({ text: portfolioText, url: resumeData.header.portfolio, x: portfolioX });
    }
    
    // Place social links centered
    if (socialLinks.length > 0) {
      // Get the full text first to calculate center position
      const socialTextsOnly = socialLinks.map(link => link.text);
      const delimitedText = socialTextsOnly.join(" | ");
      const textWidth = pdf.getTextWidth(delimitedText);
      const startX = pageWidth / 2 - textWidth / 2;
      
      let currentX = startX;
      
      // Draw each link separately with proper color and linking
      for (let i = 0; i < socialLinks.length; i++) {
        const link = socialLinks[i];
        
        // Set blue color for links
        pdf.setTextColor(49, 130, 206); // #3182ce blue
        
        // Add the link text with clickable URL
        pdf.textWithLink(link.text, currentX, yPos, {
          url: link.url
        });
        
        currentX += pdf.getTextWidth(link.text);
        
        // Add delimiter if not the last item
        if (i < socialLinks.length - 1) {
          pdf.setTextColor(0); // Reset to black
          const delimiter = " | ";
          pdf.text(delimiter, currentX, yPos);
          currentX += pdf.getTextWidth(delimiter);
        }
      }
      
      // Reset text color
      pdf.setTextColor(0);
      
      yPos += lineHeight * 1.5; // Extra spacing after links
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
        
        // Create degree text with specialization if available
        const degree = edu.degree || '';
        const specialization = edu.specialization ? ` in ${edu.specialization}` : '';
        const degreeText = `${degree}${specialization}`;
        
        const splitDegree = pdf.splitTextToSize(degreeText, contentWidth);
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

export default {
  generateResumePDF,
  generateATSOptimizedPDF
};  