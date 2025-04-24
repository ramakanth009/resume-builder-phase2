import React from 'react';
import { Box, Typography, Chip, Link, Divider } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  resumeContainer: {
    padding: '0',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    minHeight: '842px', // A4 height scaled down
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden', // Prevents text overflow
    fontFamily: 'Helvetica, Arial, sans-serif', 
  },
  header: {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '2rem',
    position: 'relative',
  },
  name: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  jobTitle: {
    fontSize: '1.2rem',
    color: '#e2e8f0',
    marginBottom: '0.5rem',
  },
  contactBar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '0.6rem 2rem',
    backgroundColor: '#ebf8ff',
    color: '#4a5568',
    fontSize: '0.8rem',
  },
  contactItem: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  contentSection: {
    padding: '1.5rem 2rem',
  },
  sectionTitle: {
    color: '#2d3748',
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem',
    position: 'relative',
  },
  summary: {
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    color: '#4a5568',
    lineHeight: 1.6,
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  skillChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    fontSize: '0.75rem',
    borderRadius: '4px',
  },
  experienceItem: {
    marginBottom: '1.25rem',
  },
  itemTitle: {
    fontWeight: 600,
    fontSize: '1rem',
    color: '#2d3748',
    marginBottom: '0.25rem',
  },
  itemSubtitle: {
    fontSize: '0.9rem',
    color: '#718096',
    marginBottom: '0.5rem',
  },
  itemDate: {
    fontSize: '0.8rem',
    color: '#a0aec0',
    fontStyle: 'italic',
  },
  bulletList: {
    paddingLeft: '1.25rem',
    margin: '0.5rem 0',
  },
  bulletItem: {
    fontSize: '0.85rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
  },
  link: {
    color: '#3182ce',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  contactLink: {
    color: '#4a5568',
    textDecoration: 'none',
    '&:hover': {
      color: '#3182ce',
    },
  },
}));

const ModernTemplate = ({ resumeData }) => {
  const classes = useStyles();
  
  // Helper functions
  const hasEducationData = () => {
    if (Array.isArray(resumeData.education)) {
      return resumeData.education.length > 0 && resumeData.education.some(edu => 
        (edu.degree && edu.degree.trim() !== '') || 
        (edu.institution && edu.institution.trim() !== '')
      );
    }
    
    return resumeData.education && (
      (resumeData.education.degree && resumeData.education.degree.trim() !== '') || 
      (resumeData.education.institution && resumeData.education.institution.trim() !== '')
    );
  };

  const hasProjectsData = () => {
    const academicProjects = resumeData.Academic_projects && resumeData.Academic_projects.length > 0 && 
      resumeData.Academic_projects.some(p => p.name && p.name.trim() !== '');
      
    const generatedProjects = resumeData.projects && resumeData.projects.length > 0 && 
      resumeData.projects.some(p => p.name && p.name.trim() !== '');
      
    return academicProjects || generatedProjects;
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
          className={classes.link}
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
        className={classes.link}
      >
        {label}
      </Link>
    );
  };

  return (
    <Box className={classes.resumeContainer}>
      {/* Header Section */}
      <Box className={classes.header}>
        <Typography variant="h1" className={classes.name}>
          {resumeData.header.name || "Your Name"}
        </Typography>
        {resumeData.target_role && (
          <Typography variant="h2" className={classes.jobTitle}>
            {resumeData.target_role}
          </Typography>
        )}
      </Box>
      
      {/* Contact Bar */}
      <Box className={classes.contactBar}>
        {resumeData.header.email && (
          <Typography variant="body2" className={classes.contactItem}>
            Email: {renderLink(resumeData.header.email, resumeData.header.email, 'email')}
          </Typography>
        )}
        
        {resumeData.header.phone && (
          <Typography variant="body2" className={classes.contactItem}>
            Phone: {resumeData.header.phone}
          </Typography>
        )}
        
        {resumeData.header.github && (
          <Typography variant="body2" className={classes.contactItem}>
            {renderLink("GitHub", resumeData.header.github)}
          </Typography>
        )}
        
        {resumeData.header.linkedin && (
          <Typography variant="body2" className={classes.contactItem}>
            {renderLink("LinkedIn", resumeData.header.linkedin)}
          </Typography>
        )}
        
        {resumeData.header.portfolio && (
          <Typography variant="body2" className={classes.contactItem}>
            {renderLink("Portfolio", resumeData.header.portfolio)}
          </Typography>
        )}
      </Box>
      
      {/* Summary Section */}
      <Box className={classes.contentSection}>
        {resumeData.summary && resumeData.summary.trim() !== '' && (
          <Box mb={3}>
            <Typography variant="h3" className={classes.sectionTitle}>
              Professional Summary
            </Typography>
            <Typography variant="body1" className={classes.summary}>
              {resumeData.summary}
            </Typography>
          </Box>
        )}
        
        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <Box mb={3}>
            <Typography variant="h3" className={classes.sectionTitle}>
              Skills
            </Typography>
            <Box className={classes.skillsContainer}>
              {resumeData.skills.filter(Boolean).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  className={classes.skillChip}
                />
              ))}
            </Box>
          </Box>
        )}
        
        {/* Experience Section */}
        {hasWorkExperienceData() && (
          <Box mb={3}>
            <Typography variant="h3" className={classes.sectionTitle}>
              Work Experience
            </Typography>
            
            {resumeData.work_experience && resumeData.work_experience.map((experience, index) => (
              <Box key={index} className={classes.experienceItem}>
                <Typography variant="h4" className={classes.itemTitle}>
                  {experience.position} | {experience.company_name}
                </Typography>
                <Typography variant="subtitle1" className={classes.itemDate}>
                  {experience.duration}
                </Typography>
                {experience.description && (
                  <Typography variant="body1" className={classes.itemSubtitle}>
                    {experience.description}
                  </Typography>
                )}
                {experience.responsibilities && experience.responsibilities.length > 0 && (
                  <Box component="ul" className={classes.bulletList}>
                    {experience.responsibilities.map((resp, i) => (
                      <Box component="li" key={i} className={classes.bulletItem}>
                        {resp}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
            
            {resumeData.workExperience && resumeData.workExperience.map((experience, index) => (
              <Box key={index} className={classes.experienceItem}>
                <Typography variant="h4" className={classes.itemTitle}>
                  {experience.position} | {experience.companyName}
                </Typography>
                <Typography variant="subtitle1" className={classes.itemDate}>
                  {experience.duration}
                </Typography>
                {experience.responsibilities && experience.responsibilities.length > 0 && (
                  <Box component="ul" className={classes.bulletList}>
                    {experience.responsibilities.map((resp, i) => (
                      <Box component="li" key={i} className={classes.bulletItem}>
                        {resp}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
        
        {/* Projects Section */}
        {hasProjectsData() && (
          <Box mb={3}>
            <Typography variant="h3" className={classes.sectionTitle}>
              Projects
            </Typography>
            
            {resumeData.Academic_projects && resumeData.Academic_projects.map((project, index) => (
              <Box key={index} className={classes.experienceItem}>
                <Typography variant="h4" className={classes.itemTitle}>
                  {project.name}
                </Typography>
                {project.skills_used && (
                  <Typography variant="subtitle1" className={classes.itemSubtitle}>
                    Skills: {project.skills_used}
                  </Typography>
                )}
                {project.description && (
                  <Typography variant="body1" className={classes.bulletItem}>
                    {project.description}
                  </Typography>
                )}
              </Box>
            ))}
            
            {resumeData.projects && resumeData.projects.map((project, index) => (
              <Box key={index} className={classes.experienceItem}>
                <Typography variant="h4" className={classes.itemTitle}>
                  {project.name}
                </Typography>
                {project.responsibilities && project.responsibilities.length > 0 && (
                  <Box component="ul" className={classes.bulletList}>
                    {project.responsibilities.map((resp, i) => (
                      <Box component="li" key={i} className={classes.bulletItem}>
                        {resp}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
        
        {/* Education Section */}
        {hasEducationData() && (
          <Box mb={3}>
            <Typography variant="h3" className={classes.sectionTitle}>
              Education
            </Typography>
            
            {Array.isArray(resumeData.education) ? (
              resumeData.education.map((edu, index) => (
                <Box key={index} className={classes.experienceItem}>
                  <Typography variant="h4" className={classes.itemTitle}>
                    {edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}
                  </Typography>
                  <Typography variant="subtitle1" className={classes.itemSubtitle}>
                    {edu.institution}
                  </Typography>
                  <Typography variant="subtitle1" className={classes.itemDate}>
                    {edu.graduation_year || edu.graduationYear}
                  </Typography>
                </Box>
              ))
            ) : (
              <Box className={classes.experienceItem}>
                <Typography variant="h4" className={classes.itemTitle}>
                  {resumeData.education.degree} {resumeData.education.specialization ? `in ${resumeData.education.specialization}` : ''}
                </Typography>
                <Typography variant="subtitle1" className={classes.itemSubtitle}>
                  {resumeData.education.institution}
                </Typography>
                <Typography variant="subtitle1" className={classes.itemDate}>
                  {resumeData.education.graduation_year || resumeData.education.graduationYear}
                </Typography>
              </Box>
            )}
          </Box>
        )}
        
        {/* Certifications Section */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <Box mb={3}>
            <Typography variant="h3" className={classes.sectionTitle}>
              Certifications
            </Typography>
            <Box component="ul" className={classes.bulletList}>
              {resumeData.certifications.filter(Boolean).map((cert, index) => (
                <Box component="li" key={index} className={classes.bulletItem}>
                  {cert}
                </Box>
              ))}
            </Box>
          </Box>
        )}
        
        {/* Custom Sections */}
        {resumeData.customSections && Object.keys(resumeData.customSections).length > 0 && (
          Object.entries(resumeData.customSections).map(([sectionName, content]) => (
            <Box key={sectionName} mb={3}>
              <Typography variant="h3" className={classes.sectionTitle}>
                {sectionName.replace(/_/g, ' ')}
              </Typography>
              
              {Array.isArray(content) ? (
                <Box component="ul" className={classes.bulletList}>
                  {content.filter(Boolean).map((item, index) => (
                    <Box component="li" key={index} className={classes.bulletItem}>
                      {item}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" className={classes.summary}>
                  {content}
                </Typography>
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ModernTemplate;