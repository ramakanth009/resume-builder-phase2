import React from 'react';
import { Text, View, Link, StyleSheet } from '@react-pdf/renderer';

// Define styles for the Executive template
const styles = StyleSheet.create({
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
    marginHorizontal: 5,
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
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
  },
});

// Helper component for bullet points
const Bullet = ({ children }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const ExecutivePDFTemplate = ({ resumeData }) => {
  // Helper function to check if education data exists
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

  // Helper function to determine which work experience data to use
  const getWorkExperience = () => {
    if (resumeData.work_experience && resumeData.work_experience.length > 0 && 
        resumeData.work_experience.some(exp => exp.position || exp.company_name)) {
      return resumeData.work_experience;
    }
    
    if (resumeData.workExperience && resumeData.workExperience.length > 0 && 
        resumeData.workExperience.some(exp => exp.position || exp.companyName)) {
      return resumeData.workExperience.map(exp => ({
        ...exp,
        company_name: exp.companyName,
        // Convert responsibilities array to description if needed
        description: exp.description || (exp.responsibilities ? exp.responsibilities.join('\n') : '')
      }));
    }
    
    return [];
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{resumeData.header.name || 'Your Name'}</Text>
        
        {resumeData.target_role && (
          <Text style={styles.targetRole}>{resumeData.target_role}</Text>
        )}
        
        <View style={styles.contactInfo}>
          {resumeData.header.email && (
            <Text style={styles.contactItem}>
              {resumeData.header.email}
            </Text>
          )}
          
          {resumeData.header.phone && (
            <Text style={styles.contactItem}>
              {resumeData.header.phone}
            </Text>
          )}
          
          {resumeData.header.github && (
            <Text style={styles.contactItem}>
              GitHub: {resumeData.header.github.replace('https://', '')}
            </Text>
          )}
          
          {resumeData.header.linkedin && (
            <Text style={styles.contactItem}>
              LinkedIn: {resumeData.header.linkedin.replace('https://', '')}
            </Text>
          )}
          
          {resumeData.header.portfolio && (
            <Text style={styles.contactItem}>
              Portfolio: {resumeData.header.portfolio.replace('https://', '')}
            </Text>
          )}
        </View>
      </View>
      
      {/* Summary Section */}
      {resumeData.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{resumeData.summary}</Text>
        </View>
      )}
      
      {/* Work Experience Section */}
      {getWorkExperience().length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          
          {getWorkExperience().map((experience, index) => 
            (experience.position || experience.company_name) ? (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.itemTitle}>
                  {experience.position || ''}
                  {experience.company_name ? ` | ${experience.company_name}` : ''}
                </Text>
                
                {experience.duration && (
                  <Text style={styles.duration}>{experience.duration}</Text>
                )}
                
                <View style={styles.bulletList}>
                  {/* Handle responsibilities from array or from description string */}
                  {experience.responsibilities && Array.isArray(experience.responsibilities) ? (
                    experience.responsibilities.map((resp, idx) => 
                      resp && resp.trim() !== '' ? (
                        <Bullet key={idx}>{resp}</Bullet>
                      ) : null
                    )
                  ) : experience.description ? (
                    experience.description.split('\n').map((line, idx) => 
                      line && line.trim() !== '' ? (
                        <Bullet key={idx}>{line}</Bullet>
                      ) : null
                    )
                  ) : null}
                </View>
              </View>
            ) : null
          )}
        </View>
      )}
      
      {/* Education Section */}
      {hasEducationData() && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          
          {Array.isArray(resumeData.education) ? (
            resumeData.education.map((edu, index) => edu.degree || edu.institution ? (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.itemTitle}>
                  {edu.degree}{edu.specialization ? ` in ${edu.specialization}` : ''}
                </Text>
                <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                {(edu.graduation_year || edu.graduationYear) && (
                  <Text style={styles.duration}>
                    {edu.graduation_year || edu.graduationYear}
                  </Text>
                )}
              </View>
            ) : null)
          ) : (
            <View style={styles.experienceItem}>
              <Text style={styles.itemTitle}>
                {resumeData.education.degree}
                {resumeData.education.specialization ? ` in ${resumeData.education.specialization}` : ''}
              </Text>
              <Text style={styles.itemSubtitle}>{resumeData.education.institution}</Text>
              {resumeData.education.graduation_year && (
                <Text style={styles.duration}>
                  {resumeData.education.graduation_year}
                </Text>
              )}
            </View>
          )}
        </View>
      )}
      
      {/* Skills Section */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {resumeData.skills.map((skill, index) => 
              skill && skill.trim() !== '' ? (
                <Text key={index} style={styles.skillChip}>{skill}</Text>
              ) : null
            )}
          </View>
        </View>
      )}
      
      {/* Projects Section */}
      {resumeData.projects && resumeData.projects.length > 0 && 
       resumeData.projects.some(p => p.name && p.name.trim() !== '') && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notable Projects</Text>
          
          {resumeData.projects
            .filter(project => project.name && project.name.trim() !== '')
            .map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                
                {project.skills_used && project.skills_used.trim() !== '' && (
                  <Text style={styles.itemSubtitle}>Technologies: {project.skills_used}</Text>
                )}
                
                <View style={styles.bulletList}>
                  {/* Handle responsibilities from array or from description string */}
                  {project.responsibilities && Array.isArray(project.responsibilities) ? (
                    project.responsibilities.map((resp, idx) => 
                      resp && resp.trim() !== '' ? (
                        <Bullet key={idx}>{resp}</Bullet>
                      ) : null
                    )
                  ) : project.description ? (
                    project.description.split('\n').map((line, idx) => 
                      line && line.trim() !== '' ? (
                        <Bullet key={idx}>{line}</Bullet>
                      ) : null
                    )
                  ) : null}
                </View>
              </View>
            ))
          }
        </View>
      )}
      
      {/* Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && 
       resumeData.certifications.some(cert => cert && cert.trim() !== '') && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credentials & Certifications</Text>
          
          <View style={styles.bulletList}>
            {resumeData.certifications
              .filter(cert => cert && cert.trim() !== '')
              .map((cert, index) => (
                <Bullet key={index}>{cert}</Bullet>
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
              
              <View style={styles.bulletList}>
                {Array.isArray(content) ? (
                  content
                    .filter(item => item && item.trim() !== '')
                    .map((item, index) => (
                      <Bullet key={index}>{item}</Bullet>
                    ))
                ) : (
                  <Text style={styles.summary}>{content}</Text>
                )}
              </View>
            </View>
          ))
      )}
    </>
  );
};

export default ExecutivePDFTemplate;