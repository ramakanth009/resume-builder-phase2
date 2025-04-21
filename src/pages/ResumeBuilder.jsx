import React, { useState, useEffect } from 'react';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  IconButton,
  Divider,
  Chip,
  CircularProgress,
  Snackbar
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

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
  tabRoot: {
    minWidth: 'auto',
    marginRight: '1rem',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.875rem',
  },
  tabsRoot: {
    marginBottom: '1.5rem',
    borderBottom: '1px solid #e2e8f0',
  },
  tabSelected: {
    color: '#3182ce',
  },
  tabIndicator: {
    backgroundColor: '#3182ce',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  fieldGroup: {
    marginBottom: '1.5rem',
  },
  formSubtitle: {
    fontWeight: 500,
    marginBottom: '0.75rem',
    marginTop: '1rem',
    color: '#4a5568',
  },
  textField: {
    marginBottom: '1rem',
  },
  addButton: {
    marginTop: '1rem',
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    borderRadius: '8px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#bee3f8',
    },
  },
  deleteButton: {
    color: '#e53e3e',
    padding: '0.25rem',
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
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  chip: {
    backgroundColor: '#e6fffa',
    color: '#319795',
    borderRadius: '16px',
  },
  
  // Resume Preview Styles
  resumeContainer: {
    padding: '2rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    minHeight: '842px', // A4 height scaled down
    width: '100%',
    margin: '0 auto',
  },
  resumeHeader: {
    marginBottom: '1.5rem',
  },
  resumeName: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#2d3748',
  },
  resumeContact: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    color: '#4a5568',
  },
  resumeSection: {
    marginBottom: '1.5rem',
  },
  resumeSectionTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: '#2d3748',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '0.5rem',
  },
  resumeSummary: {
    color: '#4a5568',
    marginBottom: '1.5rem',
  },
  resumeEducation: {
    marginBottom: '1rem',
  },
  resumeSubtitle: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: '#2d3748',
  },
  resumeDate: {
    fontSize: '0.875rem',
    color: '#718096',
    fontStyle: 'italic',
  },
  resumeSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  resumeSkillChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    fontSize: '0.75rem',
    height: '24px',
  },
  resumeItem: {
    marginBottom: '1rem',
  },
  resumeItemSubtitle: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
  },
  resumeBullets: {
    paddingLeft: '1.25rem',
    margin: '0.5rem 0',
  },
  resumeBullet: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
  },
  loader: {
    marginLeft: '0.5rem',
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
  }
}));

// Utility Components
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ResumeBuilder = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  // State Definitions
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  const [resumeData, setResumeData] = useState({
    header: {
      name: '',
      email: '',
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
    skills: [],
    Academic_projects: [],
    certifications: [],
    work_experience: [],
    target_role: '',
  });

  // Effects
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Event Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setResumeData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setResumeData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Skill Handlers
  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  // Project Handlers
  const handleAddProject = () => {
    setResumeData({
      ...resumeData,
      Academic_projects: [
        ...resumeData.Academic_projects,
        {
          name: '',
          skills_used: '',
          description: '',
        },
      ],
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...resumeData.Academic_projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    
    setResumeData({
      ...resumeData,
      Academic_projects: updatedProjects,
    });
  };

  const handleRemoveProject = (index) => {
    setResumeData({
      ...resumeData,
      Academic_projects: resumeData.Academic_projects.filter((_, i) => i !== index),
    });
  };

  // Experience Handlers
  const handleAddWorkExperience = () => {
    setResumeData({
      ...resumeData,
      work_experience: [
        ...resumeData.work_experience,
        {
          position: '',
          company_name: '',
          duration: '',
          description: '',
        },
      ],
    });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...resumeData.work_experience];
    updatedWorkExperience[index] = {
      ...updatedWorkExperience[index],
      [field]: value,
    };
    
    setResumeData({
      ...resumeData,
      work_experience: updatedWorkExperience,
    });
  };

  const handleRemoveWorkExperience = (index) => {
    setResumeData({
      ...resumeData,
      work_experience: resumeData.work_experience.filter((_, i) => i !== index),
    });
  };

  // Certification Handlers
  const handleAddCertification = () => {
    if (newCertification.trim() !== '' && !resumeData.certifications.includes(newCertification.trim())) {
      setResumeData({
        ...resumeData,
        certifications: [...resumeData.certifications, newCertification.trim()],
      });
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (certToRemove) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter(cert => cert !== certToRemove),
    });
  };

  // API Handlers
  const handleGenerateResume = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      const response = await fetch('/generate_resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(resumeData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Resume generated successfully!',
          severity: 'success',
        });
        
        // Here you would typically handle the generated resume data
        console.log('Generated resume:', data.resume);
        
        // Redirect to view the resume or show it in the preview
        // navigate(`/resume/${data.resume.id}`);
      } else {
        setSnackbar({
          open: true,
          message: data.message || 'Failed to generate resume. Please check your input.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      setSnackbar({
        open: true,
        message: 'An error occurred. Please try again later.',
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

  return (
    <Container className={classes.root} maxWidth="xl">
      <Box className={classes.mainContainer}>
        {/* Left Column - Form Inputs */}
        <Box className={`${classes.columnBox} ${classes.formColumn}`}>
          <Typography variant="h5" className={classes.sectionTitle}>
            Build Your Resume
            <Button
              variant="contained"
              className={classes.saveButton}
              startIcon={<SaveIcon />}
              onClick={handleGenerateResume}
              disabled={loading}
            >
              Generate Resume
              {loading && <CircularProgress size={20} className={classes.loader} />}
            </Button>
          </Typography>
          
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className={classes.tabsRoot}
            TabIndicatorProps={{
              className: classes.tabIndicator,
            }}
          >
            <Tab 
              label="Personal Info" 
              classes={{ 
                root: classes.tabRoot,
                selected: classes.tabSelected,
              }}
            />
            <Tab 
              label="Education" 
              classes={{ 
                root: classes.tabRoot,
                selected: classes.tabSelected,
              }}
            />
            <Tab 
              label="Skills" 
              classes={{ 
                root: classes.tabRoot,
                selected: classes.tabSelected,
              }}
            />
            <Tab 
              label="Projects" 
              classes={{ 
                root: classes.tabRoot,
                selected: classes.tabSelected,
              }}
            />
            <Tab 
              label="Experience" 
              classes={{ 
                root: classes.tabRoot,
                selected: classes.tabSelected,
              }}
            />
          </Tabs>
          
          {/* Personal Information */}
          <TabPanel value={activeTab} index={0}>
            <Box className={classes.form}>
              <TextField
                label="Full Name"
                name="header.name"
                value={resumeData.header.name}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
              />
              
              <TextField
                label="Email"
                name="header.email"
                value={resumeData.header.email}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
              />
              
              <TextField
                label="Phone"
                name="header.phone"
                value={resumeData.header.phone}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
              />
              
              <TextField
                label="GitHub URL"
                name="header.github"
                value={resumeData.header.github}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
              />
              
              <TextField
                label="LinkedIn URL"
                name="header.linkedin"
                value={resumeData.header.linkedin}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
              />
              
              <TextField
                label="Portfolio URL"
                name="header.portfolio"
                value={resumeData.header.portfolio}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
              />
              
              <TextField
                label="Target Role"
                name="target_role"
                value={resumeData.target_role}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
              />
              
              <TextField
                label="Professional Summary"
                name="summary"
                value={resumeData.summary}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                placeholder="A brief summary of your professional background and career goals..."
                className={classes.textField}
              />
            </Box>
          </TabPanel>
          
          {/* Skills */}
          <TabPanel value={activeTab} index={2}>
            <Box className={classes.form}>
              <Box className={classes.chipContainer}>
                {resumeData.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    className={classes.chip}
                    onDelete={() => handleRemoveSkill(skill)}
                  />
                ))}
              </Box>
              
              <Box className={classes.formRow}>
                <TextField
                  label="Add Skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  variant="outlined"
                  fullWidth
                  placeholder="e.g., React.js"
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddSkill}
                  className={classes.addButton}
                >
                  Add
                </Button>
              </Box>
              
              <Divider style={{ margin: '2rem 0 1rem' }} />
              
              <Typography variant="h6" className={classes.formSubtitle}>
                Certifications
              </Typography>
              
              <Box className={classes.chipContainer}>
                {resumeData.certifications.map((cert, index) => (
                    <Chip
                    key={index}
                    label={cert}
                    className={classes.chip}
                    onDelete={() => handleRemoveCertification(cert)}
                  />
                ))}
              </Box>
              
              <Box className={classes.formRow}>
                <TextField
                  label="Add Certification"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  variant="outlined"
                  fullWidth
                  placeholder="e.g., AWS Certified Developer"
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddCertification}
                  className={classes.addButton}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </TabPanel>
          
          {/* Projects */}
          <TabPanel value={activeTab} index={3}>
            <Box className={classes.form}>
              {resumeData.Academic_projects.map((project, index) => (
                <Paper key={index} className={classes.paper}>
                  <Box className={classes.sectionTitle}>
                    <Typography variant="h6">Project {index + 1}</Typography>
                    <IconButton
                      className={classes.deleteButton}
                      onClick={() => handleRemoveProject(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  
                  <TextField
                    label="Project Name"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                  
                  <TextField
                    label="Skills Used"
                    value={project.skills_used}
                    onChange={(e) => handleProjectChange(index, 'skills_used', e.target.value)}
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                  
                  <TextField
                    label="Description"
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
          </TabPanel>
          
          {/* Work Experience */}
          <TabPanel value={activeTab} index={4}>
            <Box className={classes.form}>
              {resumeData.work_experience.map((experience, index) => (
                <Paper key={index} className={classes.paper}>
                  <Box className={classes.sectionTitle}>
                    <Typography variant="h6">Experience {index + 1}</Typography>
                    <IconButton
                      className={classes.deleteButton}
                      onClick={() => handleRemoveWorkExperience(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  
                  <TextField
                    label="Position"
                    value={experience.position}
                    onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                  
                  <TextField
                    label="Company Name"
                    value={experience.company_name}
                    onChange={(e) => handleWorkExperienceChange(index, 'company_name', e.target.value)}
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                  
                  <TextField
                    label="Duration"
                    value={experience.duration}
                    onChange={(e) => handleWorkExperienceChange(index, 'duration', e.target.value)}
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    placeholder="e.g., June 2021 - Present"
                  />
                  
                  <TextField
                    label="Description"
                    value={experience.description}
                    onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    className={classes.textField}
                    placeholder="Describe your responsibilities and achievements"
                  />
                </Paper>
              ))}
              
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddWorkExperience}
                className={classes.addButton}
                fullWidth
              >
                Add Work Experience
              </Button>
            </Box>
          </TabPanel>
        </Box>
          
          {/* Education */}
          <TabPanel value={activeTab} index={1}>
            <Box className={classes.form}>
              <TextField
                label="Degree"
                name="education.degree"
                value={resumeData.education.degree}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
                placeholder="e.g., Bachelor of Science"
              />
              
              <TextField
                label="Specialization"
                name="education.specialization"
                value={resumeData.education.specialization}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
                placeholder="e.g., Computer Science"
              />
              
              <TextField
                label="Institution"
                name="education.institution"
                value={resumeData.education.institution}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
                placeholder="e.g., Stanford University"
              />
              
              <TextField
                label="Graduation Year"
                name="education.graduation_year"
                value={resumeData.education.graduation_year}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                className={classes.textField}
                placeholder="e.g., 2023"
              />
            </Box>
          </TabPanel>
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