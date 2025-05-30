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
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },
  toolCard: {
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
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
    marginTop: '0.5rem',
  },
  usageOption: {
    fontSize: '0.85rem',
    color: '#2d3748',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f1f5f9',
  },
  proficiencyButtons: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  proficiencyButton: {
    flex: 1,
    textTransform: 'none',
    borderRadius: '6px',
  },
  selectedProficiency: {
    backgroundColor: '#3182ce',
    color: 'white',
  },
  summaryContainer: {
    padding: '1.5rem',
    backgroundColor: '#f7fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginTop: '1.5rem',
  },
  selectionChip: {
    backgroundColor: '#4299e1',
    color: 'white',
    fontWeight: 500,
    margin: '0.25rem',
  },
  applyButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 600,
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    marginTop: '1.5rem',
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  saveButton: {
    backgroundColor: '#38a169',
    color: 'white',
    fontWeight: 600,
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: '#2f855a',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    gap: '1rem',
  },
  accordionDetails: {
    paddingTop: 0,
  }
}));

const AISkillsSection = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [selectedTools, setSelectedTools] = useState([]);
  const [toolUsages, setToolUsages] = useState({});
  const [saving, setSaving] = useState(false);
  
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
      resumeData.genai_tools.forEach(tool => {
        if (tool.usage_descriptions) {
          usages[tool.tool_id] = tool.usage_descriptions;
        }
      });
      setToolUsages(usages);
    }
  }, [resumeData.genai_tools]);

  // Toggle tool selection
  const handleToggleTool = (tool) => {
    const isSelected = selectedTools.some(t => t.tool_id === tool.id);
    if (isSelected) {
      setSelectedTools(prev => prev.filter(t => t.tool_id !== tool.id));
      setToolUsages(prev => {
        const newUsages = { ...prev };
        delete newUsages[tool.id];
        return newUsages;
      });
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
    }
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

  // Apply selections to resume data
  const handleApplyToResume = () => {
    setResumeData(prev => ({
      ...prev,
      genai_tools: [...selectedTools]
    }));
  };

  // Save usage to backend
  const handleSaveUsage = async () => {
    if (!targetRole) return;
    
    setSaving(true);
    try {
      const usageData = {
        used_tools: selectedTools.map(tool => ({
          tool_id: tool.tool_id,
          usage_descriptions: toolUsages[tool.tool_id] || []
        })),
        not_used_tools: genaiTools
          .filter(tool => !isToolSelected(tool.id))
          .map(tool => tool.id)
      };
      
      await saveGenAIToolUsage(targetRole, usageData);
      
      // Also update resume data with usage info
      const updatedTools = selectedTools.map(tool => ({
        ...tool,
        usage_descriptions: toolUsages[tool.tool_id] || []
      }));
      
      setResumeData(prev => ({
        ...prev,
        genai_tools: updatedTools,
        genai_skills: {
          used_tools: usageData.used_tools
        }
      }));
      
    } catch (error) {
      console.error('Error saving GenAI usage:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!targetRole) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        Please specify a target role in the Personal Information section to get AI tool recommendations.
      </Alert>
    );
  }

  return (
    <Box>
      <Paper className={classes.container} elevation={0}>
        {/* Header */}
        <Box className={classes.header}>
          <SmartToyIcon className={classes.headerIcon} />
          <Typography variant="h5" className={classes.headerText}>
            AI Tools & Skills
          </Typography>
        </Box>
        
        {/* Info box */}
        <Box className={classes.infoBox}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ color: '#3182ce', mr: 1 }} />
            <Typography variant="body1">
              Select AI tools you've used for <strong>{targetRole}</strong> and describe how you used them.
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
          <Box className={classes.toolsGrid}>
            {genaiTools.map((tool) => {
              const isSelected = isToolSelected(tool.id);
              
              return (
                <Card 
                  key={tool.id}
                  className={`${classes.toolCard} ${isSelected ? classes.selectedCard : ''}`}
                  elevation={0}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleToggleTool(tool)}
                            color="primary"
                          />
                        }
                        label=""
                        sx={{ mr: 1 }}
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
                          <Accordion sx={{ mt: 2 }} elevation={0}>
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
                                      onChange={(e) => handleUsageOptionChange(tool.id, option, e.target.checked)}
                                      size="small"
                                    />
                                  }
                                  label={
                                    <Typography variant="body2" className={classes.usageOption}>
                                      {option}
                                    </Typography>
                                  }
                                  sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}
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
        ) : (
          <Typography variant="body1" align="center" sx={{ py: 4 }}>
            No AI tool recommendations available for this role.
          </Typography>
        )}

        {/* Selected Tools Summary */}
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LightbulbIcon sx={{ color: '#3182ce', mr: 1 }} />
          Selected AI Tools ({selectedTools.length})
        </Typography>
        
        <Box className={classes.summaryContainer}>
          {selectedTools.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
              {selectedTools.map((tool) => (
                <Chip
                  key={tool.tool_id}
                  label={tool.name}
                  className={classes.selectionChip}
                  onDelete={() => setSelectedTools(prev => prev.filter(t => t.tool_id !== tool.tool_id))}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body1" align="center" sx={{ py: 2 }}>
              No AI tools selected yet.
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              className={classes.applyButton}
              variant="contained"
              onClick={handleApplyToResume}
              disabled={selectedTools.length === 0}
              fullWidth
            >
              Apply to Resume
            </Button>
            <Button
              className={classes.saveButton}
              variant="contained"
              onClick={handleSaveUsage}
              disabled={selectedTools.length === 0 || saving}
            >
              {saving ? <CircularProgress size={20} color="inherit" /> : 'Save Usage'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AISkillsSection;