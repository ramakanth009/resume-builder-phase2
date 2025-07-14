import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
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
import GavelIcon from '@mui/icons-material/Gavel'; // Added for Terms & Policies

// Update src/common/Sidebar.jsx styles
const useStyles = makeStylesWithTheme((theme) => ({
  sidebar: {
    position: 'fixed',
    left: '0',
    top: '70px',
    height: 'calc(103vh - 100px)',
    width: '230px',
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
    padding: '1.5rem',
    borderBottom: '1px solid rgba(39, 40, 108, 0.08)',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#233f94',
  },
  navList: {
    padding: '1rem',
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
    padding: '0.5rem 1rem', // Reduced vertical padding
    borderRadius: '12px',
    marginBottom: '0.25rem', // Reduced gap between items
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(39, 40, 108, 0.05)',
      transform: 'translateX(4px)',
    },
  },
  activeListItem: {
    background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(167, 139, 250, 0.1))',
    borderLeft: '3px solid #14b8a6',
    paddingLeft: 'calc(1rem - 3px)',
  },
  listItemIcon: {
    minWidth: '40px',
    color: '#427bbf',
    fontSize: '1.2rem',
  },
  activeIcon: {
    color: '#14b8a6',
  },
  itemText: {
    fontWeight: 500,
    color: '#233f94',
    fontSize: '0.9rem',
  },
  footerText: {
    fontSize: '0.75rem',
    color: '#427bbf',
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px solid rgba(39, 40, 108, 0.08)',
  },
}));

// Section slug mapping for URL routing
const SECTION_SLUGS = {
  'personal-info': 0,
  'social-links': 1,
  'education': 2,
  'skills': 3,
  'ai-skills': 4,
  'projects': 5,
  'experience': 6,
  'certifications': 7,
  'custom-sections': 8,
  // 'terms-policies': 9,
};

const SLUG_TO_SECTION = {
  0: 'personal-info',
  1: 'social-links',
  2: 'education',
  3: 'skills',
  4: 'ai-skills',
  5: 'projects',
  6: 'experience',
  7: 'certifications',
  8: 'custom-sections',
  // 9: 'terms-policies',
};

const Sidebar = ({ activeStep, steps, onStepClick }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { resumeId, section } = useParams();
  const location = useLocation();

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
    <SettingsIcon />,            // Custom Sections
    <GavelIcon />,               // Terms & Policies (changed icon)
  ];

  // Handle section navigation
  const handleSectionClick = (stepIndex) => {
    const newSection = SLUG_TO_SECTION[stepIndex];
    if (newSection) {
      const basePath = resumeId 
        ? `/resume-builder/edit/${resumeId}` 
        : '/resume-builder';
      navigate(`${basePath}/${newSection}`);
    }
    
    // Also call the original onStepClick if provided (for backward compatibility)
    if (onStepClick) {
      onStepClick(stepIndex);
    }
  };

  // Get current active step from URL
  const getCurrentActiveStep = () => {
    if (!section || !(section in SECTION_SLUGS)) {
      return 0; // Default to first section
    }
    return SECTION_SLUGS[section];
  };

  const currentActiveStep = getCurrentActiveStep();

  return (
    <Box className={classes.sidebar}>
      {/* Header area */}
      {/* <Box className={classes.logoContainer}>
        <Typography className={classes.sectionTitle}>
          Resume Sections
        </Typography>
      </Box> */}
      
      {/* Navigation items */}
      <List className={classes.navList}>
        {steps.map((label, index) => (
          <ListItem
            key={label}
            className={`${classes.listItem} ${currentActiveStep === index ? classes.activeListItem : ''}`}
            onClick={() => handleSectionClick(index)}
            button
            disableRipple
          >
            <ListItemIcon className={`${classes.listItemIcon} ${currentActiveStep === index ? classes.activeIcon : ''}`}>
              {stepIcons[index]}
            </ListItemIcon>
            
            <ListItemText 
              primary={label}
              primaryTypographyProps={{ 
                className: classes.itemText,
                style: { 
                  color: currentActiveStep === index ? '#3182ce' : '#2d3748',
                  fontWeight: currentActiveStep === index ? 600 : 500,
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