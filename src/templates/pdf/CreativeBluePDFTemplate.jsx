import React from "react";
import { Text, View, Link, StyleSheet } from "@react-pdf/renderer";

// Define styles for the Creative Blue template
const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
    textAlign: "left",
    position: "relative",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#0047ab",
    fontFamily: "Helvetica",
  },
  targetRoleBox: {
    backgroundColor: "#e6f0ff",
    padding: "4 8",
    borderRadius: 4,
    marginBottom: 8,
    maxWidth: "60%",
  },
  targetRole: {
    fontSize: 11,
    fontWeight: "medium",
    color: "#0047ab",
  },
  contactBox: {
    marginTop: 10,
    marginBottom: 12,
    padding: "5 8",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 4,
    backgroundColor: "#f8fafc",
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  contactItem: {
    fontSize: 10,
    marginRight: 8,
    color: "#2d3748",
  },
  contactLink: {
    color: "#0047ab",
    textDecoration: "none",
    fontWeight: "medium",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0047ab",
    marginBottom: 10,
  },
  summary: {
    fontSize: 10,
    marginBottom: 15,
    lineHeight: 1.8,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  skillChip: {
    backgroundColor: "#e6f0ff",
    color: "#0047ab",
    padding: "3 8",
    borderRadius: 4,
    fontSize: 9,
    fontWeight: "medium",
  },
  experienceItem: {
    marginBottom: 14,
    paddingLeft: 10,
    position: "relative",
  },
  itemBullet: {
    position: "absolute",
    left: 0,
    top: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0047ab",
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#2d3748",
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 2,
    color: "#4a5568",
  },
  duration: {
    fontSize: 9,
    color: "#0047ab",
    fontWeight: "medium",
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 4,
    flexDirection: "row",
  },
  bullet: {
    width: 10,
    textAlign: "left",
  },
  bulletText: {
    flex: 1,
    color: "#2d3748",
  },
  aiSkillChip: {
  backgroundColor: '#e6f0ff',
  color: '#0047ab',
  padding: '3 8',
  borderRadius: 4,
  fontSize: 9,
  fontWeight: 'medium',
},
});

// Helper component for bullet points
const Bullet = ({ children }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bullet}>□</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

// Component for section items with a circular bullet
const SectionItem = ({ children }) => (
  <View style={styles.experienceItem}>
    <View style={styles.itemBullet} />
    {children}
  </View>
);

const CreativeBluePDFTemplate = ({ resumeData }) => {
  // Helper function to check if education data exists
  const hasEducationData = () => {
    if (Array.isArray(resumeData.education)) {
      return (
        resumeData.education.length > 0 &&
        resumeData.education.some(
          (edu) =>
            (edu.degree && edu.degree.trim() !== "") ||
            (edu.institution && edu.institution.trim() !== "")
        )
      );
    }

    return (
      resumeData.education &&
      ((resumeData.education.degree &&
        resumeData.education.degree.trim() !== "") ||
        (resumeData.education.institution &&
          resumeData.education.institution.trim() !== ""))
    );
  };

  // Helper function to determine which work experience data to use
  const getWorkExperience = () => {
    if (
      resumeData.work_experience &&
      resumeData.work_experience.length > 0 &&
      resumeData.work_experience.some((exp) => exp.position || exp.company_name)
    ) {
      return resumeData.work_experience;
    }

    if (
      resumeData.workExperience &&
      resumeData.workExperience.length > 0 &&
      resumeData.workExperience.some((exp) => exp.position || exp.companyName)
    ) {
      return resumeData.workExperience.map((exp) => ({
        ...exp,
        company_name: exp.companyName,
        // Convert responsibilities array to description if needed
        description:
          exp.description ||
          (exp.responsibilities ? exp.responsibilities.join("\n") : ""),
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
    // Try genai_tools format first
    if (resumeData.genai_tools && resumeData.genai_tools.length > 0) {
      return resumeData.genai_tools.map((tool) => ({
        name: tool.name || `AI Tool ${tool.tool_id}`,
        usageCases: tool.usage_descriptions || [],
        impact: tool.description || "",
      }));
    }

    // Fallback to aiExperience format
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
        <Text style={styles.name}>{resumeData.header.name || "Your Name"}</Text>

        {resumeData.target_role && (
          <View style={styles.targetRoleBox}>
            <Text style={styles.targetRole}>{resumeData.target_role}</Text>
          </View>
        )}

        <View style={styles.contactBox}>
          <View style={styles.contactInfo}>
            {resumeData.header.email && (
              <Text style={styles.contactItem}>
                Email: {resumeData.header.email}
              </Text>
            )}

            {resumeData.header.phone && (
              <Text style={styles.contactItem}>
                Phone: {resumeData.header.phone}
              </Text>
            )}

            {resumeData.header.github && (
              <Text style={styles.contactItem}>
                GitHub: {resumeData.header.github.replace("https://", "")}
              </Text>
            )}

            {resumeData.header.linkedin && (
              <Text style={styles.contactItem}>
                LinkedIn: {resumeData.header.linkedin.replace("https://", "")}
              </Text>
            )}

            {resumeData.header.portfolio && (
              <Text style={styles.contactItem}>
                Portfolio: {resumeData.header.portfolio.replace("https://", "")}
              </Text>
            )}
          </View>
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
            {resumeData.skills.map((skill, index) =>
              skill && skill.trim() !== "" ? (
                <Text key={index} style={styles.skillChip}>
                  {skill}
                </Text>
              ) : null
            )}
          </View>
        </View>
      )}

      {/* AI Tools & Technologies Section */}
      {hasAIToolsData() && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Tools & Technologies</Text>
          <View style={styles.skillsContainer}>
            {getAITools().map((tool, index) => (
              <Text key={index} style={styles.aiSkillChip}>
                {tool.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* AI Tools Experience Section */}
      {hasAIToolsData() &&
        getAITools().some(
          (tool) => tool.usageCases && tool.usageCases.length > 0
        ) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Tools Experience</Text>

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
      {/* Work Experience Section */}
      {getWorkExperience().length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>

          {getWorkExperience().map((experience, index) =>
            experience.position || experience.company_name ? (
              <SectionItem key={index}>
                <Text style={styles.itemTitle}>
                  {experience.position || ""}
                  {experience.company_name
                    ? ` | ${experience.company_name}`
                    : ""}
                </Text>

                {experience.duration && (
                  <Text style={styles.duration}>{experience.duration}</Text>
                )}

                <View style={styles.bulletList}>
                  {/* Handle responsibilities from array or from description string */}
                  {experience.responsibilities &&
                  Array.isArray(experience.responsibilities)
                    ? experience.responsibilities.map((resp, idx) =>
                        resp && resp.trim() !== "" ? (
                          <Bullet key={idx}>{resp}</Bullet>
                        ) : null
                      )
                    : experience.description
                    ? experience.description
                        .split("\n")
                        .map((line, idx) =>
                          line && line.trim() !== "" ? (
                            <Bullet key={idx}>{line}</Bullet>
                          ) : null
                        )
                    : null}
                </View>
              </SectionItem>
            ) : null
          )}
        </View>
      )}

      {/* Projects Section */}
      {resumeData.projects &&
        resumeData.projects.length > 0 &&
        resumeData.projects.some((p) => p.name && p.name.trim() !== "") && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>

            {resumeData.projects
              .filter((project) => project.name && project.name.trim() !== "")
              .map((project, index) => (
                <SectionItem key={index}>
                  <Text style={styles.itemTitle}>{project.name}</Text>

                  {project.skills_used && project.skills_used.trim() !== "" && (
                    <Text style={styles.itemSubtitle}>
                      Technologies: {project.skills_used}
                    </Text>
                  )}

                  <View style={styles.bulletList}>
                    {/* Handle responsibilities from array or from description string */}
                    {project.responsibilities &&
                    Array.isArray(project.responsibilities)
                      ? project.responsibilities.map((resp, idx) =>
                          resp && resp.trim() !== "" ? (
                            <Bullet key={idx}>{resp}</Bullet>
                          ) : null
                        )
                      : project.description
                      ? project.description
                          .split("\n")
                          .map((line, idx) =>
                            line && line.trim() !== "" ? (
                              <Bullet key={idx}>{line}</Bullet>
                            ) : null
                          )
                      : null}
                  </View>
                </SectionItem>
              ))}
          </View>
        )}

      {/* Education Section */}
      {hasEducationData() && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>

          {Array.isArray(resumeData.education) ? (
            resumeData.education.map((edu, index) =>
              edu.degree || edu.institution ? (
                <SectionItem key={index}>
                  <Text style={styles.itemTitle}>
                    {edu.degree}
                    {edu.specialization ? ` in ${edu.specialization}` : ""}
                  </Text>
                  <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                  {(edu.graduation_year || edu.graduationYear) && (
                    <Text style={styles.duration}>
                      {edu.graduation_year || edu.graduationYear}
                    </Text>
                  )}
                </SectionItem>
              ) : null
            )
          ) : (
            <SectionItem>
              <Text style={styles.itemTitle}>
                {resumeData.education.degree}
                {resumeData.education.specialization
                  ? ` in ${resumeData.education.specialization}`
                  : ""}
              </Text>
              <Text style={styles.itemSubtitle}>
                {resumeData.education.institution}
              </Text>
              {resumeData.education.graduation_year && (
                <Text style={styles.duration}>
                  {resumeData.education.graduation_year}
                </Text>
              )}
            </SectionItem>
          )}
        </View>
      )}

      {/* Certifications Section */}
      {resumeData.certifications &&
        resumeData.certifications.length > 0 &&
        resumeData.certifications.some(
          (cert) => cert && cert.trim() !== ""
        ) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>

            <View style={styles.bulletList}>
              {resumeData.certifications
                .filter((cert) => cert && cert.trim() !== "")
                .map((cert, index) => (
                  <Bullet key={index}>{cert}</Bullet>
                ))}
            </View>
          </View>
        )}

      {/* Custom Sections */}
      {resumeData.customSections &&
        Object.keys(resumeData.customSections).length > 0 &&
        Object.entries(resumeData.customSections)
          .filter(([_, content]) => {
            if (Array.isArray(content)) {
              return (
                content.length > 0 &&
                content.some((item) => item && item.trim() !== "")
              );
            }
            return (
              content && typeof content === "string" && content.trim() !== ""
            );
          })
          .map(([sectionName, content]) => (
            <View key={sectionName} style={styles.section}>
              <Text style={styles.sectionTitle}>
                {sectionName.replace(/_/g, " ")}
              </Text>

              <View style={styles.bulletList}>
                {Array.isArray(content) ? (
                  content
                    .filter((item) => item && item.trim() !== "")
                    .map((item, index) => <Bullet key={index}>{item}</Bullet>)
                ) : (
                  <Text style={styles.summary}>{content}</Text>
                )}
              </View>
            </View>
          ))}
    </>
  );
};

export default CreativeBluePDFTemplate;
