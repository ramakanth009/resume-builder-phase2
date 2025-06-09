// src/components/landing/WhyUseSection.jsx
import React from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  featuresSection: {
    background: 'white',
    padding: '80px 0',
    position: 'relative',
    zIndex: 2,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-50px',
      left: 0,
      width: '100%',
      height: '100px',
      background: 'white',
      transform: 'skewY(-2deg)',
      zIndex: 1,
    },
    '@media (max-width: 960px)': {
      padding: '60px 0',
    },
    '@media (max-width: 600px)': {
      padding: '40px 0',
    },
  },
  sectionTitle: {
    fontSize: '3rem !important',
    fontWeight: 'bold !important',
    color: '#2A2B6A !important',
    textAlign: 'center',
    marginBottom: '60px !important',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 960px)': {
      fontSize: '2.5rem !important',
      marginBottom: '50px !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '2rem !important',
      marginBottom: '40px !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.8rem !important',
    },
  },
  featureBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    marginBottom: '80px',
    position: 'relative',
    zIndex: 2,
    '&:nth-child(even)': {
      flexDirection: 'row-reverse',
    },
    '@media (max-width: 960px)': {
      flexDirection: 'column !important',
      gap: '40px',
      marginBottom: '60px',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      gap: '30px',
      marginBottom: '40px',
    },
  },
  featureContent: {
    flex: 1,
    '@media (max-width: 960px)': {
      order: 2,
    },
  },
  featureVisual: {
    flex: 1,
    height: '350px',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 960px)': {
      order: 1,
      height: '280px',
      width: '100%',
    },
    '@media (max-width: 600px)': {
      height: '220px',
    },
  },
  featureImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  featureTitle: {
    fontSize: '1.8rem !important',
    fontWeight: 'bold !important',
    color: '#2A2B6A !important',
    marginBottom: '20px !important',
    '@media (max-width: 960px)': {
      fontSize: '1.6rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.4rem !important',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.3rem !important',
    },
  },
  featureDescription: {
    fontSize: '1.1rem !important',
    color: '#666 !important',
    lineHeight: '1.7 !important',
    marginBottom: '25px !important',
    '@media (max-width: 960px)': {
      fontSize: '1rem !important',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.95rem !important',
    },
  },
  exampleChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '20px',
    '@media (max-width: 600px)': {
      gap: '8px',
    },
  },
  exampleChip: {
    backgroundColor: 'rgba(42, 43, 106, 0.1) !important',
    color: '#2A2B6A !important',
    fontWeight: '600 !important',
    borderRadius: '20px !important',
    fontSize: '0.85rem !important',
    '@media (max-width: 600px)': {
      fontSize: '0.8rem !important',
    },
  },
}));

const WhyUseSection = () => {
  const classes = useStyles();

  const features = [
    {
      title: "Gen AI Skill Suggestions With Real-World Use Cases",
      description: "Our resume builder analyzes your job role and recommends relevant Gen AI tools like ChatGPT, Midjourney, Figma AI, Bard, and more. Based on your profile, it automatically generates context on how these tools are commonly used—like automating workflows, enhancing design, or improving productivity so you can showcase practical, real-world impact without writing it from scratch.",
      // examples: ["ChatGPT for content creation", "Midjourney for design concepts", "Claude for code review"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Build Projects Straight From Your Resume",
      description: " Gigaversity’s resume builder recommends job-specific projects aligned with your target role such as full stack development, data science, UI/UX, or product management. You get direct access to GitHub repositories containing real-time projects with step-by-step instructions and code. This allows you to build relevant projects and showcase practical skills directly from your resume, enhancing your credibility with employers.",
      // examples: ["E-commerce platforms", "Data analytics dashboards", "Mobile app prototypes"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Smart Resume Content That Writes Itself",
      description: "Easily create a standout resume with AI-powered suggestions tailored to your job role. Get pre-written summaries, impactful bullet points, internship descriptions, and relevant keywords—all optimized for ATS systems. Especially helpful for freshers, the content is structured to highlight your strengths and match recruiter expectations, ensuring better visibility and higher chances of selection.",
      // examples: ["Role-based summaries", "Impact-driven bullet points", "Industry keywords"],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    // {
    //   title: "ATS-Friendly Templates & Formats",
    //   description: [
    //     "Designed by experts with recruiter input",
    //     "Clean and modern with a correct resume format for freshers and professionals",
    //     "Tested for compatibility with leading ATS tools",
    //     "So your resume doesn’t get rejected by a bot before a human even sees it."
    //   ],
    //   // examples: ["Recruiter-approved layouts", "ATS compatibility tested", "Professional formatting"],
    //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    // }
  ];

  return (
    <Box className={classes.featuresSection}>
      <Container maxWidth="lg">
        <Typography variant="h2" className={classes.sectionTitle}>
          Why Use <span style={{ color: '#FFC614' }}>Gigaversity Resume Builder?</span>
        </Typography>
        
        {features.map((feature, index) => (
          <Box key={index} className={classes.featureBox}>
            <Box className={classes.featureContent}>
              <Typography variant="h3" className={classes.featureTitle}>
                {index + 1}. {feature.title}
              </Typography>
              {/* Render description as points if it's an array */}
              {Array.isArray(feature.description) ? (
                <ul style={{ 
                  fontSize: '1.1rem', 
                  color: '#666', 
                  lineHeight: '1.7', 
                  marginBottom: 25, 
                  paddingLeft: 24,
                  listStyleType: 'disc',
                  listStylePosition: 'outside',
                }}>
                  {feature.description.map((point, i) => (
                    <li 
                      key={i} 
                      style={{ 
                        marginBottom: 8, 
                        color: '#666', 
                        // Use a pseudo-element for dot color if possible, else use marker CSS
                        // Modern browsers support ::marker
                        // The following is for inline style; for full support, use CSS below
                      }}
                    >
                      <span style={{
                        color: '#666',
                      }}>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body1" className={classes.featureDescription}>
                  {feature.description}
                </Typography>
              )}
              {/* <Box className={classes.exampleChips}>
                {feature.examples.map((example, idx) => (
                  <Chip 
                    key={idx}
                    label={example}
                    className={classes.exampleChip}
                  />
                ))}
              </Box> */}
            </Box>
            <Box className={classes.featureVisual}>
              <img 
                src={feature.image} 
                alt={feature.title}
                className={classes.featureImage}
              />
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default WhyUseSection;