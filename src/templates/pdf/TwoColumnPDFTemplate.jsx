// src/templates/pdf/TwoColumnPDFTemplate.jsx
import React from 'react';
import { Text, View, Link, StyleSheet } from '@react-pdf/renderer';

// Define styles for the Two-Column template
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    fontFamily: 'Helvetica',
  },
  leftColumn: {
    flex: '0 0 35%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    lineHeight: 1.1,
  },
  title: {
    fontSize: 9,
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    fontWeight: 'medium',
  },
  contactSection: {
    marginBottom: 12,
  },
  contactItem: {
    fontSize: 8,
    color: '#333333',
    marginBottom: 2,
    lineHeight: 1.4,
  },
  contactLink: {
    color: '#000000',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 12,
  },
  leftSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#000000',
    paddingBottom: 2,
  },
  rightSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 8,
    color: '#333333',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  skillItem: {
    fontSize: 8,
    color: '#333333',
    marginBottom: 2,
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 8,
  },
  experienceItem: {
    marginBottom: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#000000',
    fontSize: 9,
  },
  itemSubtitle: {
    fontSize: 8,
    color: '#333333',
    marginBottom: 1,
  },
  itemDate: {
    fontSize: 7,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 8,
    marginTop: 3,
  },
  bulletItem: {
    fontSize: 8,
    marginBottom: 2,
    flexDirection: 'row',
    lineHeight: 1.5,
  },
  bullet: {
    width: 6,
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
    color: '#333333',
  },
  skillsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  skillChip: {
    fontSize: 8,
    color: '#333333',
    marginBottom: 2,
  },
  aiSkillChip: {
    fontSize: 8,
    color: '#333333',
    fontWeight: 'medium',
    marginBottom: 2,
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

const TwoColumnPDFTemplate = ({ resumeData }) => {
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
    <View style={styles.container}>
      {/* Left Column */}
      <View style={styles.leftColumn}>
        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.leftSectionTitle}>Contact</Text>
          <View style={styles.contactSection}>
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
            {resumeData.header.portfolio && (
              <Text style={styles.contactItem}>
                <Link src={formatUrl(resumeData.header.portfolio)} style={styles.contactLink}>
                  {resumeData.header.portfolio.replace(/^https?:\/\//, '')}
                </Link>
              </Text>
            )}
            {resumeData.header.linkedin && (
              <Text style={styles.contactItem}>
                <Link src={formatUrl(resumeData.header.linkedin)} style={styles.contactLink}>
                  LinkedIn
                </Link>
              </Text>
            )}
            {resumeData.header.github && (
              <Text style={styles.contactItem}>
                <Link src={formatUrl(resumeData.header.github)} style={styles.contactLink}>
                  GitHub
                </Link>
              </Text>
            )}
          </View>
        </View>

        {/* Summary Section */}
        {resumeData.summary && (
          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>Profile</Text>
            <Text style={styles.summary}>{resumeData.summary}</Text>
          </View>
        )}

        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills
                .filter(skill => skill && skill.trim() !== '')
                .map((skill, index) => (
                  <Text key={index} style={styles.skillChip}>{skill}</Text>
                ))}
            </View>
          </View>
        )}

        {/* AI Tools Section */}
        {hasAIToolsData() && (
          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>AI Tools</Text>
            <View style={styles.skillsContainer}>
              {getAITools().map((tool, index) => (
                <Text key={index} style={styles.aiSkillChip}>{tool.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Education Section */}
        {hasEducationData() && (
          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>Education</Text>
            {Array.isArray(resumeData.education) ? (
              resumeData.education
                .filter(edu => (edu.degree && edu.degree.trim() !== '') || (edu.institution && edu.institution.trim() !== ''))
                .map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.itemTitle}>{edu.institution}</Text>
                    <Text style={styles.itemDate}>
                      {edu.graduation_year || edu.graduationYear}
                    </Text>
                    <Text style={styles.itemSubtitle}>
                      {edu.degree}{edu.specialization ? ` in ${edu.specialization}` : ''}
                    </Text>
                  </View>
                ))
            ) : (
              <View style={styles.educationItem}>
                <Text style={styles.itemTitle}>{resumeData.education.institution}</Text>
                <Text style={styles.itemDate}>
                  {resumeData.education.graduation_year || resumeData.education.graduationYear}
                </Text>
                <Text style={styles.itemSubtitle}>
                  {resumeData.education.degree}
                  {resumeData.education.specialization ? ` in ${resumeData.education.specialization}` : ''}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Right Column */}
      <View style={styles.rightColumn}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.header.name || 'Your Name'}</Text>
          {resumeData.target_role && (
            <Text style={styles.title}>{resumeData.target_role}</Text>
          )}
        </View>

        {/* Work Experience Section */}
        {getWorkExperience().length > 0 && (
          <View style={styles.section}>
            <Text style={styles.rightSectionTitle}>Experience</Text>
            {getWorkExperience()
              .filter(exp => (exp.position && exp.position.trim() !== '') || 
                             (exp.company_name && exp.company_name.trim() !== '') ||
                             (exp.companyName && exp.companyName.trim() !== ''))
              .map((experience, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.itemTitle}>
                    {experience.position || ''}
                  </Text>
                  <Text style={styles.itemDate}>{experience.duration}</Text>
                  <Text style={styles.itemSubtitle}>
                    {(experience.company_name || experience.companyName) ? 
                      `${experience.company_name || experience.companyName}` : ''}
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
            <Text style={styles.rightSectionTitle}>Projects</Text>
            {resumeData.projects
              .filter(project => project.name && project.name.trim() !== '')
              .map((project, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.itemTitle}>{project.name}</Text>
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

        {/* AI Tools Experience Section */}
        {hasAIToolsData() &&
          getAITools().some((tool) => tool.usageCases && tool.usageCases.length > 0) && (
            <View style={styles.section}>
              <Text style={styles.rightSectionTitle}>AI Tools Experience</Text>
              {getAITools()
                .filter((tool) => tool.usageCases && tool.usageCases.length > 0)
                .map((tool, index) => (
                  <View key={index} style={styles.experienceItem}>
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
            <Text style={styles.rightSectionTitle}>Certifications</Text>
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
                <Text style={styles.rightSectionTitle}>
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
      </View>
    </View>
  );
};

export default TwoColumnPDFTemplate;