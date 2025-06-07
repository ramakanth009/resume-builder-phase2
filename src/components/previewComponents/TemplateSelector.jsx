import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActionArea,
  Chip,
  Paper,
  Grow,
  Divider,
  Container,
  Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getAllTemplates } from '../../templates/templateRegistry';
import templatesData from '../../data/templatesData';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 20% 20%, rgba(39, 40, 108, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.05) 0%, transparent 50%)',
      pointerEvents: 'none',
    }
  },
  
  // Sticky Header
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: '1px solid rgba(39, 40, 108, 0.1)',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 16px rgba(39, 40, 108, 0.08)',
    '@media (max-width: 960px)': {
      padding: '1rem 1.5rem',
      flexDirection: 'column',
      gap: '1rem',
    },
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
  },
  
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #27286c 0%, #3182ce 50%, #14b8a6 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em',
    margin: 0,
    '@media (max-width: 960px)': {
      fontSize: '1.5rem',
      textAlign: 'center',
    },
  },
  
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: 400,
    margin: 0,
    '@media (max-width: 960px)': {
      textAlign: 'center',
      fontSize: '0.9rem',
    },
  },
  
  headerActions: {
    display: 'flex',
    gap: '1rem',
    '@media (max-width: 960px)': {
      width: '100%',
      justifyContent: 'center',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  },
  
  actionButton: {
    borderRadius: '12px',
    padding: '0.75rem 1.5rem',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '0.95rem',
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  
  cancelButton: {
    color: '#64748b',
    borderColor: '#e2e8f0',
    '&:hover': {
      backgroundColor: '#f1f5f9',
      borderColor: '#cbd5e0',
    },
  },
  
  applyButton: {
    background: 'linear-gradient(135deg, #3182ce 0%, #1e40af 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)',
      boxShadow: '0 6px 16px rgba(49, 130, 206, 0.4)',
    },
  },

  // Content Area
  content: {
    padding: '2rem',
    position: 'relative',
    zIndex: 1,
    '@media (max-width: 960px)': {
      padding: '1.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
  },
  
  infoCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(39, 40, 108, 0.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 4px 16px rgba(39, 40, 108, 0.08)',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      textAlign: 'center',
      padding: '1rem',
    },
  },
  
  infoIcon: {
    fontSize: '2rem',
    color: '#3182ce',
    '@media (max-width: 600px)': {
      fontSize: '1.5rem',
    },
  },
  
  infoText: {
    color: '#475569',
    fontSize: '1rem',
    fontWeight: 500,
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
    },
  },

  // Template Grid using flexbox
  templatesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'flex-start',
    '@media (max-width: 1200px)': {
      gap: '1.5rem',
    },
    '@media (max-width: 600px)': {
      gap: '1rem',
    },
  },
  
  templateBox: {
    width: 'calc(33.333% - 1.33rem)',
    '@media (max-width: 1200px)': {
      width: 'calc(50% - 0.75rem)',
    },
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  
  card: {
    height: '400px',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(39, 40, 108, 0.12)',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 20px 40px rgba(39, 40, 108, 0.2)',
      border: '1px solid rgba(39, 40, 108, 0.3)',
    },
    '@media (max-width: 960px)': {
      height: '350px',
      borderRadius: '16px',
      '&:hover': {
        transform: 'translateY(-4px) scale(1.01)',
      },
    },
    '@media (max-width: 600px)': {
      height: '300px',
      borderRadius: '12px',
      '&:hover': {
        transform: 'translateY(-2px)',
      },
    },
  },
  
  selectedCard: {
    background: 'linear-gradient(135deg, rgba(39, 40, 108, 0.1) 0%, rgba(49, 130, 206, 0.1) 100%)',
    border: '2px solid #3182ce',
    boxShadow: '0 0 0 4px rgba(49, 130, 206, 0.2), 0 20px 40px rgba(39, 40, 108, 0.2)',
    transform: 'translateY(-4px)',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
    },
  },
  
  cardActionArea: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  
  cardMedia: {
    height: '260px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#f8fafc',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 960px)': {
      height: '220px',
    },
    '@media (max-width: 600px)': {
      height: '180px',
    },
  },
  
  templateImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  
  fallbackImage: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #ebf8ff 0%, #f0f9ff 100%)',
    color: '#3182ce',
    fontSize: '3rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    '@media (max-width: 600px)': {
      fontSize: '2rem',
    },
  },
  
  cardContent: {
    padding: '1.5rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 960px)': {
      padding: '1.2rem',
    },
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
  },
  
  templateName: {
    fontWeight: 700,
    color: '#1e293b',
    textAlign: 'center',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    letterSpacing: '-0.01em',
    '@media (max-width: 960px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
  
  templateDescription: {
    color: '#64748b',
    fontSize: '0.9rem',
    textAlign: 'center',
    lineHeight: 1.5,
    flex: 1,
    '@media (max-width: 600px)': {
      fontSize: '0.85rem',
    },
  },
  
  selectedChip: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'linear-gradient(135deg, #3182ce 0%, #1e40af 100%)',
    color: 'white',
    fontWeight: 700,
    fontSize: '0.8rem',
    zIndex: 10,
    boxShadow: '0 4px 12px rgba(49, 130, 206, 0.4)',
    border: 'none',
    '& .MuiChip-icon': {
      color: 'white',
    },
    '@media (max-width: 600px)': {
      top: '0.5rem',
      right: '0.5rem',
      fontSize: '0.7rem',
    },
  },
  
  defaultBadge: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    fontWeight: 700,
    fontSize: '0.7rem',
    zIndex: 10,
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
    '@media (max-width: 600px)': {
      top: '0.5rem',
      left: '0.5rem',
      fontSize: '0.6rem',
    },
  },
  
  premiumBadge: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
    fontWeight: 700,
    fontSize: '0.7rem',
    zIndex: 10,
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    '@media (max-width: 600px)': {
      top: '0.5rem',
      left: '0.5rem',
      fontSize: '0.6rem',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '0.8rem',
    },
  },
  
  footer: {
    marginTop: '3rem',
    textAlign: 'center',
    '@media (max-width: 960px)': {
      marginTop: '2rem',
    },
  },
  
  footerText: {
    color: '#64748b',
    fontSize: '0.9rem',
    fontStyle: 'italic',
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
  },
}));

const TemplateSelector = ({ 
  selectedTemplateId = 'classic', 
  onTemplateSelect,
  onConfirm,
  onCancel
}) => {
  const classes = useStyles();
  const [imageErrors, setImageErrors] = useState({});
  
  const handleTemplateClick = (templateId) => {
    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    }
  };
  
  const handleImageError = (templateId) => {
    setImageErrors(prev => ({
      ...prev,
      [templateId]: true
    }));
  };
  
  const renderFallbackContent = (template) => {
    return (
      <Box className={classes.fallbackImage}>
        {template.name.charAt(0)}
      </Box>
    );
  };

  return (
    <Box className={classes.root}>
      {/* Sticky Header */}
      <Box className={classes.stickyHeader}>
        <Box className={classes.headerLeft}>
          <Typography variant="h3" className={classes.title}>
            Choose Your Perfect Template
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Select a professionally designed template that represents your style
          </Typography>
        </Box>
        
        <Box className={classes.headerActions}>
           <Button
                        onClick={onCancel}
                        variant="outlined"
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={onConfirm}
                        variant="contained"
                        color="primary"
                      >
                        Apply Template
                      </Button>
        </Box>
      </Box>

      {/* Content */}
      <Box className={classes.content}>
        {/* Info Card */}
        <Paper className={classes.infoCard} elevation={0}>
          <InfoIcon className={classes.infoIcon} />
          <Typography className={classes.infoText}>
            All templates are ATS-friendly, mobile-responsive, and designed to highlight your skills professionally. Your content will be preserved when switching templates.
          </Typography>
        </Paper>
        
        {/* Templates Container */}
        <Box className={classes.templatesContainer}>
          {templatesData.map((template, index) => (
            <Grow
              in={true}
              style={{ transformOrigin: '0 0 0' }}
              timeout={(index + 1) * 150}
              key={template.id}
            >
              <Box className={classes.templateBox}>
                <Card 
                  className={`${classes.card} ${selectedTemplateId === template.id ? classes.selectedCard : ''}`}
                  onClick={() => handleTemplateClick(template.id)}
                  elevation={0}
                >
                  {/* Selected Badge */}
                  {selectedTemplateId === template.id && (
                    <Chip 
                      label="Selected" 
                      size="small" 
                      className={classes.selectedChip} 
                      icon={<CheckCircleIcon />}
                    />
                  )}
                  
                  {/* Default Badge */}
                  {template.isDefault && (
                    <Chip 
                      label="Recommended" 
                      size="small" 
                      className={classes.defaultBadge} 
                    />
                  )}
                  
                  {/* Premium Badge */}
                  {template.isPremium && (
                    <Chip 
                      label="Premium" 
                      size="small" 
                      className={classes.premiumBadge}
                      icon={<AutoAwesomeIcon />}
                    />
                  )}
                  
                  <CardActionArea className={classes.cardActionArea}>
                    {/* Template Preview Image */}
                    <Box className={classes.cardMedia}>
                      {template.previewImage && !imageErrors[template.id] ? (
                        <img
                          src={template.previewImage}
                          alt={`${template.name} template preview`}
                          className={classes.templateImage}
                          onError={() => handleImageError(template.id)}
                        />
                      ) : (
                        renderFallbackContent(template)
                      )}
                    </Box>
                    
                    {/* Template Info */}
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
              </Box>
            </Grow>
          ))}
        </Box>
        
        {/* Footer */}
        <Box className={classes.footer}>
          <Divider sx={{ margin: '2rem 0', opacity: 0.3 }} />
          <Typography className={classes.footerText}>
            Can't decide? The Classic template is a great starting point for most professionals.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TemplateSelector;