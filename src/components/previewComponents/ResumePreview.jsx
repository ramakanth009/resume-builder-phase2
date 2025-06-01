import React, { useMemo } from "react";
import { Box, Typography, Chip, Link, Divider } from "@mui/material";
import makeStylesWithTheme from "../../styles/makeStylesAdapter";

// Import styles from separate files
import useClassicStyles from "../../styles/previewStyles/classicStyles";
import useModernStyles from "../../styles/previewStyles/modernStyles";
import useCreativeStyles from "../../styles/previewStyles/creativeStyles";
import useExecutiveStyles from "../../styles/previewStyles/executiveStyles";
import useProfessionalStyles from "../../styles/previewStyles/professionalStyles";

// Base styles for all templates with responsive design
const useBaseStyles = makeStylesWithTheme((theme) => ({
  resumeContainer: {
    padding: "2rem",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    minHeight: "842px", // A4 height scaled down
    width: "100%",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden", // Prevents text overflow
    fontFamily: "Helvetica, Arial, sans-serif", // Consistent font family for PDF generation
    '@media (max-width: 1200px)': {
      padding: "1.8rem",
      minHeight: "800px",
    },
    '@media (max-width: 960px)': {
      padding: "1.5rem",
      minHeight: "auto", // Remove fixed height on mobile
    },
    '@media (max-width: 600px)': {
      padding: "1.2rem",
      borderRadius: "6px",
    },
    '@media (max-width: 480px)': {
      padding: "1rem",
      borderRadius: "4px",
    },
    '@media (max-width: 375px)': {
      padding: "0.8rem",
      borderRadius: "4px",
    },
  },
  generatedNotice: {
    marginTop: "2rem",
    textAlign: "center",
    color: "#718096",
    fontSize: "0.875rem",
    '@media (max-width: 960px)': {
      marginTop: "1.5rem",
      fontSize: "0.8rem",
    },
    '@media (max-width: 600px)': {
      marginTop: "1.2rem",
      fontSize: "0.75rem",
    },
    '@media (max-width: 480px)': {
      marginTop: "1rem",
      fontSize: "0.7rem",
    },
    '@media (max-width: 375px)': {
      marginTop: "0.8rem",
      fontSize: "0.65rem",
    },
  },
}));

const ResumePreview = ({ userData, generatedData, templateId = "classic" }) => {
  const baseClasses = useBaseStyles();
  const classicClasses = useClassicStyles();
  const modernClasses = useModernStyles();
  const creativeClasses = useCreativeStyles();
  const executiveClasses = useExecutiveStyles();
  const professionalClasses = useProfessionalStyles();

  // Select the appropriate styles based on template
  const getTemplateClasses = () => {
    switch (templateId) {
      case "modern":
        return modernClasses;
      case "creative":
        return creativeClasses;
      case "executive":
        return executiveClasses;
      case "professional":
        return professionalClasses;
      case "classic":
      default:
        return classicClasses;
    }
  };

  const classes = getTemplateClasses();

  // Use generated data if available, otherwise use user data
  const data = generatedData || userData;

  // Helper functions
  const hasEducationData = () => {
    if (Array.isArray(data.education)) {
      return (
        data.education.length > 0 &&
        data.education.some(
          (edu) =>
            (edu.degree && edu.degree.trim() !== "") ||
            (edu.institution && edu.institution.trim() !== "") ||
            (edu.specialization && edu.specialization.trim() !== "")
        )
      );
    }

    return (
      data.education &&
      ((data.education.degree && data.education.degree.trim() !== "") ||
        (data.education.institution &&
          data.education.institution.trim() !== "") ||
        (data.education.specialization &&
          data.education.specialization.trim() !== ""))
    );
  };

  const hasProjectsData = () => {
    return (
      data.projects &&
      data.projects.length > 0 &&
      data.projects.some((p) => p.name && p.name.trim() !== "")
    );
  };

  const hasWorkExperienceData = () => {
    const userWorkExp =
      data.work_experience &&
      data.work_experience.length > 0 &&
      data.work_experience.some(
        (exp) =>
          (exp.position && exp.position.trim() !== "") ||
          (exp.company_name && exp.company_name.trim() !== "")
      );

    const generatedWorkExp =
      data.workExperience &&
      data.workExperience.length > 0 &&
      data.workExperience.some(
        (exp) =>
          (exp.position && exp.position.trim() !== "") ||
          (exp.companyName && exp.companyName.trim() !== "")
      );

    return userWorkExp || generatedWorkExp;
  };

  // Updated helper function to check if AI tools data exists (both formats)
  const hasAIToolsData = () => {
    return (
      (data.genai_tools && data.genai_tools.length > 0) ||
      (data.aiExperience && data.aiExperience.length > 0)
    );
  };

  // Updated helper function to check if AI Experience/Usage data exists
  const hasAIExperienceData = () => {
    // Check aiExperience format
    const hasAiExpData = data.aiExperience &&
      data.aiExperience.length > 0 &&
      data.aiExperience.some(
        (aiExp) =>
          aiExp.toolName &&
          (aiExp.impact || (aiExp.usageCases && aiExp.usageCases.length > 0))
      );

    // Check genai_tools format
    const hasGenAiData = data.genai_tools &&
      data.genai_tools.length > 0 &&
      data.genai_tools.some(
        (tool) =>
          tool.name &&
          (tool.description || (tool.usage_descriptions && tool.usage_descriptions.length > 0))
      );

    return hasAiExpData || hasGenAiData;
  };

  const renderLink = (label, url, type) => {
    if (!url) return null;

    let href = url;

    if (type === "email") {
      href = `mailto:${url}`;
      return (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.contactLink}
          sx={{ 
            wordBreak: "break-word",
            '@media (max-width: 480px)': {
              fontSize: '0.8rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '0.75rem',
            },
          }}
        >
          {url}
        </Link>
      );
    }

    if (href && !href.startsWith("http")) {
      href = `https://${href}`;
    }

    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.contactLink}
        sx={{
          '@media (max-width: 480px)': {
            fontSize: '0.8rem',
          },
          '@media (max-width: 375px)': {
            fontSize: '0.75rem',
          },
        }}
      >
        {label}
      </Link>
    );
  };

  // Helper function to format certification display
  const formatCertification = (cert) => {
    if (typeof cert === "string") {
      return cert;
    }

    if (typeof cert === "object" && cert.name) {
      let displayText = cert.name;

      if (cert.issuer && cert.issuer.trim() !== "") {
        displayText += ` | ${cert.issuer}`;
      }

      return displayText;
    }

    return JSON.stringify(cert);
  };

  // Helper function to format AI tool display
  const formatAITool = (tool) => {
    if (!tool) return "";

    // Get the tool name - now stored directly in the tool object
    let displayText = tool.name || `AI Tool ${tool.tool_id || "Unknown"}`;

    return displayText;
  };

  return (
    <Box className={`${baseClasses.resumeContainer} resume-container`}>
      {/* Header Section */}
      <Box className={classes.resumeHeader} sx={{
        '@media (max-width: 960px)': {
          marginBottom: '1.5rem',
        },
        '@media (max-width: 600px)': {
          marginBottom: '1.2rem',
        },
        '@media (max-width: 480px)': {
          marginBottom: '1rem',
        },
        '@media (max-width: 375px)': {
          marginBottom: '0.8rem',
        },
      }}>
        <Typography
          variant="h4"
          className={`${classes.resumeName} resume-name`}
          sx={{
            '@media (max-width: 1200px)': {
              fontSize: '2rem',
            },
            '@media (max-width: 960px)': {
              fontSize: '1.8rem',
            },
            '@media (max-width: 600px)': {
              fontSize: '1.6rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '1.4rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '1.2rem',
            },
          }}
        >
          {data.header.name || "Your Name"}
        </Typography>

        <Box className={classes.resumeContact} sx={{
          '@media (max-width: 960px)': {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          },
          '@media (max-width: 600px)': {
            gap: '0.4rem',
          },
          '@media (max-width: 480px)': {
            gap: '0.3rem',
          },
        }}>
          {data.header.email && (
            <Typography variant="body2" className={classes.resumeContactItem} sx={{
              '@media (max-width: 600px)': {
                fontSize: '0.8rem',
              },
              '@media (max-width: 480px)': {
                fontSize: '0.75rem',
              },
              '@media (max-width: 375px)': {
                fontSize: '0.7rem',
              },
            }}>
              Email: {renderLink(null, data.header.email, "email")}
            </Typography>
          )}

          {data.header.phone && (
            <Typography variant="body2" className={classes.resumeContactItem} sx={{
              '@media (max-width: 600px)': {
                fontSize: '0.8rem',
              },
              '@media (max-width: 480px)': {
                fontSize: '0.75rem',
              },
              '@media (max-width: 375px)': {
                fontSize: '0.7rem',
              },
            }}>
              Phone: {data.header.phone}
            </Typography>
          )}

          {data.header.github && (
            <Typography variant="body2" className={classes.resumeContactItem} sx={{
              '@media (max-width: 600px)': {
                fontSize: '0.8rem',
              },
              '@media (max-width: 480px)': {
                fontSize: '0.75rem',
              },
              '@media (max-width: 375px)': {
                fontSize: '0.7rem',
              },
            }}>
              {renderLink("GitHub", data.header.github, "github")}
            </Typography>
          )}

          {data.header.linkedin && (
            <Typography variant="body2" className={classes.resumeContactItem} sx={{
              '@media (max-width: 600px)': {
                fontSize: '0.8rem',
              },
              '@media (max-width: 480px)': {
                fontSize: '0.75rem',
              },
              '@media (max-width: 375px)': {
                fontSize: '0.7rem',
              },
            }}>
              {renderLink("LinkedIn", data.header.linkedin, "linkedin")}
            </Typography>
          )}

          {data.header.portfolio && (
            <Typography variant="body2" className={classes.resumeContactItem} sx={{
              '@media (max-width: 600px)': {
                fontSize: '0.8rem',
              },
              '@media (max-width: 480px)': {
                fontSize: '0.75rem',
              },
              '@media (max-width: 375px)': {
                fontSize: '0.7rem',
              },
            }}>
              {renderLink("Portfolio", data.header.portfolio, "portfolio")}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Target Role */}
      {data.target_role && data.target_role.trim() !== "" && (
        <Box className={classes.resumeSection} textAlign="center" sx={{
          '@media (max-width: 960px)': {
            marginBottom: '1.5rem',
          },
          '@media (max-width: 600px)': {
            marginBottom: '1.2rem',
          },
          '@media (max-width: 480px)': {
            marginBottom: '1rem',
          },
        }}>
          <Typography variant="body1" fontWeight="medium" sx={{
            '@media (max-width: 600px)': {
              fontSize: '0.9rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.85rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '0.8rem',
            },
          }}>
            Target Role: {data.target_role}
          </Typography>
        </Box>
      )}

      {/* Summary Section */}
      {data.summary && data.summary.trim() !== "" && (
        <Box className={classes.resumeSection} sx={{
          '@media (max-width: 960px)': {
            marginBottom: '1.5rem',
          },
          '@media (max-width: 600px)': {
            marginBottom: '1.2rem',
          },
          '@media (max-width: 480px)': {
            marginBottom: '1rem',
          },
        }}>
          <Typography variant="h6" className={classes.resumeSectionTitle} sx={{
            '@media (max-width: 960px)': {
              fontSize: '1.1rem',
            },
            '@media (max-width: 600px)': {
              fontSize: '1rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.95rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '0.9rem',
            },
          }}>
            Professional Summary
          </Typography>
          <Typography variant="body2" className={classes.resumeSummary} sx={{
            '@media (max-width: 600px)': {
              fontSize: '0.85rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.8rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '0.75rem',
            },
          }}>
            {data.summary}
          </Typography>
        </Box>
      )}

      {/* Skills Section */}
      {data.skills &&
        data.skills.length > 0 &&
        data.skills.some((skill) => skill && skill.trim() !== "") && (
          <Box className={classes.resumeSection} sx={{
            '@media (max-width: 960px)': {
              marginBottom: '1.5rem',
            },
            '@media (max-width: 600px)': {
              marginBottom: '1.2rem',
            },
            '@media (max-width: 480px)': {
              marginBottom: '1rem',
            },
          }}>
            <Typography variant="h6" className={classes.resumeSectionTitle} sx={{
              '@media (max-width: 960px)': {
                fontSize: '1.1rem',
              },
              '@media (max-width: 600px)': {
                fontSize: '1rem',
              },
              '@media (max-width: 480px)': {
                fontSize: '0.95rem',
              },
              '@media (max-width: 375px)': {
                fontSize: '0.9rem',
              },
            }}>
              Skills
            </Typography>
            <Box className={classes.resumeSkills} sx={{
              '@media (max-width: 600px)': {
                gap: '0.4rem',
              },
              '@media (max-width: 480px)': {
                gap: '0.3rem',
              },
            }}>
              {data.skills
                .filter((skill) => skill && skill.trim() !== "")
                .map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    className={classes.resumeSkillChip}
                    sx={{
                      '@media (max-width: 600px)': {
                        fontSize: '0.65rem',
                        height: '22px',
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '0.6rem',
                        height: '20px',
                      },
                      '@media (max-width: 375px)': {
                        fontSize: '0.55rem',
                        height: '18px',
                      },
                    }}
                  />
                ))}
            </Box>
          </Box>
        )}

      {/* AI Tools & Technologies Section */}
      {hasAIToolsData() && (
        <Box className={classes.resumeSection} sx={{
          '@media (max-width: 960px)': {
            marginBottom: '1.5rem',
          },
          '@media (max-width: 600px)': {
            marginBottom: '1.2rem',
          },
          '@media (max-width: 480px)': {
            marginBottom: '1rem',
          },
        }}>
          <Typography variant="h6" className={classes.resumeSectionTitle} sx={{
            '@media (max-width: 960px)': {
              fontSize: '1.1rem',
            },
            '@media (max-width: 600px)': {
              fontSize: '1rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.95rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '0.9rem',
            },
          }}>
            AI Tools & Technologies
          </Typography>

          {/* Display genai_tools format */}
          {data.genai_tools && data.genai_tools.length > 0 && (
            <Box className={classes.resumeSkills} sx={{
              '@media (max-width: 600px)': {
                gap: '0.4rem',
              },
              '@media (max-width: 480px)': {
                gap: '0.3rem',
              },
            }}>
              {data.genai_tools.map((tool, index) => (
                <Chip
                  key={index}
                  label={formatAITool(tool)}
                  size="small"
                  className={classes.resumeSkillChip}
                  sx={{
                    backgroundColor: "#e6f3ff",
                    color: "#1565c0",
                    fontWeight: 500,
                    '@media (max-width: 600px)': {
                      fontSize: '0.65rem',
                      height: '22px',
                    },
                    '@media (max-width: 480px)': {
                      fontSize: '0.6rem',
                      height: '20px',
                    },
                    '@media (max-width: 375px)': {
                      fontSize: '0.55rem',
                      height: '18px',
                    },
                  }}
                />
              ))}
            </Box>
          )}
          {/* Display aiExperience format as chips */}
          {data.aiExperience &&
            data.aiExperience.length > 0 &&
            !data.genai_tools && (
              <Box className={classes.resumeSkills} sx={{
                '@media (max-width: 600px)': {
                  gap: '0.4rem',
                },
                '@media (max-width: 480px)': {
                  gap: '0.3rem',
                },
              }}>
                {data.aiExperience.map((aiExp, index) => (
                  <Chip
                    key={index}
                    label={aiExp.toolName}
                    size="small"
                    className={classes.resumeSkillChip}
                    sx={{
                      backgroundColor: "#e6f3ff",
                      color: "#1565c0",
                      fontWeight: 500,
                      '@media (max-width: 600px)': {
                        fontSize: '0.65rem',
                        height: '22px',
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '0.6rem',
                        height: '20px',
                      },
                      '@media (max-width: 375px)': {
                        fontSize: '0.55rem',
                        height: '18px',
                      },
                    }}
                  />
                ))}
              </Box>
            )}
        </Box>
      )}

      {/* AI Tools Experience Section - Shows detailed usage */}
      {hasAIExperienceData() && (
        <Box className={classes.resumeSection} sx={{
          '@media (max-width: 960px)': {
            marginBottom: '1.5rem',
          },
          '@media (max-width: 600px)': {
            marginBottom: '1.2rem',
          },
          '@media (max-width: 480px)': {
            marginBottom: '1rem',
          },
        }}>
          <Typography variant="h6" className={classes.resumeSectionTitle} sx={{
            '@media (max-width: 960px)': {
              fontSize: '1.1rem',
            },
            '@media (max-width: 600px)': {
              fontSize: '1rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.95rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '0.9rem',
            },
          }}>
            AI Tools Experience
          </Typography>
          
          {/* Render aiExperience format */}
          {data.aiExperience && data.aiExperience.length > 0 && 
           data.aiExperience.some(aiExp => aiExp.usageCases && aiExp.usageCases.length > 0) && (
            <>
              {data.aiExperience.map((aiExp, index) => (
                <Box key={`ai-exp-${index}`} className={classes.resumeItem} sx={{
                  '@media (max-width: 960px)': {
                    marginBottom: '1.2rem',
                  },
                  '@media (max-width: 600px)': {
                    marginBottom: '1rem',
                  },
                  '@media (max-width: 480px)': {
                    marginBottom: '0.8rem',
                  },
                }}>
                  <Typography variant="subtitle1" className={classes.resumeSubtitle} sx={{
                    '@media (max-width: 600px)': {
                      fontSize: '0.95rem',
                    },
                    '@media (max-width: 480px)': {
                      fontSize: '0.9rem',
                    },
                    '@media (max-width: 375px)': {
                      fontSize: '0.85rem',
                    },
                  }}>
                    {aiExp.toolName}
                  </Typography>
                  
                  {aiExp.impact && (
                    <Typography variant="body2" className={classes.resumeItemSubtitle} sx={{
                      '@media (max-width: 600px)': {
                        fontSize: '0.8rem',
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '0.75rem',
                      },
                      '@media (max-width: 375px)': {
                        fontSize: '0.7rem',
                      },
                    }}>
                      {aiExp.impact}
                    </Typography>
                  )}
                  
                  {aiExp.usageCases && aiExp.usageCases.length > 0 && (
                    <Box component="ul" className={classes.resumeBullets} sx={{
                      '@media (max-width: 600px)': {
                        paddingLeft: '1rem',
                        marginTop: '0.4rem',
                        marginBottom: '0.4rem',
                      },
                      '@media (max-width: 480px)': {
                        paddingLeft: '0.8rem',
                        marginTop: '0.3rem',
                        marginBottom: '0.3rem',
                      },
                    }}>
                      {aiExp.usageCases.map((useCase, idx) => (
                        <li key={idx} className={classes.resumeBullet} style={{
                          fontSize: window.innerWidth <= 600 ? '0.75rem' : 
                                   window.innerWidth <= 480 ? '0.7rem' : 
                                   window.innerWidth <= 375 ? '0.65rem' : undefined,
                          marginBottom: window.innerWidth <= 480 ? '0.3rem' : undefined,
                        }}>
                          {useCase}
                        </li>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </>
          )}
          
          {/* Render genai_tools format */}
          {data.genai_tools && data.genai_tools.length > 0 && 
           data.genai_tools.some(tool => tool.usage_descriptions && tool.usage_descriptions.length > 0) && (
            <>
              {data.genai_tools.map((tool, index) => (
                <Box key={`genai-tool-${index}`} className={classes.resumeItem} sx={{
                  '@media (max-width: 960px)': {
                    marginBottom: '1.2rem',
                  },
                  '@media (max-width: 600px)': {
                    marginBottom: '1rem',
                  },
                  '@media (max-width: 480px)': {
                    marginBottom: '0.8rem',
                  },
                }}>
                  <Typography variant="subtitle1" className={classes.resumeSubtitle} sx={{
                    '@media (max-width: 600px)': {
                      fontSize: '0.95rem',
                    },
                    '@media (max-width: 480px)': {
                      fontSize: '0.9rem',
                    },
                    '@media (max-width: 375px)': {
                      fontSize: '0.85rem',
                    },
                  }}>
                    {tool.name}
                  </Typography>
                  
                  {tool.description && (
                    <Typography variant="body2" className={classes.resumeItemSubtitle} sx={{
                      '@media (max-width: 600px)': {
                        fontSize: '0.8rem',
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '0.75rem',
                      },
                      '@media (max-width: 375px)': {
                        fontSize: '0.7rem',
                      },
                    }}>
                      {tool.description}
                    </Typography>
                  )}
                  
                  {tool.usage_descriptions && tool.usage_descriptions.length > 0 && (
                    <Box component="ul" className={classes.resumeBullets} sx={{
                      '@media (max-width: 600px)': {
                        paddingLeft: '1rem',
                        marginTop: '0.4rem',
                        marginBottom: '0.4rem',
                      },
                      '@media (max-width: 480px)': {
                        paddingLeft: '0.8rem',
                        marginTop: '0.3rem',
                        marginBottom: '0.3rem',
                      },
                    }}>
                      {tool.usage_descriptions.map((usage, idx) => (
                        <li key={idx} className={classes.resumeBullet} style={{
                          fontSize: window.innerWidth <= 600 ? '0.75rem' : 
                                   window.innerWidth <= 480 ? '0.7rem' : 
                                   window.innerWidth <= 375 ? '0.65rem' : undefined,
                          marginBottom: window.innerWidth <= 480 ? '0.3rem' : undefined,
                        }}>
                          {usage}
                        </li>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </>
          )}
        </Box>
      )}

      {/* Education Section */}
      {hasEducationData() && (
        <Box className={classes.resumeSection} sx={{
          '@media (max-width: 960px)': {
            marginBottom: '1.5rem',
          },
          '@media (max-width: 600px)': {
            marginBottom: '1.2rem',
          },
          '@media (max-width: 480px)': {
            marginBottom: '1rem',
          },
        }}>
          <Typography variant="h6" className={classes.resumeSectionTitle} sx={{
            '@media (max-width: 960px)': {
              fontSize: '1.1rem',
            },
            '@media (max-width: 600px)': {
              fontSize: '1rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.95rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '0.9rem',
            },
          }}>
            Education
          </Typography>
          {Array.isArray(data.education) ? (
            data.education.map((edu, index) => (
              <Box key={index} className={classes.resumeEducation} sx={{
                '@media (max-width: 960px)': {
                  marginBottom: '1.2rem',
                },
                '@media (max-width: 600px)': {
                  marginBottom: '1rem',
                },
                '@media (max-width: 480px)': {
                  marginBottom: '0.8rem',
                },
              }}>
                <Typography
                  variant="subtitle1"
                  className={classes.resumeSubtitle}
                  sx={{
                    '@media (max-width: 600px)': {
                      fontSize: '0.95rem',
                    },
                    '@media (max-width: 480px)': {
                      fontSize: '0.9rem',
                    },
                    '@media (max-width: 375px)': {
                      fontSize: '0.85rem',
                    },
                  }}
                >
                  {edu.degree || ""}
                  {edu.specialization ? ` in ${edu.specialization}` : ""}
                </Typography>
                <Typography variant="body2" sx={{
                  '@media (max-width: 600px)': {
                    fontSize: '0.8rem',
                  },
                  '@media (max-width: 480px)': {
                    fontSize: '0.75rem',
                  },
                  '@media (max-width: 375px)': {
                    fontSize: '0.7rem',
                  },
                }}>{edu.institution || ""}</Typography>
                {(edu.graduation_year || edu.graduationYear) && (
                  <Typography variant="body2" className={classes.resumeDate} sx={{
                    '@media (max-width: 600px)': {
                      fontSize: '0.75rem',
                    },
                    '@media (max-width: 480px)': {
                      fontSize: '0.7rem',
                    },
                    '@media (max-width: 375px)': {
                      fontSize: '0.65rem',
                    },
                  }}>
                    Graduated: {edu.graduation_year || edu.graduationYear}
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <Box className={classes.resumeEducation} sx={{
              '@media (max-width: 960px)': {
                marginBottom: '1.2rem',
              },
              '@media (max-width: 600px)': {
                marginBottom: '1rem',
              },
              '@media (max-width: 480px)': {
                marginBottom: '0.8rem',
              },
            }}>
              <Typography
                variant="subtitle1"
                className={classes.resumeSubtitle}
                sx={{
                  '@media (max-width: 600px)': {
                    fontSize: '0.95rem',
                  },
                  '@media (max-width: 480px)': {
                    fontSize: '0.9rem',
                  },
                  '@media (max-width: 375px)': {
                    fontSize: '0.85rem',
                  },
                }}
              >
                {data.education.degree || ""}
                {data.education.specialization
                  ? ` in ${data.education.specialization}`
                  : ""}
              </Typography>
              <Typography variant="body2" sx={{
                '@media (max-width: 600px)': {
                  fontSize: '0.8rem',
                },
                '@media (max-width: 480px)': {
                  fontSize: '0.75rem',
                },
                '@media (max-width: 375px)': {
                  fontSize: '0.7rem',
                },
              }}>
                {data.education.institution || ""}
              </Typography>
              {data.education.graduation_year && (
                <Typography variant="body2" className={classes.resumeDate} sx={{
                  '@media (max-width: 600px)': {
                    fontSize: '0.75rem',
                  },
                  '@media (max-width: 480px)': {
                    fontSize: '0.7rem',
                  },
                  '@media (max-width: 375px)': {
                    fontSize: '0.65rem',
                  },
                }}>
                  Graduated: {data.education.graduation_year}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}

      {/* Work Experience Section */}
      {hasWorkExperienceData() && (
        <Box className={classes.resumeSection} sx={{
          '@media (max-width: 960px)': {
            marginBottom: '1.5rem',
          },
          '@media (max-width: 600px)': {
            marginBottom: '1.2rem',
          },
          '@media (max-width: 480px)': {
            marginBottom: '1rem',
          },
        }}>
          <Typography variant="h6" className={classes.resumeSectionTitle} sx={{
            '@media (max-width: 960px)': {
              fontSize: '1.1rem',
            },
            '@media (max-width: 600px)': {
              fontSize: '1rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.95rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '0.9rem',
            },
          }}>
            Work Experience
          </Typography>

          {data.work_experience && data.work_experience.length > 0
            ? data.work_experience
                .filter(
                  (exp) =>
                    (exp.position && exp.position.trim() !== "") ||
                    (exp.company_name && exp.company_name.trim() !== "")
                )
                .map((experience, index) => (
                  <Box key={`work-${index}`} className={classes.resumeItem} sx={{
                    '@media (max-width: 960px)': {
                      marginBottom: '1.2rem',
                    },
                    '@media (max-width: 600px)': {
                      marginBottom: '1rem',
                    },
                    '@media (max-width: 480px)': {
                      marginBottom: '0.8rem',
                    },
                  }}>
                    <Typography
                      variant="subtitle1"
                      className={classes.resumeSubtitle}
                      sx={{
                        '@media (max-width: 600px)': {
                          fontSize: '0.95rem',
                        },
                        '@media (max-width: 480px)': {
                          fontSize: '0.9rem',
                        },
                        '@media (max-width: 375px)': {
                          fontSize: '0.85rem',
                        },
                      }}
                    >
                      {experience.position || "Position"}
                      {experience.company_name
                        ? ` | ${experience.company_name}`
                        : ""}
                    </Typography>
                    {experience.duration &&
                      experience.duration.trim() !== "" && (
                        <Typography
                          variant="body2"
                          className={classes.resumeDate}
                          sx={{
                            '@media (max-width: 600px)': {
                              fontSize: '0.75rem',
                            },
                            '@media (max-width: 480px)': {
                              fontSize: '0.7rem',
                            },
                            '@media (max-width: 375px)': {
                              fontSize: '0.65rem',
                            },
                          }}
                        >
                          {experience.duration}
                        </Typography>
                      )}
                    {experience.responsibilities &&
                      experience.responsibilities.length > 0 &&
                      experience.responsibilities.some(
                        (r) => r && r.trim() !== ""
                      ) && (
                        <Box component="ul" className={classes.resumeBullets} sx={{
                          '@media (max-width: 600px)': {
                            paddingLeft: '1rem',
                            marginTop: '0.4rem',
                            marginBottom: '0.4rem',
                          },
                          '@media (max-width: 480px)': {
                            paddingLeft: '0.8rem',
                            marginTop: '0.3rem',
                            marginBottom: '0.3rem',
                          },
                        }}>
                          {experience.responsibilities
                            .filter((r) => r && r.trim() !== "")
                            .map((responsibility, idx) => (
                              <li key={idx} className={classes.resumeBullet} style={{
                                fontSize: window.innerWidth <= 600 ? '0.75rem' : 
                                         window.innerWidth <= 480 ? '0.7rem' : 
                                         window.innerWidth <= 375 ? '0.65rem' : undefined,
                                marginBottom: window.innerWidth <= 480 ? '0.3rem' : undefined,
                              }}>
                                {responsibility}
                              </li>
                            ))}
                        </Box>
                      )}
                  </Box>
                ))
            : data.workExperience && data.workExperience.length > 0
            ? data.workExperience
                .filter(
                  (exp) =>
                    (exp.position && exp.position.trim() !== "") ||
                    (exp.companyName && exp.companyName.trim() !== "")
                )
                .map((experience, index) => (
                  <Box key={`workExp-${index}`} className={classes.resumeItem} sx={{
                    '@media (max-width: 960px)': {
                      marginBottom: '1.2rem',
                    },
                    '@media (max-width: 600px)': {
                      marginBottom: '1rem',
                    },
                    '@media (max-width: 480px)': {
                      marginBottom: '0.8rem',
                    },
                  }}>
                    <Typography
                      variant="subtitle1"
                      className={classes.resumeSubtitle}
                      sx={{
                        '@media (max-width: 600px)': {
                          fontSize: '0.95rem',
                        },
                        '@media (max-width: 480px)': {
                          fontSize: '0.9rem',
                        },
                        '@media (max-width: 375px)': {
                          fontSize: '0.85rem',
                        },
                      }}
                    >
                      {experience.position || "Position"}
                      {experience.companyName
                        ? ` | ${experience.companyName}`
                        : ""}
                    </Typography>
                    {experience.duration &&
                      experience.duration.trim() !== "" && (
                        <Typography
                          variant="body2"
                          className={classes.resumeDate}
                          sx={{
                            '@media (max-width: 600px)': {
                              fontSize: '0.75rem',
                            },
                            '@media (max-width: 480px)': {
                              fontSize: '0.7rem',
                            },
                            '@media (max-width: 375px)': {
                              fontSize: '0.65rem',
                            },
                          }}
                        >
                          {experience.duration}
                        </Typography>
                      )}
                    {experience.responsibilities &&
                      experience.responsibilities.length > 0 && (
                        <Box component="ul" className={classes.resumeBullets} sx={{
                          '@media (max-width: 600px)': {
                            paddingLeft: '1rem',
                            marginTop: '0.4rem',
                            marginBottom: '0.4rem',
                          },
                          '@media (max-width: 480px)': {
                            paddingLeft: '0.8rem',
                            marginTop: '0.3rem',
                            marginBottom: '0.3rem',
                          },
                        }}>
                          {experience.responsibilities.map(
                            (responsibility, idx) => (
                              <li key={idx} className={classes.resumeBullet} style={{
                                fontSize: window.innerWidth <= 600 ? '0.75rem' : 
                                         window.innerWidth <= 480 ? '0.7rem' : 
                                         window.innerWidth <= 375 ? '0.65rem' : undefined,
                                marginBottom: window.innerWidth <= 480 ? '0.3rem' : undefined,
                              }}>
                                {responsibility}
                              </li>
                            )
                          )}
                        </Box>
                      )}
                  </Box>
                ))
            : null}
        </Box>
      )}

      {/* Projects Section */}
      {hasProjectsData() && (
        <Box className={classes.resumeSection} sx={{
          '@media (max-width: 960px)': {
            marginBottom: '1.5rem',
          },
          '@media (max-width: 600px)': {
            marginBottom: '1.2rem',
          },
          '@media (max-width: 480px)': {
            marginBottom: '1rem',
          },
        }}>
          <Typography variant="h6" className={classes.resumeSectionTitle} sx={{
            '@media (max-width: 960px)': {
              fontSize: '1.1rem',
            },
            '@media (max-width: 600px)': {
              fontSize: '1rem',
            },
            '@media (max-width: 480px)': {
              fontSize: '0.95rem',
            },
            '@media (max-width: 375px)': {
              fontSize: '0.9rem',
            },
          }}>
            Projects
          </Typography>

          {data.projects &&
            data.projects.length > 0 &&
            data.projects
              .filter((p) => p.name && p.name.trim() !== "")
              .map((project, index) => (
                <Box key={`project-${index}`} className={classes.resumeItem} sx={{
                  '@media (max-width: 960px)': {
                    marginBottom: '1.2rem',
                  },
                  '@media (max-width: 600px)': {
                    marginBottom: '1rem',
                  },
                  '@media (max-width: 480px)': {
                    marginBottom: '0.8rem',
                  },
                }}>
                  <Typography
                    variant="subtitle1"
                    className={classes.resumeSubtitle}
                    sx={{
                      '@media (max-width: 600px)': {
                        fontSize: '0.95rem',
                      },
                      '@media (max-width: 480px)': {
                        fontSize: '0.9rem',
                      },
                      '@media (max-width: 375px)': {
                        fontSize: '0.85rem',
                      },
                    }}
                  >
                    {project.name || "Project Name"}
                    {project.link && project.link.trim() !== "" && (
                      <Box component="span" ml={1}>
                        <Link
                          href={
                            project.link.startsWith("http")
                              ? project.link
                              : `https://${project.link}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className={classes.contactLink}
                          sx={{
                            '@media (max-width: 480px)': {
                              fontSize: '0.8rem',
                            },
                            '@media (max-width: 375px)': {
                              fontSize: '0.75rem',
                            },
                          }}
                        >
                          View Project
                        </Link>
                      </Box>
                    )}
                  </Typography>
                  {project.skills_used && project.skills_used.trim() !== "" && (
                    <Typography
                      variant="body2"
                      className={classes.resumeItemSubtitle}
                      sx={{
                        '@media (max-width: 600px)': {
                          fontSize: '0.8rem',
                        },
                        '@media (max-width: 480px)': {
                          fontSize: '0.75rem',
                        },
                        '@media (max-width: 375px)': {
                          fontSize: '0.7rem',
                        },
                      }}
                    >
                      Skills: {project.skills_used}
                    </Typography>
                  )}
                  {project.responsibilities &&
                    project.responsibilities.length > 0 && (
                      <Box component="ul" className={classes.resumeBullets} sx={{
                        '@media (max-width: 600px)': {
                          paddingLeft: '1rem',
                          marginTop: '0.4rem',
                          marginBottom: '0.4rem',
                        },
                        '@media (max-width: 480px)': {
                          paddingLeft: '0.8rem',
                          marginTop: '0.3rem',
                          marginBottom: '0.3rem',
                        },
                      }}>
                        {project.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className={classes.resumeBullet} style={{
                            fontSize: window.innerWidth <= 600 ? '0.75rem' : 
                                     window.innerWidth <= 480 ? '0.7rem' : 
                                     window.innerWidth <= 375 ? '0.65rem' : undefined,
                            marginBottom: window.innerWidth <= 480 ? '0.3rem' : undefined,
                          }}>
                            {responsibility}
                          </li>
                        ))}
                      </Box>
                    )}
                </Box>
              ))}
        </Box>
      )}

      {/* Certifications Section */}
      {data.certifications &&
        data.certifications.length > 0 &&
        data.certifications.some(
          (cert) =>
            (typeof cert === "string" && cert.trim() !== "") ||
            (typeof cert === "object" && cert.name && cert.name.trim() !== "")
        ) && (
          <Box className={classes.resumeSection} sx={{
            '@media (max-width: 960px)': {
              marginBottom: '1.5rem',
            },
            '@media (max-width: 600px)': {
              marginBottom: '1.2rem',
            },
            '@media (max-width: 480px)': {
              marginBottom: '1rem',
            },
          }}>
            <Typography variant="h6" className={classes.resumeSectionTitle} sx={{
              '@media (max-width: 960px)': {
                fontSize: '1.1rem',
              },
              '@media (max-width: 600px)': {
                fontSize: '1rem',
              },
              '@media (max-width: 480px)': {
                fontSize: '0.95rem',
              },
              '@media (max-width: 375px)': {
                fontSize: '0.9rem',
              },
            }}>
              Certifications
            </Typography>
            <Box component="ul" className={classes.resumeBullets} sx={{
              '@media (max-width: 600px)': {
                paddingLeft: '1rem',
                marginTop: '0.4rem',
                marginBottom: '0.4rem',
              },
              '@media (max-width: 480px)': {
                paddingLeft: '0.8rem',
                marginTop: '0.3rem',
                marginBottom: '0.3rem',
              },
            }}>
              {data.certifications
                .filter(
                  (cert) =>
                    (typeof cert === "string" && cert.trim() !== "") ||
                    (typeof cert === "object" &&
                      cert.name &&
                      cert.name.trim() !== "")
                )
                .map((cert, index) => (
                  <li key={index} className={classes.resumeBullet} style={{
                    fontSize: window.innerWidth <= 600 ? '0.75rem' : 
                             window.innerWidth <= 480 ? '0.7rem' : 
                             window.innerWidth <= 375 ? '0.65rem' : undefined,
                    marginBottom: window.innerWidth <= 480 ? '0.3rem' : undefined,
                  }}>
                    {formatCertification(cert)}
                    {typeof cert === "object" &&
                      cert.url &&
                      cert.url.trim() !== "" && (
                        <Box component="span" ml={1}>
                          <Link
                            href={
                              cert.url.startsWith("http")
                                ? cert.url
                                : `https://${cert.url}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.contactLink}
                            sx={{
                              '@media (max-width: 480px)': {
                                fontSize: '0.7rem',
                              },
                              '@media (max-width: 375px)': {
                                fontSize: '0.65rem',
                              },
                            }}
                          >
                            View
                          </Link>
                        </Box>
                      )}
                  </li>
                ))}
            </Box>
          </Box>
        )}

      {/* Custom Sections */}
      {data.customSections &&
        Object.keys(data.customSections).length > 0 &&
        Object.entries(data.customSections)
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
            <Box key={sectionName} className={classes.resumeSection} sx={{
              '@media (max-width: 960px)': {
                marginBottom: '1.5rem',
              },
              '@media (max-width: 600px)': {
                marginBottom: '1.2rem',
              },
              '@media (max-width: 480px)': {
                marginBottom: '1rem',
              },
            }}>
              <Typography variant="h6" className={classes.resumeSectionTitle} sx={{
                '@media (max-width: 960px)': {
                  fontSize: '1.1rem',
                },
                '@media (max-width: 600px)': {
                  fontSize: '1rem',
                },
                '@media (max-width: 480px)': {
                  fontSize: '0.95rem',
                },
                '@media (max-width: 375px)': {
                  fontSize: '0.9rem',
                },
              }}>
                {sectionName.replace(/_/g, " ")}
              </Typography>

              {Array.isArray(content) ? (
                <Box component="ul" className={classes.resumeBullets} sx={{
                  '@media (max-width: 600px)': {
                    paddingLeft: '1rem',
                    marginTop: '0.4rem',
                    marginBottom: '0.4rem',
                  },
                  '@media (max-width: 480px)': {
                    paddingLeft: '0.8rem',
                    marginTop: '0.3rem',
                    marginBottom: '0.3rem',
                  },
                }}>
                  {content
                    .filter((item) => item && item.trim() !== "")
                    .map((item, index) => (
                      <li key={index} className={classes.resumeBullet} style={{
                        fontSize: window.innerWidth <= 600 ? '0.75rem' : 
                                 window.innerWidth <= 480 ? '0.7rem' : 
                                 window.innerWidth <= 375 ? '0.65rem' : undefined,
                        marginBottom: window.innerWidth <= 480 ? '0.3rem' : undefined,
                      }}>
                        {item}
                      </li>
                    ))}
                </Box>
              ) : (
                <Typography variant="body2" sx={{
                  '@media (max-width: 600px)': {
                    fontSize: '0.8rem',
                  },
                  '@media (max-width: 480px)': {
                    fontSize: '0.75rem',
                  },
                  '@media (max-width: 375px)': {
                    fontSize: '0.7rem',
                  },
                }}>{content}</Typography>
              )}
            </Box>
          ))}

      {/* Generated Resume Notice */}
      {generatedData && (
        <Box className={baseClasses.generatedNotice}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="textSecondary">
            AI-enhanced resume generated successfully
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ResumePreview;