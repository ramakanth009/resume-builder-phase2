import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import makeStylesWithTheme from '../styles/makeStylesAdapter';

// Icons for each section
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import ExtensionIcon from '@mui/icons-material/Extension';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import GigaLogo from '../assets/giga-loogo.svg';
import VerifiedIcon from '@mui/icons-material/Verified'; // Add this import for certifications

const useStyles = makeStylesWithTheme((theme) => ({
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    transition: 'width 0.3s ease-in-out',
    zIndex: 1200,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    '@media (max-width: 1200px)': {
      width: '64px !important',
    },
    '@media (max-width: 600px)': {
      width: '56px !important',
    },
    '@media (max-width: 480px)': {
      width: '48px !important',
    },
    '@media (max-width: 375px)': {
      width: '42px !important',
    },
  },
  sidebarCollapsed: {
    width: '64px',
    '@media (max-width: 600px)': {
      width: '56px',
    },
    '@media (max-width: 480px)': {
      width: '48px',
    },
    '@media (max-width: 375px)': {
      width: '42px',
    },
  },
  sidebarExpanded: {
    width: '220px',
    '@media (max-width: 1200px)': {
      width: '64px',
    },
    '@media (max-width: 600px)': {
      width: '56px',
    },
    '@media (max-width: 480px)': {
      width: '48px',
    },
    '@media (max-width: 375px)': {
      width: '42px',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.25rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    height: '64px',
    '@media (max-width: 600px)': {
      height: '56px',
      padding: '1rem 0.75rem',
    },
    '@media (max-width: 480px)': {
      height: '48px',
      padding: '0.75rem 0.5rem',
    },
    '@media (max-width: 375px)': {
      height: '42px',
      padding: '0.5rem 0.4rem',
    },
  },
  logo: {
    width: '32px',
    height: '32px',
    '@media (max-width: 600px)': {
      width: '28px',
      height: '28px',
    },
    '@media (max-width: 480px)': {
      width: '24px',
      height: '24px',
    },
    '@media (max-width: 375px)': {
      width: '20px',
      height: '20px',
    },
  },
  logoText: {
    marginLeft: '1rem',
    fontWeight: 700,
    fontSize: '1.2rem',
    color: '#2d3748',
    whiteSpace: 'nowrap',
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },
  navList: {
    padding: '1rem 0',
    '@media (max-width: 480px)': {
      padding: '0.75rem 0',
    },
  },
  listItem: {
    padding: '0.75rem 1rem',
    margin: '0.25rem 0',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc',
    },
    '@media (max-width: 600px)': {
      padding: '0.6rem 0.75rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem 0.6rem',
      margin: '0.2rem 0',
    },
    '@media (max-width: 375px)': {
      padding: '0.4rem 0.5rem',
      margin: '0.15rem 0',
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
      minWidth: '36px',
      '& .MuiSvgIcon-root': {
        fontSize: '1.3rem',
      },
    },
    '@media (max-width: 480px)': {
      minWidth: '32px',
      '& .MuiSvgIcon-root': {
        fontSize: '1.2rem',
      },
    },
    '@media (max-width: 375px)': {
      minWidth: '28px',
      '& .MuiSvgIcon-root': {
        fontSize: '1.1rem',
      },
    },
  },
  activeIcon: {
    color: '#3182ce',
  },
  itemText: {
    margin: 0,
    fontWeight: 500,
    transition: 'opacity 0.2s ease',
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },
  contentShift: {
    marginLeft: '64px',
    transition: 'margin-left 0.3s ease-in-out',
    '@media (max-width: 600px)': {
      marginLeft: '56px',
    },
    '@media (max-width: 480px)': {
      marginLeft: '48px',
    },
    '@media (max-width: 375px)': {
      marginLeft: '42px',
    },
  },
}));

const Sidebar = ({ activeStep, steps, onStepClick }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:1200px)');
  
  // Map icons to each section
  const stepIcons = [
    <PersonIcon />,      // Personal Info
    <SchoolIcon />,      // Education
    <ExtensionIcon />,   // Skills
    <VerifiedIcon />,    // Certifications
    <CodeIcon />,        // Projects
    <WorkIcon />,        // Experience
    <SettingsIcon />     // Custom Sections & Terms
  ];
  
  // Handle mouse events for expand/collapse (only on desktop)
  const handleMouseEnter = () => {
    if (isDesktop) {
      setExpanded(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (isDesktop) {
      setExpanded(false);
    }
  };
  
  // Handle navigation and collapse sidebar
  const handleStepClick = (index) => {
    onStepClick(index);
  };
  
  return (
    <Box 
      className={`${classes.sidebar} ${expanded && isDesktop ? classes.sidebarExpanded : classes.sidebarCollapsed}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo area */}
      <Box className={classes.logoContainer}>
        <img src={GigaLogo} alt="Gigaversity Logo" className={classes.logo} />
        {expanded && isDesktop && (
          <Typography className={classes.logoText}>
            Gigaversity
          </Typography>
        )}
      </Box>
      
      {/* Navigation items */}
      <List className={classes.navList}>
        {steps.map((label, index) => (
          <ListItem
            key={label}
            className={`${classes.listItem} ${activeStep === index ? classes.activeListItem : ''}`}
            onClick={() => handleStepClick(index)}
            button
            disableRipple
          >
            <ListItemIcon className={`${classes.listItemIcon} ${activeStep === index ? classes.activeIcon : ''}`}>
              {stepIcons[index]}
            </ListItemIcon>
            
            {!expanded || !isDesktop ? (
              <Tooltip title={label} placement="right">
                <span></span>
              </Tooltip>
            ) : (
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
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;