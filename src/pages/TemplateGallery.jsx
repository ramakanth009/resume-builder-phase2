import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Chip,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import templatesData from '../data/templatesData';
import Navbar from '../components/Navbar';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    minHeight: '100vh',
    padding: '4rem 0',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#2d3748',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: '2rem',
    color: '#718096',
    textAlign: 'center',
  },
  card: {
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    position: 'relative',
    width: '100%',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    },
  },
  selectedCard: {
    boxShadow: '0 0 0 3px #3182ce, 0 4px 6px rgba(0,0,0,0.1)',
  },
  cardContent: {
    padding: '1.5rem',
    flexGrow: 0,
  },
  cardMedia: {
    height: '280px',
    backgroundSize: 'contain',
    borderRadius: '8px 8px 0 0',
    backgroundColor: '#f7fafc',
    flexGrow: 1,
  },
  placeholderImage: {
    height: '280px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    borderRadius: '8px 8px 0 0',
    flexGrow: 1,
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
    top: '1rem',
    right: '1rem',
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 600,
    zIndex: 10,
  },
  actionButton: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '0.75rem 2rem',
    fontWeight: 600,
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
  }
}));

const TemplateGallery = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  // Get currently selected template from localStorage
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem('selectedTemplateId') || 'classic';
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleTemplateSelect = (id) => {
    setSelectedTemplate(id);
  };

  const handleApplyTemplate = () => {
    // Save selected template to localStorage
    localStorage.setItem('selectedTemplateId', selectedTemplate);
    setOpenSnackbar(true);
    
    // Navigate back to resume builder after a short delay
    setTimeout(() => {
      navigate('/resume-builder');
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Navbar currentPage="templates" />
      <Container className={classes.root} maxWidth="lg">
        <Typography variant="h3" className={classes.title}>
          Resume Templates
        </Typography>
        <Typography variant="h6" className={classes.subtitle}>
          Choose a template that best represents your professional style
        </Typography>

        <Grid container spacing={4}>
          {templatesData.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card
                className={`${classes.card} ${selectedTemplate === template.id ? classes.selectedCard : ''}`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                {selectedTemplate === template.id && (
                  <Chip
                    label="Selected"
                    size="small"
                    className={classes.selectedChip}
                  />
                )}
                <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
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

        <Box className={classes.actionButton}>
          <Button
            variant="contained"
            className={classes.applyButton}
            onClick={handleApplyTemplate}
          >
            Apply Selected Template
          </Button>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Template applied successfully! Redirecting to resume builder...
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default TemplateGallery;