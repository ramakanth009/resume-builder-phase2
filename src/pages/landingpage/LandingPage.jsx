import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Card, 
  CardContent,
  Chip,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CodeIcon from '@mui/icons-material/Code';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SpeedIcon from '@mui/icons-material/Speed';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LaunchIcon from '@mui/icons-material/Launch';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const useStyles = makeStyles({
  landingPage: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #101138 0%, #1e1c44 50%, #2A2B6A 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  
  // Header Styles
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
    gap: '30px',
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
  headerCTA: {
    backgroundColor: '#FFC614 !important',
    color: '#2A2B6A !important',
    padding: '8px 20px !important',
    borderRadius: '25px !important',
    fontWeight: 'bold !important',
    textTransform: 'none !important',
    '@media (max-width: 960px)': {
      display: 'none',
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
  
  // Animated Background
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255, 198, 20, 0.1) 0%, rgba(255, 198, 20, 0.05) 100%)',
    animation: '$float 8s ease-in-out infinite',
  },
  circle1: {
    width: '300px',
    height: '300px',
    top: '10%',
    left: '5%',
    animationDelay: '0s',
    '@media (max-width: 600px)': {
      width: '150px',
      height: '150px',
    },
  },
  circle2: {
    width: '200px',
    height: '200px',
    top: '60%',
    right: '8%',
    animationDelay: '2s',
    '@media (max-width: 600px)': {
      width: '100px',
      height: '100px',
    },
  },
  circle3: {
    width: '150px',
    height: '150px',
    bottom: '20%',
    left: '15%',
    animationDelay: '4s',
    '@media (max-width: 600px)': {
      width: '80px',
      height: '80px',
    },
  },

  // Hero Section
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    paddingTop: '80px',
    '@media (max-width: 960px)': {
      minHeight: 'auto',
      paddingTop: '80px',
      paddingBottom: '60px',
    },
  },
  heroContainer: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 'calc(100vh - 80px)',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      minHeight: 'auto',
      gap: '40px',
    },
  },
  heroLeft: {
    flex: 1,
    padding: '0 40px 0 0',
    color: 'white',
    '@media (max-width: 960px)': {
      padding: 0,
      textAlign: 'center',
      order: 2,
    },
    '@media (max-width: 600px)': {
      padding: '0 10px',
    },
  },
  heroRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 960px)': {
      order: 1,
      width: '100%',
      padding: '0 20px',
    },
  },
  heroTitle: {
    fontSize: '3.5rem !important',
    fontWeight: '900 !important',
    marginBottom: '20px !important',
    lineHeight: '1.1 !important',
    background: 'linear-gradient(45deg, #fff 0%, #FFC614 50%, #fff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    '@media (max-width: 1200px)': {
      fontSize: '3rem !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '2.5rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.8rem !important',
    },
  },
  heroSubtitle: {
    fontSize: '1.3rem !important',
    marginBottom: '25px !important',
    color: '#FFC614 !important',
    fontWeight: '700 !important',
    '@media (max-width: 960px)': {
      fontSize: '1.2rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem !important',
    },
  },
  heroDescription: {
    fontSize: '1.1rem !important',
    marginBottom: '40px !important',
    lineHeight: '1.7 !important',
    color: 'rgba(255, 255, 255, 0.9) !important',
    '@media (max-width: 960px)': {
      fontSize: '1rem !important',
      marginBottom: '30px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.95rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem !important',
    },
  },

  // Demo Form
  demoForm: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 960px)': {
      maxWidth: '100%',
      padding: '30px',
    },
    '@media (max-width: 600px)': {
      padding: '25px',
      borderRadius: '15px',
    },
    '@media (max-width: 480px)': {
      padding: '20px',
    },
  },
  demoTitle: {
    fontSize: '1.8rem !important',
    fontWeight: 'bold !important',
    color: '#2A2B6A !important',
    marginBottom: '10px !important',
    textAlign: 'center',
    '@media (max-width: 600px)': {
      fontSize: '1.5rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.3rem !important',
    },
  },
  demoSubtitle: {
    fontSize: '1rem !important',
    color: '#666 !important',
    marginBottom: '30px !important',
    textAlign: 'center',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem !important',
      marginBottom: '25px !important',
    },
  },
  demoButton: {
    width: '100%',
    backgroundColor: '#2A2B6A !important',
    color: 'white !important',
    padding: '15px !important',
    fontSize: '1.1rem !important',
    fontWeight: 'bold !important',
    borderRadius: '50px !important',
    textTransform: 'none !important',
    marginBottom: '20px !important',
    transition: 'all 0.3s ease !important',
    '&:hover': {
      backgroundColor: '#1a1b4a !important',
      transform: 'translateY(-2px)',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem !important',
      padding: '12px !important',
    },
  },
  demoFeature: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '0.9rem !important',
    color: '#666 !important',
    '@media (max-width: 600px)': {
      fontSize: '0.85rem !important',
      marginBottom: '12px',
    },
  },
  demoIcon: {
    color: '#FFC614 !important',
    marginRight: '10px !important',
    fontSize: '20px !important',
    '@media (max-width: 600px)': {
      fontSize: '18px !important',
      marginRight: '8px !important',
    },
  },

  // Features Section
  featuresSection: {
    background: 'white',
    padding: '80px 0',
    position: 'relative',
    zIndex: 2,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-50px',
      left: 0,
      width: '100%',
      height: '100px',
      background: 'white',
      transform: 'skewY(-2deg)',
      zIndex: 1,
    },
    '@media (max-width: 960px)': {
      padding: '60px 0',
    },
    '@media (max-width: 600px)': {
      padding: '40px 0',
    },
  },
  sectionTitle: {
    fontSize: '3rem !important',
    fontWeight: 'bold !important',
    color: '#2A2B6A !important',
    textAlign: 'center',
    marginBottom: '60px !important',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 960px)': {
      fontSize: '2.5rem !important',
      marginBottom: '50px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem !important',
      marginBottom: '40px !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.8rem !important',
    },
  },
  featureBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    marginBottom: '80px',
    position: 'relative',
    zIndex: 2,
    '&:nth-child(even)': {
      flexDirection: 'row-reverse',
    },
    '@media (max-width: 960px)': {
      flexDirection: 'column !important',
      gap: '40px',
      marginBottom: '60px',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      gap: '30px',
      marginBottom: '40px',
    },
  },
  featureContent: {
    flex: 1,
    '@media (max-width: 960px)': {
      order: 2,
    },
  },
  featureVisual: {
    flex: 1,
    height: '350px',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 960px)': {
      order: 1,
      height: '280px',
      width: '100%',
    },
    '@media (max-width: 600px)': {
      height: '220px',
    },
  },
  featureImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  featureTitle: {
    fontSize: '1.8rem !important',
    fontWeight: 'bold !important',
    color: '#2A2B6A !important',
    marginBottom: '20px !important',
    '@media (max-width: 960px)': {
      fontSize: '1.6rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.4rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.3rem !important',
    },
  },
  featureDescription: {
    fontSize: '1.1rem !important',
    color: '#666 !important',
    lineHeight: '1.7 !important',
    marginBottom: '25px !important',
    '@media (max-width: 960px)': {
      fontSize: '1rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.95rem !important',
    },
  },

  // Highlights Section
  highlightsSection: {
    background: 'linear-gradient(135deg, #2A2B6A 0%, #1a1b4a 100%)',
    padding: '80px 0',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-50px',
      left: 0,
      width: '100%',
      height: '100px',
      background: 'white',
      transform: 'skewY(2deg)',
      zIndex: 1,
    },
    '@media (max-width: 960px)': {
      padding: '60px 0',
    },
    '@media (max-width: 600px)': {
      padding: '40px 0',
    },
  },
  highlightsTitle: {
    fontSize: '3rem !important',
    fontWeight: 'bold !important',
    color: 'white !important',
    textAlign: 'center',
    marginBottom: '60px !important',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 960px)': {
      fontSize: '2.5rem !important',
      marginBottom: '50px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem !important',
      marginBottom: '40px !important',
    },
  },
  highlightsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 960px)': {
      gap: '15px',
    },
  },
  highlightItem: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    minWidth: '200px',
    flex: '1 1 calc(25% - 20px)',
    maxWidth: 'calc(25% - 20px)',
    '&:hover': {
      background: 'rgba(255, 198, 20, 0.2)',
      transform: 'translateY(-10px)',
    },
    '@media (max-width: 1200px)': {
      flex: '1 1 calc(33.333% - 20px)',
      maxWidth: 'calc(33.333% - 20px)',
    },
    '@media (max-width: 960px)': {
      flex: '1 1 calc(50% - 15px)',
      maxWidth: 'calc(50% - 15px)',
      padding: '25px',
    },
    '@media (max-width: 600px)': {
      flex: '1 1 100%',
      maxWidth: '100%',
      padding: '20px',
    },
  },
  highlightIcon: {
    fontSize: '40px !important',
    color: '#FFC614 !important',
    marginBottom: '15px !important',
    '@media (max-width: 600px)': {
      fontSize: '35px !important',
    },
  },
  highlightLabel: {
    fontSize: '1rem !important',
    fontWeight: 'bold !important',
    color: 'white !important',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem !important',
    },
  },

  // Audience Section
  audienceSection: {
    background: 'white',
    padding: '80px 0',
    position: 'relative',
    '@media (max-width: 960px)': {
      padding: '60px 0',
    },
    '@media (max-width: 600px)': {
      padding: '40px 0',
    },
  },
  audienceContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    '@media (max-width: 960px)': {
      gap: '20px',
    },
  },
  audienceCard: {
    background: 'linear-gradient(135deg, #f8f9fc 0%, rgba(255, 198, 20, 0.05) 100%)',
    padding: '40px',
    borderRadius: '25px',
    border: '3px solid transparent',
    backgroundClip: 'padding-box',
    position: 'relative',
    transition: 'all 0.4s ease',
    flex: '1 1 calc(50% - 30px)',
    minWidth: '300px',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      padding: '3px',
      background: 'linear-gradient(135deg, #2A2B6A, #FFC614)',
      borderRadius: 'inherit',
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      maskComposite: 'exclude',
      opacity: 0,
      transition: 'opacity 0.4s ease',
    },
    '&:hover': {
      transform: 'translateY(-15px) scale(1.02)',
      '&::before': {
        opacity: 1,
      },
    },
    '@media (max-width: 960px)': {
      flex: '1 1 100%',
      padding: '30px',
    },
    '@media (max-width: 600px)': {
      padding: '25px',
      borderRadius: '20px',
    },
  },
  audienceIcon: {
    fontSize: '50px !important',
    color: '#2A2B6A !important',
    marginBottom: '20px !important',
    display: 'block',
    '@media (max-width: 600px)': {
      fontSize: '45px !important',
    },
  },
  audienceText: {
    fontSize: '1.2rem !important',
    color: '#333 !important',
    fontWeight: '600 !important',
    lineHeight: '1.6 !important',
    '@media (max-width: 600px)': {
      fontSize: '1.1rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem !important',
    },
  },

  // Final CTA Section
  finalSection: {
    background: 'linear-gradient(135deg, #101138 0%, #2A2B6A 100%)',
    padding: '80px 0',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    '@media (max-width: 960px)': {
      padding: '60px 0',
    },
    '@media (max-width: 600px)': {
      padding: '40px 0',
    },
  },
  finalTitle: {
    fontSize: '3rem !important',
    fontWeight: '900 !important',
    color: 'white !important',
    marginBottom: '30px !important',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 960px)': {
      fontSize: '2.5rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.8rem !important',
    },
  },
  finalDescription: {
    fontSize: '1.2rem !important',
    color: 'rgba(255, 255, 255, 0.9) !important',
    marginBottom: '50px !important',
    maxWidth: '800px',
    margin: '0 auto 50px !important',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 960px)': {
      fontSize: '1.1rem !important',
      margin: '0 auto 40px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem !important',
      margin: '0 auto 30px !important',
    },
  },
  finalCTA: {
    backgroundColor: '#FFC614 !important',
    color: '#2A2B6A !important',
    padding: '20px 50px !important',
    fontSize: '1.3rem !important',
    fontWeight: 'bold !important',
    borderRadius: '60px !important',
    textTransform: 'none !important',
    boxShadow: '0 15px 40px rgba(255, 198, 20, 0.4) !important',
    transition: 'all 0.4s ease !important',
    position: 'relative',
    zIndex: 2,
    '&:hover': {
      backgroundColor: '#FFD23F !important',
      transform: 'translateY(-5px) scale(1.05)',
      boxShadow: '0 20px 50px rgba(255, 198, 20, 0.6) !important',
    },
    '@media (max-width: 600px)': {
      padding: '15px 35px !important',
      fontSize: '1.1rem !important',
    },
    '@media (max-width: 480px)': {
      padding: '12px 25px !important',
      fontSize: '1rem !important',
    },
  },

  // Footer Styles
  footer: {
    backgroundColor: '#1a1b4a',
    color: 'white',
    padding: '60px 0 20px',
    '@media (max-width: 960px)': {
      padding: '40px 0 15px',
    },
    '@media (max-width: 600px)': {
      padding: '30px 0 10px',
    },
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    marginBottom: '40px',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '30px',
      marginBottom: '30px',
    },
  },
  footerSection: {
    flex: 1,
    '@media (max-width: 960px)': {
      textAlign: 'center',
    },
  },
  footerTitle: {
    fontSize: '1.3rem !important',
    fontWeight: 'bold !important',
    color: '#FFC614 !important',
    marginBottom: '20px !important',
    '@media (max-width: 600px)': {
      fontSize: '1.2rem !important',
      marginBottom: '15px !important',
    },
  },
  footerLink: {
    color: 'rgba(255, 255, 255, 0.8) !important',
    textDecoration: 'none !important',
    fontSize: '0.95rem !important',
    display: 'block',
    marginBottom: '10px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#FFC614 !important',
    },
  },
  socialLinks: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px',
    '@media (max-width: 960px)': {
      justifyContent: 'center',
    },
  },
  socialIcon: {
    color: 'rgba(255, 255, 255, 0.8) !important',
    fontSize: '1.5rem !important',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#FFC614 !important',
    },
  },
  footerBottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '20px',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.9rem',
    '@media (max-width: 600px)': {
      paddingTop: '15px',
      fontSize: '0.85rem',
    },
  },

  // Example chips
  exampleChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '20px',
    '@media (max-width: 600px)': {
      gap: '8px',
    },
  },
  exampleChip: {
    backgroundColor: 'rgba(42, 43, 106, 0.1) !important',
    color: '#2A2B6A !important',
    fontWeight: '600 !important',
    borderRadius: '20px !important',
    fontSize: '0.85rem !important',
    '@media (max-width: 600px)': {
      fontSize: '0.8rem !important',
    },
  },

  // Animations
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0) rotate(0deg)',
      opacity: 0.6,
    },
    '50%': {
      transform: 'translateY(-30px) rotate(180deg)',
      opacity: 1,
    },
  },
});

const ResumeBuilderLanding = () => {
  const classes = useStyles();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCTAClick = () => {
    window.open('http://resume.gigaversity.in/', '_blank');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const features = [
    {
      title: "Gen AI Skill Suggestions—With Real-World Use Cases",
      description: "Stand out with in-demand Gen AI skills. Our AI engine recommends personalized Gen AI tools (like ChatGPT, Midjourney, Figma AI, Claude, Bard, DALL·E, etc.) based on your profile. You can even add how you've used these tools.",
      examples: ["ChatGPT for content creation", "Midjourney for design concepts", "Claude for code review"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Build Projects Straight From Your Resume",
      description: "Gigaversity's resume builder recommends portfolio-ready projects based on your target role—be it full stack development, data science, UI/UX, or product management. With one click, access our GitHub repository filled with real-time projects, step-by-step guides, and code.",
      examples: ["E-commerce platforms", "Data analytics dashboards", "Mobile app prototypes"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Smart Resume Content That Writes Itself",
      description: "Gigaversity's AI Resume Maker helps you write your resume with ease. It suggests role-based summaries, internship descriptions, strong bullet points, and the right keywords. Designed for freshers, the templates are professional and ATS-friendly.",
      examples: ["Role-based summaries", "Impact-driven bullet points", "Industry keywords"],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "ATS-Friendly Templates & Formats",
      description: "Every template is designed by experts with recruiter input, clean and modern with correct resume format for freshers and professionals, tested for compatibility with leading ATS tools. So your resume doesn't get rejected by a bot before a human even sees it.",
      examples: ["Recruiter-approved layouts", "ATS compatibility tested", "Professional formatting"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const highlights = [
    { icon: <StarIcon />, label: "Top Rated" },
    { icon: <SpeedIcon />, label: "Lightning Fast" },
    { icon: <AutoAwesomeIcon />, label: "Gen AI recommendation" },
    { icon: <CodeIcon />, label: "Project Suggestion" },
    { icon: <EditIcon />, label: "Professional Layouts" },
    { icon: <CheckCircleIcon />, label: "Recruiters approved Templates" },
    { icon: <VerifiedUserIcon />, label: "ATS-Friendly" },
    { icon: <TrendingUpIcon />, label: "Skills Suggestion" }
  ];

  const targetAudience = [
    {
      icon: <SchoolIcon />,
      text: "Students and freshers entering the job market"
    },
    {
      icon: <WorkIcon />,
      text: "Working professionals upgrading roles or switching careers"
    },
    {
      icon: <RestartAltIcon />,
      text: "Individuals with career gaps needing impactful resumes"
    },
    {
      icon: <TrendingUpIcon />,
      text: "Tech enthusiasts wanting to showcase Gen AI & project skills"
    }
  ];

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Templates', href: '#templates' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <Box className={classes.landingPage}>
      {/* Header */}
      <AppBar className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.logo}>
            Gigaversity Resume
          </Typography>
          
          <Box className={classes.navLinks}>
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} className={classes.navLink}>
                {item.label}
              </Link>
            ))}
            <Button 
              className={classes.headerCTA}
              onClick={handleCTAClick}
            >
              Build Resume
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

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        className={classes.drawer}
      >
        <Box className={classes.drawerHeader}>
          <Typography className={classes.logo}>
            Gigaversity Resume
          </Typography>
          <IconButton onClick={toggleMobileMenu} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} className={classes.drawerLink}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '10px 0' }} />
          <ListItem>
            <Button 
              fullWidth
              variant="contained"
              onClick={handleCTAClick}
              sx={{
                backgroundColor: '#FFC614 !important',
                color: '#2A2B6A !important',
                fontWeight: 'bold',
                borderRadius: '25px',
              }}
            >
              Build Resume
            </Button>
          </ListItem>
        </List>
      </Drawer>

      {/* Animated Background */}
      <Box className={classes.backgroundElements}>
        <Box className={`${classes.floatingCircle} ${classes.circle1}`} />
        <Box className={`${classes.floatingCircle} ${classes.circle2}`} />
        <Box className={`${classes.floatingCircle} ${classes.circle3}`} />
      </Box>

      {/* Hero Section */}
      <Box className={classes.heroSection}>
        <Container maxWidth="xl">
          <Box className={classes.heroContainer}>
            <Box className={classes.heroLeft}>
              <Typography variant="h1" className={classes.heroTitle}>
                Create Resume That Gets You Noticed
              </Typography>
              <Typography variant="h2" className={classes.heroSubtitle}>
                Free Resume Builder | AI Assistance and Smart Suggestion
              </Typography>
              <Typography variant="body1" className={classes.heroDescription}>
                Whether you're a <strong>fresher looking for your first IT job</strong> or a <strong>professional aiming for a career switch</strong>, 
                <strong> Gigaversity's Resume Builder</strong> helps you build a resume that reflects your skills, projects, and growth in a 
                <strong> recruiter-approved, ATS-friendly format</strong>.
              </Typography>
            </Box>
            
            <Box className={classes.heroRight}>
              <Paper className={classes.demoForm} elevation={0}>
                <Typography variant="h3" className={classes.demoTitle}>
                  Start Building Now
                </Typography>
                <Typography variant="body1" className={classes.demoSubtitle}>
                  Join thousands creating job-winning resumes
                </Typography>
                
                <Button 
                  variant="contained" 
                  className={classes.demoButton}
                  onClick={handleCTAClick}
                  startIcon={<PlayArrowIcon />}
                >
                  ✅ Create Resume Now
                </Button>
                
                <Box className={classes.demoFeature}>
                  <CheckCircleIcon className={classes.demoIcon} />
                  <span>Free to use, no credit card required</span>
                </Box>
                <Box className={classes.demoFeature}>
                  <AutoAwesomeIcon className={classes.demoIcon} />
                  <span>AI-powered suggestions included</span>
                </Box>
                <Box className={classes.demoFeature}>
                  <VerifiedUserIcon className={classes.demoIcon} />
                  <span>ATS-friendly templates</span>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className={classes.featuresSection}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.sectionTitle}>
            Why Use <span style={{ color: '#FFC614' }}>Gigaversity Resume Builder?</span>
          </Typography>
          
          {features.map((feature, index) => (
            <Box key={index} className={classes.featureBox}>
              <Box className={classes.featureContent}>
                <Typography variant="h3" className={classes.featureTitle}>
                  {index + 1}. {feature.title}
                </Typography>
                <Typography variant="body1" className={classes.featureDescription}>
                  {feature.description}
                </Typography>
                <Box className={classes.exampleChips}>
                  {feature.examples.map((example, idx) => (
                    <Chip 
                      key={idx}
                      label={example}
                      className={classes.exampleChip}
                    />
                  ))}
                </Box>
              </Box>
              <Box className={classes.featureVisual}>
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className={classes.featureImage}
                />
              </Box>
            </Box>
          ))}
        </Container>
      </Box>

      {/* Highlights Section */}
      <Box className={classes.highlightsSection}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.highlightsTitle}>
            Key Highlights of <span style={{ color: '#FFC614' }}>Giga Resume Builder</span>
          </Typography>
          
          <Box className={classes.highlightsContainer}>
            {highlights.map((highlight, index) => (
              <Box key={index} className={classes.highlightItem}>
                <Box className={classes.highlightIcon}>
                  {highlight.icon}
                </Box>
                <Typography className={classes.highlightLabel}>
                  {highlight.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Target Audience Section */}
      <Box className={classes.audienceSection}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.sectionTitle}>
            Who is it <span style={{ color: '#FFC614' }}>for?</span>
          </Typography>
          
          <Box className={classes.audienceContainer}>
            {targetAudience.map((audience, index) => (
              <Box key={index} className={classes.audienceCard}>
                <Box className={classes.audienceIcon}>
                  {audience.icon}
                </Box>
                <Typography className={classes.audienceText}>
                  {audience.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box className={classes.finalSection}>
        <Container maxWidth="lg">
          <Typography variant="h2" className={classes.finalTitle}>
            Giga Resume - The smarter way to build resume in <span style={{ color: '#FFC614' }}>2025</span>
          </Typography>
          <Typography variant="body1" className={classes.finalDescription}>
            <strong>Gigaversity Resume Builder</strong> isn't just another <strong>free resume maker</strong> — it's your launchpad to success. 
            With <strong>Gen AI suggestions</strong>, <strong>project-building guidance</strong>, and <strong>ATS-optimized templates</strong>, 
            you're not just creating a resume — you're building your future.
          </Typography>
          <Button 
            variant="contained" 
            className={classes.finalCTA}
            onClick={handleCTAClick}
            endIcon={<LaunchIcon />}
          >
            Start Building Your Future Now
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box className={classes.footer}>
        <Container maxWidth="lg">
          <Box className={classes.footerContent}>
            <Box className={classes.footerSection}>
              <Typography className={classes.footerTitle}>
                Gigaversity Resume
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                Build professional, ATS-friendly resumes with AI assistance. Get noticed by recruiters and land your dream job.
              </Typography>
              <Box className={classes.socialLinks}>
                <FacebookIcon className={classes.socialIcon} />
                <TwitterIcon className={classes.socialIcon} />
                <LinkedInIcon className={classes.socialIcon} />
                <InstagramIcon className={classes.socialIcon} />
              </Box>
            </Box>
            
            <Box className={classes.footerSection}>
              <Typography className={classes.footerTitle}>
                Product
              </Typography>
              <Link href="#templates" className={classes.footerLink}>Resume Templates</Link>
              <Link href="#builder" className={classes.footerLink}>Resume Builder</Link>
              <Link href="#examples" className={classes.footerLink}>Resume Examples</Link>
              <Link href="#tips" className={classes.footerLink}>Resume Tips</Link>
            </Box>
            
            <Box className={classes.footerSection}>
              <Typography className={classes.footerTitle}>
                Resources
              </Typography>
              <Link href="#blog" className={classes.footerLink}>Blog</Link>
              <Link href="#guides" className={classes.footerLink}>Career Guides</Link>
              <Link href="#help" className={classes.footerLink}>Help Center</Link>
              <Link href="#faq" className={classes.footerLink}>FAQ</Link>
            </Box>
            
            <Box className={classes.footerSection}>
              <Typography className={classes.footerTitle}>
                Company
              </Typography>
              <Link href="#about" className={classes.footerLink}>About Us</Link>
              <Link href="#contact" className={classes.footerLink}>Contact</Link>
              <Link href="#privacy" className={classes.footerLink}>Privacy Policy</Link>
              <Link href="#terms" className={classes.footerLink}>Terms of Service</Link>
            </Box>
          </Box>
          
          <Box className={classes.footerBottom}>
            <Typography variant="body2">
              © 2025 Gigaversity Resume Builder. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ResumeBuilderLanding