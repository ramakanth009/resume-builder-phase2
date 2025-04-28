import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Chip
} from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import templatesData from '../../data/templatesData';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    padding: '2rem',
  },
  title: {
    fontWeight: 700,
    marginBottom: '1.5rem',
    color: '#2d3748',
  },
  subtitle: {
    marginBottom: '2rem',
    color: '#718096',
  },
  card: {
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    height: '100%',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    },
  },
  selectedCard: {
    boxShadow: '0 0 0 3px #3182ce, 0 4px 6px rgba(0,0,0,0.1)',
  },
  cardContent: {
    padding: '1rem',
  },
  cardMedia: {
    height: 200,
    backgroundSize: 'contain',
    borderRadius: '8px 8px 0 0',
    backgroundColor: '#f7fafc',
  },
  placeholderImage: {
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    borderRadius: '8px 8px 0 0',
  },
  templateName: {
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: '#2d3748',
  },
  templateDescription: {
    color: '#718096',
    fontSize: '0.875rem',
  },
  selectedChip: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 600,
    zIndex: 10,
  }
}));

const TemplateSelector = ({ selectedTemplateId, onTemplateSelect }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Choose a Template
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        Select a template that best fits your professional style. Your content will be preserved when switching templates.
      </Typography>
      
      <Grid container spacing={3}>
        {templatesData.map((template) => (
          <Grid item xs={12} sm={6} md={3} key={template.id}>
            <Card 
              className={`${classes.card} ${selectedTemplateId === template.id ? classes.selectedCard : ''}`}
              onClick={() => onTemplateSelect(template.id)}
            >
              {selectedTemplateId === template.id && (
                <Chip 
                  label="Selected" 
                  size="small" 
                  className={classes.selectedChip} 
                />
              )}
              <CardActionArea>
                {template.previewImage ? (
                  <CardMedia
                    className={classes.cardMedia}
                    image={template.previewImage}
                    title={template.name}
                  />
                ) : (
                  <Box className={classes.placeholderImage}>
                    <Typography variant="h6">{template.name}</Typography>
                  </Box>
                )}
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" className={classes.templateName}>
                    {template.name}
                  </Typography>
                  <Typography variant="body2" className={classes.templateDescription}>
                    {template.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TemplateSelector;