import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getResumeById, updateResume } from "../utils/api";
import { adaptGeneratedResume } from "../utils/resumeAdapter";
import { generateResumePDF } from "../utils/pdfUtils";

// Components
import ResumePreview from "../components/previewComponents/ResumePreview";
import TemplateSelector from "../components/previewComponents/TemplateSelector";
import templatesData from "../data/templatesData";
import Navbar from "../common/Navbar";
import { useResumeBuilderGuard } from '../hooks/useResumeBuilderGuard';

// Import useStyles from updated styles
import { useStyles } from "./resumebuilder.Styles";
import makeStylesWithTheme from '../styles/makeStylesAdapter';

// Additional styles for the dialog header
const useDialogStyles = makeStylesWithTheme((theme) => ({
  stickyDialogTitle: {
    position: 'sticky',
    top: 0,
    zIndex: 1300,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: '1px solid rgba(39, 40, 108, 0.1)',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 16px rgba(39, 40, 108, 0.08)',
    '@media (max-width: 960px)': {
      padding: '1rem 1.5rem',
      flexDirection: 'column',
      gap: '1rem',
    },
    '@media (max-width: 600px)': {
      padding: '1rem',
    },
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  dialogTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #27286c 0%, #3182ce 50%, #14b8a6 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em',
    margin: 0,
    '@media (max-width: 960px)': {
      fontSize: '1.5rem',
      textAlign: 'center',
    },
  },
  dialogSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    fontWeight: 400,
    margin: 0,
    '@media (max-width: 960px)': {
      textAlign: 'center',
      fontSize: '0.9rem',
    },
  },
  headerActions: {
    display: 'flex',
    gap: '1rem',
    '@media (max-width: 960px)': {
      width: '100%',
      justifyContent: 'center',
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  },
  actionButton: {
    borderRadius: '12px',
    padding: '0.75rem 1.5rem',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '0.95rem',
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  cancelButton: {
    color: '#64748b',
    borderColor: '#e2e8f0',
    '&:hover': {
      backgroundColor: '#f1f5f9',
      borderColor: '#cbd5e0',
    },
  },
  applyButton: {
    background: 'linear-gradient(135deg, #3182ce 0%, #1e40af 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(49, 130, 206, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)',
      boxShadow: '0 6px 16px rgba(49, 130, 206, 0.4)',
    },
  },
}));

// Section slug mapping for URL routing
const SECTION_SLUGS = {
  'personal-info': 0,
  'social-links': 1,
  'education': 2,
  'skills': 3,
  'ai-skills': 4,
  'projects': 5,
  'experience': 6,
  'certifications': 7,
  'custom-sections': 8,
};

const SLUG_TO_SECTION = {
  0: 'personal-info',
  1: 'social-links',
  2: 'education',
  3: 'skills',
  4: 'ai-skills',
  5: 'projects',
  6: 'experience',
  7: 'certifications',
  8: 'custom-sections',
};

/**
 * Prepares form data for API submission by ensuring all required fields are present
 */
const prepareFormDataForApi = (formData) => {
  const apiData = JSON.parse(JSON.stringify(formData));

  // Handle education fields - ensure both formats are present
  if (apiData.education) {
    apiData.education.graduation_year =
      apiData.education.graduation_year ||
      apiData.education.graduationYear ||
      "";
    apiData.education.graduationYear =
      apiData.education.graduationYear ||
      apiData.education.graduation_year ||
      "";
  }

  // Handle work experience - ensure both formats are available
  if (apiData.work_experience && Array.isArray(apiData.work_experience)) {
    apiData.work_experience = apiData.work_experience.map((exp) => {
      return {
        ...exp,
        company_name: exp.company_name || exp.companyName || "",
        companyName: exp.companyName || exp.company_name || "",
        responsibilities:
          exp.responsibilities ||
          (exp.description ? exp.description.split("\n").filter(Boolean) : []),
      };
    });

    apiData.workExperience = apiData.work_experience.map((exp) => ({
      position: exp.position || "",
      companyName: exp.companyName || exp.company_name || "",
      duration: exp.duration || "",
      responsibilities:
        exp.responsibilities ||
        (exp.description ? exp.description.split("\n").filter(Boolean) : []),
    }));
  }

  // Handle projects - ensure both formats are available
  if (apiData.projects && Array.isArray(apiData.projects)) {
    apiData.projects = apiData.projects.map((proj) => {
      const technologies =
        proj.technologies && proj.technologies.length
          ? proj.technologies
          : proj.skills_used
          ? proj.skills_used.split(",").map((s) => s.trim())
          : [];

      const responsibilities =
        proj.responsibilities && proj.responsibilities.length
          ? proj.responsibilities
          : proj.description
          ? proj.description.split("\n").filter(Boolean)
          : [];

      return {
        ...proj,
        technologies,
        responsibilities,
      };
    });
  }

  // Handle GenAI skills - Format properly for API and preserve existing data
  if (apiData.genai_tools && Array.isArray(apiData.genai_tools)) {
    apiData.genai_tools = apiData.genai_tools.map((tool) => ({
      tool_id: tool.tool_id,
      name: tool.name || `Tool ${tool.tool_id}`,
      description: tool.description || "",
      usage_descriptions: tool.usage_descriptions || [],
    }));

    apiData.genai_skills = {
      used_tools: apiData.genai_tools.map((tool) => ({
        tool_id: tool.tool_id,
        usage_descriptions: tool.usage_descriptions || [],
      })),
      not_used_tools: [],
    };
  }

  return apiData;
};

const mapGeneratedDataToFormFields = (generatedData) => {
  const formData = {
    header: {
      name: "",
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      portfolio: "",
    },
    summary: "",
    education: {
      degree: "",
      specialization: "",
      institution: "",
      graduation_year: "",
      graduationYear: "",
    },
    skills: [""],
    projects: [
      {
        name: "",
        skills_used: "",
        description: "",
        responsibilities: [],
        link: "",
        technologies: [],
      },
    ],
    certifications: [""],
    work_experience: [
      {
        position: "",
        company_name: "",
        companyName: "",
        duration: "",
        description: "",
        responsibilities: [],
      },
    ],
    target_role: "",
    genai_tools: [],
    customSections: {},
  };

  if (generatedData.header) {
    formData.header = { ...generatedData.header };
  }

  if (generatedData.target_role) {
    formData.target_role = generatedData.target_role;
  }

  if (generatedData.summary) {
    formData.summary = generatedData.summary;
  }

  if (generatedData.education) {
    if (
      Array.isArray(generatedData.education) &&
      generatedData.education.length > 0
    ) {
      const edu = generatedData.education[0];
      formData.education = {
        degree: edu.degree || "",
        specialization: edu.specialization || "",
        institution: edu.institution || "",
        graduation_year: edu.graduationYear || edu.graduation_year || "",
        graduationYear: edu.graduationYear || edu.graduation_year || "",
      };
    } else if (typeof generatedData.education === "object") {
      formData.education = {
        degree: generatedData.education.degree || "",
        specialization: generatedData.education.specialization || "",
        institution: generatedData.education.institution || "",
        graduation_year:
          generatedData.education.graduationYear ||
          generatedData.education.graduation_year ||
          "",
        graduationYear:
          generatedData.education.graduationYear ||
          generatedData.education.graduation_year ||
          "",
      };
    }
  }

  if (generatedData.skills && Array.isArray(generatedData.skills)) {
    formData.skills = [...generatedData.skills];
  }

  if (
    generatedData.certifications &&
    Array.isArray(generatedData.certifications)
  ) {
    formData.certifications = [...generatedData.certifications];
  }

  // Map AI Experience Data
  if (
    generatedData.aiExperience &&
    Array.isArray(generatedData.aiExperience) &&
    generatedData.aiExperience.length > 0
  ) {
    formData.genai_tools = generatedData.aiExperience.map((aiExp) => ({
      tool_id: aiExp.toolName
        ? aiExp.toolName.toLowerCase().replace(/\s+/g, "_")
        : `tool_${Math.random().toString(36).substr(2, 5)}`,
      name: aiExp.toolName || "",
      description: aiExp.impact || "",
      usage_descriptions: aiExp.usageCases || [],
    }));
  } else if (
    generatedData.genai_tools &&
    Array.isArray(generatedData.genai_tools) &&
    generatedData.genai_tools.length > 0
  ) {
    formData.genai_tools = [...generatedData.genai_tools];
  }

  // Map projects field
  if (
    generatedData.projects &&
    Array.isArray(generatedData.projects) &&
    generatedData.projects.length > 0
  ) {
    formData.projects = generatedData.projects.map((project) => {
      let description = "";
      if (
        project.responsibilities &&
        Array.isArray(project.responsibilities)
      ) {
        description = project.responsibilities.join("\n");
      } else if (project.description) {
        description = project.description;
      }

      let skills = "";
      if (project.skills_used) {
        skills = project.skills_used;
      } else if (project.technologies) {
        skills = Array.isArray(project.technologies)
          ? project.technologies.join(", ")
          : project.technologies;
      }

      return {
        name: project.name || "",
        skills_used: skills,
        description: description,
        responsibilities: Array.isArray(project.responsibilities)
          ? [...project.responsibilities]
          : [],
        technologies: Array.isArray(project.technologies)
          ? [...project.technologies]
          : skills
          ? skills.split(",").map((s) => s.trim())
          : [],
        link: project.link || "",
      };
    });
  } else {
    formData.projects = [];
  }

  // Map work experience
  if (
    generatedData.work_experience &&
    Array.isArray(generatedData.work_experience) &&
    generatedData.work_experience.length > 0
  ) {
    formData.work_experience = generatedData.work_experience.map((exp) => ({
      position: exp.position || "",
      company_name: exp.company_name || "",
      companyName: exp.companyName || exp.company_name || "",
      duration: exp.duration || "",
      description:
        exp.description ||
        (exp.responsibilities ? exp.responsibilities.join("\n") : ""),
      responsibilities: exp.responsibilities || [],
    }));
  } else if (
    generatedData.workExperience &&
    Array.isArray(generatedData.workExperience) &&
    generatedData.workExperience.length > 0
  ) {
    formData.work_experience = generatedData.workExperience.map((exp) => {
      let description = exp.description || "";
      if (
        !description &&
        exp.responsibilities &&
        Array.isArray(exp.responsibilities)
      ) {
        description = exp.responsibilities.join("\n");
      }

      return {
        position: exp.position || "",
        company_name: exp.companyName || "",
        companyName: exp.companyName || "",
        duration: exp.duration || "",
        description: description,
        responsibilities: exp.responsibilities || [],
      };
    });
  }

  if (generatedData.customSections) {
    formData.customSections = { ...generatedData.customSections };
  }

  return formData;
};

const GeneratedResume = () => {
  const classes = useStyles();
  const dialogClasses = useDialogStyles();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:960px)");
  const { showConfirmDialog, confirmLogout, cancelLogout } = useResumeBuilderGuard();

  // Get URL parameters
  const { resumeId, section } = useParams();
  const location = useLocation();

  // Determine current mode based on URL path
  const isViewingGenerated = location.pathname.includes('/generated/');
  const isViewMode = location.pathname.includes('/view/');

  // State Declarations
  const [loading, setLoading] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [isMobilePreviewMode, setIsMobilePreviewMode] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const [loadingError, setLoadingError] = useState(null);

  // Template selection states
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    templatesData.find((t) => t.isDefault)?.id || "classic"
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
      message: "Template updated successfully",
      severity: "success",
    });
  };

  // Fetch resume data on component mount
  useEffect(() => {
    if (resumeId) {
      const fetchResumeData = async () => {
        setLoadingResume(true);
        setLoadingError(null);

        try {
          console.log('📡 Calling getResumeById with ID:', resumeId);
          const response = await getResumeById(resumeId);
          console.log('✅ getResumeById response:', response);

          if (response && response.status === "success") {
            console.log('✅ Resume data found:', response.resume);
            
            const adaptedResume = adaptGeneratedResume(response.resume, resumeId);
            console.log('✅ Adapted resume:', adaptedResume);
            
            setGeneratedResume(adaptedResume);

            const updatedFormData = mapGeneratedDataToFormFields(adaptedResume);
            console.log('✅ Updated form data:', updatedFormData);
            
            setResumeData(updatedFormData);

            setSnackbar({
              open: true,
              message: "Resume loaded successfully",
              severity: "success",
            });
          } else {
            console.error('❌ Invalid response format:', response);
            throw new Error(response?.message || "Failed to load resume");
          }
        } catch (error) {
          console.error("❌ Error fetching resume:", error);
          
          // Enhanced error handling
          if (error.message.includes('404')) {
            setLoadingError(`Resume with ID ${resumeId} not found. It may have been deleted.`);
          } else if (error.message.includes('401') || error.message.includes('403')) {
            setLoadingError("You don't have permission to access this resume.");
          } else if (error.message.includes('Network error') || error.message.includes('fetch')) {
            setLoadingError("Network error. Backend endpoint may not exist.");
          } else {
            setLoadingError(error.message || "Unable to load the resume. Please try again.");
          }

          setSnackbar({
            open: true,
            message: error.message || "Failed to load resume",
            severity: "error",
          });
        } finally {
          setLoadingResume(false);
        }
      };

      fetchResumeData();
    }
  }, [resumeId]);

  // Toggle mobile preview mode
  const toggleMobilePreviewMode = () => {
    setIsMobilePreviewMode(!isMobilePreviewMode);
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

  // Handle updating the resume after editing
  const handleUpdateResume = async () => {
    if (!resumeId) {
      setSnackbar({
        open: true,
        message: "Cannot update: No resume ID found.",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const apiReadyData = prepareFormDataForApi(resumeData);
      const response = await updateResume(resumeId, apiReadyData);

      setSnackbar({
        open: true,
        message: "Resume updated successfully!",
        severity: "success",
      });

      if (response.resume) {
        const adaptedResume = adaptGeneratedResume(response.resume, resumeId);
        setGeneratedResume(adaptedResume);
        
        const updatedFormData = mapGeneratedDataToFormFields(adaptedResume);
        setResumeData(updatedFormData);
      }
    } catch (error) {
      console.error("Error updating resume:", error);
      setSnackbar({
        open: true,
        message: error.message || "Failed to update resume. Please try again.",
        severity: "error",
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
      const userName = dataToUse?.header?.name || "resume";
      const fileName = userName.toLowerCase().replace(/\s+/g, "_");

      await generateResumePDF(dataToUse, selectedTemplateId, fileName);

      setSnackbar({
        open: true,
        message: "Resume downloaded successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error downloading resume:", error);
      setSnackbar({
        open: true,
        message: "Failed to download resume. Please try again.",
        severity: "error",
      });
    } finally {
      setDownloadingPdf(false);
    }
  };

  // Handle editing resume
  const handleEditResume = () => {
    navigate(`/resume-builder/edit/${resumeId}/personal-info`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Loading states
  if (loadingResume) {
    return (
      <Container className={classes.root} maxWidth="xl">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" style={{ marginTop: "2rem" }}>
            Loading resume...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (loadingError) {
    return (
      <Container className={classes.root} maxWidth="xl">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <Alert severity="error" style={{ marginBottom: "1rem" }}>
            {loadingError}
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/resume-builder")}
          >
            Return to Resume Builder
          </Button>
        </Box>
      </Container>
    );
  }

  if (!generatedResume) {
    return (
      <Container className={classes.root} maxWidth="xl">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
        >
          <Typography variant="h6">No resume data available</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/resume-builder")}
            style={{ marginTop: "1rem" }}
          >
            Return to Resume Builder
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container className={classes.root} maxWidth="xl">
      <Navbar
        currentPage="resume-builder"
        onTemplateClick={handleOpenTemplateDialog}
        hideLogo={true}
      />

      <Typography className={classes.resumeIdText}>
        Resume ID: {resumeId}
      </Typography>

      <Box className={classes.viewModeToggle}>
        <Button
          variant="contained"
          className={classes.editModeButton}
          onClick={handleEditResume}
        >
          Edit Resume
        </Button>
        <Button
          variant="contained"
          className={classes.updateResumeButton}
          onClick={handleUpdateResume}
          disabled={loading}
        >
          {loading ? (
            <>
              Updating...
              <CircularProgress size={20} className={classes.loader} />
            </>
          ) : (
            "Update Resume"
          )}
        </Button>
      </Box>

      {isMobile && (
        <Box className={classes.mobileViewToggle}>
          <Button
            variant="contained"
            className={`${classes.editModeButton} ${
              !isMobilePreviewMode ? classes.activeModeButton : ""
            }`}
            onClick={() => setIsMobilePreviewMode(false)}
            disabled={!isMobilePreviewMode}
          >
            Edit Mode
          </Button>
          <Button
            variant="contained"
            className={`${classes.previewModeButton} ${
              isMobilePreviewMode ? classes.activeModeButton : ""
            }`}
            onClick={() => setIsMobilePreviewMode(true)}
            disabled={isMobilePreviewMode}
          >
            View Resume
          </Button>
        </Box>
      )}

      <Box className={classes.actionButtons}>
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
            "Export PDF"
          )}
        </Button>
      </Box>

      <Box className={classes.mainContainer}>
        {!isMobile && (
          <Box className={`${classes.columnBox} ${classes.previewColumn}`}>
            <Typography variant="h5" className={classes.sectionHeader}>
              Resume Preview
            </Typography>
            <Typography variant="subtitle1" className={classes.subheading}>
              Your generated resume
            </Typography>

            <Box className={classes.previewWrapper}>
              <Box className={classes.previewContent}>
                <ResumePreview
                  userData={resumeData}
                  generatedData={generatedResume}
                  templateId={selectedTemplateId}
                />
              </Box>
            </Box>
          </Box>
        )}

        {isMobile && isMobilePreviewMode && (
          <Box className={classes.mobilePreviewContainer}>
            <Typography variant="h6" className={classes.mobilePreviewHeader}>
              Your Generated Resume
            </Typography>

            <Box className={classes.mobileResumePreview}>
              <ResumePreview
                userData={resumeData}
                generatedData={generatedResume}
                templateId={selectedTemplateId}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                className={classes.downloadButton}
                onClick={handleDownloadResume}
                disabled={downloadingPdf}
                fullWidth
              >
                {downloadingPdf ? (
                  <>
                    Generating PDF
                    <CircularProgress size={20} className={classes.loader} />
                  </>
                ) : (
                  "Export PDF"
                )}
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <Dialog
        open={templateDialogOpen}
        onClose={handleCloseTemplateDialog}
        fullWidth
        maxWidth="lg"
        className={classes.templateDialog}
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <Box className={dialogClasses.stickyDialogTitle}>
          <Box className={dialogClasses.headerLeft}>
            <Typography variant="h3" className={dialogClasses.dialogTitle}>
              Choose Your Perfect Template
            </Typography>
            <Typography variant="h6" className={dialogClasses.dialogSubtitle}>
              Select a professionally designed template that represents your style
            </Typography>
          </Box>
          
          <Box className={dialogClasses.headerActions}>
            <Button
              onClick={handleCloseTemplateDialog}
              variant="outlined"
              className={`${dialogClasses.actionButton} ${dialogClasses.cancelButton}`}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmTemplateSelection}
              variant="contained"
              className={`${dialogClasses.actionButton} ${dialogClasses.applyButton}`}
            >
              Apply Template
            </Button>
          </Box>
        </Box>

        <DialogContent sx={{ 
          padding: 0, 
          flex: 1, 
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(39, 40, 108, 0.2)',
            borderRadius: '4px',
          },
        }}>
          <TemplateSelector
            selectedTemplateId={selectedTemplateId}
            onTemplateSelect={handleTemplateSelect}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={confirmDialog.open} onClose={handleCloseConfirmDialog}>
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.message}</DialogContentText>
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
      
      <Dialog open={showConfirmDialog} onClose={cancelLogout} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to leave? You will be logged out and unsaved changes may be lost.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout}>Stay</Button>
          <Button onClick={confirmLogout} color="error" variant="contained">
            Logout & Leave
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GeneratedResume;