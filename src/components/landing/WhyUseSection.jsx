// // src/components/landing/WhyUseSection.jsx
// src/components/landing/WhyUseSection.jsx
import React, { useState } from 'react';
import { Box, Typography, Container, Card, CardContent, Chip, IconButton } from '@mui/material';
import { AutoAwesome, Code, Visibility, ZoomIn } from '@mui/icons-material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  featuresSection: {
    background: '#ffffff',
    padding: '20px 0',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1, // Ensure main content is above background
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1, // Move background behind everything
      background: `url("data:image/svg+xml,%3Csvg width='800' height='600' viewBox='0 0 800 600' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L100 80L200 40L300 120L400 60L500 140L600 100L700 180L800 120' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M0 200L100 120L200 180L300 100L400 160L500 80L600 140L700 60L800 100' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M0 400L100 320L200 380L300 300L400 360L500 280L600 340L700 260L800 300' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M0 600L100 520L200 580L300 500L400 560L500 480L600 540L700 460L800 500' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M0 0L0 200L0 400L0 600' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M100 80L100 120L100 320L100 520' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M200 40L200 180L200 380L200 580' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M300 120L300 100L300 300L300 500' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M400 60L400 160L400 360L400 560' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M500 140L500 80L500 280L500 480' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M600 100L600 140L600 340L600 540' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M700 180L700 60L700 260L700 460' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M800 120L800 100L800 300L800 500' stroke='%23F3F3F3' stroke-width='1'/%3E%3C/svg%3E") repeat`,
      backgroundSize: 'cover',
      pointerEvents: 'none',
    },
  },
  sectionTitle: {
    fontSize: '2.5rem !important',
    fontWeight: '800 !important',
    color: '#2A2B6A !important',
    textAlign: 'center',
    marginBottom: '40px !important',
    background: '#fff',
    borderRadius: '18px',

    display: 'inline-block',
    padding: '18px 36px',
    position: 'relative',
    zIndex: 2,
    '& span': {
      color: '#FFC614 !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '2rem !important',
      marginBottom: '30px !important',
      padding: '14px 20px',
    },
    '@media (max-width: 600px)': {
      padding: '10px 8px',
      borderRadius: '12px',
    },
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '25px',
    maxHeight: '500px',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      maxHeight: 'none',
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '20px',
    },
  },
  featureCard: {
    background: '#ffffff !important',
    borderRadius: '20px !important',
    padding: '0 !important',
    position: 'relative !important',
    overflow: 'hidden !important',
    cursor: 'pointer !important',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important',
    border: '2px solid #f0f2ff !important',
    boxShadow: '0 8px 30px rgba(42, 43, 106, 0.08) !important',
    height: '480px !important',
    display: 'flex !important',
    flexDirection: 'column !important',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #FFC614, #2A2B6A)',
      backgroundSize: '200% 100%',
      animation: '$gradientShift 2s ease infinite',
    },
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02) !important',
      boxShadow: '0 20px 50px rgba(42, 43, 106, 0.15) !important',
      border: '2px solid #FFC614 !important',
      '& $cardImage': {
        transform: 'scale(1.05) !important',
      },
      '& $iconContainer': {
        transform: 'rotate(360deg) scale(1.1) !important',
        background: 'linear-gradient(135deg, #FFC614, #2A2B6A) !important',
      },
    },
    '&.expanded': {
      height: 'auto !important',
      zIndex: 10,
      boxShadow: '0 24px 60px rgba(42, 43, 106, 0.22) !important',
    },
  },
  cardImageContainer: {
    height: '200px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '18px 18px 0 0',
    flexShrink: 0,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'all 0.4s ease',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(42, 43, 106, 0.8), rgba(255, 198, 20, 0.6))',
    opacity: 0,
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2A2B6A',
    fontSize: '1.5rem',
    opacity: 0, // always hidden
    transform: 'scale(0.5)',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
  },
  cardContent: {
    padding: '28px !important',
    display: 'flex !important',
    flexDirection: 'column !important',
    flex: 1,
    minHeight: 0, // Important for flex children
  },
  numberBadge: {
    position: 'absolute !important',
    top: '-15px !important',
    right: '20px !important',
    width: '35px !important',
    height: '35px !important',
    borderRadius: '50% !important',
    background: 'linear-gradient(135deg, #FFC614, #2A2B6A) !important',
    color: '#fff !important',
    fontWeight: '800 !important',
    fontSize: '1.1rem !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    boxShadow: '0 6px 20px rgba(255, 198, 20, 0.3) !important',
    zIndex: 2,
  },
  iconContainer: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #2A2B6A, #4a4d9e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '1.5rem',
    marginBottom: '15px',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 8px 25px rgba(42, 43, 106, 0.2)',
    flexShrink: 0,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '12px',
  },
  cardTitle: {
    fontSize: '1.2rem !important',
    fontWeight: '700 !important',
    color: '#2A2B6A !important',
    lineHeight: '1.3 !important',
    margin: '0 !important',
    flex: 1,
  },
  contentArea: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
  },
  cardDescription: {
    fontSize: '0.9rem !important',
    color: '#666 !important',
    lineHeight: '1.5 !important',
    marginBottom: '12px !important',
    display: '-webkit-box !important',
    WebkitLineClamp: 3, // Show 3 lines when collapsed
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'all 0.3s',
    '&.expanded': {
      display: 'block !important',
      WebkitLineClamp: 'unset',
      overflow: 'visible',
      textOverflow: 'unset',
      whiteSpace: 'normal',
    },
  },
  expandButton: {
    color: '#2A2B6A',
    fontWeight: 600,
    fontSize: '0.85rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    marginBottom: '12px',
    alignSelf: 'flex-start',
    flexShrink: 0,
    '&:hover': {
      textDecoration: 'underline',
      color: '#FFC614',
    },
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    // marginTop: 'auto', // Push to bottom
    paddingTop: '2px',
    flexShrink: 0,
  },
  tag: {
    background: 'rgba(42, 43, 106, 0.08) !important',
    color: '#2A2B6A !important',
    fontWeight: '600 !important',
    borderRadius: '12px !important',
    fontSize: '0.75rem !important',
    height: '24px !important',
    transition: 'all 0.2s ease !important',
    '&:hover': {
      background: 'linear-gradient(45deg, #2A2B6A, #FFC614) !important',
      color: '#fff !important',
      transform: 'translateY(-1px) !important',
    },
  },
  floatingElement: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(255, 198, 20, 0.05)',
    animation: '$float 8s ease-in-out infinite',
    '&:nth-child(1)': {
      top: '15%',
      left: '5%',
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      top: '70%',
      right: '8%',
      animationDelay: '3s',
    },
    '&:nth-child(3)': {
      bottom: '20%',
      left: '15%',
      animationDelay: '6s',
    },
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: 0.3 },
    '50%': { transform: 'translateY(-20px) rotate(180deg)', opacity: 0.6 },
  },
}));

const WhyUseSection = () => {
  const classes = useStyles();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const features = [
    {
      title: "Gen AI Skill Suggestions With Real-World Use Cases",
      description: "Our resume builder analyzes your job role and recommends relevant Gen AI tools like ChatGPT, Midjourney, Figma AI, Bard, and more. Based on your profile, it automatically generates context on how these tools are commonly used—like automating workflows, enhancing design, or improving productivity so you can showcase practical, real-world impact without writing it from scratch.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <AutoAwesome />,
      tags: ["AI Tools", "Real-world", "Automation", "Productivity"]
    },
    {
      title: "Build Projects Straight From Your Resume", 
      description: "Gigaversity's resume builder recommends job-specific projects aligned with your target role such as full stack development, data science, UI/UX, or product management. You get direct access to GitHub repositories containing real-time projects with step-by-step instructions and code. This allows you to build relevant projects and showcase practical skills directly from your resume, enhancing your credibility with employers.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <Code />,
      tags: ["GitHub", "Projects", "Skills", "Portfolio"]
    },
    {
      title: "Smart Resume Content That Writes Itself",
      description: "Easily create a standout resume with AI-powered suggestions tailored to your job role. Get pre-written summaries, impactful bullet points, internship descriptions, and relevant keywords—all optimized for ATS systems. Especially helpful for freshers, the content is structured to highlight your strengths and match recruiter expectations, ensuring better visibility and higher chances of selection.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: <Visibility />,
      tags: ["ATS Ready", "Keywords", "AI Content", "Job Match"]
    }
  ];

  return (
    <Box className={classes.featuresSection}>
      <Box className={classes.floatingElement} />
      <Box className={classes.floatingElement} />
      <Box className={classes.floatingElement} />
      
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mb={4}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Why Use <span>Giga Resume Builder?</span>
          </Typography>
        </Box>
        <Box className={classes.cardsContainer}>
          {features.map((feature, index) => {
            const isExpanded = expandedCard === index;
            return (
              <Card
                key={index}
                className={`${classes.featureCard}${isExpanded ? ' expanded' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setExpandedCard(isExpanded ? null : index)}
                style={{ cursor: 'pointer' }}
              >
                <Box className={classes.cardImageContainer}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className={classes.cardImage}
                  />
                  <Box className={classes.imageOverlay}>
                    <IconButton className={classes.playButton}>
                      <ZoomIn />
                    </IconButton>
                  </Box>
                </Box>
                <CardContent className={classes.cardContent}>
                  <Box className={classes.titleContainer}>
                    <Box className={classes.iconContainer}>
                      {feature.icon}
                    </Box>
                    <Typography className={classes.cardTitle}>
                      {feature.title}
                    </Typography>
                  </Box>
                  
                  <Box className={classes.contentArea}>
                    <Typography
                      className={`${classes.cardDescription}${isExpanded ? ' expanded' : ''}`}
                    >
                      {feature.description}
                    </Typography>
                    
                    <button
                      className={classes.expandButton}
                      tabIndex={-1}
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        setExpandedCard(isExpanded ? null : index);
                      }}
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                    
                    <Box className={classes.tagContainer}>
                      {feature.tags.map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          className={classes.tag}
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default WhyUseSection;