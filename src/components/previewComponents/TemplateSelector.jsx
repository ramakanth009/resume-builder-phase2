import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Chip,
  Paper,
  Fade,
  Grow,
  Divider
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getAllTemplates } from '../../templates/templateRegistry';
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
    display: 'flex',
    flexDirection: 'column',
  },
  selectedCard: {
    boxShadow: '0 0 0 3px #3182ce, 0 4px 6px rgba(0,0,0,0.1)',
  },
  cardContent: {
    padding: '1rem',
    flex: '0 0 auto',
  },
  cardMedia: {
    height: 240,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#f7fafc',
    flex: '1 0 auto',
  },
  templateImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  fallbackImage: {
    height: 240,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    borderRadius: '8px 8px 0 0',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  templateName: {
    fontWeight: 600,
    color: '#2d3748',
    textAlign: 'center',
    fontSize: '1.25rem',
  },
  templateDescription: {
    color: '#718096',
    fontSize: '0.875rem',
    textAlign: 'center',
  },
  selectedChip: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 600,
    zIndex: 10,
  },
  defaultBadge: {
    position: 'absolute',
    top: '0.5rem',
    left: '0.5rem',
    backgroundColor: '#38a169',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.7rem',
    zIndex: 10,
  },
  gridContainer: {
    marginTop: '2rem',
  },
  templateInfo: {
    marginTop: '2rem',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#f0f9ff',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  infoIcon: {
    color: '#3182ce',
  },
  infoText: {
    color: '#2d4a8a',
    fontSize: '0.9rem',
  },
  cardActionArea: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }
}));

const TemplateSelector = ({ 
  selectedTemplateId = 'classic', 
  onTemplateSelect,
  onConfirm
}) => {
  const classes = useStyles();
  const [imageErrors, setImageErrors] = useState({});
  
  // Handle template selection
  const handleTemplateClick = (templateId) => {
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    }
  };
  
  // Handle image error
  const handleImageError = (templateId) => {
    setImageErrors(prev => ({
      ...prev,
      [templateId]: true
    }));
  };
  
  // Render fallback content when image fails to load
  const renderFallbackContent = (template) => {
    return (
      <Box className={classes.fallbackImage}>
        {template.name.charAt(0)}
      </Box>
    );
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Choose a Template
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        Select a template that best fits your professional style. Your content will be preserved when switching templates.
      </Typography>
      
      {/* Template features info */}
      <Paper className={classes.templateInfo} elevation={0}>
        <InfoIcon className={classes.infoIcon} />
        <Typography className={classes.infoText}>
          All templates are ATS-friendly and designed to highlight your skills and experience professionally.
        </Typography>
      </Paper>
      
      {/* Template grid */}
      <Grid container spacing={3} className={classes.gridContainer}>
        {templatesData.map((template, index) => (
          <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            timeout={(index + 1) * 200}
            key={template.id}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card 
                className={`${classes.card} ${selectedTemplateId === template.id ? classes.selectedCard : ''}`}
                onClick={() => handleTemplateClick(template.id)}
              >
                {selectedTemplateId === template.id && (
                  <Chip 
                    label="Selected" 
                    size="small" 
                    className={classes.selectedChip} 
                    icon={<CheckIcon />}
                  />
                )}
                
                {template.isDefault && (
                  <Chip 
                    label="Default" 
                    size="small" 
                    className={classes.defaultBadge} 
                  />
                )}
                
                <CardActionArea className={classes.cardActionArea}>
                  {/* Display template image or fallback */}
                  {template.previewImage && !imageErrors[template.id] ? (
                    <div className={classes.cardMedia}>
                      <img
                        src={template.previewImage}
                        alt={`${template.name} template`}
                        className={classes.templateImage}
                        onError={() => handleImageError(template.id)}
                      />
                    </div>
                  ) : (
                    renderFallbackContent(template)
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
          </Grow>
        ))}
      </Grid>
      
      <Divider sx={{ margin: '2rem 0' }} />
    </Box>
  );
};

export default TemplateSelector;