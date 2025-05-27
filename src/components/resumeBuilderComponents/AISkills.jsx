import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Button,
  Paper, 
  Alert, 
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getSkillRecommendations, apiRequest } from '../../utils/api';
import { useApiData } from '../../hooks/useApiData';

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formSubtitle: {
    fontWeight: 500,
    marginBottom: '0.75rem',
    marginTop: '1rem',
    color: '#4a5568',
  },
  sectionPaper: {
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    backgroundColor: '#fafafa',
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
  skillCount: {
    backgroundColor: '#4299e1', 
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    marginLeft: '0.5rem',
  },
  genaiToolCard: {
    margin: '0.5rem',
    border: '1px solid #e2e8f0',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transform: 'translateY(-2px)',
      transition: 'all 0.2s ease',
    },
  },
  selectedToolCard: {
    border: '2px solid #3182ce',
    backgroundColor: '#f0f9ff',
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },
  toolIcon: {
    color: '#3182ce',
    marginRight: '0.5rem',
  },
  sectionToggle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  }
}));

// API function for GenAI tools
const getGenAITools = async (role) => {
  return await apiRequest(`/genai_tools/${encodeURIComponent(role)}`);
};

const AISkills = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [showSkills, setShowSkills] = useState(true);
  const [showGenAI, setShowGenAI] = useState(true);
  
  // API calls for skills and GenAI tools
  const { 
    data: skillsResponse,
    loading: skillsLoading,
    error: skillsError
  } = useApiData(getSkillRecommendations, targetRole, {
    enabled: !!targetRole && showSkills,
    cacheKey: `skillRecommendations_${targetRole}`,
    cacheTime: 60 * 60 * 1000,
  });
  
  const { 
    data: genaiResponse,
    loading: genaiLoading,
    error: genaiError
  } = useApiData(getGenAITools, targetRole, {
    enabled: !!targetRole && showGenAI,
    cacheKey: `genaiTools_${targetRole}`,
    cacheTime: 60 * 60 * 1000,
  });
  
  const recommendedSkills = skillsResponse?.skills || [];
  const genaiTools = genaiResponse?.tools || [];
  
  // Initialize from existing resume data
  useEffect(() => {
    if (resumeData.skills && resumeData.skills.length > 0) {
      setSelectedSkills(resumeData.skills.filter(Boolean));
    }
    if (resumeData.genai_tools && resumeData.genai_tools.length > 0) {
      setSelectedTools(resumeData.genai_tools);
    }
  }, [resumeData.skills, resumeData.genai_tools]);

  // Toggle skill selection
  const handleToggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  // Toggle GenAI tool selection
  const handleToggleTool = (tool) => {
    const isSelected = selectedTools.some(t => t.tool_id === tool.id);
    if (isSelected) {
      setSelectedTools(prev => prev.filter(t => t.tool_id !== tool.id));
    } else {
      setSelectedTools(prev => [...prev, { 
        tool_id: tool.id, 
        proficiency: 'intermediate' // default proficiency
      }]);
    }
  };

  // Update tool proficiency
  const handleUpdateProficiency = (toolId, proficiency) => {
    setSelectedTools(prev => prev.map(tool => 
      tool.tool_id === toolId ? { ...tool, proficiency } : tool
    ));
  };

  // Apply selections to resume data
  const handleApplyRecommendations = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...selectedSkills],
      genai_tools: [...selectedTools]
    }));
  };

  // Get unselected skills
  const getUnselectedSkills = () => {
    return recommendedSkills.filter(skill => !selectedSkills.includes(skill));
  };

  // Check if tool is selected
  const isToolSelected = (toolId) => {
    return selectedTools.some(t => t.tool_id === toolId);
  };

  // Get tool proficiency
  const getToolProficiency = (toolId) => {
    const tool = selectedTools.find(t => t.tool_id === toolId);
    return tool?.proficiency || 'intermediate';
  };

  return (
    <Box className={classes.form}>
      <Typography variant="h6" className={classes.formSubtitle}>
        AI Recommendations
      </Typography>
      
      {!targetRole && (
        <Alert severity="warning" className={classes.noRoleAlert}>
          Please specify a target role in the Personal Information section to get personalized recommendations.
        </Alert>
      )}
      
      <Alert severity="info" className={classes.infoAlert}>
        Our AI analyzes top resumes for <strong>{targetRole || "your role"}</strong> and recommends relevant GenAI tools to enhance your profile.
      </Alert>

      <Box className={classes.sectionToggle}>
        <Typography variant="h6">Customize Recommendations</Typography>
        <Box>
          <FormControlLabel
            control={<Switch checked={showGenAI} onChange={(e) => setShowGenAI(e.target.checked)} />}
            label="GenAI Tools"
          />
        </Box>
      </Box>
      
      {/* GenAI Tools Recommendations */}
      {showGenAI && targetRole && (
        <Paper className={classes.sectionPaper} elevation={0}>
          <Typography variant="h6" className={classes.recommendationHeader}>
            <SmartToyIcon className={classes.headerIcon} />
            Recommended GenAI Tools for {targetRole}
          </Typography>
          
          {genaiLoading ? (
            <Box className={classes.loadingContainer}>
              <CircularProgress size={24} />
              <Typography variant="body2">Loading GenAI tools...</Typography>
            </Box>
          ) : genaiError ? (
            <Alert severity="error">{genaiError}</Alert>
          ) : (
            <Box className={classes.toolsGrid}>
              {genaiTools.map((tool) => (
                <Card 
                  key={tool.id} 
                  className={`${classes.genaiToolCard} ${isToolSelected(tool.id) ? classes.selectedToolCard : ''}`}
                  onClick={() => handleToggleTool(tool)}
                >
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                      <SmartToyIcon className={classes.toolIcon} />
                      {tool.name}
                      {isToolSelected(tool.id) && <CheckCircleIcon sx={{ ml: 'auto', color: '#3182ce' }} />}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tool.description}
                    </Typography>
                  </CardContent>
                  {isToolSelected(tool.id) && (
                    <CardActions>
                      <Typography variant="caption">Proficiency:</Typography>
                      {['beginner', 'intermediate', 'expert'].map((level) => (
                        <Chip
                          key={level}
                          label={level}
                          size="small"
                          variant={getToolProficiency(tool.id) === level ? "filled" : "outlined"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateProficiency(tool.id, level);
                          }}
                          sx={{ ml: 0.5 }}
                        />
                      ))}
                    </CardActions>
                  )}
                </Card>
              ))}
            </Box>
          )}
        </Paper>
      )}
      
      {/* Selected Items Summary */}
      <Paper className={classes.selectedSkillsBox} elevation={0}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LightbulbIcon sx={{ mr: 1 }} />
          Your Selections
          <span className={classes.skillCount}>
            {selectedTools.length}
          </span>
        </Typography>
        
        {selectedTools.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>GenAI Tools ({selectedTools.length})</Typography>
            <Box className={classes.chipContainer}>
              {selectedTools.map((tool) => {
                const toolData = genaiTools.find(t => t.id === tool.tool_id);
                return (
                  <Chip
                    key={tool.tool_id}
                    label={`${toolData?.name} (${tool.proficiency})`}
                    className={classes.selectedChip}
                    onDelete={() => handleToggleTool(toolData)}
                  />
                );
              })}
            </Box>
          </Box>
        )}
        
        {selectedTools.length === 0 && (
          <Typography variant="body2" align="center" sx={{ my: 2 }}>
            No items selected yet. Choose from recommendations above.
          </Typography>
        )}
        
        <Button
          className={classes.addButton}
          variant="contained"
          fullWidth
          onClick={handleApplyRecommendations}
          disabled={selectedTools.length === 0}
        >
          Apply {selectedTools.length} Recommendations to Resume
        </Button>
      </Paper>
    </Box>
  );
};

export default AISkills;