import React, { useState } from 'react';
import { Box, Typography, TextField, Chip, InputAdornment, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

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
    marginBottom: '1rem',
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
  }
}));

const SkillsSection = ({ resumeData, setResumeData }) => {
  const classes = useStyles();
  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');

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