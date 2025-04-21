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
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStylesWithTheme((theme) => ({
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
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
    cursor: 'pointer',
  },
  logoIcon: {
    marginRight: '0.5rem',
    color: '#3182ce',
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
}));

const Navbar = ({ currentPage }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  
  // Get user from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    handleUserMenuClose();
  };
  
  // Get first letter of user's name for avatar
  const getInitial = () => {
    return user && user.name ? user.name.charAt(0).toUpperCase() : 'U';
  };
  
  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar className={classes.toolbar} disableGutters>
          {/* Logo */}
          <Box className={classes.logo} onClick={() => navigateTo('/')}>
            <DescriptionIcon className={classes.logoIcon} />
            <Typography variant="h6" className={classes.logoText}>
              ResumeBuilder
            </Typography>
          </Box>
          
          {/* Desktop Navigation */}
          {!isSmallScreen && (
            <Box className={classes.navButtons}>
              {/* Navigation Links - Shown only when user is logged in */}
              {user && (
                <>
                  <Button 
                    className={`${classes.navButton} ${currentPage === 'resume-builder' ? classes.activeNavButton : ''}`}
                    onClick={() => navigateTo('/resume-builder')}
                  >
                    Create Resume
                  </Button>
                  
                  {/* Add more navigation buttons here as needed */}
                </>
              )}
              
              {/* Login/Register Buttons - Shown when user is not logged in */}
              {!user && (
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
              {user && (
                <Button 
                  className={classes.userButton}
                  onClick={handleUserMenuOpen}
                  startIcon={
                    <Avatar className={classes.avatar}>
                      {getInitial()}
                    </Avatar>
                  }
                >
                  {user.name.split(' ')[0]} {/* Display only first name */}
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
                {!user ? (
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
                      Create Resume
                    </MenuItem>
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
  );
};

export default Navbar;