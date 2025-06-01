import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Paper, 
  IconButton, 
  Button, 
  Alert,
  CircularProgress,
  Badge,
  Zoom
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LinkIcon from '@mui/icons-material/Link'; // Add this import
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getProjectRecommendations } from '../../utils/api';
import { useApiData } from '../../hooks/useApiData';
import ProjectRecommendationsModal from './ProjectRecommendationsModal';

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(0, 0, 0, 0.03)',
      // border: '1px solid rgba(39, 40, 108, 0.08)',
      borderRadius: '16px',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      '&:hover': {
        borderColor: 'rgba(39, 40, 108, 0.12)',
      },
      '&.Mui-focused': {
        background: 'rgba(0, 0, 0, 0.05)',
        borderColor: '#14b8a6',
        boxShadow: '0 0 0 3px rgba(20, 184, 166, 0.1), 0 4px 16px rgba(39, 40, 108, 0.12)',
        transform: 'translateY(-2px)',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#427bbf',
      fontWeight: 500,
      fontSize: '0.9rem',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#14b8a6',
    },
  },
  formSubtitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#27286c',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '40px',
      height: '2px',
      background: 'linear-gradient(90deg, #14b8a6, #a78bfa)',
    },
  },
  formDescription: {
    marginBottom: '24px',
    color: '#666',
    fontSize: '1rem'
  },
  paper: {
    padding: '1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    position: 'relative',
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    color: '#e53e3e',
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
  addButton: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    borderRadius: '8px',
    textTransform: 'none',
    marginTop: '1rem',
    '&:hover': {
      backgroundColor: '#bee3f8',
    },
  },
  helperText: {
    marginTop: '-0.5rem',
    marginBottom: '1rem',
    color: '#718096',
    fontSize: '0.75rem',
  },
  // Enhanced prominence for recommendation button
  recommendationButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: '#4299e1', // Brighter blue
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    marginBottom: '1.25rem',
    marginTop: '0.25rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(66, 153, 225, 0.3)',
    border: '1px solid #3182ce',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#3182ce',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(66, 153, 225, 0.4)',
    },
  },
  recommendationIcon: {
    color: 'white',
  },
  recommendationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  recommendationsCount: {
    backgroundColor: '#F97316',
    color: 'white',
    fontWeight: 'bold',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '0.5rem',
  },
  linkField: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  linkButton: {
    color: '#4299e1',
    marginBottom: '0.8rem',
    '&:hover': {
      color: '#3182ce',
    },
    '&.inactive': {
      color: '#CBD5E0',
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {  // Add this style for the icon
      fontSize: '2rem',     // Increase icon size
    }
  },
}));

const ProjectsSection = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [successMessage, setSuccessMessage] = useState('');
  const [loadingProject, setLoadingProject] = useState(false);
  const [projectError, setProjectError] = useState(null);
  const [recommendationsModalOpen, setRecommendationsModalOpen] = useState(false);
  
  // Use our custom hook for project recommendations
  const { 
    data: recommendationsResponse,
    loading,
    error
  } = useApiData(getProjectRecommendations, targetRole, {
    enabled: !!targetRole,
    cacheKey: `projectRecommendations_${targetRole}`,
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
  
  // Extract recommended projects from the response
  const recommendedProjects = recommendationsResponse?.projects || [];

  const handleOpenRecommendationsModal = () => {
    setRecommendationsModalOpen(true);
  };

  const handleCloseRecommendationsModal = () => {
    setRecommendationsModalOpen(false);
  };

  const handleAddProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          name: '',
          skills_used: '',
          description: '',
          responsibilities: [],
          link: '',
        },
      ],
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...resumeData.projects];
    
    if (field === 'description') {
      // Convert description text to responsibilities array
      const responsibilities = value.split('\n').filter(item => item.trim());
      
      updatedProjects[index] = {
        ...updatedProjects[index],
        responsibilities: responsibilities,
        description: value,
      };
    } else if (field === 'skills_used') {
      // Handle both fields for technologies/skills
      const skills = value;
      
      updatedProjects[index] = {
        ...updatedProjects[index],
        skills_used: skills,
        technologies: skills.split(',').map(s => s.trim()),
        [field]: value,
      };
    } else {
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
    }
    
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const handleRemoveProject = (index) => {
    // Don't remove if it's the only project and it's empty
    if (resumeData.projects.length === 1 && 
        !resumeData.projects[0].name && 
        !resumeData.projects[0].skills_used && 
        !resumeData.projects[0].description) {
      return;
    }
    
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((_, i) => i !== index),
    });
    
    // If we just removed all projects, add an empty one
    if (resumeData.projects.length === 1) {
      setResumeData(prev => ({
        ...prev,
        projects: [{
          name: '',
          skills_used: '',
          description: '',
          responsibilities: [],
          link: '',
        }]
      }));
    }
  };

  // Updated handler for adding a recommended project
  const handleAddRecommendedProject = (projectKey) => {
    setLoadingProject(true);
    setSuccessMessage('');
    setProjectError(null);
    
    try {
      // Find the project from already loaded recommendations
      const projectDetails = recommendedProjects.find(
        project => project.project_key === projectKey || project.id === projectKey
      );
      
      if (projectDetails) {
        // Create a new project object
        const newProject = {
          name: projectDetails.name || '',
          skills_used: projectDetails.skills_used || '',
          description: projectDetails.description || '',
          // Convert description to responsibilities array if needed
          responsibilities: projectDetails.responsibilities || 
            (projectDetails.description ? 
              projectDetails.description.split('\n').filter(line => line.trim()) : []),
          link: projectDetails.link || '',
          // Include technologies array if available
          technologies: projectDetails.technologies || 
            (projectDetails.skills_used ? 
              projectDetails.skills_used.split(',').map(s => s.trim()) : []),
        };
        
        // Check if there's any empty project entry
        const emptyProjectIndex = resumeData.projects.findIndex(project => !project.name);
        
        if (emptyProjectIndex !== -1) {
          // Update the first empty project entry
          const updatedProjects = [...resumeData.projects];
          updatedProjects[emptyProjectIndex] = newProject;
          
          setResumeData(prev => ({
            ...prev,
            projects: updatedProjects,
          }));
          
          setSuccessMessage(`Added "${projectDetails.name}" to Project ${emptyProjectIndex + 1}`);
          
          // Close the modal after selection
          setRecommendationsModalOpen(false);
          
          // Scroll to the updated project
          setTimeout(() => {
            const projectElement = document.getElementById(`project-${emptyProjectIndex}`);
            if (projectElement) {
              projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
          
        } else {
          // Add a new project entry
          setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, newProject],
          }));
          
          setSuccessMessage(`Added "${projectDetails.name}" as a new project`);
          
          // Close the modal after selection
          setRecommendationsModalOpen(false);
          
          // Scroll to bottom to see the new project
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
          }, 100);
        }
      } else {
        setProjectError('Project not found in recommendations');
      }
    } catch (error) {
      console.error('Error adding recommended project:', error);
      setProjectError(error.message || 'An error occurred while adding the project');
    } finally {
      setLoadingProject(false);
      
      // Clear success message after 3 seconds
      if (successMessage) {
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    }
  };

  const handleOpenProjectLink = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Box className={classes.form}>
      <Box>
        <Typography variant="h6" className={classes.formSubtitle}>
          Projects
        </Typography>
        <Typography variant="subtitle1" className={classes.formDescription}>
          Showcase your best work
        </Typography>
      </Box>
      
      {/* Enhanced recommendations button - more prominent at top */}
      {targetRole && !loading && (
        <Box className={classes.recommendationContainer}>
          <Zoom in={recommendedProjects.length > 0} timeout={500}>
            <Badge badgeContent={recommendedProjects.length} color="warning" 
                   classes={{ badge: classes.recommendationsCount }}>
              <Box 
                className={classes.recommendationButton}
                onClick={handleOpenRecommendationsModal}
                role="button"
                aria-label="View project recommendations"
              >
                <LightbulbIcon className={classes.recommendationIcon} />
                <Typography variant="body1" component="span" fontWeight="medium">
                  Discover Project Ideas for {targetRole}
                </Typography>
              </Box>
            </Badge>
          </Zoom>
        </Box>
      )}
      
      {/* Loading indicator for recommendations */}
      {loading && targetRole && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={24} color="primary" />
          <Typography variant="body2" ml={1} color="textSecondary">
            Loading project recommendations...
          </Typography>
        </Box>
      )}
      
      {/* Success message */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      
      {/* Project forms */}
      {resumeData.projects.map((project, index) => (
        <Paper 
          key={index} 
          className={classes.paper} 
          id={`project-${index}`}
        >
          <Box className={classes.sectionTitle}>
            <Typography variant="h6">Project {index + 1}</Typography>
          </Box>
          
          <IconButton
            className={classes.deleteButton}
            onClick={() => handleRemoveProject(index)}
          >
            <DeleteIcon />
          </IconButton>
          
          <TextField
            label="Project Name"
            value={project.name}
            onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
            variant="outlined"
            fullWidth
            className={classes.textField}
            required
          />
          
          <TextField
            label="Skills Used"
            value={project.skills_used}
            onChange={(e) => handleProjectChange(index, 'skills_used', e.target.value)}
            variant="outlined"
            fullWidth
            className={classes.textField}
            placeholder="e.g., React, Node.js, MongoDB"
            required
          />
          
          <Box className={classes.linkField}>
            <TextField
              label="Project Link"
              fullWidth
              value={project.link}
              onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
              className={classes.textField}
            />
            <IconButton
              className={`${classes.linkButton} ${!project.link ? 'inactive' : ''}`}
              onClick={() => handleOpenProjectLink(project.link)}
              disabled={!project.link}
            >
              <LinkIcon />
            </IconButton>
          </Box>
          
          <TextField
            label="Description"
            value={project.description}
            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            className={classes.textField}
            placeholder="Describe your work in a 2 - 3 sentences"
            required
          />
          <Typography className={classes.helperText}>
            Each line will be converted into a bullet point on your resume
          </Typography>
        </Paper>
      ))}
      
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddProject}
        className={classes.addButton}
        fullWidth
      >
        Add Project
      </Button>
      
      {/* Project Recommendations Modal */}
      <ProjectRecommendationsModal
        open={recommendationsModalOpen}
        onClose={handleCloseRecommendationsModal}
        recommendations={recommendedProjects}
        loading={loading}
        error={error}
        onSelectProject={handleAddRecommendedProject}
        targetRole={targetRole}
        loadingProject={loadingProject}
      />
    </Box>
  );
};

export default ProjectsSection;