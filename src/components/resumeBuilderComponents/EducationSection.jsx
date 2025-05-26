import React from 'react';
import { Box, Typography, TextField, Autocomplete } from '@mui/material';
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
  fieldRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  },
  fieldContainer: {
    flex: 1,
  },
  institutionContainer: {
    flex: 2, // Takes more space
  },
  yearContainer: {
    flex: 1, // Takes less space
  },
}));

// Degree options for the dropdown
const degreeOptions = [
  // Bachelor's Degrees
  "Bachelor of Arts (BA)",
  "Bachelor of Fine Arts (BFA)",
  "Bachelor of Social Work (BSW)",
  "Bachelor of Music (BM/BMus)",
  "Bachelor of Performing Arts (BPA)",
  "Bachelor of Science (BSc)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Science in Agriculture (B.Sc. Ag.)",
  "Bachelor of Commerce (BCom)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Technology (BTech)",
  "Bachelor of Engineering (BE)",
  "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
  "Bachelor of Dental Surgery (BDS)",
  "Bachelor of Pharmacy (BPharm)",
  "Bachelor of Laws (LLB)",
  "Bachelor of Education (BEd)",
  "Bachelor of Architecture (BArch)",
  "Bachelor of Design (BDes)",
  // Master's Degrees
  "Master of Arts (MA)",
  "Master of Science (MSc)",
  "Master of Business Administration (MBA)",
  "Master of Technology (MTech)",
  "Master of Engineering (ME)",
  "Master of Commerce (MCom)",
  "Master of Computer Applications (MCA)",
  "Master of Laws (LLM)",
  // Doctoral Degrees
  "Doctor of Philosophy (PhD)",
  "Doctor of Medicine (MD)",
];

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

  // Handle degree change from Autocomplete
  const handleDegreeChange = (event, newValue) => {
    setResumeData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        degree: newValue || '',
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
      
      {/* Degree and Specialization side by side */}
      <Box className={classes.fieldRow}>
        <Box className={classes.fieldContainer}>
          {/* Degree Autocomplete Dropdown */}
          <Autocomplete
            options={degreeOptions}
            value={resumeData.education.degree || null}
            onChange={handleDegreeChange}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Degree"
                name="degree"
                variant="outlined"
                fullWidth
                className={classes.textField}
                placeholder="e.g., Bachelor of Science"
                required
              />
            )}
          />
        </Box>
        <Box className={classes.fieldContainer}>
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
        </Box>
      </Box>
      
      {/* Institution and Graduation Year side by side with different proportions */}
      <Box className={classes.fieldRow}>
        <Box className={classes.institutionContainer}>
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
        </Box>
        <Box className={classes.yearContainer}>
          {/* Year picker for graduation year */}
          <DatePickerField
            label="Graduation Year"
            value={resumeData.education.graduation_year || resumeData.education.graduationYear || ''}
            onChange={handleGraduationYearChange}
            views={['year']} // Only show year picker
            required
            helperText="Select graduation year"
            minYear={1950}
            maxYear={new Date().getFullYear() + 10} // Allow future dates for students
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EducationSection;