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
  Slide,
  useScrollTrigger
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TemplateIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import DataIcon from '@mui/icons-material/Storage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStylesWithTheme((theme) => ({
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0.5rem 1rem',
    '@media (max-width: 600px)': {
      padding: '0.4rem 0.75rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.3rem 0.5rem',
    },
  },
  navButtons: {
    display: 'flex',
    alignItems: 'center',
  },
  navButton: {
    textTransform: 'none',
    fontWeight: 600,
    marginLeft: '1rem',
    color: '#718096',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#3182ce',
    },
    '@media (max-width: 960px)': {
      marginLeft: '0.75rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      marginLeft: '0.5rem',
      fontSize: '0.85rem',
      padding: '0.4rem 0.6rem',
    },
  },
  activeNavButton: {
    color: '#3182ce',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0.25rem',
      left: '0.5rem',
      right: '0.5rem',
      height: '3px',
      backgroundColor: '#3182ce',
      borderRadius: '3px',
    },
  },
  templateButton: {
    textTransform: 'none',
    fontWeight: 600,
    marginLeft: '1rem',
    color: '#805ad5',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#6b46c1',
    },
    '@media (max-width: 960px)': {
      marginLeft: '0.75rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      marginLeft: '0.5rem',
      fontSize: '0.85rem',
      padding: '0.4rem 0.6rem',
    },
  },
  dummyDataButton: {
    textTransform: 'none',
    fontWeight: 600,
    marginLeft: '1rem',
    color: '#38a169',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#2f855a',
    },
    '@media (max-width: 960px)': {
      marginLeft: '0.75rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      marginLeft: '0.5rem',
      fontSize: '0.85rem',
      padding: '0.4rem 0.6rem',
    },
    // display: 'none', 
    // Hidden by default as requested
  },
  userButton: {
    textTransform: 'none',
    marginLeft: '1.5rem',
    borderRadius: '8px',
    fontWeight: 600,
    border: '1px solid #e2e8f0',
    padding: '0.25rem 0.75rem',
    backgroundColor: '#f7fafc',
    '@media (max-width: 960px)': {
      marginLeft: '1rem',
      padding: '0.25rem 0.5rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      marginLeft: '0.75rem',
      padding: '0.2rem 0.4rem',
      fontSize: '0.85rem',
    },
  },
  avatar: {
    backgroundColor: '#ebf4ff',
    color: '#3182ce',
    width: '30px',
    height: '30px',
    marginRight: '0.5rem',
    '@media (max-width: 600px)': {
      width: '26px',
      height: '26px',
      marginRight: '0.3rem',
    },
  },
  mobileMenuButton: {
    color: '#2d3748',
    padding: '0.4rem',
    '@media (max-width: 480px)': {
      padding: '0.3rem',
    },
  },
  logoutButton: {
    textTransform: 'none',
    fontWeight: 600,
    marginLeft: '1rem',
    color: '#e53e3e',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#c53030',
    },
  },
  contentOffset: {
    minHeight: '64px',
    '@media (max-width: 600px)': {
      minHeight: '56px',
    },
  },
  navbarWithSidebar: {
    paddingLeft: '64px',
    width: 'calc(100% - 64px)',
    transition: 'padding-left 0.3s ease-in-out, width 0.3s ease-in-out',
    '@media (max-width: 600px)': {
      paddingLeft: '56px',
      width: 'calc(100% - 56px)',
    },
    '@media (max-width: 480px)': {
      paddingLeft: '48px',
      width: 'calc(100% - 48px)',
    },
    '@media (max-width: 375px)': {
      paddingLeft: '42px',
      width: 'calc(100% - 42px)',
    },
  },
  buttonIcon: {
    marginRight: '0.5rem',
    '@media (max-width: 600px)': {
      marginRight: '0.3rem',
      fontSize: '1.1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    },
  },
  menuItem: {
    '@media (max-width: 480px)': {
      minHeight: '40px',
      fontSize: '0.9rem',
    },
  },
  menuItemIcon: {
    marginRight: '0.5rem',
    '@media (max-width: 600px)': {
      marginRight: '0.4rem',
      fontSize: '1.2rem',
    },
    '@media (max-width: 480px)': {
      marginRight: '0.3rem',
      fontSize: '1.1rem',
    },
  },
}));

// Hide on scroll functionality
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = ({ currentPage, onTemplateClick, onLoadDummyData, hideLogo = false }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const { currentUser, logout } = useAuth();
  
  // States for mobile menu and user menu
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  
  // Menu handlers
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
  
  // Navigation handlers
  const navigateTo = (path) => {
    navigate(path);
    handleMobileMenuClose();
  };
  
  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
    handleUserMenuClose();
  };
  
  // Get first letter of user's name for avatar
  const getInitial = () => {
    return currentUser && currentUser.name 
      ? currentUser.name.charAt(0).toUpperCase() 
      : 'U';
  };

  // Handle template button click
  const handleTemplateClick = () => {
    if (onTemplateClick) {
      onTemplateClick();
      handleMobileMenuClose();
    }
  };
  
  // Handle load dummy data button click
  const handleLoadDummyData = () => {
    if (onLoadDummyData) {
      onLoadDummyData();
      handleMobileMenuClose();
    }
  };
  
  return (
    <>
      <AppBar 
        position="fixed" 
        className={`${classes.appBar} ${hideLogo ? classes.navbarWithSidebar : ''}`} 
        elevation={2}
      >
        <Container maxWidth="xl">
          <Toolbar className={classes.toolbar} disableGutters>
            {/* Desktop Navigation */}
            {!isSmallScreen && (
              <Box className={classes.navButtons}>
                {/* Navigation Links - Shown only when user is logged in */}
                {currentUser && (
                  <>
                    <Button 
                      className={`${classes.navButton} ${currentPage === 'resume-builder' ? classes.activeNavButton : ''}`}
                      onClick={() => navigateTo('/resume-builder')}
                      startIcon={<CreateIcon className={classes.buttonIcon} />}
                    >
                      Create Resume
                    </Button>
                    
                    {/* Add Choose Template and Load Demo buttons when on resume-builder */}
                    {currentPage === 'resume-builder' && (
                      <>
                        <Button
                          className={classes.templateButton}
                          onClick={onTemplateClick}
                          startIcon={<TemplateIcon className={classes.buttonIcon} />}
                        >
                          Choose Template
                        </Button>
                        <Button
                          className={classes.dummyDataButton}
                          onClick={onLoadDummyData}
                          startIcon={<DataIcon className={classes.buttonIcon} />}
                        >
                          Load Demo Data
                        </Button>
                      </>
                    )}
                  </>
                )}
                
                {/* Login/Register Buttons - Shown when user is not logged in */}
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
                
                {/* User Button - Shown when user is logged in */}
                {currentUser && (
                  <Button 
                    className={classes.userButton}
                    onClick={handleUserMenuOpen}
                    startIcon={
                      <Avatar className={classes.avatar}>
                        {getInitial()}
                      </Avatar>
                    }
                  >
                    {currentUser.name.split(' ')[0]}
                  </Button>
                )}
              </Box>
            )}
            
            {/* Mobile Navigation */}
            {isSmallScreen && (
              <>
                <IconButton
                  edge="end"
                  className={classes.mobileMenuButton}
                  onClick={handleMobileMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                
                {/* Mobile Menu */}
                <Menu
                  anchorEl={mobileMenuAnchor}
                  open={Boolean(mobileMenuAnchor)}
                  onClose={handleMobileMenuClose}
                  keepMounted
                >
                  {!currentUser ? (
                    // Menu items for logged out users
                    <>
                      <MenuItem onClick={() => navigateTo('/login')} className={classes.menuItem}>
                        Log In
                      </MenuItem>
                      <MenuItem onClick={() => navigateTo('/')} className={classes.menuItem}>
                        Sign Up
                      </MenuItem>
                    </>
                  ) : (
                    // Menu items for logged in users
                    <>
                      <MenuItem onClick={() => navigateTo('/resume-builder')} className={classes.menuItem}>
                        <CreateIcon fontSize="small" className={classes.menuItemIcon} />
                        Create Resume
                      </MenuItem>
                      {currentPage === 'resume-builder' && (
                        <>
                          <MenuItem onClick={handleTemplateClick} className={classes.menuItem}>
                            <TemplateIcon fontSize="small" className={classes.menuItemIcon} />
                            Choose Template
                          </MenuItem>
                          <MenuItem onClick={handleLoadDummyData} className={classes.menuItem}>
                            <DataIcon fontSize="small" className={classes.menuItemIcon} />
                            Load Demo Data
                          </MenuItem>
                        </>
                      )}
                      <MenuItem onClick={handleLogout} className={classes.menuItem}>
                        Logout
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </>
            )}
            
            {/* User Menu */}
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              keepMounted
            >
              {/* <MenuItem className={classes.menuItem}>
                <AccountCircleIcon fontSize="small" className={classes.menuItemIcon} />
                My Profile
              </MenuItem> */}
              <MenuItem onClick={handleLogout} className={classes.menuItem}>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Add spacing to prevent content from being hidden under the fixed navbar */}
      <div className={classes.contentOffset} />
    </>
  );
};

export default Navbar;