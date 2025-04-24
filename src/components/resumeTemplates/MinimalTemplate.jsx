import React from 'react';
import { Box, Typography, Chip, Link } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  resumeContainer: {
    padding: '2.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    minHeight: '842px', // A4 height scaled down
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden', // Prevents text overflow
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: '2rem',
  },
  name: {
    fontSize: '1.8rem',
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: '0.75rem',
    letterSpacing: '0.05em',
  },
  contactInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    fontSize: '0.85rem',
    color: '#4a5568',
    marginBottom: '0.5rem',
  },
  contactItem: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: '1rem',
    marginTop: '1.75rem',
    paddingBottom: '0.25rem',
    borderBottom: '1px solid #e2e8f0',
    letterSpacing: '0.05em',
  },
  summary: {
    fontSize: '0.9rem',
    color: '#4a5568',
    lineHeight: 1.6,
    marginBottom: '1rem',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  skillChip: {
    backgroundColor: '#f7fafc',
    color: '#2d3748',
    border: '1px solid #e2e8f0',
    fontSize: '0.75rem',
    height: '24px',
  },
  experienceItem: {
    marginBottom: '1.25rem',
  },
  itemTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: '0.25rem',
  },
  itemCompany: {
    fontSize: '0.9rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
    fontWeight: 500,
  },
  itemDate: {
    fontSize: '0.8rem',
    color: '#718096',
    marginBottom: '0.5rem',
  },
  bulletList: {
    paddingLeft: '1.25rem',
    margin: '0.5rem 0',
  },
  bulletItem: {
    fontSize: '0.85rem',
    color: '#4a5568',
    marginBottom: '0.35rem',
    lineHeight: 1.5,
  },
  link: {
    color: '#4a5568',
    textDecoration: 'none',
    '&:hover': {
      color: '#2b6cb0',
    },
  },
}));

const MinimalTemplate = ({ resumeData }) => {
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
          <Typography variant="body1" style={{ marginBottom: '1rem', color: '#718096' }}>
            {resumeData.target_role}
          </Typography>
        )}
        
        <Box className={classes.contactInfo}>
          {resumeData.header.email && (
            <Typography variant="body2" className={classes.contactItem}>
              {renderLink(resumeData.header.email, resumeData.header.email, 'email')}
            </Typography>
          )}
          
          {resumeData.header.phone && (
            <Typography variant="body2" className={classes.contactItem}>
              {resumeData.header.phone}
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
      </Box>
      
      {/* Profile/Summary Section */}
      {resumeData.summary && resumeData.summary.trim() !== '' && (
        <>
          <Typography variant="h2" className={classes.sectionTitle}>
            Profile
          </Typography>
          <Typography variant="body1" className={classes.summary}>
            {resumeData.summary}
          </Typography>
        </>
      )}
      
      {/* Skills Section */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <>
          <Typography variant="h2" className={classes.sectionTitle}>
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
        </>
      )}
      
      {/* Experience Section */}
      {hasWorkExperienceData() && (
        <>
          <Typography variant="h2" className={classes.sectionTitle}>
            Experience
          </Typography>
          
          {resumeData.work_experience && resumeData.work_experience.map((experience, index) => (
            <Box key={index} className={classes.experienceItem}>
              <Typography variant="h3" className={classes.itemTitle}>
                {experience.position}
              </Typography>
              <Typography variant="subtitle1" className={classes.itemCompany}>
                {experience.company_name}
              </Typography>
              <Typography variant="subtitle2" className={classes.itemDate}>
                {experience.duration}
              </Typography>
              {experience.description && (
                <Typography variant="body2" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
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
              <Typography variant="h3" className={classes.itemTitle}>
                {experience.position}
              </Typography>
              <Typography variant="subtitle1" className={classes.itemCompany}>
                {experience.companyName}
              </Typography>
              <Typography variant="subtitle2" className={classes.itemDate}>
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
        </>
      )}
      
      {/* Projects Section */}
      {hasProjectsData() && (
        <>
          <Typography variant="h2" className={classes.sectionTitle}>
            Projects
          </Typography>
          
          {resumeData.Academic_projects && resumeData.Academic_projects.map((project, index) => (
            <Box key={index} className={classes.experienceItem}>
              <Typography variant="h3" className={classes.itemTitle}>
                {project.name}
              </Typography>
              {project.skills_used && (
                <Typography variant="subtitle2" style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '0.35rem' }}>
                  Skills: {project.skills_used}
                </Typography>
              )}
              {project.description && (
                <Typography variant="body2" className={classes.bulletItem} style={{ paddingLeft: 0 }}>
                  {project.description}
                </Typography>
              )}
            </Box>
          ))}
          
          {resumeData.projects && resumeData.projects.map((project, index) => (
            <Box key={index} className={classes.experienceItem}>
              <Typography variant="h3" className={classes.itemTitle}>
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
        </>
      )}
      
      {/* Education Section */}
      {hasEducationData() && (
        <>
          <Typography variant="h2" className={classes.sectionTitle}>
            Education
          </Typography>
          
          {Array.isArray(resumeData.education) ? (
            resumeData.education.map((edu, index) => (
              <Box key={index} className={classes.experienceItem}>
                <Typography variant="h3" className={classes.itemTitle}>
                  {edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}
                </Typography>
                <Typography variant="subtitle1" className={classes.itemCompany}>
                  {edu.institution}
                </Typography>
                <Typography variant="subtitle2" className={classes.itemDate}>
                  {edu.graduation_year || edu.graduationYear}
                </Typography>
              </Box>
            ))
          ) : (
            <Box className={classes.experienceItem}>
              <Typography variant="h3" className={classes.itemTitle}>
                {resumeData.education.degree} {resumeData.education.specialization ? `in ${resumeData.education.specialization}` : ''}
              </Typography>
              <Typography variant="subtitle1" className={classes.itemCompany}>
                {resumeData.education.institution}
              </Typography>
              <Typography variant="subtitle2" className={classes.itemDate}>
                {resumeData.education.graduation_year || resumeData.education.graduationYear}
              </Typography>
            </Box>
          )}
        </>
      )}
      
      {/* Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <>
          <Typography variant="h2" className={classes.sectionTitle}>
            Certifications
          </Typography>
          <Box component="ul" className={classes.bulletList}>
            {resumeData.certifications.filter(Boolean).map((cert, index) => (
              <Box component="li" key={index} className={classes.bulletItem}>
                {cert}
              </Box>
            ))}
          </Box>
        </>
      )}
      
      {/* Custom Sections */}
      {resumeData.customSections && Object.keys(resumeData.customSections).length > 0 && (
        Object.entries(resumeData.customSections).map(([sectionName, content]) => (
          <React.Fragment key={sectionName}>
            <Typography variant="h2" className={classes.sectionTitle}>
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
          </React.Fragment>
        ))
      )}
    </Box>
  );
};

export default MinimalTemplate;