import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Chip, 
  Button 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    '@media (max-width: 1200px)': {
      gap: '0.9rem',
    },
    '@media (max-width: 960px)': {
      gap: '0.8rem',
    },
    '@media (max-width: 600px)': {
      gap: '0.7rem',
    },
    '@media (max-width: 480px)': {
      gap: '0.6rem',
    },
    '@media (max-width: 375px)': {
      gap: '0.5rem',
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
    '@media (max-width: 1200px)': {
      fontSize: '1.4rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.3rem',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem',
    },
  },
  formDescription: {
    color: '#666',
    fontSize: '1rem',
    '@media (max-width: 1200px)': {
      fontSize: '0.95rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.9rem',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.75rem',
    },
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '1rem',
    '@media (max-width: 1200px)': {
      gap: '0.7rem',
      marginTop: '0.9rem',
    },
    '@media (max-width: 960px)': {
      gap: '0.65rem',
      marginTop: '0.8rem',
    },
    '@media (max-width: 600px)': {
      gap: '0.6rem',
      marginTop: '0.7rem',
    },
    '@media (max-width: 480px)': {
      gap: '0.5rem',
      marginTop: '0.6rem',
    },
    '@media (max-width: 375px)': {
      gap: '0.4rem',
      marginTop: '0.5rem',
    },
  },
  certChip: {
    backgroundColor: '#ebf3ff',
    color: '#3182ce',
    borderRadius: '16px',
    margin: '0.25rem',
    fontSize: '0.875rem',
    '@media (max-width: 1200px)': {
      fontSize: '0.85rem',
      margin: '0.2rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
      margin: '0.15rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.7rem',
      margin: '0.1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.65rem',
      margin: '0.08rem',
    },
  },
  certMetadata: {
    fontSize: '0.75rem',
    color: '#718096',
    marginLeft: '0.5rem',
    '@media (max-width: 1200px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.65rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.6rem',
      marginLeft: '0.4rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.55rem',
      marginLeft: '0.3rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.5rem',
      marginLeft: '0.25rem',
    },
  },
  certInputs: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1rem',
    marginBottom: '1rem',
    '@media (max-width: 1200px)': {
      gap: '0.9rem',
      marginBottom: '0.9rem',
    },
    '@media (max-width: 960px)': {
      gap: '0.8rem',
      marginBottom: '0.8rem',
    },
    '@media (max-width: 600px)': {
      gap: '0.7rem',
      marginBottom: '0.7rem',
    },
    '@media (max-width: 480px)': {
      gap: '0.6rem',
      marginBottom: '0.6rem',
    },
    '@media (max-width: 375px)': {
      gap: '0.5rem',
      marginBottom: '0.5rem',
    },
  },
  certActions: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    '@media (max-width: 1200px)': {
      marginBottom: '0.9rem',
    },
    '@media (max-width: 960px)': {
      marginBottom: '0.8rem',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '0.4rem',
      marginBottom: '0.7rem',
    },
    '@media (max-width: 480px)': {
      gap: '0.3rem',
      marginBottom: '0.6rem',
    },
    '@media (max-width: 375px)': {
      gap: '0.25rem',
      marginBottom: '0.5rem',
    },
  },
  certField: {
    marginBottom: '0.5rem',
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
      '@media (max-width: 600px)': {
        fontSize: '0.85rem',
      },
      '@media (max-width: 480px)': {
        fontSize: '0.8rem',
      },
      '@media (max-width: 375px)': {
        fontSize: '0.75rem',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#14b8a6',
    },
    '& .MuiOutlinedInput-input': {
      fontSize: '1rem',
      '@media (max-width: 600px)': {
        fontSize: '0.9rem',
      },
      '@media (max-width: 480px)': {
        fontSize: '0.85rem',
      },
      '@media (max-width: 375px)': {
        fontSize: '0.8rem',
      },
    },
    '@media (max-width: 1200px)': {
      marginBottom: '0.45rem',
    },
    '@media (max-width: 960px)': {
      marginBottom: '0.4rem',
    },
    '@media (max-width: 600px)': {
      marginBottom: '0.35rem',
    },
    '@media (max-width: 480px)': {
      marginBottom: '0.3rem',
    },
    '@media (max-width: 375px)': {
      marginBottom: '0.25rem',
    },
  },
  addButton: {
    background: '#ffc615',
    color: '#27286c',
    borderRadius: '16px',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      background: '#ffd245',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(255, 198, 21, 0.4)',
    },
    '@media (max-width: 1200px)': {
      padding: '0.9rem',
      fontSize: '0.95rem',
    },
    '@media (max-width: 960px)': {
      padding: '0.8rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.75rem',
      fontSize: '0.85rem',
      width: '100%',
    },
    '@media (max-width: 480px)': {
      padding: '0.7rem',
      fontSize: '0.8rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.65rem',
      fontSize: '0.75rem',
    },
  },
  cancelButton: {
    color: '#718096',
    borderColor: '#e2e8f0',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#f7fafc',
    },
    '@media (max-width: 1200px)': {
      padding: '0.45rem 0.9rem',
      fontSize: '0.95rem',
    },
    '@media (max-width: 960px)': {
      padding: '0.4rem 0.8rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.35rem 0.7rem',
      fontSize: '0.85rem',
      width: '100%',
    },
    '@media (max-width: 480px)': {
      padding: '0.3rem 0.6rem',
      fontSize: '0.8rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
    },
  }
}));

const CertificationsSection = ({ resumeData, setResumeData }) => {
  const classes = useStyles();
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertUrl, setNewCertUrl] = useState('');
  const [editingCertIndex, setEditingCertIndex] = useState(-1);

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value.trim() !== '') {
        action();
      }
    }
  };

  const handleAddCertificate = () => {
    if (!newCertName.trim()) return;
    
    // Create a certificate object or string based on available info
    let newCert = newCertName.trim();
    
    // If we have issuer or URL, create an object
    if (newCertIssuer.trim() || newCertUrl.trim()) {
      newCert = {
        name: newCertName.trim(),
        issuer: newCertIssuer.trim(),
        url: newCertUrl.trim()
      };
    }
    
    // If we're editing an existing certificate
    if (editingCertIndex >= 0) {
      const updatedCerts = [...resumeData.certifications];
      updatedCerts[editingCertIndex] = newCert;
      
      setResumeData(prev => ({
        ...prev,
        certifications: updatedCerts
      }));
      
      // Reset editing state
      setEditingCertIndex(-1);
    } else {
      // Adding a new certificate
      setResumeData(prev => ({
        ...prev,
        certifications: [...prev.certifications.filter(Boolean), newCert]
      }));
    }
    
    // Clear the form
    setNewCertName('');
    setNewCertIssuer('');
    setNewCertUrl('');
  };
  
  const handleEditCertificate = (index) => {
    const cert = resumeData.certifications[index];
    
    // Set editing index
    setEditingCertIndex(index);
    
    // Fill the form with certificate data
    if (typeof cert === 'string') {
      setNewCertName(cert);
      setNewCertIssuer('');
      setNewCertUrl('');
    } else {
      setNewCertName(cert.name || '');
      setNewCertIssuer(cert.issuer || '');
      setNewCertUrl(cert.url || '');
    }
  };
  
  const handleCancelEdit = () => {
    setEditingCertIndex(-1);
    setNewCertName('');
    setNewCertIssuer('');
    setNewCertUrl('');
  };
  
  const handleRemoveCertificate = (index) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
    
    // If we were editing this cert, cancel the edit
    if (editingCertIndex === index) {
      handleCancelEdit();
    }
  };
  
  // Helper function to get certificate display text
  const getCertificateDisplayText = (cert) => {
    if (typeof cert === 'string') {
      return cert;
    }
    
    return cert.name;
  };
  
  // Helper function to get certificate metadata
  const getCertificateMetadata = (cert) => {
    if (typeof cert === 'string') {
      return '';
    }
    
    if (cert.issuer && cert.issuer.trim() !== '') {
      return `| ${cert.issuer}`;
    }
    
    return '';
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
      
      <Box className={classes.chipContainer}>
        {resumeData.certifications.filter(Boolean).map((cert, index) => (
          <Chip
            key={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {getCertificateDisplayText(cert)}
                <Typography className={classes.certMetadata}>
                  {getCertificateMetadata(cert)}
                </Typography>
              </Box>
            }
            className={classes.certChip}
            onDelete={() => handleRemoveCertificate(index)}
            deleteIcon={<DeleteIcon />}
            onClick={() => handleEditCertificate(index)}
          />
        ))}
      </Box>
      
      {/* Certificate input fields */}
      <Box className={classes.certInputs}>
        <TextField
          label="Certification Name"
          value={newCertName}
          onChange={(e) => setNewCertName(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="e.g., AWS Certified Developer"
          onKeyDown={(e) => handleKeyDown(e, handleAddCertificate)}
          className={classes.certField}
          required
        />
        <TextField
          label="Issuing Organization (Optional)"
          value={newCertIssuer}
          onChange={(e) => setNewCertIssuer(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="e.g., Amazon Web Services"
          className={classes.certField}
        />
        <TextField
          label="Certificate URL (Optional)"
          value={newCertUrl}
          onChange={(e) => setNewCertUrl(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="e.g., https://aws.amazon.com/certification/..."
          className={classes.certField}
        />
      </Box>
      
      {/* Certificate action buttons */}
      <Box className={classes.certActions}>
        {editingCertIndex >= 0 && (
          <Button
            variant="outlined"
            className={classes.cancelButton}
            onClick={handleCancelEdit}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="contained"
          className={classes.addButton}
          onClick={handleAddCertificate}
          startIcon={editingCertIndex >= 0 ? <EditIcon /> : <AddIcon />}
          disabled={!newCertName.trim()}
          fullWidth
        >
          {editingCertIndex >= 0 ? 'Update Certification' : 'Click Here To Add Certification'}
        </Button>
      </Box>
    </Box>
  );
};

export default CertificationsSection;