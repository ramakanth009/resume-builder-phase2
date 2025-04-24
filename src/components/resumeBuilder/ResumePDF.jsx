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

// Register fonts for PDF rendering
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontWeight: 'normal', fontStyle: 'italic' },
  ]
});

Font.register({
  family: 'Times',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Times_New_Roman/times-new-roman.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Times_New_Roman/times-new-roman-bold.ttf', fontWeight: 'bold' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Times_New_Roman/times-new-roman-italic.ttf', fontWeight: 'normal', fontStyle: 'italic' },
  ]
});

// Create base styles
const baseStyles = {
  page: {
    padding: 30,
    fontSize: 11,
    lineHeight: 1.5,
    color: '#2d3748',
  },
  header: {
    marginBottom: 20,
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
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 8,
    color: '#718096',
  },
};

// Define template-specific styles
const getTemplateStyles = (templateName) => {
  // Modern template styles
  if (templateName === 'modern') {
    return StyleSheet.create({
      ...baseStyles,
      page: {
        ...baseStyles.page,
        fontFamily: 'Roboto',
        padding: 0,
      },
      header: {
        backgroundColor: '#3182ce',
        color: 'white',
        padding: 30,
        marginBottom: 0,
      },
      name: {
        ...baseStyles.name,
        color: 'white',
        fontSize: 26,
      },
      targetRole: {
        ...baseStyles.targetRole,
        color: '#e2e8f0',
        textAlign: 'left',
      },
      contactBar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '8 30',
        backgroundColor: '#ebf8ff',
      },
      contactItem: {
        ...baseStyles.contactItem,
        color: '#4a5568',
      },
      contentSection: {
        padding: '20 30',
      },
      sectionTitle: {
        ...baseStyles.sectionTitle,
        borderBottomWidth: 0,
        fontSize: 16,
      },
      skillChip: {
        ...baseStyles.skillChip,
        backgroundColor: '#e6f6ff',
      },
    });
  }
  
  // Classic template styles
  else if (templateName === 'classic') {
    return StyleSheet.create({
      ...baseStyles,
      page: {
        ...baseStyles.page,
        fontFamily: 'Times',
        padding: 30,
      },
      header: {
        ...baseStyles.header,
        textAlign: 'center',
      },
      name: {
        ...baseStyles.name,
        textTransform: 'uppercase',
        fontSize: 22,
      },
      contactInfo: {
        ...baseStyles.contactInfo,
        justifyContent: 'center',
      },
      sectionTitle: {
        ...baseStyles.sectionTitle,
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#718096',
        fontSize: 14,
      },
      itemTitle: {
        ...baseStyles.itemTitle,
        fontSize: 13,
      },
      itemSubtitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      },
    });
  }
  
  // Minimal template styles
  else if (templateName === 'minimal') {
    return StyleSheet.create({
      ...baseStyles,
      page: {
        ...baseStyles.page,
        fontFamily: 'Roboto',
        padding: 40,
      },
      header: {
        ...baseStyles.header,
        marginBottom: 25,
      },
      name: {
        ...baseStyles.name,
        letterSpacing: 0.5,
        fontSize: 20,
      },
      contactInfo: {
        ...baseStyles.contactInfo,
        justifyContent: 'flex-start',
        gap: 15,
      },
      sectionTitle: {
        ...baseStyles.sectionTitle,
        fontSize: 13,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e2e8f0',
        paddingBottom: 4,
      },
      skillChip: {
        ...baseStyles.skillChip,
        backgroundColor: '#f7fafc',
        color: '#4a5568',
        border: '0.5 solid #e2e8f0',
        padding: '2 6',
      },
      itemTitle: {
        ...baseStyles.itemTitle,
        fontSize: 11,
      },
    });
  }
  
  // Default styles
  return StyleSheet.create(baseStyles);
};

const Bullet = ({ children, style }) => (
  <View style={{ ...style.bulletItem }}>
    <Text style={style.bullet}>•</Text>
    <Text style={style.bulletText}>{children}</Text>
  </View>
);

const ResumePDF = ({ resumeData, templateName = 'classic' }) => {
  // Get styles based on the template
  const styles = getTemplateStyles(templateName);
  
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

  // Modern Template Render
  if (templateName === 'modern') {
    return (
      <Document title={`${resumeData.header.name || 'Resume'}`} author={resumeData.header.name || 'Applicant'}>
        <Page size="A4" style={styles.page}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.name}>{resumeData.header.name || "Your Name"}</Text>
            
            {resumeData.target_role && resumeData.target_role.trim() !== '' && (
              <Text style={styles.targetRole}>{resumeData.target_role}</Text>
            )}
          </View>
          
          {/* Contact Bar */}
          <View style={styles.contactBar}>
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
          </View>
          
          <View style={styles.contentSection}>
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
            
            {/* Rest of the sections similar to other templates */}
            {/* Work Experience Section */}
            {hasWorkExperienceData() && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                
                {/* Render work experience items */}
                {resumeData.work_experience && resumeData.work_experience.length > 0 &&
                  resumeData.work_experience
                    .filter(exp => (exp.position && exp.position.trim() !== '') || 
                                 (exp.company_name && exp.company_name.trim() !== ''))
                    .map((experience, index) => (
                      <View key={`work-${index}`} style={styles.experienceItem}>
                        <Text style={styles.itemTitle}>
                          {experience.position || "Position"} | {experience.company_name || ""}
                        </Text>
                        {experience.duration && experience.duration.trim() !== '' && (
                          <Text style={styles.duration}>{experience.duration}</Text>
                        )}
                        {/* More experience details... */}
                      </View>
                  ))}
                
                {/* Similar rendering for workExperience array */}
              </View>
            )}
            
            {/* Other sections... */}
            
            {/* Footer */}
            <Text style={styles.footer}>
              Generated with Student Resume Builder
            </Text>
          </View>
        </Page>
      </Document>
    );
  }
  
  // Classic Template Render
  else if (templateName === 'classic') {
    return (
      <Document title={`${resumeData.header.name || 'Resume'}`} author={resumeData.header.name || 'Applicant'}>
        <Page size="A4" style={styles.page}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.name}>{resumeData.header.name || "YOUR NAME"}</Text>
            
            {resumeData.target_role && resumeData.target_role.trim() !== '' && (
              <Text style={styles.targetRole}>{resumeData.target_role}</Text>
            )}
            
            <View style={styles.contactInfo}>
              {resumeData.header.email && (
                <Text style={styles.contactItem}>
                  <Link src={`mailto:${resumeData.header.email}`} style={styles.contactLink}>{resumeData.header.email}</Link>
                </Text>
              )}
              
              {resumeData.header.phone && (
                <Text style={styles.contactItem}>{resumeData.header.phone}</Text>
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
            </View>
          </View>
          
          {/* Summary Section */}
          {resumeData.summary && resumeData.summary.trim() !== '' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
              <Text style={styles.summary}>{resumeData.summary}</Text>
            </View>
          )}
          
          {/* Work Experience Section */}
          {hasWorkExperienceData() && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
              
              {/* Render work experience items */}
              {resumeData.work_experience && resumeData.work_experience.length > 0 &&
                resumeData.work_experience
                  .filter(exp => (exp.position && exp.position.trim() !== '') || 
                              (exp.company_name && exp.company_name.trim() !== ''))
                  .map((experience, index) => (
                    <View key={`work-${index}`} style={styles.experienceItem}>
                      <Text style={styles.itemTitle}>{experience.position || "Position"}</Text>
                      <View style={styles.itemSubtitleRow}>
                        <Text style={styles.itemSubtitle}>{experience.company_name || ""}</Text>
                        <Text style={styles.duration}>{experience.duration || ""}</Text>
                      </View>
                      {/* More experience details... */}
                    </View>
                ))}
              
              {/* Similar rendering for workExperience array */}
            </View>
          )}
          
          {/* Other sections... */}
          
          {/* Footer */}
          <Text style={styles.footer}>
            Generated with Student Resume Builder
          </Text>
        </Page>
      </Document>
    );
  }
  
  // Minimal Template Render (or Default)
  return (
    <Document title={`${resumeData.header.name || 'Resume'}`} author={resumeData.header.name || 'Applicant'}>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.header.name || "Your Name"}</Text>
          
          {resumeData.target_role && resumeData.target_role.trim() !== '' && (
            <Text style={{ ...styles.targetRole, textAlign: 'left', marginBottom: 10 }}>{resumeData.target_role}</Text>
          )}
          
          <View style={styles.contactInfo}>
            {resumeData.header.email && (
              <Text style={styles.contactItem}>
                <Link src={`mailto:${resumeData.header.email}`} style={styles.contactLink}>{resumeData.header.email}</Link>
              </Text>
            )}
            
            {resumeData.header.phone && (
              <Text style={styles.contactItem}>{resumeData.header.phone}</Text>
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
          </View>
        </View>
        
        {/* Summary Section */}
        {resumeData.summary && resumeData.summary.trim() !== '' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
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
        
        {/* Other sections... */}
        
        {/* Footer */}
        <Text style={styles.footer}>
          Generated with Student Resume Builder
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