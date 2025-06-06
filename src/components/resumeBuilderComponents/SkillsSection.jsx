import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Chip, 
  InputAdornment, 
  IconButton, 
  Alert, 
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getSkillRecommendations } from '../../utils/api';
import { useApiData } from '../../hooks/useApiData';

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
    marginBottom: '0.5rem',
  },
  formSubtitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#27286c',
    // marginBottom: '1.5rem',
    position: 'relative',
    // paddingBottom: '0.5rem',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '40px',
      height: '2px',
      background: 'linear-gradient(90deg, #14b8a6, #a78bfa)',
    },
  },
  formDescription: {
    marginBottom: '24px',
    color: '#666',
    fontSize: '1rem'
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '1rem',
  },
  chip: {
    background: 'rgb(39, 40, 108)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: 500,
    boxShadow: '0 2px 8px rgba(39, 40, 108, 0.2)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '& .MuiChip-deleteIcon': {
      color: 'white',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(39, 40, 108, 0.3)',
      '& .MuiChip-deleteIcon': {
        color: 'white',
      },
    },
  },
  recommendationsContainer: {
    marginTop: '0.5rem',
    marginBottom: '1.5rem',
  },
  recommendationChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    fontSize: '0.75rem',
    margin: '0.25rem',
    '&:hover': {
      backgroundColor: '#bee3f8',
    },
    cursor: 'pointer',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem',
  },
  recommendationsLabel: {
    fontSize: '0.85rem',
    color: '#718096',
    fontStyle: 'italic',
    marginBottom: '0.5rem',
  },
  selectedSkillsLabel: {
    fontSize: '0.9rem',
    color: '#4a5568',
    fontWeight: 500,
    marginBottom: '0.5rem',
    marginTop: '1rem',
  }
}));

const SkillsSection = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [newSkill, setNewSkill] = useState('');
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  
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
  const originalRecommendations = recommendationsResponse?.skills || [];
  
  // Update filtered recommendations when original recommendations change or when selected skills change
  useEffect(() => {
    if (originalRecommendations.length > 0) {
      const userSkills = new Set(resumeData.skills.filter(Boolean));
      const filtered = originalRecommendations.filter(skill => !userSkills.has(skill));
      setFilteredRecommendations(filtered);
    }
  }, [originalRecommendations, resumeData.skills]);

  // Skills handlers
  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills.filter(Boolean), newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value.trim() !== '') {
        action();
      }
    }
  };

  // Add handler for recommended skills
  const handleAddRecommendedSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills.filter(Boolean), skill],
      }));
    }
  };

  return (
    <Box className={classes.form}>
      <Box>
        <Typography variant="h6" className={classes.formSubtitle}>
          Skills & Expertise
        </Typography>
        <Typography variant="subtitle1" className={classes.formDescription}>
          Connect your professional profiles
        </Typography>
      </Box>
      
      {/* Recommended Skills Section - Now at the top */}
      {targetRole && (
        <Box className={classes.recommendationsContainer}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography className={classes.recommendationsLabel}>
              Popular skills in high demand:
            </Typography>
          </Box>
          
          {/* Error message */}
          {error && (
            <Alert severity="error" sx={{ my: 1 }}>
              {error}
            </Alert>
          )}
          
          {loading ? (
            <Box className={classes.loadingContainer}>
              <CircularProgress size={20} />
            </Box>
          ) : filteredRecommendations.length > 0 ? (
            <Box className={classes.chipContainer}>
              {filteredRecommendations.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  className={classes.recommendationChip}
                  onClick={() => handleAddRecommendedSkill(skill)}
                  clickable
                />
              ))}
            </Box>
          ) : originalRecommendations.length > 0 ? (
            <Typography variant="body2" color="textSecondary" sx={{ my: 1 }}>
              All related skills have been added.
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ my: 1 }}>
              No related skills available.
            </Typography>
          )}
        </Box>
      )}
      
      {/* Add Skill Input Field */}
      <TextField
        label="Add Skill"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        variant="outlined"
        fullWidth
        placeholder="e.g., React.js"
        onKeyDown={(e) => handleKeyDown(e, handleAddSkill)}
        className={classes.textField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                onClick={handleAddSkill}
                edge="end"
                color="primary"
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      {/* Selected Skills Section - Now at the bottom */}
      {resumeData.skills.filter(Boolean).length > 0 && (
        <>
          <Typography className={classes.selectedSkillsLabel}>
            Your selected skills:
          </Typography>
          <Box className={classes.chipContainer}>
            {resumeData.skills.filter(Boolean).map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                className={classes.chip}
                onDelete={() => handleRemoveSkill(skill)}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SkillsSection;