import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Box,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  recommendationsList: {
    maxHeight: '400px',
    overflow: 'auto',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
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
  modalTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  roleHighlight: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    padding: '2px 10px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  clickPrompt: {
    fontSize: '0.85rem',
    color: '#718096',
    fontStyle: 'italic',
    marginBottom: '1rem',
  }
}));

const ProjectRecommendationsModal = ({ 
  open, 
  onClose, 
  recommendations, 
  loading, 
  error, 
  onSelectProject,
  targetRole,
  loadingProject
}) => {
  const classes = useStyles();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box className={classes.modalTitle}>
          Recommended Projects
          {targetRole && (
            <Typography className={classes.roleHighlight}>
              {targetRole}
            </Typography>
          )}
        </Box>
      </DialogTitle>
      <DialogContent dividers>
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
        ) : recommendations.length > 0 ? (
          <List className={classes.recommendationsList}>
            {recommendations.map((project) => (
              <ListItem 
                key={project.project_key || project.id}
                className={classes.recommendationItem}
                disablePadding
              >
                <ListItemButton 
                  onClick={() => onSelectProject(project.project_key || project.id)}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectRecommendationsModal;