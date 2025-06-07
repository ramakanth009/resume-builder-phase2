// src/components/landing/WhoIsItFor.jsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
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
}));

const WhoIsItFor = () => {
  const classes = useStyles();

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

  return (
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
  );
};

export default WhoIsItFor;