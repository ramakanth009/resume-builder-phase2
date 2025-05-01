// import React from 'react';
// import { Box, Typography, TextField, Paper, IconButton, Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import makeStylesWithTheme from '../../styles/makeStylesAdapter';

// const useStyles = makeStylesWithTheme((theme) => ({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//   },
//   textField: {
//     '& .MuiOutlinedInput-root': {
//       borderRadius: '8px',
//     },
//     marginBottom: '1rem',
//   },
//   formSubtitle: {
//     fontWeight: 500,
//     marginBottom: '0.75rem',
//     marginTop: '1rem',
//     color: '#4a5568',
//   },
//   paper: {
//     padding: '1.5rem',
//     marginBottom: '1.5rem',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
//     position: 'relative',
//   },
//   sectionTitle: {
//     fontWeight: 600,
//     marginBottom: '1rem',
//     color: '#2d3748',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   deleteButton: {
//     color: '#e53e3e',
//     position: 'absolute',
//     top: '1rem',
//     right: '1rem',
//   },
//   addButton: {
//     backgroundColor: '#ebf8ff',
//     color: '#3182ce',
//     borderRadius: '8px',
//     textTransform: 'none',
//     marginTop: '1rem',
//     '&:hover': {
//       backgroundColor: '#bee3f8',
//     },
//   },
//   helperText: {
//     marginTop: '-0.5rem',
//     marginBottom: '1rem',
//     color: '#718096',
//     fontSize: '0.75rem',
//   }
// }));

// const ProjectsSection = ({ resumeData, setResumeData }) => {
//   const classes = useStyles();

//   const handleAddProject = () => {
//     setResumeData({
//       ...resumeData,
//       projects: [
//         ...resumeData.projects,
//         {
//           name: '',
//           skills_used: '',
//           description: '',
//           responsibilities: [],
//           link: '',
//         },
//       ],
//     });
//   };

//   const handleProjectChange = (index, field, value) => {
//     const updatedProjects = [...resumeData.projects];
    
//     if (field === 'description') {
//       // Convert description text to responsibilities array
//       const responsibilities = value.split('\n').filter(item => item.trim());
      
//       updatedProjects[index] = {
//         ...updatedProjects[index],
//         responsibilities: responsibilities,
//         description: value,
//       };
//     } else if (field === 'skills_used') {
//       // Handle both fields for technologies/skills
//       const skills = value;
      
//       updatedProjects[index] = {
//         ...updatedProjects[index],
//         skills_used: skills,
//         technologies: skills.split(',').map(s => s.trim()),
//         [field]: value,
//       };
//     } else {
//       updatedProjects[index] = {
//         ...updatedProjects[index],
//         [field]: value,
//       };
//     }
    
//     setResumeData({
//       ...resumeData,
//       projects: updatedProjects,
//     });
//   };

//   const handleRemoveProject = (index) => {
//     // Don't remove if it's the only project and it's empty
//     if (resumeData.projects.length === 1 && 
//         !resumeData.projects[0].name && 
//         !resumeData.projects[0].skills_used && 
//         !resumeData.projects[0].description) {
//       return;
//     }
    
//     setResumeData({
//       ...resumeData,
//       projects: resumeData.projects.filter((_, i) => i !== index),
//     });
    
//     // If we just removed all projects, add an empty one
//     if (resumeData.projects.length === 1) {
//       setResumeData(prev => ({
//         ...prev,
//         projects: [{
//           name: '',
//           skills_used: '',
//           description: '',
//           responsibilities: [],
//           link: '',
//         }]
//       }));
//     }
//   };

//   return (
//     <Box className={classes.form}>
//       <Typography variant="h6" className={classes.formSubtitle}>
//         Projects
//       </Typography>
      
//       {resumeData.projects.map((project, index) => (
//         <Paper key={index} className={classes.paper}>
//           <Box className={classes.sectionTitle}>
//             <Typography variant="h6">Project {index + 1}</Typography>
//           </Box>
          
//           <IconButton
//             className={classes.deleteButton}
//             onClick={() => handleRemoveProject(index)}
//           >
//             <DeleteIcon />
//           </IconButton>
          
//           <TextField
//             label="Project Name"
//             value={project.name}
//             onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
//             variant="outlined"
//             fullWidth
//             className={classes.textField}
//             required
//           />
          
//           <TextField
//             label="Skills Used"
//             value={project.skills_used}
//             onChange={(e) => handleProjectChange(index, 'skills_used', e.target.value)}
//             variant="outlined"
//             fullWidth
//             className={classes.textField}
//             placeholder="e.g., React, Node.js, MongoDB"
//             required
//           />
          
//           <TextField
//             label="Project Link (Optional)"
//             value={project.link || ''}
//             onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
//             variant="outlined"
//             fullWidth
//             className={classes.textField}
//             placeholder="e.g., https://github.com/yourusername/project"
//           />
          
//           <TextField
//             label="Description (One per line)"
//             value={project.description}
//             onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={3}
//             className={classes.textField}
//             placeholder="Enter project details, one per line"
//             required
//           />
//           <Typography className={classes.helperText}>
//             Each line will be converted into a bullet point on your resume
//           </Typography>
//         </Paper>
//       ))}
      
//       <Button
//         variant="contained"
//         startIcon={<AddIcon />}
//         onClick={handleAddProject}
//         className={classes.addButton}
//         fullWidth
//       >
//         Add Project
//       </Button>
//     </Box>
//   );
// };

// export default ProjectsSection;
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Paper, 
  IconButton, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { getProjectRecommendations, getProjectDetails } from '../../utils/api';

// Extended styles
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
    marginBottom: '1rem',
  },
  formSubtitle: {
    fontWeight: 500,
    marginBottom: '0.75rem',
    marginTop: '1rem',
    color: '#4a5568',
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
  
  // New styles for recommended projects
  recommendationsSection: {
    marginTop: '2rem',
    marginBottom: '1.5rem',
  },
  recommendationsList: {
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    marginTop: '0.5rem',
    maxHeight: '400px',
    overflow: 'auto',
  },
  recommendationItem: {
    borderBottom: '1px solid #e2e8f0',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  recommendationTitle: {
    fontWeight: 600,
    color: '#3182ce',
  },
  recommendationChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    fontSize: '0.7rem',
    marginRight: '0.5rem',
    marginTop: '0.5rem',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1.5rem',
  },
  recommendationsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recommendedPill: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  clickPrompt: {
    fontSize: '0.85rem',
    color: '#718096',
    fontStyle: 'italic',
    marginTop: '0.5rem',
    marginBottom: '1rem',
  },
}));

const ProjectsSection = ({ resumeData, setResumeData, targetRole }) => {
  const classes = useStyles();
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingProject, setLoadingProject] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch recommended projects when target role changes
  useEffect(() => {
    const fetchRecommendedProjects = async () => {
      if (!targetRole) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await getProjectRecommendations(targetRole);
        if (response.status === 'success') {
          setRecommendedProjects(response.projects || []);
        } else {
          setError(response.message || 'Failed to fetch recommended projects');
        }
      } catch (error) {
        console.error('Error fetching project recommendations:', error);
        setError(error.message || 'An error occurred while fetching recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProjects();
  }, [targetRole]);

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

  // New handler for adding a recommended project
  const handleAddRecommendedProject = async (projectKey) => {
    setLoadingProject(true);
    setSuccessMessage('');
    setError(null);
    
    try {
      const response = await getProjectDetails(projectKey);
      
      if (response.status === 'success' && response.project) {
        const projectDetails = response.project;
        
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
        
        // Add the project to the existing projects
        setResumeData(prev => ({
          ...prev,
          projects: [...prev.projects, newProject],
        }));
        
        setSuccessMessage(`Added "${projectDetails.name}" to your projects!`);
        
        // Scroll to the bottom of the form to show the new project
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      } else {
        setError(response.message || 'Failed to retrieve project details');
      }
    } catch (error) {
      console.error('Error adding recommended project:', error);
      setError(error.message || 'An error occurred while adding the project');
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

  return (
    <Box className={classes.form}>
      <Typography variant="h6" className={classes.formSubtitle}>
        Projects
      </Typography>
      
      {/* Success message */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      
      {/* Project forms */}
      {resumeData.projects.map((project, index) => (
        <Paper key={index} className={classes.paper}>
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
          
          <TextField
            label="Project Link (Optional)"
            value={project.link || ''}
            onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
            variant="outlined"
            fullWidth
            className={classes.textField}
            placeholder="e.g., https://github.com/yourusername/project"
          />
          
          <TextField
            label="Description (One per line)"
            value={project.description}
            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            className={classes.textField}
            placeholder="Enter project details, one per line"
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
      
      {/* Recommended Projects Section */}
      {targetRole && (
        <Box className={classes.recommendationsSection}>
          <Divider sx={{ my: 3 }} />
          
          <Box className={classes.recommendationsHeader}>
            <Typography variant="h6" className={classes.formSubtitle}>
              Recommended Projects
            </Typography>
            {targetRole && (
              <Typography className={classes.recommendedPill}>
                {targetRole}
              </Typography>
            )}
          </Box>
          
          <Typography className={classes.clickPrompt}>
            Click on a project to add it to your resume
          </Typography>
          
          {/* Error message */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {loading ? (
            <Box className={classes.loadingContainer}>
              <CircularProgress size={30} />
            </Box>
          ) : recommendedProjects.length > 0 ? (
            <List className={classes.recommendationsList}>
              {recommendedProjects.map((project) => (
                <ListItem 
                  key={project.project_key || project.id}
                  className={classes.recommendationItem}
                  disablePadding
                >
                  <ListItemButton 
                    onClick={() => handleAddRecommendedProject(project.project_key || project.id)}
                    disabled={loadingProject}
                  >
                    <ListItemText
                      primary={
                        <Typography className={classes.recommendationTitle}>
                          {project.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            {project.description}
                          </Typography>
                          {project.skills_used && (
                            <Box mt={1}>
                              {project.skills_used.split(',').map((skill, idx) => (
                                <Chip
                                  key={idx}
                                  label={skill.trim()}
                                  className={classes.recommendationChip}
                                  size="small"
                                />
                              ))}
                            </Box>
                          )}
                        </>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Alert severity="info">
              No project recommendations available for {targetRole}.
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ProjectsSection;