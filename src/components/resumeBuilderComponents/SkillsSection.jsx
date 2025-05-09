import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Chip, 
  InputAdornment, 
  IconButton, 
  Divider, 
  Alert, 
  CircularProgress,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getSkillRecommendations } from '../../utils/api';
import { useApiData } from '../../hooks/useApiData';

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
    marginBottom: '0.5rem',
  },
  formSubtitle: {
    fontWeight: 500,
    marginBottom: '0.75rem',
    marginTop: '1rem',
    color: '#4a5568',
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  chip: {
    backgroundColor: '#e6fffa',
    color: '#319795',
    borderRadius: '16px',
    margin: '0.25rem',
  },
  certChip: {
    backgroundColor: '#ebf3ff',
    color: '#3182ce',
    borderRadius: '16px',
    margin: '0.25rem',
  },
  divider: {
    margin: '2rem 0 1rem',
  },
  recommendationsContainer: {
    marginTop: '0.5rem',
    marginBottom: '1.5rem',
  },
  recommendationChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    fontSize: '0.75rem',
    margin: '0.25rem',
    '&:hover': {
      backgroundColor: '#bee3f8',
    },
    cursor: 'pointer',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem',
  },
  recommendationsLabel: {
    fontSize: '0.85rem',
    color: '#718096',
    fontStyle: 'italic',
    marginBottom: '0.5rem',
  },
  certMetadata: {
    fontSize: '0.75rem',
    color: '#718096',
    marginLeft: '0.5rem',
  },
  certInputs: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1rem',
    marginBottom: '1rem',
  },
  certActions: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end',
    marginBottom: '1rem'
  },
  certField: {
    marginBottom: '0.5rem',
  },
  addButton: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#bee3f8',
    },
  },
  cancelButton: {
    color: '#718096',
    borderColor: '#e2e8f0',
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#f7fafc',
    },
  }
}));

const SkillsSection = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [newSkill, setNewSkill] = useState('');
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  
  // Certificate state
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertUrl, setNewCertUrl] = useState('');
  const [editingCertIndex, setEditingCertIndex] = useState(-1);
  
  // Use custom hook for skill recommendations
  const { 
    data: recommendationsResponse,
    loading,
    error
  } = useApiData(getSkillRecommendations, targetRole, {
    enabled: !!targetRole,
    cacheKey: `skillRecommendations_${targetRole}`,
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
  
  // Extract recommended skills from the response
  const originalRecommendations = recommendationsResponse?.skills || [];
  
  // Update filtered recommendations when original recommendations change or when selected skills change
  useEffect(() => {
    if (originalRecommendations.length > 0) {
      const userSkills = new Set(resumeData.skills.filter(Boolean));
      const filtered = originalRecommendations.filter(skill => !userSkills.has(skill));
      setFilteredRecommendations(filtered);
    }
  }, [originalRecommendations, resumeData.skills]);

  // Skills handlers
  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills.filter(Boolean), newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value.trim() !== '') {
        action();
      }
    }
  };

  // Add handler for recommended skills
  const handleAddRecommendedSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills.filter(Boolean), skill],
      }));
    }
  };

  // Certificate handlers
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
      <Typography variant="h6" className={classes.formSubtitle}>
        Skills
      </Typography>
      
      <Box className={classes.chipContainer}>
        {resumeData.skills.filter(Boolean).map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            className={classes.chip}
            onDelete={() => handleRemoveSkill(skill)}
          />
        ))}
      </Box>
      
      <TextField
        label="Add Skill"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        variant="outlined"
        fullWidth
        placeholder="e.g., React.js"
        onKeyDown={(e) => handleKeyDown(e, handleAddSkill)}
        className={classes.textField}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                onClick={handleAddSkill}
                edge="end"
                color="primary"
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      {/* Recommended Skills - integrated directly after input */}
      {targetRole && (
        <Box className={classes.recommendationsContainer}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography className={classes.recommendationsLabel}>
              Popular skills in high demand:
            </Typography>
          </Box>
          
          {/* Error message */}
          {error && (
            <Alert severity="error" sx={{ my: 1 }}>
              {error}
            </Alert>
          )}
          
          {loading ? (
            <Box className={classes.loadingContainer}>
              <CircularProgress size={20} />
            </Box>
          ) : filteredRecommendations.length > 0 ? (
            <Box className={classes.chipContainer}>
              {filteredRecommendations.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  className={classes.recommendationChip}
                  onClick={() => handleAddRecommendedSkill(skill)}
                  clickable
                />
              ))}
            </Box>
          ) : originalRecommendations.length > 0 ? (
            <Typography variant="body2" color="textSecondary" sx={{ my: 1 }}>
              All related skills have been added.
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ my: 1 }}>
              No related skills available.
            </Typography>
          )}
        </Box>
      )}
      
      <Divider className={classes.divider} />
      
      <Typography variant="h6" className={classes.formSubtitle}>
        Certifications
      </Typography>
      
      {/* Certificate section */}
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
          {editingCertIndex >= 0 ? 'Update Certification' : 'Add Certification'}
        </Button>
      </Box>
    </Box>
  );
};

export default SkillsSection;