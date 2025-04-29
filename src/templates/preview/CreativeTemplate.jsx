import React from 'react';
import { Box, Typography, Chip, Link, Divider } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useCreativeStyles = makeStylesWithTheme((theme) => ({
  resumeHeader: {
    marginBottom: '2rem',
    textAlign: 'center',
    padding: '2rem 1rem',
    backgroundColor: '#5a67d8',
    color: 'white',
    borderRadius: '8px',
  },
  resumeName: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '1rem',
    color: 'white',
    textAlign: 'center',
  },
  resumeContact: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
    color: 'white',
    lineHeight: 1.5,
  },
  resumeContactItem: {
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    display: 'inline-flex',
    alignItems: 'center',
  },
  resumeSection: {
    marginBottom: '2.5rem',
  },
  resumeSectionTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    marginBottom: '1rem',
    color: '#5a67d8',
    paddingBottom: '0.25rem',
    display: 'inline-block',
    borderBottom: '3px solid #5a67d8',
  },
  resumeSummary: {
    color: '#2d3748',
    marginBottom: '1.5rem',
    lineHeight: 1.8,
    fontSize: '1.05rem',
    fontStyle: 'italic',
  },
  resumeEducation: {
    marginBottom: '1.5rem',
  },
  resumeSubtitle: {
    fontWeight: 700,
    marginBottom: '0.25rem',
    color: '#1a202c',
    fontSize: '1.2rem',
  },
  resumeDate: {
    fontSize: '0.875rem',
    color: '#5a67d8',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  resumeSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    margin: '0.5rem 0',
  },
  resumeSkillChip: {
    backgroundColor: '#5a67d8',
    color: 'white',
    fontSize: '0.75rem',
    height: '28px',
    fontWeight: 600,
    borderRadius: '20px',
  },
  resumeItem: {
    marginBottom: '1.5rem',
    position: 'relative',
    paddingLeft: '1rem',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '0.5rem',
      bottom: '0.5rem',
      width: '3px',
      backgroundColor: '#5a67d8',
      borderRadius: '4px',
    },
  },
  resumeItemSubtitle: {
    fontSize: '1rem',
    color: '#4a5568',
    marginBottom: '0.5rem',
  },
  resumeBullets: {
    paddingLeft: '1.5rem',
    margin: '0.75rem 0',
    listStyleType: 'square',
  },
  resumeBullet: {
    fontSize: '0.9rem',
    color: '#2d3748',
    marginBottom: '0.5rem',
    lineHeight: 1.6,
  },
  contactLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 600,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  contentLink: {
    color: '#5a67d8',
    textDecoration: 'none',
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline',
    },
  }
}));

const CreativeTemplate = ({ resumeData }) => {
  const classes = useCreativeStyles();

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

  const renderContentLink = (label, url) => {
    if (!url) return null;
    
    let href = url;
    if (href && !href.startsWith('http')) {
      href = `https://${href}`;
    }

    return (
      <Link 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={classes.contentLink}
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
        
        {resumeData.target_role && resumeData.target_role.trim() !== '' && (
          <Typography variant="h6" fontWeight="medium" sx={{ mb: 2, color: 'white' }}>
            {resumeData.target_role}
          </Typography>
        )}
        
        <Box className={classes.resumeContact}>
          {resumeData.header.email && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              {renderLink(null, resumeData.header.email, 'email')}
            </Typography>
          )}
          
          {resumeData.header.phone && (
            <Typography variant="body2" className={classes.resumeContactItem}>
              {resumeData.header.phone}
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
      
      {/* Summary Section */}
      {resumeData.summary && resumeData.summary.trim() !== '' && (
        <Box className={classes.resumeSection}>
          <Typography variant="h6" className={classes.resumeSectionTitle}>
            Professional Summary
          </Typography>
          <Typography variant="body1" className={classes.resumeSummary}>
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
                    {project.link && (
                      <span style={{ marginLeft: '8px', fontSize: '0.9rem' }}>
                        [{renderContentLink("Link", project.link)}]
                      </span>
                    )}
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
                    {edu.graduation_year || edu.graduationYear}
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
                  {resumeData.education.graduation_year}
                </Typography>
              )}
            </Box>
          )}
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

export default React.memo(CreativeTemplate);