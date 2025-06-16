import React from 'react';
import { Box, Typography, Fade } from '@mui/material';

const LoginRightSection = ({ classes, featureItems, visibleFeatures }) => (
  <Fade in={true} timeout={800}>
    <Box className={classes.rightSection}>
      {/* Decorative background circles */}
      <Box 
        className={classes.backgroundCircle} 
        sx={{ 
          top: '10%', 
          right: '-5%', 
          width: '300px', 
          height: '300px',
          animation: 'float 15s infinite ease-in-out'
        }}
      />
      <Box 
        className={classes.backgroundCircle} 
        sx={{ 
          bottom: '5%', 
          left: '-10%', 
          width: '250px', 
          height: '250px',
          animation: 'float 12s infinite ease-in-out reverse'
        }}
      />
      <Box 
        className={classes.backgroundCircle} 
        sx={{ 
          top: '50%', 
          left: '30%', 
          width: '100px', 
          height: '100px',
          animation: 'pulse 8s infinite ease-in-out'
        }}
      />
      
      <Box className={classes.rightContentContainer}>
        <Fade in={true} timeout={1000}>
          <Typography variant="h4" className={classes.welcomeRight}>
             Resume <span className={classes.highlightText}>Builder</span>
          </Typography>
        </Fade>
        
        <Fade in={true} timeout={1200}>
          <Typography variant="subtitle1" className={classes.subtitleRight}>
            Create professional, ATS-friendly resumes that get you noticed
          </Typography>
        </Fade>
        
        <Box className={classes.processContainer}>
          <Fade in={true} timeout={1400}>
            <Box className={classes.processStep}>
              <Box className={classes.processIcon}>1</Box>
              <Typography variant="body1" className={classes.processText}>
                Fill in your details with our guided form
              </Typography>
            </Box>
          </Fade>
          
          <Fade in={true} timeout={1600}>
            <Box className={classes.processStep}>
              <Box className={classes.processIcon}>2</Box>
              <Typography variant="body1" className={classes.processText}>
                Choose from multiple professional templates
              </Typography>
            </Box>
          </Fade>
          
          <Fade in={true} timeout={1800}>
            <Box className={classes.processStep}>
              <Box className={classes.processIcon}>3</Box>
              <Typography variant="body1" className={classes.processText}>
                Download your ATS-optimized resume instantly
              </Typography>
            </Box>
          </Fade>
        </Box>
        
        <Box className={classes.studentBenefits}>
          <Fade in={true} timeout={2400}>
            <Typography variant="h6" className={classes.benefitsTitle}>
              <span className={classes.highlightText}>Student Benefits:</span>
            </Typography>
          </Fade>
          
          {featureItems.map((text, i) => (
            <Fade 
              in={visibleFeatures.includes(i)} 
              timeout={600}
              key={i}
            >
              <Box className={classes.featureItem}>
                <span className={classes.checkmark}>✓</span>
                <Typography variant="body1">{text}</Typography>
              </Box>
            </Fade>
          ))}
        </Box>
      </Box>
      
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.1; }
        }
      `}</style>
    </Box>
  </Fade>
);

export default LoginRightSection;