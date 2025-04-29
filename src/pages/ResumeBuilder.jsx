import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Stepper, 
  Step, 
  StepLabel, 
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import Alert from '@mui/material/Alert';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateResume, getResumeById, updateResume } from '../utils/api';
import { adaptGeneratedResume } from '../utils/resumeAdapter';
import { generateResumePDF } from '../utils/pdfUtils';

// Section Components
import PersonalInfoSection from '../components/resumeBuilder/PersonalInfoSection';
import EducationSection from '../components/resumeBuilder/EducationSection';
import SkillsSection from '../components/resumeBuilder/SkillsSection';
import ProjectsSection from '../components/resumeBuilder/ProjectsSection';
import ExperienceSection from '../components/resumeBuilder/ExperienceSection';
import CustomSectionsAndTerms from '../components/resumeBuilder/CustomSectionsAndTerms';
import ResumePreview from '../components/resumeBuilder/ResumePreview';
import TemplateSelector from '../components/resumeBuilder/TemplateSelector';
import TemplateButton from '../components/resumeBuilder/TemplateButton';
import templatesData from '../data/templatesData';

import useDummyResumeData from './useDummyResumeData';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    minHeight: '100vh',
    padding: '2rem 0',
    backgroundColor: '#f9f9f9',
  },
  container: {
    height: '100%',
  },
  formColumn: {
    padding: '1rem',
    height: '100%',
    overflowY: 'auto',
    borderRight: {
      xs: 'none',
      md: '1px solid #e2e8f0'
    },
  },
  previewColumn: {
    padding: '1rem',
    height: '100%',
    overflowY: 'auto',
    backgroundColor: '#ffffff',
  },
  paper: {
    padding: '1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
  },
  buttonNext: {
    backgroundColor: '#3182ce',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  buttonBack: {
    color: '#718096',
    borderColor: '#e2e8f0',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#f7fafc',
    },
  },
  stepper: {
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: 'transparent',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row'
    },
  },
  columnBox: {
    flex: 1,
    width: {
      xs: '100%',
      md: '50%'
    },
  },
  loader: {
    marginLeft: '0.5rem',
    color: 'white',
  },
  stepLabel: {
    cursor: 'pointer',
  },
  downloadButton: {
    backgroundColor: '#38a169',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: '#2f855a',
    },
  },
  editButton: {
    backgroundColor: '#805ad5',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: '#6b46c1',
    },
  },
  disabledButton: {
    backgroundColor: '#a0aec0 !important',
    color: 'white !important',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginBottom: '1rem',
  },
  viewModeToggle: {
    display: 'flex',
    marginBottom: '1rem',
    justifyContent: 'center',
    gap: '1rem',
  },
  editModeButton: {
    backgroundColor: '#805ad5',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#6b46c1',
    },
  },
  previewModeButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#3182ce',
    },
  },
  activeModeButton: {
    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
  },
  pageTitle: {
    fontWeight: 700,
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#2d3748',
  },
  statusChip: {
    marginLeft: '0.5rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: '#e6fffa',
    color: '#319795',
  },
  successStatusChip: {
    backgroundColor: '#e6fffa',
    color: '#319795',
  },
  warningStatusChip: {
    backgroundColor: '#fffaf0',
    color: '#dd6b20',
  },
  resumeIdText: {
    fontSize: '0.875rem',
    color: '#718096',
    marginBottom: '1rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  templateSelectorWrapper: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  templateActionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem',
    gap: '1rem',
  },
  templateDialog: {
    '& .MuiDialog-paper': {
      maxWidth: '900px',
      width: '90%',
    },
  },
  templateButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
  }
}));

// Step labels for the stepper - Combined "Custom Sections" and "Terms & Policies"
const steps = [
  'Personal Info',
  'Education',
  'Skills',
  'Projects',
  'Experience',
  'Custom Sections & Terms'
];

/**
 * Prepares form data for API submission by ensuring all required fields are present
 * in both generate and update formats
 * @param {Object} formData - The current resume form data
 * @returns {Object} - Properly formatted data for API
 */
const prepareFormDataForApi = (formData) => {
  // Create a deep copy of the data to avoid mutations
  const apiData = JSON.parse(JSON.stringify(formData));
  
  // Handle education fields - ensure both formats are present
  if (apiData.education) {
    apiData.education.graduation_year = apiData.education.graduation_year || apiData.education.graduationYear || '';
    apiData.education.graduationYear = apiData.education.graduationYear || apiData.education.graduation_year || '';
  }
  
  // Handle work experience - ensure both formats are available
  if (apiData.work_experience && Array.isArray(apiData.work_experience)) {
    apiData.work_experience = apiData.work_experience.map(exp => {
      // Ensure all required fields exist in both formats
      return {
        ...exp,
        company_name: exp.company_name || exp.companyName || '',
        companyName: exp.companyName || exp.company_name || '',
        responsibilities: exp.responsibilities || (exp.description ? exp.description.split('\n').filter(Boolean) : []),
      };
    });
    
    // Also map to workExperience for update format
    apiData.workExperience = apiData.work_experience.map(exp => ({
      position: exp.position || '',
      companyName: exp.companyName || exp.company_name || '',
      duration: exp.duration || '',
      responsibilities: exp.responsibilities || (exp.description ? exp.description.split('\n').filter(Boolean) : []),
    }));
  }
  
  // Handle projects - ensure both formats are available
  if (apiData.projects && Array.isArray(apiData.projects)) {
    apiData.projects = apiData.projects.map(proj => {
      // Create technologies array from skills_used if not present
      const technologies = proj.technologies && proj.technologies.length 
        ? proj.technologies 
        : (proj.skills_used ? proj.skills_used.split(',').map(s => s.trim()) : []);
      
      // Create responsibilities array from description if not present
      const responsibilities = proj.responsibilities && proj.responsibilities.length
        ? proj.responsibilities
        : (proj.description ? proj.description.split('\n').filter(Boolean) : []);
      
      return {
        ...proj,
        technologies,
        responsibilities,
      };
    });
  }
  
  return apiData;
};

const ResumeBuilder = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Get resumeId from URL params if editing an existing resume
  const { resumeId } = useParams();
  
  // Determine if we're in edit mode based on URL param
  const isEditingExisting = Boolean(resumeId);
  
  // State Declarations
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState({
    updates: false,
    dataSharing: false
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });
  const [loadingError, setLoadingError] = useState(null);
  
  // Template selection states
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    templatesData.find(t => t.isDefault)?.id || 'classic'
  );
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  
  // Initialize resumeData with empty structure and fields for both formats
  const [resumeData, setResumeData] = useState({
    header: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: '',
      github: '',
      linkedin: '',
      portfolio: '',
    },
    summary: '',
    education: {
      degree: '',
      specialization: '',
      institution: '',
      graduation_year: '',
      // Also include graduationYear for update format compatibility
      graduationYear: '',
    },
    skills: [''],
    projects: [{   
      name: '',
      skills_used: '',
      description: '',
      // Add fields for update format
      responsibilities: [],
      link: '',
      technologies: [],
    }],
    certifications: [''],
    work_experience: [{
      position: '',
      company_name: '',
      // Add field for update format
      companyName: '',
      duration: '',
      description: '',
      responsibilities: [],
    }],
    target_role: '',
    customSections: {}
  });

  // Initialize the dummy data hook
  const { loadDummyData, resetData, isLoaded } = useDummyResumeData(resumeData, setResumeData);

  // Fetch resume data if in edit mode
  useEffect(() => {
    if (isEditingExisting && resumeId) {
      const fetchResumeData = async () => {
        setLoadingResume(true);
        setLoadingError(null);
        
        try {
          const response = await getResumeById(resumeId);
          
          if (response && response.status === 'success') {
            // Set the resume data from API response
            // Pass the resumeId to ensure it's stored in the adapted resume
            const adaptedResume = adaptGeneratedResume(response.resume, resumeId);
            setGeneratedResume(adaptedResume);
            
            // Log for debugging
            console.log("Resume loaded with ID:", adaptedResume.id);
            
            // Map the data to form fields
            const updatedFormData = mapGeneratedDataToFormFields(adaptedResume);
            setResumeData(updatedFormData);
            
            // Set terms as accepted since we're editing an existing resume
            setTermsAccepted({
              updates: true,
              dataSharing: true
            });
            
            setSnackbar({
              open: true,
              message: 'Resume loaded successfully',
              severity: 'success'
            });
          } else {
            throw new Error(response?.message || 'Failed to load resume');
          }
        } catch (error) {
          console.error('Error fetching resume:', error);
          setLoadingError(error.message || 'Unable to load the resume. Please try again.');
          
          setSnackbar({
            open: true,
            message: error.message || 'Failed to load resume',
            severity: 'error'
          });
        } finally {
          setLoadingResume(false);
        }
      };
      
      fetchResumeData();
    }
  }, [resumeId, isEditingExisting]);

  // Template dialog handlers
  const handleOpenTemplateDialog = () => {
    setTemplateDialogOpen(true);
  };
  
  const handleCloseTemplateDialog = () => {
    setTemplateDialogOpen(false);
  };
  
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplateId(templateId);
  };
  
  const handleConfirmTemplateSelection = () => {
    setTemplateDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Template updated successfully',
      severity: 'success',
    });
  };

  // Add handlers for dummy data
  const handleLoadDummyData = () => {
    loadDummyData();
    setSnackbar({
      open: true,
      message: 'Sample data loaded successfully!',
      severity: 'success',
    });
  };

  const handleResetForm = () => {
    if (isEditingExisting) {
      // Show confirmation dialog
      setConfirmDialog({
        open: true,
        title: 'Reset Resume?',
        message: 'This will reset all changes you\'ve made to this resume. This cannot be undone.',
        onConfirm: () => {
          resetData();
          setSnackbar({
            open: true,
            message: 'Form has been reset',
            severity: 'info',
          });
          setConfirmDialog({ ...confirmDialog, open: false });
        }
      });
    } else {
      // No need for confirmation if not editing existing resume
      resetData();
      setSnackbar({
        open: true,
        message: 'Form has been reset',
        severity: 'info',
      });
    }
  };

  // Add dummy data buttons component
  const renderDummyDataButtons = () => (
    <Box sx={{ mb: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleResetForm}
        disabled={!isLoaded && !isEditingExisting}
      >
        Reset Form
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoadDummyData}
        disabled={isLoaded || isEditingExisting}
      >
        Load Sample Data
      </Button>
    </Box>
  );

  // Effects
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // Update user information if available
    if (currentUser) {
      setResumeData(prev => ({
        ...prev,
        header: {
          ...prev.header,
          name: currentUser.name || prev.header.name,
          email: currentUser.email || prev.header.email,
        },
      }));
    }
  }, [currentUser]);

  // Navigation Handlers
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handler for clicking on step labels
  const handleStepClick = (stepIndex) => {
    // Only allow step navigation if in edit mode
    if (isEditMode) {
      setActiveStep(stepIndex);
    }
  };

  // Toggle between edit mode and preview mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Confirmation dialog handlers
  const handleCloseConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  const handleConfirmAction = () => {
    if (confirmDialog.onConfirm) {
      confirmDialog.onConfirm();
    }
    handleCloseConfirmDialog();
  };

  // Form Validation
  const validateResumeData = () => {
    // Basic validation for required fields
    if (!resumeData.header.name || !resumeData.header.email || !resumeData.header.phone) {
      setSnackbar({
        open: true,
        message: 'Please fill in all personal information fields',
        severity: 'error',
      });
      setActiveStep(0); // Switch to personal info step
      return false;
    }
    
    if (!resumeData.education.degree || !resumeData.education.institution) {
      setSnackbar({
        open: true,
        message: 'Please fill in education information',
        severity: 'error',
      });
      setActiveStep(1); // Switch to education step
      return false;
    }
    
    if (resumeData.skills.length === 0 || !resumeData.skills[0]) {
      setSnackbar({
        open: true,
        message: 'Please add at least one skill',
        severity: 'error',
      });
      setActiveStep(2); // Switch to skills step
      return false;
    }
    
    if (resumeData.projects.length === 0 || !resumeData.projects[0].name) { 
      setSnackbar({
        open: true,
        message: 'Please add at least one project',
        severity: 'error',
      });
      setActiveStep(3); // Switch to projects step
      return false;
    }
    
    return true;
  };

  // Validate terms acceptance
  const validateTermsAcceptance = () => {
    if (!termsAccepted.updates || !termsAccepted.dataSharing) {
      setSnackbar({
        open: true,
        message: 'Please accept both terms and policies to continue',
        severity: 'error',
      });
      setActiveStep(5); // Switch to combined Custom Sections & Terms step
      return false;
    }
    return true;
  };

  // Function to map generated resume data back to form fields
  const mapGeneratedDataToFormFields = (generatedData) => {
    // Create a deep copy to avoid mutating the original data
    const formData = JSON.parse(JSON.stringify(resumeData));
    
    // Map header information
    if (generatedData.header) {
      formData.header = { ...generatedData.header };
    }
    
    // Map target role
    if (generatedData.target_role) {
      formData.target_role = generatedData.target_role;
    }
    
    // Map summary
    if (generatedData.summary) {
      formData.summary = generatedData.summary;
    }
    
    // Map education (handle both object and array formats)
    if (generatedData.education) {
      if (Array.isArray(generatedData.education) && generatedData.education.length > 0) {
        // If first education entry exists, map its values
        const edu = generatedData.education[0];
        formData.education = {
          degree: edu.degree || '',
          specialization: edu.specialization || '',
          institution: edu.institution || '',
          graduation_year: edu.graduationYear || edu.graduation_year || '',
          graduationYear: edu.graduationYear || edu.graduation_year || '',
        };
      } else if (typeof generatedData.education === 'object') {
        // Map education object directly
        formData.education = {
          degree: generatedData.education.degree || '',
          specialization: generatedData.education.specialization || '',
          institution: generatedData.education.institution || '',
          graduation_year: generatedData.education.graduationYear || generatedData.education.graduation_year || '',
          graduationYear: generatedData.education.graduationYear || generatedData.education.graduation_year || '',
        };
      }
    }
    
    // Map skills
    if (generatedData.skills && Array.isArray(generatedData.skills)) {
      formData.skills = [...generatedData.skills];
    }
    
    // Map certifications
    if (generatedData.certifications && Array.isArray(generatedData.certifications)) {
      formData.certifications = [...generatedData.certifications];
    }
    
    // Map projects field
    if (generatedData.projects && Array.isArray(generatedData.projects) && generatedData.projects.length > 0) {
      // Convert generated projects format to our projects format
      formData.projects = generatedData.projects.map(project => {
        // Extract key info and responsibilities
        let description = '';
        if (project.responsibilities && Array.isArray(project.responsibilities)) {
          description = project.responsibilities.join('\n');
        } else if (project.description) {
          description = project.description;
        }
        
        // Extract skills
        let skills = '';
        if (project.skills_used) {
          skills = project.skills_used;
        } else if (project.technologies) {
          skills = Array.isArray(project.technologies) 
            ? project.technologies.join(', ') 
            : project.technologies;
        }
        
        return {
          name: project.name || '',
          skills_used: skills,
          description: description,
          responsibilities: Array.isArray(project.responsibilities) ? [...project.responsibilities] : [],
          technologies: Array.isArray(project.technologies) ? [...project.technologies] : 
            (skills ? skills.split(',').map(s => s.trim()) : []),
          link: project.link || '',
        };
      });
    } else {
      // Initialize with empty array if no projects exist
      formData.projects = [];
    }
    
    // Map work experience
    if (generatedData.work_experience && Array.isArray(generatedData.work_experience) && generatedData.work_experience.length > 0) {
      formData.work_experience = generatedData.work_experience.map(exp => ({
        position: exp.position || '',
        company_name: exp.company_name || '',
        companyName: exp.companyName || exp.company_name || '',
        duration: exp.duration || '',
        description: exp.description || (exp.responsibilities ? exp.responsibilities.join('\n') : ''),
        responsibilities: exp.responsibilities || [],
      }));
    } else if (generatedData.workExperience && Array.isArray(generatedData.workExperience) && generatedData.workExperience.length > 0) {
      // Convert workExperience format to work_experience format
      formData.work_experience = generatedData.workExperience.map(exp => {
        // Compile responsibilities into description if needed
        let description = exp.description || '';
        if (!description && exp.responsibilities && Array.isArray(exp.responsibilities)) {
          description = exp.responsibilities.join('\n');
        }
        
        return {
          position: exp.position || '',
          company_name: exp.companyName || '',
          companyName: exp.companyName || '',
          duration: exp.duration || '',
          description: description,
          responsibilities: exp.responsibilities || [],
        };
      });
    }
    
    // Map custom sections
    if (generatedData.customSections) {
      formData.customSections = { ...generatedData.customSections };
    }
    
    return formData;
  };

  // API Handlers
  const handleGenerateResume = async () => {
    // Validate form data first
    if (!validateResumeData()) {
      return;
    }
    
    // Validate terms acceptance
    if (!validateTermsAcceptance()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare form data for API with proper field mapping
      const apiReadyData = prepareFormDataForApi(resumeData);
      
      // Call the generate resume API
      const response = await generateResume(apiReadyData);
      
      setSnackbar({
        open: true,
        message: 'Resume generated successfully!',
        severity: 'success',
      });
      
      // Transform the generated resume data to match frontend structure
      // Pass the ID from the API response to the adapter
      const adaptedResume = adaptGeneratedResume(response.resume, response.id);
      
      // Log the resume ID for debugging
      console.log("Resume generated with ID:", adaptedResume.id);
      
      // Store the adapted resume data
      setGeneratedResume(adaptedResume);
      
      // Also update the form data with generated content
      // This enables seamless editing by keeping form and preview in sync
      const updatedFormData = mapGeneratedDataToFormFields(adaptedResume);
      setResumeData(updatedFormData);
      
      // Switch to preview mode to show the generated resume
      setIsEditMode(false);
      
    } catch (error) {
      console.error('Error generating resume:', error);
      setSnackbar({
        open: true,
        message: error.message || 'An error occurred generating your resume. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle updating the resume after editing
  const handleUpdateResume = async () => {
    // Validate form data first
    if (!validateResumeData()) {
      return;
    }

    // Get resumeId from either URL params or generated resume
    const idToUpdate = resumeId || generatedResume?.id;
    
    // Log available data for debugging
    console.log("URL resumeId:", resumeId);
    console.log("Generated resume ID:", generatedResume?.id);
    console.log("ID to update:", idToUpdate);

    // Ensure we have a resumeId when updating
    if (!idToUpdate) {
      setSnackbar({
        open: true,
        message: 'Cannot update: No resume ID found.',
        severity: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare form data for API with proper field mapping
      const apiReadyData = prepareFormDataForApi(resumeData);
      
      // Call the update API with the correct ID
      const response = await updateResume(idToUpdate, apiReadyData);

      // Handle successful update
      setSnackbar({
        open: true,
        message: 'Resume updated successfully!',
        severity: 'success',
      });

      // Update generated resume state but NOT the form data
      if (response.resume) {
        const adaptedResume = adaptGeneratedResume(response.resume, idToUpdate);
        setGeneratedResume(adaptedResume);
      }

      // Switch to preview mode
      setIsEditMode(false);

    } catch (error) {
      console.error('Error updating resume:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to update resume. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle downloading the resume as PDF
  const handleDownloadResume = async () => {
  try {
    setDownloadingPdf(true);
    
    const dataToUse = generatedResume || resumeData;
    const userName = dataToUse?.header?.name || 'resume';
    const fileName = userName.toLowerCase().replace(/\s+/g, '_');
    
    // Pass selected template ID to PDF generator
    await generateResumePDF(dataToUse, selectedTemplateId, fileName);
    
    setSnackbar({
      open: true,
      message: 'Resume downloaded successfully',
      severity: 'success',
    });
  } catch (error) {
    console.error('Error downloading resume:', error);
    setSnackbar({
      open: true,
      message: 'Failed to download resume. Please try again.',
      severity: 'error',
    });
  } finally {
    setDownloadingPdf(false);
  }
};

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Check if both terms are accepted
  const areTermsAccepted = termsAccepted.updates && termsAccepted.dataSharing;
  
  // Determine if the resume has been generated at least once
  const hasGeneratedResume = generatedResume !== null;

  // Render current step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoSection 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
          />
        );
      case 1:
        return (
          <EducationSection 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
          />
        );
      case 2:
        return (
          <SkillsSection 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
          />
        );
      case 3:
        return (
          <ProjectsSection 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
          />
        );
      case 4:
        return (
          <ExperienceSection 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
          />
        );
      case 5:
        return (
          <CustomSectionsAndTerms 
            resumeData={resumeData} 
            setResumeData={setResumeData}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  // If the resume is still loading, show a loading indicator
  if (loadingResume) {
    return (
      <Container className={classes.root} maxWidth="xl">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" style={{ marginTop: '2rem' }}>
            Loading resume...
          </Typography>
        </Box>
      </Container>
    );
  }

  // If there was an error loading the resume, show an error message
  if (loadingError) {
    return (
      <Container className={classes.root} maxWidth="xl">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
          <Alert severity="error" style={{ marginBottom: '1rem' }}>
            {loadingError}
          </Alert>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/resume-builder')}
          >
            Return to Resume Builder
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container className={classes.root} maxWidth="xl">
      {/* Display page title based on whether we're editing or creating */}
      <Typography variant="h4" className={classes.pageTitle}>
        {isEditingExisting ? 'Edit Resume' : 'Build Your Resume'}
        {isEditingExisting && (
          <span className={`${classes.statusChip} ${classes.successStatusChip}`}>
            Editing
          </span>
        )}
      </Typography>
      
      {/* Display resume ID if editing */}
      {isEditingExisting && (
        <Typography className={classes.resumeIdText}>
          Resume ID: {resumeId}
        </Typography>
      )}
      
      {/* Template button in preview section */}
      <Box className={classes.templateButtonContainer}>
        <TemplateButton onClick={handleOpenTemplateDialog} />
      </Box>
      
      {/* Add dummy data buttons in edit mode (only when creating new) */}
      {isEditMode && !isEditingExisting && renderDummyDataButtons()}
      
      {/* Toggle buttons for edit/preview mode (only show if resume has been generated) */}
      {(hasGeneratedResume || isEditingExisting) && (
        <Box className={classes.viewModeToggle}>
          <Button
            variant="contained"
            className={`${classes.editModeButton} ${isEditMode ? classes.activeModeButton : ''}`}
            onClick={() => setIsEditMode(true)}
            disabled={isEditMode}
          >
            Edit Mode
          </Button>
          <Button
            variant="contained"
            className={`${classes.previewModeButton} ${!isEditMode ? classes.activeModeButton : ''}`}
            onClick={() => setIsEditMode(false)}
            disabled={!isEditMode}
          >
            Preview Mode
          </Button>
        </Box>
      )}

      {/* Action buttons */}
      <Box className={classes.actionButtons}>
        {/* Download PDF button - always visible when a resume exists */}
        {(hasGeneratedResume || isEditingExisting) && (
          <Button
            variant="contained"
            className={classes.downloadButton}
            onClick={handleDownloadResume}
            disabled={downloadingPdf}
          >
            {downloadingPdf ? (
              <>
                Generating PDF
                <CircularProgress size={20} className={classes.loader} />
              </>
            ) : (
              'Download PDF'
            )}
          </Button>
        )}
        
        {/* Update button - only show in edit mode for existing resumes */}
        {isEditMode && (isEditingExisting || hasGeneratedResume) && (
          <Button
            variant="contained"
            className={classes.saveButton}
            onClick={handleUpdateResume}
            disabled={loading || !areTermsAccepted}
          >
            {isEditingExisting ? 'Save Changes' : 'Update Resume'}
            {loading && <CircularProgress size={20} className={classes.loader} />}
          </Button>
        )}
        
        {/* Generate button - only show in edit mode for new resumes */}
        {isEditMode && !isEditingExisting && !hasGeneratedResume && (
          <Button
            variant="contained"
            className={classes.saveButton}
            onClick={handleGenerateResume}
            disabled={loading || !areTermsAccepted}
          >
            Generate Resume
            {loading && <CircularProgress size={20} className={classes.loader} />}
          </Button>
        )}
      </Box>

      {/* Main content area */}
      <Box className={classes.mainContainer}>
        {/* Form Column - Show in edit mode */}
        {isEditMode && (
          <Box className={`${classes.columnBox} ${classes.formColumn}`}>
            <Typography variant="h5" className={classes.sectionTitle}>
              {isEditingExisting ? 'Edit Your Resume' : hasGeneratedResume ? 'Edit Your Resume' : 'Build Your Resume'}
            </Typography>
            
            {/* Stepper Navigation with clickable labels */}
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel 
                    className={classes.stepLabel} 
                    onClick={() => handleStepClick(index)}
                    StepIconProps={{
                      style: { cursor: 'pointer' }
                    }}
                  >
                    <span style={{ cursor: 'pointer' }}>{label}</span>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Current Step Content */}
            <Paper className={classes.paper} elevation={0}>
              {getStepContent(activeStep)}
              
              {/* Navigation Buttons */}
              <Box className={classes.navigationButtons}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  className={classes.buttonBack}
                >
                  Back
                </Button>
                
                {isEditingExisting ? (
                  // If editing existing resume, show "Next" or "Save Changes" button
                  <Button
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handleUpdateResume : handleNext}
                    className={`${classes.buttonNext} ${(activeStep === steps.length - 1 && !areTermsAccepted) ? classes.disabledButton : ''}`}
                    disabled={(activeStep === steps.length - 1 && !areTermsAccepted)}
                  >
                    {activeStep === steps.length - 1 ? 'Save Changes' : 'Next'}
                    {loading && activeStep === steps.length - 1 && <CircularProgress size={20} className={classes.loader} />}
                  </Button>
                ) : hasGeneratedResume ? (
                  // If resume has been generated, show "Next" or "Update" button
                  <Button
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handleUpdateResume : handleNext}
                    className={`${classes.buttonNext} ${(activeStep === steps.length - 1 && !areTermsAccepted) ? classes.disabledButton : ''}`}
                    disabled={(activeStep === steps.length - 1 && !areTermsAccepted)}
                  >
                    {activeStep === steps.length - 1 ? 'Update Resume' : 'Next'}
                    {loading && activeStep === steps.length - 1 && <CircularProgress size={20} className={classes.loader} />}
                  </Button>
                ) : (
                  // If creating new resume, show "Next" or "Generate" button
                  <Button
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handleGenerateResume : handleNext}
                    className={`${classes.buttonNext} ${(activeStep === steps.length - 1 && !areTermsAccepted) ? classes.disabledButton : ''}`}
                    disabled={(activeStep === steps.length - 1 && !areTermsAccepted)}
                  >
                    {activeStep === steps.length - 1 ? 'Generate Resume' : 'Next'}
                    {loading && activeStep === steps.length - 1 && <CircularProgress size={20} className={classes.loader} />}
                  </Button>
                )}
              </Box>
            </Paper>
          </Box>
        )}

        {/* Preview Column - Adjust width based on edit/preview mode */}
        <Box 
          className={`${isEditMode ? classes.columnBox : ''} ${classes.previewColumn}`} 
          sx={{ width: isEditMode ? '50%' : '100%' }}
        >
          <Typography variant="h5" className={classes.sectionTitle}>
            {hasGeneratedResume || isEditingExisting ? 'Resume Preview' : 'Live Preview'}
          </Typography>
          
          <ResumePreview 
            userData={resumeData}
            generatedData={generatedResume}
            templateId={selectedTemplateId}
          />
        </Box>
      </Box>

      {/* Template Selection Dialog */}
      <Dialog 
        open={templateDialogOpen}
        onClose={handleCloseTemplateDialog}
        fullWidth
        maxWidth="lg"
        className={classes.templateDialog}
      >
        <DialogContent>
          <TemplateSelector 
            selectedTemplateId={selectedTemplateId}
            onTemplateSelect={handleTemplateSelect}
          />
          
          <Box className={classes.templateActionButtons}>
            <Button 
              onClick={handleCloseTemplateDialog}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmTemplateSelection}
              variant="contained"
              color="primary"
            >
              Apply Template
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmDialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResumeBuilder;