import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
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
}));

const PersonalInfoSection = ({ resumeData, setResumeData }) => {
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setResumeData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setResumeData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Box className={classes.form}>
      <Typography variant="h6" className={classes.formSubtitle}>
        Personal Information
      </Typography>
      
      <TextField
        label="Full Name"
        name="header.name"
        value={resumeData.header.name}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        required
      />
      
      <TextField
        label="Email"
        name="header.email"
        value={resumeData.header.email}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        required
      />
      
      <TextField
        label="Phone"
        name="header.phone"
        value={resumeData.header.phone}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        required
        placeholder="e.g., +1 123 456 7890"
      />
      
      <TextField
        label="GitHub URL"
        name="header.github"
        value={resumeData.header.github}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        placeholder="e.g., https://github.com/yourusername"
      />
      
      <TextField
        label="LinkedIn URL"
        name="header.linkedin"
        value={resumeData.header.linkedin}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        placeholder="e.g., https://linkedin.com/in/yourusername"
      />
      
      <TextField
        label="Portfolio URL"
        name="header.portfolio"
        value={resumeData.header.portfolio}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        placeholder="e.g., https://yourportfolio.com"
      />
      
      <TextField
        label="Target Role"
        name="target_role"
        value={resumeData.target_role}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        required
        placeholder="e.g., Front-end Developer, Data Scientist"
      />
      
      <TextField
        label="Professional Summary"
        name="summary"
        value={resumeData.summary}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        placeholder="A brief summary of your professional background and career goals..."
        className={classes.textField}
        helperText="If left empty, a professional summary will be generated automatically"
      />
    </Box>
  );
};

export default PersonalInfoSection;