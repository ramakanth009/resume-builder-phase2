import React, { useMemo } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 10,
  },
  errorMessage: {
    padding: '2rem',
    color: '#e53e3e',
    textAlign: 'center',
  },
  watermark: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    color: '#a0aec0',
    opacity: 0.4,
    fontSize: '0.7rem',
    fontStyle: 'italic',
  },
}));

/**
 * Template Preview component
 * Renders a preview of the selected resume template
 * 
 * @param {Object} props - Component props
 * @param {Object} props.resumeData - Resume data to render
 * @param {string} props.templateId - ID of the template to display
 * @param {boolean} props.loading - Loading state
 * @returns {React.Component} - React component
 */
const TemplatePreview = React.memo(({ resumeData, templateId, loading = false }) => {
  const classes = useStyles();
  
  // Get template configuration with memoization to prevent unnecessary re-renders
  const template = useMemo(() => getTemplateById(templateId), [templateId]);
  
  // Memoize the PreviewComponent to avoid re-rendering when props don't change
  const PreviewComponent = useMemo(() => template.PreviewComponent, [template]);
  
  // Handle errors gracefully
  if (!template || !PreviewComponent) {
    return (
      <Box className={classes.previewContainer}>
        <Typography variant="body1" className={classes.errorMessage}>
          Error: Template not found or invalid
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box className={classes.previewContainer}>
      {/* Loading overlay */}
      {loading && (
        <Box className={classes.loadingOverlay}>
          <CircularProgress size={40} />
        </Box>
      )}
      
      {/* Template content */}
      <PreviewComponent resumeData={resumeData} />
      
      {/* Watermark - can be removed or customized as needed */}
      <Typography className={classes.watermark}>
        Generated with Resume Builder
      </Typography>
    </Box>
  );
});

export default TemplatePreview;