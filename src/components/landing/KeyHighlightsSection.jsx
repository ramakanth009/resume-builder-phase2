import React from 'react';
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  section: {
    padding: '100px 0',
    // Use the same background as HeroSection.jsx heroContainer:
    background: 'linear-gradient(135deg, #101138 0%, #2A2B6A 100%)',
    '@media (max-width: 960px)': {
      padding: '80px 0',
    },
    '@media (max-width: 600px)': {
      padding: '60px 0',
    },
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  titleSection: {
    textAlign: 'center',
    marginBottom: '80px',
    '@media (max-width: 600px)': {
      marginBottom: '50px',
    },
  },
  mainTitle: {
    fontSize: '3.5rem',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: '20px',
    letterSpacing: '-0.02em',
    '@media (max-width: 960px)': {
      fontSize: '2.8rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '2.2rem',
    },
  },
  brandHighlight: {
    color: '#ffc614',
    position: 'relative',
    
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#a0a0a0',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
  highlightsGrid: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    width: '100vw',
    margin: '0 auto',
    padding: '20px 0',
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
  },
  slider: {
    display: 'flex',
    gap: '40px',
    animation: '$slide 40s linear infinite', // Slowed down from 20s to 40s
    '&:hover': {
      animationPlayState: 'paused',
    },
  },
  '@keyframes slide': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-50%)', // Changed from -100% to -50% for smoother loop
    },
  },
  highlightCard: {
    flex: '0 0 300px',
    background: 'rgba(255,255,255,0.10)',
    borderRadius: '20px',
    padding: '40px 30px',
    position: 'relative',
    border: '1.5px solid rgba(255,255,255,0.18)',
    overflow: 'hidden',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
    backdropFilter: 'blur(8px)',
    '@media (max-width: 600px)': {
      padding: '30px 25px',
      flex: '0 0 250px',
    },
  },
  iconContainer: {
    width: '70px',
    height: '70px',
    background: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25px',
    boxShadow: '0 2px 12px 0 rgba(255, 198, 20, 0.15)',
    border: '2px solid #ffc614',
    position: 'relative',
    zIndex: 2,
    '& svg': {
      fontSize: '32px',
      color: '#ffc614',
    },
    '@media (max-width: 600px)': {
      width: '60px',
      height: '60px',
      '& svg': {
        fontSize: '28px',
      },
    },
  },
  highlightTitle: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '0',
    transition: 'color 0.3s ease',
    position: 'relative',
    zIndex: 2,
    letterSpacing: '0.01em',
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
  },
  decorativeElement: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    pointerEvents: 'none',
    zIndex: 1,
  },
  backgroundPattern: {
    display: 'none',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '60px',
    marginTop: '80px',
    '@media (max-width: 960px)': {
      gap: '40px',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '30px',
      alignItems: 'center',
    },
  },
  statItem: {
    textAlign: 'center',
    '& h3': {
      fontSize: '2.5rem',
      fontWeight: 800,
      color: '#ffc614',
      marginBottom: '10px',
      '@media (max-width: 600px)': {
        fontSize: '2rem',
      },
    },
    '& p': {
      fontSize: '1rem',
      color: '#a0a0a0',
      margin: 0,
    },
  },
}));

const KeyHighlightsSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const highlights = [
    { 
      icon: <StarIcon />, 
      title: "Top Rated",
      delay: 0.1
    },
    { 
      icon: <FlashOnIcon />, 
      title: "Lightning Fast",
      delay: 0.2
    },
    { 
      icon: <PsychologyIcon />, 
      title: "Gen AI Recommendation",
      delay: 0.3
    },
    { 
      icon: <LightbulbIcon />, 
      title: "Project Suggestion",
      delay: 0.4
    },
    { 
      icon: <DesignServicesIcon />, 
      title: "Professional Layouts",
      delay: 0.5
    },
    { 
      icon: <ThumbUpIcon />, 
      title: "Recruiters Approved Templates",
      delay: 0.6
    },
    { 
      icon: <VerifiedIcon />, 
      title: "ATS-Friendly",
      delay: 0.7
    },
    { 
      icon: <TrendingUpIcon />, 
      title: "Skills Suggestion",
      delay: 0.8
    }
  ];

  return (
    <Box className={classes.section}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.titleSection}>
          <Typography variant="h2" className={classes.mainTitle}>
            Key Highlights of{' '}
            <span className={classes.brandHighlight}>Giga Resume Builder</span>
          </Typography>
          <Typography className={classes.subtitle}>
            Discover the powerful features that make our resume builder stand out from the crowd
          </Typography>
        </Box>

        <Box className={classes.highlightsGrid}>
          <Box className={classes.slider}>
            {[...highlights, ...highlights].map((highlight, index) => (
              <Box
                key={index}
                className={classes.highlightCard}
              >
                <Box className={classes.iconContainer}>
                  {highlight.icon}
                </Box>
                <Typography className={classes.highlightTitle}>
                  {highlight.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default KeyHighlightsSection;