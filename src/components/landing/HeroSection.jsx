// src/components/landing/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Fade, 
  Grow,
  Slide 
} from '@mui/material';
import { 
  PlayArrowRounded,
  WorkOutline,
  SchoolOutlined,
  CodeOutlined,
  TrendingUpOutlined,
  CheckCircleOutline,
  PersonOutline,
  BuildOutlined
} from '@mui/icons-material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  heroContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '80px',
    paddingBottom: '80px',
    '@media (max-width: 960px)': {
      paddingTop: '60px',
      paddingBottom: '60px',
    },
  },
  heroContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '4rem',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 1200px)': {
      gap: '3rem',
    },
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '3rem',
      textAlign: 'center',
    },
  },
  leftContent: {
    flex: '1 1 55%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '@media (max-width: 960px)': {
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  rightContent: {
    flex: '1 1 45%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '@media (max-width: 960px)': {
      order: -1,
    },
  },
  mainHeadline: {
    fontSize: '3.5rem',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    color: '#ffffff',
    '@media (max-width: 1200px)': {
      fontSize: '3rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '2.5rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem',
    },
  },
  typewriterText: {
    color: '#ffc615',
    display: 'inline-block',
    borderRight: '3px solid #ffc615',
    paddingRight: '5px',
    animation: '$blink 1s infinite',
  },
  '@keyframes blink': {
    '0%, 50%': { borderColor: 'transparent' },
    '51%, 100%': { borderColor: '#ffc615' },
  },
  subtitle: {
    fontSize: '1.4rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '2rem',
    lineHeight: 1.6,
    maxWidth: '500px',
    '@media (max-width: 960px)': {
      fontSize: '1.2rem',
      maxWidth: '600px',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
  },
  ctaContainer: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '3rem',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
    },
  },
  primaryCTA: {
    background: 'linear-gradient(135deg, #ffc615 0%, #ffb700 100%)',
    color: '#1a1b4b',
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 700,
    borderRadius: '50px',
    textTransform: 'none',
    boxShadow: '0 8px 32px rgba(255, 198, 21, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-3px) scale(1.02)',
      boxShadow: '0 12px 40px rgba(255, 198, 21, 0.6)',
      background: 'linear-gradient(135deg, #ffb700 0%, #ffa000 100%)',
    },
    '&:active': {
      transform: 'translateY(-1px) scale(1.01)',
    },
    '@media (max-width: 600px)': {
      width: '100%',
      padding: '1rem 2rem',
    },
  },
  secondaryCTA: {
    color: '#ffffff',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '50px',
    textTransform: 'none',
    backdropFilter: 'blur(10px)',
    background: 'rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      transform: 'translateY(-2px)',
    },
    '@media (max-width: 600px)': {
      width: '100%',
      padding: '1rem 2rem',
    },
  },
  statsContainer: {
    display: 'flex',
    gap: '2rem',
    '@media (max-width: 600px)': {
      justifyContent: 'center',
      gap: '1.5rem',
    },
  },
  statItem: {
    textAlign: 'left',
    '@media (max-width: 960px)': {
      textAlign: 'center',
    },
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#ffc615',
    lineHeight: 1,
    '@media (max-width: 600px)': {
      fontSize: '2rem',
    },
  },
  statLabel: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 500,
  },
  resumePreview: {
    width: '100%',
    maxWidth: '400px',
    position: 'relative',
    perspective: '1000px',
  },
  resumeCard: {
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transform: 'rotateY(-5deg) rotateX(5deg)',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'rotateY(0deg) rotateX(0deg) scale(1.05)',
      boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
    },
  },
  resumeSection: {
    marginBottom: '1.5rem',
    opacity: 0,
    animation: '$slideInUp 0.8s ease-out forwards',
    '&:nth-child(1)': { animationDelay: '0.2s' },
    '&:nth-child(2)': { animationDelay: '0.4s' },
    '&:nth-child(3)': { animationDelay: '0.6s' },
    '&:nth-child(4)': { animationDelay: '0.8s' },
  },
  '@keyframes slideInUp': {
    'from': {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    'to': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    color: '#27286c',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  sectionContent: {
    height: '8px',
    background: 'linear-gradient(90deg, #27286c 0%, #ffc615 100%)',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
      animation: '$shimmer 2s infinite',
    },
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  floatingIcon: {
    position: 'absolute',
    padding: '12px',
    borderRadius: '50%',
    background: 'rgba(255, 198, 21, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 198, 21, 0.3)',
    color: '#ffc615',
    animation: '$float 6s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0) rotate(0deg)',
    },
    '50%': {
      transform: 'translateY(-20px) rotate(180deg)',
    },
  },
  floatingIcon1: {
    top: '10%',
    left: '10%',
    animationDelay: '0s',
  },
  floatingIcon2: {
    top: '20%',
    right: '15%',
    animationDelay: '1s',
  },
  floatingIcon3: {
    bottom: '30%',
    left: '5%',
    animationDelay: '2s',
  },
  floatingIcon4: {
    bottom: '15%',
    right: '10%',
    animationDelay: '3s',
  },
  progressBars: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  progressBar: {
    height: '4px',
    background: 'rgba(39, 40, 108, 0.2)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #27286c, #ffc615)',
    borderRadius: '2px',
    animation: '$fillProgress 3s ease-out infinite',
  },
  '@keyframes fillProgress': {
    '0%': { width: '0%' },
    '50%': { width: '85%' },
    '100%': { width: '0%' },
  },
}));

const HeroSection = ({ handleCTAClick }) => {
  const classes = useStyles();
  const [typewriterText, setTypewriterText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);

  const typewriterWords = [
    'Dream Career',
    'First Job',
    'Future Success',
    'Professional Growth',
    'Career Goals'
  ];

  useEffect(() => {
    setAnimationVisible(true);
  }, []);

  useEffect(() => {
    const currentWord = typewriterWords[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typewriterText.length < currentWord.length) {
          setTypewriterText(currentWord.substring(0, typewriterText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typewriterText.length > 0) {
          setTypewriterText(typewriterText.substring(0, typewriterText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typewriterWords.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, currentTextIndex, typewriterWords]);

  const stats = [
    { number: '10K+', label: 'Resumes Created' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'Available' }
  ];

  const resumeSections = [
    { icon: PersonOutline, title: 'Personal Info', progress: 85 },
    { icon: SchoolOutlined, title: 'Education', progress: 90 },
    { icon: CodeOutlined, title: 'Skills', progress: 75 },
    { icon: WorkOutline, title: 'Experience', progress: 80 }
  ];

  return (
    <Container maxWidth="xl" className={classes.heroContainer}>
      {/* Floating Background Elements */}
      <Box className={classes.floatingElements}>
        <Box className={`${classes.floatingIcon} ${classes.floatingIcon1}`}>
          <TrendingUpOutlined />
        </Box>
        <Box className={`${classes.floatingIcon} ${classes.floatingIcon2}`}>
          <CheckCircleOutline />
        </Box>
        <Box className={`${classes.floatingIcon} ${classes.floatingIcon3}`}>
          <BuildOutlined />
        </Box>
        <Box className={`${classes.floatingIcon} ${classes.floatingIcon4}`}>
          <WorkOutline />
        </Box>
      </Box>

      <Box className={classes.heroContent}>
        {/* Left Content */}
        <Box className={classes.leftContent}>
          <Fade in={animationVisible} timeout={800}>
            <Typography variant="h1" className={classes.mainHeadline}>
              Build Your Path to Your{' '}
              <span className={classes.typewriterText}>
                {typewriterText}
              </span>
            </Typography>
          </Fade>

          <Slide in={animationVisible} direction="up" timeout={1000}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Create professional, ATS-friendly resumes that open doors to opportunities. 
              Free for all students, with live preview and AI-powered recommendations.
            </Typography>
          </Slide>

          <Slide in={animationVisible} direction="up" timeout={1200}>
            <Box className={classes.ctaContainer}>
              <Button
                className={classes.primaryCTA}
                onClick={handleCTAClick}
                startIcon={<PlayArrowRounded />}
              >
                Start Building Free
              </Button>
              <Button
                className={classes.secondaryCTA}
                onClick={() => {
                  const element = document.getElementById('features-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See Features
              </Button>
            </Box>
          </Slide>

          <Grow in={animationVisible} timeout={1400}>
            <Box className={classes.statsContainer}>
              {stats.map((stat, index) => (
                <Box key={index} className={classes.statItem}>
                  <Typography className={classes.statNumber}>
                    {stat.number}
                  </Typography>
                  <Typography className={classes.statLabel}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grow>
        </Box>

        {/* Right Content - Interactive Resume Preview */}
        <Box className={classes.rightContent}>
          <Fade in={animationVisible} timeout={1600}>
            <Box className={classes.resumePreview}>
              <Box className={classes.resumeCard}>
                {resumeSections.map((section, index) => {
                  const IconComponent = section.icon;
                  return (
                    <Box key={index} className={classes.resumeSection}>
                      <Box className={classes.sectionHeader}>
                        <IconComponent fontSize="small" />
                        <Typography variant="body2">{section.title}</Typography>
                      </Box>
                      <Box className={classes.sectionContent} />
                    </Box>
                  );
                })}
                
                <Box className={classes.progressBars}>
                  {[1, 2, 3].map((_, index) => (
                    <Box key={index} className={classes.progressBar}>
                      <Box 
                        className={classes.progressFill} 
                        style={{ animationDelay: `${index * 0.5}s` }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;