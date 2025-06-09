import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Chip } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    padding: '6rem 2rem',
    background: 'linear-gradient(135deg, #0f0f3a 0%, #1a1a4a 100%)',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 960px)': {
      padding: '4rem 1.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '3rem 1rem',
    },
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: 'white',
    textAlign: 'center',
    marginBottom: '1rem',
    '@media (max-width: 960px)': {
      fontSize: '2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.8rem',
    },
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#a0aec0',
    textAlign: 'center',
    marginBottom: '4rem',
    maxWidth: '800px',
    margin: '0 auto 4rem auto',
    lineHeight: 1.6,
    '@media (max-width: 960px)': {
      fontSize: '1.1rem',
      marginBottom: '3rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
      marginBottom: '2rem',
    },
  },
  templatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    '@media (max-width: 960px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
  },
  templateCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 198, 20, 0.3)',
    },
  },
  templateImage: {
    height: 200,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 700,
    position: 'relative',
  },
  templateContent: {
    padding: '1.5rem',
    background: 'rgba(255, 255, 255, 0.02)',
  },
  templateName: {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: 'white',
    marginBottom: '0.5rem',
  },
  templateDescription: {
    fontSize: '0.95rem',
    color: '#a0aec0',
    lineHeight: 1.5,
  },
  recommendedBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.75rem',
    zIndex: 10,
  },
  backgroundDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 0.1,
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255, 198, 20, 0.1) 0%, rgba(255, 198, 20, 0.05) 100%)',
  },
  circle1: {
    width: '300px',
    height: '300px',
    top: '-100px',
    right: '-100px',
  },
  circle2: {
    width: '200px',
    height: '200px',
    bottom: '-50px',
    left: '-50px',
  },
}));

const templatesData = [
  {
    id: 'creative',
    name: 'Creative Resume Template',
    description: 'A creative and visually appealing template for creative professionals',
    isRecommended: false,
  },
  {
    id: 'professional',
    name: 'Professional Resume Template',
    description: 'A clean and professional template for business professionals',
    isRecommended: false,
  },
  {
    id: 'college',
    name: 'College Resume Template',
    description: 'Perfect for students and recent graduates',
    isRecommended: false,
  },
];

const TemplatesGallerySection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.backgroundDecor}>
        <Box className={`${classes.decorCircle} ${classes.circle1}`} />
        <Box className={`${classes.decorCircle} ${classes.circle2}`} />
      </Box>
      
      <Box className={classes.container}>
        <Typography className={classes.title}>
          Explore Our Collection of Professional Templates
        </Typography>
        
        <Typography className={classes.subtitle}>
          A wide range of professionally designed, ATS-compatible templates tailored for different roles, industries, and experience levels.
        </Typography>

        <Box className={classes.templatesGrid}>
          {templatesData.map((template) => (
            <Card key={template.id} className={classes.templateCard}>
              <Box className={classes.templateImage}>
                {template.isRecommended && (
                  <Chip 
                    label="Recommended" 
                    className={classes.recommendedBadge}
                    size="small"
                  />
                )}
                {template.name.charAt(0)}
              </Box>
              <CardContent className={classes.templateContent}>
                <Typography className={classes.templateName}>
                  {template.name}
                </Typography>
                <Typography className={classes.templateDescription}>
                  {template.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TemplatesGallerySection;