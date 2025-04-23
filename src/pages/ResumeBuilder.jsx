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
  Menu,
  MenuItem
} from '@mui/material';
import Alert from '@mui/material/Alert';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateResume } from '../utils/api';
import { adaptGeneratedResume } from '../utils/resumeAdapter';
import { generateATSOptimizedPDF } from '../utils/pdfUtils';
import { generateVisualResumePDF } from '../utils/enhancedPdfUtils';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Section Components
import PersonalInfoSection from '../components/resumeBuilder/PersonalInfoSection';
import EducationSection from '../components/resumeBuilder/EducationSection';
import SkillsSection from '../components/resumeBuilder/SkillsSection';
import ProjectsSection from '../components/resumeBuilder/ProjectsSection';
import ExperienceSection from '../components/resumeBuilder/ExperienceSection';
import CustomSectionsForm from '../components/resumeBuilder/CustomSectionsForm';
import ResumePreview from '../components/resumeBuilder/ResumePreview';

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
  },
  stepLabel: {
    cursor: 'pointer',
  },
  downloadButton: {
    backgroundColor: '#38a169',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1rem',
    borderRadius: '8px',
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
  dropdownIcon: {
    marginLeft: '0.25rem',
  }
}));

// Step labels for the stepper
const steps = [
  'Personal Info',
  'Education',
  'Skills',
  'Projects',
  'Experience',
  'Custom Sections'
];

const ResumeBuilder = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // State Declarations
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  // State for dropdown menu
  const [downloadMenuAnchor, setDownloadMenuAnchor] = useState(null);
  const isDownloadMenuOpen = Boolean(downloadMenuAnchor);
  
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

  // Dropdown menu handlers
  const handleOpenDownloadMenu = (event) => {
    setDownloadMenuAnchor(event.currentTarget);
  };

  const handleCloseDownloadMenu = () => {
    setDownloadMenuAnchor(null);
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

  // Handle download of the generated resume with visual fidelity
  const handleDownloadVisualResume = () => {
    try {
      // Format filename with user's name if available
      const userName = generatedResume?.header?.name || 'resume';
      const fileName = userName.toLowerCase().replace(/\s+/g, '_');
      
      // Use our enhanced PDF generation utility that preserves visual appearance
      generateVisualResumePDF(fileName);
      
      setSnackbar({
        open: true,
        message: 'Visual resume downloaded successfully with all formatting preserved',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error downloading visual resume:', error);
      setSnackbar({
        open: true,
        message: 'Failed to download resume. Please try again.',
        severity: 'error',
      });
    }
    
    handleCloseDownloadMenu();
  };

  // Handle download of ATS-optimized resume (text-based)
  const handleDownloadATSResume = () => {
    try {
      // Format filename with user's name if available
      const userName = generatedResume?.header?.name || 'resume';
      const fileName = `${userName.toLowerCase().replace(/\s+/g, '_')}_ats`;
      
      // Use our PDF generation utility for ATS optimization
      generateATSOptimizedPDF(generatedResume, fileName);
      
      setSnackbar({
        open: true,
        message: 'ATS-optimized resume downloaded successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error downloading ATS resume:', error);
      setSnackbar({
        open: true,
        message: 'Failed to download ATS resume. Please try again.',
        severity: 'error',
      });
    }
    
    handleCloseDownloadMenu();
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
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container className={classes.root} maxWidth="xl">
      <Box className={classes.mainContainer}>
        {/* Form Column - Hide or show based on whether resume has been generated */}
        {!generatedResume && (
          <Box className={`${classes.columnBox} ${classes.formColumn}`}>
            <Typography variant="h5" className={classes.sectionTitle}>
              Build Your Resume
              <Button
                variant="contained"
                className={classes.saveButton}
                onClick={handleGenerateResume}
                disabled={loading}
              >
                Generate Resume
                {loading && (
                  <span className={classes.loader}>
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <style>{`.spinner{transform-origin:center;animation:spinner_animation .75s infinite linear}@keyframes spinner_animation{100%{transform:rotate(360deg)}}`}</style>
                      <circle className="spinner" cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" />
                    </svg>
                  </span>
                )}
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
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleGenerateResume : handleNext}
                  className={classes.buttonNext}
                >
                  {activeStep === steps.length - 1 ? 'Generate Resume' : 'Next'}
                </Button>
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
                {/* Download button with dropdown menu */}
                <Button
                  variant="contained"
                  className={classes.downloadButton}
                  onClick={handleOpenDownloadMenu}
                  startIcon={<DownloadIcon />}
                  endIcon={<ArrowDropDownIcon className={classes.dropdownIcon} />}
                >
                  Download PDF
                </Button>
                
                {/* Dropdown menu for different PDF export options */}
                <Menu
                  anchorEl={downloadMenuAnchor}
                  open={isDownloadMenuOpen}
                  onClose={handleCloseDownloadMenu}
                >
                  <MenuItem onClick={handleDownloadVisualResume}>
                    Download Visual PDF (Preserve Exact Appearance)
                  </MenuItem>
                  <MenuItem onClick={handleDownloadATSResume}>
                    Download ATS-Optimized PDF (Text-Based)
                  </MenuItem>
                </Menu>
                
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
          />
        </Box>
      </Box>

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
  );
};

export default ResumeBuilder;