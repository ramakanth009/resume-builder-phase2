import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Chip, 
  Paper,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(0, 0, 0, 0.03)',
      // border: '1px solid rgba(39, 40, 108, 0.08)',
      borderRadius: '16px',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      '&:hover': {
        borderColor: 'rgba(39, 40, 108, 0.12)',
      },
      '&.Mui-focused': {
        background: 'rgba(0, 0, 0, 0.05)',
        borderColor: '#14b8a6',
        boxShadow: '0 0 0 3px rgba(20, 184, 166, 0.1), 0 4px 16px rgba(39, 40, 108, 0.12)',
        transform: 'translateY(-2px)',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#427bbf',
      fontWeight: 500,
      fontSize: '0.9rem',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#14b8a6',
    },
  },
  formSubtitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#27286c',
    marginBottom: '1.5rem',
    position: 'relative',
    paddingBottom: '0.5rem',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '40px',
      height: '2px',
      background: 'linear-gradient(90deg, #14b8a6, #a78bfa)',
    },
  },
  paper: {
    padding: '1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    position: 'relative',
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    color: '#e53e3e',
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
  addButton: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    borderRadius: '8px',
    textTransform: 'none',
    height: '56px', // Match input field height
    '&:hover': {
      backgroundColor: '#bee3f8',
    },
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '1rem',
  },
 chip: {
    background: '#27286c',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: 500,
    boxShadow: '0 2px 8px rgba(39, 40, 108, 0.2)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(39, 40, 108, 0.3)',
    },
  },
  divider: {
    margin: '2rem 0 1.5rem',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    width: '100%',
  },
  inputField: {
    flex: 1,
  },
  sectionsList: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  termsContainer: {
    marginTop: '1rem',
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  checkbox: {
    color: '#3182ce',
    '&.Mui-checked': {
      color: '#3182ce',
    },
  },
  checkboxLabel: {
    fontSize: '0.9rem',
    color: '#4a5568',
  },
  disclaimer: {
    fontSize: '0.8rem',
    color: '#718096',
    marginTop: '1rem',
    fontStyle: 'italic',
  }
}));

// Suggested custom section templates
const suggestedSections = [
  'Languages',
  'Strengths',
  'Hobbies',
  'Used_Tools',
  'Key_Achievements',
  'Metrics_Used',
  'Soft_Skills',
  'Professional_Affiliations'
];

const CustomSectionsAndTerms = ({ resumeData, setResumeData, termsAccepted, setTermsAccepted }) => {
  const classes = useStyles();
  const [sectionName, setSectionName] = useState('');
  const [itemText, setItemText] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  
  // Get existing custom section names
  const existingSections = Object.keys(resumeData.customSections || {});

  const handleAddCustomSection = () => {
    if (sectionName.trim() === '') return;
    
    // Prevent duplicate sections
    if (existingSections.includes(sectionName)) {
      return;
    }
    
    setResumeData(prev => ({
      ...prev,
      customSections: {
        ...prev.customSections,
        [sectionName]: []
      }
    }));
    
    setSelectedSection(sectionName);
    setSectionName('');
  };

  const handleRemoveSection = (section) => {
    const updatedCustomSections = { ...resumeData.customSections };
    delete updatedCustomSections[section];
    
    setResumeData(prev => ({
      ...prev,
      customSections: updatedCustomSections
    }));
    
    if (selectedSection === section) {
      setSelectedSection('');
    }
  };

  const handleAddItem = () => {
    if (!selectedSection || itemText.trim() === '') return;
    
    setResumeData(prev => ({
      ...prev,
      customSections: {
        ...prev.customSections,
        [selectedSection]: [
          ...(prev.customSections[selectedSection] || []),
          itemText.trim()
        ]
      }
    }));
    
    setItemText('');
  };

  const handleRemoveItem = (section, index) => {
    const updatedItems = [...(resumeData.customSections[section] || [])];
    updatedItems.splice(index, 1);
    
    setResumeData(prev => ({
      ...prev,
      customSections: {
        ...prev.customSections,
        [section]: updatedItems
      }
    }));
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  const handleSelectSuggestedSection = (suggestedSection) => {
    // Only add if not already present
    if (!existingSections.includes(suggestedSection)) {
      setResumeData(prev => ({
        ...prev,
        customSections: {
          ...prev.customSections,
          [suggestedSection]: []
        }
      }));
      
      setSelectedSection(suggestedSection);
    } else {
      // If already exists, just select it
      setSelectedSection(suggestedSection);
    }
  };

  // Terms & Policies change handler
  const handleTermsChange = (event) => {
    const { name, checked } = event.target;
    setTermsAccepted(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // This function renders all created sections
  const renderAllSections = () => {
    if (existingSections.length === 0) {
      return (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ my: 3 }}>
          No custom sections added yet. Add a section to get started.
        </Typography>
      );
    }

    return existingSections.map(section => (
      <Paper key={section} className={classes.paper}>
        <Box className={classes.sectionTitle}>
          <Typography variant="h6">
            {section.replace('_', ' ')}
          </Typography>
          <IconButton
            color="error"
            onClick={() => handleRemoveSection(section)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        
        {/* Items in the current section */}
        <Box className={classes.chipContainer}>
          {(resumeData.customSections[section] || []).map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={() => handleRemoveItem(section, index)}
              className={classes.chip}
            />
          ))}
        </Box>
        
        {/* Add new item to this section */}
        <Box className={classes.inputContainer}>
          <TextField
            className={classes.inputField}
            label={`Add to ${section.replace('_', ' ')}`}
            value={section === selectedSection ? itemText : ''}
            onChange={(e) => {
              setSelectedSection(section);
              setItemText(e.target.value);
            }}
            variant="outlined"
            fullWidth
            placeholder="Enter text for this section"
            onKeyDown={(e) => handleKeyDown(e, handleAddItem)}
          />
          <Button
            variant="contained"
            className={classes.addButton}
            onClick={() => {
              setSelectedSection(section);
              handleAddItem();
            }}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
      </Paper>
    ));
  };

  return (
    <Box className={classes.form}>
      {/* CUSTOM SECTIONS PART */}
      <Typography variant="h6" className={classes.formSubtitle}>
        Custom Sections
      </Typography>
      
      <Typography variant="body2" paragraph>
        Add custom sections to highlight additional skills, achievements, or information relevant to your resume.
      </Typography>
      
      {/* Add new custom section - better aligned horizontally */}
      <Box className={classes.inputContainer}>
        <TextField
          className={classes.inputField}
          label="New Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="e.g., Languages, Hobbies, Publications"
          onKeyDown={(e) => handleKeyDown(e, handleAddCustomSection)}
        />
        <Button
          variant="contained"
          className={classes.addButton}
          onClick={handleAddCustomSection}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>
      
      {/* Suggested sections */}
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Or select from suggested sections:
      </Typography>
      
      <Box className={classes.chipContainer}>
        {suggestedSections.map((section) => (
          <Chip
            key={section}
            label={section.replace('_', ' ')}
            onClick={() => handleSelectSuggestedSection(section)}
            className={classes.chip}
            variant={existingSections.includes(section) ? "filled" : "outlined"}
          />
        ))}
      </Box>
      
      {/* All sections rendered persistently */}
      <Box className={classes.sectionsList}>
        {renderAllSections()}
      </Box>
      
      {/* TERMS & POLICIES PART */}
      <Divider className={classes.divider} />
      
      <Box className={classes.termsContainer}>
        <Typography variant="h6" className={classes.formSubtitle}>
          Terms & Policies
        </Typography>
        
        <Box className={classes.checkboxContainer}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={termsAccepted.updates} 
                onChange={handleTermsChange}
                name="updates"
                className={classes.checkbox}
              />
            }
            label="I accept to receive future updates from Gigaversity."
            className={classes.checkboxLabel}
          />
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={termsAccepted.dataSharing} 
                onChange={handleTermsChange}
                name="dataSharing"
                className={classes.checkbox}
              />
            }
            label="I acknowledge that the information provided above is accurate and consent to its use for AI-generated resume creation."
            className={classes.checkboxLabel}
          />
        </Box>
        
        <Typography className={classes.disclaimer}>
          Both checkboxes must be selected to proceed with resume generation.
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomSectionsAndTerms;