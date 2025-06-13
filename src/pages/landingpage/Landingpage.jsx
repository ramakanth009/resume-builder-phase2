// src/pages/landingpage/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

// Import our modularized components
import Navbar from '../../components/landing/Navbar';
import HeroSection from '../../components/landing/HeroSection';
import WhyUseSection from '../../components/landing/WhyUseSection';
import KeyHighlightsSection from '../../components/landing/KeyHighlightsSection';
import ComparisonTableSection from '../../components/landing/ComparisonTableSection';
import TemplatesGallerySection from '../../components/landing/TemplatesGallerySection';
import WhoIsItFor from '../../components/landing/WhoIsItFor';
import SmartResumeSection from '../../components/landing/SmartResumeSection';
import Footer from '../../components/landing/Footer';


const useStyles = makeStylesWithTheme((theme) => ({
  landingPage: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #101138 0%, #1e1c44 50%, #2A2B6A 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
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
  "@keyframes float": {
    '0%, 100%': {
      transform: 'translateY(0) rotate(0deg)',
      opacity: 0.6,
    },
    '50%': {
      transform: 'translateY(-30px) rotate(180deg)',
      opacity: 1,
    },
  },
}));

const LandingPage = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  
  const handleCTAClick = () => {
    // Use react-router navigation to /signup
    navigate('/signup');
  };

  return (
    <Box className={classes.landingPage}>
      {/* Navbar */}
      <Navbar handleCTAClick={handleCTAClick} />
      
      {/* Animated Background Elements */}
      <Box className={classes.backgroundElements}>
        <Box className={`${classes.floatingCircle} ${classes.circle1}`} />
        <Box className={`${classes.floatingCircle} ${classes.circle2}`} />
        <Box className={`${classes.floatingCircle} ${classes.circle3}`} />
      </Box>
      
      {/* Hero Section */}
      <HeroSection handleCTAClick={handleCTAClick} />
      
      {/* Features Section */}
      <WhyUseSection />

      {/* Optionally, insert StartBuildingCard here if used */}
      {/* <StartBuildingCard handleCTAClick={handleCTAClick} /> */}

      {/* Highlights Section */}
      <KeyHighlightsSection />

      {/* Comparison Table Section */}
      <ComparisonTableSection />
      {/* Comparison Table Section */}
      <TemplatesGallerySection />

      {/* Target Audience Section */}
      <WhoIsItFor />
      
      {/* Final CTA Section */}
      <SmartResumeSection handleCTAClick={handleCTAClick} />
      
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default LandingPage;