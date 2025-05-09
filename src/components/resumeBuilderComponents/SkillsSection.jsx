import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Chip, InputAdornment, IconButton, Divider, Alert, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getSkillRecommendations } from '../../utils/api';
import { useApiData } from '../../hooks/useApiData';

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
    marginBottom: '0.5rem',
  },
  formSubtitle: {
    fontWeight: 500,
    marginBottom: '0.75rem',
    marginTop: '1rem',
    color: '#4a5568',
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  chip: {
    backgroundColor: '#e6fffa',
    color: '#319795',
    borderRadius: '16px',
    margin: '0.25rem',
  },
  divider: {
    margin: '2rem 0 1rem',
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
}));

const SkillsSection = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');
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
    
    // If the removed skill was from our recommendations, it will be added back 
    // automatically via the useEffect that updates filteredRecommendations
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
      // The skill will be removed from filteredRecommendations via useEffect
    }
  };

  // Certifications handlers
  const handleAddCertification = () => {
    if (newCertification.trim() !== '' && !resumeData.certifications.includes(newCertification.trim())) {
      setResumeData(prev => ({
        ...prev,
        certifications: [...prev.certifications.filter(Boolean), newCertification.trim()],
      }));
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (certToRemove) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert !== certToRemove),
    }));
  };

  return (
    <Box className={classes.form}>
      <Typography variant="h6" className={classes.formSubtitle}>
        Skills
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
      
      {/* Recommended Skills - integrated directly after input */}
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
      
      <Divider className={classes.divider} />
      
      <Typography variant="h6" className={classes.formSubtitle}>
        Certifications
      </Typography>
      
      <Box className={classes.chipContainer}>
        {resumeData.certifications.filter(Boolean).map((cert, index) => (
          <Chip
            key={index}
            label={cert}
            className={classes.chip}
            onDelete={() => handleRemoveCertification(cert)}
          />
        ))}
      </Box>
      
      <TextField
        label="Add Certification"
        value={newCertification}
        onChange={(e) => setNewCertification(e.target.value)}
        variant="outlined"
        fullWidth
        placeholder="e.g., AWS Certified Developer"
        onKeyDown={(e) => handleKeyDown(e, handleAddCertification)}
        className={classes.textField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                onClick={handleAddCertification}
                edge="end"
                color="primary"
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SkillsSection;