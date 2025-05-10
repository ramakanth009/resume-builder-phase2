import React from 'react';
import { Text, View, Link, StyleSheet } from '@react-pdf/renderer';

// Define styles for the Classic template
const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
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
    marginHorizontal: 4,
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
    lineHeight: 1.6,
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
    flexDirection: 'row',
    display: 'flex',
  },
  projectTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectLink: {
    fontSize: 10,
    color: '#3182ce',
    textDecoration: 'none',
    marginLeft: 8,
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
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
  },
  linkText: {
    fontSize: 9,
    color: '#3182ce',
    textDecoration: 'none',
    marginTop: 2,
  },
});

// Helper component for bullet points
const Bullet = ({ children }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

// Helper function to format URLs properly
const formatUrl = (url) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
};

const ClassicPDFTemplate = ({ resumeData }) => {
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
        
        <View style={styles.contactInfo}>
          {resumeData.header.email && (
            <Text style={styles.contactItem}>
              Email: <Link src={`mailto:${resumeData.header.email}`} style={styles.contactLink}>
                {resumeData.header.email}
              </Link>
            </Text>
          )}
          
          {resumeData.header.phone && (
            <Text style={styles.contactItem}>
              Phone: {resumeData.header.phone}
            </Text>
          )}
          
          {resumeData.header.github && (
            <Text style={styles.contactItem}>
              GitHub: <Link src={formatUrl(resumeData.header.github)} style={styles.contactLink}>
                {resumeData.header.github.replace(/^https?:\/\//, '')}
              </Link>
            </Text>
          )}
          
          {resumeData.header.linkedin && (
            <Text style={styles.contactItem}>
              LinkedIn: <Link src={formatUrl(resumeData.header.linkedin)} style={styles.contactLink}>
                {resumeData.header.linkedin.replace(/^https?:\/\//, '')}
              </Link>
            </Text>
          )}
          
          {resumeData.header.portfolio && (
            <Text style={styles.contactItem}>
              Portfolio: <Link src={formatUrl(resumeData.header.portfolio)} style={styles.contactLink}>
                {resumeData.header.portfolio.replace(/^https?:\/\//, '')}
              </Link>
            </Text>
          )}
        </View>
        
        {resumeData.target_role && (
          <Text style={styles.targetRole}>{resumeData.target_role}</Text>
        )}
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
                <View style={styles.projectTitleContainer}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                  {project.link && project.link.trim() !== '' && (
                    <Link src={formatUrl(project.link)} style={styles.projectLink}>
                      View Project
                    </Link>
                  )}
                </View>

                {project.skills_used && project.skills_used.trim() !== '' && (
                  <Text style={styles.itemSubtitle}>Skills: {project.skills_used}</Text>
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
                    <Text> - <Link src={formatUrl(cert.url)} style={styles.contactLink}>
                      View
                    </Link></Text>
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

export default ClassicPDFTemplate;