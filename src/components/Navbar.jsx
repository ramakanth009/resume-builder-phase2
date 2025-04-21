import React, { useState } from 'react';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';

const useStyles = makeStylesWithTheme((theme) => ({
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    color: '#3182ce',
    fontWeight: 700,
    cursor: 'pointer',
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
  },
  navButton: {
    marginLeft: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    color: '#718096',
    '&.active': {
      color: '#3182ce',
    },
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#3182ce',
    },
  },
  userButton: {
    marginLeft: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    color: '#2d3748',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#3182ce',
    },
  },
  menuButton: {
    marginRight: '1rem',
    color: '#3182ce',
  },
  userMenuButton: {
    marginLeft: '0.5rem',
    color: '#3182ce',
  },
  icon: {
    marginRight: '0.5rem',
  },
  logoutButton: {
    color: '#e53e3e',
  },
}));

const Navbar = ({ currentPage }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  
  // Get user from localStorage (if authenticated)
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  // State for mobile menu
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchor);
  
  // State for user menu
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const isUserMenuOpen = Boolean(userMenuAnchor);
  
  // Handle mobile menu open
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };
  
  // Handle mobile menu close
  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };
  
  // Handle user menu open
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  // Handle user menu close
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  // Handle navigation
  const handleNavigate = (path) => {
    navigate(path);
    handleMobileMenuClose();
    handleUserMenuClose();
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleUserMenuClose();
    navigate('/login');
  };
  
  return (
    <AppBar position="static" className={classes.appBar} color="default">
      <Toolbar className={classes.toolbar}>
        {/* Logo */}
        <div className={classes.logoContainer}>
          <Typography 
            variant="h6" 
            className={classes.logo}
            onClick={() => handleNavigate('/')}
          >
            Student Resume Builder
          </Typography>
        </div>
        
        {/* Navigation items */}
        {isMobile ? (
          <>
            <IconButton
              className={classes.menuButton}
              onClick={handleMobileMenuOpen}
              size="large"
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            
            <Menu
              anchorEl={mobileMenuAnchor}
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
            >
              {isAuthenticated ? (
                [
                  <MenuItem key="builder" onClick={() => handleNavigate('/resume-builder')}>
                    <DescriptionIcon className={classes.icon} /> Resume Builder
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout} className={classes.logoutButton}>
                    <LogoutIcon className={classes.icon} /> Logout
                  </MenuItem>
                ]
              ) : (
                [
                  <MenuItem key="register" onClick={() => handleNavigate('/')}>
                    Register
                  </MenuItem>,
                  <MenuItem key="login" onClick={() => handleNavigate('/login')}>
                    Login
                  </MenuItem>
                ]
              )}
            </Menu>
          </>
        ) : (
          <div className={classes.navItems}>
            {isAuthenticated ? (
              <>
                <Button 
                  className={`${classes.navButton} ${currentPage === 'resume-builder' ? 'active' : ''}`}
                  onClick={() => handleNavigate('/resume-builder')}
                >
                  Resume Builder
                </Button>
                
                <Box display="flex" alignItems="center">
                  <Button 
                    className={classes.userButton}
                    onClick={handleUserMenuOpen}
                    endIcon={<AccountCircleIcon />}
                  >
                    {user ? user.name : 'User'}
                  </Button>
                  
                  <Menu
                    anchorEl={userMenuAnchor}
                    open={isUserMenuOpen}
                    onClose={handleUserMenuClose}
                  >
                    <MenuItem onClick={handleLogout} className={classes.logoutButton}>
                      <LogoutIcon className={classes.icon} /> Logout
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Button 
                  className={`${classes.navButton} ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavigate('/')}
                >
                  Register
                </Button>
                <Button 
                  className={`${classes.navButton} ${currentPage === 'login' ? 'active' : ''}`}
                  onClick={() => handleNavigate('/login')}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;