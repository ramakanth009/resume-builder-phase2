// src/components/resumeBuilder/TemplatePreview.jsx
import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { getTemplateById } from '../../templates/templateRegistry';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  previewContainer: {
    padding: '2rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    minHeight: '842px', // A4 height scaled down
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
}));

const TemplatePreview = React.memo(({ resumeData, templateId }) => {
  const classes = useStyles();
  
  // Get template configuration
  const template = useMemo(() => 
    getTemplateById(templateId), [templateId]);
  
  // Get the component for this template
  const { PreviewComponent } = template;
  
  return (
    <Box className={classes.previewContainer}>
      {/* Render the template-specific preview component */}
      <PreviewComponent resumeData={resumeData} />
    </Box>
  );
});

export default TemplatePreview;