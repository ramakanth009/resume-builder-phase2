import React, { useState } from 'react';
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
    backgroundColor: '#0a0a0a',
    position: 'relative',
    overflow: 'hidden',
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
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-5px',
      left: '0',
      width: '100%',
      height: '3px',
      backgroundColor: '#ffc614',
      borderRadius: '2px',
    },
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
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 960px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '25px',
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
      gap: '20px',
    },
  },
  highlightCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: '20px',
    padding: '40px 30px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: '2px solid transparent',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #ffc614, #ff8c00)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      zIndex: 1,
    },
    '&:hover': {
      transform: 'translateY(-10px) scale(1.02)',
      borderColor: '#ffc614',
      boxShadow: '0 20px 40px rgba(255, 198, 20, 0.2)',
      '&::before': {
        opacity: 0.05,
      },
      '& $iconContainer': {
        transform: 'scale(1.1) rotate(5deg)',
        backgroundColor: '#ffc614',
        '& svg': {
          color: '#000000',
        },
      },
      '& $highlightTitle': {
        color: '#ffc614',
      },
      '& $decorativeElement': {
        transform: 'scale(1.2) rotate(180deg)',
        opacity: 0.8,
      },
    },
    '@media (max-width: 600px)': {
      padding: '30px 25px',
    },
  },
  iconContainer: {
    width: '70px',
    height: '70px',
    backgroundColor: '#2a2a2a',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25px',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 2,
    '& svg': {
      fontSize: '32px',
      color: '#ffc614',
      transition: 'color 0.3s ease',
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
    color: '#ffffff',
    marginBottom: '0',
    transition: 'color 0.3s ease',
    position: 'relative',
    zIndex: 2,
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
    backgroundColor: '#ffc614',
    borderRadius: '50%',
    opacity: 0.1,
    transition: 'all 0.4s ease',
    zIndex: 1,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 20%, rgba(255, 198, 20, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 198, 20, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(255, 198, 20, 0.05) 0%, transparent 50%)
    `,
    zIndex: 1,
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
  const [hoveredCard, setHoveredCard] = useState(null);

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
      <Box className={classes.backgroundPattern} />
      
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
          {highlights.map((highlight, index) => (
            <Box
              key={index}
              className={classes.highlightCard}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${highlight.delay}s`,
              }}
            >
              <Box className={classes.iconContainer}>
                {highlight.icon}
              </Box>
              
              <Typography className={classes.highlightTitle}>
                {highlight.title}
              </Typography>
              
              <Box className={classes.decorativeElement} />
            </Box>
          ))}
        </Box>

        <Box className={classes.statsContainer}>
          <Box className={classes.statItem}>
            <Typography variant="h3">10K+</Typography>
            <Typography>Happy Users</Typography>
          </Box>
          <Box className={classes.statItem}>
            <Typography variant="h3">95%</Typography>
            <Typography>Success Rate</Typography>
          </Box>
          <Box className={classes.statItem}>
            <Typography variant="h3">24/7</Typography>
            <Typography>Support</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default KeyHighlightsSection;