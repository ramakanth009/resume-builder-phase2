import React from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
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
  urlInput: {
    '& .MuiInputAdornment-root': {
      marginRight: '8px',
      color: '#718096',
    }
  }
}));

const validateUrl = (url, type) => {
  if (!url) return true; // Empty URLs are valid
  try {
    new URL(url);
    switch (type) {
      case 'github':
        return url.includes('github.com');
      case 'linkedin':
        return url.includes('linkedin.com');
      default:
        return true;
    }
  } catch {
    return false;
  }
};

const SocialLinksSection = ({ resumeData, setResumeData }) => {
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const field = name.split('.')[1];
    
    setResumeData(prev => ({
      ...prev,
      header: {
        ...prev.header,
        [field]: value,
      }
    }));
  };

  return (
    <Box className={classes.form}>
      <Typography variant="h6" className={classes.formSubtitle}>
        Social Links
      </Typography>
      
      <TextField
        label="GitHub URL"
        name="header.github"
        value={resumeData.header.github}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={`${classes.textField} ${classes.urlInput}`}
        placeholder="e.g., https://github.com/yourusername"
        error={!validateUrl(resumeData.header.github, 'github')}
        helperText={!validateUrl(resumeData.header.github, 'github') ? 'Please enter a valid GitHub URL' : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GitHubIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        label="LinkedIn URL"
        name="header.linkedin"
        value={resumeData.header.linkedin}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={`${classes.textField} ${classes.urlInput}`}
        placeholder="e.g., https://linkedin.com/in/yourusername"
        error={!validateUrl(resumeData.header.linkedin, 'linkedin')}
        helperText={!validateUrl(resumeData.header.linkedin, 'linkedin') ? 'Please enter a valid LinkedIn URL' : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        label="Portfolio URL"
        name="header.portfolio"
        value={resumeData.header.portfolio}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        className={`${classes.textField} ${classes.urlInput}`}
        placeholder="e.g., https://yourportfolio.com"
        error={!validateUrl(resumeData.header.portfolio)}
        helperText={!validateUrl(resumeData.header.portfolio) ? 'Please enter a valid URL' : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LanguageIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SocialLinksSection;
