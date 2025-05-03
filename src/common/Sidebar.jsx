// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import makeStylesWithTheme from '../styles/makeStylesAdapter';

// Icons for each section
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import ExtensionIcon from '@mui/icons-material/Extension';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import GigaLogo from '../assets/giga-loogo.svg';

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
  },
  sidebarCollapsed: {
    width: '64px',
  },
  sidebarExpanded: {
    width: '220px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.25rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    height: '64px',
  },
  logo: {
    width: '32px',
    height: '32px',
  },
  logoText: {
    marginLeft: '1rem',
    fontWeight: 700,
    fontSize: '1.2rem',
    color: '#2d3748',
    whiteSpace: 'nowrap',
  },
  navList: {
    padding: '1rem 0',
  },
  listItem: {
    padding: '0.75rem 1rem',
    margin: '0.25rem 0',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc',
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
  },
  activeIcon: {
    color: '#3182ce',
  },
  itemText: {
    margin: 0,
    fontWeight: 500,
    transition: 'opacity 0.2s ease',
  },
  contentShift: {
    marginLeft: '64px',
    transition: 'margin-left 0.3s ease-in-out',
  },
}));

const Sidebar = ({ activeStep, steps, onStepClick }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  
  // Map icons to each section
  const stepIcons = [
    <PersonIcon />,      // Personal Info
    <SchoolIcon />,      // Education
    <ExtensionIcon />,   // Skills
    <CodeIcon />,        // Projects
    <WorkIcon />,        // Experience
    <SettingsIcon />     // Custom Sections & Terms
  ];
  
  // Handle mouse events for expand/collapse
  const handleMouseEnter = () => {
    setExpanded(true);
  };
  
  const handleMouseLeave = () => {
    setExpanded(false);
  };
  
  // Handle navigation and collapse sidebar
  const handleStepClick = (index) => {
    onStepClick(index);
  };
  
  return (
    <Box 
      className={`${classes.sidebar} ${expanded ? classes.sidebarExpanded : classes.sidebarCollapsed}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo area */}
      <Box className={classes.logoContainer}>
        <img src={GigaLogo} alt="Gigaversity Logo" className={classes.logo} />
        {expanded && (
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
            
            {!expanded ? (
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