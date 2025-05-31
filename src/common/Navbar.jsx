import React, { useState } from 'react';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Container,
  useMediaQuery,
  Tooltip,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TemplateIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import DataIcon from '@mui/icons-material/Storage';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FontSwitcher from '../components/FontSwitcher';

// Update src/common/Navbar.jsx styles
const useStyles = makeStylesWithTheme((theme) => ({
  appBar: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(89% - 40px)',
    maxWidth: '1400px',
    height: '60px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(39, 40, 108, 0.08)',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(39, 40, 108, 0.08)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    '&:hover': {
      boxShadow: '0 4px 16px rgba(39, 40, 108, 0.12)',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end', // Changed to align items to right
    alignItems: 'center',
    padding: '0 24px',
    height: '100%',
    minHeight: '60px',
  },
  logoContainer: {
    marginRight: 'auto', // This will push the logo to the left
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #27286c, #60cae6)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 700,
    fontSize: '12px',
    boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
  },
  logoText: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#27286c',
    letterSpacing: '-0.02em',
  },
  navButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  navButton: {
    padding: '8px 16px',
    borderRadius: '10px',
    fontWeight: 500,
    fontSize: '14px',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.15s ease-out',
    textTransform: 'none',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(39, 40, 108, 0.4)',
    },
  },
  activeNavButton: {
    background: 'linear-gradient(135deg, #27286c 0%, #233f94 100%)',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(39, 40, 108, 0.3)',
  },
  templateButton: {
    background: 'linear-gradient(135deg, #27286c, #60cae6)',
    color: 'white',
    '&:hover': {
      boxShadow: '0 8px 24px rgba(39, 40, 108, 0.4)',
    },
  },
  dummyDataButton: {
    background: '#ffc615',
    color: '#27286c',
    '&:hover': {
      background: '#ffd245',
      boxShadow: '0 8px 24px rgba(255, 198, 21, 0.4)',
    },
  },
  userButton: {
    background: 'rgba(0, 0, 0, 0.03)',
    border: '1px solid rgba(39, 40, 108, 0.08)',
    borderRadius: '12px',
    padding: '8px 12px',
    '&:hover': {
      background: 'rgba(39, 40, 108, 0.05)',
      boxShadow: '0 4px 16px rgba(39, 40, 108, 0.12)',
    },
  },
  avatar: {
    width: '28px',
    height: '28px',
    background: 'linear-gradient(135deg, #27286c, #60cae6)',
    boxShadow: '0 2px 8px rgba(39, 40, 108, 0.2)',
  },
}));

const Navbar = ({ currentPage, onTemplateClick, onLoadDummyData, hideLogo = false }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const { currentUser, logout } = useAuth();
  
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [menuHovered, setMenuHovered] = useState(false);
  
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };
  
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  const navigateTo = (path) => {
    navigate(path);
    handleMobileMenuClose();
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    handleUserMenuClose();
  };
  
  const getInitial = () => {
    return currentUser && currentUser.name 
      ? currentUser.name.charAt(0).toUpperCase() 
      : 'U';
  };

  const handleTemplateClick = () => {
    if (onTemplateClick) {
      onTemplateClick();
      handleMobileMenuClose();
    }
  };
  
  const handleLoadDummyData = () => {
    if (onLoadDummyData) {
      onLoadDummyData();
      handleMobileMenuClose();
    }
  };
  
  return (
    <AppBar className={classes.appBar}>
      <Container maxWidth="xl">
        <Toolbar className={classes.toolbar} disableGutters>
          {/* Logo Section - Always visible */}
          {!hideLogo && (
            <div className={classes.logoContainer}>
              <div className={classes.logo}>
                <Typography variant="body2" color="inherit">
                  RB
                </Typography>
              </div>
              <Typography variant="h6" className={classes.logoText}>
                Resume Builder
              </Typography>
            </div>
          )}
          
          {/* Navigation Buttons - Aligned to the right */}
          <Box className={classes.navButtons}>
            {/* Add FontSwitcher */}
            <FontSwitcher />
            
            {currentUser && (
              <>
                <Tooltip title="Create or edit your resume" arrow>
                  <Button 
                    className={`${classes.navButton} ${currentPage === 'resume-builder' ? classes.activeNavButton : ''}`}
                    onClick={() => navigateTo('/resume-builder')}
                    startIcon={<CreateIcon className={classes.buttonIcon} />}
                  >
                    Create Resume
                  </Button>
                </Tooltip>
                
                {currentPage === 'resume-builder' && (
                  <>
                    <Tooltip title="Choose a resume template" arrow>
                      <Button
                        className={classes.templateButton}
                        onClick={onTemplateClick}
                        startIcon={<TemplateIcon className={classes.buttonIcon} />}
                      >
                        Choose Template
                      </Button>
                    </Tooltip>
                    
                    <Tooltip title="Load sample resume data" arrow>
                      <Button
                        className={classes.dummyDataButton}
                        onClick={onLoadDummyData}
                        startIcon={<DataIcon className={classes.buttonIcon} />}
                      >
                        Load Demo Data
                      </Button>
                    </Tooltip>
                  </>
                )}
              </>
            )}
            
            {!currentUser && (
              <>
                <Button 
                  className={`${classes.navButton} ${currentPage === 'login' ? classes.activeNavButton : ''}`}
                  onClick={() => navigateTo('/login')}
                >
                  Log In
                </Button>
                <Button 
                  className={`${classes.navButton} ${currentPage === 'home' ? classes.activeNavButton : ''}`}
                  onClick={() => navigateTo('/')}
                >
                  Sign Up
                </Button>
              </>
            )}
            
            {currentUser && (
              <>
                <Button 
                  className={classes.userButton}
                  onClick={handleUserMenuOpen}
                  onMouseEnter={() => setMenuHovered(true)}
                  onMouseLeave={() => setMenuHovered(false)}
                >
                  <Badge 
                    variant="dot" 
                    invisible={true}
                    className={classes.notificationBadge}
                  >
                    <Avatar className={classes.avatar} style={{
                      transform: menuHovered ? 'scale(1.1)' : 'scale(1)'
                    }}>
                      {getInitial()}
                    </Avatar>
                  </Badge>
                  <Box className={classes.userInfo}>
                    <Typography className={classes.userName}>
                      {currentUser.name.split(' ')[0]}
                    </Typography>
                  </Box>
                </Button>
                {!isSmallScreen && (
                  <Tooltip title="Logout" arrow>
                    <Button 
                      className={classes.logoutButton}
                      onClick={handleLogout}
                      startIcon={<LogoutIcon />}
                    >
                      Logout
                    </Button>
                  </Tooltip>
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;