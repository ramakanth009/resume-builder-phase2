import React from 'react';
import { Text, View, Link, StyleSheet } from '@react-pdf/renderer';

// Define styles for the Creative template
const styles = StyleSheet.create({
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
    marginBottom: 30,
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
    marginHorizontal: 4,
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
    color: 'white',
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
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
  },
  linkText: {
    fontSize: 9,
    color: '#5a67d8',
    textDecoration: 'none',
    marginTop: 2,
    fontWeight: 'bold',
  },
});

// Helper component for bullet points
const Bullet = ({ children }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const CreativePDFTemplate = ({ resumeData }) => {
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
      
      {/* Skills Section */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {resumeData.skills
              .filter(skill => skill && skill.trim() !== '')
              .map((skill, index) => (
                <Text key={index} style={styles.skillChip}>{skill}</Text>
              ))}
          </View>
        </View>
      )}
      
      {/* Work Experience Section */}
      {getWorkExperience().length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          
          {getWorkExperience()
            .filter(exp => (exp.position && exp.position.trim() !== '') || 
                           (exp.company_name && exp.company_name.trim() !== '') ||
                           (exp.companyName && exp.companyName.trim() !== ''))
            .map((experience, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.itemTitle}>
                  {experience.position || ''}
                  {(experience.company_name || experience.companyName) ? 
                    ` | ${experience.company_name || experience.companyName}` : ''}
                </Text>
                
                {experience.duration && (
                  <Text style={styles.duration}>{experience.duration}</Text>
                )}
                
                <View style={styles.bulletList}>
                  {/* Handle responsibilities from array or from description string */}
                  {experience.responsibilities && Array.isArray(experience.responsibilities) ? (
                    experience.responsibilities
                      .filter(resp => resp && resp.trim() !== '')
                      .map((resp, idx) => (
                        <Bullet key={idx}>{resp}</Bullet>
                      ))
                  ) : experience.description ? (
                    experience.description.split('\n')
                      .filter(line => line && line.trim() !== '')
                      .map((line, idx) => (
                        <Bullet key={idx}>{line}</Bullet>
                      ))
                  ) : null}
                </View>
              </View>
            ))}
        </View>
      )}
      
      {/* Projects Section */}
      {resumeData.projects && resumeData.projects.length > 0 && 
       resumeData.projects.some(p => p.name && p.name.trim() !== '') && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          
          {resumeData.projects
            .filter(project => project.name && project.name.trim() !== '')
            .map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                
                {project.skills_used && project.skills_used.trim() !== '' && (
                  <Text style={styles.itemSubtitle}>Skills: {project.skills_used}</Text>
                )}
                
                {project.link && project.link.trim() !== '' && (
                  <Text style={styles.linkText}>
                    Link: {project.link.replace('https://', '')}
                  </Text>
                )}
                
                <View style={styles.bulletList}>
                  {/* Handle responsibilities from array or from description string */}
                  {project.responsibilities && Array.isArray(project.responsibilities) && project.responsibilities.length > 0 ? (
                    project.responsibilities
                      .filter(resp => resp && resp.trim() !== '')
                      .map((resp, idx) => (
                        <Bullet key={idx}>{resp}</Bullet>
                      ))
                  ) : project.description ? (
                    project.description.split('\n')
                      .filter(line => line && line.trim() !== '')
                      .map((line, idx) => (
                        <Bullet key={idx}>{line}</Bullet>
                      ))
                  ) : null}
                </View>
              </View>
            ))}
        </View>
      )}
      
      {/* Education Section */}
      {hasEducationData() && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          
          {Array.isArray(resumeData.education) ? (
            resumeData.education
              .filter(edu => (edu.degree && edu.degree.trim() !== '') || (edu.institution && edu.institution.trim() !== ''))
              .map((edu, index) => (
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
              ))
          ) : (
            <View style={styles.experienceItem}>
              <Text style={styles.itemTitle}>
                {resumeData.education.degree}
                {resumeData.education.specialization ? ` in ${resumeData.education.specialization}` : ''}
              </Text>
              <Text style={styles.itemSubtitle}>{resumeData.education.institution}</Text>
              {(resumeData.education.graduation_year || resumeData.education.graduationYear) && (
                <Text style={styles.duration}>
                  {resumeData.education.graduation_year || resumeData.education.graduationYear}
                </Text>
              )}
            </View>
          )}
        </View>
      )}
      
      {/* Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && 
       resumeData.certifications.some(cert => 
         (typeof cert === 'string' && cert.trim() !== '') || 
         (typeof cert === 'object' && cert.name && cert.name.trim() !== '')
       ) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          
          <View style={styles.bulletList}>
            {resumeData.certifications
              .filter(cert => 
                (typeof cert === 'string' && cert.trim() !== '') || 
                (typeof cert === 'object' && cert.name && cert.name.trim() !== '')
              )
              .map((cert, index) => (
                <Bullet key={index}>
                  {typeof cert === 'string' ? cert : 
                   cert.name + (cert.issuer ? ` | ${cert.issuer}` : '')}
                  {typeof cert === 'object' && cert.url && cert.url.trim() !== '' && (
                    <Text style={styles.linkText}>
                      {' '}- {cert.url.replace('https://', '')}
                    </Text>
                  )}
                </Bullet>
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

export default CreativePDFTemplate;