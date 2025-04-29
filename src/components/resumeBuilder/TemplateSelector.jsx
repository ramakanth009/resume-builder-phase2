// src/components/resumeBuilder/TemplateSelector.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Chip,
  Fade 
} from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getAllTemplates } from '../../templates/templateRegistry';

const useStyles = makeStylesWithTheme((theme) => ({
  // Keep your existing styles
  templateCard: {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  // Add additional styles as needed
}));

const TemplateSelector = ({ selectedTemplateId, onTemplateSelect }) => {
  const classes = useStyles();
  const templates = getAllTemplates();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Choose a Template
      </Typography>
      
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={3} key={template.id}>
            <Fade in={true} timeout={300 + templates.indexOf(template) * 100}>
              <Card 
                className={`${classes.card} ${classes.templateCard} ${selectedTemplateId === template.id ? classes.selectedCard : ''}`}
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
                  {/* Card content as before */}
                </CardActionArea>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(TemplateSelector);