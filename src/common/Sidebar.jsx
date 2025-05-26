import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import makeStylesWithTheme from '../styles/makeStylesAdapter';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import ExtensionIcon from '@mui/icons-material/Extension';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import GigaLogo from '../assets/giga-loogo.svg';
import VerifiedIcon from '@mui/icons-material/Verified';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';

const useStyles = makeStylesWithTheme((theme) => ({
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '220px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    zIndex: 1200,
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden', // Changed from overflow: 'auto'
    '@media (max-width: 960px)': {
      width: '180px',
    },
    '@media (max-width: 600px)': {
      width: '64px',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.25rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    height: '64px',
    '@media (max-width: 600px)': {
      justifyContent: 'center',
      padding: '1rem 0.5rem',
    },
  },
  logo: {
    width: '32px',
    height: '32px',
    flexShrink: 0,
    '@media (max-width: 600px)': {
      width: '28px',
      height: '28px',
    },
  },
  logoText: {
    marginLeft: '1rem',
    fontWeight: 700,
    fontSize: '1.2rem',
    color: '#2d3748',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  navList: {
    padding: '1rem 0',
    flexGrow: 1,
  },
  listItem: {
    padding: '0.75rem 1rem',
    margin: '0.25rem 0',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc',
    },
    position: 'relative',
    '@media (max-width: 600px)': {
      padding: '0.75rem 0.5rem',
      justifyContent: 'center',
    },
  },
  activeListItem: {
    backgroundColor: '#ebf8ff',
    borderLeft: '3px solid #3182ce',
    '&:hover': {
      backgroundColor: '#ebf8ff',
    },
  },
  listItemIcon: {
    minWidth: '40px',
    color: '#718096',
    '@media (max-width: 600px)': {
      minWidth: '24px',
      marginRight: 0,
    },
  },
  activeIcon: {
    color: '#3182ce',
  },
  itemText: {
    margin: 0,
    fontWeight: 500,
    whiteSpace: 'normal', // Changed from 'nowrap'
    wordWrap: 'break-word',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  footerText: {
    fontSize: '0.75rem',
    color: '#a0aec0',
    textAlign: 'center',
    padding: '0.5rem',
    borderTop: '1px solid #e2e8f0',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
}));

const Sidebar = ({ activeStep, steps, onStepClick }) => {
  const classes = useStyles();

  // Icon mapping for steps
  const stepIcons = [
    <PersonIcon />,              // Personal Info
    <LinkIcon />,                // Social Links
    <SchoolIcon />,              // Education
    <ExtensionIcon />,           // Skills
    <SmartToyIcon />,            // AI Skill Recommendations
    <CodeIcon />,                // Projects
    <WorkIcon />,                // Experience
    <VerifiedIcon />,            // Certifications
    <SettingsIcon />             // Custom Sections & Terms
  ];

  return (
    <Box className={classes.sidebar}>
      {/* Logo area */}
      <Box className={classes.logoContainer}>
        <img src={GigaLogo} alt="Gigaversity Logo" className={classes.logo} />
        <Typography className={classes.logoText}>
          Gigaversity
        </Typography>
      </Box>
      
      {/* Navigation items */}
      <List className={classes.navList}>
        {steps.map((label, index) => (
          <ListItem
            key={label}
            className={`${classes.listItem} ${activeStep === index ? classes.activeListItem : ''}`}
            onClick={() => onStepClick(index)}
            button
            disableRipple
          >
            <ListItemIcon className={`${classes.listItemIcon} ${activeStep === index ? classes.activeIcon : ''}`}>
              {stepIcons[index]}
            </ListItemIcon>
            
            <ListItemText 
              primary={label}
              primaryTypographyProps={{ 
                className: classes.itemText,
                style: { 
                  color: activeStep === index ? '#3182ce' : '#2d3748',
                  fontWeight: activeStep === index ? 600 : 500,
                } 
              }}
            />
          </ListItem>
        ))}
      </List>
      
      {/* Footer text */}
      <Typography className={classes.footerText}>
        Resume Builder v1.0 (beta)
      </Typography>
    </Box>
  );
};

export default Sidebar;