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
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateResume, getResumeById, updateResume } from '../utils/api';
import { adaptGeneratedResume } from '../utils/resumeAdapter';
import { generateResumePDF } from '../utils/pdfUtils';
import { dummyResumes } from '../data/dummyResumeData';

// Section Components
import PersonalInfoSection from '../components/resumeBuilderComponents/PersonalInfoSection';
import EducationSection from '../components/resumeBuilderComponents/EducationSection';
import SkillsSection from '../components/resumeBuilderComponents/SkillsSection';
import ProjectsSection from '../components/resumeBuilderComponents/ProjectsSection';
import ExperienceSection from '../components/resumeBuilderComponents/ExperienceSection';
import CustomSectionsAndTerms from '../components/resumeBuilderComponents/CustomSectionsAndTerms';
import ResumePreview from '../components/previewComponents/ResumePreview';
import TemplateSelector from '../components/previewComponents/TemplateSelector';
import templatesData from '../data/templatesData';
import Navbar from '../common/Navbar';

import { useStyles } from './resumebuilder.Styles';

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

  // Handler to open template dialog (to be passed to Navbar)
  const handleOpenTemplateDialog = () => {
    setTemplateDialogOpen(true);
  };

  // Template dialog handlers
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
    
    // Pass the correct data and template ID
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

  // Handler for loading dummy data
  const handleLoadDummyData = () => {
    const dummyData = dummyResumes[0];
    setResumeData(dummyData);
    setSnackbar({
      open: true,
      message: 'Demo data loaded successfully!',
      severity: 'success',
    });
  };

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
      {/* Navbar with template button handler */}
      <Navbar 
        currentPage="resume-builder" 
        onTemplateClick={handleOpenTemplateDialog} 
        onLoadDummyData={handleLoadDummyData}
      />
      
      {/* Display resume ID if editing */}
      {isEditingExisting && (
        <Typography className={classes.resumeIdText}>
          Resume ID: {resumeId}
        </Typography>
      )}
      
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