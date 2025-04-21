import React, { useState, useEffect } from 'react';
import { Container, Box, Paper, Typography, Button, Stepper, Step, StepLabel, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateResume } from '../utils/api';

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
  const [isEditing, setIsEditing] = useState(true); // Start in editing mode
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

  // Generic Handlers
  const handleInputChange = (section, field, value) => {
    if (field.includes('.')) {
      const [mainField, subField] = field.split('.');
      setResumeData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [mainField]: {
            ...prev[section][mainField],
            [subField]: value
          }
        }
      }));
    } else {
      setResumeData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
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
      
      // Store the generated resume data
      setGeneratedResume(response.resume);
      setIsEditing(false); // Switch to view mode after generation
      
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

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Toggle between editing and viewing mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
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
        {/* Form Column */}
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
          
          {/* Stepper Navigation */}
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
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

        {/* Preview Column */}
        <Box className={`${classes.columnBox} ${classes.previewColumn}`}>
          <Box className={classes.sectionTitle} style={{ justifyContent: 'space-between' }}>
            <Typography variant="h5">
              Resume Preview
            </Typography>
            {!isEditing && (
              <Button 
                variant="outlined" 
                onClick={toggleEditMode}
                style={{ textTransform: 'none' }}
              >
                I want to edit
              </Button>
            )}
          </Box>
          
          <ResumePreview 
            userData={resumeData}
            generatedData={generatedResume}
            isEditing={isEditing}
            onEdit={(field, value) => {
              // Allow editing the generated resume directly
              if (generatedResume && !isEditing) {
                const updatedData = { ...generatedResume };
                // Handle nested fields
                if (field.includes('.')) {
                  const [section, subfield] = field.split('.');
                  updatedData[section] = {
                    ...updatedData[section],
                    [subfield]: value
                  };
                } else {
                  updatedData[field] = value;
                }
                setGeneratedResume(updatedData);
              }
            }}
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