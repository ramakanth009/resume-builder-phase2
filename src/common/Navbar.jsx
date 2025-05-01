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
import CreateIcon from '@mui/icons-material/Create'; // Added icon for "Create Resume"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GigaLogo from '../assets/giga-loogo.svg'; // Keep the import

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
    justifyContent: 'space-between',
    padding: '0.5rem 1rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    color: '#2d3748',
    textDecoration: 'none',
    // cursor: 'pointer',
  },
  logoIcon: {
    marginRight: '0.5rem',
    color: '#3182ce',
    width: '32px', // Add this line to control logo size
  },
  logoText: {
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#2d3748',
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
  },
  userButton: {
    textTransform: 'none',
    marginLeft: '1.5rem',
    borderRadius: '8px',
    fontWeight: 600,
    border: '1px solid #e2e8f0',
    padding: '0.25rem 0.75rem',
    backgroundColor: '#f7fafc',
  },
  avatar: {
    backgroundColor: '#ebf4ff',
    color: '#3182ce',
    width: '30px',
    height: '30px',
    marginRight: '0.5rem',
  },
  mobileMenuButton: {
    color: '#2d3748',
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
    minHeight: '20px', // Match the height of your AppBar
  },
}));

// Hide on scroll functionality
function HideOnScroll(props) {
  const { children } = props;
  // Note: this trigger is reversed - we want to show on scroll down
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200, // Show after scrolling more than 200px
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = ({ currentPage, onTemplateClick, onLoadDummyData }) => {
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
    }
  };
  
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} elevation={2}>
        <Container maxWidth="xl">
          <Toolbar className={classes.toolbar} disableGutters>
            {/* Company Logo */}
            <Box className={classes.logo}>
              <img src={GigaLogo} alt="Gigaversity Logo" style={{ width: '32px' }} className={classes.logoIcon} />
              <Typography variant="h6" className={classes.logoText}>
                Gigaversity
              </Typography>
            </Box>
            
            {/* Desktop Navigation */}
            {!isSmallScreen && (
              <Box className={classes.navButtons}>
                {/* Navigation Links - Shown only when user is logged in */}
                {currentUser && (
                  <>
                    <Button 
                      className={`${classes.navButton} ${currentPage === 'resume-builder' ? classes.activeNavButton : ''}`}
                      onClick={() => navigateTo('/resume-builder')}
                      startIcon={<CreateIcon />} // Added Create icon here
                    >
                      Create Resume
                    </Button>
                    
                    {/* Add Choose Template and Load Demo buttons when on resume-builder */}
                    {currentPage === 'resume-builder' && (
                      <>
                        <Button
                          className={classes.templateButton}
                          onClick={onTemplateClick}
                          startIcon={<TemplateIcon />}
                        >
                          Choose Template
                        </Button>
                        <Button
                          className={classes.templateButton}
                          onClick={onLoadDummyData}
                          startIcon={<TemplateIcon />}
                        >
                          Load Demo Data
                        </Button>
                      </>
                    )}
                    
                    {/* Add more navigation buttons here as needed */}
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
                    {currentUser.name.split(' ')[0]} {/* Display only first name */}
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
                      <MenuItem onClick={() => navigateTo('/login')}>
                        Log In
                      </MenuItem>
                      <MenuItem onClick={() => navigateTo('/')}>
                        Sign Up
                      </MenuItem>
                    </>
                  ) : (
                    // Menu items for logged in users
                    <>
                      <MenuItem onClick={() => navigateTo('/resume-builder')}>
                        <CreateIcon fontSize="small" style={{ marginRight: '0.5rem' }} />
                        Create Resume
                      </MenuItem>
                      {/* Add Choose Template and Load Demo to mobile menu */}
                      {currentPage === 'resume-builder' && (
                        <>
                          <MenuItem onClick={onTemplateClick}>
                            <TemplateIcon fontSize="small" style={{ marginRight: '0.5rem' }} />
                            Choose Template
                          </MenuItem>
                          <MenuItem onClick={onLoadDummyData}>
                            <TemplateIcon fontSize="small" style={{ marginRight: '0.5rem' }} />
                            Load Demo Data
                          </MenuItem>
                        </>
                      )}
                      <MenuItem onClick={handleLogout}>
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
              <MenuItem>
                <AccountCircleIcon fontSize="small" style={{ marginRight: '0.5rem' }} />
                My Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
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