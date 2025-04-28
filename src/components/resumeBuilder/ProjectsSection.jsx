import React from 'react';
import { Box, Typography, TextField, Paper, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

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
}));

const ProjectsSection = ({ resumeData, setResumeData }) => {
  const classes = useStyles();

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
      // Add skills to responsibilities if applicable
      const existingDesc = updatedProjects[index].description || '';
      const existingResp = updatedProjects[index].responsibilities || [];
      
      // Only add skills to responsibilities if there are no responsibilities yet
      let updatedResp = existingResp;
      if (existingResp.length === 0 && skills) {
        updatedResp = [`Technologies used: ${skills}`];
      }
      
      updatedProjects[index] = {
        ...updatedProjects[index],
        skills_used: skills,
        technologies: skills.split(',').map(s => s.trim()),
        responsibilities: updatedResp,
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

  return (
    <Box className={classes.form}>
      <Typography variant="h6" className={classes.formSubtitle}>
        Projects
      </Typography>
      
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
            label="Summary"
            value={project.description}
            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            className={classes.textField}
            placeholder="Describe the project, your role, and accomplishments"
          />
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
    </Box>
  );
};

export default ProjectsSection;