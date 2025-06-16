import React from 'react';
import { Box, Typography, Fade } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  rightSection: {
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
      padding: '2.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '2rem',
    },
    '@media (max-width: 480px)': {
      padding: '1.5rem',
    },
  },
  rightContentContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    zIndex: 2,
    position: 'relative',
  },
  welcomeRight: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '1rem',
    color: '#fff',
    '@media (max-width: 960px)': {
      fontSize: '2.2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.8rem',
    },
  },
  subtitleRight: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: 'rgba(255, 255, 255, 0.9)',
    '@media (max-width: 960px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    },
  },
  processContainer: {
    marginBottom: '2rem',
  },
  processStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateX(5px)',
    },
  },
  processIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#ffc615',
    color: '#27286c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  processText: {
    fontSize: '1.1rem',
    color: '#fff',
    '@media (max-width: 480px)': {
      fontSize: '1rem',
    },
  },
  securityBenefits: {
    marginTop: '2rem',
  },
  benefitsTitle: {
    fontSize: '1.4rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#ffc615',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    marginBottom: '0.8rem',
    padding: '0.8rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateX(5px)',
    },
  },
  checkmark: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#ffc615',
    color: '#27286c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  securityNote: {
    marginTop: '1.5rem',
    padding: '1rem',
    background: 'rgba(255, 198, 21, 0.15)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 198, 21, 0.3)',
  },
  securityNoteText: {
    fontSize: '0.9rem',
    color: '#ffc615',
  },
  backgroundCircle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    animation: '$float 20s infinite',
    zIndex: 1,
  },
  "@keyframes float": {
    "0%": { transform: "rotate(0deg) translateX(0)" },
    "50%": { transform: "rotate(180deg) translateX(20px)" },
    "100%": { transform: "rotate(360deg) translateX(0)" },
  },
}));

const ForgotPasswordRightSection = ({ securityFeatures, visibleFeatures }) => {
  const classes = useStyles();
  
  return (
    <Box className={classes.rightSection}>
      {/* Background decorative circles */}
      <Box 
        className={classes.backgroundCircle} 
        sx={{
          width: '120px',
          height: '120px',
          top: '10%',
          right: '15%',
          animationDelay: '0.5s',
        }}
      />
      <Box 
        className={classes.backgroundCircle} 
        sx={{
          width: '80px',
          height: '80px',
          bottom: '20%',
          left: '10%',
          animationDelay: '1s',
        }}
      />
      <Box 
        className={classes.backgroundCircle} 
        sx={{
          width: '60px',
          height: '60px',
          top: '50%',
          right: '5%',
          animationDelay: '1.5s',
        }}
      />

      <Box className={classes.rightContentContainer}>
        <Typography className={classes.welcomeRight}>
          Secure Password Recovery
        </Typography>
        
        <Typography className={classes.subtitleRight}>
          Our password reset process ensures your account security with industry-standard protocols
        </Typography>

        <Box className={classes.processContainer}>
          <Box className={classes.processStep}>
            <Box className={classes.processIcon}>1</Box>
            <Typography className={classes.processText}>
              Enter your email address
            </Typography>
          </Box>
          
          <Box className={classes.processStep}>
            <Box className={classes.processIcon}>2</Box>
            <Typography className={classes.processText}>
              Check your email for reset link
            </Typography>
          </Box>
          
          <Box className={classes.processStep}>
            <Box className={classes.processIcon}>3</Box>
            <Typography className={classes.processText}>
              Click link and set new password
            </Typography>
          </Box>
        </Box>

        <Box className={classes.securityBenefits}>
          <Typography className={classes.benefitsTitle}>
            Security Features
          </Typography>
          
          {securityFeatures.map((feature, index) => (
            <Fade 
              key={index} 
              in={visibleFeatures.includes(index)} 
              timeout={500}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Box className={classes.featureItem}>
                <Box className={classes.checkmark}>✓</Box>
                <Typography>
                  {feature}
                </Typography>
              </Box>
            </Fade>
          ))}
          
          <Box className={classes.securityNote}>
            <Typography className={classes.securityNoteText}>
              🔒 Your security is our priority. Reset tokens expire after 1 hour and can only be used once.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordRightSection;