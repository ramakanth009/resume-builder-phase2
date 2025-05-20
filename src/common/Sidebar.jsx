import React, { useState, useEffect, useRef } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import makeStylesWithTheme from '../styles/makeStylesAdapter';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import ExtensionIcon from '@mui/icons-material/Extension';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import GigaLogo from '../assets/giga-loogo.svg';
import VerifiedIcon from '@mui/icons-material/Verified';

const useStyles = makeStylesWithTheme((theme) => ({
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1200,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    willChange: 'width', // Optimize animation performance
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
    overflow: 'hidden',
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
    flexShrink: 0, // Prevent logo from shrinking
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
    transition: 'opacity 220ms ease, transform 220ms ease',
    transform: 'translateX(0)',
    opacity: 1,
    pointerEvents: 'none', // Prevent text from capturing events
  },
  logoTextHidden: {
    opacity: 0,
    transform: 'translateX(-10px)',
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
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc',
    },
    position: 'relative',
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
    whiteSpace: 'normal',
    transition: 'opacity 220ms ease, transform 220ms ease',
    transform: 'translateX(0)',
    opacity: 1,
    pointerEvents: 'none', // Prevent text from capturing events
  },
  itemTextHidden: {
    opacity: 0,
    transform: 'translateX(-10px)',
  },
}));

const Sidebar = ({ activeStep, steps, onStepClick }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:1200px)');
  const sidebarRef = useRef(null);
  const expandTimeoutRef = useRef(null);
  const collapseTimeoutRef = useRef(null);
  
  // Detect touch device and set up click outside handler
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && expanded) {
        setExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(expandTimeoutRef.current);
      clearTimeout(collapseTimeoutRef.current);
    };
  }, [expanded]);
  
  // Icon mapping for steps
  const stepIcons = [
    <PersonIcon />,
    <SchoolIcon />,
    <ExtensionIcon />,
    <WorkIcon />,
    <CodeIcon />,
    <VerifiedIcon />,
    <SettingsIcon />
  ];
  
  // Expand sidebar on hover (desktop only)
  const handleMouseEnter = () => {
    if (isDesktop && !isTouchDevice) {
      clearTimeout(collapseTimeoutRef.current);
      expandTimeoutRef.current = setTimeout(() => {
        setExpanded(true);
      }, 100); // Slight delay to prevent accidental triggers
    }
  };
  
  // Collapse sidebar on mouse leave
  const handleMouseLeave = () => {
    if (isDesktop && !isTouchDevice) {
      clearTimeout(expandTimeoutRef.current);
      setExpanded(false);
    }
  };
  
  // Toggle sidebar for touch devices
  const handleSidebarToggle = (e) => {
    if (isTouchDevice) {
      e.stopPropagation();
      setExpanded(!expanded);
    }
  };
  
  // Handle step selection and auto-collapse
  const handleStepClick = (index, e) => {
    e.stopPropagation(); // Prevent sidebar toggle
    onStepClick(index);
    
    // Auto-collapse on step selection
    collapseTimeoutRef.current = setTimeout(() => {
      setExpanded(false);
    }, 300);
  };
  
  return (
    <Box 
      ref={sidebarRef}
      className={`${classes.sidebar} ${expanded && isDesktop ? classes.sidebarExpanded : classes.sidebarCollapsed}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isTouchDevice ? handleSidebarToggle : undefined}
    >
      {/* Logo area */}
      <Box className={classes.logoContainer}>
        <img src={GigaLogo} alt="Gigaversity Logo" className={classes.logo} />
        <Typography className={`${classes.logoText} ${(!expanded || !isDesktop) ? classes.logoTextHidden : ''}`}>
          Gigaversity
        </Typography>
      </Box>
      
      {/* Navigation items */}
      <List className={classes.navList}>
        {steps.map((label, index) => (
          <ListItem
            key={label}
            className={`${classes.listItem} ${activeStep === index ? classes.activeListItem : ''}`}
            onClick={(e) => handleStepClick(index, e)}
            button
            disableRipple
          >
            <ListItemIcon className={`${classes.listItemIcon} ${activeStep === index ? classes.activeIcon : ''}`}>
              {stepIcons[index]}
            </ListItemIcon>
            
            {/* Always show tooltip when collapsed */}
            {(!expanded || !isDesktop) && (
              <Tooltip title={label} placement="right">
                <span style={{ display: 'contents' }}></span>
              </Tooltip>
            )}
            
            {/* Always render text but control visibility with CSS */}
            <ListItemText 
              primary={label} 
              primaryTypographyProps={{ 
                className: `${classes.itemText} ${(!expanded || !isDesktop) ? classes.itemTextHidden : ''}`,
                style: { 
                  color: activeStep === index ? '#3182ce' : '#2d3748',
                  fontWeight: activeStep === index ? 600 : 500,
                } 
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;