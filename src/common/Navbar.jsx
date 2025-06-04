// import React, { useState } from 'react';
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
//   Tooltip,
//   Badge,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Divider
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import TemplateIcon from '@mui/icons-material/Dashboard';
// import CreateIcon from '@mui/icons-material/Create';
// import DataIcon from '@mui/icons-material/Storage';
// import LogoutIcon from '@mui/icons-material/Logout';
// import CloseIcon from '@mui/icons-material/Close';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import FontSwitcher from '../components/FontSwitcher';
// import GigaLogo from '../assets/giga-loogo.svg';

// const useStyles = makeStylesWithTheme((theme) => ({
//   appBar: {
//     position: 'fixed',
//     top: '20px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     width: 'calc(89% - 40px)',
//     maxWidth: '1400px',
//     height: '60px',
//     background: 'rgba(255, 255, 255, 0.8)',
//     backdropFilter: 'blur(20px) saturate(180%)',
//     borderRadius: '16px',
//     boxShadow: '0 2px 8px rgba(39, 40, 108, 0.08)',
//     transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
//     zIndex: 1000,
//     '&:hover': {
//       boxShadow: '0 4px 16px rgba(39, 40, 108, 0.12)',
//     },
//     '@media (max-width: 1200px)': {
//       width: 'calc(92% - 30px)',
//       height: '58px',
//       top: '15px',
//     },
//     '@media (max-width: 960px)': {
//       width: 'calc(95% - 20px)',
//       height: '56px',
//       top: '12px',
//     },
//     '@media (max-width: 768px)': {
//       width: 'calc(100% - 20px)',
//       top: '10px',
//       height: '56px',
//     },
//     '@media (max-width: 600px)': {
//       width: 'calc(100% - 16px)',
//       height: '54px',
//       top: '8px',
//     },
//     '@media (max-width: 480px)': {
//       width: 'calc(100% - 12px)',
//       height: '52px',
//       top: '6px',
//     },
//     '@media (max-width: 375px)': {
//       width: 'calc(100% - 8px)',
//       height: '50px',
//       top: '4px',
//     },
//   },
//   toolbar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '0 24px',
//     height: '100%',
//     minHeight: '60px',
//     '@media (max-width: 1200px)': {
//       padding: '0 20px',
//       minHeight: '58px',
//     },
//     '@media (max-width: 960px)': {
//       padding: '0 18px',
//       minHeight: '56px',
//     },
//     '@media (max-width: 768px)': {
//       padding: '0 16px',
//       minHeight: '56px',
//     },
//     '@media (max-width: 600px)': {
//       padding: '0 14px',
//       minHeight: '54px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '0 12px',
//       minHeight: '52px',
//     },
//     '@media (max-width: 375px)': {
//       padding: '0 10px',
//       minHeight: '50px',
//     },
//   },
//   logoContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     cursor: 'pointer',
//     '@media (max-width: 960px)': {
//       gap: '10px',
//     },
//     '@media (max-width: 600px)': {
//       gap: '8px',
//     },
//     '@media (max-width: 480px)': {
//       gap: '6px',
//     },
//     '@media (max-width: 375px)': {
//       gap: '4px',
//     },
//   },
//   logo: {
//     width: '32px',
//     height: '32px',
//     borderRadius: '8px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexShrink: 0,
//     '@media (max-width: 960px)': {
//       width: '30px',
//       height: '30px',
//     },
//     '@media (max-width: 600px)': {
//       width: '28px',
//       height: '28px',
//     },
//     '@media (max-width: 480px)': {
//       width: '26px',
//       height: '26px',
//     },
//     '@media (max-width: 375px)': {
//       width: '24px',
//       height: '24px',
//     },
//   },
//   logoText: {
//     fontSize: '16px',
//     fontWeight: 600,
//     color: '#27286c',
//     letterSpacing: '-0.02em',
//     whiteSpace: 'nowrap',
//     '@media (max-width: 1200px)': {
//       fontSize: '15px',
//     },
//     '@media (max-width: 960px)': {
//       fontSize: '14px',
//     },
//     '@media (max-width: 768px)': {
//       fontSize: '14px',
//     },
//     '@media (max-width: 600px)': {
//       fontSize: '13px',
//     },
//     '@media (max-width: 480px)': {
//       display: 'none', // Hide text on very small screens
//     },
//   },
//   navButtons: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px',
//     '@media (max-width: 1200px)': {
//       gap: '14px',
//     },
//     '@media (max-width: 960px)': {
//       display: 'none', // Hide on tablet and mobile
//     },
//   },
//   mobileNavButtons: {
//     display: 'none',
//     alignItems: 'center',
//     gap: '8px',
//     '@media (max-width: 960px)': {
//       display: 'flex',
//     },
//     '@media (max-width: 600px)': {
//       gap: '6px',
//     },
//     '@media (max-width: 480px)': {
//       gap: '4px',
//     },
//   },
//   navButton: {
//     padding: '8px 16px',
//     borderRadius: '10px',
//     fontWeight: 500,
//     fontSize: '14px',
//     backdropFilter: 'blur(10px)',
//     transition: 'all 0.15s ease-out',
//     textTransform: 'none',
//     whiteSpace: 'nowrap',
//     '&:hover': {
//       transform: 'translateY(-2px)',
//       boxShadow: '0 8px 24px rgba(39, 40, 108, 0.4)',
//     },
//     '@media (max-width: 1200px)': {
//       padding: '7px 14px',
//       fontSize: '13px',
//     },
//   },
//   activeNavButton: {
//     background: 'linear-gradient(135deg, #27286c 0%, #233f94 100%)',
//     color: '#fff',
//     boxShadow: '0 4px 12px rgba(39, 40, 108, 0.3)',
//   },
//   templateButton: {
//     background: '#27286c',
//     color: 'white',
//     '&:hover': {
//       boxShadow: '0 8px 24px rgba(39, 40, 108, 0.4)',
//     },
//   },
//   dummyDataButton: {
//     // display: 'none', // Hidden by default, can be shown when needed
//     background: '#ffc615',
//     color: '#27286c',
//     '&:hover': {
//       background: '#ffd245',
//       boxShadow: '0 8px 24px rgba(255, 198, 21, 0.4)',
//     },
//   },
//   userButton: {
//     background: 'rgba(0, 0, 0, 0.03)',
//     borderRadius: '12px',
//     padding: '8px 12px',
//     transition: 'all 0.25s ease',
//     '&:hover': {
//       background: 'rgba(39, 40, 108, 0.05)',
//       boxShadow: '0 4px 16px rgba(39, 40, 108, 0.12)',
//     },
//     '@media (max-width: 1200px)': {
//       padding: '7px 10px',
//     },
//     '@media (max-width: 600px)': {
//       padding: '6px 8px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '5px 6px',
//     },
//   },
//   avatar: {
//     width: '28px',
//     height: '28px',
//     background: 'linear-gradient(135deg, #27286c, #60cae6)',
//     boxShadow: '0 2px 8px rgba(39, 40, 108, 0.2)',
//     fontSize: '14px',
//     fontWeight: 600,
//     '@media (max-width: 1200px)': {
//       width: '26px',
//       height: '26px',
//       fontSize: '13px',
//     },
//     '@media (max-width: 600px)': {
//       width: '24px',
//       height: '24px',
//       fontSize: '12px',
//     },
//     '@media (max-width: 480px)': {
//       width: '22px',
//       height: '22px',
//       fontSize: '11px',
//     },
//     '@media (max-width: 375px)': {
//       width: '20px',
//       height: '20px',
//       fontSize: '10px',
//     },
//   },
//   mobileMenuButton: {
//     color: '#27286c',
//     padding: '8px',
//     '&:hover': {
//       background: 'rgba(39, 40, 108, 0.05)',
//     },
//     '@media (max-width: 600px)': {
//       padding: '6px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '5px',
//     },
//     '@media (max-width: 375px)': {
//       padding: '4px',
//     },
//   },
//   // Mobile drawer styles
//   drawer: {
//     '& .MuiDrawer-paper': {
//       width: 280,
//       backgroundColor: 'rgba(255, 255, 255, 0.95)',
//       backdropFilter: 'blur(20px)',
//       '@media (max-width: 600px)': {
//         width: 260,
//       },
//       '@media (max-width: 480px)': {
//         width: 240,
//       },
//       '@media (max-width: 375px)': {
//         width: '85%',
//       },
//     },
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: '16px 20px',
//     borderBottom: '1px solid rgba(39, 40, 108, 0.08)',
//     '@media (max-width: 600px)': {
//       padding: '14px 18px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '12px 16px',
//     },
//     '@media (max-width: 375px)': {
//       padding: '10px 14px',
//     },
//   },
//   drawerLogo: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     '@media (max-width: 600px)': {
//       gap: '10px',
//     },
//     '@media (max-width: 480px)': {
//       gap: '8px',
//     },
//   },
//   drawerLogoImage: {
//     width: '32px',
//     height: '32px',
//     borderRadius: '8px',
//     '@media (max-width: 600px)': {
//       width: '28px',
//       height: '28px',
//     },
//     '@media (max-width: 480px)': {
//       width: '26px',
//       height: '26px',
//     },
//     '@media (max-width: 375px)': {
//       width: '24px',
//       height: '24px',
//     },
//   },
//   drawerLogoText: {
//     fontSize: '18px',
//     fontWeight: 600,
//     color: '#27286c',
//     '@media (max-width: 600px)': {
//       fontSize: '16px',
//     },
//     '@media (max-width: 480px)': {
//       fontSize: '15px',
//     },
//     '@media (max-width: 375px)': {
//       fontSize: '14px',
//     },
//   },
//   drawerList: {
//     padding: '16px 0',
//     '@media (max-width: 600px)': {
//       padding: '14px 0',
//     },
//     '@media (max-width: 480px)': {
//       padding: '12px 0',
//     },
//   },
//   drawerListItem: {
//     padding: '12px 20px',
//     '&:hover': {
//       backgroundColor: 'rgba(39, 40, 108, 0.05)',
//     },
//     '@media (max-width: 600px)': {
//       padding: '10px 18px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '9px 16px',
//     },
//     '@media (max-width: 375px)': {
//       padding: '8px 14px',
//     },
//   },
//   drawerButton: {
//     width: '100%',
//     justifyContent: 'flex-start',
//     textTransform: 'none',
//     fontWeight: 500,
//     padding: '12px 20px',
//     color: '#27286c',
//     '&:hover': {
//       backgroundColor: 'rgba(39, 40, 108, 0.05)',
//     },
//     '@media (max-width: 600px)': {
//       padding: '10px 18px',
//       fontSize: '0.9rem',
//     },
//     '@media (max-width: 480px)': {
//       padding: '9px 16px',
//       fontSize: '0.85rem',
//     },
//     '@media (max-width: 375px)': {
//       padding: '8px 14px',
//       fontSize: '0.8rem',
//     },
//   },
//   drawerActiveButton: {
//     backgroundColor: 'rgba(49, 130, 206, 0.1)',
//     color: '#3182ce',
//     fontWeight: 600,
//   },
//   closeButton: {
//     color: '#718096',
//     '&:hover': {
//       backgroundColor: 'rgba(39, 40, 108, 0.05)',
//     },
//     '@media (max-width: 480px)': {
//       padding: '6px',
//     },
//     '@media (max-width: 375px)': {
//       padding: '4px',
//     },
//   },
//   userInfo: {
//     marginLeft: '8px',
//     '@media (max-width: 600px)': {
//       marginLeft: '6px',
//     },
//     '@media (max-width: 480px)': {
//       display: 'none',
//     },
//   },
//   userName: {
//     fontSize: '13px',
//     fontWeight: 500,
//     color: '#2d3748',
//     '@media (max-width: 1200px)': {
//       fontSize: '12px',
//     },
//     '@media (max-width: 600px)': {
//       fontSize: '11px',
//     },
//   },
//   logoutButton: {
//     display: 'none', // Hidden on mobile, shown in desktop
//     color: '#e53e3e',
//     '&:hover': {
//       backgroundColor: 'rgba(229, 62, 62, 0.1)',
//     },
//   },
// }));

// const Navbar = ({ currentPage, onTemplateClick, onLoadDummyData }) => {
//   const classes = useStyles();
//   const navigate = useNavigate();
//   const isTablet = useMediaQuery('(max-width:960px)');
//   const isMobile = useMediaQuery('(max-width:768px)');
//   const { currentUser, logout } = useAuth();
  
//   const [userMenuAnchor, setUserMenuAnchor] = useState(null);
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const [menuHovered, setMenuHovered] = useState(false);
  
//   const handleUserMenuOpen = (event) => {
//     setUserMenuAnchor(event.currentTarget);
//   };
  
//   const handleUserMenuClose = () => {
//     setUserMenuAnchor(null);
//   };
  
//   const handleMobileDrawerToggle = () => {
//     setMobileDrawerOpen(!mobileDrawerOpen);
//   };
  
//   const navigateTo = (path) => {
//     navigate(path);
//     setMobileDrawerOpen(false);
//     handleUserMenuClose();
//   };
  
//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//     handleUserMenuClose();
//     setMobileDrawerOpen(false);
//   };
  
//   const getInitial = () => {
//     return currentUser && currentUser.name 
//       ? currentUser.name.charAt(0).toUpperCase() 
//       : 'U';
//   };

//   const handleTemplateClick = () => {
//     if (onTemplateClick) {
//       onTemplateClick();
//       setMobileDrawerOpen(false);
//     }
//   };
  
//   const handleLoadDummyData = () => {
//     if (onLoadDummyData) {
//       onLoadDummyData();
//       setMobileDrawerOpen(false);
//     }
//   };

//   const handleLogoClick = () => {
//     if (currentUser) {
//       navigateTo('/resume-builder');
//     } else {
//       navigateTo('/');
//     }
//   };
  
//   return (
//     <>
//       <AppBar className={classes.appBar} elevation={0}>
//         <Container maxWidth="xl">
//           <Toolbar className={classes.toolbar} disableGutters>
//             {/* Logo Section - Always visible */}
//             <Box className={classes.logoContainer} onClick={handleLogoClick}>
//               <img 
//                 src={GigaLogo} 
//                 alt="Gigaversity Logo" 
//                 className={classes.logo} 
//               />
//               <Typography variant="h6" className={classes.logoText}>
//                 Gigaversity
//               </Typography>
//             </Box>
            
//             {/* Desktop Navigation */}
//             <Box className={classes.navButtons}>
//               <FontSwitcher />
              
//               {currentUser && (
//                 <>
//                   {/*
//                   <Tooltip title="Create or edit your resume" arrow>
//                     <Button 
//                       className={`${classes.navButton} ${currentPage === 'resume-builder' ? classes.activeNavButton : ''}`}
//                       onClick={() => navigateTo('/resume-builder')}
//                       startIcon={<CreateIcon />}
//                     >
//                       Create Resume
//                     </Button>
//                   </Tooltip>
//                   */}
                  
//                   {currentPage === 'resume-builder' && (
//                     <>
//                       <Tooltip title="Choose a resume template" arrow>
//                         <Button
//                           className={`${classes.navButton} ${classes.templateButton}`}
//                           onClick={onTemplateClick}
//                           startIcon={<TemplateIcon />}
//                         >
//                           Choose Template
//                         </Button>
//                       </Tooltip>
                      
//                       <Tooltip title="Load sample resume data" arrow>
//                         <Button
//                           className={`${classes.navButton} ${classes.dummyDataButton}`}
//                           onClick={onLoadDummyData}
//                           startIcon={<DataIcon />}
//                         >
//                           Load Demo Data
//                         </Button>
//                       </Tooltip>
//                     </>
//                   )}
//                 </>
//               )}
              
//               {!currentUser && (
//                 <>
//                   <Button 
//                     className={`${classes.navButton} ${currentPage === 'login' ? classes.activeNavButton : ''}`}
//                     onClick={() => navigateTo('/login')}
//                   >
//                     Log In
//                   </Button>
//                   <Button 
//                     className={`${classes.navButton} ${currentPage === 'home' ? classes.activeNavButton : ''}`}
//                     onClick={() => navigateTo('/')}
//                   >
//                     Sign Up
//                   </Button>
//                 </>
//               )}
              
//               {currentUser && (
//                 <>
//                   <Button 
//                     className={classes.userButton}
//                     onClick={handleUserMenuOpen}
//                     onMouseEnter={() => setMenuHovered(true)}
//                     onMouseLeave={() => setMenuHovered(false)}
//                   >
//                     <Avatar className={classes.avatar} style={{
//                       transform: menuHovered ? 'scale(1.1)' : 'scale(1)'
//                     }}>
//                       {getInitial()}
//                     </Avatar>
//                     <Box className={classes.userInfo}>
//                       <Typography className={classes.userName}>
//                         {currentUser.name.split(' ')[0]}
//                       </Typography>
//                     </Box>
//                   </Button>
                  
//                   <Tooltip title="Logout" arrow>
//                     <Button 
//                       className={classes.logoutButton}
//                       onClick={handleLogout}
//                       startIcon={<LogoutIcon />}
//                     >
//                       Logout
//                     </Button>
//                   </Tooltip>
//                 </>
//               )}
//             </Box>

//             {/* Mobile Navigation */}
//             <Box className={classes.mobileNavButtons}>
//               {!isTablet && <FontSwitcher />}
              
//               {currentUser ? (
//                 <>
//                   <Button 
//                     className={classes.userButton}
//                     onClick={handleUserMenuOpen}
//                   >
//                     <Avatar className={classes.avatar}>
//                       {getInitial()}
//                     </Avatar>
//                     <Box className={classes.userInfo}>
//                       <Typography className={classes.userName}>
//                         {currentUser.name.split(' ')[0]}
//                       </Typography>
//                     </Box>
//                   </Button>
                  
//                   <IconButton
//                     className={classes.mobileMenuButton}
//                     onClick={handleMobileDrawerToggle}
//                     edge="end"
//                   >
//                     <MenuIcon />
//                   </IconButton>
//                 </>
//               ) : (
//                 <IconButton
//                   className={classes.mobileMenuButton}
//                   onClick={handleMobileDrawerToggle}
//                   edge="end"
//                 >
//                   <MenuIcon />
//                 </IconButton>
//               )}
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* User Menu */}
//       <Menu
//         anchorEl={userMenuAnchor}
//         open={Boolean(userMenuAnchor)}
//         onClose={handleUserMenuClose}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <MenuItem onClick={() => navigateTo('/resume-builder')}>
//           <CreateIcon sx={{ mr: 1 }} />
//           Resume Builder
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={handleLogout} sx={{ color: '#e53e3e' }}>
//           <LogoutIcon sx={{ mr: 1 }} />
//           Logout
//         </MenuItem>
//       </Menu>

//       {/* Mobile Drawer */}
//       <Drawer
//         anchor="right"
//         open={mobileDrawerOpen}
//         onClose={handleMobileDrawerToggle}
//         className={classes.drawer}
//       >
//         <Box className={classes.drawerHeader}>
//           <Box className={classes.drawerLogo}>
//             <img 
//               src={GigaLogo} 
//               alt="Gigaversity Logo" 
//               className={classes.drawerLogoImage} 
//             />
//             <Typography className={classes.drawerLogoText}>
//               Gigaversity
//             </Typography>
//           </Box>
//           <IconButton onClick={handleMobileDrawerToggle} className={classes.closeButton}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <List className={classes.drawerList}>
//           {isTablet && (
//             <ListItem className={classes.drawerListItem}>
//               <FontSwitcher />
//             </ListItem>
//           )}
          
//           {currentUser ? (
//             <>
//               <ListItem disablePadding>
//                 <Button
//                   className={`${classes.drawerButton} ${currentPage === 'resume-builder' ? classes.drawerActiveButton : ''}`}
//                   onClick={() => navigateTo('/resume-builder')}
//                   startIcon={<CreateIcon />}
//                 >
//                   Create Resume
//                 </Button>
//               </ListItem>
              
//               {currentPage === 'resume-builder' && (
//                 <>
//                   <ListItem disablePadding>
//                     <Button
//                       className={classes.drawerButton}
//                       onClick={handleTemplateClick}
//                       startIcon={<TemplateIcon />}
//                     >
//                       Choose Template
//                     </Button>
//                   </ListItem>
                  
//                   <ListItem disablePadding>
//                     <Button
//                       className={classes.drawerButton}
//                       onClick={handleLoadDummyData}
//                       startIcon={<DataIcon />}
//                     >
//                       Load Demo Data
//                     </Button>
//                   </ListItem>
//                 </>
//               )}
              
//               <Divider sx={{ my: 1 }} />
              
//               <ListItem disablePadding>
//                 <Button
//                   className={classes.drawerButton}
//                   onClick={handleLogout}
//                   startIcon={<LogoutIcon />}
//                   sx={{ color: '#e53e3e' }}
//                 >
//                   Logout
//                 </Button>
//               </ListItem>
//             </>
//           ) : (
//             <>
//               <ListItem disablePadding>
//                 <Button
//                   className={`${classes.drawerButton} ${currentPage === 'login' ? classes.drawerActiveButton : ''}`}
//                   onClick={() => navigateTo('/login')}
//                 >
//                   Log In
//                 </Button>
//               </ListItem>
              
//               <ListItem disablePadding>
//                 <Button
//                   className={`${classes.drawerButton} ${currentPage === 'home' ? classes.drawerActiveButton : ''}`}
//                   onClick={() => navigateTo('/')}
//                 >
//                   Sign Up
//                 </Button>
//               </ListItem>
//             </>
//           )}
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;
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
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TemplateIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import DataIcon from '@mui/icons-material/Storage';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FontSwitcher from '../components/FontSwitcher';
import GigaLogo from '../assets/giga-loogo.svg';

const useStyles = makeStylesWithTheme((theme) => ({
  appBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '64px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px) saturate(180%)',
    boxShadow: '0 2px 8px rgba(39, 40, 108, 0.08)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    '&:hover': {
      boxShadow: '0 2px 12px rgba(39, 40, 108, 0.12)',
    },
    '@media (max-width: 1200px)': {
      height: '60px',
    },
    '@media (max-width: 960px)': {
      height: '56px',
    },
    '@media (max-width: 600px)': {
      height: '54px',
    },
    '@media (max-width: 480px)': {
      height: '52px',
    },
    '@media (max-width: 375px)': {
      height: '50px',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    padding: '0 24px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    '@media (max-width: 1200px)': {
      padding: '0 20px',
    },
    '@media (max-width: 960px)': {
      padding: '0 18px',
    },
    '@media (max-width: 768px)': {
      padding: '0 16px',
    },
    '@media (max-width: 600px)': {
      padding: '0 14px',
    },
    '@media (max-width: 480px)': {
      padding: '0 12px',
    },
    '@media (max-width: 375px)': {
      padding: '0 10px',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    '@media (max-width: 960px)': {
      gap: '10px',
    },
    '@media (max-width: 600px)': {
      gap: '8px',
    },
    '@media (max-width: 480px)': {
      gap: '6px',
    },
    '@media (max-width: 375px)': {
      gap: '4px',
    },
  },
  logo: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '@media (max-width: 960px)': {
      width: '30px',
      height: '30px',
    },
    '@media (max-width: 600px)': {
      width: '28px',
      height: '28px',
    },
    '@media (max-width: 480px)': {
      width: '26px',
      height: '26px',
    },
    '@media (max-width: 375px)': {
      width: '24px',
      height: '24px',
    },
  },
  logoText: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#27286c',
    letterSpacing: '-0.02em',
    whiteSpace: 'nowrap',
    '@media (max-width: 1200px)': {
      fontSize: '15px',
    },
    '@media (max-width: 960px)': {
      fontSize: '14px',
    },
    '@media (max-width: 768px)': {
      fontSize: '14px',
    },
    '@media (max-width: 600px)': {
      fontSize: '13px',
    },
    '@media (max-width: 480px)': {
      display: 'none', // Hide text on very small screens
    },
  },
  navButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '@media (max-width: 1200px)': {
      gap: '14px',
    },
    '@media (max-width: 960px)': {
      display: 'none', // Hide on tablet and mobile
    },
  },
  mobileNavButtons: {
    display: 'none',
    alignItems: 'center',
    gap: '8px',
    '@media (max-width: 960px)': {
      display: 'flex',
    },
    '@media (max-width: 600px)': {
      gap: '6px',
    },
    '@media (max-width: 480px)': {
      gap: '4px',
    },
  },
  navButton: {
    padding: '8px 16px',
    borderRadius: '10px',
    fontWeight: 500,
    fontSize: '14px',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.15s ease-out',
    textTransform: 'none',
    whiteSpace: 'nowrap',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(39, 40, 108, 0.4)',
    },
    '@media (max-width: 1200px)': {
      padding: '7px 14px',
      fontSize: '13px',
    },
  },
  activeNavButton: {
    background: 'linear-gradient(135deg, #27286c 0%, #233f94 100%)',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(39, 40, 108, 0.3)',
  },
  templateButton: {
    background: '#27286c',
    color: 'white',
    '&:hover': {
      boxShadow: '0 8px 24px rgba(39, 40, 108, 0.4)',
    },
  },
  dummyDataButton: {
    display: 'none', // Hidden by default, can be shown when needed
    background: '#ffc615',
    color: '#27286c',
    '&:hover': {
      background: '#ffd245',
      boxShadow: '0 8px 24px rgba(255, 198, 21, 0.4)',
    },
  },
  userButton: {
    background: 'rgba(0, 0, 0, 0.03)',
    borderRadius: '12px',
    padding: '8px 12px',
    transition: 'all 0.25s ease',
    '&:hover': {
      background: 'rgba(39, 40, 108, 0.05)',
      boxShadow: '0 4px 16px rgba(39, 40, 108, 0.12)',
    },
    '@media (max-width: 1200px)': {
      padding: '7px 10px',
    },
    '@media (max-width: 600px)': {
      padding: '6px 8px',
    },
    '@media (max-width: 480px)': {
      padding: '5px 6px',
    },
  },
  avatar: {
    width: '28px',
    height: '28px',
    background: 'linear-gradient(135deg, #27286c, #60cae6)',
    boxShadow: '0 2px 8px rgba(39, 40, 108, 0.2)',
    fontSize: '14px',
    fontWeight: 600,
    '@media (max-width: 1200px)': {
      width: '26px',
      height: '26px',
      fontSize: '13px',
    },
    '@media (max-width: 600px)': {
      width: '24px',
      height: '24px',
      fontSize: '12px',
    },
    '@media (max-width: 480px)': {
      width: '22px',
      height: '22px',
      fontSize: '11px',
    },
    '@media (max-width: 375px)': {
      width: '20px',
      height: '20px',
      fontSize: '10px',
    },
  },
  mobileMenuButton: {
    color: '#27286c',
    padding: '8px',
    '&:hover': {
      background: 'rgba(39, 40, 108, 0.05)',
    },
    '@media (max-width: 600px)': {
      padding: '6px',
    },
    '@media (max-width: 480px)': {
      padding: '5px',
    },
    '@media (max-width: 375px)': {
      padding: '4px',
    },
  },
  // Mobile drawer styles
  drawer: {
    '& .MuiDrawer-paper': {
      width: 280,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      '@media (max-width: 600px)': {
        width: 260,
      },
      '@media (max-width: 480px)': {
        width: 240,
      },
      '@media (max-width: 375px)': {
        width: '85%',
      },
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(39, 40, 108, 0.08)',
    '@media (max-width: 600px)': {
      padding: '14px 18px',
    },
    '@media (max-width: 480px)': {
      padding: '12px 16px',
    },
    '@media (max-width: 375px)': {
      padding: '10px 14px',
    },
  },
  drawerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    '@media (max-width: 600px)': {
      gap: '10px',
    },
    '@media (max-width: 480px)': {
      gap: '8px',
    },
  },
  drawerLogoImage: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    '@media (max-width: 600px)': {
      width: '28px',
      height: '28px',
    },
    '@media (max-width: 480px)': {
      width: '26px',
      height: '26px',
    },
    '@media (max-width: 375px)': {
      width: '24px',
      height: '24px',
    },
  },
  drawerLogoText: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#27286c',
    '@media (max-width: 600px)': {
      fontSize: '16px',
    },
    '@media (max-width: 480px)': {
      fontSize: '15px',
    },
    '@media (max-width: 375px)': {
      fontSize: '14px',
    },
  },
  drawerList: {
    padding: '16px 0',
    '@media (max-width: 600px)': {
      padding: '14px 0',
    },
    '@media (max-width: 480px)': {
      padding: '12px 0',
    },
  },
  drawerListItem: {
    padding: '12px 20px',
    '&:hover': {
      backgroundColor: 'rgba(39, 40, 108, 0.05)',
    },
    '@media (max-width: 600px)': {
      padding: '10px 18px',
    },
    '@media (max-width: 480px)': {
      padding: '9px 16px',
    },
    '@media (max-width: 375px)': {
      padding: '8px 14px',
    },
  },
  drawerButton: {
    width: '100%',
    justifyContent: 'flex-start',
    textTransform: 'none',
    fontWeight: 500,
    padding: '12px 20px',
    color: '#27286c',
    '&:hover': {
      backgroundColor: 'rgba(39, 40, 108, 0.05)',
    },
    '@media (max-width: 600px)': {
      padding: '10px 18px',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '9px 16px',
      fontSize: '0.85rem',
    },
    '@media (max-width: 375px)': {
      padding: '8px 14px',
      fontSize: '0.8rem',
    },
  },
  drawerActiveButton: {
    backgroundColor: 'rgba(49, 130, 206, 0.1)',
    color: '#3182ce',
    fontWeight: 600,
  },
  closeButton: {
    color: '#718096',
    '&:hover': {
      backgroundColor: 'rgba(39, 40, 108, 0.05)',
    },
    '@media (max-width: 480px)': {
      padding: '6px',
    },
    '@media (max-width: 375px)': {
      padding: '4px',
    },
  },
  userInfo: {
    marginLeft: '8px',
    '@media (max-width: 600px)': {
      marginLeft: '6px',
    },
    '@media (max-width: 480px)': {
      display: 'none',
    },
  },
  userName: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#2d3748',
    '@media (max-width: 1200px)': {
      fontSize: '12px',
    },
    '@media (max-width: 600px)': {
      fontSize: '11px',
    },
  },
  logoutButton: {
    display: 'none', // Hidden on mobile, shown in desktop
    color: '#e53e3e',
    '&:hover': {
      backgroundColor: 'rgba(229, 62, 62, 0.1)',
    },
  },
}));

const Navbar = ({ currentPage, onTemplateClick, onLoadDummyData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isTablet = useMediaQuery('(max-width:960px)');
  const isMobile = useMediaQuery('(max-width:768px)');
  const { currentUser, logout } = useAuth();
  
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  
  const navigateTo = (path) => {
    navigate(path);
    setMobileDrawerOpen(false);
    handleUserMenuClose();
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    handleUserMenuClose();
    setMobileDrawerOpen(false);
  };
  
  const getInitial = () => {
    return currentUser && currentUser.name 
      ? currentUser.name.charAt(0).toUpperCase() 
      : 'U';
  };

  const handleTemplateClick = () => {
    if (onTemplateClick) {
      onTemplateClick();
      setMobileDrawerOpen(false);
    }
  };
  
  const handleLoadDummyData = () => {
    if (onLoadDummyData) {
      onLoadDummyData();
      setMobileDrawerOpen(false);
    }
  };

  const handleLogoClick = () => {
    if (currentUser) {
      navigateTo('/resume-builder');
    } else {
      navigateTo('/');
    }
  };
  
  return (
    <>
      <AppBar className={classes.appBar} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar className={classes.toolbar} disableGutters>
            {/* Logo Section - Always visible */}
            <Box className={classes.logoContainer} onClick={handleLogoClick}>
              <img 
                src={GigaLogo} 
                alt="Gigaversity Logo" 
                className={classes.logo} 
              />
              <Typography variant="h6" className={classes.logoText}>
                Giga Resume Builder
              </Typography>
            </Box>
            
            {/* Desktop Navigation */}
            <Box className={classes.navButtons}>
              <FontSwitcher />
              
              {currentUser && (
                <>
                  {/*
                  <Tooltip title="Create or edit your resume" arrow>
                    <Button 
                      className={`${classes.navButton} ${currentPage === 'resume-builder' ? classes.activeNavButton : ''}`}
                      onClick={() => navigateTo('/resume-builder')}
                      startIcon={<CreateIcon />}
                    >
                      Create Resume
                    </Button>
                  </Tooltip>
                  */}
                  
                  {currentPage === 'resume-builder' && (
                    <>
                      <Tooltip title="Choose a resume template" arrow>
                        <Button
                          className={`${classes.navButton} ${classes.templateButton}`}
                          onClick={onTemplateClick}
                          startIcon={<TemplateIcon />}
                        >
                          Choose Template
                        </Button>
                      </Tooltip>
                      
                      <Tooltip title="Load sample resume data" arrow>
                        <Button
                          className={`${classes.navButton} ${classes.dummyDataButton}`}
                          onClick={onLoadDummyData}
                          startIcon={<DataIcon />}
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
                    <Avatar className={classes.avatar} style={{
                      transform: menuHovered ? 'scale(1.1)' : 'scale(1)'
                    }}>
                      {getInitial()}
                    </Avatar>
                    <Box className={classes.userInfo}>
                      <Typography className={classes.userName}>
                        {currentUser.name.split(' ')[0]}
                      </Typography>
                    </Box>
                  </Button>
                  
                  <Tooltip title="Logout" arrow>
                    <Button 
                      className={classes.logoutButton}
                      onClick={handleLogout}
                      startIcon={<LogoutIcon />}
                    >
                      Logout
                    </Button>
                  </Tooltip>
                </>
              )}
            </Box>

            {/* Mobile Navigation */}
            <Box className={classes.mobileNavButtons}>
              {!isTablet && <FontSwitcher />}
              
              {currentUser ? (
                <>
                  <Button 
                    className={classes.userButton}
                    onClick={handleUserMenuOpen}
                  >
                    <Avatar className={classes.avatar}>
                      {getInitial()}
                    </Avatar>
                    <Box className={classes.userInfo}>
                      <Typography className={classes.userName}>
                        {currentUser.name.split(' ')[0]}
                      </Typography>
                    </Box>
                  </Button>
                  
                  <IconButton
                    className={classes.mobileMenuButton}
                    onClick={handleMobileDrawerToggle}
                    edge="end"
                  >
                    <MenuIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  className={classes.mobileMenuButton}
                  onClick={handleMobileDrawerToggle}
                  edge="end"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigateTo('/resume-builder')}>
          <CreateIcon sx={{ mr: 1 }} />
          Resume Builder
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: '#e53e3e' }}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={handleMobileDrawerToggle}
        className={classes.drawer}
      >
        <Box className={classes.drawerHeader}>
          <Box className={classes.drawerLogo}>
            <img 
              src={GigaLogo} 
              alt="Gigaversity Logo" 
              className={classes.drawerLogoImage} 
            />
            <Typography className={classes.drawerLogoText}>
              Gigaversity
            </Typography>
          </Box>
          <IconButton onClick={handleMobileDrawerToggle} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List className={classes.drawerList}>
          {isTablet && (
            <ListItem className={classes.drawerListItem}>
              <FontSwitcher />
            </ListItem>
          )}
          
          {currentUser ? (
            <>
              <ListItem disablePadding>
                <Button
                  className={`${classes.drawerButton} ${currentPage === 'resume-builder' ? classes.drawerActiveButton : ''}`}
                  onClick={() => navigateTo('/resume-builder')}
                  startIcon={<CreateIcon />}
                >
                  Create Resume
                </Button>
              </ListItem>
              
              {currentPage === 'resume-builder' && (
                <>
                  <ListItem disablePadding>
                    <Button
                      className={classes.drawerButton}
                      onClick={handleTemplateClick}
                      startIcon={<TemplateIcon />}
                    >
                      Choose Template
                    </Button>
                  </ListItem>
                  
                  <ListItem disablePadding>
                    <Button
                      className={classes.drawerButton}
                      onClick={handleLoadDummyData}
                      startIcon={<DataIcon />}
                    >
                      Load Demo Data
                    </Button>
                  </ListItem>
                </>
              )}
              
              <Divider sx={{ my: 1 }} />
              
              <ListItem disablePadding>
                <Button
                  className={classes.drawerButton}
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{ color: '#e53e3e' }}
                >
                  Logout
                </Button>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <Button
                  className={`${classes.drawerButton} ${currentPage === 'login' ? classes.drawerActiveButton : ''}`}
                  onClick={() => navigateTo('/login')}
                >
                  Log In
                </Button>
              </ListItem>
              
              <ListItem disablePadding>
                <Button
                  className={`${classes.drawerButton} ${currentPage === 'home' ? classes.drawerActiveButton : ''}`}
                  onClick={() => navigateTo('/')}
                >
                  Sign Up
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;