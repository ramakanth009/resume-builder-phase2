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
import VerifiedIcon from '@mui/icons-material/Verified';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const useStyles = makeStylesWithTheme((theme) => ({
  sidebar: {
    position: 'fixed',
    left: '0',
    top: '90px',
    height: 'calc(100vh - 100px)',
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
    '@media (max-width: 1200px)': {
      width: (props) => props.isCollapsed ? '65px' : '240px',
      top: '85px',
      height: 'calc(100vh - 95px)',
    },
    '@media (max-width: 960px)': {
      transform: 'translateX(-100%)',
      '&.show': {
        transform: 'translateX(0)',
      },
      width: (props) => props.isCollapsed ? '60px' : '220px',
      top: '80px',
      height: 'calc(100vh - 90px)',
    },
    '@media (max-width: 768px)': {
      transform: 'translateX(-100%)',
      '&.show': {
        transform: 'translateX(0)',
      },
      width: (props) => props.isCollapsed ? '55px' : '200px',
      top: '75px',
      height: 'calc(100vh - 85px)',
    },
    '@media (max-width: 600px)': {
      width: (props) => props.isCollapsed ? '50px' : '180px',
      top: '70px',
      height: 'calc(100vh - 80px)',
    },
    '@media (max-width: 480px)': {
      width: (props) => props.isCollapsed ? '45px' : '160px',
      top: '65px',
      height: 'calc(100vh - 75px)',
    },
    '@media (max-width: 375px)': {
      width: (props) => props.isCollapsed ? '40px' : '140px',
      top: '60px',
      height: 'calc(100vh - 70px)',
    },
  },
  sidebarHeader: {
    padding: (props) => props.isCollapsed ? '1rem 0.5rem' : '1.5rem',
    borderBottom: '1px solid rgba(39, 40, 108, 0.08)',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: (props) => props.isCollapsed ? 'center' : 'space-between',
    position: 'relative',
    '@media (max-width: 1200px)': {
      height: '75px',
      padding: (props) => props.isCollapsed ? '0.9rem 0.4rem' : '1.3rem',
    },
    '@media (max-width: 960px)': {
      height: '70px',
      padding: (props) => props.isCollapsed ? '0.8rem 0.3rem' : '1.2rem',
    },
    '@media (max-width: 600px)': {
      height: '65px',
      padding: (props) => props.isCollapsed ? '0.7rem 0.25rem' : '1rem',
    },
    '@media (max-width: 480px)': {
      height: '60px',
      padding: (props) => props.isCollapsed ? '0.6rem 0.2rem' : '0.9rem',
    },
    '@media (max-width: 375px)': {
      height: '55px',
      padding: (props) => props.isCollapsed ? '0.5rem 0.15rem' : '0.8rem',
    },
  },
  sidebarTitle: {
    opacity: (props) => props.isCollapsed ? 0 : 1,
    transform: (props) => props.isCollapsed ? 'translateX(-10px)' : 'translateX(0)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#27286c',
    whiteSpace: 'nowrap',
    '@media (max-width: 1200px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.95rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.8rem',
    },
  },
  toggleButton: {
    position: (props) => props.isCollapsed ? 'static' : 'absolute',
    right: (props) => props.isCollapsed ? 'auto' : '8px',
    top: (props) => props.isCollapsed ? 'auto' : '50%',
    transform: (props) => props.isCollapsed ? 'none' : 'translateY(-50%)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    width: '32px',
    height: '32px',
    backgroundColor: 'rgba(39, 40, 108, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(39, 40, 108, 0.2)',
    },
    '@media (max-width: 1200px)': {
      width: '30px',
      height: '30px',
      right: (props) => props.isCollapsed ? 'auto' : '6px',
    },
    '@media (max-width: 960px)': {
      width: '28px',
      height: '28px',
      right: (props) => props.isCollapsed ? 'auto' : '5px',
    },
    '@media (max-width: 600px)': {
      width: '26px',
      height: '26px',
      right: (props) => props.isCollapsed ? 'auto' : '4px',
    },
    '@media (max-width: 480px)': {
      width: '24px',
      height: '24px',
      right: (props) => props.isCollapsed ? 'auto' : '3px',
    },
    '@media (max-width: 375px)': {
      width: '22px',
      height: '22px',
      right: (props) => props.isCollapsed ? 'auto' : '2px',
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
    '@media (max-width: 1200px)': {
      padding: (props) => props.isCollapsed ? '0.4rem 0.2rem' : '0.9rem',
    },
    '@media (max-width: 960px)': {
      padding: (props) => props.isCollapsed ? '0.3rem 0.15rem' : '0.8rem',
    },
    '@media (max-width: 600px)': {
      padding: (props) => props.isCollapsed ? '0.25rem 0.1rem' : '0.7rem',
    },
    '@media (max-width: 480px)': {
      padding: (props) => props.isCollapsed ? '0.2rem 0.08rem' : '0.6rem',
    },
    '@media (max-width: 375px)': {
      padding: (props) => props.isCollapsed ? '0.15rem 0.05rem' : '0.5rem',
    },
  },
  listItem: {
    padding: (props) => props.isCollapsed ? '0.5rem 0.25rem' : '0.30rem 1rem',
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
    '@media (max-width: 1200px)': {
      padding: (props) => props.isCollapsed ? '0.4rem 0.2rem' : '0.25rem 0.9rem',
      minHeight: (props) => props.isCollapsed ? '38px' : '44px',
      marginBottom: '0.4rem',
    },
    '@media (max-width: 960px)': {
      padding: (props) => props.isCollapsed ? '0.35rem 0.15rem' : '0.2rem 0.8rem',
      minHeight: (props) => props.isCollapsed ? '36px' : '40px',
      marginBottom: '0.3rem',
    },
    '@media (max-width: 600px)': {
      padding: (props) => props.isCollapsed ? '0.3rem 0.1rem' : '0.15rem 0.7rem',
      minHeight: (props) => props.isCollapsed ? '34px' : '36px',
      marginBottom: '0.25rem',
    },
    '@media (max-width: 480px)': {
      padding: (props) => props.isCollapsed ? '0.25rem 0.08rem' : '0.1rem 0.6rem',
      minHeight: (props) => props.isCollapsed ? '32px' : '34px',
      marginBottom: '0.2rem',
    },
    '@media (max-width: 375px)': {
      padding: (props) => props.isCollapsed ? '0.2rem 0.05rem' : '0.08rem 0.5rem',
      minHeight: (props) => props.isCollapsed ? '30px' : '32px',
      marginBottom: '0.15rem',
    },
  },
  activeListItem: {
    background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(167, 139, 250, 0.1))',
    borderLeft: (props) => props.isCollapsed ? 'none' : '3px solid #14b8a6',
    paddingLeft: (props) => props.isCollapsed ? '0.5rem' : 'calc(1rem - 3px)',
    border: (props) => props.isCollapsed ? '2px solid #14b8a6' : 'none',
    '@media (max-width: 1200px)': {
      paddingLeft: (props) => props.isCollapsed ? '0.4rem' : 'calc(0.9rem - 3px)',
    },
    '@media (max-width: 960px)': {
      paddingLeft: (props) => props.isCollapsed ? '0.35rem' : 'calc(0.8rem - 3px)',
    },
    '@media (max-width: 600px)': {
      paddingLeft: (props) => props.isCollapsed ? '0.3rem' : 'calc(0.7rem - 3px)',
    },
    '@media (max-width: 480px)': {
      paddingLeft: (props) => props.isCollapsed ? '0.25rem' : 'calc(0.6rem - 3px)',
    },
    '@media (max-width: 375px)': {
      paddingLeft: (props) => props.isCollapsed ? '0.2rem' : 'calc(0.5rem - 3px)',
    },
  },
  listItemIcon: {
    minWidth: (props) => props.isCollapsed ? 'auto' : '40px',
    color: '#427bbf',
    fontSize: '1.2rem',
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 1200px)': {
      minWidth: (props) => props.isCollapsed ? 'auto' : '36px',
      fontSize: '1.1rem',
    },
    '@media (max-width: 960px)': {
      minWidth: (props) => props.isCollapsed ? 'auto' : '32px',
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      minWidth: (props) => props.isCollapsed ? 'auto' : '28px',
      fontSize: '0.95rem',
    },
    '@media (max-width: 480px)': {
      minWidth: (props) => props.isCollapsed ? 'auto' : '24px',
      fontSize: '0.9rem',
    },
    '@media (max-width: 375px)': {
      minWidth: (props) => props.isCollapsed ? 'auto' : '20px',
      fontSize: '0.85rem',
    },
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
    '@media (max-width: 1200px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.65rem',
    },
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
    '@media (max-width: 1200px)': {
      fontSize: '0.75rem',
      padding: '5px 10px',
      marginLeft: '10px',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.7rem',
      padding: '4px 8px',
      marginLeft: '8px',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.65rem',
      padding: '3px 6px',
      marginLeft: '6px',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.6rem',
      padding: '2px 4px',
      marginLeft: '4px',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.55rem',
      padding: '2px 3px',
      marginLeft: '3px',
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
    '@media (max-width: 1200px)': {
      fontSize: '0.7rem',
      padding: (props) => props.isCollapsed ? '0.9rem 0.4rem' : '0.9rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.65rem',
      padding: (props) => props.isCollapsed ? '0.8rem 0.3rem' : '0.8rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.6rem',
      padding: (props) => props.isCollapsed ? '0.7rem 0.25rem' : '0.7rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.55rem',
      padding: (props) => props.isCollapsed ? '0.6rem 0.2rem' : '0.6rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.5rem',
      padding: (props) => props.isCollapsed ? '0.5rem 0.15rem' : '0.5rem',
    },
  },
}));

const Sidebar = ({ activeStep, steps, onStepClick, onSidebarToggle }) => {
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
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    setHoveredItem(null);
    
    // Notify parent component about sidebar state change
    if (onSidebarToggle) {
      onSidebarToggle(newCollapsedState);
    }
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
      {/* Header area - simplified without logo */}
      <Box className={classes.sidebarHeader}>
        {!isCollapsed && (
          <Typography className={classes.sidebarTitle}>
            Resume Sections
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