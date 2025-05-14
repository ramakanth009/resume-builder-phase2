// import React, { useState, useEffect } from 'react';
// import makeStylesWithTheme from '../styles/makeStylesAdapter';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   Avatar,
//   Box,
//   Container,
//   useMediaQuery,
//   Slide,
//   useScrollTrigger,
//   Tooltip,
//   Badge
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import TemplateIcon from '@mui/icons-material/Dashboard';
// import CreateIcon from '@mui/icons-material/Create';
// import DataIcon from '@mui/icons-material/Storage';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const useStyles = makeStylesWithTheme((theme) => ({
//   appBar: {
//     backgroundColor: '#ffffff',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//     position: 'fixed',
//     top: 0,
//     width: '100%',
//     zIndex: 1000,
//   },
//   toolbar: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     padding: '0.5rem 1rem',
//     '@media (max-width: 600px)': {
//       padding: '0.4rem 0.75rem',
//     },
//   },
//   navButtons: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   navButton: {
//     textTransform: 'none',
//     fontWeight: 600,
//     marginLeft: '1rem',
//     color: '#718096',
//     borderRadius: '8px',
//     padding: '0.5rem 1rem',
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       backgroundColor: '#f7fafc',
//       color: '#3182ce',
//       transform: 'translateY(-2px)',
//       boxShadow: '0 2px 5px rgba(49, 130, 206, 0.1)',
//       '& .MuiSvgIcon-root': {
//         transform: 'scale(1.1)',
//       },
//     },
//     '@media (max-width: 960px)': {
//       marginLeft: '0.75rem',
//       fontSize: '0.9rem',
//     },
//   },
//   activeNavButton: {
//     color: '#3182ce',
//     backgroundColor: '#ebf8ff',
//     position: 'relative',
//     fontWeight: 700,
//     '&::after': {
//       content: '""',
//       position: 'absolute',
//       bottom: '0',
//       left: '10%',
//       width: '80%',
//       height: '3px',
//       backgroundColor: '#3182ce',
//       borderRadius: '3px',
//       transition: 'all 0.3s ease',
//     },
//     '&:hover': {
//       backgroundColor: '#ebf8ff',
//     },
//   },
//   templateButton: {
//     textTransform: 'none',
//     fontWeight: 600,
//     marginLeft: '1rem',
//     color: '#805ad5',
//     borderRadius: '8px',
//     padding: '0.5rem 1rem',
//     background: 'linear-gradient(135deg, #ebf4ff 0%, #e9d8fd 100%)',
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       boxShadow: '0 3px 8px rgba(128, 90, 213, 0.2)',
//       transform: 'translateY(-2px)',
//       '& .MuiSvgIcon-root': {
//         transform: 'rotate(10deg) scale(1.1)',
//       },
//     },
//     '@media (max-width: 960px)': {
//       marginLeft: '0.75rem',
//       fontSize: '0.9rem',
//     },
//   },
//   dummyDataButton: {
//     display: 'none',
//     textTransform: 'none',
//     fontWeight: 600,
//     marginLeft: '1rem',
//     color: '#38a169',
//     borderRadius: '8px',
//     padding: '0.5rem 1rem',
//     background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
//     transition: 'all 0.2s ease',
//     '&:hover': {
//       boxShadow: '0 3px 8px rgba(56, 161, 105, 0.2)',
//       transform: 'translateY(-2px)',
//       '& .MuiSvgIcon-root': {
//         transform: 'scale(1.1)',
//       },
//     },
//   },
//   userButton: {
//     textTransform: 'none',
//     marginLeft: '1.5rem',
//     borderRadius: '24px',
//     fontWeight: 600,
//     border: '1px solid #e2e8f0',
//     padding: '0.3rem 1rem 0.3rem 0.75rem',
//     backgroundColor: '#f8fafc',
//     transition: 'all 0.25s ease',
//     display: 'flex',
//     alignItems: 'center',
//     '&:hover': {
//       backgroundColor: '#ebf8ff',
//       borderColor: '#bee3f8',
//       boxShadow: '0 2px 8px rgba(66, 153, 225, 0.2)',
//     },
//     '@media (max-width: 960px)': {
//       marginLeft: '1rem',
//       padding: '0.25rem 0.75rem 0.25rem 0.5rem',
//     },
//   },
//   avatar: {
//     backgroundColor: '#ebf4ff',
//     color: '#3182ce',
//     width: '30px',
//     height: '30px',
//     marginRight: '0.5rem',
//     transition: 'all 0.25s ease',
//     fontWeight: 'bold',
//     boxShadow: '0 2px 5px rgba(49, 130, 206, 0.2)',
//     '&:hover': {
//       transform: 'scale(1.1)',
//     },
//     '@media (max-width: 600px)': {
//       width: '26px',
//       height: '26px',
//       marginRight: '0.3rem',
//     },
//   },
//   mobileMenuButton: {
//     color: '#2d3748',
//     padding: '0.4rem',
//     borderRadius: '8px',
//     '&:hover': {
//       backgroundColor: '#f7fafc',
//     },
//   },
//   logoutButton: {
//     textTransform: 'none',
//     fontWeight: 600,
//     marginLeft: '1rem',
//     color: '#e53e3e',
//     '&:hover': {
//       backgroundColor: '#fff5f5',
//       color: '#c53030',
//     },
//   },
//   contentOffset: {
//     minHeight: '20px',
//     '@media (max-width: 600px)': {
//       minHeight: '56px',
//     },
//   },
//   navbarWithSidebar: {
//     paddingLeft: '64px',
//     width: 'calc(100% - 64px)',
//     transition: 'padding-left 0.3s ease-in-out, width 0.3s ease-in-out',
//     '@media (max-width: 600px)': {
//       paddingLeft: '56px',
//       width: 'calc(100% - 56px)',
//     },
//   },
//   buttonIcon: {
//     marginRight: '0.6rem',
//     transition: 'transform 0.3s ease',
//     color: 'inherit',
//     '@media (max-width: 600px)': {
//       marginRight: '0.3rem',
//       fontSize: '1.1rem',
//     },
//   },
//   menuItem: {
//     transition: 'background-color 0.2s ease',
//     '&:hover': {
//       backgroundColor: '#f7fafc',
//     },
//     '@media (max-width: 480px)': {
//       minHeight: '40px',
//       fontSize: '0.9rem',
//     },
//   },
//   menuItemIcon: {
//     marginRight: '0.6rem',
//     color: '#4a5568',
//     '@media (max-width: 600px)': {
//       marginRight: '0.4rem',
//       fontSize: '1.2rem',
//     },
//   },
//   userInfo: {
//     display: 'flex',
//     alignItems: 'center',
//     transition: 'all 0.2s ease',
//   },
//   userName: {
//     fontWeight: 600,
//     color: '#2d3748',
//     '@media (max-width: 600px)': {
//       fontSize: '0.9rem',
//     },
//   },
//   userRole: {
//     fontSize: '0.7rem',
//     color: '#718096',
//     marginTop: '-2px',
//   },
//   notificationBadge: {
//     '& .MuiBadge-badge': {
//       backgroundColor: '#38a169',
//       color: 'white',
//       fontWeight: 'bold',
//     },
//   },
// }));

// function HideOnScroll(props) {
//   const { children } = props;
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 200,
//   });

//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

// const Navbar = ({ currentPage, onTemplateClick, onLoadDummyData, hideLogo = false }) => {
//   const classes = useStyles();
//   const navigate = useNavigate();
//   const isSmallScreen = useMediaQuery('(max-width:768px)');
//   const { currentUser, logout } = useAuth();
  
//   const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
//   const [userMenuAnchor, setUserMenuAnchor] = useState(null);
//   const [menuHovered, setMenuHovered] = useState(false);
  
//   const handleMobileMenuOpen = (event) => {
//     setMobileMenuAnchor(event.currentTarget);
//   };
  
//   const handleMobileMenuClose = () => {
//     setMobileMenuAnchor(null);
//   };
  
//   const handleUserMenuOpen = (event) => {
//     setUserMenuAnchor(event.currentTarget);
//   };
  
//   const handleUserMenuClose = () => {
//     setUserMenuAnchor(null);
//   };
  
//   const navigateTo = (path) => {
//     navigate(path);
//     handleMobileMenuClose();
//   };
  
//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//     handleUserMenuClose();
//   };
  
//   const getInitial = () => {
//     return currentUser && currentUser.name 
//       ? currentUser.name.charAt(0).toUpperCase() 
//       : 'U';
//   };

//   const handleTemplateClick = () => {
//     if (onTemplateClick) {
//       onTemplateClick();
//       handleMobileMenuClose();
//     }
//   };
  
//   const handleLoadDummyData = () => {
//     if (onLoadDummyData) {
//       onLoadDummyData();
//       handleMobileMenuClose();
//     }
//   };
  
//   return (
//     <>
//       <HideOnScroll>
//         <AppBar 
//           position="fixed" 
//           className={`${classes.appBar} ${hideLogo ? classes.navbarWithSidebar : ''}`} 
//           elevation={2}
//         >
//           <Container maxWidth="xl">
//             <Toolbar className={classes.toolbar} disableGutters>
//               {/* Desktop Navigation */}
//               {!isSmallScreen && (
//                 <Box className={classes.navButtons}>
//                   {currentUser && (
//                     <>
//                       <Tooltip title="Create or edit your resume" arrow>
//                         <Button 
//                           className={`${classes.navButton} ${currentPage === 'resume-builder' ? classes.activeNavButton : ''}`}
//                           onClick={() => navigateTo('/resume-builder')}
//                           startIcon={<CreateIcon className={classes.buttonIcon} />}
//                         >
//                           Create Resume
//                         </Button>
//                       </Tooltip>
                      
//                       {currentPage === 'resume-builder' && (
//                         <>
//                           <Tooltip title="Choose a resume template" arrow>
//                             <Button
//                               className={classes.templateButton}
//                               onClick={onTemplateClick}
//                               startIcon={<TemplateIcon className={classes.buttonIcon} />}
//                             >
//                               Choose Template
//                             </Button>
//                           </Tooltip>
                          
//                           <Tooltip title="Load sample resume data" arrow>
//                             <Button
//                               className={classes.dummyDataButton}
//                               onClick={onLoadDummyData}
//                               startIcon={<DataIcon className={classes.buttonIcon} />}
//                             >
//                               Load Demo Data
//                             </Button>
//                           </Tooltip>
//                         </>
//                       )}
//                     </>
//                   )}
                  
//                   {!currentUser && (
//                     <>
//                       <Button 
//                         className={`${classes.navButton} ${currentPage === 'login' ? classes.activeNavButton : ''}`}
//                         onClick={() => navigateTo('/login')}
//                       >
//                         Log In
//                       </Button>
//                       <Button 
//                         className={`${classes.navButton} ${currentPage === 'home' ? classes.activeNavButton : ''}`}
//                         onClick={() => navigateTo('/')}
//                       >
//                         Sign Up
//                       </Button>
//                     </>
//                   )}
                  
//                   {currentUser && (
//                     <>
//                       <Button 
//                         className={classes.userButton}
//                         onClick={handleUserMenuOpen}
//                         onMouseEnter={() => setMenuHovered(true)}
//                         onMouseLeave={() => setMenuHovered(false)}
//                       >
//                         <Badge 
//                           variant="dot" 
//                           invisible={true}
//                           className={classes.notificationBadge}
//                         >
//                           <Avatar className={classes.avatar} style={{
//                             transform: menuHovered ? 'scale(1.1)' : 'scale(1)'
//                           }}>
//                             {getInitial()}
//                           </Avatar>
//                         </Badge>
//                         <Box className={classes.userInfo}>
//                           <Typography className={classes.userName}>
//                             {currentUser.name.split(' ')[0]}
//                           </Typography>
//                         </Box>
//                       </Button>
//                       {!isSmallScreen && (
//                         <Tooltip title="Logout" arrow>
//                           <Button 
//                             className={classes.logoutButton}
//                             onClick={handleLogout}
//                             startIcon={<LogoutIcon />}
//                           >
//                             Logout
//                           </Button>
//                         </Tooltip>
//                       )}
//                     </>
//                   )}
//                 </Box>
//               )}
              
//               {/* Mobile Navigation */}
//               {isSmallScreen && (
//                 <>
//                   <IconButton
//                     edge="end"
//                     className={classes.mobileMenuButton}
//                     onClick={handleMobileMenuOpen}
//                   >
//                     <MenuIcon />
//                   </IconButton>
                  
//                   <Menu
//                     anchorEl={mobileMenuAnchor}
//                     open={Boolean(mobileMenuAnchor)}
//                     onClose={handleMobileMenuClose}
//                     keepMounted
//                     PaperProps={{
//                       elevation: 3,
//                       style: {
//                         borderRadius: '8px',
//                         marginTop: '8px'
//                       }
//                     }}
//                   >
//                     {!currentUser ? (
//                       <>
//                         <MenuItem 
//                           onClick={() => navigateTo('/login')} 
//                           className={classes.menuItem}
//                           selected={currentPage === 'login'}
//                         >
//                           Log In
//                         </MenuItem>
//                         <MenuItem 
//                           onClick={() => navigateTo('/')} 
//                           className={classes.menuItem}
//                           selected={currentPage === 'home'}
//                         >
//                           Sign Up
//                         </MenuItem>
//                       </>
//                     ) : (
//                       <>
//                         <MenuItem 
//                           onClick={() => navigateTo('/resume-builder')} 
//                           className={classes.menuItem}
//                           selected={currentPage === 'resume-builder'}
//                         >
//                           <CreateIcon fontSize="small" className={classes.menuItemIcon} />
//                           Create Resume
//                         </MenuItem>
//                         {currentPage === 'resume-builder' && (
//                           <>
//                             <MenuItem onClick={handleTemplateClick} className={classes.menuItem}>
//                               <TemplateIcon fontSize="small" className={classes.menuItemIcon} />
//                               Choose Template
//                             </MenuItem>
//                             <MenuItem onClick={handleLoadDummyData} className={classes.menuItem}>
//                               <DataIcon fontSize="small" className={classes.menuItemIcon} />
//                               Load Demo Data
//                             </MenuItem>
//                           </>
//                         )}
//                         <MenuItem onClick={handleLogout} className={classes.menuItem}>
//                           <LogoutIcon fontSize="small" className={classes.menuItemIcon} />
//                           Logout
//                         </MenuItem>
//                       </>
//                     )}
//                   </Menu>
//                 </>
//               )}
              
//               {/* User Menu - Now empty or can be removed */}
//               <Menu
//                 anchorEl={userMenuAnchor}
//                 open={Boolean(userMenuAnchor)}
//                 onClose={handleUserMenuClose}
//                 keepMounted
//                 PaperProps={{
//                   elevation: 3,
//                   style: {
//                     borderRadius: '8px',
//                     marginTop: '8px'
//                   }
//                 }}
//               >
//               </Menu>
//             </Toolbar>
//           </Container>
//         </AppBar>
//       </HideOnScroll>
//       <div className={classes.contentOffset} />
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
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
  useScrollTrigger,
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
import ThemeSelector from '../components/ThemeSelector';  

const useStyles = makeStylesWithTheme((theme) => ({
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
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
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc',
      color: '#3182ce',
      transform: 'translateY(-2px)',
      boxShadow: '0 2px 5px rgba(49, 130, 206, 0.1)',
      '& .MuiSvgIcon-root': {
        transform: 'scale(1.1)',
      },
    },
    '@media (max-width: 960px)': {
      marginLeft: '0.75rem',
      fontSize: '0.9rem',
    },
  },
  activeNavButton: {
    color: '#3182ce',
    backgroundColor: '#ebf8ff',
    position: 'relative',
    fontWeight: 700,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '10%',
      width: '80%',
      height: '3px',
      backgroundColor: '#3182ce',
      borderRadius: '3px',
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      backgroundColor: '#ebf8ff',
    },
  },
  templateButton: {
    textTransform: 'none',
    fontWeight: 600,
    marginLeft: '1rem',
    color: '#805ad5',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #ebf4ff 0%, #e9d8fd 100%)',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 3px 8px rgba(128, 90, 213, 0.2)',
      transform: 'translateY(-2px)',
      '& .MuiSvgIcon-root': {
        transform: 'rotate(10deg) scale(1.1)',
      },
    },
    '@media (max-width: 960px)': {
      marginLeft: '0.75rem',
      fontSize: '0.9rem',
    },
  },
  dummyDataButton: {
    // display: 'none',
    textTransform: 'none',
    fontWeight: 600,
    marginLeft: '1rem',
    color: '#38a169',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 3px 8px rgba(56, 161, 105, 0.2)',
      transform: 'translateY(-2px)',
      '& .MuiSvgIcon-root': {
        transform: 'scale(1.1)',
      },
    },
  },
  userButton: {
    textTransform: 'none',
    marginLeft: '1.5rem',
    borderRadius: '24px',
    fontWeight: 600,
    border: '1px solid #e2e8f0',
    padding: '0.3rem 1rem 0.3rem 0.75rem',
    backgroundColor: '#f8fafc',
    transition: 'all 0.25s ease',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#ebf8ff',
      borderColor: '#bee3f8',
      boxShadow: '0 2px 8px rgba(66, 153, 225, 0.2)',
    },
    '@media (max-width: 960px)': {
      marginLeft: '1rem',
      padding: '0.25rem 0.75rem 0.25rem 0.5rem',
    },
  },
  avatar: {
    backgroundColor: '#ebf4ff',
    color: '#3182ce',
    width: '30px',
    height: '30px',
    marginRight: '0.5rem',
    transition: 'all 0.25s ease',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(49, 130, 206, 0.2)',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    '@media (max-width: 600px)': {
      width: '26px',
      height: '26px',
      marginRight: '0.3rem',
    },
  },
  mobileMenuButton: {
    color: '#2d3748',
    padding: '0.4rem',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#f7fafc',
    },
  },
  logoutButton: {
    textTransform: 'none',
    fontWeight: 600,
    marginLeft: '1rem',
    color: '#e53e3e',
    '&:hover': {
      backgroundColor: '#fff5f5',
      color: '#c53030',
    },
  },
  contentOffset: {
    minHeight: '20px',
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
  },
  buttonIcon: {
    marginRight: '0.6rem',
    transition: 'transform 0.3s ease',
    color: 'inherit',
    '@media (max-width: 600px)': {
      marginRight: '0.3rem',
      fontSize: '1.1rem',
    },
  },
  menuItem: {
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc',
    },
    '@media (max-width: 480px)': {
      minHeight: '40px',
      fontSize: '0.9rem',
    },
  },
  menuItemIcon: {
    marginRight: '0.6rem',
    color: '#4a5568',
    '@media (max-width: 600px)': {
      marginRight: '0.4rem',
      fontSize: '1.2rem',
    },
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
  },
  userName: {
    fontWeight: 600,
    color: '#2d3748',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
  },
  userRole: {
    fontSize: '0.7rem',
    color: '#718096',
    marginTop: '-2px',
  },
  notificationBadge: {
    '& .MuiBadge-badge': {
      backgroundColor: '#38a169',
      color: 'white',
      fontWeight: 'bold',
    },
  },
}));

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
    <>
      <HideOnScroll>
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
                  {/* Add FontSwitcher */}
                  <FontSwitcher />
                  <ThemeSelector />
                  
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
                  
                  <Menu
                    anchorEl={mobileMenuAnchor}
                    open={Boolean(mobileMenuAnchor)}
                    onClose={handleMobileMenuClose}
                    keepMounted
                    PaperProps={{
                      elevation: 3,
                      style: {
                        borderRadius: '8px',
                        marginTop: '8px'
                      }
                    }}
                  >
                    {/* Add FontSwitcher MenuItem for mobile */}
                    <MenuItem className={classes.menuItem}>
                      <FontSwitcher />
                    </MenuItem>
                    
                    {!currentUser ? (
                      <>
                        <MenuItem 
                          onClick={() => navigateTo('/login')} 
                          className={classes.menuItem}
                          selected={currentPage === 'login'}
                        >
                          Log In
                        </MenuItem>
                        <MenuItem 
                          onClick={() => navigateTo('/')} 
                          className={classes.menuItem}
                          selected={currentPage === 'home'}
                        >
                          Sign Up
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem 
                          onClick={() => navigateTo('/resume-builder')} 
                          className={classes.menuItem}
                          selected={currentPage === 'resume-builder'}
                        >
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
                          <LogoutIcon fontSize="small" className={classes.menuItemIcon} />
                          Logout
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </>
              )}
              
              {/* User Menu - Now empty or can be removed */}
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
                keepMounted
                PaperProps={{
                  elevation: 3,
                  style: {
                    borderRadius: '8px',
                    marginTop: '8px'
                  }
                }}
              >
              </Menu>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <div className={classes.contentOffset} />
    </>
  );
};

export default Navbar;