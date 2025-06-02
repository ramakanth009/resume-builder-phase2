// src/templates/pdf/ExecutiveModernPDFTemplate.jsx
import React from 'react';
import { Text, View, Link, StyleSheet } from '@react-pdf/renderer';

// Define styles for the Executive Modern template
const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    textAlign: 'left',
  },
  name: {
    fontSize: 24,
    fontWeight: 'normal',
    marginBottom: 4,
    color: '#2d3748',
    textTransform: 'uppercase',
    letterSpacing: 2,
    lineHeight: 1.1,
  },
  title: {
    fontSize: 11,
    color: '#4a5568',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 15,
    fontWeight: 'normal',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 3,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 15,
  },
  contactItem: {
    fontSize: 9,
    color: '#4a5568',
    minWidth: '40%',
  },
  contactLink: {
    color: '#2b6cb0',
    textDecoration: 'none',
    fontWeight: 'medium',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2d3748',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
    paddingBottom: 2,
    width: 120,
  },
  summary: {
    fontSize: 9,
    color: '#4a5568',
    lineHeight: 1.7,
    textAlign: 'justify',
    backgroundColor: '#f7fafc',
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#2d3748',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    backgroundColor: '#f7fafc',
    color: '#2d3748',
    fontSize: 8,
    padding: '4 8',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontWeight: 'medium',
  },
  aiSkillChip: {
    backgroundColor: '#ebf8ff',
    color: '#2b6cb0',
    fontSize: 8,
    padding: '4 8',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#bee3f8',
    fontWeight: 'bold',
  },
  experienceItem: {
    marginBottom: 14,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#e2e8f0',
    position: 'relative',
  },
  itemBullet: {
    position: 'absolute',
    left: -4,
    top: 1,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2d3748',
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#2d3748',
  },
  itemSubtitle: {
    fontSize: 9,
    color: '#4a5568',
    marginBottom: 2,
    fontStyle: 'italic',
  },
  itemDuration: {
    fontSize: 8,
    color: '#718096',
    marginBottom: 6,
    fontWeight: 'medium',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 9,
    marginBottom: 3,
    flexDirection: 'row',
    lineHeight: 1.6,
  },
  bullet: {
    width: 8,
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
    color: '#4a5568',
  },
  educationItem: {
    marginBottom: 10,
  },
  projectTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  projectLink: {
    fontSize: 8,
    color: '#2b6cb0',
    textDecoration: 'none',
    marginLeft: 8,
    fontWeight: 'medium',
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

const ExecutiveModernPDFTemplate = ({ resumeData }) => {
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
        description: exp.description || (exp.responsibilities ? exp.responsibilities.join('\n') : '')
      }));
    }
    
    return [];
  };

  // Helper function to check if AI Tools data exists
  const hasAIToolsData = () => {
    return (
      (resumeData.genai_tools && resumeData.genai_tools.length > 0) ||
      (resumeData.aiExperience && resumeData.aiExperience.length > 0)
    );
  };

  // Helper function to get AI Tools for display
  const getAITools = () => {
    if (resumeData.genai_tools && resumeData.genai_tools.length > 0) {
      return resumeData.genai_tools.map((tool) => ({
        name: tool.name || `AI Tool ${tool.tool_id}`,
        usageCases: tool.usage_descriptions || [],
        impact: tool.description || "",
      }));
    }

    if (resumeData.aiExperience && resumeData.aiExperience.length > 0) {
      return resumeData.aiExperience.map((aiExp) => ({
        name: aiExp.toolName || "",
        usageCases: aiExp.usageCases || [],
        impact: aiExp.impact || "",
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
          <Text style={styles.title}>{resumeData.target_role}</Text>
        )}
        
        <View style={styles.contactGrid}>
          {resumeData.header.phone && (
            <Text style={styles.contactItem}>{resumeData.header.phone}</Text>
          )}
          {resumeData.header.email && (
            <Text style={styles.contactItem}>
              <Link src={`mailto:${resumeData.header.email}`} style={styles.contactLink}>
                {resumeData.header.email}
              </Link>
            </Text>
          )}
          {resumeData.header.github && (
            <Text style={styles.contactItem}>
              <Link src={formatUrl(resumeData.header.github)} style={styles.contactLink}>
                GitHub Profile
              </Link>
            </Text>
          )}
          {resumeData.header.linkedin && (
            <Text style={styles.contactItem}>
              <Link src={formatUrl(resumeData.header.linkedin)} style={styles.contactLink}>
                LinkedIn Profile
              </Link>
            </Text>
          )}
          {resumeData.header.portfolio && (
            <Text style={styles.contactItem}>
              <Link src={formatUrl(resumeData.header.portfolio)} style={styles.contactLink}>
                Portfolio Website
              </Link>
            </Text>
          )}
        </View>
      </View>

      {/* Professional Overview/Summary */}
      {resumeData.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Overview</Text>
          <Text style={styles.summary}>{resumeData.summary}</Text>
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
                <View style={styles.itemBullet} />
                <Text style={styles.itemTitle}>{experience.position || ''}</Text>
                <Text style={styles.itemSubtitle}>
                  {(experience.company_name || experience.companyName) ? 
                    `${experience.company_name || experience.companyName}` : ''}
                  {experience.duration ? ` | ${experience.duration}` : ''}
                </Text>
                
                <View style={styles.bulletList}>
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
          <Text style={styles.sectionTitle}>Key Projects</Text>
          
          {resumeData.projects
            .filter(project => project.name && project.name.trim() !== '')
            .map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.itemBullet} />
                <View style={styles.projectTitleContainer}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                  {project.link && project.link.trim() !== '' && (
                    <Link src={formatUrl(project.link)} style={styles.projectLink}>
                      View Project
                    </Link>
                  )}
                </View>
                
                {project.skills_used && project.skills_used.trim() !== '' && (
                  <Text style={styles.itemSubtitle}>Technologies: {project.skills_used}</Text>
                )}
                
                <View style={styles.bulletList}>
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
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.itemTitle}>
                    {edu.degree}{edu.specialization ? ` in ${edu.specialization}` : ''}
                  </Text>
                  <Text style={styles.itemSubtitle}>
                    {edu.institution}
                    {(edu.graduation_year || edu.graduationYear) ? 
                      ` | ${edu.graduation_year || edu.graduationYear}` : ''}
                  </Text>
                </View>
              ))
          ) : (
            <View style={styles.educationItem}>
              <Text style={styles.itemTitle}>
                {resumeData.education.degree}
                {resumeData.education.specialization ? ` in ${resumeData.education.specialization}` : ''}
              </Text>
              <Text style={styles.itemSubtitle}>
                {resumeData.education.institution}
                {(resumeData.education.graduation_year || resumeData.education.graduationYear) ? 
                  ` | ${resumeData.education.graduation_year || resumeData.education.graduationYear}` : ''}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Skills Section */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsGrid}>
            {resumeData.skills
              .filter(skill => skill && skill.trim() !== '')
              .map((skill, index) => (
                <Text key={index} style={styles.skillChip}>{skill}</Text>
              ))}
          </View>
        </View>
      )}

      {/* AI Tools & Technologies Section */}
      {hasAIToolsData() && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Tools</Text>
          <View style={styles.skillsGrid}>
            {getAITools().map((tool, index) => (
              <Text key={index} style={styles.aiSkillChip}>{tool.name}</Text>
            ))}
          </View>
        </View>
      )}

      {/* AI Tools Experience Section */}
      {hasAIToolsData() &&
        getAITools().some((tool) => tool.usageCases && tool.usageCases.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Experience</Text>
            {getAITools()
              .filter((tool) => tool.usageCases && tool.usageCases.length > 0)
              .map((tool, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.itemBullet} />
                  <Text style={styles.itemTitle}>{tool.name}</Text>
                  {tool.impact && (
                    <Text style={styles.itemSubtitle}>{tool.impact}</Text>
                  )}
                  <View style={styles.bulletList}>
                    {tool.usageCases.map((useCase, idx) => (
                      <Bullet key={idx}>{useCase}</Bullet>
                    ))}
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
          <Text style={styles.sectionTitle}>Achievements</Text>
          
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
                    <Text> <Link src={formatUrl(cert.url)} style={styles.contactLink}>
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

export default ExecutiveModernPDFTemplate;