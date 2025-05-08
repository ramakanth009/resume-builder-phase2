import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import DatePickerField from '../../common/DatePickerField';

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

const EducationSection = ({ resumeData, setResumeData }) => {
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setResumeData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [name]: value,
      },
    }));
  };

  // Handle graduation year change from DatePicker
  const handleGraduationYearChange = (value) => {
    setResumeData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        graduation_year: value,
        graduationYear: value, // Update both formats for compatibility
      },
    }));
  };

  return (
    <Box className={classes.form}>
      <Typography variant="h6" className={classes.formSubtitle}>
        Education Information
      </Typography>
      
      <TextField
        label="Degree"
        name="degree"
        value={resumeData.education.degree}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        placeholder="e.g., Bachelor of Science"
        required
      />
      
      <TextField
        label="Specialization"
        name="specialization"
        value={resumeData.education.specialization}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        placeholder="e.g., Computer Science"
        required
      />
      
      <TextField
        label="Institution"
        name="institution"
        value={resumeData.education.institution}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={classes.textField}
        placeholder="e.g., Stanford University"
        required
      />
      
      {/* Year picker for graduation year */}
      <DatePickerField
        label="Graduation Year"
        value={resumeData.education.graduation_year || resumeData.education.graduationYear || ''}
        onChange={handleGraduationYearChange}
        views={['year']} // Only show year picker
        required
        helperText="Select your graduation year"
        minYear={1950}
        maxYear={new Date().getFullYear() + 10} // Allow future dates for students
      />
    </Box>
  );
};

export default EducationSection;