import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Link, 
  Font 
} from '@react-pdf/renderer';
import templatesData from '../../data/templatesData';

// Register fonts for PDF rendering
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontWeight: 'normal', fontStyle: 'italic' },
  ]
});

// Create base styles
const baseStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    fontSize: 11,
    lineHeight: 1.5,
    color: '#2d3748',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 8,
    color: '#718096',
  },
});

// Classic template styles
const classicStyles = StyleSheet.create({
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 10,
  },
  contactLink: {
    color: '#3182ce',
    textDecoration: 'none',
  },
  targetRole: {
    fontSize: 12,
    fontWeight: 'medium',
    textAlign: 'center',
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 3,
    marginBottom: 8,
    color: '#1a202c',
  },
  summary: {
    fontSize: 10,
    marginBottom: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  skillChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    padding: '3 6',
    borderRadius: 4,
    fontSize: 9,
  },
  experienceItem: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  duration: {
    fontSize: 9,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 3,
    flexDirection: 'row',
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
});

// Modern template styles
const modernStyles = StyleSheet.create({
  header: {
    marginBottom: 20,
    textAlign: 'left',
    paddingBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#3182ce',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a202c',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 10,
  },
  contactLink: {
    color: '#0366d6',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  targetRole: {
    fontSize: 13,
    fontWeight: 'medium',
    marginBottom: 15,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3182ce',
    marginBottom: 10,
  },
  summary: {
    fontSize: 10,
    marginBottom: 15,
    lineHeight: 1.7,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  skillChip: {
    backgroundColor: '#e6f7ff',
    color: '#0366d6',
    padding: '3 8',
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 'bold',
  },
  experienceItem: {
    marginBottom: 14,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#1a202c',
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  duration: {
    fontSize: 9,
    color: '#3182ce',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 4,
    flexDirection: 'row',
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
});

// Creative template styles
const creativeStyles = StyleSheet.create({
  header: {
    marginBottom: 20,
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#5a67d8',
    borderRadius: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 10,
    color: 'white',
  },
  contactLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  targetRole: {
    fontSize: 12,
    fontWeight: 'medium',
    textAlign: 'center',
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5a67d8',
    paddingBottom: 2,
    marginBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#5a67d8',
    width: 150,
  },
  summary: {
    fontSize: 10,
    marginBottom: 15,
    fontStyle: 'italic',
    lineHeight: 1.8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  skillChip: {
    backgroundColor: '#5a67d8',
    color: 'white',
    padding: '3 8',
    borderRadius: 10,
    fontSize: 9,
    fontWeight: 'bold',
  },
  experienceItem: {
    marginBottom: 14,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#5a67d8',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#1a202c',
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  duration: {
    fontSize: 9,
    color: '#5a67d8',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 4,
    flexDirection: 'row',
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
});

// Executive template styles
const executiveStyles = StyleSheet.create({
  header: {
    marginBottom: 20,
    textAlign: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a202c',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 10,
  },
  contactLink: {
    color: '#1a202c',
    textDecoration: 'none',
  },
  targetRole: {
    fontSize: 12,
    fontWeight: 'medium',
    textAlign: 'center',
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e0',
    paddingBottom: 3,
    marginBottom: 8,
    color: '#1a202c',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summary: {
    fontSize: 10,
    marginBottom: 15,
    lineHeight: 1.7,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  skillChip: {
    backgroundColor: '#f7fafc',
    color: '#1a202c',
    padding: '3 8',
    borderRadius: 4,
    fontSize: 9,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  experienceItem: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#1a202c',
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  duration: {
    fontSize: 9,
    color: '#718096',
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 3,
    flexDirection: 'row',
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
});

const Bullet = ({ children, styles }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const ResumePDF = ({ resumeData, templateId = 'classic' }) => {
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
  return resumeData.projects && resumeData.projects.length > 0 && 
    resumeData.projects.some(p => p.name && p.name.trim() !== '');
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

  // Select template styles based on templateId
  const getTemplateStyles = () => {
    switch(templateId) {
      case 'modern':
        return modernStyles;
      case 'creative':
        return creativeStyles;
      case 'executive':
        return executiveStyles;
      case 'classic':
      default:
        return classicStyles;
    }
  };

  const styles = getTemplateStyles();

  return (
    <Document title={`${resumeData.header.name || 'Resume'}`} author={resumeData.header.name || 'Applicant'}>
      <Page size="A4" style={baseStyles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.header.name || "Your Name"}</Text>
          
          <View style={styles.contactInfo}>
            {resumeData.header.email && (
              <Text style={styles.contactItem}>
                Email: <Link src={`mailto:${resumeData.header.email}`} style={styles.contactLink}>{resumeData.header.email}</Link>
              </Text>
            )}
            
            {resumeData.header.phone && (
              <Text style={styles.contactItem}>Phone: {resumeData.header.phone}</Text>
            )}
            
            {resumeData.header.github && (
              <Text style={styles.contactItem}>
                <Link src={ensureUrl(resumeData.header.github)} style={styles.contactLink}>GitHub</Link>
              </Text>
            )}
            
            {resumeData.header.linkedin && (
              <Text style={styles.contactItem}>
                <Link src={ensureUrl(resumeData.header.linkedin)} style={styles.contactLink}>LinkedIn</Link>
              </Text>
            )}
            
            {resumeData.header.portfolio && (
              <Text style={styles.contactItem}>
                <Link src={ensureUrl(resumeData.header.portfolio)} style={styles.contactLink}>Portfolio</Link>
              </Text>
            )}
          </View>
        </View>
        
        {/* Target Role */}
        {resumeData.target_role && resumeData.target_role.trim() !== '' && (
          <Text style={styles.targetRole}>Target Role: {resumeData.target_role}</Text>
        )}
        
        {/* Summary Section */}
        {resumeData.summary && resumeData.summary.trim() !== '' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{resumeData.summary}</Text>
          </View>
        )}
        
        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && resumeData.skills.some(skill => skill && skill.trim() !== '') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.filter(skill => skill && skill.trim() !== '').map((skill, index) => (
                <Text key={index} style={styles.skillChip}>{skill}</Text>
              ))}
            </View>
          </View>
        )}
        
        {/* Education Section */}
        {hasEducationData() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {Array.isArray(resumeData.education) ? (
              resumeData.education.map((edu, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.itemTitle}>
                    {edu.degree || ''} 
                    {edu.specialization ? ` in ${edu.specialization}` : ''}
                  </Text>
                  {edu.institution && (
                    <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                  )}
                  {(edu.graduation_year || edu.graduationYear) && (
                    <Text style={styles.duration}>
                      Graduated: {edu.graduation_year || edu.graduationYear}
                    </Text>
                  )}
                </View>
              ))
            ) : (
              <View style={styles.experienceItem}>
                <Text style={styles.itemTitle}>
                  {resumeData.education.degree || ''} 
                  {resumeData.education.specialization ? ` in ${resumeData.education.specialization}` : ''}
                </Text>
                {resumeData.education.institution && (
                  <Text style={styles.itemSubtitle}>{resumeData.education.institution}</Text>
                )}
                {resumeData.education.graduation_year && (
                  <Text style={styles.duration}>
                    Graduated: {resumeData.education.graduation_year}
                  </Text>
                )}
              </View>
            )}
          </View>
        )}

        {/* Work Experience Section */}
        {hasWorkExperienceData() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            
            {resumeData.work_experience && resumeData.work_experience.length > 0 &&
              resumeData.work_experience
                .filter(exp => (exp.position && exp.position.trim() !== '') || 
                               (exp.company_name && exp.company_name.trim() !== ''))
                .map((experience, index) => (
                  <View key={`work-${index}`} style={styles.experienceItem}>
                    <Text style={styles.itemTitle}>
                      {experience.position || "Position"} 
                      {experience.company_name ? 
                        ` | ${experience.company_name}` : ""}
                    </Text>
                    {experience.duration && experience.duration.trim() !== '' && (
                      <Text style={styles.duration}>{experience.duration}</Text>
                    )}
                    {experience.description && experience.description.trim() !== '' && (
                      <Text style={styles.itemSubtitle}>{experience.description}</Text>
                    )}
                    {experience.responsibilities && experience.responsibilities.length > 0 && 
                      experience.responsibilities.some(r => r && r.trim() !== '') && (
                      <View style={styles.bulletList}>
                        {experience.responsibilities
                          .filter(r => r && r.trim() !== '')
                          .map((responsibility, idx) => (
                            <Bullet key={idx} styles={styles}>{responsibility}</Bullet>
                        ))}
                      </View>
                    )}
                  </View>
              ))}
            
            {resumeData.workExperience && resumeData.workExperience.length > 0 &&
              resumeData.workExperience
                .filter(exp => (exp.position && exp.position.trim() !== '') || 
                               (exp.companyName && exp.companyName.trim() !== ''))
                .map((experience, index) => (
                  <View key={`workExp-${index}`} style={styles.experienceItem}>
                    <Text style={styles.itemTitle}>
                      {experience.position || "Position"} 
                      {experience.companyName ? 
                        ` | ${experience.companyName}` : ""}
                    </Text>
                    {experience.duration && experience.duration.trim() !== '' && (
                      <Text style={styles.duration}>{experience.duration}</Text>
                    )}
                    {experience.description && experience.description.trim() !== '' && (
                      <Text style={styles.itemSubtitle}>{experience.description}</Text>
                    )}
                    {experience.responsibilities && experience.responsibilities.length > 0 && (
                      <View style={styles.bulletList}>
                        {experience.responsibilities.map((responsibility, idx) => (
                          <Bullet key={idx} styles={styles}>{responsibility}</Bullet>
                        ))}
                      </View>
                    )}
                  </View>
              ))}
          </View>
        )}
        
        {/* Projects Section */}
{hasProjectsData() && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Projects</Text>
    
    {resumeData.projects && resumeData.projects.length > 0 &&
      resumeData.projects
        .filter(p => p.name && p.name.trim() !== '')
        .map((project, index) => (
          <View key={`project-${index}`} style={styles.experienceItem}>
            <Text style={styles.itemTitle}>{project.name || "Project Name"}</Text>
            
            {project.responsibilities && project.responsibilities.length > 0 && (
              <View style={styles.bulletList}>
                {project.responsibilities.map((responsibility, idx) => (
                  <Bullet key={idx} styles={styles}>{responsibility}</Bullet>
                ))}
              </View>
            )}
            
            {project.skills_used && project.skills_used.trim() !== '' && (
              <Text style={styles.duration}>
                Skills: {project.skills_used}
              </Text>
            )}
            
            {project.technologies && project.technologies.length > 0 && (
              <Text style={styles.duration}>
                Skills: {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
              </Text>
            )}
            
            {project.description && project.description.trim() !== '' && (
              <Text style={styles.itemSubtitle}>{project.description}</Text>
            )}
          </View>
        ))}
  </View>
)}
        
        {/* Certifications Section */}
        {resumeData.certifications && resumeData.certifications.length > 0 && 
          resumeData.certifications.some(cert => cert && cert.trim() !== '') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.bulletList}>
              {resumeData.certifications
                .filter(cert => cert && cert.trim() !== '')
                .map((cert, index) => (
                  <Bullet key={index} styles={styles}>{cert}</Bullet>
              ))}
            </View>
          </View>
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
              <View key={sectionName} style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {sectionName.replace(/_/g, ' ')}
                </Text>
                
                {Array.isArray(content) ? (
                  <View style={styles.bulletList}>
                    {content
                      .filter(item => item && item.trim() !== '')
                      .map((item, index) => (
                        <Bullet key={index} styles={styles}>{item}</Bullet>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.itemSubtitle}>{content}</Text>
                )}
              </View>
            ))
        )}
        
        {/* Footer */}
        <Text style={baseStyles.footer}>
          Resume generated with Student Resume Builder
        </Text>
      </Page>
    </Document>
  );
};

// Helper function to ensure URLs have proper format
const ensureUrl = (url) => {
  if (!url) return '';
  return url.match(/^https?:\/\//) ? url : `https://${url}`;
};

export default ResumePDF;