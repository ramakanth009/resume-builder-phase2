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
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { generateResume, getResumeById, updateResume, checkPhonePopupNeeded, addPhoneNumber, skipPhonePopup } from "../utils/api";
import { adaptGeneratedResume } from "../utils/resumeAdapter";

// Section Components
import PersonalInfoSection from "../components/resumeBuilderComponents/PersonalInfoSection";
import SocialLinksSection from "../components/resumeBuilderComponents/SocialLinksSection";
import EducationSection from "../components/resumeBuilderComponents/EducationSection";
import SkillsSection from "../components/resumeBuilderComponents/SkillsSection";
import ProjectsSection from "../components/resumeBuilderComponents/ProjectsSection";
import ExperienceSection from "../components/resumeBuilderComponents/ExperienceSection";
import CertificationsSection from "../components/resumeBuilderComponents/CertificationsSection";
import CustomSections from "../components/resumeBuilderComponents/CustomSections";
import ResumePreview from "../components/previewComponents/ResumePreview";
import AISkillRecommendationsSection from "../components/resumeBuilderComponents/AISkills";
import TemplateRepositoryWarningPopup from "../components/resumeBuilderComponents/TemplateRepositoryWarningPopup";
import PhoneCollectionPopup from "../components/PhoneCollectionPopup";
import templatesData from "../data/templatesData";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import { useResumeBuilderGuard } from '../hooks/useResumeBuilderGuard';

// Import useStyles from updated styles
import { useStyles } from "./resumebuilder.Styles";

const steps = [
  "Personal Info",
  "Social Links",
  "Education",
  "Skills",
  "AI Skills",
  "Projects",
  "Experience",
  "Certifications",
  "Custom Sections",
];

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
 * in both generate and update formats
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

const ResumeBuilder = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currentUser, updateUserData } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:960px)");
  const { showConfirmDialog, confirmLogout, cancelLogout } = useResumeBuilderGuard();

  // Get URL parameters
  const { resumeId, section } = useParams();
  const location = useLocation();

  // Determine current mode based on URL path
  const isEditingExisting = location.pathname.includes('/edit/');
  const isCreatingNew = !resumeId;

  // Get current active step from URL section parameter
  const getCurrentStep = () => {
    if (!section || !(section in SECTION_SLUGS)) {
      return 0; // Default to first section
    }
    return SECTION_SLUGS[section];
  };

  // State Declarations
  const [activeStep, setActiveStep] = useState(getCurrentStep());
  const [loading, setLoading] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);

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
  const [targetRole, setTargetRole] = useState("");
  const [templateWarningOpen, setTemplateWarningOpen] = useState(false);

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({});

  // Phone collection popup state
  const [phonePopup, setPhonePopup] = useState({
    open: false,
    userName: '',
    loading: false
  });

  // Template selection states
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    templatesData.find((t) => t.isDefault)?.id || "classic"
  );

  // Initialize resumeData with empty structure and fields for both formats
  const [resumeData, setResumeData] = useState({
    header: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
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
  });

  // Update activeStep when URL section changes
  useEffect(() => {
    const newStep = getCurrentStep();
    setActiveStep(newStep);
  }, [section]);

  // Navigation handler for section changes
  const handleStepClick = (step) => {
    const newSection = SLUG_TO_SECTION[step];
    if (newSection) {
      let basePath;
      if (isEditingExisting) {
        basePath = `/resume-builder/edit/${resumeId}`;
      } else {
        basePath = '/resume-builder';
      }
      navigate(`${basePath}/${newSection}`);
    }
  };

  // Validation functions
  const validatePersonalInfo = () => {
    const errors = {};
    
    if (!resumeData.header.name?.trim()) {
      errors['header.name'] = 'Name is required';
    }
    
    if (!resumeData.header.email?.trim()) {
      errors['header.email'] = 'Email is required';
    }
    
    if (!resumeData.header.phone?.trim()) {
      errors['header.phone'] = 'Phone is required';
    } else if (resumeData.header.phone.length !== 10) {
      errors['header.phone'] = 'Phone number must be exactly 10 digits';
    }
    
    if (!resumeData.target_role?.trim()) {
      errors['target_role'] = 'Target role is required';
    }
    
    return errors;
  };

  const validateEducation = () => {
    const errors = {};
    
    if (!resumeData.education.degree?.trim()) {
      errors['education.degree'] = 'Degree is required';
    }
    
    if (!resumeData.education.specialization?.trim()) {
      errors['education.specialization'] = 'Specialization is required';
    }
    
    if (!resumeData.education.institution?.trim()) {
      errors['education.institution'] = 'Institution is required';
    }
    
    if (!resumeData.education.graduation_year?.trim() && !resumeData.education.graduationYear?.trim()) {
      errors['education.graduation_year'] = 'Graduation year is required';
    }
    
    return errors;
  };

  const validateSkills = () => {
    const errors = {};
    
    if (!resumeData.skills.some(skill => skill?.trim())) {
      errors['skills'] = 'At least one skill is required';
    }
    
    return errors;
  };

  const validateProjects = () => {
    const errors = {};
    
    if (!resumeData.projects.some(project => project.name?.trim())) {
      errors['projects'] = 'At least one project with a name is required';
    }
    
    return errors;
  };

  const validateStep = (stepIndex) => {
    let stepErrors = {};
    
    switch (stepIndex) {
      case 0: // Personal Info
        stepErrors = validatePersonalInfo();
        break;
      case 2: // Education
        stepErrors = validateEducation();
        break;
      case 3: // Skills
        stepErrors = validateSkills();
        break;
      case 5: // Projects
        stepErrors = validateProjects();
        break;
      default:
        break;
    }
    
    return stepErrors;
  };

  // Clear validation errors when data changes
  const clearValidationErrors = () => {
    setValidationErrors({});
  };

  // Handler for role selection
  const handleRoleSelect = (role) => {
    if (role && role !== targetRole) {
      setTargetRole(role);
    }
  };

  // Set target role from resumeData if available (for editing existing resumes)
  useEffect(() => {
    if (resumeData.target_role && !targetRole) {
      setTargetRole(resumeData.target_role);
    }
  }, [resumeData.target_role, targetRole]);

  // Check for phone collection popup
  useEffect(() => {
    const checkPhoneCollection = async () => {
      try {
        if (currentUser && currentUser.id) {
          setPhonePopup(prev => ({ ...prev, loading: true }));
          
          const response = await checkPhonePopupNeeded();
          
          if (response.status === 'success' && response.show_popup) {
            setPhonePopup({
              open: true,
              userName: response.user_name || currentUser.name,
              loading: false
            });
          } else {
            setPhonePopup(prev => ({ ...prev, loading: false }));
          }
        }
      } catch (error) {
        console.error('Error checking phone popup status:', error);
        setPhonePopup(prev => ({ ...prev, loading: false }));
      }
    };

    const timer = setTimeout(() => {
      checkPhoneCollection();
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentUser]);

  // Phone collection handlers
  const handlePhoneAdded = async (phoneNumber) => {
    try {
      await addPhoneNumber(phoneNumber);
      
      if (updateUserData) {
        updateUserData({ phone: phoneNumber });
      } else {
        if (currentUser) {
          const updatedUser = { ...currentUser, phone: phoneNumber };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
      
      return Promise.resolve();
    } catch (error) {
      throw error;
    }
  };

  const handlePhoneSkipped = async () => {
    try {
      await skipPhonePopup();
      return Promise.resolve();
    } catch (error) {
      console.error('Error logging skip action:', error);
      return Promise.resolve();
    }
  };

  const handlePhonePopupClose = () => {
    setPhonePopup(prev => ({ ...prev, open: false }));
  };

  // Fetch resume data if in edit mode
  useEffect(() => {
    if (isEditingExisting && resumeId) {
      const fetchResumeData = async () => {
        setLoadingResume(true);
        setLoadingError(null);

        try {
          const response = await getResumeById(resumeId);

          if (response && response.status === "success") {
            const adaptedResume = adaptGeneratedResume(response.resume, resumeId);
            setGeneratedResume(adaptedResume);

            const updatedFormData = mapGeneratedDataToFormFields(adaptedResume);
            setResumeData(updatedFormData);

            setSnackbar({
              open: true,
              message: "Resume loaded successfully",
              severity: "success",
            });
          } else {
            throw new Error(response?.message || "Failed to load resume");
          }
        } catch (error) {
          console.error("Error fetching resume:", error);
          
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
  }, [resumeId, isEditingExisting]);

  // Navigation Handlers
  const handleNext = () => {
    setValidationErrors({});
    
    if (activeStep === 5) {
      const hasGigaversityLink = resumeData.projects.some(
        project => project.link && project.link.includes('github.com/Ed-Gigaversity')
      );
      
      if (hasGigaversityLink) {
        setTemplateWarningOpen(true);
        return;
      }
    }
    
    const stepErrors = validateStep(activeStep);
    
    if (Object.keys(stepErrors).length > 0) {
      setValidationErrors(stepErrors);
      return;
    }
    
    const nextStep = activeStep + 1;
    if (nextStep < steps.length) {
      const nextSection = SLUG_TO_SECTION[nextStep];
      if (nextSection) {
        let basePath;
        if (isEditingExisting) {
          basePath = `/resume-builder/edit/${resumeId}`;
        } else {
          basePath = '/resume-builder';
        }
        navigate(`${basePath}/${nextSection}`);
      }
    }
  };

  const handleBack = () => {
    setValidationErrors({});
    
    const prevStep = activeStep - 1;
    if (prevStep >= 0) {
      const prevSection = SLUG_TO_SECTION[prevStep];
      if (prevSection) {
        let basePath;
        if (isEditingExisting) {
          basePath = `/resume-builder/edit/${resumeId}`;
        } else {
          basePath = '/resume-builder';
        }
        navigate(`${basePath}/${prevSection}`);
      }
    }
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

  // Template warning popup handler
  const handleCloseTemplateWarning = () => {
    setTemplateWarningOpen(false);
  };

  // Form Validation
  const validateResumeData = () => {
    const buildNavPath = (sectionStep) => {
      const section = SLUG_TO_SECTION[sectionStep];
      let basePath;
      if (isEditingExisting) {
        basePath = `/resume-builder/edit/${resumeId}`;
      } else {
        basePath = '/resume-builder';
      }
      return `${basePath}/${section}`;
    };

    if (
      !resumeData.header.name ||
      !resumeData.header.email ||
      !resumeData.header.phone
    ) {
      setSnackbar({
        open: true,
        message: "Please fill in all personal information fields",
        severity: "error",
      });
      navigate(buildNavPath(0));
      return false;
    }

    if (!resumeData.education.degree || !resumeData.education.institution) {
      setSnackbar({
        open: true,
        message: "Please fill in education information",
        severity: "error",
      });
      navigate(buildNavPath(2));
      return false;
    }

    if (resumeData.skills.length === 0 || !resumeData.skills[0]) {
      setSnackbar({
        open: true,
        message: "Please add at least one skill",
        severity: "error",
      });
      navigate(buildNavPath(3));
      return false;
    }

    if (resumeData.projects.length === 0 || !resumeData.projects[0].name) {
      setSnackbar({
        open: true,
        message: "Please add at least one project",
        severity: "error",
      });
      navigate(buildNavPath(5));
      return false;
    }

    return true;
  };

  // Generate resume handler
  const handleGenerateResume = async () => {
    if (!validateResumeData()) {
      return;
    }

    setLoading(true);

    try {
      const apiReadyData = prepareFormDataForApi(resumeData);
      const response = await generateResume(apiReadyData);

      let resumeIdFromResponse = null;
      let resumeDataFromResponse = null;

      if (response) {
        resumeIdFromResponse = response.id || 
                              response.resume_id || 
                              response.resumeId ||
                              response.data?.id ||
                              response.data?.resume_id ||
                              response.resume?.id ||
                              response.resume?.resume_id;

        resumeDataFromResponse = response.resume || 
                                response.data?.resume || 
                                response.data || 
                                response;
      }

      if (!resumeIdFromResponse) {
        throw new Error('No resume ID returned from server. Please try again.');
      }

      if (!resumeDataFromResponse) {
        throw new Error('No resume data returned from server. Please try again.');
      }

      setSnackbar({
        open: true,
        message: "Resume generated successfully!",
        severity: "success",
      });

      const adaptedResume = adaptGeneratedResume(resumeDataFromResponse, resumeIdFromResponse);

      // WORKAROUND: If backend returns empty aiExperience, preserve frontend genai_tools
      if (
        (!adaptedResume.aiExperience ||
          adaptedResume.aiExperience.length === 0) &&
        resumeData.genai_tools &&
        resumeData.genai_tools.length > 0
      ) {
        adaptedResume.aiExperience = resumeData.genai_tools.map((tool) => ({
          toolName: tool.name,
          usageCases: tool.usage_descriptions || [],
          impact:
            tool.description || `Enhanced productivity using ${tool.name}`,
        }));

        adaptedResume.genai_tools = resumeData.genai_tools;
      }

      // Navigate to generated resume view
      navigate(`/resume-builder/view/${resumeIdFromResponse}/personal-info`);

    } catch (error) {
      console.error("Error generating resume:", error);
      
      let errorMessage = "An error occurred generating your resume. Please try again.";
      
      if (error.message.includes('Network error')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.message.includes('resume ID')) {
        errorMessage = "Server error: No resume ID received. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle updating the resume after editing
  const handleUpdateResume = async () => {
    if (!validateResumeData()) {
      return;
    }

    const idToUpdate = resumeId || generatedResume?.id;

    if (!idToUpdate) {
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
      const response = await updateResume(idToUpdate, apiReadyData);

      setSnackbar({
        open: true,
        message: "Resume updated successfully!",
        severity: "success",
      });

      // Navigate to view mode
      navigate(`/resume-builder/view/${idToUpdate}/personal-info`);

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
            onRoleSelect={handleRoleSelect}
            validationErrors={validationErrors}
            clearValidationErrors={clearValidationErrors}
          />
        );
      case 1:
        return (
          <SocialLinksSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      case 2:
        return (
          <EducationSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            validationErrors={validationErrors}
            clearValidationErrors={clearValidationErrors}
          />
        );
      case 3:
        return (
          <SkillsSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            targetRole={targetRole}
            validationErrors={validationErrors}
            clearValidationErrors={clearValidationErrors}
          />
        );
      case 4:
        return (
          <AISkillRecommendationsSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            targetRole={targetRole}
          />
        );
      case 5:
        return (
          <ProjectsSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            targetRole={targetRole}
            validationErrors={validationErrors}
            clearValidationErrors={clearValidationErrors}
          />
        );
      case 6:
        return (
          <ExperienceSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      case 7:
        return (
          <CertificationsSection
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      case 8:
        return (
          <CustomSections
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );
      default:
        return "Unknown step";
    }
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

  return (
    <Container className={classes.root} maxWidth="xl">
      <Navbar
        currentPage="resume-builder"
        hideLogo={true}
      />

      <Sidebar
        activeStep={activeStep}
        steps={steps}
        onStepClick={handleStepClick}
      />

      {isEditingExisting && (
        <Typography className={classes.resumeIdText}>
          Resume ID: {resumeId}
        </Typography>
      )}

      <Box className={`${classes.mainContainer} ${classes.mainContentWithSidebar}`}>
        <Box className={`${classes.columnBox} ${classes.formColumn}`}>
          <Typography variant="h5" className={classes.sectionHeader}>
            {isEditingExisting ? "Edit Your Resume" : "Craft your story"}
          </Typography>
          <Typography variant="subtitle1" className={classes.subheading}>
            Build a resume that opens doors to your future
          </Typography>

          <Box className={classes.previewNotice}>
            <InfoIcon className={classes.noticeIcon} />
            <Typography variant="body2">
              scroll below to access the live preview
            </Typography>
          </Box>

          <Paper className={classes.paper} elevation={0} id="current-step-content">
            {getStepContent(activeStep)}

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
                onClick={
                  activeStep === steps.length - 1
                    ? isEditingExisting
                      ? handleUpdateResume
                      : handleGenerateResume
                    : handleNext
                }
                className={`${classes.buttonNext} ${
                  loading ? classes.disabledButton : ""
                }`}
                disabled={loading}
                fullWidth={isMobile}
              >
                {activeStep === steps.length - 1
                  ? isEditingExisting
                    ? "Save Changes"
                    : "Generate Resume"
                  : "Next"}
                {loading && activeStep === steps.length - 1 && (
                  <CircularProgress size={20} className={classes.loader} />
                )}
              </Button>
            </Box>
          </Paper>
        </Box>

        <Box className={`${classes.columnBox} ${classes.previewColumn}`}>
          <Typography variant="h5" className={classes.sectionHeader}>
            Live Preview
          </Typography>
          <Typography variant="subtitle1" className={classes.subheading}>
            Watch your resume come to life
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
      </Box>

      <TemplateRepositoryWarningPopup
        open={templateWarningOpen}
        onClose={handleCloseTemplateWarning}
      />

      <PhoneCollectionPopup
        open={phonePopup.open}
        onClose={handlePhonePopupClose}
        userName={phonePopup.userName}
        onPhoneAdded={handlePhoneAdded}
        onSkipped={handlePhoneSkipped}
      />

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

export default ResumeBuilder;