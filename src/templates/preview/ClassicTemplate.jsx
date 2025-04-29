import React from 'react';
import { Box, Typography, Chip, Link, Divider } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useClassicStyles = makeStylesWithTheme((theme) => ({
  resumeHeader: {
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  resumeName: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: '0.75rem',
    color: '#1a202c',
    textAlign: 'center',
  },
  resumeContact: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
    color: '#4a5568',
    lineHeight: 1.5,
    maxWidth: '100%',
  },
  resumeContactItem: {
    wordBreak: 'break-word',
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
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '0.5rem',
  },
  resumeSummary: {
    color: '#4a5568',
    marginBottom: '1.5rem',
    lineHeight: 1.6,
  },
  resumeEducation: {
    marginBottom: '1.25rem',
  },
  resumeSubtitle: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: '#2d3748',
    fontSize: '1.05rem',
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
    margin: '0.5rem 0',
  },
  resumeSkillChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    fontSize: '0.75rem',
    height: '24px',
    fontWeight: 500,
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
    listStylePosition: 'outside',
  },
  resumeBullet: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '0.375rem',
    lineHeight: 1.5,
    paddingLeft: '0.25rem',
  },
  contactLink: {
    color: '#3182ce',
    textDecoration: 'none',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
}));

const ClassicTemplate = ({ resumeData }) => {
  const classes = useClassicStyles();

  // Helper functions
  const renderLink = (label, url, type) => {
    if (!url) return null;
    
    let href = url;

    if (type === 'email') {
      href = `mailto:${url}`;
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

  const hasEducationData = () => {
    if (Array.isArray(resumeData.education)) {
      return resumeData.education.length > 0 && resumeData.education.some(edu => 
        (edu.degree && edu.degree.trim() !== '') || 
        (edu.institution && edu.institution.trim() !== '') ||
        (edu.specialization && edu.specialization.trim() !== '')
      );
    }
    
    return resumeData.education && (
      (resumeData.education.degree && resumeData.education.degree.trim() !== '') || 
      (resumeData.education.institution && resumeData.education.institution.trim() !== '') ||
      (resumeData.education.specialization && resumeData.education.specialization.trim() !== '')
    );
  };

  const hasWorkExperienceData = () => {
    const userWorkExp = resumeData.work_experience && resumeData.work_experience.length > 0 && 
      resumeData.work_experience.some(exp => 
        (exp.position && exp.position.trim() !== '') || 
        (exp.company_name && exp.company_name.trim() !== '')
      );
      
    const generatedWorkExp = resumeData.workExperience && resumeData.workExperience.length > 0 && 
      resumeData.workExperience.some(exp => 
        (exp.position && exp.position.trim() !== '') || 
        (exp.companyName && exp.companyName.trim() !== '')
      );
      
    return userWorkExp || generatedWorkExp;
  };

  const hasProjectsData = () => {
    return resumeData.projects && resumeData.projects.length > 0 && 
      resumeData.projects.some(p => p.name && p.name.trim() !== '');
  };

  return (
    <Box>
      {/* Header Section */}
      <Box className={classes.resumeHeader}>
        <Typography variant="h4" className={classes.resumeName}>
          {resumeData.header.name || "Your Name"}
        </Typography>
        
        <Box className={classes.resumeContact}>
          {resumeData.header.email && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              Email: {renderLink(null, resumeData.header.email, 'email')}
            </Typography>
          )}
          
          {resumeData.header.phone && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              Phone: {resumeData.header.phone}
            </Typography>
          )}
          
          {resumeData.header.github && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              {renderLink("GitHub", resumeData.header.github, 'github')}
            </Typography>
          )}
          
          {resumeData.header.linkedin && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              {renderLink("LinkedIn", resumeData.header.linkedin, 'linkedin')}
            </Typography>
          )}
          
          {resumeData.header.portfolio && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              {renderLink("Portfolio", resumeData.header.portfolio, 'portfolio')}
            </Typography>
          )}
        </Box>
      </Box>
      
      {/* Target Role */}
      {resumeData.target_role && resumeData.target_role.trim() !== '' && (
        <Box className={classes.resumeSection} textAlign="center">
          <Typography variant="body1" fontWeight="medium">
            Target Role: {resumeData.target_role}
          </Typography>
        </Box>
      )}
      
      {/* Summary Section */}
      {resumeData.summary && resumeData.summary.trim() !== '' && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Professional Summary
          </Typography>
          <Typography variant="body2" className={classes.resumeSummary}>
            {resumeData.summary}
          </Typography>
        </Box>
      )}
      
      {/* Skills Section */}
      {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills.some(skill => skill && skill.trim() !== '') && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Skills
          </Typography>
          <Box className={classes.resumeSkills}>
            {resumeData.skills.filter(skill => skill && skill.trim() !== '').map((skill, index) => (
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
          {Array.isArray(resumeData.education) ? (
            resumeData.education.map((edu, index) => (
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
                {resumeData.education.degree || ''} 
                {resumeData.education.specialization ? ` in ${resumeData.education.specialization}` : ''}
              </Typography>
              <Typography variant="body2">
                {resumeData.education.institution || ''}
              </Typography>
              {resumeData.education.graduation_year && (
                <Typography variant="body2" className={classes.resumeDate}>
                  Graduated: {resumeData.education.graduation_year}
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
          
          {resumeData.work_experience && resumeData.work_experience.length > 0 ? (
            resumeData.work_experience
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
              ))
          ) : resumeData.workExperience && resumeData.workExperience.length > 0 ? (
            resumeData.workExperience
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
              ))
          ) : null}
        </Box>
      )}
      
      {/* Projects Section */}
      {hasProjectsData() && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Projects
          </Typography>
          
          {resumeData.projects && resumeData.projects.length > 0 &&
            resumeData.projects
              .filter(p => p.name && p.name.trim() !== '')
              .map((project, index) => (
                <Box key={`project-${index}`} className={classes.resumeItem}>
                  <Typography variant="subtitle1" className={classes.resumeSubtitle}>
                    {project.name || "Project Name"}
                  </Typography>
                  {project.skills_used && project.skills_used.trim() !== '' && (
                    <Typography variant="body2" className={classes.resumeItemSubtitle}>
                      Skills: {project.skills_used}
                    </Typography>
                  )}
                  {project.responsibilities && project.responsibilities.length > 0 && (
                    <Box component="ul" className={classes.resumeBullets}>
                      {project.responsibilities.map((responsibility, idx) => (
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
      
      {/* Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && 
        resumeData.certifications.some(cert => cert && cert.trim() !== '') && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Certifications
          </Typography>
          <Box component="ul" className={classes.resumeBullets}>
            {resumeData.certifications
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
      {resumeData.customSections && Object.keys(resumeData.customSections).length > 0 && (
        Object.entries(resumeData.customSections)
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
    </Box>
  );
};

export default React.memo(ClassicTemplate);