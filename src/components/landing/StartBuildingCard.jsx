// src/components/landing/StartBuildingCard.jsx
import React from 'react';
import { Typography, Button, Paper, Box } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';


const useStyles = makeStylesWithTheme((theme) => ({
  demoForm: {
    width: '100%',
    maxWidth: '440px',
    padding: '44px',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9ff 100%)',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(42, 43, 106, 0.10)',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 960px)': {
      maxWidth: '100%',
      padding: '32px',
    },
    '@media (max-width: 600px)': {
      padding: '24px',
      borderRadius: '16px',
    },
    '@media (max-width: 480px)': {
      padding: '16px',
    },
  },
  demoTitle: {
    fontSize: '2rem !important',
    fontWeight: '900 !important',
    color: '#2A2B6A !important',
    marginBottom: '12px !important',
    textAlign: 'center',
    letterSpacing: '0.5px',
    '@media (max-width: 600px)': {
      fontSize: '1.5rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.2rem !important',
    },
  },
  demoSubtitle: {
    fontSize: '1.08rem !important',
    color: '#4b4b6b !important',
    marginBottom: '20px !important',
    textAlign: 'center',
    fontWeight: 500,
    '@media (max-width: 600px)': {
      fontSize: '0.97rem !important',
      marginBottom: '22px !important',
    },
  },
  demoButton: {
    width: '100%',
    // background: 'linear-gradient(90deg, #2A2B6A 60%, #4e54c8 100%) !important',
    background: '#2A2B6A',
    color: 'white !important',
    padding: '16px !important',
    fontSize: '1.13rem !important',
    fontWeight: 'bold !important',
    borderRadius: '50px !important',
    textTransform: 'none !important',
    marginBottom: '20px !important',
    boxShadow: '0 6px 24px rgba(42, 43, 106, 0.13)',
    transition: 'all 0.3s cubic-bezier(.4,2,.3,1) !important',
    '&:hover': {
      background: 'linear-gradient(90deg, #23245a 60%, #3a3f8f 100%) !important',
      transform: 'translateY(-2px) scale(1.03)',
      boxShadow: '0 10px 32px rgba(42, 43, 106, 0.18)',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem !important',
      padding: '12px !important',
    },
  },
  demoFeaturesList: {
    marginTop: '5px',
    marginBottom: '0',
    padding: 0,
    listStyle: 'none',
  },
  demoFeature: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '18px',
    fontSize: '1rem !important',
    color: '#2A2B6A !important',
    fontWeight: 500,
    background: 'rgba(255,255,255,0.7)',
    borderRadius: '12px',
    padding: '10px 14px',
    boxShadow: '0 2px 8px rgba(42, 43, 106, 0.04)',
    '@media (max-width: 600px)': {
      fontSize: '0.93rem !important',
      marginBottom: '12px',
      padding: '8px 10px',
    },
  },
  demoIcon: {
    color: '#FFC614 !important',
    marginRight: '14px !important',
    fontSize: '28px !important',
    '@media (max-width: 600px)': {
      fontSize: '22px !important',
      marginRight: '10px !important',
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
        startIcon={<RocketLaunchIcon />}
      >
        Create Resume Now
      </Button>
      
      <ul className={classes.demoFeaturesList}>
        <li className={classes.demoFeature}>
          <CreditScoreIcon className={classes.demoIcon} />
          <span>Free to use, no credit card required</span>
        </li>
        <li className={classes.demoFeature}>
          <TipsAndUpdatesIcon className={classes.demoIcon} />
          <span>AI-powered smart suggestions</span>
        </li>
        <li className={classes.demoFeature}>
          <WorkspacePremiumIcon className={classes.demoIcon} />
          <span>ATS-friendly, premium templates</span>
        </li>
      </ul>
    </Paper>
  );
};

export default StartBuildingCard;