import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Box, Fade } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GigaLogo from '../assets/giga-loogo.svg';

// Color palette matching the green theme from reference image
const colors = {
  primary: {
    main: '#0EB582',    // Primary green
    light: '#E6F7F2',   // Light green background
    dark: '#0A8F66',    // Darker green for hover states
  },
  text: {
    primary: '#2E384D',  // Dark text
    secondary: '#6B7A99', // Medium gray text
    light: '#FFFFFF',    // White text
  },
  background: {
    default: '#F5F7FA',  // Light gray background
    paper: '#FFFFFF',    // White background
    overlay: 'rgba(14, 181, 130, 0.05)', // Very light green overlay
  }
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: colors.background.overlay,
    padding: '1rem',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '400px',
    padding: '2.5rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    backgroundColor: colors.background.paper,
    transition: 'all 0.3s ease',
  },
  logoContainer: {
    marginBottom: '2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '60px',
    height: '60px',
    marginBottom: '1rem',
  },
  logoText: {
    fontWeight: 700,
    color: colors.text.primary,
    fontSize: '1.25rem',
  },
  progressContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '1rem',
  },
  progress: {
    color: colors.primary.main,
  },
  progressBackground: {
    position: 'absolute',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: colors.primary.light,
    opacity: 0.3,
  },
  message: {
    color: colors.text.primary,
    fontSize: '1rem',
    fontWeight: 500,
    textAlign: 'center',
  }
}));

const Loading = ({ message = 'Loading...' }) => {
  const classes = useStyles();
  const [dots, setDots] = useState('');

  // Add animated dots to loading message
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Box className={classes.root}>
      <Fade in={true} timeout={800}>
        <Box className={classes.container}>
          <Box className={classes.logoContainer}>
            <img src={GigaLogo} alt="Logo" className={classes.logo} />
            <Typography variant="h6" className={classes.logoText}>
              Gigaversity
            </Typography>
          </Box>
          
          <Box className={classes.progressContainer}>
            <Box className={classes.progressBackground} />
            <CircularProgress 
              size={50} 
              thickness={4} 
              className={classes.progress} 
            />
          </Box>
          
          <Typography variant="body1" className={classes.message}>
            {message}{dots}
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
};

export default Loading;