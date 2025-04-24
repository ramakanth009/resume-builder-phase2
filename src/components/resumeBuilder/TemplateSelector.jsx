import React from 'react';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

// Template thumbnails - these would ideally be actual images
import modernTemplateImg from '../../assets/templates/modern-template.svg';
import classicTemplateImg from '../../assets/templates/classic-template.svg';
import minimalTemplateImg from '../../assets/templates/minimal-template.svg';

const useStyles = makeStylesWithTheme((theme) => ({
  selectorContainer: {
    marginBottom: '2rem',
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  title: {
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2d3748',
  },
  templateOption: {
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0.75rem',
    marginBottom: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    '&:hover': {
      borderColor: '#bce0fd',
      boxShadow: '0 2px 8px rgba(49, 130, 206, 0.1)',
    },
  },
  selectedTemplate: {
    borderColor: '#3182ce',
    boxShadow: '0 2px 8px rgba(49, 130, 206, 0.2)',
  },
  templateImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '0.5rem',
  },
  templateName: {
    fontWeight: 500,
    fontSize: '0.9rem',
    color: '#4a5568',
    textAlign: 'center',
  },
  radioButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
  },
  applyButton: {
    marginTop: '1rem',
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: 600,
    borderRadius: '8px',
    padding: '0.5rem 1.5rem',
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  description: {
    color: '#718096',
    fontSize: '0.9rem',
    marginBottom: '1.5rem',
  },
}));

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    image: modernTemplateImg,
    description: 'Clean, contemporary design with a professional look',
  },
  {
    id: 'classic',
    name: 'Classic',
    image: classicTemplateImg,
    description: 'Traditional layout, perfect for most industries',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    image: minimalTemplateImg,
    description: 'Simple, elegant design with focus on content',
  },
];

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const classes = useStyles();
  const [localTemplate, setLocalTemplate] = React.useState(selectedTemplate);

  const handleTemplateChange = (event) => {
    setLocalTemplate(event.target.value);
  };

  const handleApplyTemplate = () => {
    setSelectedTemplate(localTemplate);
  };

  return (
    <Paper className={classes.selectorContainer} elevation={0}>
      <Typography variant="h6" className={classes.title}>
        Choose Resume Template
      </Typography>
      
      <Typography variant="body2" className={classes.description}>
        Select a template that best represents your professional style. All templates are ATS-friendly.
      </Typography>
      
      <RadioGroup
        value={localTemplate}
        onChange={handleTemplateChange}
      >
        <Grid container spacing={2}>
          {templates.map((template) => (
            <Grid item xs={12} sm={4} key={template.id}>
              <Paper
                className={`${classes.templateOption} ${
                  localTemplate === template.id ? classes.selectedTemplate : ''
                }`}
                elevation={0}
                onClick={() => setLocalTemplate(template.id)}
              >
                <img
                  src={template.image}
                  alt={`${template.name} Template`}
                  className={classes.templateImage}
                />
                <Typography className={classes.templateName}>
                  {template.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" fontSize="0.8rem">
                  {template.description}
                </Typography>
                <FormControlLabel
                  value={template.id}
                  control={<Radio color="primary" />}
                  label=""
                  className={classes.radioButton}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
      
      <Box textAlign="center">
        <Button
          variant="contained"
          className={classes.applyButton}
          onClick={handleApplyTemplate}
          disabled={localTemplate === selectedTemplate}
        >
          Apply Template
        </Button>
      </Box>
    </Paper>
  );
};

export default TemplateSelector;