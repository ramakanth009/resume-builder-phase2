import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Paper, 
  IconButton, 
  Button 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(0, 0, 0, 0.03)',
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
    position: 'relative',
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
  formDescription: {
    marginBottom: '24px',
    color: '#666',
    fontSize: '1rem'
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
    marginTop: '1rem',
    '&:hover': {
      backgroundColor: '#bee3f8',
    },
  },
  helperText: {
    marginTop: '-0.5rem',
    marginBottom: '1rem',
    color: '#718096',
    fontSize: '0.75rem',
  },
}));

const CertificationsSection = ({ resumeData, setResumeData }) => {
  const classes = useStyles();

  // Handle adding a new empty certification
  const handleAddCertification = () => {
    // Add an empty certification object to the array
    setResumeData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: '',
          issuer: '',
          url: ''
        }
      ]
    }));
  };

  // Handle changes to certification fields
  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...resumeData.certifications];
    
    // If the certification is a string, convert it to an object
    if (typeof updatedCertifications[index] === 'string') {
      updatedCertifications[index] = {
        name: updatedCertifications[index], // Use the string as the name
        issuer: '',
        url: ''
      };
    }
    
    // If the certification is already an object, just update the field
    if (typeof updatedCertifications[index] === 'object') {
      updatedCertifications[index] = {
        ...updatedCertifications[index],
        [field]: value
      };
    }
    
    // Update the resume data
    setResumeData({
      ...resumeData,
      certifications: updatedCertifications
    });
  };

  // Handle removing a certification
  const handleRemoveCertification = (index) => {
    // Don't remove if it's the only certification and it's empty
    if (resumeData.certifications.length === 1) {
      const cert = resumeData.certifications[0];
      if (
        (typeof cert === 'string' && !cert) ||
        (typeof cert === 'object' && !cert.name && !cert.issuer && !cert.url)
      ) {
        return;
      }
    }
    
    // Filter out the certification at the specified index
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
    
    // If we just removed all certifications, add an empty one
    if (resumeData.certifications.length === 1) {
      setResumeData(prev => ({
        ...prev,
        certifications: [{
          name: '',
          issuer: '',
          url: ''
        }]
      }));
    }
  };

  return (
    <Box className={classes.form}>
      <Box>
        <Typography variant="h6" className={classes.formSubtitle}>
          Certifications
        </Typography>
        <Typography variant="subtitle1" className={classes.formDescription}>
          Showcase your professional certifications
        </Typography>
      </Box>
      
      {/* Certification forms */}
      {resumeData.certifications.map((certification, index) => {
        // Handle both string and object certification formats
        const certName = typeof certification === 'string' 
          ? certification 
          : certification.name || '';
        
        const certIssuer = typeof certification === 'object' 
          ? certification.issuer || '' 
          : '';
        
        const certUrl = typeof certification === 'object' 
          ? certification.url || '' 
          : '';
        
        return (
          <Paper key={index} className={classes.paper}>
            <Box className={classes.sectionTitle}>
              <Typography variant="h6">Certification {index + 1}</Typography>
            </Box>
            
            <IconButton
              className={classes.deleteButton}
              onClick={() => handleRemoveCertification(index)}
            >
              <DeleteIcon />
            </IconButton>
            
            <TextField
              label="Certification Name"
              value={certName}
              onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
              variant="outlined"
              fullWidth
              className={classes.textField}
              required
              margin="normal"
            />
            
            <TextField
              label="Issuing Organization"
              value={certIssuer}
              onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
              variant="outlined"
              fullWidth
              className={classes.textField}
              placeholder="e.g., Amazon Web Services"
              margin="normal"
            />
            
            <TextField
              label="Certification URL"
              value={certUrl}
              onChange={(e) => handleCertificationChange(index, 'url', e.target.value)}
              variant="outlined"
              fullWidth
              className={classes.textField}
              placeholder="e.g., https://www.credly.com/badges/..."
              margin="normal"
              helperText="Optional: Link to verify the certification"
            />
          </Paper>
        );
      })}
      
      {/* Add Certification button */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddCertification}
        className={classes.addButton}
        fullWidth
      >
        Add Certification
      </Button>
    </Box>
  );
};

export default CertificationsSection;