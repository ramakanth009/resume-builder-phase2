import React, { useState, useEffect, useRef } from 'react';
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
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateResume } from '../utils/api';
import { adaptGeneratedResume } from '../utils/resumeAdapter';
import { generateResumePDF } from '../utils/pdfUtils';

// Section Components
import PersonalInfoSection from '../components/resumeBuilder/PersonalInfoSection';
import EducationSection from '../components/resumeBuilder/EducationSection';
import SkillsSection from '../components/resumeBuilder/SkillsSection';
import ProjectsSection from '../components/resumeBuilder/ProjectsSection';
import ExperienceSection from '../components/resumeBuilder/ExperienceSection';
import CustomSectionsForm from '../components/resumeBuilder/CustomSectionsForm';
import TermsAndPolicies from '../components/resumeBuilder/TermsAndPolicies';
import ResumePreview from '../components/resumeBuilder/ResumePreview';
import TemplateSelector from '../components/resumeBuilder/TemplateSelector';
import Navbar from '../components/Navbar';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    minHeight: '100vh',
    padding: '2rem 0',
    backgroundColor: '#f9f9f9',
    marginTop: '64px', // Add top margin to account for fixed navbar
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
  disabledButton: {
    backgroundColor: '#cbd5e0',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    cursor: 'not-allowed',
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
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    color: '#2d3748',
  },
  dialogContent: {
    padding: '1rem',
  },
  warningText: {
    color: '#e53e3e',
    fontSize: '0.8rem',
    marginTop: '0.5rem',
  },
}));

// Step labels for the stepper
const steps = [
  'Personal Info',
  'Education',
  'Skills',
  'Projects',
  'Experience',
  'Custom Sections',
  'Terms & Policies'
];

const ResumeBuilder = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // State Declarations
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState({
    updates: false,
    dataSharing: false
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  // Initialize resumeData with user information if available
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
    },
    skills: [''],
    Academic_projects: [{
      name: '',
      skills_used: '',
      description: '',
    }],
    certifications: [''],
    work_experience: [{
      position: '',
      company_name: '',
      duration: '',
      description: '',
    }],
    target_role: '',
    customSections: {}
  });

  // Reference for scrolling to terms warning
  const termsWarningRef = useRef(null);

  // Check if terms are accepted
  const areTermsAccepted = termsAccepted.updates && termsAccepted.dataSharing;

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
    // Only allow step navigation if resume hasn't been generated yet
    if (!generatedResume) {
      setActiveStep(stepIndex);
    }
  };

  // Template dialog handlers
  const handleOpenTemplateDialog = () => {
    setTemplateDialogOpen(true);
  };

  const handleCloseTemplateDialog = () => {
    setTemplateDialogOpen(false);
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
    
    if (resumeData.Academic_projects.length === 0 || !resumeData.Academic_projects[0].name) {
      setSnackbar({
        open: true,
        message: 'Please add at least one project',
        severity: 'error',
      });
      setActiveStep(3); // Switch to projects step
      return false;
    }
    
    // Check if the terms are accepted
    if (!areTermsAccepted) {
      setSnackbar({
        open: true,
        message: 'Please accept the terms and policies to generate your resume',
        severity: 'error',
      });
      setActiveStep(6); // Switch to terms step
      
      // Scroll to the terms warning if it exists
      if (termsWarningRef.current) {
        termsWarningRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      
      return false;
    }
    
    return true;
  };

  // API Handlers
  const handleGenerateResume = async () => {
    // Validate form data first
    if (!validateResumeData()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await generateResume(resumeData);
      
      setSnackbar({
        open: true,
        message: 'Resume generated successfully!',
        severity: 'success',
      });
      
      // Transform the generated resume data to match frontend structure
      const adaptedResume = adaptGeneratedResume(response.resume);
      
      // Store the adapted resume data and replace the preview
      setGeneratedResume(adaptedResume);
      
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

  // Handle resetting the form to edit again
  const handleEditResume = () => {
    setGeneratedResume(null);
  };

  // Handle downloading the resume as PDF
  const handleDownloadResume = async () => {
    try {
      setDownloadingPdf(true);
      
      const userName = generatedResume?.header?.name || 'resume';
      const fileName = userName.toLowerCase().replace(/\s+/g, '_');
      
      // Use the new react-pdf based PDF generator
      await generateResumePDF(generatedResume, fileName);
      
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
};

export default ResumeBuilder;
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
          <CustomSectionsForm 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
          />
        );
      case 6:
        return (
          <TermsAndPolicies 
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      {/* Fixed Navbar with Template Button */}
      <Navbar 
        currentPage="resume-builder" 
        onTemplateClick={handleOpenTemplateDialog}
      />
      
      <Container className={classes.root} maxWidth="xl">
        <Box className={classes.mainContainer}>
          {/* Form Column - Hide or show based on whether resume has been generated */}
          {!generatedResume && (
            <Box className={`${classes.columnBox} ${classes.formColumn}`}>
              <Typography variant="h5" className={classes.sectionTitle}>
                Build Your Resume
                <Button
                  variant="contained"
                  className={areTermsAccepted ? classes.saveButton : classes.disabledButton}
                  onClick={handleGenerateResume}
                  disabled={loading || !areTermsAccepted}
                >
                  Generate Resume
                  {loading && <CircularProgress size={20} className={classes.loader} />}
                </Button>
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
                
                {/* Terms warning message if trying to generate without accepting terms */}
                {activeStep === 6 && !areTermsAccepted && (
                  <Box ref={termsWarningRef}>
                    <Typography className={classes.warningText}>
                      Both checkboxes must be selected to generate your resume.
                    </Typography>
                  </Box>
                )}
                
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
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleGenerateResume}
                      className={areTermsAccepted ? classes.buttonNext : classes.disabledButton}
                      disabled={!areTermsAccepted || loading}
                    >
                      {loading ? (
                        <>
                          Generating...
                          <CircularProgress size={20} className={classes.loader} />
                        </>
                      ) : (
                        'Generate Resume'
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      className={classes.buttonNext}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Paper>
            </Box>
          )}

          {/* Preview Column - Adjust width to full when resume is generated */}
          <Box 
            className={`${generatedResume ? '' : classes.columnBox} ${classes.previewColumn}`} 
            sx={{ width: generatedResume ? '100%' : '50%' }}
          >
            <Box className={classes.sectionTitle}>
              <Typography variant="h5">
                {generatedResume ? 'Generated Resume' : 'Resume Preview'}
              </Typography>
              
              {/* Show action buttons when resume is generated */}
              {generatedResume && (
                <Box>
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
                  <Button
                    variant="contained"
                    className={classes.editButton}
                    onClick={handleEditResume}
                  >
                    Edit Resume
                  </Button>
                </Box>
              )}
            </Box>
            
            <ResumePreview 
              userData={resumeData}
              generatedData={generatedResume}
              template={selectedTemplate}
            />
          </Box>
        </Box>

        {/* Template Selection Dialog */}
        <Dialog 
          open={templateDialogOpen} 
          onClose={handleCloseTemplateDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle className={classes.dialogTitle}>
            Choose Resume Template
            <IconButton 
              className={classes.closeButton} 
              onClick={handleCloseTemplateDialog}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={(template) => {
                setSelectedTemplate(template);
                handleCloseTemplateDialog();
              }}
            />
          </DialogContent>
        </Dialog>

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
      </Container>
    </>
  );