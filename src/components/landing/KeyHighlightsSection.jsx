// src/components/landing/KeyHighlightsSection.jsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CodeIcon from '@mui/icons-material/Code';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
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
}));

const KeyHighlightsSection = () => {
  const classes = useStyles();

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

  return (
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
  );
};

export default KeyHighlightsSection;