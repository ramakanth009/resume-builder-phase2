// src/templates/pdf/BlueCorporatePDFTemplate.jsx
import React from 'react';
import { Text, View, Link, StyleSheet } from '@react-pdf/renderer';

// Define styles for the Blue Corporate template
const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    lineHeight: 1.1,
  },
  title: {
    fontSize: 12,
    color: '#bfdbfe',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    fontWeight: 'normal',
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    paddingBottom: 3,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    flexWrap: 'wrap',
  },
  contactItem: {
    fontSize: 8,
    color: '#e5e7eb',
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    padding: '3 8',
    borderRadius: 3,
  },
  contactLink: {
    color: '#e5e7eb',
    textDecoration: 'none',
    fontWeight: 'medium',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1e3a8a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 2,
    borderBottomColor: '#1e3a8a',
    paddingBottom: 3,
    width: 80,
  },
  summary: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.7,
    textAlign: 'justify',
    backgroundColor: '#eff6ff',
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  twoColumnContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontSize: 8,
    padding: '3 6',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#93c5fd',
    fontWeight: 'medium',
  },
  aiSkillChip: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    fontSize: 8,
    padding: '3 6',
    borderRadius: 3,
    fontWeight: 'bold',
  },
  keySkillsContainer: {
    backgroundColor: '#dbeafe',
    padding: 10,
    borderRadius: 3,
    marginBottom: 12,
  },
  keySkillsTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1e40af',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  keySkillItem: {
    fontSize: 8,
    color: '#1e40af',
    fontWeight: 'medium',
    marginBottom: 2,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#93c5fd',
  },
  awardsContainer: {
    backgroundColor: '#fef3c7',
    padding: 10,
    borderRadius: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  awardsTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#92400e',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  awardItem: {
    fontSize: 8,
    color: '#92400e',
    fontWeight: 'medium',
    marginBottom: 2,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#fbbf24',
  },
  experienceItem: {
    marginBottom: 12,
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  educationItem: {
    marginBottom: 10,
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 3,
    borderLeftWidth: 2,
    borderLeftColor: '#64748b',
  },
  itemTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#1e293b',
  },
  itemSubtitle: {
    fontSize: 8,
    color: '#64748b',
    marginBottom: 2,
    fontStyle: 'italic',
  },
  itemDuration: {
    fontSize: 7,
    color: '#94a3b8',
    marginBottom: 4,
    fontWeight: 'medium',
  },
  bulletList: {
    marginLeft: 8,
    marginTop: 3,
  },
  bulletItem: {
    fontSize: 8,
    marginBottom: 2,
    flexDirection: 'row',
    lineHeight: 1.6,
  },
  bullet: {
    width: 6,
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
    color: '#374151',
  },
  objectiveContainer: {
    backgroundColor: '#eff6ff',
    padding: 10,
    borderRadius: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
    marginBottom: 12,
  },
  objectiveTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1e40af',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  objective: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  projectTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  projectTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  projectLink: {
    fontSize: 7,
    color: '#3b82f6',
    textDecoration: 'none',
    marginLeft: 6,
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

const BlueCorporatePDFTemplate = ({ resumeData }) => {
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
        <Text style={styles.name}>{resumeData.header.name || 'Your Name Surname'}</Text>
        {resumeData.target_role && (
          <Text style={styles.title}>{resumeData.target_role}</Text>
        )}
        
        <View style={styles.contactRow}>
          {resumeData.header.phone && (
            <Text style={styles.contactItem}>P {resumeData.header.phone}</Text>
          )}
          {resumeData.header.email && (
            <Text style={styles.contactItem}>
              E <Link src={`mailto:${resumeData.header.email}`} style={styles.contactLink}>
                {resumeData.header.email}
              </Link>
            </Text>
          )}
          {resumeData.header.portfolio && (
            <Text style={styles.contactItem}>
              W <Link src={formatUrl(resumeData.header.portfolio)} style={styles.contactLink}>
                {resumeData.header.portfolio.replace(/^https?:\/\//, '')}
              </Link>
            </Text>
          )}
          {resumeData.header.linkedin && (
            <Text style={styles.contactItem}>
              LinkedIn <Link src={formatUrl(resumeData.header.linkedin)} style={styles.contactLink}>
                Profile
              </Link>
            </Text>
          )}
        </View>
      </View>

      {/* Two Column Layout */}
      <View style={styles.twoColumnContainer}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Objective/Summary */}
          {resumeData.summary && (
            <View style={styles.objectiveContainer}>
              <Text style={styles.objectiveTitle}>Objective</Text>
              <Text style={styles.objective}>{resumeData.summary}</Text>
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
                      <Text style={styles.itemTitle}>{edu.institution}</Text>
                      <Text style={styles.itemSubtitle}>
                        {edu.degree}{edu.specialization ? ` in ${edu.specialization}` : ''}
                      </Text>
                      <Text style={styles.itemDuration}>
                        {edu.graduation_year || edu.graduationYear}
                      </Text>
                    </View>
                  ))
              ) : (
                <View style={styles.educationItem}>
                  <Text style={styles.itemTitle}>{resumeData.education.institution}</Text>
                  <Text style={styles.itemSubtitle}>
                    {resumeData.education.degree}
                    {resumeData.education.specialization ? ` in ${resumeData.education.specialization}` : ''}
                  </Text>
                  <Text style={styles.itemDuration}>
                    {resumeData.education.graduation_year || resumeData.education.graduationYear}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Key Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.keySkillsContainer}>
              <Text style={styles.keySkillsTitle}>Key Skills</Text>
              {resumeData.skills
                .filter(skill => skill && skill.trim() !== '')
                .slice(0, 5)
                .map((skill, index) => (
                  <Text key={index} style={styles.keySkillItem}>{skill}</Text>
                ))}
            </View>
          )}

          {/* Awards (using certifications) */}
          {resumeData.certifications && resumeData.certifications.length > 0 && 
           resumeData.certifications.some(cert => 
             (typeof cert === 'string' && cert.trim() !== '') || 
             (typeof cert === 'object' && cert.name && cert.name.trim() !== '')
           ) && (
            <View style={styles.awardsContainer}>
              <Text style={styles.awardsTitle}>Awards</Text>
              {resumeData.certifications
                .filter(cert => 
                  (typeof cert === 'string' && cert.trim() !== '') || 
                  (typeof cert === 'object' && cert.name && cert.name.trim() !== '')
                )
                .slice(0, 3)
                .map((cert, index) => (
                  <Text key={index} style={styles.awardItem}>
                    {typeof cert === 'string' ? cert : cert.name}
                  </Text>
                ))}
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Work Experience Section */}
          {getWorkExperience().length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              
              {getWorkExperience()
                .filter(exp => (exp.position && exp.position.trim() !== '') || 
                               (exp.company_name && exp.company_name.trim() !== '') ||
                               (exp.companyName && exp.companyName.trim() !== ''))
                .map((experience, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.itemDuration}>
                      [{experience.duration || 'Present'}]
                    </Text>
                    <Text style={styles.itemTitle}>
                      {experience.position || ''} • {(experience.company_name || experience.companyName) || ''}
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
              <Text style={styles.sectionTitle}>Projects</Text>
              
              {resumeData.projects
                .filter(project => project.name && project.name.trim() !== '')
                .map((project, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.projectTitleContainer}>
                      <Text style={styles.projectTitle}>{project.name}</Text>
                      {project.link && project.link.trim() !== '' && (
                        <Link src={formatUrl(project.link)} style={styles.projectLink}>
                          View
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

          {/* Communication & Leadership Sections */}
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
                    {sectionName.replace(/_/g, ' ').toUpperCase()}
                  </Text>
                  
                  <View style={styles.experienceItem}>
                    {Array.isArray(content) ? (
                      <View style={styles.bulletList}>
                        {content
                          .filter(item => item && item.trim() !== '')
                          .map((item, index) => (
                            <Bullet key={index}>{item}</Bullet>
                          ))}
                      </View>
                    ) : (
                      <Text style={styles.objective}>{content}</Text>
                    )}
                  </View>
                </View>
              ))
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
        </View>
      </View>

      {/* All Skills Section (if more skills exist) */}
      {resumeData.skills && resumeData.skills.length > 5 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Skills</Text>
          <View style={styles.skillsGrid}>
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
          <Text style={styles.sectionTitle}>AI Tools</Text>
          <View style={styles.skillsGrid}>
            {getAITools().map((tool, index) => (
              <Text key={index} style={styles.aiSkillChip}>{tool.name}</Text>
            ))}
          </View>
        </View>
      )}

      {/* References */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>References</Text>
        <Text style={styles.objective}>[Available upon request.]</Text>
      </View>
    </>
  );
};

export default BlueCorporatePDFTemplate;