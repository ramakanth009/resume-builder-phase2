// import React from 'react';
// import { Box, Typography, TextField, InputAdornment } from '@mui/material';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import LanguageIcon from '@mui/icons-material/Language';
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
//   urlInput: {
//     '& .MuiInputAdornment-root': {
//       marginRight: '8px',
//       color: '#718096',
//     }
//   }
// }));

// const validateUrl = (url, type) => {
//   if (!url) return true; // Empty URLs are valid
//   try {
//     new URL(url);
//     switch (type) {
//       case 'github':
//         return url.includes('github.com');
//       case 'linkedin':
//         return url.includes('linkedin.com');
//       default:
//         return true;
//     }
//   } catch {
//     return false;
//   }
// };

// const SocialLinksSection = ({ resumeData, setResumeData }) => {
//   const classes = useStyles();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const field = name.split('.')[1];
    
//     setResumeData(prev => ({
//       ...prev,
//       header: {
//         ...prev.header,
//         [field]: value,
//       }
//     }));
//   };

//   return (
//     <Box className={classes.form}>
//       <Typography variant="h6" className={classes.formSubtitle}>
//         Social Links
//       </Typography>
      
//       <TextField
//         label="GitHub URL"
//         name="header.github"
//         value={resumeData.header.github}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         className={`${classes.textField} ${classes.urlInput}`}
//         placeholder="e.g., https://github.com/yourusername"
//         error={!validateUrl(resumeData.header.github, 'github')}
//         helperText={!validateUrl(resumeData.header.github, 'github') ? 'Please enter a valid GitHub URL' : ''}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <GitHubIcon />
//             </InputAdornment>
//           ),
//         }}
//       />
      
//       <TextField
//         label="LinkedIn URL"
//         name="header.linkedin"
//         value={resumeData.header.linkedin}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         className={`${classes.textField} ${classes.urlInput}`}
//         placeholder="e.g., https://linkedin.com/in/yourusername"
//         error={!validateUrl(resumeData.header.linkedin, 'linkedin')}
//         helperText={!validateUrl(resumeData.header.linkedin, 'linkedin') ? 'Please enter a valid LinkedIn URL' : ''}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <LinkedInIcon />
//             </InputAdornment>
//           ),
//         }}
//       />
      
//       <TextField
//         label="Portfolio URL"
//         name="header.portfolio"
//         value={resumeData.header.portfolio}
//         onChange={handleInputChange}
//         variant="outlined"
//         fullWidth
//         className={`${classes.textField} ${classes.urlInput}`}
//         placeholder="e.g., https://yourportfolio.com"
//         error={!validateUrl(resumeData.header.portfolio)}
//         helperText={!validateUrl(resumeData.header.portfolio) ? 'Please enter a valid URL' : ''}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <LanguageIcon />
//             </InputAdornment>
//           ),
//         }}
//       />
//     </Box>
//   );
// };

// export default SocialLinksSection;
import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment,
  Tooltip,
  Alert
} from '@mui/material';
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
  infoAlert: {
    marginBottom: '1.5rem',
    backgroundColor: '#ebf8ff',
    border: '1px solid #bee3f8',
    '& .MuiAlert-icon': {
      color: '#3182ce',
    },
  },
  socialIcon: {
    color: '#718096',
    transition: 'color 0.2s ease',
  },
  githubIcon: {
    '&:hover': {
      color: '#333',
    },
  },
  linkedinIcon: {
    '&:hover': {
      color: '#0077b5',
    },
  },
  portfolioIcon: {
    '&:hover': {
      color: '#3182ce',
    },
  },
  helperText: {
    fontSize: '0.75rem',
    color: '#718096',
    marginTop: '0.25rem',
    lineHeight: 1.4,
  },
}));

const SocialLinksSection = ({ resumeData, setResumeData }) => {
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setResumeData(prev => ({
      ...prev,
      header: {
        ...prev.header,
        [name]: value,
      },
    }));
  };

  // Helper function to format URL
  const formatUrl = (url, platform) => {
    if (!url) return '';
    
    // Remove trailing slash
    url = url.trim().replace(/\/$/, '');
    
    // Add https:// if no protocol
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    return url;
  };

  // Handle URL formatting on blur
  const handleUrlBlur = (field, value) => {
    const formattedUrl = formatUrl(value, field);
    if (formattedUrl !== value) {
      setResumeData(prev => ({
        ...prev,
        header: {
          ...prev.header,
          [field]: formattedUrl,
        },
      }));
    }
  };

  return (
    <Box className={classes.form}>
      <Typography variant="h6" className={classes.formSubtitle}>
        Social Links & Portfolio
      </Typography>
      
      <Alert severity="info" className={classes.infoAlert}>
        Add your professional social media profiles and portfolio to showcase your work. 
        These are optional but highly recommended for better visibility.
      </Alert>
      
      <TextField
  label="GitHub Profile"
  name="github"
  value={resumeData.header.github || ''}
  onChange={handleInputChange}
  onBlur={(e) => handleUrlBlur('github', e.target.value)}
  variant="outlined"
  fullWidth
  className={classes.textField}
  placeholder="https://github.com/yourusername"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <GitHubIcon className={`${classes.socialIcon} ${classes.githubIcon}`} />
      </InputAdornment>
    ),
  }}
  helperText="Showcase your coding projects and contributions"
/>

<TextField
  label="LinkedIn Profile"
  name="linkedin"
  value={resumeData.header.linkedin || ''}
  onChange={handleInputChange}
  onBlur={(e) => handleUrlBlur('linkedin', e.target.value)}
  variant="outlined"
  fullWidth
  className={classes.textField}
  placeholder="https://linkedin.com/in/yourusername"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <LinkedInIcon className={`${classes.socialIcon} ${classes.linkedinIcon}`} />
      </InputAdornment>
    ),
  }}
  helperText="Professional network and career achievements"
/>

<TextField
  label="Portfolio/Website"
  name="portfolio"
  value={resumeData.header.portfolio || ''}
  onChange={handleInputChange}
  onBlur={(e) => handleUrlBlur('portfolio', e.target.value)}
  variant="outlined"
  fullWidth
  className={classes.textField}
  placeholder="https://yourportfolio.com"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <LanguageIcon className={`${classes.socialIcon} ${classes.portfolioIcon}`} />
      </InputAdornment>
    ),
  }}
  helperText="Personal website, portfolio, or professional blog"
/>
    </Box>
  );
};

export default SocialLinksSection;