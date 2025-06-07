import React from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { 
  CheckCircle, 
  Psychology, 
  Lightbulb, 
  Visibility, 
  WorkspacePremium 
} from '@mui/icons-material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

// Custom styles for the left section
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
      padding: '2.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '2rem',
    },
    '@media (max-width: 480px)': {
      padding: '1.5rem',
    },
  },
  contentContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    zIndex: 2,
    position: 'relative',
  },
  mainHeadline: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '0.5rem',
    // lineHeight: 1.1,
    color: '#fff', // changed from gradient to white
    '@media (max-width: 960px)': {
      fontSize: '3rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '2.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '2rem',
    },
  },
  gigaText: {
    fontSize: '3.5rem',
    fontWeight: 800,
    lineHeight: 1.4,
    color: '#fff', // ensure white color
    background: 'linear-gradient(90deg, #ffffff, #ffc615)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    '@media (max-width: 960px)': {
      fontSize: '3rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '2.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '2rem',
    },
  },
  tagline: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    fontWeight: 500,
    lineHeight: 1.4,
    '@media (max-width: 960px)': {
      fontSize: '1.3rem',
      marginBottom: '2.5rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
      marginBottom: '2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
      marginBottom: '1.5rem',
    },
  },
  featuresHeading: {
    fontSize: '1.4rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    '@media (max-width: 960px)': {
      fontSize: '1.3rem',
      marginBottom: '1.2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
      marginBottom: '1rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
      marginBottom: '0.8rem',
    },
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
      gap: '0.5rem',
    },
  },
  featureItem: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '1.2rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    transition: 'box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1), background 0.3s ease',
    willChange: 'transform, box-shadow',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 6px 24px 0 rgba(60,60,130,0.10), 0 1.5px 6px 0 rgba(255,198,21,0.10)',
      transform: 'scale(1.03)',
    },
    '@media (max-width: 960px)': {
      padding: '1rem',
      gap: '0.6rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.8rem',
      gap: '0.5rem',
    },
  },
  featureIcon: {
    color: '#ffc615',
    fontSize: '1.5rem',
    '@media (max-width: 480px)': {
      fontSize: '1.3rem',
    },
  },
  featureText: {
    fontSize: '1rem',
    fontWeight: 500,
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
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
    "0%": { transform: "rotate(0deg) translateX(0)" },
    "50%": { transform: "rotate(180deg) translateX(20px)" },
    "100%": { transform: "rotate(360deg) translateX(0)" },
  },
  ctaIndication: {
    marginTop: '2.5rem',
    textAlign: 'center',
    padding: '1.5rem',
    background: 'rgba(255, 198, 21, 0.15)',
    borderRadius: '12px',
    border: '2px solid rgba(255, 198, 21, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      animation: '$shimmer 2s infinite',
    },
    '@media (max-width: 600px)': {
      padding: '1.2rem',
      marginTop: '2rem',
    },
  },
  "@keyframes shimmer": {
    "0%": { left: "-100%" },
    "100%": { left: "100%" },
  },
  ctaText: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#ffc615',
    marginBottom: '0.5rem',
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    },
  },
  ctaSubtext: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 400,
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
  }
}));

const SignupLeftSection = () => {
  const classes = useStyles();
  
  // Features list with corresponding icons
  const features = [
    { text: "ATS Friendly", icon: CheckCircle },
    { text: "GenAI Recommendations", icon: Psychology },
    { text: "Project Recommendations", icon: Lightbulb },
    { text: "Real-time Preview", icon: Visibility },
    { text: "Recruiter-approved Templates", icon: WorkspacePremium }
  ];

  return (
    <Box className={classes.leftSection}>
      {/* Animated background shapes */}
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
          {/* Headline split into two lines */}
          <Typography variant="h1" className={classes.mainHeadline} sx={{ color: '#fff' }}>
            Launch your career with
          </Typography>
          <Typography variant="h1" className={classes.gigaText}>
            Giga Resume Builder
          </Typography>

          <Typography variant="h2" className={classes.tagline}>
            Write your first career chapter — <span className={classes.highlight}>For Free</span>
          </Typography>

          <Typography variant="h3" className={classes.featuresHeading}>
            Exclusive features:
          </Typography>

          <Box className={classes.featuresGrid}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Fade in timeout={600 + index * 200} key={index}>
                  <Box className={classes.featureItem}>
                    <IconComponent className={classes.featureIcon} />
                    <Typography className={classes.featureText}>
                      {feature.text}
                    </Typography>
                  </Box>
                </Fade>
              );
            })}
          </Box>

          <Fade in timeout={1800}>
            <Box className={classes.ctaIndication}>
              <Typography className={classes.ctaText}>
                Get Started Now
              </Typography>
              <Typography className={classes.ctaSubtext}>
                Join thousands building their dream careers
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Fade>
    </Box>
  );
};

export default SignupLeftSection;