// // src/components/landing/KeyHighlightsSection.jsx
// import React from 'react';
// import { Box, Typography, Container } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';
// import SpeedIcon from '@mui/icons-material/Speed';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import CodeIcon from '@mui/icons-material/Code';
// import EditIcon from '@mui/icons-material/Edit';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import makeStylesWithTheme from '../../styles/makeStylesAdapter';

// const useStyles = makeStylesWithTheme((theme) => ({
//   highlightsSection: {
//     background: 'linear-gradient(135deg, #2A2B6A 0%, #1a1b4a 100%)',
//     padding: '80px 0',
//     position: 'relative',
//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       top: '-50px',
//       left: 0,
//       width: '100%',
//       height: '100px',
//       background: 'white',
//       transform: 'skewY(2deg)',
//       zIndex: 1,
//     },
//     '@media (max-width: 960px)': {
//       padding: '60px 0',
//     },
//     '@media (max-width: 600px)': {
//       padding: '40px 0',
//     },
//   },
//   highlightsTitle: {
//     fontSize: '3rem !important',
//     fontWeight: 'bold !important',
//     color: 'white !important',
//     textAlign: 'center',
//     marginBottom: '60px !important',
//     position: 'relative',
//     zIndex: 2,
//     '@media (max-width: 960px)': {
//       fontSize: '2.5rem !important',
//       marginBottom: '50px !important',
//     },
//     '@media (max-width: 600px)': {
//       fontSize: '2rem !important',
//       marginBottom: '40px !important',
//     },
//   },
//   highlightsContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '20px',
//     justifyContent: 'center',
//     position: 'relative',
//     zIndex: 2,
//     '@media (max-width: 960px)': {
//       gap: '15px',
//     },
//   },
//   highlightItem: {
//     background: 'rgba(255, 255, 255, 0.1)',
//     backdropFilter: 'blur(10px)',
//     borderRadius: '20px',
//     padding: '30px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',
//     border: '1px solid rgba(255, 255, 255, 0.2)',
//     transition: 'all 0.3s ease',
//     minWidth: '200px',
//     flex: '1 1 calc(25% - 20px)',
//     maxWidth: 'calc(25% - 20px)',
//     '&:hover': {
//       background: 'rgba(255, 198, 20, 0.2)',
//       transform: 'translateY(-10px)',
//     },
//     '@media (max-width: 1200px)': {
//       flex: '1 1 calc(33.333% - 20px)',
//       maxWidth: 'calc(33.333% - 20px)',
//     },
//     '@media (max-width: 960px)': {
//       flex: '1 1 calc(50% - 15px)',
//       maxWidth: 'calc(50% - 15px)',
//       padding: '25px',
//     },
//     '@media (max-width: 600px)': {
//       flex: '1 1 100%',
//       maxWidth: '100%',
//       padding: '20px',
//     },
//   },
//   highlightIcon: {
//     fontSize: '40px !important',
//     color: '#FFC614 !important',
//     marginBottom: '15px !important',
//     '@media (max-width: 600px)': {
//       fontSize: '35px !important',
//     },
//   },
//   highlightLabel: {
//     fontSize: '1rem !important',
//     fontWeight: 'bold !important',
//     color: 'white !important',
//     '@media (max-width: 600px)': {
//       fontSize: '0.9rem !important',
//     },
//   },
// }));

// const KeyHighlightsSection = () => {
//   const classes = useStyles();

//   const highlights = [
//     { icon: <StarIcon />, label: "Top Rated" },
//     { icon: <SpeedIcon />, label: "Lightning Fast" },
//     { icon: <AutoAwesomeIcon />, label: "Gen AI recommendation" },
//     { icon: <CodeIcon />, label: "Project Suggestion" },
//     { icon: <EditIcon />, label: "Professional Layouts" },
//     { icon: <CheckCircleIcon />, label: "Recruiters approved Templates" },
//     { icon: <VerifiedUserIcon />, label: "ATS-Friendly" },
//     { icon: <TrendingUpIcon />, label: "Skills Suggestion" }
//   ];

//   return (
//     <Box className={classes.highlightsSection}>
//       <Container maxWidth="lg">
//         <Typography variant="h2" className={classes.highlightsTitle}>
//           Key Highlights of <span style={{ color: '#FFC614' }}>Giga Resume Builder</span>
//         </Typography>
        
//         <Box className={classes.highlightsContainer}>
//           {highlights.map((highlight, index) => (
//             <Box key={index} className={classes.highlightItem}>
//               <Box className={classes.highlightIcon}>
//                 {highlight.icon}
//               </Box>
//               <Typography className={classes.highlightLabel}>
//                 {highlight.label}
//               </Typography>
//             </Box>
//           ))}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default KeyHighlightsSection;
import React from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DevicesIcon from '@mui/icons-material/Devices';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

const useStyles = makeStylesWithTheme((theme) => ({
  section: {
    padding: '2rem 1rem',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 960px)': {
      padding: '4rem 1rem',
    },
    '@media (max-width: 600px)': {
      padding: '3rem 1rem',
    },
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  sectionHeading: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: '1rem',
    position: 'relative',
    '@media (max-width: 600px)': {
      marginBottom: '2rem',
    },
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    background: 'linear-gradient(90deg, #FFFFFF, #ffc615)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    '@media (max-width: 960px)': {
      fontSize: '2.2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.8rem',
    },
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '700px',
    margin: '0 auto',
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
  featureCard: {
    height: '100%',
    padding: '1rem',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.07)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
      background: 'rgba(255, 255, 255, 0.1)',
      '& $featureIcon': {
        transform: 'scale(1.1)',
        color: '#ffc615',
      },
      '& $featureTitle': {
        // transform: 'scale(1.1)',
        color: '#ffc615',
      },
    },
    '@media (max-width: 600px)': {
      padding: '1.5rem',
    },
  },
  featureIcon: {
    fontSize: '2.5rem',
    color: '#FFFFFF',
    // marginBottom: '0.5rem',
    transition: 'transform 0.3s ease, color 0.3s ease',
    '@media (max-width: 600px)': {
      fontSize: '2rem',
      marginBottom: '1rem',
    },
  },
  featureTitle: {
    fontSize: '1.4rem',
    fontWeight: 600,
    // marginBottom: '1rem',
    minHeight: '38px',
    color: '#FFFFFF',
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
      marginBottom: '0.75rem',
    },
  },
  featureDescription: {
    fontSize: '1rem',
    color: '#ffffff',
    lineHeight: 1.6,
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
  },
  highlightText: {
    color: '#ffc615',
    fontWeight: 600,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255, 198, 21, 0.1) 0%, rgba(255, 198, 21, 0) 70%)',
    width: '100px',
    height: '100px',
    bottom: '-50px',
    right: '-50px',
    zIndex: -1,
  },
  featuresWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '24px',
    justifyContent: 'center',
    '@media (max-width: 960px)': {
      gap: '18px',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '16px',
    },
  },
  featureBox: {
    flex: '1 1 360px',
    minWidth: '340px',
    maxWidth: '440px',
    display: 'flex',
    // Ensures cards are same height
    alignItems: 'stretch',
    '@media (max-width: 960px)': {
      minWidth: '260px',
      maxWidth: '100%',
    },
    '@media (max-width: 600px)': {
      minWidth: '0',
      width: '100%',
      maxWidth: '100%',
    },
  },
  featureHeader: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent:"center",
    gap: '1rem',
    marginBottom: '1rem',
    width: '100%',
  },
}));

const KeyHighlightsSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <AutoFixHighIcon className={classes.featureIcon} />,
      title: 'AI-Powered Resume Generation',
      description: 'Our GenAI technology analyzes your details to craft professional, customized resumes optimized for applicant tracking systems.'
    },
    {
      icon: <FindInPageIcon className={classes.featureIcon} />,
      title: 'ATS-Friendly Templates',
      description: 'Every template is carefully designed to pass through Applicant Tracking Systems with flying colors, increasing your interview chances.'
    },
    {
      icon: <DevicesIcon className={classes.featureIcon} />,
      title: 'Real-Time Preview',
      description: 'See your resume take shape as you type with our intuitive split-screen interface showing instant updates.'
    },
    {
      icon: <FormatPaintIcon className={classes.featureIcon} />,
      title: 'Multiple Design Options',
      description: 'Choose from a variety of professional templates to match your personal style and industry standards.'
    },
    {
      icon: <SpeedIcon className={classes.featureIcon} />,
      title: 'Quick Resume Building',
      description: 'Complete your professional resume in minutes with our guided step-by-step process and smart recommendations.'
    },
    {
      icon: <SecurityIcon className={classes.featureIcon} />,
      title: 'Secure Cloud Storage',
      description: 'Your resumes are safely stored in the cloud, allowing you to access, edit, and download them anytime, anywhere.'
    }
  ];

  return (
    <Box className={classes.section}>
      <Box className={classes.container}>
        <Box className={classes.sectionHeading}>
          <Typography variant="h2" className={classes.title}>
            Key Highlights
          </Typography>
          <Typography className={classes.subtitle}>
            Our resume builder combines powerful AI technology with user-friendly design to help you create standout resumes that get noticed
          </Typography>
        </Box>

        <Box className={classes.featuresWrapper}>
          {features.map((feature, index) => (
            <Box className={classes.featureBox} key={index}>
              <Paper elevation={0} className={classes.featureCard}>
                <Box className={classes.featureHeader}>
                  {feature.icon}
                  <Typography className={classes.featureTitle}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography className={classes.featureDescription}>
                  {feature.description}
                </Typography>
                <Box className={classes.decorativeCircle} />
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default KeyHighlightsSection;