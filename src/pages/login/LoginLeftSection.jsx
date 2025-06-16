import React from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { CheckCircle, Psychology, Lightbulb, Visibility, WorkspacePremium } from '@mui/icons-material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  leftSection: {
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '3rem',
    background: 'linear-gradient(135deg, #2A2B6A 0%, #3F51B5 100%)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 960px)': {
      display: 'none', // Hide on mobile like SignupLeft
    },
  },
  contentContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    zIndex: 2,
    position: 'relative',
    '@media (max-width: 1200px)': {
      maxWidth: '500px',
    },
  },
  mainHeadline: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '0.5rem',
    color: '#fff',
    '@media (max-width: 1200px)': {
      fontSize: '2.2rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '2rem',
    },
  },
  gigaText: {
    fontSize: '3.5rem',
    fontWeight: 800,
    lineHeight: 1.4,
    background: 'linear-gradient(90deg, #ffffff, #ffc615)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    '@media (max-width: 1200px)': {
      fontSize: '3rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '2.5rem',
    },
  },
  processContainer: {
    marginTop: '2rem',
    display: 'grid',
    gap: '1.5rem',
    '@media (max-width: 1200px)': {
      gap: '1.2rem',
    },
    '@media (max-width: 960px)': {
      gap: '1rem',
    },
  },
  processStep: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '1.2rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateX(10px)',
      boxShadow: '0 6px 24px 0 rgba(60,60,130,0.10), 0 1.5px 6px 0 rgba(255,198,21,0.10)',
    },
    '@media (max-width: 1200px)': {
      padding: '1rem',
      gap: '0.8rem',
    },
  },
  processIcon: {
    background: '#ffc615',
    color: '#2A2B6A',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    '@media (max-width: 1200px)': {
      width: '32px',
      height: '32px',
      fontSize: '1rem',
    },
  },
  processText: {
    fontSize: '1rem',
    '@media (max-width: 1200px)': {
      fontSize: '0.95rem',
    },
  },
  benefitsSection: {
    marginTop: '2.5rem',
    '@media (max-width: 1200px)': {
      marginTop: '2rem',
    },
  },
  benefitsTitle: {
    fontSize: '1.4rem',
    fontWeight: 600,
    marginBottom: '1.2rem',
    '@media (max-width: 1200px)': {
      fontSize: '1.3rem',
      marginBottom: '1rem',
    },
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    marginTop: '0.8rem',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateX(5px)',
    },
    '@media (max-width: 1200px)': {
      padding: '0.7rem 0.9rem',
      gap: '0.6rem',
      marginTop: '0.6rem',
    },
  },
  featureIcon: {
    color: '#ffc615',
    fontSize: '1.5rem',
    '@media (max-width: 1200px)': {
      fontSize: '1.3rem',
    },
  },
  featureText: {
    fontSize: '1rem',
    fontWeight: 500,
    '@media (max-width: 1200px)': {
      fontSize: '0.9rem',
    },
  },
  subtitle: {
    fontSize: '1.2rem',
    marginTop: '1.5rem',
    marginBottom: '2rem',
    opacity: 0.9,
    lineHeight: 1.5,
    '@media (max-width: 1200px)': {
      fontSize: '1.1rem',
      marginTop: '1.2rem',
      marginBottom: '1.5rem',
    },
  },
  highlight: {
    color: '#ffc615',
    fontWeight: 700,
  },
  animatedShape: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: '$float 20s infinite',
    zIndex: 1,
  },
  "@keyframes float": {
    "0%": { transform: "rotate(0deg) translateY(0)" },
    "50%": { transform: "rotate(180deg) translateY(-20px)" },
    "100%": { transform: "rotate(360deg) translateY(0)" },
  },
}));

const LoginLeftSection = ({ featureItems }) => {
  const classes = useStyles();
  
  return (
    <Box className={classes.leftSection}>
      <Box
        className={classes.animatedShape}
        sx={{ top: "-50px", left: "-50px", width: "200px", height: "200px" }}
      />
      <Box
        className={classes.animatedShape}
        sx={{ bottom: "-100px", right: "-100px", width: "300px", height: "300px" }}
      />

      <Fade in timeout={1000}>
        <Box className={classes.contentContainer}>
          <Typography variant="h1" className={classes.mainHeadline}>
            Welcome back to
          </Typography>
          <Typography variant="h1" className={classes.gigaText}>
            Giga Resume Builder
          </Typography>

          <Typography variant="subtitle1" className={classes.subtitle}>
            Create professional, ATS-friendly resumes that get you noticed
          </Typography>

          <Box className={classes.processContainer}>
            {[
              { icon: '1', text: 'Fill in your details with our guided form' },
              { icon: '2', text: 'Choose from multiple professional templates' },
              { icon: '3', text: 'Download your ATS-optimized resume instantly' }
            ].map((step, index) => (
              <Fade in timeout={600 + index * 200} key={index}>
                <Box className={classes.processStep}>
                  <Box className={classes.processIcon}>{step.icon}</Box>
                  <Typography variant="body1" className={classes.processText}>{step.text}</Typography>
                </Box>
              </Fade>
            ))}
          </Box>

          <Box className={classes.benefitsSection}>
            <Typography variant="h6" className={classes.benefitsTitle}>
              <span className={classes.highlight}>Student Benefits:</span>
            </Typography>
            {featureItems.map((text, i) => (
              <Fade in timeout={1200 + i * 200} key={i}>
                <Box className={classes.featureItem}>
                  <CheckCircle className={classes.featureIcon} />
                  <Typography variant="body1" className={classes.featureText}>{text}</Typography>
                </Box>
              </Fade>
            ))}
          </Box>
        </Box>
      </Fade>
      
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </Box>
  );
};

export default LoginLeftSection;