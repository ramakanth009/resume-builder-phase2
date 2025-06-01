import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Paper,
  Alert,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getGenAITools, saveGenAIToolUsage } from '../../utils/api';
import { useApiData } from '../../hooks/useApiData';

const useStyles = makeStylesWithTheme((theme) => ({
  container: {
    padding: '1rem',
    background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    '@media (max-width: 1200px)': {
      padding: '0.9rem',
    },
    '@media (max-width: 960px)': {
      padding: '0.8rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.7rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.6rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.5rem',
    },
  },
  formSubtitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#27286c',
    position: 'relative',
    marginBottom: '1rem',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '40px',
      height: '2px',
      background: 'linear-gradient(90deg, #14b8a6, #a78bfa)',
    },
    '@media (max-width: 1200px)': {
      fontSize: '1.4rem',
      marginBottom: '0.9rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.3rem',
      marginBottom: '0.8rem',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
      marginBottom: '0.7rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
      marginBottom: '0.6rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem',
      marginBottom: '0.5rem',
    },
  },
  formDescription: {
    marginBottom: '24px',
    color: '#666',
    fontSize: '1rem',
    '@media (max-width: 1200px)': {
      marginBottom: '22px',
      fontSize: '0.95rem',
    },
    '@media (max-width: 960px)': {
      marginBottom: '20px',
      fontSize: '0.9rem',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      marginBottom: '18px',
      fontSize: '0.85rem',
    },
    '@media (max-width: 480px)': {
      marginBottom: '16px',
      fontSize: '0.8rem',
    },
    '@media (max-width: 375px)': {
      marginBottom: '14px',
      fontSize: '0.75rem',
    },
  },
  infoBox: {
    padding: '1rem',
    backgroundColor: 'rgba(49, 130, 206, 0.08)',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '1px solid rgba(49, 130, 206, 0.2)',
    '@media (max-width: 1200px)': {
      padding: '0.9rem',
      marginBottom: '1.3rem',
    },
    '@media (max-width: 960px)': {
      padding: '0.8rem',
      marginBottom: '1.2rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.7rem',
      marginBottom: '1rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.6rem',
      marginBottom: '0.8rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.5rem',
      marginBottom: '0.7rem',
    },
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '0.9rem',
      marginTop: '0.9rem',
    },
    '@media (max-width: 960px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '0.8rem',
      marginTop: '0.8rem',
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
      gap: '0.7rem',
      marginTop: '0.7rem',
    },
    '@media (max-width: 480px)': {
      gap: '0.6rem',
      marginTop: '0.6rem',
    },
    '@media (max-width: 375px)': {
      gap: '0.5rem',
      marginTop: '0.5rem',
    },
  },
  toolCard: {
    transition: 'all 0.2s ease',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    position: 'relative',
    backgroundColor: '#E9EBED',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#cbd5e0',
      backgroundColor: '#f8fafc',
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 32px rgba(39, 40, 108, 0.16)',
      border: '1px solid #27286C',
    },
    '@media (max-width: 960px)': {
      '&:hover': {
        transform: 'translateY(-2px)',
      },
    },
    '@media (max-width: 600px)': {
      '&:hover': {
        transform: 'none',
      },
    },
  },
  selectedCard: {
    borderColor: '#3182ce',
    borderWidth: '2px',
    backgroundColor: '#ebf8ff',
  },
  toolName: {
    fontWeight: 600,
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '1.1rem',
    '@media (max-width: 1200px)': {
      fontSize: '1.05rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.95rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.85rem',
    },
  },
  toolDescription: {
    color: '#4a5568',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    '@media (max-width: 1200px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.65rem',
    },
  },
  usageOption: {
    fontSize: '0.85rem',
    color: '#2d3748',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f1f5f9',
    '@media (max-width: 1200px)': {
      fontSize: '0.8rem',
      padding: '0.45rem 0',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.75rem',
      padding: '0.4rem 0',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.7rem',
      padding: '0.35rem 0',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.65rem',
      padding: '0.3rem 0',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.6rem',
      padding: '0.25rem 0',
    },
  },
  summaryContainer: {
    padding: '1.5rem',
    backgroundColor: '#f7fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginTop: '1.5rem',
    '@media (max-width: 1200px)': {
      padding: '1.3rem',
      marginTop: '1.3rem',
    },
    '@media (max-width: 960px)': {
      padding: '1.2rem',
      marginTop: '1.2rem',
    },
    '@media (max-width: 600px)': {
      padding: '1rem',
      marginTop: '1rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.8rem',
      marginTop: '0.8rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.7rem',
      marginTop: '0.7rem',
    },
  },
  selectionChip: {
    backgroundColor: '#4299e1',
    color: 'white',
    fontWeight: 500,
    margin: '0.25rem',
    fontSize: '0.875rem',
    '@media (max-width: 1200px)': {
      fontSize: '0.85rem',
      margin: '0.2rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
      margin: '0.15rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.7rem',
      margin: '0.1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.65rem',
      margin: '0.08rem',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    gap: '1rem',
    '@media (max-width: 1200px)': {
      padding: '1.8rem',
      gap: '0.9rem',
    },
    '@media (max-width: 960px)': {
      padding: '1.5rem',
      gap: '0.8rem',
    },
    '@media (max-width: 600px)': {
      padding: '1.2rem',
      gap: '0.7rem',
    },
    '@media (max-width: 480px)': {
      padding: '1rem',
      gap: '0.6rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.8rem',
      gap: '0.5rem',
    },
  },
  accordionDetails: {
    paddingTop: 0,
  },
  cardContent: {
    padding: '1.5rem',
    '@media (max-width: 1200px)': {
      padding: '1.3rem',
    },
    '@media (max-width: 960px)': {
      padding: '1.2rem',
    },
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.8rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.7rem',
    },
  },
  mainApplyButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 600,
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    marginTop: '1.5rem',
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
    '&:disabled': {
      backgroundColor: '#a0aec0',
    },
    '@media (max-width: 1200px)': {
      padding: '0.7rem 1.8rem',
      fontSize: '0.95rem',
      marginTop: '1.3rem',
    },
    '@media (max-width: 960px)': {
      padding: '0.65rem 1.6rem',
      fontSize: '0.9rem',
      marginTop: '1.2rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.6rem 1.4rem',
      fontSize: '0.85rem',
      marginTop: '1rem',
      width: '100%',
    },
    '@media (max-width: 480px)': {
      padding: '0.55rem 1.2rem',
      fontSize: '0.8rem',
      marginTop: '0.8rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.5rem 1rem',
      fontSize: '0.75rem',
      marginTop: '0.7rem',
    },
  },
  applyButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.5rem',
    '@media (max-width: 1200px)': {
      marginTop: '1.3rem',
    },
    '@media (max-width: 960px)': {
      marginTop: '1.2rem',
    },
    '@media (max-width: 600px)': {
      marginTop: '1rem',
    },
    '@media (max-width: 480px)': {
      marginTop: '0.8rem',
    },
    '@media (max-width: 375px)': {
      marginTop: '0.7rem',
    },
  },
  emptyStateContainer: {
    textAlign: 'center',
    padding: '2rem',
    color: '#718096',
    '@media (max-width: 1200px)': {
      padding: '1.8rem',
    },
    '@media (max-width: 960px)': {
      padding: '1.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '1.2rem',
    },
    '@media (max-width: 480px)': {
      padding: '1rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.8rem',
    },
  },
}));

const AISkillsSection = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [selectedTools, setSelectedTools] = useState([]);
  const [toolUsages, setToolUsages] = useState({});
  const [expandedAccordions, setExpandedAccordions] = useState({});
  const [applyingTools, setApplyingTools] = useState(false);
  
  // Fetch GenAI tools
  const { 
    data: genaiResponse,
    loading,
    error
  } = useApiData(getGenAITools, targetRole, {
    enabled: !!targetRole,
    cacheKey: `genaiTools_${targetRole}`,
    cacheTime: 60 * 60 * 1000,
  });
  
  const genaiTools = genaiResponse?.genai_tools || [];
  
  // Initialize from existing resume data
  useEffect(() => {
    if (resumeData.genai_tools && resumeData.genai_tools.length > 0) {
      setSelectedTools(resumeData.genai_tools);
      // Initialize tool usages from existing data
      const usages = {};
      const expanded = {};
      resumeData.genai_tools.forEach(tool => {
        if (tool.usage_descriptions) {
          usages[tool.tool_id] = tool.usage_descriptions;
        }
        expanded[tool.tool_id] = true; // Expand accordions for existing tools
      });
      setToolUsages(usages);
      setExpandedAccordions(expanded);
    }
  }, [resumeData.genai_tools]);

  // Toggle tool selection and auto-expand accordion
  const handleToggleTool = (tool) => {
    const isSelected = selectedTools.some(t => t.tool_id === tool.id);
    if (isSelected) {
      setSelectedTools(prev => prev.filter(t => t.tool_id !== tool.id));
      setToolUsages(prev => {
        const newUsages = { ...prev };
        delete newUsages[tool.id];
        return newUsages;
      });
      setExpandedAccordions(prev => ({
        ...prev,
        [tool.id]: false
      }));
    } else {
      setSelectedTools(prev => [...prev, { 
        tool_id: tool.id,
        name: tool.name,
        description: tool.description
      }]);
      setToolUsages(prev => ({
        ...prev,
        [tool.id]: []
      }));
      // Auto-expand accordion when tool is selected
      setExpandedAccordions(prev => ({
        ...prev,
        [tool.id]: true
      }));
    }
  };

  // Handle accordion expansion
  const handleAccordionChange = (toolId) => (event, isExpanded) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [toolId]: isExpanded
    }));
  };

  // Handle usage option selection
  const handleUsageOptionChange = (toolId, usageOption, checked) => {
    setToolUsages(prev => ({
      ...prev,
      [toolId]: checked 
        ? [...(prev[toolId] || []), usageOption]
        : (prev[toolId] || []).filter(option => option !== usageOption)
    }));
  };

  // Check if tool is selected
  const isToolSelected = (toolId) => {
    return selectedTools.some(t => t.tool_id === toolId);
  };

  // Apply all selected tools to resume
  const handleApplyAllToolsToResume = async () => {
    if (selectedTools.length === 0) return;
    
    setApplyingTools(true);
    
    try {
      const toolsWithUsage = selectedTools.map(tool => ({
        ...tool,
        usage_descriptions: toolUsages[tool.tool_id] || []
      }));

      // Update resume data with all selected tools
      setResumeData(prev => ({
        ...prev,
        genai_tools: toolsWithUsage
      }));

      // Also save to backend if we have a target role
      if (targetRole) {
        const usageData = {
          used_tools: selectedTools.map(tool => ({
            tool_id: tool.tool_id,
            usage_descriptions: toolUsages[tool.tool_id] || []
          })),
          not_used_tools: []
        };
        
        try {
          await saveGenAIToolUsage(targetRole, usageData);
        } catch (error) {
          console.warn('Failed to save to backend:', error);
          // Continue anyway since we've updated the local state
        }
      }

    } catch (error) {
      console.error('Error adding tools to resume:', error);
    } finally {
      setApplyingTools(false);
    }
  };

  return (
    <Box>
      {/* Always visible header */}
      <Box>
        <Typography variant="h6" className={classes.formSubtitle}>
          AI Tools & Technologies
        </Typography>
        <Typography variant="subtitle1" className={classes.formDescription}>
          Highlight your AI proficiency
        </Typography>
      </Box>

      <Paper className={classes.container} elevation={0}>
        {!targetRole ? (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Please specify a target role in the Personal Information section to get AI tool recommendations.
          </Alert>
        ) : (
          <>
            {/* Info box */}
            <Box className={classes.infoBox}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon sx={{ color: '#3182ce', mr: 1 }} />
                <Typography variant="body1">
                  Select AI tools you've used for <strong>{targetRole}</strong>, describe how you used them, and click "Apply Selected Tools" to add them to your resume.
                </Typography>
              </Box>
            </Box>
            
            {/* Tools Grid */}
            {loading ? (
              <Box className={classes.loadingContainer}>
                <CircularProgress size={30} />
                <Typography variant="body1">Loading AI tool recommendations...</Typography>
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ my: 2 }}>
                {error}
              </Alert>
            ) : genaiTools.length > 0 ? (
              <>
                <Box className={classes.toolsGrid}>
                  {genaiTools.map((tool) => {
                    const isSelected = isToolSelected(tool.id);
                    const isExpanded = expandedAccordions[tool.id] || false;
                    
                    return (
                      <Card 
                        key={tool.id}
                        className={`${classes.toolCard} ${isSelected ? classes.selectedCard : ''}`}
                        elevation={0}
                        onClick={() => handleToggleTool(tool)}
                      >
                        <CardContent className={classes.cardContent}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isSelected}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    handleToggleTool(tool);
                                  }}
                                  color="primary"
                                />
                              }
                              label=""
                              sx={{ mr: 1 }}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <Typography variant="h6" className={classes.toolName} sx={{ flex: 1 }}>
                              {tool.name}
                            </Typography>
                            {isSelected && (
                              <CheckCircleIcon sx={{ color: '#38a169', ml: 1 }} />
                            )}
                          </Box>
                          
                          <Typography variant="body2" className={classes.toolDescription}>
                            {tool.description}
                          </Typography>
                          
                          {isSelected && (
                            <>
                              {/* Usage Options */}
                              {tool.usage_options && tool.usage_options.length > 0 && (
                                <Accordion 
                                  sx={{ mt: 2 }} 
                                  elevation={0}
                                  expanded={isExpanded}
                                  onChange={handleAccordionChange(tool.id)}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="body2" fontWeight={500}>
                                      How did you use this tool? ({(toolUsages[tool.id] || []).length} selected)
                                    </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails className={classes.accordionDetails}>
                                    {tool.usage_options.map((option, index) => (
                                      <FormControlLabel
                                        key={index}
                                        control={
                                          <Checkbox
                                            checked={(toolUsages[tool.id] || []).includes(option)}
                                            onChange={(e) => {
                                              e.stopPropagation();
                                              handleUsageOptionChange(tool.id, option, e.target.checked);
                                            }}
                                            size="small"
                                          />
                                        }
                                        label={
                                          <Typography variant="body2" className={classes.usageOption}>
                                            {option}
                                          </Typography>
                                        }
                                        sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}
                                        onClick={(e) => e.stopPropagation()}
                                      />
                                    ))}
                                  </AccordionDetails>
                                </Accordion>
                              )}
                            </>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </Box>

                {/* Single Apply Button */}
                {selectedTools.length > 0 && (
                  <Box className={classes.applyButtonContainer}>
                    <Button
                      className={classes.mainApplyButton}
                      onClick={handleApplyAllToolsToResume}
                      disabled={applyingTools}
                      startIcon={applyingTools ? <CircularProgress size={14} color="inherit" /> : <AddIcon />}
                      size="large"
                    >
                      {applyingTools ? 'Applying Tools...' : `Apply Selected Tools (${selectedTools.length})`}
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <Box className={classes.emptyStateContainer}>
                <Typography variant="body1">
                  No AI tool recommendations available for this role.
                </Typography>
              </Box>
            )}

            {/* Selected Tools Summary */}
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LightbulbIcon sx={{ color: '#3182ce', mr: 1 }} />
              Applied AI Tools ({(resumeData.genai_tools || []).length})
            </Typography>
            
            <Box className={classes.summaryContainer}>
              {(resumeData.genai_tools || []).length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                  {(resumeData.genai_tools || []).map((tool) => (
                    <Chip
                      key={tool.tool_id}
                      label={`${tool.name} (${(tool.usage_descriptions || []).length} skills)`}
                      className={classes.selectionChip}
                      onDelete={() => {
                        // Remove from resume data
                        setResumeData(prev => ({
                          ...prev,
                          genai_tools: prev.genai_tools.filter(t => t.tool_id !== tool.tool_id)
                        }));
                        // Also remove from selected tools
                        setSelectedTools(prev => prev.filter(t => t.tool_id !== tool.tool_id));
                      }}
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" align="center" sx={{ py: 2 }}>
                  No AI tools applied to resume yet. Select tools above and click "Apply Selected Tools" to add them.
                </Typography>
              )}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default AISkillsSection;