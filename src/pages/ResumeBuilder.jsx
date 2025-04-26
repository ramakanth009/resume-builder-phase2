// import React, { useState, useEffect } from 'react';
// import { 
//   Container, 
//   Box, 
//   Paper, 
//   Typography, 
//   Button, 
//   Stepper, 
//   Step, 
//   StepLabel, 
//   Snackbar,
//   CircularProgress
// } from '@mui/material';
// import Alert from '@mui/material/Alert';
// import makeStylesWithTheme from '../styles/makeStylesAdapter';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { generateResume } from '../utils/api';
// import { adaptGeneratedResume } from '../utils/resumeAdapter';
// import { generateResumePDF } from '../utils/pdfUtils';

// // Section Components
// import PersonalInfoSection from '../components/resumeBuilder/PersonalInfoSection';
// import EducationSection from '../components/resumeBuilder/EducationSection';
// import SkillsSection from '../components/resumeBuilder/SkillsSection';
// import ProjectsSection from '../components/resumeBuilder/ProjectsSection';
// import ExperienceSection from '../components/resumeBuilder/ExperienceSection';
// import CustomSectionsForm from '../components/resumeBuilder/CustomSectionsForm';
// import ResumePreview from '../components/resumeBuilder/ResumePreview';
// import TermsAndPolicies from '../components/resumeBuilder/TermsAndPolicies';

// const useStyles = makeStylesWithTheme((theme) => ({
//   root: {
//     minHeight: '100vh',
//     padding: '2rem 0',
//     backgroundColor: '#f9f9f9',
//   },
//   container: {
//     height: '100%',
//   },
//   formColumn: {
//     padding: '1rem',
//     height: '100%',
//     overflowY: 'auto',
//     borderRight: {
//       xs: 'none',
//       md: '1px solid #e2e8f0'
//     },
//   },
//   previewColumn: {
//     padding: '1rem',
//     height: '100%',
//     overflowY: 'auto',
//     backgroundColor: '#ffffff',
//   },
//   paper: {
//     padding: '1.5rem',
//     marginBottom: '1.5rem',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
//   },
//   sectionTitle: {
//     fontWeight: 600,
//     marginBottom: '1rem',
//     color: '#2d3748',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   saveButton: {
//     backgroundColor: '#3182ce',
//     color: 'white',
//     textTransform: 'none',
//     fontWeight: 600,
//     padding: '0.5rem 1.5rem',
//     borderRadius: '8px',
//     '&:hover': {
//       backgroundColor: '#2b6cb0',
//     },
//   },
//   navigationButtons: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginTop: '2rem',
//   },
//   buttonNext: {
//     backgroundColor: '#3182ce',
//     color: 'white',
//     textTransform: 'none',
//     fontWeight: 600,
//     padding: '0.5rem 1.5rem',
//     borderRadius: '8px',
//     '&:hover': {
//       backgroundColor: '#2b6cb0',
//     },
//   },
//   buttonBack: {
//     color: '#718096',
//     borderColor: '#e2e8f0',
//     textTransform: 'none',
//     fontWeight: 600,
//     padding: '0.5rem 1.5rem',
//     borderRadius: '8px',
//     '&:hover': {
//       backgroundColor: '#f7fafc',
//     },
//   },
//   stepper: {
//     marginBottom: '2rem',
//     padding: '1rem',
//     backgroundColor: 'transparent',
//   },
//   mainContainer: {
//     display: 'flex',
//     flexDirection: {
//       xs: 'column',
//       md: 'row'
//     },
//   },
//   columnBox: {
//     flex: 1,
//     width: {
//       xs: '100%',
//       md: '50%'
//     },
//   },
//   loader: {
//     marginLeft: '0.5rem',
//     color: 'white',
//   },
//   stepLabel: {
//     cursor: 'pointer',
//   },
//   downloadButton: {
//     backgroundColor: '#38a169',
//     color: 'white',
//     textTransform: 'none',
//     fontWeight: 600,
//     padding: '0.5rem 1.5rem',
//     borderRadius: '8px',
//     marginLeft: '1rem',
//     '&:hover': {
//       backgroundColor: '#2f855a',
//     },
//   },
//   editButton: {
//     backgroundColor: '#805ad5',
//     color: 'white',
//     textTransform: 'none',
//     fontWeight: 600,
//     padding: '0.5rem 1.5rem',
//     borderRadius: '8px',
//     marginLeft: '1rem',
//     '&:hover': {
//       backgroundColor: '#6b46c1',
//     },
//   },
//   disabledButton: {
//     backgroundColor: '#a0aec0 !important',
//     color: 'white !important',
//   }
// }));

// // Step labels for the stepper
// const steps = [
//   'Personal Info',
//   'Education',
//   'Skills',
//   'Projects',
//   'Experience',
//   'Custom Sections',
//   'Terms & Policies'
// ];

// const ResumeBuilder = () => {
//   const classes = useStyles();
//   const navigate = useNavigate();
//   const { currentUser } = useAuth();
  
//   // State Declarations
//   const [activeStep, setActiveStep] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [downloadingPdf, setDownloadingPdf] = useState(false);
//   const [generatedResume, setGeneratedResume] = useState(null);
//   const [termsAccepted, setTermsAccepted] = useState({
//     updates: false,
//     dataSharing: false
//   });
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });
  
//   // Initialize resumeData with user information if available
//   const [resumeData, setResumeData] = useState({
//     header: {
//       name: currentUser?.name || '',
//       email: currentUser?.email || '',
//       phone: '',
//       github: '',
//       linkedin: '',
//       portfolio: '',
//     },
//     summary: '',
//     education: {
//       degree: '',
//       specialization: '',
//       institution: '',
//       graduation_year: '',
//     },
//     skills: [''],
//     Academic_projects: [{
//       name: '',
//       skills_used: '',
//       description: '',
//     }],
//     certifications: [''],
//     work_experience: [{
//       position: '',
//       company_name: '',
//       duration: '',
//       description: '',
//     }],
//     target_role: '',
//     customSections: {}
//   });

//   // Effects
//   useEffect(() => {
//     // Redirect to login if not authenticated
//     if (!currentUser) {
//       navigate('/login');
//     }
//   }, [currentUser, navigate]);

//   useEffect(() => {
//     // Update user information if available
//     if (currentUser) {
//       setResumeData(prev => ({
//         ...prev,
//         header: {
//           ...prev.header,
//           name: currentUser.name || prev.header.name,
//           email: currentUser.email || prev.header.email,
//         },
//       }));
//     }
//   }, [currentUser]);

//   // Navigation Handlers
//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   // Handler for clicking on step labels
//   const handleStepClick = (stepIndex) => {
//     // Only allow step navigation if resume hasn't been generated yet
//     if (!generatedResume) {
//       setActiveStep(stepIndex);
//     }
//   };

//   // Form Validation
//   const validateResumeData = () => {
//     // Basic validation for required fields
//     if (!resumeData.header.name || !resumeData.header.email || !resumeData.header.phone) {
//       setSnackbar({
//         open: true,
//         message: 'Please fill in all personal information fields',
//         severity: 'error',
//       });
//       setActiveStep(0); // Switch to personal info step
//       return false;
//     }
    
//     if (!resumeData.education.degree || !resumeData.education.institution) {
//       setSnackbar({
//         open: true,
//         message: 'Please fill in education information',
//         severity: 'error',
//       });
//       setActiveStep(1); // Switch to education step
//       return false;
//     }
    
//     if (resumeData.skills.length === 0 || !resumeData.skills[0]) {
//       setSnackbar({
//         open: true,
//         message: 'Please add at least one skill',
//         severity: 'error',
//       });
//       setActiveStep(2); // Switch to skills step
//       return false;
//     }
    
//     if (resumeData.Academic_projects.length === 0 || !resumeData.Academic_projects[0].name) {
//       setSnackbar({
//         open: true,
//         message: 'Please add at least one project',
//         severity: 'error',
//       });
//       setActiveStep(3); // Switch to projects step
//       return false;
//     }
    
//     return true;
//   };

//   // Validate terms acceptance
//   const validateTermsAcceptance = () => {
//     if (!termsAccepted.updates || !termsAccepted.dataSharing) {
//       setSnackbar({
//         open: true,
//         message: 'Please accept both terms and policies to continue',
//         severity: 'error',
//       });
//       setActiveStep(6); // Switch to terms step
//       return false;
//     }
//     return true;
//   };

//   // API Handlers
//   const handleGenerateResume = async () => {
//     // Validate form data first
//     if (!validateResumeData()) {
//       return;
//     }
    
//     // Validate terms acceptance
//     if (!validateTermsAcceptance()) {
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const response = await generateResume(resumeData);
      
//       setSnackbar({
//         open: true,
//         message: 'Resume generated successfully!',
//         severity: 'success',
//       });
      
//       // Transform the generated resume data to match frontend structure
//       const adaptedResume = adaptGeneratedResume(response.resume);
      
//       // Store the adapted resume data and replace the preview
//       setGeneratedResume(adaptedResume);
      
//     } catch (error) {
//       console.error('Error generating resume:', error);
//       setSnackbar({
//         open: true,
//         message: error.message || 'An error occurred generating your resume. Please try again.',
//         severity: 'error',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle resetting the form to edit again
//   const handleEditResume = () => {
//     setGeneratedResume(null);
//   };

//   // Handle downloading the resume as PDF
//   const handleDownloadResume = async () => {
//     try {
//       setDownloadingPdf(true);
      
//       const userName = generatedResume?.header?.name || 'resume';
//       const fileName = userName.toLowerCase().replace(/\s+/g, '_');
      
//       // Use the new react-pdf based PDF generator
//       await generateResumePDF(generatedResume, fileName);
      
//       setSnackbar({
//         open: true,
//         message: 'Resume downloaded successfully',
//         severity: 'success',
//       });
//     } catch (error) {
//       console.error('Error downloading resume:', error);
//       setSnackbar({
//         open: true,
//         message: 'Failed to download resume. Please try again.',
//         severity: 'error',
//       });
//     } finally {
//       setDownloadingPdf(false);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({
//       ...snackbar,
//       open: false,
//     });
//   };

//   // Check if both terms are accepted
//   const areTermsAccepted = termsAccepted.updates && termsAccepted.dataSharing;

//   // Render current step content
//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <PersonalInfoSection 
//             resumeData={resumeData} 
//             setResumeData={setResumeData} 
//           />
//         );
//       case 1:
//         return (
//           <EducationSection 
//             resumeData={resumeData} 
//             setResumeData={setResumeData} 
//           />
//         );
//       case 2:
//         return (
//           <SkillsSection 
//             resumeData={resumeData} 
//             setResumeData={setResumeData} 
//           />
//         );
//       case 3:
//         return (
//           <ProjectsSection 
//             resumeData={resumeData} 
//             setResumeData={setResumeData} 
//           />
//         );
//       case 4:
//         return (
//           <ExperienceSection 
//             resumeData={resumeData} 
//             setResumeData={setResumeData} 
//           />
//         );
//       case 5:
//         return (
//           <CustomSectionsForm 
//             resumeData={resumeData} 
//             setResumeData={setResumeData} 
//           />
//         );
//       case 6:
//         return (
//           <TermsAndPolicies 
//             termsAccepted={termsAccepted}
//             setTermsAccepted={setTermsAccepted}
//           />
//         );
//       default:
//         return 'Unknown step';
//     }
//   };

//   return (
//     <Container className={classes.root} maxWidth="xl">
//       <Box className={classes.mainContainer}>
//         {/* Form Column - Hide or show based on whether resume has been generated */}
//         {!generatedResume && (
//           <Box className={`${classes.columnBox} ${classes.formColumn}`}>
//             <Typography variant="h5" className={classes.sectionTitle}>
//               Build Your Resume
//               <Button
//                 variant="contained"
//                 className={`${classes.saveButton} ${!areTermsAccepted ? classes.disabledButton : ''}`}
//                 onClick={handleGenerateResume}
//                 disabled={loading || !areTermsAccepted}
//               >
//                 Generate Resume
//                 {loading && <CircularProgress size={20} className={classes.loader} />}
//               </Button>
//             </Typography>
            
//             {/* Stepper Navigation with clickable labels */}
//             <Stepper activeStep={activeStep} className={classes.stepper}>
//               {steps.map((label, index) => (
//                 <Step key={label}>
//                   <StepLabel 
//                     className={classes.stepLabel} 
//                     onClick={() => handleStepClick(index)}
//                     StepIconProps={{
//                       style: { cursor: 'pointer' }
//                     }}
//                   >
//                     <span style={{ cursor: 'pointer' }}>{label}</span>
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>

//             {/* Current Step Content */}
//             <Paper className={classes.paper} elevation={0}>
//               {getStepContent(activeStep)}
              
//               {/* Navigation Buttons */}
//               <Box className={classes.navigationButtons}>
//                 <Button
//                   disabled={activeStep === 0}
//                   onClick={handleBack}
//                   variant="outlined"
//                   className={classes.buttonBack}
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={activeStep === steps.length - 1 ? handleGenerateResume : handleNext}
//                   className={`${classes.buttonNext} ${(activeStep === steps.length - 1 && !areTermsAccepted) ? classes.disabledButton : ''}`}
//                   disabled={(activeStep === steps.length - 1 && !areTermsAccepted)}
//                 >
//                   {activeStep === steps.length - 1 ? 'Generate Resume' : 'Next'}
//                 </Button>
//               </Box>
//             </Paper>
//           </Box>
//         )}

//         {/* Preview Column - Adjust width to full when resume is generated */}
//         <Box 
//           className={`${generatedResume ? '' : classes.columnBox} ${classes.previewColumn}`} 
//           sx={{ width: generatedResume ? '100%' : '50%' }}
//         >
//           <Box className={classes.sectionTitle}>
//             <Typography variant="h5">
//               {generatedResume ? 'Generated Resume' : 'Resume Preview'}
//             </Typography>
            
//             {/* Show action buttons when resume is generated */}
//             {generatedResume && (
//               <Box>
//                 <Button
//                   variant="contained"
//                   className={classes.downloadButton}
//                   onClick={handleDownloadResume}
//                   disabled={downloadingPdf}
//                 >
//                   {downloadingPdf ? (
//                     <>
//                       Generating PDF
//                       <CircularProgress size={20} className={classes.loader} />
//                     </>
//                   ) : (
//                     'Download PDF'
//                   )}
//                 </Button>
//                 <Button
//                   variant="contained"
//                   className={classes.editButton}
//                   onClick={handleEditResume}
//                 >
//                   Edit Resume
//                 </Button>
//               </Box>
//             )}
//           </Box>
          
//           <ResumePreview 
//             userData={resumeData}
//             generatedData={generatedResume}
//           />
//         </Box>
//       </Box>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ResumeBuilder;
// src/pages/ResumeBuilder.jsx
// This is an updated version of the ResumeBuilder component with added edit functionality

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
  CircularProgress
} from '@mui/material';
import Alert from '@mui/material/Alert';
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
import ResumePreview from '../components/resumeBuilder/ResumePreview';
import TermsAndPolicies from '../components/resumeBuilder/TermsAndPolicies';

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
  }
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
    // Allow step navigation even when resume is generated, when in edit mode
    setActiveStep(stepIndex);
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

  // Validate terms acceptance
  const validateTermsAcceptance = () => {
    if (!termsAccepted.updates || !termsAccepted.dataSharing) {
      setSnackbar({
        open: true,
        message: 'Please accept both terms and policies to continue',
        severity: 'error',
      });
      setActiveStep(6); // Switch to terms step
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
    
    // Validate terms acceptance
    if (!validateTermsAcceptance()) {
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
        };
      } else if (typeof generatedData.education === 'object') {
        // Map education object directly
        formData.education = {
          degree: generatedData.education.degree || '',
          specialization: generatedData.education.specialization || '',
          institution: generatedData.education.institution || '',
          graduation_year: generatedData.education.graduationYear || generatedData.education.graduation_year || '',
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
    
    // Map projects (with either Academic_projects or projects field)
    if (generatedData.Academic_projects && Array.isArray(generatedData.Academic_projects)) {
      formData.Academic_projects = generatedData.Academic_projects.map(project => ({
        name: project.name || '',
        skills_used: project.skills_used || '',
        description: project.description || '',
      }));
    } else if (generatedData.projects && Array.isArray(generatedData.projects)) {
      // Convert generated projects format to Academic_projects format
      formData.Academic_projects = generatedData.projects.map(project => {
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
        };
      });
    }
    
    // Map work experience
    if (generatedData.work_experience && Array.isArray(generatedData.work_experience)) {
      formData.work_experience = generatedData.work_experience.map(exp => ({
        position: exp.position || '',
        company_name: exp.company_name || '',
        duration: exp.duration || '',
        description: exp.description || '',
      }));
    } else if (generatedData.workExperience && Array.isArray(generatedData.workExperience)) {
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
          duration: exp.duration || '',
          description: description,
        };
      });
    }
    
    // Map custom sections
    if (generatedData.customSections) {
      formData.customSections = { ...generatedData.customSections };
    }
    
    return formData;
  };

  // Handle resetting the form to edit again
  const handleEditResume = () => {
    if (generatedResume) {
      // Map the generated resume data back to the form fields
      const formData = mapGeneratedDataToFormFields(generatedResume);
      
      // Update the form data
      setResumeData(formData);
      
      // Set active step back to first step for editing
      setActiveStep(0);
      
      // Clear generated resume to show form again
      setGeneratedResume(null);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Resume loaded for editing',
        severity: 'success',
      });
    }
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

  // Handle updating the resume after editing
  const handleUpdateResume = async () => {
    // Validate form data first
    if (!validateResumeData()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await generateResume(resumeData);
      
      setSnackbar({
        open: true,
        message: 'Resume updated successfully!',
        severity: 'success',
      });
      
      // Transform the generated resume data to match frontend structure
      const adaptedResume = adaptGeneratedResume(response.resume);
      
      // Store the adapted resume data and replace the preview
      setGeneratedResume(adaptedResume);
      
    } catch (error) {
      console.error('Error updating resume:', error);
      setSnackbar({
        open: true,
        message: error.message || 'An error occurred updating your resume. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if both terms are accepted
  const areTermsAccepted = termsAccepted.updates && termsAccepted.dataSharing;

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
    <Container className={classes.root} maxWidth="xl">
      <Box className={classes.mainContainer}>
        {/* Form Column - Hide or show based on whether resume has been generated */}
        {!generatedResume && (
          <Box className={`${classes.columnBox} ${classes.formColumn}`}>
            <Typography variant="h5" className={classes.sectionTitle}>
              {resumeData.summary ? 'Edit Your Resume' : 'Build Your Resume'}
              <Button
                variant="contained"
                className={`${classes.saveButton} ${!areTermsAccepted ? classes.disabledButton : ''}`}
                onClick={resumeData.summary ? handleUpdateResume : handleGenerateResume}
                disabled={loading || !areTermsAccepted}
              >
                {resumeData.summary ? 'Update Resume' : 'Generate Resume'}
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
                  onClick={activeStep === steps.length - 1 ? 
                    (resumeData.summary ? handleUpdateResume : handleGenerateResume) : 
                    handleNext}
                  className={`${classes.buttonNext} ${(activeStep === steps.length - 1 && !areTermsAccepted) ? classes.disabledButton : ''}`}
                  disabled={(activeStep === steps.length - 1 && !areTermsAccepted)}
                >
                  {activeStep === steps.length - 1 ? 
                    (resumeData.summary ? 'Update Resume' : 'Generate Resume') : 
                    'Next'}
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