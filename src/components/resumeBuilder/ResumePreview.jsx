import React from 'react';
import { Box, Typography, Chip, Link, Divider } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import templatesData from '../../data/templatesData';

// Import template styles from separate files
import useClassicStyles from '../../styles/templates/classicStyles';
import useModernStyles from '../../styles/templates/modernStyles';
import useCreativeStyles from '../../styles/templates/creativeStyles';
import useExecutiveStyles from '../../styles/templates/executiveStyles';
import useProfessionalStyles from '../../styles/templates/professionalStyles';
import useCreativeBlueStyles from '../../styles/templates/creativeBlueStyles';

// Base styles for all templates
const useBaseStyles = makeStylesWithTheme((theme) => ({
  resumeContainer: {
    padding: '2rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    minHeight: '842px', // A4 height scaled down
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden', // Prevents text overflow
    fontFamily: 'Helvetica, Arial, sans-serif', // Consistent font family for PDF generation
  },
  generatedNotice: {
    marginTop: '2rem',
    textAlign: 'center',
    color: '#718096',
    fontSize: '0.875rem',
  }
}));

const ResumePreview = ({ userData, generatedData, templateId = 'classic' }) => {
  const baseClasses = useBaseStyles();
  const classicClasses = useClassicStyles();
  const modernClasses = useModernStyles();
  const creativeClasses = useCreativeStyles();
  const executiveClasses = useExecutiveStyles();
  const professionalClasses = useProfessionalStyles();
  const creativeBlueClasses = useCreativeBlueStyles();
  
  // Select the appropriate styles based on template
  const getTemplateClasses = () => {
    switch(templateId) {
      case 'modern':
        return modernClasses;
      case 'creative':
        return creativeClasses;
      case 'executive':
        return executiveClasses;
      case 'professional':
        return professionalClasses;
      case 'creativeBlue':
        return creativeBlueClasses;
      case 'classic':
      default:
        return classicClasses;
    }
  };
  
  const classes = getTemplateClasses();
  
  // Use generated data if available, otherwise use user data
  const data = generatedData || userData;

  // Helper functions
  const hasEducationData = () => {
    if (Array.isArray(data.education)) {
      return data.education.length > 0 && data.education.some(edu => 
        (edu.degree && edu.degree.trim() !== '') || 
        (edu.institution && edu.institution.trim() !== '') ||
        (edu.specialization && edu.specialization.trim() !== '')
      );
    }
    
    return data.education && (
      (data.education.degree && data.education.degree.trim() !== '') || 
      (data.education.institution && data.education.institution.trim() !== '') ||
      (data.education.specialization && data.education.specialization.trim() !== '')
    );
  };

  const hasProjectsData = () => {
    return data.projects && data.projects.length > 0 && 
      data.projects.some(p => p.name && p.name.trim() !== '');
  };

  const hasWorkExperienceData = () => {
    const userWorkExp = data.work_experience && data.work_experience.length > 0 && 
      data.work_experience.some(exp => 
        (exp.position && exp.position.trim() !== '') || 
        (exp.company_name && exp.company_name.trim() !== '')
      );
      
    const generatedWorkExp = data.workExperience && data.workExperience.length > 0 && 
      data.workExperience.some(exp => 
        (exp.position && exp.position.trim() !== '') || 
        (exp.companyName && exp.companyName.trim() !== '')
      );
      
    return userWorkExp || generatedWorkExp;
  };

  const renderLink = (label, url, type) => {
    if (!url) return null;
    
    let href = url;

    if (type === 'email') {
      href = `mailto:${url}`;
      // For email, we still want to display the email address
      return (
        <Link 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className={classes.contactLink}
          sx={{ wordBreak: 'break-word' }}
        >
          {url}
        </Link>
      );
    }

    if (href && !href.startsWith('http')) {
      href = `https://${href}`;
    }

    return (
      <Link 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={classes.contactLink}
      >
        {label}
      </Link>
    );
  };

  return (
    <Box className={`${baseClasses.resumeContainer} resume-container`}>
      {/* Header Section */}
      <Box className={classes.resumeHeader}>
        <Typography variant="h4" className={`${classes.resumeName} resume-name`}>
          {data.header.name || "Your Name"}
        </Typography>
        
        <Box className={classes.resumeContact}>
          {data.header.email && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              Email: {renderLink(null, data.header.email, 'email')}
            </Typography>
          )}
          
          {data.header.phone && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              Phone: {data.header.phone}
            </Typography>
          )}
          
          {data.header.github && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              {renderLink("GitHub", data.header.github, 'github')}
            </Typography>
          )}
          
          {data.header.linkedin && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              {renderLink("LinkedIn", data.header.linkedin, 'linkedin')}
            </Typography>
          )}
          
          {data.header.portfolio && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              {renderLink("Portfolio", data.header.portfolio, 'portfolio')}
            </Typography>
          )}
        </Box>
      </Box>
      
      {/* Target Role */}
      {data.target_role && data.target_role.trim() !== '' && (
        <Box className={classes.resumeSection} textAlign="center">
          <Typography variant="body1" fontWeight="medium">
            Target Role: {data.target_role}
          </Typography>
        </Box>
      )}
      
      {/* Summary Section */}
      {data.summary && data.summary.trim() !== '' && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Professional Summary
          </Typography>
          <Typography variant="body2" className={classes.resumeSummary}>
            {data.summary}
          </Typography>
        </Box>
      )}
      
      {/* Skills Section - Moving up for better visibility */}
      {data.skills && data.skills.length > 0 && data.skills.some(skill => skill && skill.trim() !== '') && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Skills
          </Typography>
          <Box className={classes.resumeSkills}>
            {data.skills.filter(skill => skill && skill.trim() !== '').map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                className={classes.resumeSkillChip}
              />
            ))}
          </Box>
        </Box>
      )}
      
      {/* Education Section */}
      {hasEducationData() && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Education
          </Typography>
          {Array.isArray(data.education) ? (
            data.education.map((edu, index) => (
              <Box key={index} className={classes.resumeEducation}>
                <Typography variant="subtitle1" className={classes.resumeSubtitle}>
                  {edu.degree || ''} 
                  {edu.specialization ? ` in ${edu.specialization}` : ''}
                </Typography>
                <Typography variant="body2">
                  {edu.institution || ''}
                </Typography>
                {(edu.graduation_year || edu.graduationYear) && (
                  <Typography variant="body2" className={classes.resumeDate}>
                    Graduated: {edu.graduation_year || edu.graduationYear}
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <Box className={classes.resumeEducation}>
              <Typography variant="subtitle1" className={classes.resumeSubtitle}>
                {data.education.degree || ''} 
                {data.education.specialization ? ` in ${data.education.specialization}` : ''}
              </Typography>
              <Typography variant="body2">
                {data.education.institution || ''}
              </Typography>
              {data.education.graduation_year && (
                <Typography variant="body2" className={classes.resumeDate}>
                  Graduated: {data.education.graduation_year}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}

      {/* Work Experience Section */}
      {hasWorkExperienceData() && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Work Experience
          </Typography>
          
          {/* Rest of the Work Experience section remains unchanged */}
          {/* ... existing code ... */}
        </Box>
      )}
      
      {/* Projects Section */}
      {hasProjectsData() && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Projects
          </Typography>
          
          {/* Rest of the Projects section remains unchanged */}
          {/* ... existing code ... */}
        </Box>
      )}
      
      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && 
        data.certifications.some(cert => cert && cert.trim() !== '') && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Certifications
          </Typography>
          <Box component="ul" className={classes.resumeBullets}>
            {data.certifications
              .filter(cert => cert && cert.trim() !== '')
              .map((cert, index) => (
                <li key={index} className={classes.resumeBullet}>
                  {cert}
                </li>
            ))}
          </Box>
        </Box>
      )}
      
      {/* Custom Sections */}
      {data.customSections && Object.keys(data.customSections).length > 0 && (
        Object.entries(data.customSections)
          .filter(([_, content]) => {
            if (Array.isArray(content)) {
              return content.length > 0 && content.some(item => item && item.trim() !== '');
            }
            return content && typeof content === 'string' && content.trim() !== '';
          })
          .map(([sectionName, content]) => (
            <Box key={sectionName} className={classes.resumeSection}>
              <Typography variant="h6" className={classes.resumeSectionTitle}>
                {sectionName.replace(/_/g, ' ')}
              </Typography>
              
              {Array.isArray(content) ? (
                <Box component="ul" className={classes.resumeBullets}>
                  {content
                    .filter(item => item && item.trim() !== '')
                    .map((item, index) => (
                      <li key={index} className={classes.resumeBullet}>
                        {item}
                      </li>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">
                  {content}
                </Typography>
              )}
            </Box>
          ))
      )}
      
      {/* Generated Resume Notice */}
      {generatedData && (
        <Box className={baseClasses.generatedNotice}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="textSecondary">
            AI-enhanced resume generated successfully
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ResumePreview;