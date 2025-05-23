import React from 'react';
import { Box, Typography, TextField, Paper, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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
  helperText: {
    marginTop: '-0.5rem',
    marginBottom: '1rem',
    color: '#718096',
    fontSize: '0.75rem',
  },
  datePickerRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    // marginBottom: '1rem',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  },
  datePickerContainer: {
    flex: 1,
  }
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
          companyName: '',
          duration: '',
          start_date: '',
          end_date: '',
          description: '',
          responsibilities: [],
        },
      ],
    });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...resumeData.work_experience];
    
    if (field === 'description') {
      // Convert description text to responsibilities array
      const responsibilities = value.split('\n').filter(item => item.trim());
      
      updatedWorkExperience[index] = {
        ...updatedWorkExperience[index],
        responsibilities: responsibilities,
        description: value,
      };
    } else if (field === 'company_name') {
      // Handle both field names for company
      updatedWorkExperience[index] = {
        ...updatedWorkExperience[index],
        company_name: value,
        companyName: value,
        [field]: value,
      };
    } else {
      updatedWorkExperience[index] = {
        ...updatedWorkExperience[index],
        [field]: value,
      };
    }
    
    setResumeData({
      ...resumeData,
      work_experience: updatedWorkExperience,
    });
  };

  // Handle date changes from DatePicker
  const handleDateChange = (index, dateType, value) => {
    const updatedWorkExperience = [...resumeData.work_experience];
    
    // Update the specific date field
    updatedWorkExperience[index] = {
      ...updatedWorkExperience[index],
      [dateType]: value,
    };
    
    // Also update the duration field with a formatted string
    if (dateType === 'start_date' || dateType === 'end_date') {
      const startDate = dateType === 'start_date' ? value : updatedWorkExperience[index].start_date;
      const endDate = dateType === 'end_date' ? value : updatedWorkExperience[index].end_date;
      
      // Only update duration if both dates exist
      if (startDate && endDate) {
        updatedWorkExperience[index].duration = `${startDate} - ${endDate === 'Present' ? 'Present' : endDate}`;
      }
    }
    
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
          companyName: '',
          duration: '',
          start_date: '',
          end_date: '',
          description: '',
          responsibilities: [],
        }]
      }));
    }
  };

  // Handle "Present" toggle for end date
  const handlePresentToggle = (index) => {
    const updatedWorkExperience = [...resumeData.work_experience];
    
    // Check if current end_date is "Present"
    const isPresent = updatedWorkExperience[index].end_date === 'Present';
    
    // Toggle between "Present" and empty
    updatedWorkExperience[index].end_date = isPresent ? '' : 'Present';
    
    // Update duration string
    if (updatedWorkExperience[index].start_date) {
      updatedWorkExperience[index].duration = `${updatedWorkExperience[index].start_date} - ${isPresent ? '' : 'Present'}`;
    }
    
    setResumeData({
      ...resumeData,
      work_experience: updatedWorkExperience,
    });
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
          
          {/* Replace duration text field with date pickers */}
          <Box className={classes.datePickerRow}>
            <Box className={classes.datePickerContainer}>
              <DatePickerField
                label="Start Date"
                value={experience.start_date || ''}
                onChange={(value) => handleDateChange(index, 'start_date', value)}
                views={['year', 'month']} // Show month and year
                required
                helperText="Select start month & year"
              />
            </Box>
            
            <Box className={classes.datePickerContainer}>
              <DatePickerField
                label="End Date"
                value={experience.end_date === 'Present' ? '' : experience.end_date || ''}
                onChange={(value) => handleDateChange(index, 'end_date', value)}
                views={['year', 'month']} // Show month and year
                required={experience.end_date !== 'Present'}
                helperText={experience.end_date === 'Present' ? 'Currently working here' : 'Select end month & year'}
                disabled={experience.end_date === 'Present'}
              />
            </Box>
          </Box>
          
          {/* Add "Present" checkbox */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => handlePresentToggle(index)}
            sx={{ mb: 2 }}
          >
            {experience.end_date === 'Present' ? 'Clear "Present"' : 'I currently work here'}
          </Button>
          
          <TextField
            label="Description"
            value={experience.description}
            onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            className={classes.textField}
            placeholder="Describe your work in a 2 - 3 sentences"
            required
          />
          <Typography className={classes.helperText}>
            Each line will be converted into a bullet point on your resume
          </Typography>
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