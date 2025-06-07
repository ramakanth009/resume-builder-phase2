import React from 'react';
import { Box, Typography, Fade } from '@mui/material';

const ForgotPasswordRightSection = ({ classes, securityFeatures, visibleFeatures }) => {
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