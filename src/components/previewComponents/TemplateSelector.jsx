import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Chip,
  Fade,
  Grow,
  Paper,
  Button,
  Divider
} from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getAllTemplates } from '../../templates/templateRegistry';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';

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
    position: 'relative',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '2rem',
    gap: '1rem',
  },
  applyButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  featuresContainer: {
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f7fafc',
    marginTop: '1rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    color: '#4a5568',
  },
  checkIcon: {
    color: '#38a169',
    fontSize: '1rem',
  },
  divider: {
    margin: '1.5rem 0',
  }
}));

/**
 * Enhanced Template Selector component
 * Allows users to browse and select from available resume templates
 * 
 * @param {Object} props - Component props
 * @param {string} props.selectedTemplateId - Currently selected template ID
 * @param {Function} props.onTemplateSelect - Callback when template is selected
 * @param {Function} props.onConfirm - Optional callback when selection is confirmed
 * @returns {React.Component} - React component
 */
const TemplateSelector = ({ 
  selectedTemplateId, 
  onTemplateSelect,
  onConfirm
}) => {
  const classes = useStyles();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Load templates on mount
  useEffect(() => {
    // Get all templates from the registry
    const allTemplates = getAllTemplates();
    setTemplates(allTemplates);
    
    // Find the selected template
    const selected = allTemplates.find(t => t.id === selectedTemplateId);
    setSelectedTemplate(selected);
    
    setLoading(false);
  }, [selectedTemplateId]);
  
  // Handle template selection
  const handleTemplateClick = (templateId) => {
    onTemplateSelect(templateId);
    
    // Find the selected template for additional info
    const selected = templates.find(t => t.id === templateId);
    setSelectedTemplate(selected);
  };
  
  // Handle confirmation button click
  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm(selectedTemplateId);
    }
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
        {templates.map((template, index) => (
          <Grow
            key={template.id}
            in={!loading}
            style={{ transformOrigin: '0 0 0' }}
            timeout={(index + 1) * 200}
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
          </Grow>
        ))}
      </Grid>
      
      {/* Selected template features */}
      {selectedTemplate && (
        <Fade in={!!selectedTemplate}>
          <Box className={classes.featuresContainer}>
            <Typography variant="subtitle1" fontWeight="600">
              {selectedTemplate.name} Template Features:
            </Typography>
            <Box mt={1}>
              <Box className={classes.featureItem}>
                <CheckIcon className={classes.checkIcon} />
                <Typography>Clean, professional design</Typography>
              </Box>
              <Box className={classes.featureItem}>
                <CheckIcon className={classes.checkIcon} />
                <Typography>Optimized for Applicant Tracking Systems (ATS)</Typography>
              </Box>
              <Box className={classes.featureItem}>
                <CheckIcon className={classes.checkIcon} />
                <Typography>PDF download with one click</Typography>
              </Box>
              <Box className={classes.featureItem}>
                <CheckIcon className={classes.checkIcon} />
                <Typography>Structured sections for easy reading</Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      )}
      
      <Divider className={classes.divider} />
      
      {/* Confirmation buttons */}
      <Box className={classes.buttonContainer}>
        <Button 
          variant="contained" 
          className={classes.applyButton}
          onClick={handleConfirmClick}
          disabled={!selectedTemplateId}
        >
          Apply Template
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(TemplateSelector);