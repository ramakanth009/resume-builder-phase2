import React from 'react';
import { Box, Typography, Fade } from '@mui/material';

const ResetPasswordRightSection = ({ classes, securityFeatures, visibleFeatures, isSuccess = false }) => {
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
        {isSuccess ? (
          <>
            <Typography className={classes.welcomeRight}>
              Password Reset Complete! 🎉
            </Typography>
            
            <Typography className={classes.subtitleRight}>
              Your account is now secure with your new password. You can log in and continue building amazing resumes!
            </Typography>

            <Box className={classes.processContainer}>
              <Box className={classes.processStep}>
                <Box className={classes.processIcon}>✓</Box>
                <Typography className={classes.processText}>
                  Password successfully updated
                </Typography>
              </Box>
              
              <Box className={classes.processStep}>
                <Box className={classes.processIcon}>🔒</Box>
                <Typography className={classes.processText}>
                  Account security verified
                </Typography>
              </Box>
              
              <Box className={classes.processStep}>
                <Box className={classes.processIcon}>🚀</Box>
                <Typography className={classes.processText}>
                  Ready to build your resume
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Typography className={classes.welcomeRight}>
              Create Your New Password
            </Typography>
            
            <Typography className={classes.subtitleRight}>
              Choose a strong password that meets our security requirements to protect your account
            </Typography>

            <Box className={classes.processContainer}>
              <Box className={classes.processStep}>
                <Box className={classes.processIcon}>1</Box>
                <Typography className={classes.processText}>
                  Enter a strong new password
                </Typography>
              </Box>
              
              <Box className={classes.processStep}>
                <Box className={classes.processIcon}>2</Box>
                <Typography className={classes.processText}>
                  Confirm your password
                </Typography>
              </Box>
              
              <Box className={classes.processStep}>
                <Box className={classes.processIcon}>3</Box>
                <Typography className={classes.processText}>
                  Login with your new credentials
                </Typography>
              </Box>
            </Box>

            <Box className={classes.securityBenefits}>
              <Typography className={classes.benefitsTitle}>
                Password Requirements
              </Typography>
              
              <Box className={classes.featureItem}>
                <Box className={classes.checkmark}>8+</Box>
                <Typography>
                  At least 8 characters long
                </Typography>
              </Box>
              
              <Box className={classes.featureItem}>
                <Box className={classes.checkmark}>Aa</Box>
                <Typography>
                  Upper and lowercase letters
                </Typography>
              </Box>
              
              <Box className={classes.featureItem}>
                <Box className={classes.checkmark}>123</Box>
                <Typography>
                  At least one number
                </Typography>
              </Box>
              
              <Box className={classes.featureItem}>
                <Box className={classes.checkmark}>!@#</Box>
                <Typography>
                  At least one special character
                </Typography>
              </Box>
              
              <Box className={classes.securityNote}>
                <Typography className={classes.securityNoteText}>
                  🔐 Your password is encrypted and stored securely. We never store passwords in plain text.
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {!isSuccess && (
          <Box className={classes.securityBenefits} sx={{ marginTop: '1rem' }}>
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
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ResetPasswordRightSection;