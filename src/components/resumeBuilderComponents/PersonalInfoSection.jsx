import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Autocomplete,
  CircularProgress 
} from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getTargetRoles } from '../../utils/api';
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
  const [inputValue, setInputValue] = useState('');
  
  // Use our custom hook for data fetching with caching
  const { 
    data: targetRolesResponse,
    loading,
    error
  } = useApiData(getTargetRoles, null, {
    cacheKey: 'targetRoles',
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
  
  // Extract roles from the response
  const targetRoles = (targetRolesResponse?.roles || []);

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
        placeholder="e.g., 9999955555"
      />
      
      {/* Target Role with Autocomplete using cached data */}
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