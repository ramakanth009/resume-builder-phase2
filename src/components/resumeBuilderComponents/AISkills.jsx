import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Divider,
  Paper,
  Alert,
  Grid,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getSkillRecommendations, apiRequest } from '../../utils/api';
import { useApiData } from '../../hooks/useApiData';

const useStyles = makeStylesWithTheme((theme) => ({
  container: {
    padding: '1rem',
    background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  headerIcon: {
    fontSize: '2rem',
    color: '#3182ce',
    marginRight: '1rem',
  },
  headerText: {
    color: '#2d3748',
    fontWeight: 600,
  },
  infoBox: {
    padding: '1rem',
    backgroundColor: 'rgba(49, 130, 206, 0.08)',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '1px solid rgba(49, 130, 206, 0.2)',
  },
  infoIcon: {
    color: '#3182ce',
    marginRight: '0.75rem',
  },
  toolsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  toolCard: {
    height: '100%',
    position: 'relative',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    '&:hover': {
      borderColor: '#cbd5e0',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
  },
  selectedCard: {
    borderColor: '#3182ce',
    borderWidth: '2px',
    backgroundColor: '#ebf8ff',
  },
  cardContent: {
    padding: '1.25rem',
  },
  toolName: {
    fontWeight: 600,
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolDescription: {
    color: '#4a5568',
    fontSize: '0.9rem',
    marginTop: '0.75rem',
  },
  checkIcon: {
    color: '#38a169',
    transition: 'transform 0.2s ease',
    '&.selected': {
      transform: 'scale(1.2)',
    }
  },
  toolIcon: {
    color: '#3182ce',
    marginRight: '0.5rem',
  },
  proficiencySelector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1.25rem',
    backgroundColor: 'rgba(49, 130, 206, 0.08)',
  },
  proficiencyChip: {
    transition: 'all 0.2s ease',
  },
  selectedChip: {
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 500,
  },
  divider: {
    margin: '1.5rem 0',
  },
  sectionTitle: {
    fontWeight: 600,
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  summaryContainer: {
    padding: '1.5rem',
    backgroundColor: '#f7fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginTop: '1.5rem',
  },
  selectionCount: {
    display: 'inline-block',
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.875rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    marginLeft: '0.75rem',
  },
  selectionChip: {
    backgroundColor: '#4299e1',
    color: 'white',
    fontWeight: 500,
    margin: '0.35rem',
  },
  applyButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 600,
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    marginTop: '1.5rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#2b6cb0',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(49, 130, 206, 0.3)',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    gap: '1rem',
  },
  noRoleAlert: {
    marginBottom: '1.5rem',
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
    color: '#718096',
  }
}));

// API function for GenAI tools
const getGenAITools = async (role) => {
  return await apiRequest(`/genai_tools/${encodeURIComponent(role)}`);
};

const AISkills = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [selectedTools, setSelectedTools] = useState([]);
  const [showGenAI, setShowGenAI] = useState(true);
  
  // API calls for GenAI tools
  const { 
    data: genaiResponse,
    loading: genaiLoading,
    error: genaiError
  } = useApiData(getGenAITools, targetRole, {
    enabled: !!targetRole && showGenAI,
    cacheKey: `genaiTools_${targetRole}`,
    cacheTime: 60 * 60 * 1000,
  });
  
  const genaiTools = genaiResponse?.tools || [];
  
  // Initialize from existing resume data
  useEffect(() => {
    if (resumeData.genai_tools && resumeData.genai_tools.length > 0) {
      setSelectedTools(resumeData.genai_tools);
    }
  }, [resumeData.genai_tools]);

  // Toggle GenAI tool selection
  const handleToggleTool = (tool) => {
    const isSelected = selectedTools.some(t => t.tool_id === tool.id);
    if (isSelected) {
      setSelectedTools(prev => prev.filter(t => t.tool_id !== tool.id));
    } else {
      setSelectedTools(prev => [...prev, { 
        tool_id: tool.id,
        name: tool.name, // Store the tool name
        description: tool.description, // Store description too
        proficiency: 'intermediate' // default proficiency
      }]);
    }
  };

  // Update tool proficiency
  const handleUpdateProficiency = (toolId, proficiency, event) => {
    event.stopPropagation(); // Prevent card click
    setSelectedTools(prev => prev.map(tool => 
      tool.tool_id === toolId ? { ...tool, proficiency } : tool
    ));
  };

  // Apply selections to resume data
  const handleApplyRecommendations = () => {
    setResumeData(prev => ({
      ...prev,
      genai_tools: [...selectedTools]
    }));
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

  // Get tool name by ID - now use stored name first
  const getToolName = (toolId) => {
    // First check if we have the name stored in selectedTools
    const selectedTool = selectedTools.find(t => t.tool_id === toolId);
    if (selectedTool && selectedTool.name) {
      return selectedTool.name;
    }
    
    // Fallback to looking up in genaiTools
    const tool = genaiTools.find(t => t.id === toolId);
    return tool?.name || 'Unknown Tool';
  };

  return (
    <Box>
      <Paper className={classes.container} elevation={0}>
        {/* Header */}
        <Box className={classes.header}>
          <SmartToyIcon className={classes.headerIcon} />
          <Typography variant="h5" className={classes.headerText}>
            AI Skills & Tools
          </Typography>
        </Box>
        
        {/* Info box */}
        <Box className={classes.infoBox}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon className={classes.infoIcon} />
            <Typography variant="body1">
              Enhance your resume with AI tools relevant to <strong>{targetRole || "your target role"}</strong>. 
              Select the tools you're proficient with to stand out to employers.
            </Typography>
          </Box>
        </Box>
        
        {/* Warning if no target role */}
        {!targetRole && (
          <Alert severity="warning" className={classes.noRoleAlert}>
            Please specify a target role in the Personal Information section to get personalized recommendations.
          </Alert>
        )}
        
        {/* Toggle controls */}
        <Box className={classes.toggleContainer}>
          <Typography variant="h6">AI Tools Recommendations</Typography>
          <FormControlLabel
            control={<Switch checked={showGenAI} onChange={(e) => setShowGenAI(e.target.checked)} />}
            label="Show Recommendations"
          />
        </Box>

        {/* GenAI Tools Grid */}
        {showGenAI && targetRole && (
          <>
            {genaiLoading ? (
              <Box className={classes.loadingContainer}>
                <CircularProgress size={30} />
                <Typography variant="body1">Loading AI tool recommendations...</Typography>
              </Box>
            ) : genaiError ? (
              <Alert severity="error" sx={{ my: 2 }}>
                {genaiError}
              </Alert>
            ) : genaiTools.length > 0 ? (
              <Box className={classes.toolsGrid}>
                {genaiTools.map((tool) => {
                  const isSelected = isToolSelected(tool.id);
                  const proficiency = getToolProficiency(tool.id);
                  
                  return (
                    <Box key={tool.id} sx={{ width: 'calc(50% - 0.5rem)', mb: 2, '@media (max-width: 600px)': { width: '100%' } }}>
                      <Card 
                        className={`${classes.toolCard} ${isSelected ? classes.selectedCard : ''}`}
                        onClick={() => handleToggleTool(tool)}
                        elevation={0}
                      >
                        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                          {isSelected && (
                            <CheckCircleIcon 
                              sx={{ 
                                color: '#38a169',
                                bgcolor: 'white',
                                borderRadius: '50%',
                                fontSize: '24px'
                              }}
                            />
                          )}
                        </Box>
                        <CardContent className={classes.cardContent}>
                          <Typography variant="h6" className={classes.toolName}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <SmartToyIcon className={classes.toolIcon} />
                              {tool.name}
                            </Box>
                          </Typography>
                          <Typography variant="body2" className={classes.toolDescription}>
                            {tool.description}
                          </Typography>
                          
                          {isSelected && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                                Proficiency:
                              </Typography>
                              
                              <Box sx={{ 
                                display: 'flex', 
                                width: '100%', 
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                overflow: 'hidden',
                                height: '32px'
                              }}>
                                {['beginner', 'intermediate', 'expert'].map((level) => {
                                  const isSelectedLevel = proficiency === level;
                                  
                                  return (
                                    <Box 
                                      key={level}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateProficiency(tool.id, level, e);
                                      }}
                                      sx={{ 
                                        flex: 1,
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        bgcolor: isSelectedLevel ? '#3182ce' : '#f7fafc',
                                        color: isSelectedLevel ? 'white' : '#4a5568',
                                        fontSize: '0.75rem',
                                        fontWeight: isSelectedLevel ? 600 : 500,
                                        transition: 'all 0.2s ease',
                                        textTransform: 'capitalize',
                                        borderRight: level !== 'expert' ? '1px solid #e2e8f0' : 'none',
                                        '&:hover': {
                                          bgcolor: isSelectedLevel ? '#3182ce' : '#edf2f7',
                                        }
                                      }}
                                    >
                                      {level.charAt(0).toUpperCase() + level.slice(1, 3)}
                                    </Box>
                                  );
                                })}
                              </Box>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Box className={classes.emptyState}>
                <Typography variant="body1">
                  No AI tool recommendations available for this role.
                </Typography>
              </Box>
            )}
          </>
        )}

        {/* Selected Tools Summary */}
        <Divider className={classes.divider} />
        
        <Typography variant="h6" className={classes.sectionTitle}>
          <LightbulbIcon className={classes.toolIcon} />
          Selected AI Tools
          <span className={classes.selectionCount}>{selectedTools.length}</span>
        </Typography>
        
        <Box className={classes.summaryContainer}>
          {selectedTools.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {selectedTools.map((tool) => (
                <Chip
                  key={tool.tool_id}
                  label={`${tool.name || getToolName(tool.tool_id)} (${tool.proficiency})`}
                  className={classes.selectionChip}
                  onDelete={() => setSelectedTools(prev => prev.filter(t => t.tool_id !== tool.tool_id))}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body1" align="center" sx={{ py: 2 }}>
              No AI tools selected yet. Choose from the recommendations above.
            </Typography>
          )}
          
          <Button
            className={classes.applyButton}
            variant="contained"
            fullWidth
            onClick={handleApplyRecommendations}
            disabled={selectedTools.length === 0}
          >
            Apply {selectedTools.length} AI Tools to Resume
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AISkills;