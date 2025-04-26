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
    position: 'relative',
    overflow: 'hidden', // Prevents text overflow
    fontFamily: 'Helvetica, Arial, sans-serif', // Consistent font family for PDF generation
  },
  resumeHeader: {
    marginBottom: '1.5rem',
    textAlign: 'center', // Center align header for better PDF appearance
  },
  resumeName: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: '0.75rem',
    color: '#1a202c',
    textAlign: 'center', // Ensure name is centered as requested
  },
  resumeContact: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center-align contact info
    gap: '0.75rem',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
    color: '#4a5568',
    lineHeight: 1.5,
    maxWidth: '100%', // Ensures proper wrapping
  },
  resumeContactItem: {
    wordBreak: 'break-word', // Handles long emails and URLs
    overflowWrap: 'break-word',
    display: 'inline-flex',
    alignItems: 'center',
  },
  resumeSection: {
    marginBottom: '1.5rem',
  },
  resumeSectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: '#1a202c',
    borderBottom: '2px solid #e2e8f0', // Slightly thicker border
    paddingBottom: '0.5rem',
  },
  resumeSummary: {
    color: '#4a5568',
    marginBottom: '1.5rem',
    lineHeight: 1.6, // Better readability
  },
  resumeEducation: {
    marginBottom: '1.25rem',
  },
  resumeSubtitle: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: '#2d3748',
    fontSize: '1.05rem', // Slightly larger for better visual hierarchy
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
    margin: '0.5rem 0', // Adding some margin
  },
  resumeSkillChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    fontSize: '0.75rem',
    height: '24px',
    fontWeight: 500, // Slightly bolder
  },
  resumeItem: {
    marginBottom: '1.25rem',
  },
  resumeItemSubtitle: {
    fontSize: '0.925rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
  },
  resumeBullets: {
    paddingLeft: '1.25rem',
    margin: '0.5rem 0',
    listStylePosition: 'outside', // Ensures bullets align properly
  },
  resumeBullet: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '0.375rem',
    lineHeight: 1.5, // Better readability
    paddingLeft: '0.25rem', // Ensure proper bullet alignment
  },
  contactLink: {
    color: '#3182ce',
    textDecoration: 'none',
    wordBreak: 'break-word', // Ensures links wrap properly
    overflowWrap: 'break-word',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  generatedNotice: {
    marginTop: '2rem',
    textAlign: 'center',
    color: '#718096',
    fontSize: '0.875rem',
  }
}));

const ResumePreview = ({ userData, generatedData }) => {
  const classes = useStyles();
  
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
    const academicProjects = data.Academic_projects && data.Academic_projects.length > 0 && 
      data.Academic_projects.some(p => p.name && p.name.trim() !== '');
      
    const generatedProjects = data.projects && data.projects.length > 0 && 
      data.projects.some(p => p.name && p.name.trim() !== '');
      
    return academicProjects || generatedProjects;
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
    <Box className={`${classes.resumeContainer} resume-container`}>
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
      {/* Education Section */}
{hasEducationData() && (
  <Box className={classes.resumeSection}>
    <Typography variant="h6" className={classes.resumeSectionTitle}>
      Education
    </Typography>
    {Array.isArray(data.education) ? (
      // Handle array format (from API)
      data.education.map((edu, index) => (
        <Box key={index} className={classes.resumeEducation}>
          <Typography variant="subtitle1" className={classes.resumeSubtitle}>
            {edu.degree || ''} 
            {(edu.specialization && edu.specialization.trim() !== '') ? ` in ${edu.specialization}` : ''}
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
      // Handle object format (from form)
      <Box className={classes.resumeEducation}>
        <Typography variant="subtitle1" className={classes.resumeSubtitle}>
          {data.education.degree || ''} 
          {(data.education.specialization && data.education.specialization.trim() !== '') ? 
            ` in ${data.education.specialization}` : ''}
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
          
          {data.work_experience && data.work_experience.length > 0 &&
            data.work_experience
              .filter(exp => (exp.position && exp.position.trim() !== '') || 
                            (exp.company_name && exp.company_name.trim() !== ''))
              .map((experience, index) => (
                <Box key={`work-${index}`} className={classes.resumeItem}>
                  <Typography variant="subtitle1" className={classes.resumeSubtitle}>
                    {experience.position || "Position"} 
                    {experience.company_name ? 
                      ` | ${experience.company_name}` : ""}
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
                          <li key={idx} className={classes.resumeBullet}>
                            {responsibility}
                          </li>
                      ))}
                    </Box>
                  )}
                </Box>
            ))}
          
          {data.workExperience && data.workExperience.length > 0 &&
            data.workExperience
              .filter(exp => (exp.position && exp.position.trim() !== '') || 
                            (exp.companyName && exp.companyName.trim() !== ''))
              .map((experience, index) => (
                <Box key={`workExp-${index}`} className={classes.resumeItem}>
                  <Typography variant="subtitle1" className={classes.resumeSubtitle}>
                    {experience.position || "Position"} 
                    {experience.companyName ? 
                      ` | ${experience.companyName}` : ""}
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
                  {experience.responsibilities && experience.responsibilities.length > 0 && (
                    <Box component="ul" className={classes.resumeBullets}>
                      {experience.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className={classes.resumeBullet}>
                          {responsibility}
                        </li>
                      ))}
                    </Box>
                  )}
                </Box>
            ))}
        </Box>
      )}
      
      {/* Projects Section */}
      {hasProjectsData() && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Projects
          </Typography>
          
          {data.Academic_projects && data.Academic_projects.length > 0 &&
            data.Academic_projects
              .filter(p => p.name && p.name.trim() !== '')
              .map((project, index) => (
                <Box key={`academic-${index}`} className={classes.resumeItem}>
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
            
          {data.projects && data.projects.length > 0 &&
            data.projects
              .filter(p => p.name && p.name.trim() !== '')
              .map((project, index) => (
                <Box key={`generated-${index}`} className={classes.resumeItem}>
                  <Typography variant="subtitle1" className={classes.resumeSubtitle}>
                    {project.name || "Project Name"}
                  </Typography>
                  
                  {project.responsibilities && project.responsibilities.length > 0 && (
                    <Box component="ul" className={classes.resumeBullets}>
                      {project.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className={classes.resumeBullet}>
                          {responsibility}
                        </li>
                      ))}
                    </Box>
                  )}
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <Typography variant="body2" className={classes.resumeItemSubtitle}>
                      Skills: {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
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
        <Box className={classes.generatedNotice}>
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