// src/components/landing/Navbar.jsx
import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, 
  Box, Drawer, List, ListItem, ListItemText, Divider, Link
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  header: {
    backgroundColor: 'rgba(42, 43, 106, 0.95) !important',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1) !important',
    position: 'fixed !important',
    top: 0,
    zIndex: 1100,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px !important',
    minHeight: '70px !important',
    '@media (max-width: 960px)': {
      padding: '0 15px !important',
      minHeight: '60px !important',
    },
  },
  logo: {
    fontSize: '1.8rem !important',
    fontWeight: 'bold !important',
    color: '#FFC614 !important',
    textDecoration: 'none',
    cursor: 'pointer',
    '@media (max-width: 600px)': {
      fontSize: '1.5rem !important',
    },
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  navLink: {
    color: 'white !important',
    textDecoration: 'none !important',
    fontSize: '1rem !important',
    fontWeight: '500 !important',
    transition: 'color 0.3s ease !important',
    '&:hover': {
      color: '#FFC614 !important',
    },
  },
  headerCTAsignup: {
    backgroundColor: '#FFC614 !important',
    color: '#2A2B6A !important',
    padding: '8px 20px !important',
    borderRadius: '25px !important',
    fontWeight: 'bold !important',
    textTransform: 'none !important',
    transition: 'all 0.3s ease !important',
    '@media (max-width: 960px)': {
      display: 'none',
    },
    '&:hover': {
      backgroundColor: 'transparent !important',
      color: '#FFC614 !important',
      border: '2px solid #FFC614 !important',
    },
  },
  headerCTAlogin: {
    backgroundColor: 'transparent !important',
    color: '#FFC614 !important',
    padding: '8px 20px !important',
    borderRadius: '25px !important',
    fontWeight: 'bold !important',
    textTransform: 'none !important',
    border: '2px solid #FFC614 !important',
    transition: 'all 0.3s ease !important',
    '@media (max-width: 960px)': {
      display: 'none',
    },
    '&:hover': {
      backgroundColor: '#FFC614 !important',
      color: '#2A2B6A !important',
      border: '2px solid #FFC614 !important',
    },
  },
  mobileMenuButton: {
    color: 'white !important',
    display: 'none !important',
    '@media (max-width: 960px)': {
      display: 'block !important',
    },
  },
  drawer: {
    '& .MuiDrawer-paper': {
      width: '280px',
      backgroundColor: '#2A2B6A',
      color: 'white',
    },
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  drawerLink: {
    color: 'white !important',
    padding: '15px 20px !important',
    fontSize: '1.1rem !important',
    '&:hover': {
      backgroundColor: 'rgba(255, 198, 20, 0.1) !important',
    },
  },
}));

const Navbar = ({ handleCTAClick }) => {
  const classes = useStyles();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { label: 'Home', href: '#home' },
    // { label: 'Features', href: '#features' },
    // { label: 'Templates', href: '#templates' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    // Removed Login from here
  ];

  return (
    <>
      <AppBar className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            className={classes.logo}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            Gigaversity Resume Builder
          </Typography>
          
          <Box className={classes.navLinks}>
            {menuItems.map((item) =>
              item.isRoute ? (
                <Button
                  key={item.label}
                  className={classes.navLink}
                  onClick={() => navigate(item.href)}
                  sx={{ background: 'none', minWidth: 0, padding: 0 }}
                >
                  {item.label}
                </Button>
              ) : (
                <Link key={item.label} href={item.href} className={classes.navLink}>
                  {item.label}
                </Link>
              )
            )}
            <Button 
              className={classes.headerCTAsignup}
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Button>
            <Button 
              className={classes.headerCTAlogin}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>

          <IconButton
            className={classes.mobileMenuButton}
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        className={classes.drawer}
      >
        <Box className={classes.drawerHeader}>
          <Typography
            className={classes.logo}
            onClick={() => {
              toggleMobileMenu();
              navigate('/');
            }}
            style={{ cursor: 'pointer' }}
          >
            Gigaversity Resume
          </Typography>
          <IconButton onClick={toggleMobileMenu} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) =>
            item.isRoute ? (
              <ListItem
                button
                key={item.label}
                className={classes.drawerLink}
                onClick={() => {
                  toggleMobileMenu();
                  navigate(item.href);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ) : (
              <ListItem
                button
                key={item.label}
                className={classes.drawerLink}
                component="a"
                href={item.href}
                onClick={toggleMobileMenu}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            )
          )}
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '10px 0' }} />
          <ListItem>
            <Button 
              fullWidth
              variant="contained"
              onClick={() => {
                toggleMobileMenu();
                navigate('/signup');
              }}
              sx={{
                backgroundColor: '#FFC614 !important',
                color: '#2A2B6A !important',
                fontWeight: 'bold',
                borderRadius: '25px',
                mb: 1
              }}
            >
              Build Resume
            </Button>
          </ListItem>
          <ListItem>
            <Button 
              fullWidth
              variant="contained"
              onClick={() => {
                toggleMobileMenu();
                navigate('/login');
              }}
              sx={{
                backgroundColor: '#FFC614 !important',
                color: '#2A2B6A !important',
                fontWeight: 'bold',
                borderRadius: '25px',
              }}
            >
              Login
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;