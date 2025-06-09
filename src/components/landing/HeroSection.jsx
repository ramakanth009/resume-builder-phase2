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
import { useNavigate } from 'react-router-dom';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  heroContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem 2rem 2rem 5rem',
    // paddingTop: '80px',
    // paddingBottom: '80px',
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
    width: '100%',
    '@media (max-width: 1200px)': {
      gap: '3rem',
    },
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '3rem',
    },
  },

  // ===== LEFT SECTION STYLES =====
  leftSection: {
    flex: '1 1 55%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingRight: '2rem',
    '@media (max-width: 960px)': {
      alignItems: 'center',
      textAlign: 'center',
      paddingRight: 0,
      order: 1,
    },
  },
  mainHeadline: {
    fontSize: '2.5rem',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    color: '#ffffff',
    opacity: 0,
    animation: '$slideInLeft 1s ease-out 0.2s forwards',
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
  '@keyframes slideInLeft': {
    'from': {
      opacity: 0,
      transform: 'translateX(-60px)',
    },
    'to': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
  subtitle: {
    fontSize: '1.rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '2rem',
    lineHeight: 1.6,
    maxWidth: '800px',
    opacity: 0,
    animation: '$fadeInUp 1s ease-out 0.4s forwards',
    '@media (max-width: 960px)': {
      fontSize: '1.2rem',
      maxWidth: '600px',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
  },
  '@keyframes fadeInUp': {
    'from': {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    'to': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  ctaContainer: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '3rem',
    opacity: 0,
    animation: '$scaleIn 0.8s ease-out 0.6s forwards',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
    },
  },
  '@keyframes scaleIn': {
    'from': {
      opacity: 0,
      transform: 'scale(0.8)',
    },
    'to': {
      opacity: 1,
      transform: 'scale(1)',
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
    opacity: 0,
    animation: '$slideInStagger 1s ease-out 0.8s forwards',
    '@media (max-width: 600px)': {
      justifyContent: 'center',
      gap: '1.5rem',
    },
  },
  '@keyframes slideInStagger': {
    'from': {
      opacity: 0,
      transform: 'translateX(-40px)',
    },
    'to': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
  statItem: {
    textAlign: 'left',
    animation: '$bounceIn 0.6s ease-out forwards',
    '&:nth-child(1)': { animationDelay: '1s' },
    '&:nth-child(2)': { animationDelay: '1.2s' },
    '&:nth-child(3)': { animationDelay: '1.4s' },
    '@media (max-width: 960px)': {
      textAlign: 'center',
    },
  },
  '@keyframes bounceIn': {
    '0%': {
      opacity: 0,
      transform: 'scale(0.3)',
    },
    '50%': {
      opacity: 1,
      transform: 'scale(1.1)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)',
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

  // ===== RIGHT SECTION STYLES =====
  rightSection: {
    flex: '1 1 45%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: '2rem',
    '@media (max-width: 960px)': {
      paddingLeft: 0,
      order: 0,
    },
  },
  resumePreviewContainer: {
    position: 'relative',
    perspective: '1000px',
    animation: '$floatIn 1.2s ease-out 0.5s forwards',
    opacity: 0,
  },
  '@keyframes floatIn': {
    'from': {
      opacity: 0,
      transform: 'translateY(60px) rotateX(20deg)',
    },
    'to': {
      opacity: 1,
      transform: 'translateY(0) rotateX(0deg)',
    },
  },
  resumeCard: {
    width: '350px',
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transform: 'rotateY(-8deg) rotateX(3deg)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: '$morphCard 4s ease-in-out infinite',
    '&:hover': {
      transform: 'rotateY(0deg) rotateX(0deg) scale(1.05)',
      boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
      animation: 'none',
    },
    '@media (max-width: 600px)': {
      width: '300px',
      padding: '1.5rem',
    },
  },
  '@keyframes morphCard': {
    '0%, 100%': {
      transform: 'rotateY(-8deg) rotateX(3deg)',
    },
    '50%': {
      transform: 'rotateY(-5deg) rotateX(5deg)',
    },
  },
  resumeSection: {
    marginBottom: '1.5rem',
    opacity: 0,
    animation: '$buildSection 0.8s ease-out forwards',
    '&:nth-child(1)': { animationDelay: '1.5s' },
    '&:nth-child(2)': { animationDelay: '1.8s' },
    '&:nth-child(3)': { animationDelay: '2.1s' },
    '&:nth-child(4)': { animationDelay: '2.4s' },
  },
  '@keyframes buildSection': {
    'from': {
      opacity: 0,
      transform: 'translateX(20px) scale(0.8)',
    },
    'to': {
      opacity: 1,
      transform: 'translateX(0) scale(1)',
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
    animation: '$iconSpin 2s ease-in-out infinite',
  },
  '@keyframes iconSpin': {
    '0%, 90%, 100%': {
      transform: 'rotate(0deg)',
    },
    '45%': {
      transform: 'rotate(5deg)',
    },
  },
  sectionContent: {
    height: '8px',
    background: 'linear-gradient(90deg, #27286c 0%, #ffc615 100%)',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    animation: '$pulseGlow 3s ease-in-out infinite',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
      animation: '$shimmer 2.5s infinite',
    },
  },
  '@keyframes pulseGlow': {
    '0%, 100%': {
      boxShadow: '0 0 5px rgba(255, 198, 21, 0.3)',
    },
    '50%': {
      boxShadow: '0 0 20px rgba(255, 198, 21, 0.8)',
    },
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
  progressBars: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1rem',
    animation: '$slideUpProgress 1s ease-out 2.7s forwards',
    opacity: 0,
  },
  '@keyframes slideUpProgress': {
    'from': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    'to': {
      opacity: 1,
      transform: 'translateY(0)',
    },
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
    '0%': { 
      width: '0%',
      transform: 'scaleX(0)',
    },
    '50%': { 
      width: '85%',
      transform: 'scaleX(1)',
    },
    '100%': { 
      width: '0%',
      transform: 'scaleX(0)',
    },
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
    animation: '$floatAround 8s ease-in-out infinite',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '@keyframes floatAround': {
    '0%, 100%': {
      transform: 'translateY(0) rotate(0deg) scale(1)',
    },
    '25%': {
      transform: 'translateY(-15px) rotate(90deg) scale(1.1)',
    },
    '50%': {
      transform: 'translateY(0) rotate(180deg) scale(0.9)',
    },
    '75%': {
      transform: 'translateY(15px) rotate(270deg) scale(1.1)',
    },
  },
  floatingIcon1: {
    top: '10%',
    left: '10%',
    animationDelay: '0s',
  },
  floatingIcon2: {
    top: '20%',
    right: '7%',
    animationDelay: '2s',
  },
  floatingIcon3: {
    bottom: '30%',
    left: '5%',
    animationDelay: '4s',
  },
  floatingIcon4: {
    bottom: '15%',
    right: '10%',
    animationDelay: '6s',
  },
}));

const HeroSection = ({ handleCTAClick }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [typewriterText, setTypewriterText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typewriterWords = [
    'Free Resume Builder',
    'AI Assistance ',
    'Smart Suggestion',
    // 'Future Success',
    // 'Professional Growth',
    // 'Career Goals'
  ];

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
    { icon: PersonOutline, title: 'Personal Info' },
    { icon: SchoolOutlined, title: 'Education' },
    { icon: CodeOutlined, title: 'Skills' },
    { icon: WorkOutline, title: 'Experience' }
  ];

  return (
    <Container maxWidth="xl" className={classes.heroContainer}>
      <Box className={classes.heroContent}>
        {/* LEFT SECTION - Content */}
        <Box className={classes.leftSection}>
          <Typography variant="h1" className={classes.mainHeadline}>
            {/* Build Your Path to Your */}
            Create Resume That Gets You Noticed {" "}
            {/* <br /> */}
            <span className={classes.typewriterText}>
              {typewriterText}
            </span>
          </Typography>

          {/* <Typography variant="subtitle1" className={classes.subtitle}>
            Create professional, ATS-friendly resumes that open doors to opportunities. 
            Free for all students, with live preview and AI-powered recommendations.
          </Typography> */}
          <Typography variant="subtitle1" className={classes.subtitle}>
            Whether you're a fresher looking for your first IT job or a professional aiming for a career switch, Gigaversity’s Resume Builder helps you build a resume that reflects your skills, projects, and growth in a recruiter-approved, ATS-friendly format.
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Choose from a variety of resume templates that adapt to your career stage, helping you present your achievements, skills, and projects clearly and professionally — so recruiters notice what truly matters.
          </Typography>

          <Box className={classes.ctaContainer}>
            <Button
              className={classes.primaryCTA}
              onClick={() => navigate('/signup')}
              startIcon={<PlayArrowRounded />}
            >
              Create Resume Now
            </Button>
            {/* <Button
              className={classes.secondaryCTA}
              onClick={() => {
                const element = document.getElementById('features-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See Features
            </Button> */}
          </Box>

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
        </Box>

        {/* RIGHT SECTION - Interactive Resume Preview */}
        <Box className={classes.rightSection}>
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

          <Box className={classes.resumePreviewContainer}>
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
                      style={{ animationDelay: `${index * 0.8}s` }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;