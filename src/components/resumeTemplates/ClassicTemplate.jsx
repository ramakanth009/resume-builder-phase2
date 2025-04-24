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
    fontFamily: 'Times New Roman, serif', 
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  name: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#2d3748',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
  },
  contactInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
    fontSize: '0.9rem',
    color: '#4a5568',
  },
  contactItem: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  sectionDivider: {
    height: '1px',
    backgroundColor: '#718096',
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#2d3748',
    marginBottom: '0.75rem',
    marginTop: '1.5rem',
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: '0.95rem',
    color: '#4a5568',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  skillChip: {
    backgroundColor: '#f7fafc',
    color: '#2d3748',
    border: '1px solid #e2e8f0',
    fontSize: '0.8rem',
  },
  experienceItem: {
    marginBottom: '1.5rem',
  },
  itemTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: '0.25rem',
  },
  itemSubtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  company: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#4a5568',
  },
  duration: {
    fontSize: '0.85rem',
    color: '#718096',
    fontStyle: 'italic',
  },
  bulletList: {
    paddingLeft: '1.5rem',
    margin: '0.5rem 0',
  },
  bulletItem: {
    fontSize: '0.9rem',
    color: '#4a5568',
    marginBottom: '0.35rem',
    lineHeight: 1.5,
  },
  link: {
    color: '#4a5568',
    textDecoration: 'none',
    '&:hover': {
      color: '#2b6cb0',
      textDecoration: 'underline',
    },
  },
}));

const ClassicTemplate = ({ resumeData }) => {
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
          <Typography variant="h2" style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: '0.75rem' }}>
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
      
      {/* Summary Section */}
      {resumeData.summary && resumeData.summary.trim() !== '' && (
        <>
          <Typography variant="h3" className={classes.sectionTitle}>
            Professional Summary
          </Typography>
          <Divider className={classes.sectionDivider} />
          <Typography variant="body1" className={classes.summary}>
            {resumeData.summary}
          </Typography>
        </>
      )}
      
      {/* Experience Section */}
      {hasWorkExperienceData() && (
        <>
          <Typography variant="h3" className={classes.sectionTitle}>
            Professional Experience
          </Typography>
          <Divider className={classes.sectionDivider} />
          
          {resumeData.work_experience && resumeData.work_experience.map((experience, index) => (
            <Box key={index} className={classes.experienceItem}>
              <Typography variant="h4" className={classes.itemTitle}>
                {experience.position}
              </Typography>
              <Box className={classes.itemSubtitle}>
                <Typography variant="h5" className={classes.company}>
                  {experience.company_name}
                </Typography>
                <Typography variant="subtitle1" className={classes.duration}>
                  {experience.duration}
                </Typography>
              </Box>
              {experience.description && (
                <Typography variant="body1" className={classes.bulletItem} style={{ marginBottom: '0.5rem' }}>
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
                {experience.position}
              </Typography>
              <Box className={classes.itemSubtitle}>
                <Typography variant="h5" className={classes.company}>
                  {experience.companyName}
                </Typography>
                <Typography variant="subtitle1" className={classes.duration}>
                  {experience.duration}
                </Typography>
              </Box>
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
      
      {/* Education Section */}
      {hasEducationData() && (
        <>
          <Typography variant="h3" className={classes.sectionTitle}>
            Education
          </Typography>
          <Divider className={classes.sectionDivider} />
          
          {Array.isArray(resumeData.education) ? (
            resumeData.education.map((edu, index) => (
              <Box key={index} className={classes.experienceItem}>
                <Typography variant="h4" className={classes.itemTitle}>
                  {edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}
                </Typography>
                <Box className={classes.itemSubtitle}>
                  <Typography variant="h5" className={classes.company}>
                    {edu.institution}
                  </Typography>
                  <Typography variant="subtitle1" className={classes.duration}>
                    {edu.graduation_year || edu.graduationYear}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Box className={classes.experienceItem}>
              <Typography variant="h4" className={classes.itemTitle}>
                {resumeData.education.degree} {resumeData.education.specialization ? `in ${resumeData.education.specialization}` : ''}
              </Typography>
              <Box className={classes.itemSubtitle}>
                <Typography variant="h5" className={classes.company}>
                  {resumeData.education.institution}
                </Typography>
                <Typography variant="subtitle1" className={classes.duration}>
                  {resumeData.education.graduation_year || resumeData.education.graduationYear}
                </Typography>
              </Box>
            </Box>
          )}
        </>
      )}
      
      {/* Skills Section */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <>
          <Typography variant="h3" className={classes.sectionTitle}>
            Skills
          </Typography>
          <Divider className={classes.sectionDivider} />
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
      
      {/* Projects Section */}
      {hasProjectsData() && (
        <>
          <Typography variant="h3" className={classes.sectionTitle}>
            Projects
          </Typography>
          <Divider className={classes.sectionDivider} />
          
          {resumeData.Academic_projects && resumeData.Academic_projects.map((project, index) => (
            <Box key={index} className={classes.experienceItem}>
              <Typography variant="h4" className={classes.itemTitle}>
                {project.name}
              </Typography>
              {project.skills_used && (
                <Typography variant="subtitle1" style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '0.5rem' }}>
                  <strong>Skills:</strong> {project.skills_used}
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
        </>
      )}
      
      {/* Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <>
          <Typography variant="h3" className={classes.sectionTitle}>
            Certifications
          </Typography>
          <Divider className={classes.sectionDivider} />
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
            <Typography variant="h3" className={classes.sectionTitle}>
              {sectionName.replace(/_/g, ' ')}
            </Typography>
            <Divider className={classes.sectionDivider} />
            
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

export default ClassicTemplate;