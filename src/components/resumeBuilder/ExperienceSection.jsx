import React from 'react';
import { Box, Typography, TextField, Paper, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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
  paper: {
    padding: '1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    position: 'relative',
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    color: '#e53e3e',
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
  addButton: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    borderRadius: '8px',
    textTransform: 'none',
    marginTop: '1rem',
    '&:hover': {
      backgroundColor: '#bee3f8',
    },
  },
}));

const ExperienceSection = ({ resumeData, setResumeData }) => {
  const classes = useStyles();

  const handleAddWorkExperience = () => {
    setResumeData({
      ...resumeData,
      work_experience: [
        ...resumeData.work_experience,
        {
          position: '',
          company_name: '',
          duration: '',
          description: '',
        },
      ],
    });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...resumeData.work_experience];
    updatedWorkExperience[index] = {
      ...updatedWorkExperience[index],
      [field]: value,
    };
    
    setResumeData({
      ...resumeData,
      work_experience: updatedWorkExperience,
    });
  };

  const handleRemoveWorkExperience = (index) => {
    // Don't remove if it's the only experience and it's empty
    if (resumeData.work_experience.length === 1 && 
        !resumeData.work_experience[0].position && 
        !resumeData.work_experience[0].company_name && 
        !resumeData.work_experience[0].duration && 
        !resumeData.work_experience[0].description) {
      return;
    }
    
    setResumeData({
      ...resumeData,
      work_experience: resumeData.work_experience.filter((_, i) => i !== index),
    });
    
    // If we just removed all experiences, add an empty one
    if (resumeData.work_experience.length === 1) {
      setResumeData(prev => ({
        ...prev,
        work_experience: [{
          position: '',
          company_name: '',
          duration: '',
          description: '',
        }]
      }));
    }
  };

  return (
    <Box className={classes.form}>
      <Typography variant="h6" className={classes.formSubtitle}>
        Work Experience
      </Typography>
      
      {resumeData.work_experience.map((experience, index) => (
        <Paper key={index} className={classes.paper}>
          <Box className={classes.sectionTitle}>
            <Typography variant="h6">Experience {index + 1}</Typography>
          </Box>
          
          <IconButton
            className={classes.deleteButton}
            onClick={() => handleRemoveWorkExperience(index)}
          >
            <DeleteIcon />
          </IconButton>
          
          <TextField
            label="Position"
            value={experience.position}
            onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
            variant="outlined"
            fullWidth
            className={classes.textField}
            required
          />
          
          <TextField
            label="Company Name"
            value={experience.company_name}
            onChange={(e) => handleWorkExperienceChange(index, 'company_name', e.target.value)}
            variant="outlined"
            fullWidth
            className={classes.textField}
            required
          />
          
          <TextField
            label="Duration"
            value={experience.duration}
            onChange={(e) => handleWorkExperienceChange(index, 'duration', e.target.value)}
            variant="outlined"
            fullWidth
            className={classes.textField}
            placeholder="e.g., June 2021 - Present"
            required
            helperText="Format: Month YYYY - Month YYYY or Month YYYY - Present"
          />
          
          <TextField
            label="Description"
            value={experience.description}
            onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            className={classes.textField}
            placeholder="Describe your responsibilities and achievements"
            required
          />
        </Paper>
      ))}
      
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddWorkExperience}
        className={classes.addButton}
        fullWidth
      >
        Add Work Experience
      </Button>
    </Box>
  );
};

export default ExperienceSection;