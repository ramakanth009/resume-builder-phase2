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
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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
  addCertButton: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#bee3f8',
    },
  },
  certDialog: {
    '& .MuiDialog-paper': {
      borderRadius: '12px',
    },
  },
  dialogTitle: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
  },
  dialogContent: {
    paddingTop: '16px !important',
  },
  certMetadata: {
    fontSize: '0.75rem',
    color: '#718096',
    marginLeft: '0.5rem',
  },
}));

const SkillsSection = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [newSkill, setNewSkill] = useState('');
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  
  // Certificate state
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [editingCertIndex, setEditingCertIndex] = useState(-1);
  const [certFormData, setCertFormData] = useState({
    name: '',
    issuer: '',
    url: ''
  });
  
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
    
    // If the removed skill was from our recommendations, it will be added back 
    // automatically via the useEffect that updates filteredRecommendations
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
      // The skill will be removed from filteredRecommendations via useEffect
    }
  };

  // Certificate handlers
  const openAddCertDialog = () => {
    setCertFormData({
      name: '',
      issuer: '',
      url: ''
    });
    setEditingCertIndex(-1);
    setCertDialogOpen(true);
  };
  
  const openEditCertDialog = (certIndex) => {
    const cert = resumeData.certifications[certIndex];
    
    // Handle both string and object formats
    if (typeof cert === 'string') {
      setCertFormData({
        name: cert,
        issuer: '',
        url: ''
      });
    } else {
      setCertFormData({
        name: cert.name || '',
        issuer: cert.issuer || '',
        url: cert.url || ''
      });
    }
    
    setEditingCertIndex(certIndex);
    setCertDialogOpen(true);
  };
  
  const handleCloseCertDialog = () => {
    setCertDialogOpen(false);
  };
  
  const handleCertFormChange = (e) => {
    const { name, value } = e.target;
    setCertFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveCertificate = () => {
    // Ensure the name field is filled
    if (!certFormData.name.trim()) {
      return;
    }
    
    // Create certificate object
    const newCert = {
      name: certFormData.name.trim(),
      issuer: certFormData.issuer.trim(),
      url: certFormData.url.trim()
    };
    
    // If we're editing an existing certificate
    if (editingCertIndex >= 0) {
      const updatedCerts = [...resumeData.certifications];
      updatedCerts[editingCertIndex] = newCert;
      
      setResumeData(prev => ({
        ...prev,
        certifications: updatedCerts
      }));
    } else {
      // Adding a new certificate
      setResumeData(prev => ({
        ...prev,
        certifications: [...prev.certifications.filter(Boolean), newCert]
      }));
    }
    
    // Close the dialog
    handleCloseCertDialog();
  };
  
  const handleRemoveCertificate = (certIndex) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, index) => index !== certIndex)
    }));
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
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" className={classes.formSubtitle}>
          Certifications
        </Typography>
        
        <Button
          startIcon={<AddIcon />}
          className={classes.addCertButton}
          onClick={openAddCertDialog}
        >
          Add Certification
        </Button>
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
            onClick={() => openEditCertDialog(index)}
            deleteIcon={<EditIcon />}
          />
        ))}
      </Box>
      
      {/* Certificate Dialog */}
      <Dialog
        open={certDialogOpen}
        onClose={handleCloseCertDialog}
        maxWidth="sm"
        fullWidth
        className={classes.certDialog}
      >
        <DialogTitle className={classes.dialogTitle}>
          {editingCertIndex >= 0 ? 'Edit Certification' : 'Add Certification'}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Certification Name"
            name="name"
            value={certFormData.name}
            onChange={handleCertFormChange}
            variant="outlined"
            fullWidth
            required
            placeholder="e.g., AWS Certified Developer"
            className={classes.textField}
          />
          <TextField
            label="Issuing Organization"
            name="issuer"
            value={certFormData.issuer}
            onChange={handleCertFormChange}
            variant="outlined"
            fullWidth
            placeholder="e.g., Amazon Web Services"
            className={classes.textField}
          />
          <TextField
            label="Certificate URL (Optional)"
            name="url"
            value={certFormData.url}
            onChange={handleCertFormChange}
            variant="outlined"
            fullWidth
            placeholder="e.g., https://aws.amazon.com/certification/..."
            className={classes.textField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCertDialog} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSaveCertificate}
            color="primary"
            variant="contained"
            disabled={!certFormData.name.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SkillsSection;