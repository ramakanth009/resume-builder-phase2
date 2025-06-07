// src/components/landing/StartBuildingCard.jsx
import React from 'react';
import { Typography, Button, Paper, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
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
}));

const StartBuildingCard = ({ handleCTAClick }) => {
  const classes = useStyles();

  return (
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
  );
};

export default StartBuildingCard;