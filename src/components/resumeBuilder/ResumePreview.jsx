import React from 'react';
import { Box, Typography, Chip, Link, Divider } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  resumeContainer: {
    padding: '2rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    minHeight: '842px', // A4 height scaled down
    width: '100%',
    margin: '0 auto',
  },
  resumeHeader: {
    marginBottom: '1.5rem',
  },
  resumeName: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#2d3748',
  },
  resumeContact: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    color: '#4a5568',
  },
  resumeSection: {
    marginBottom: '1.5rem',
  },
  resumeSectionTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: '#2d3748',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '0.5rem',
  },
  resumeSummary: {
    color: '#4a5568',
    marginBottom: '1.5rem',
  },
  resumeEducation: {
    marginBottom: '1rem',
  },
  resumeSubtitle: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: '#2d3748',
  },
  resumeDate: {
    fontSize: '0.875rem',
    color: '#718096',
    fontStyle: 'italic',
  },
  resumeSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  resumeSkillChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    fontSize: '0.75rem',
    height: '24px',
  },
  resumeItem: {
    marginBottom: '1rem',
  },
  resumeItemSubtitle: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
  },
  resumeBullets: {
    paddingLeft: '1.25rem',
    margin: '0.5rem 0',
  },
  resumeBullet: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
  },
  contactLink: {
    color: '#3182ce',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  editableContent: {
    border: '1px solid transparent',
    padding: '0.25rem',
    borderRadius: '4px',
    '&:hover': {
      border: '1px dashed #e2e8f0',
      backgroundColor: '#f7fafc',
    },
  },
}));

const ResumePreview = ({ userData, generatedData, isEditing, onEdit }) => {
  const classes = useStyles();
  
  // Use generated data if available and not in editing mode, otherwise use user data
  const data = (!isEditing && generatedData) ? generatedData : userData;
  
  // Helper function to render links
  const renderLink = (text, url, type) => {
    if (!url) return null;
    
    let displayText = text || url;
    let href = url;
    
    // Email handling
    if (type === 'email') {
      href = `mailto:${url}`;
      displayText = url;
    }
    
    // Make sure URLs have http or https
    if (type !== 'email' && href && !href.startsWith('http')) {
      href = `https://${href}`;
    }
    
    return (
      <Link 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={classes.contactLink}
      >
        {displayText}
      </Link>
    );
  };

  return (
    <Box className={classes.resumeContainer}>
      {/* Header Section */}
      <Box className={classes.resumeHeader}>
        <Typography variant="h4" className={classes.resumeName}>
          {data.header.name || "Your Name"}
        </Typography>
        
        <Box className={classes.resumeContact}>
          {data.header.email && (
            <Typography variant="body2">
              Email: {renderLink(null, data.header.email, 'email')}
            </Typography>
          )}
          
          {data.header.phone && (
            <Typography variant="body2">
              Phone: {data.header.phone}
            </Typography>
          )}
          
          {data.header.github && (
            <Typography variant="body2">
              GitHub: {renderLink(data.header.github.replace('https://', ''), data.header.github, 'github')}
            </Typography>
          )}
          
          {data.header.linkedin && (
            <Typography variant="body2">
              LinkedIn: {renderLink(data.header.linkedin.replace('https://', ''), data.header.linkedin, 'linkedin')}
            </Typography>
          )}
          
          {data.header.portfolio && (
            <Typography variant="body2">
              Portfolio: {renderLink(data.header.portfolio.replace('https://', ''), data.header.portfolio, 'portfolio')}
            </Typography>
          )}
        </Box>
      </Box>
      
      {/* Target Role */}
      {data.target_role && data.target_role.trim() !== '' && (
        <Box className={classes.resumeSection}>
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
      
      {/* Education Section */}
      {data.education && (data.education.degree || data.education.institution || data.education.specialization) && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Education
          </Typography>
          <Box className={classes.resumeEducation}>
            <Typography variant="subtitle1" className={classes.resumeSubtitle}>
              {data.education.degree} {data.education.specialization ? `in ${data.education.specialization}` : ''}
            </Typography>
            <Typography variant="body2">
              {data.education.institution}
            </Typography>
            {data.education.graduation_year && (
              <Typography variant="body2" className={classes.resumeDate}>
                Graduated: {data.education.graduation_year}
              </Typography>
            )}
          </Box>
        </Box>
      )}
      
      {/* Skills Section */}
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
      
      {/* Projects Section */}
      {data.Academic_projects && data.Academic_projects.length > 0 && 
        data.Academic_projects.some(p => p.name && p.name.trim() !== '') && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Academic Projects
          </Typography>
          {data.Academic_projects
            .filter(p => p.name && p.name.trim() !== '')
            .map((project, index) => (
              <Box key={index} className={classes.resumeItem}>
                <Typography variant="subtitle1" className={classes.resumeSubtitle}>
                  {project.name || "Project Name"}
                </Typography>
                {project.skills_used && project.skills_used.trim() !== '' && (
                  <Typography variant="body2" className={classes.resumeItemSubtitle}>
                    Skills: {project.skills_used}
                  </Typography>
                )}
                {project.description && project.description.trim() !== '' && (
                  <Typography variant="body2">
                    {project.description}
                  </Typography>
                )}
              </Box>
          ))}
        </Box>
      )}
      
      {/* Work Experience Section */}
      {data.work_experience && data.work_experience.length > 0 && 
        data.work_experience.some(exp => (exp.position && exp.position.trim() !== '') || 
                                         (exp.company_name && exp.company_name.trim() !== '')) && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Work Experience
          </Typography>
          {data.work_experience
            .filter(exp => (exp.position && exp.position.trim() !== '') || 
                           (exp.company_name && exp.company_name.trim() !== ''))
            .map((experience, index) => (
              <Box key={index} className={classes.resumeItem}>
                <Typography variant="subtitle1" className={classes.resumeSubtitle}>
                  {experience.position || "Position"} {experience.company_name ? `| ${experience.company_name}` : ""}
                </Typography>
                {experience.duration && experience.duration.trim() !== '' && (
                  <Typography variant="body2" className={classes.resumeDate}>
                    {experience.duration}
                  </Typography>
                )}
                {experience.description && experience.description.trim() !== '' && (
                  <Typography variant="body2">
                    {experience.description}
                  </Typography>
                )}
                {experience.responsibilities && experience.responsibilities.length > 0 && 
                  experience.responsibilities.some(r => r && r.trim() !== '') && (
                  <Box component="ul" className={classes.resumeBullets}>
                    {experience.responsibilities
                      .filter(r => r && r.trim() !== '')
                      .map((responsibility, idx) => (
                        <li key={idx} className={classes.resumeBullet}>{responsibility}</li>
                    ))}
                  </Box>
                )}
              </Box>
          ))}
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
            // Check if content is non-empty
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
      {!isEditing && generatedData && (
        <Box mt={4}>
          <Divider />
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            AI-enhanced resume generated successfully.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ResumePreview;