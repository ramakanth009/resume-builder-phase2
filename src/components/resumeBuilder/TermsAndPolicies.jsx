import React from 'react';
import { Box, Typography, FormControlLabel, Checkbox, Paper } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  container: {
    marginBottom: '2rem',
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  title: {
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2d3748',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  checkbox: {
    color: '#3182ce',
    '&.Mui-checked': {
      color: '#3182ce',
    },
  },
  checkboxLabel: {
    fontSize: '0.9rem',
    color: '#4a5568',
  },
  disclaimer: {
    fontSize: '0.8rem',
    color: '#718096',
    marginTop: '1rem',
    fontStyle: 'italic',
  }
}));

const TermsAndPolicies = ({ termsAccepted, setTermsAccepted }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setTermsAccepted(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <Paper className={classes.container} elevation={0}>
      <Typography variant="h6" className={classes.title}>
        Terms & Policies
      </Typography>
      
      <Box className={classes.checkboxContainer}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={termsAccepted.updates} 
              onChange={handleChange}
              name="updates"
              className={classes.checkbox}
            />
          }
          label="I accept to receive updates from Gigaversity about new courses and future products."
          className={classes.checkboxLabel}
        />
        
        <FormControlLabel
          control={
            <Checkbox 
              checked={termsAccepted.dataSharing} 
              onChange={handleChange}
              name="dataSharing"
              className={classes.checkbox}
            />
          }
          label="I accept to share my data to be used for AI-generated resume creation."
          className={classes.checkboxLabel}
        />
      </Box>
      
      <Typography className={classes.disclaimer}>
        Both checkboxes must be selected to proceed with resume generation.
      </Typography>
    </Paper>
  );
};

export default TermsAndPolicies;