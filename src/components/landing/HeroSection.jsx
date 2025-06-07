// src/components/landing/HeroSection.jsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import StartBuildingCard from './StartBuildingCard';

const useStyles = makeStylesWithTheme((theme) => ({
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
}));

const HeroSection = ({ handleCTAClick }) => {
  const classes = useStyles();

  return (
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
            <StartBuildingCard handleCTAClick={handleCTAClick} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;