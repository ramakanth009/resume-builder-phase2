import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// Update src/common/Sidebar.jsx styles
const useStyles = makeStylesWithTheme((theme) => ({
  sidebar: {
    position: 'fixed',
    left: '0',
    top: '100px',
    height: 'calc(97vh - 100px)',
    width: (props) => props.isCollapsed ? '70px' : '280px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderRight: '1px solid rgba(39, 40, 108, 0.08)',
    borderRadius: '0 20px 20px 0',
    boxShadow: '4px 0 16px rgba(39, 40, 108, 0.08)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 900,
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 768px)': {
      transform: 'translateX(-100%)',
      '&.show': {
        transform: 'translateX(0)',
      },
    },
  },
  logoContainer: {
    padding: (props) => props.isCollapsed ? '1rem 0.5rem' : '1.5rem',
    borderBottom: '1px solid rgba(39, 40, 108, 0.08)',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
  },
  logo: {
    width: (props) => props.isCollapsed ? '32px' : '40px',
    height: (props) => props.isCollapsed ? '32px' : '40px',
    background: 'linear-gradient(135deg, #27286c, #60cae6)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
    flexShrink: 0,
  },
  logoText: {
    opacity: (props) => props.isCollapsed ? 0 : 1,
    transform: (props) => props.isCollapsed ? 'translateX(-10px)' : 'translateX(0)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#27286c',
    whiteSpace: 'nowrap',
  },
  toggleButton: {
    position: 'absolute',
    right: (props) => props.isCollapsed ? '50%' : '8px',
    top: '50%',
    transform: (props) => props.isCollapsed ? 'translate(50%, -50%)' : 'translateY(-50%)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    width: '32px',
    height: '32px',
    backgroundColor: 'rgba(39, 40, 108, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(39, 40, 108, 0.2)',
    },
  },
  navList: {
    padding: (props) => props.isCollapsed ? '0.5rem 0.25rem' : '1rem',
    flexGrow: 1,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(39, 40, 108, 0.2)',
      borderRadius: '3px',
    },
  },
  listItem: {
    padding: (props) => props.isCollapsed ? '0.5rem 0.25rem' : '0.75rem 1rem',
    borderRadius: '12px',
    marginBottom: '0.5rem',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    minHeight: (props) => props.isCollapsed ? '40px' : '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: (props) => props.isCollapsed ? 'center' : 'flex-start',
    position: 'relative',
    '&:hover': {
      background: 'rgba(39, 40, 108, 0.05)',
      transform: (props) => props.isCollapsed ? 'scale(1.05)' : 'translateX(4px)',
    },
  },
  activeListItem: {
    background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(167, 139, 250, 0.1))',
    borderLeft: (props) => props.isCollapsed ? 'none' : '3px solid #14b8a6',
    paddingLeft: (props) => props.isCollapsed ? '0.5rem' : 'calc(1rem - 3px)',
    border: (props) => props.isCollapsed ? '2px solid #14b8a6' : 'none',
  },
  listItemIcon: {
    minWidth: (props) => props.isCollapsed ? 'auto' : '40px',
    color: '#427bbf',
    fontSize: '1.2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  activeIcon: {
    color: '#14b8a6',
  },
  itemText: {
    fontWeight: 500,
    color: '#233f94',
    fontSize: '0.9rem',
    opacity: (props) => props.isCollapsed ? 0 : 1,
    transform: (props) => props.isCollapsed ? 'translateX(-10px)' : 'translateX(0)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
  },
  tooltip: {
    position: 'absolute',
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(39, 40, 108, 0.9)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    marginLeft: '12px',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    '&::before': {
      content: '""',
      position: 'absolute',
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      border: '4px solid transparent',
      borderRightColor: 'rgba(39, 40, 108, 0.9)',
    },
  },
  showTooltip: {
    opacity: 1,
  },
  footerText: {
    fontSize: '0.75rem',
    color: '#427bbf',
    textAlign: 'center',
    padding: (props) => props.isCollapsed ? '1rem 0.5rem' : '1rem',
    borderTop: '1px solid rgba(39, 40, 108, 0.08)',
    opacity: (props) => props.isCollapsed ? 0 : 1,
    transform: (props) => props.isCollapsed ? 'translateY(10px)' : 'translateY(0)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}));

const Sidebar = ({ activeStep, steps, onStepClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const classes = useStyles({ isCollapsed });

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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setHoveredItem(null); // Clear hover state when toggling
  };

  const handleItemClick = (index) => {
    onStepClick(index);
  };

  const handleItemHover = (index) => {
    if (isCollapsed) {
      setHoveredItem(index);
    }
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  return (
    <Box className={classes.sidebar}>
      {/* Logo area */}
      <Box className={classes.logoContainer}>
        <img src={GigaLogo} alt="Gigaversity Logo" className={classes.logo} />
        {!isCollapsed && (
          <Typography className={classes.logoText}>
            Gigaversity
          </Typography>
        )}
        <IconButton
          className={classes.toggleButton}
          onClick={toggleSidebar}
          size="small"
        >
          {isCollapsed ? <MenuIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
        </IconButton>
      </Box>
      
      {/* Navigation items */}
      <List className={classes.navList}>
        {steps.map((label, index) => (
          <ListItem
            key={label}
            className={`${classes.listItem} ${activeStep === index ? classes.activeListItem : ''}`}
            onClick={() => handleItemClick(index)}
            onMouseEnter={() => handleItemHover(index)}
            onMouseLeave={handleItemLeave}
            button
            disableRipple
          >
            <ListItemIcon className={`${classes.listItemIcon} ${activeStep === index ? classes.activeIcon : ''}`}>
              {stepIcons[index]}
            </ListItemIcon>
            
            {!isCollapsed && (
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

            {/* Tooltip for collapsed mode */}
            {isCollapsed && (
              <Box 
                className={`${classes.tooltip} ${hoveredItem === index ? classes.showTooltip : ''}`}
              >
                {label}
              </Box>
            )}
          </ListItem>
        ))}
      </List>
      
      {/* Footer text */}
      {!isCollapsed && (
        <Typography className={classes.footerText}>
          Resume Builder v1.0 (beta)
        </Typography>
      )}
    </Box>
  );
};

export default Sidebar;