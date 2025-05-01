// import React from 'react';
// import { Box, Typography, TextField } from '@mui/material';
// import makeStylesWithTheme from '../../styles/makeStylesAdapter';

// const useStyles = makeStylesWithTheme((theme) => ({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//   },
//   textField: {
//     '& .MuiOutlinedInput-root': {
//       borderRadius: '8px',
//     },
//     marginBottom: '1rem',
//   },
//   formSubtitle: {
//     fontWeight: 500,
//     marginBottom: '0.75rem',
//     marginTop: '1rem',
//     color: '#4a5568',
//   },
// }));

// const PersonalInfoSection = ({ resumeData, setResumeData }) => {
//   const classes = useStyles();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name.includes('.')) {
//       const [section, field] = name.split('.');
//       setResumeData(prev => ({
//         ...prev,
//         [section]: {
//           ...prev[section],
//           [field]: value,
//         },
//       }));
//     } else {
//       setResumeData(prev => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   return (
//     <Box className={classes.form}>
//       <Typography variant="h6" className={classes.formSubtitle}>
//         Personal Information
//       </Typography>
      
//       <TextField
//         label="Full Name"
//         name="header.name"
//         value={resumeData.header.name}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         className={classes.textField}
//         required
//       />
      
//       <TextField
//         label="Email"
//         name="header.email"
//         value={resumeData.header.email}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         className={classes.textField}
//         required
//       />
      
//       <TextField
//         label="Phone"
//         name="header.phone"
//         value={resumeData.header.phone}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         className={classes.textField}
//         required
//         placeholder="e.g., +1 123 456 7890"
//       />
      
//       <TextField
//         label="GitHub URL"
//         name="header.github"
//         value={resumeData.header.github}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         className={classes.textField}
//         placeholder="e.g., https://github.com/yourusername"
//       />
      
//       <TextField
//         label="LinkedIn URL"
//         name="header.linkedin"
//         value={resumeData.header.linkedin}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         className={classes.textField}
//         placeholder="e.g., https://linkedin.com/in/yourusername"
//       />
      
//       <TextField
//         label="Portfolio URL"
//         name="header.portfolio"
//         value={resumeData.header.portfolio}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         className={classes.textField}
//         placeholder="e.g., https://yourportfolio.com"
//       />
      
//       <TextField
//         label="Target Role"
//         name="target_role"
//         value={resumeData.target_role}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         className={classes.textField}
//         required
//         placeholder="e.g., Front-end Developer, Data Scientist"
//       />
      
//       <TextField
//         label="Professional Summary"
//         name="summary"
//         value={resumeData.summary}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         multiline
//         rows={4}
//         placeholder="A brief summary of your professional background and career goals..."
//         className={classes.textField}
//         helperText="If left empty, a professional summary will be generated automatically"
//       />
//     </Box>
//   );
// };

// export default PersonalInfoSection;
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Autocomplete,
  CircularProgress 
} from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getTargetRoles } from '../../utils/api';

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
  loadingIndicator: {
    color: '#3182ce',
  },
}));

const PersonalInfoSection = ({ resumeData, setResumeData, onRoleSelect }) => {
  const classes = useStyles();
  const [targetRoles, setTargetRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Fetch target roles on component mount
  useEffect(() => {
    const fetchTargetRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getTargetRoles();
        if (response.status === 'success') {
          setTargetRoles(response.roles || []);
        } else {
          setError(response.message || 'Failed to fetch target roles');
        }
      } catch (error) {
        setError(error.message || 'An error occurred while fetching target roles');
        console.error('Error fetching target roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTargetRoles();
  }, []);

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
  
  // Handle role selection from autocomplete
  const handleRoleSelect = (event, newValue) => {
    let roleName = '';
    
    // Check different value formats
    if (typeof newValue === 'string') {
      roleName = newValue;
    } else if (newValue && newValue.display_name) {
      roleName = newValue.display_name;
    } else if (newValue && newValue.name) {
      roleName = newValue.name;
    }
    
    // Update resume data
    setResumeData(prev => ({
      ...prev,
      target_role: roleName,
    }));
    
    // Notify parent component
    if (onRoleSelect && roleName) {
      onRoleSelect(roleName);
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
      
      {/* Target Role with Autocomplete */}
      <Autocomplete
        freeSolo
        value={resumeData.target_role || null}
        onChange={handleRoleSelect}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={targetRoles}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          return option.display_name || option.name || '';
        }}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Target Role"
            name="target_role"
            variant="outlined"
            fullWidth
            required
            className={classes.textField}
            placeholder="e.g., Front-end Developer, Data Scientist"
            error={!!error}
            helperText={error || "Select your target job role"}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} className={classes.loadingIndicator} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
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