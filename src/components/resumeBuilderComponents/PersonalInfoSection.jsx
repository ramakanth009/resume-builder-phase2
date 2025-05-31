import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Autocomplete,
  CircularProgress,
  Grid
} from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getTargetRoles } from '../../utils/api';
import { useApiData } from '../../hooks/useApiData';

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(0, 0, 0, 0.03)',
      border: '1px solid rgba(39, 40, 108, 0.08)',
      borderRadius: '16px',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      '&:hover': {
        borderColor: 'rgba(39, 40, 108, 0.12)',
      },
      '&.Mui-focused': {
        background: 'rgba(0, 0, 0, 0.05)',
        borderColor: '#14b8a6',
        boxShadow: '0 0 0 3px rgba(20, 184, 166, 0.1), 0 4px 16px rgba(39, 40, 108, 0.12)',
        transform: 'translateY(-2px)',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#427bbf',
      fontWeight: 500,
      fontSize: '0.9rem',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#14b8a6',
    },
  },  textField: {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(0, 0, 0, 0.03)',
      border: '1px solid rgba(39, 40, 108, 0.08)',
      borderRadius: '16px',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      '&:hover': {
        borderColor: 'rgba(39, 40, 108, 0.12)',
      },
      '&.Mui-focused': {
        background: 'rgba(0, 0, 0, 0.05)',
        borderColor: '#14b8a6',
        boxShadow: '0 0 0 3px rgba(20, 184, 166, 0.1), 0 4px 16px rgba(39, 40, 108, 0.12)',
        transform: 'translateY(-2px)',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#427bbf',
      fontWeight: 500,
      fontSize: '0.9rem',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#14b8a6',
    },
  },
  formSubtitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#27286c',
    marginBottom: '1.5rem',
    position: 'relative',
    paddingBottom: '0.5rem',
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
  loadingIndicator: {
    color: '#3182ce',
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
      
      {/* Full Name and Phone side by side */}
      <Box className={classes.fieldRow}>
        <Box className={classes.fieldContainer}>
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
        </Box>
        <Box className={classes.fieldContainer}>
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
        </Box>
      </Box>
      
      {/* Email and Target Role side by side */}
      <Box className={classes.fieldRow}>
        <Box className={classes.fieldContainer}>
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
        </Box>
        <Box className={classes.fieldContainer}>
          {/* Target Role with Autocomplete using cached data */}
          <Autocomplete
            freeSolo
            value={resumeData.target_role || null}
            onChange={handleRoleSelect}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              
              // Also update resumeData.target_role directly when typing
              setResumeData(prev => ({
                ...prev,
                target_role: newInputValue,
              }));
              
              // Notify parent component to update targetRole state
              if (onRoleSelect && newInputValue) {
                onRoleSelect(newInputValue);
              }
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
                placeholder="e.g., Front-end Developer"
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
        </Box>
      </Box>
      
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