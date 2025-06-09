import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import GroupsIcon from '@mui/icons-material/Groups';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #101138 0%, #1e1c44 50%, #2A2B6A 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  // Floating background elements
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255, 198, 20, 0.1) 0%, rgba(255, 198, 20, 0.05) 100%)',
    animation: '$float 8s ease-in-out infinite',
  },
  circle1: {
    width: '300px',
    height: '300px',
    top: '10%',
    left: '5%',
    animationDelay: '0s',
    '@media (max-width: 600px)': {
      width: '150px',
      height: '150px',
    },
  },
  circle2: {
    width: '200px',
    height: '200px',
    top: '60%',
    right: '8%',
    animationDelay: '2s',
    '@media (max-width: 600px)': {
      width: '100px',
      height: '100px',
    },
  },
  circle3: {
    width: '150px',
    height: '150px',
    bottom: '20%',
    left: '15%',
    animationDelay: '4s',
    '@media (max-width: 600px)': {
      width: '80px',
      height: '80px',
    },
  },
  circle4: {
    width: '100px',
    height: '100px',
    top: '40%',
    right: '20%',
    animationDelay: '5s',
    '@media (max-width: 600px)': {
      width: '60px',
      height: '60px',
    },
  },
  "@keyframes float": {
    '0%, 100%': {
      transform: 'translateY(0) rotate(0deg)',
      opacity: 0.6,
    },
    '50%': {
      transform: 'translateY(-30px) rotate(180deg)',
      opacity: 1,
    },
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
    paddingTop: '120px',
    paddingBottom: '80px',
    '@media (max-width: 600px)': {
      paddingTop: '100px',
      paddingBottom: '60px',
    },
  },
  container: {
    maxWidth: '1200px !important',
  },
  header: {
    textAlign: 'center',
    marginBottom: '5rem',
    '@media (max-width: 600px)': {
      marginBottom: '3rem',
    },
  },
  title: {
    fontSize: '4.5rem',
    fontWeight: 900,
    marginBottom: '1.5rem',
    background: 'linear-gradient(45deg, #ffc615 30%, #ffffff 70%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 20px rgba(255, 198, 21, 0.3)',
    '@media (max-width: 960px)': {
      fontSize: '3.8rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '3rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '2.5rem',
    },
  },
  subtitle: {
    fontSize: '1.4rem',
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: 1.6,
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
    },
  },
  mainContentBox: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '30px',
    padding: '3.5rem',
    marginBottom: '3rem',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15), 0 10px 25px rgba(255, 198, 21, 0.1)',
    border: '2px solid rgba(255, 198, 21, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 600px)': {
      padding: '2.5rem 2rem',
      borderRadius: '25px',
    },
  },
  sectionTitle: {
    fontSize: '2.8rem',
    fontWeight: 800,
    color: '#27286c',
    marginBottom: '2rem',
    textAlign: 'center',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100px',
      height: '4px',
      background: 'linear-gradient(45deg, #ffc615, #27286c)',
      borderRadius: '2px',
    },
    '@media (max-width: 600px)': {
      fontSize: '2.2rem',
    },
  },
  description: {
    fontSize: '1.2rem',
    color: '#2a2b6a',
    lineHeight: 1.8,
    textAlign: 'justify',
    marginBottom: '2.5rem',
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
  },
  locationBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#ffc615',
    color: '#27286c',
    padding: '1rem 1.5rem',
    borderRadius: '25px',
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: '2rem',
    boxShadow: '0 8px 20px rgba(255, 198, 21, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 25px rgba(255, 198, 21, 0.4)',
    },
  },
  highlightBox: {
    background: 'linear-gradient(135deg, rgba(255, 198, 21, 0.1) 0%, rgba(42, 43, 106, 0.05) 100%)',
    borderRadius: '25px',
    padding: '3rem',
    marginTop: '3rem',
    border: '2px solid rgba(255, 198, 21, 0.3)',
    position: 'relative',
    '@media (max-width: 600px)': {
      padding: '2rem',
      borderRadius: '20px',
    },
  },
  highlightTitle: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#27286c',
    marginBottom: '1.5rem',
    textAlign: 'center',
    '@media (max-width: 600px)': {
      fontSize: '1.8rem',
    },
  },
  highlightDescription: {
    fontSize: '1.2rem',
    color: '#2a2b6a',
    lineHeight: 1.8,
    textAlign: 'justify',
    marginBottom: '1.5rem',
    '&:last-child': {
      marginBottom: 0,
    },
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
  },
  featuresContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    marginTop: '4rem',
    justifyContent: 'center',
    '@media (max-width: 960px)': {
      gap: '1.5rem',
    },
  },
  featureBox: {
    flex: '1 1 280px',
    maxWidth: '350px',
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '25px',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(255, 198, 21, 0.1)',
    border: '2px solid rgba(255, 198, 21, 0.2)',
    transition: 'all 0.4s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-12px) scale(1.02)',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15), 0 10px 25px rgba(255, 198, 21, 0.2)',
      border: '2px solid rgba(255, 198, 21, 0.5)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '5px',
      background: 'linear-gradient(45deg, #ffc615, #27286c)',
    },
    '@media (max-width: 600px)': {
      padding: '2rem 1.5rem',
    },
  },
  featureIcon: {
    fontSize: '4rem !important',
    color: '#ffc615',
    marginBottom: '1.5rem',
    background: 'linear-gradient(135deg, rgba(255, 198, 21, 0.1), rgba(255, 198, 21, 0.05))',
    borderRadius: '50%',
    padding: '1rem',
    boxShadow: '0 8px 20px rgba(255, 198, 21, 0.2)',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#27286c',
    marginBottom: '1rem',
    lineHeight: 1.3,
    '@media (max-width: 600px)': {
      fontSize: '1.3rem',
    },
  },
  featureDescription: {
    fontSize: '1.1rem',
    color: '#2a2b6a',
    lineHeight: 1.7,
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
  decorativeElement: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    background: 'linear-gradient(45deg, rgba(255, 198, 21, 0.05), rgba(255, 198, 21, 0.02))',
    borderRadius: '50%',
    top: '-75px',
    right: '-75px',
    zIndex: -1,
  },
}));

const AboutUs = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <SchoolIcon className={classes.featureIcon} />,
      title: "Product-Based Learning",
      description: "India's first product-based learning platform offering hands-on experience with real-world projects incubated by leading tech companies."
    },
    {
      icon: <RocketLaunchIcon className={classes.featureIcon} />,
      title: "Industry-Grade Projects",
      description: "Build scalable, industry-grade projects in AI & ML, Full Stack Development, and Data Science with step-by-step guidance."
    },
    {
      icon: <GroupsIcon className={classes.featureIcon} />,
      title: "On-Campus & Online",
      description: "Flexible learning options with both on-campus and online programs tailored to fit your schedule and learning preferences."
    },
    {
      icon: <AutoFixHighIcon className={classes.featureIcon} />,
      title: "AI-Powered Resume Builder",
      description: "Our intelligent resume builder removes guesswork and helps you create professional, recruiter-approved resumes that get noticed."
    }
  ];

  return (
    <Box className={classes.root}>
      {/* Background Elements */}
      <Box className={classes.backgroundElements}>
        <Box className={`${classes.floatingCircle} ${classes.circle1}`} />
        <Box className={`${classes.floatingCircle} ${classes.circle2}`} />
        <Box className={`${classes.floatingCircle} ${classes.circle3}`} />
        <Box className={`${classes.floatingCircle} ${classes.circle4}`} />
      </Box>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box className={classes.contentContainer}>
        <Container className={classes.container}>
          <Box className={classes.header}>
            <Typography variant="h1" className={classes.title}>
              About Us
            </Typography>
            <Typography variant="h6" className={classes.subtitle}>
              Empowering learners with industry-grade skills and cutting-edge technology to shape the future of work
            </Typography>
          </Box>

          <Box className={classes.mainContentBox}>
            <Box className={classes.decorativeElement} />
            
            <Typography variant="h2" className={classes.sectionTitle}>
              Who We Are
            </Typography>
            
            <Typography className={classes.description}>
              Gigaversity is India's first product-based learning platform, headquartered in Hyderabad, offering both on-campus and online programs in rapidly growing domains such as AI & ML, Full Stack Development, and Data Science. Our unique approach empowers students to build industry-grade, scalable projects incubated directly by leading tech companies. This hands-on experience ensures learners gain real-world skills and understand how cutting-edge products are developed from the ground up.
            </Typography>

            <Box className={classes.locationBadge}>
              <LocationOnIcon />
              Headquartered in Hyderabad
            </Box>

            <Box className={classes.highlightBox}>
              <Typography variant="h3" className={classes.highlightTitle}>
                Why We Created the Gigaversity Resume Builder
              </Typography>
              
              <Typography className={classes.highlightDescription}>
                Your resume is your digital identity — the key to entering the professional world. Yet, many aspirants struggle with how to build a strong resume, present their skills effectively, and structure their information clearly. This confusion often leaves them blank or overwhelmed.
              </Typography>
              
              <Typography className={classes.highlightDescription}>
                To solve this, we created India's first AI-powered resume builder that breaks down these barriers. Simply by selecting your target role, our intelligent assistant guides you step-by-step to craft a professional, recruiter-approved resume that truly showcases your skills and projects — removing all the guesswork and helping you get noticed.
              </Typography>
            </Box>

            <Box className={classes.featuresContainer}>
              {features.map((feature, index) => (
                <Box key={index} className={classes.featureBox}>
                  {feature.icon}
                  <Typography variant="h6" className={classes.featureTitle}>
                    {feature.title}
                  </Typography>
                  <Typography className={classes.featureDescription}>
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default AboutUs;