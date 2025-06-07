// src/components/landing/SmartResumeSection.jsx
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
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
}));

const SmartResumeSection = ({ handleCTAClick }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
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
          onClick={() => navigate('/signup')}
          endIcon={<LaunchIcon />}
        >
          Start Building Your Future Now
        </Button>
      </Container>
    </Box>
  );
};

export default SmartResumeSection;