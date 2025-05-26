import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Button,
  Paper, 
  Alert, 
  CircularProgress,
  Divider,
  Fade,
  Tooltip
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getSkillRecommendations } from '../../utils/api';
import { useApiData } from '../../hooks/useApiData';

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formSubtitle: {
    fontWeight: 500,
    marginBottom: '0.75rem',
    marginTop: '1rem',
    color: '#4a5568',
  },
  skillsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sectionPaper: {
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    backgroundColor: '#fafafa',
    marginBottom: '1.5rem',
  },
  recommendationHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    color: '#2b6cb0',
  },
  headerIcon: {
    marginRight: '0.75rem',
    color: '#3182ce',
  },
  recommendationsContainer: {
    padding: '1rem',
    backgroundColor: '#f0f9ff',
    borderRadius: '8px',
    border: '1px solid #bee3f8',
    marginBottom: '1rem',
  },
  recommendationChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    fontSize: '0.85rem',
    margin: '0.35rem',
    '&:hover': {
      backgroundColor: '#bee3f8',
      transform: 'translateY(-2px)',
      transition: 'transform 0.2s ease',
      boxShadow: '0 2px 5px rgba(49, 130, 206, 0.2)',
    },
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  selectedChip: {
    backgroundColor: '#4299e1',
    color: 'white',
    fontSize: '0.85rem',
    margin: '0.35rem',
    '&:hover': {
      backgroundColor: '#3182ce',
    },
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    alignItems: 'center',
    gap: '1rem',
  },
  categoryTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
  },
  categoryIcon: {
    marginRight: '0.5rem',
    fontSize: '1.2rem',
    color: '#4a5568',
  },
  infoAlert: {
    marginBottom: '1.5rem',
  },
  addButton: {
    marginTop: '1rem',
    backgroundColor: '#3182ce',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  noRoleAlert: {
    backgroundColor: '#fffaf0',
    color: '#c05621',
    marginBottom: '1.5rem',
  },
  selectedSkillsBox: {
    padding: '1rem',
    backgroundColor: '#e6fffa',
    borderRadius: '8px',
    border: '1px solid #b2f5ea',
    marginTop: '1rem',
  },
  skillCategorySection: {
    marginBottom: '1.5rem',
  },
  skillCount: {
    backgroundColor: '#4299e1', 
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    marginLeft: '0.5rem',
  },
  skillLabel: {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#2d3748',
    marginLeft: '0.5rem',
  }
}));

// Skill categories for organization
const skillCategories = {
  technical: {
    title: "Technical Skills",
    icon: <AutoAwesomeIcon />,
    keywords: ['javascript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'express', 'mongodb', 'sql', 'html', 'css', 'git', 'docker', 'kubernetes', 'aws', 'azure', 'cloud', 'database', 'api', 'rest', 'graphql', 'redux', 'typescript', 'golang', 'php', 'ruby', 'c#', 'c++', '.net']
  },
  soft: {
    title: "Soft Skills",
    icon: <TipsAndUpdatesIcon />,
    keywords: ['communication', 'teamwork', 'leadership', 'problem-solving', 'time management', 'adaptability', 'collaboration', 'critical thinking', 'creativity', 'presentation', 'negotiation', 'decision making', 'conflict resolution', 'emotional intelligence', 'interpersonal']
  },
  tools: {
    title: "Tools & Platforms",
    icon: <LightbulbIcon />,
    keywords: ['figma', 'adobe', 'photoshop', 'illustrator', 'sketch', 'invision', 'jira', 'confluence', 'trello', 'asana', 'slack', 'github', 'gitlab', 'bitbucket', 'jenkins', 'travis', 'circleci', 'webpack', 'babel', 'vscode', 'intellij', 'eclipse']
  }
};

const AISkillRecommendationsSection = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [selectedSkills, setSelectedSkills] = useState([]);
  
  // Use custom hook for skill recommendations
  const { 
    data: recommendationsResponse,
    loading,
    error
  } = useApiData(getSkillRecommendations, targetRole, {
    enabled: !!targetRole,
    cacheKey: `skillRecommendations_${targetRole}`,
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
  
  // Extract recommended skills from the response
  const recommendedSkills = recommendationsResponse?.skills || [];
  
  // Initialize selected skills from existing resume data
  useEffect(() => {
    if (resumeData.skills && resumeData.skills.length > 0) {
      setSelectedSkills(resumeData.skills.filter(Boolean));
    }
  }, [resumeData.skills]);

  // Toggle skill selection
  const handleToggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  // Apply selected skills to resume data
  const handleApplySkills = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...selectedSkills]
    }));
  };

  // Categorize skills
  const categorizeSkills = (skills) => {
    const categorized = {
      technical: [],
      soft: [],
      tools: [],
      other: []
    };
    
    skills.forEach(skill => {
      const lowerSkill = skill.toLowerCase();
      let found = false;
      
      // Check each category
      for (const [category, details] of Object.entries(skillCategories)) {
        if (details.keywords.some(keyword => lowerSkill.includes(keyword))) {
          categorized[category].push(skill);
          found = true;
          break;
        }
      }
      
      // If not found in any category, add to "other"
      if (!found) {
        categorized.other.push(skill);
      }
    });
    
    return categorized;
  };

  // Get skills that are already selected
  const getSelectedCategories = () => {
    return categorizeSkills(selectedSkills);
  };

  // Get recommended skills that aren't already selected
  const getRecommendedCategories = () => {
    const unselectedSkills = recommendedSkills.filter(skill => 
      !selectedSkills.includes(skill)
    );
    return categorizeSkills(unselectedSkills);
  };

  const selectedCategories = getSelectedCategories();
  const recommendedCategories = getRecommendedCategories();

  return (
    <Box className={classes.form}>
      <Typography variant="h6" className={classes.formSubtitle}>
        AI Skill Recommendations
      </Typography>
      
      {!targetRole && (
        <Alert severity="warning" className={classes.noRoleAlert}>
          Please specify a target role in the Personal Information section to get personalized skill recommendations.
        </Alert>
      )}
      
      <Alert severity="info" className={classes.infoAlert}>
        Our AI analyzes top resumes for <strong>{targetRole || "your role"}</strong> and recommends the most relevant skills to include on your resume. Click on skills to select/deselect them.
      </Alert>
      
      {loading ? (
        <Box className={classes.loadingContainer}>
          <CircularProgress size={24} />
          <Typography variant="body2">
            Analyzing skills for {targetRole}...
          </Typography>
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      ) : (
        <Box className={classes.skillsContainer}>
          {/* Recommended Skills Section */}
          {targetRole && recommendedSkills.length > 0 && (
            <Paper className={classes.sectionPaper} elevation={0}>
              <Typography variant="h6" className={classes.recommendationHeader}>
                <AutoAwesomeIcon className={classes.headerIcon} />
                Recommended Skills for {targetRole}
              </Typography>
              
              {/* Render recommended skills by category */}
              {Object.entries(recommendedCategories).map(([category, skills]) => 
                skills.length > 0 && (
                  <Box key={category} className={classes.skillCategorySection}>
                    <Typography className={classes.categoryTitle}>
                      {skillCategories[category]?.icon || <LightbulbIcon className={classes.categoryIcon} />}
                      {skillCategories[category]?.title || "Other Skills"}
                      <span className={classes.skillCount}>{skills.length}</span>
                    </Typography>
                    <Box className={classes.chipContainer}>
                      {skills.map((skill, index) => (
                        <Tooltip title="Click to add this skill" key={index}>
                          <Chip
                            label={skill}
                            className={classes.recommendationChip}
                            onClick={() => handleToggleSkill(skill)}
                            icon={<AddCircleIcon />}
                          />
                        </Tooltip>
                      ))}
                    </Box>
                  </Box>
                )
              )}
            </Paper>
          )}
          
          {/* Selected Skills Section */}
          <Paper className={classes.selectedSkillsBox} elevation={0}>
            <Typography variant="h6" className={classes.categoryTitle}>
              <LightbulbIcon className={classes.categoryIcon} />
              Selected Skills <span className={classes.skillCount}>{selectedSkills.length}</span>
            </Typography>
            
            {selectedSkills.length > 0 ? (
              <Box>
                {/* Render selected skills by category */}
                {Object.entries(selectedCategories).map(([category, skills]) => 
                  skills.length > 0 && (
                    <Box key={category} className={classes.skillCategorySection}>
                      <Typography className={classes.skillLabel}>
                        {skillCategories[category]?.title || "Other Skills"}
                      </Typography>
                      <Box className={classes.chipContainer}>
                        {skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            className={classes.selectedChip}
                            onDelete={() => handleToggleSkill(skill)}
                          />
                        ))}
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            ) : (
              <Typography variant="body2" align="center" sx={{ my: 2 }}>
                No skills selected yet. Click on recommendations above to add skills.
              </Typography>
            )}
            
            <Button
              className={classes.addButton}
              variant="contained"
              fullWidth
              onClick={handleApplySkills}
              disabled={selectedSkills.length === 0}
            >
              Apply {selectedSkills.length} Skills to Resume
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default AISkillRecommendationsSection;