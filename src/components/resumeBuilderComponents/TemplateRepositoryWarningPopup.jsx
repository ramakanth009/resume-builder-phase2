// TemplateRepositoryWarningPopup.jsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  useMediaQuery,
  useTheme,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  GitHub as GitHubIcon,
  Code as CodeIcon,
  CloudUpload as CloudUploadIcon,
  Link as LinkIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  dialogPaper: {
    borderRadius: '16px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    margin: '16px',
    overflow: 'hidden',
    '@media (max-width: 960px)': {
      margin: '8px',
      maxWidth: '95vw',
      maxHeight: '95vh',
    },
    '@media (max-width: 600px)': {
      margin: '4px',
      maxWidth: '98vw',
      maxHeight: '98vh',
      borderRadius: '12px',
    },
  },
  header: {
    background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
    color: 'white',
    padding: '24px',
    position: 'relative',
    textAlign: 'center',
    '@media (max-width: 960px)': {
      padding: '20px',
    },
    '@media (max-width: 600px)': {
      padding: '16px',
    },
  },
  closeButton: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    '@media (max-width: 600px)': {
      right: '8px',
      top: '8px',
      padding: '4px',
    },
  },
  warningIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    '@media (max-width: 960px)': {
      fontSize: '40px',
      marginBottom: '12px',
    },
    '@media (max-width: 600px)': {
      fontSize: '32px',
      marginBottom: '8px',
    },
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '8px',
    lineHeight: 1.2,
    '@media (max-width: 960px)': {
      fontSize: '24px',
    },
    '@media (max-width: 600px)': {
      fontSize: '20px',
      marginBottom: '4px',
    },
  },
  subtitle: {
    fontSize: '16px',
    opacity: 0.9,
    '@media (max-width: 960px)': {
      fontSize: '15px',
    },
    '@media (max-width: 600px)': {
      fontSize: '14px',
    },
  },
  content: {
    padding: '32px',
    maxHeight: '60vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
    },
    '@media (max-width: 960px)': {
      padding: '24px',
      maxHeight: '65vh',
    },
    '@media (max-width: 600px)': {
      padding: '16px',
      maxHeight: '70vh',
    },
  },
  errorAlert: {
    marginBottom: '24px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    '@media (max-width: 960px)': {
      marginBottom: '20px',
      fontSize: '15px',
    },
    '@media (max-width: 600px)': {
      marginBottom: '16px',
      fontSize: '14px',
    },
  },
  stepperContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '24px',
    '@media (max-width: 960px)': {
      padding: '20px',
    },
    '@media (max-width: 600px)': {
      padding: '16px',
      borderRadius: '8px',
    },
  },
  stepIcon: {
    marginRight: '12px',
    color: '#3b82f6',
    fontSize: '24px',
    '@media (max-width: 600px)': {
      marginRight: '8px',
      fontSize: '20px',
    },
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1f2937',
    marginBottom: '8px',
    '@media (max-width: 960px)': {
      fontSize: '17px',
    },
    '@media (max-width: 600px)': {
      fontSize: '16px',
      marginBottom: '6px',
    },
  },
  stepDescription: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: 1.5,
    '@media (max-width: 600px)': {
      fontSize: '13px',
    },
  },
  codeBlock: {
    backgroundColor: '#1f2937',
    color: '#f9fafb',
    padding: '16px',
    borderRadius: '8px',
    fontFamily: 'Monaco, "Cascadia Code", "Roboto Mono", monospace',
    fontSize: '14px',
    margin: '12px 0',
    wordBreak: 'break-all',
    '@media (max-width: 960px)': {
      padding: '12px',
      fontSize: '13px',
    },
    '@media (max-width: 600px)': {
      padding: '10px',
      fontSize: '12px',
      margin: '8px 0',
    },
  },
  noteBox: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    padding: '16px',
    borderRadius: '8px',
    marginTop: '24px',
    borderLeft: '4px solid #f59e0b',
    '@media (max-width: 960px)': {
      padding: '14px',
      marginTop: '20px',
    },
    '@media (max-width: 600px)': {
      padding: '12px',
      marginTop: '16px',
      fontSize: '14px',
    },
  },
  actions: {
    padding: '24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 960px)': {
      padding: '20px',
    },
    '@media (max-width: 600px)': {
      padding: '16px',
    },
  },
  understoodButton: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    padding: '12px 32px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
    },
    '@media (max-width: 960px)': {
      padding: '10px 28px',
      fontSize: '15px',
    },
    '@media (max-width: 600px)': {
      padding: '10px 24px',
      fontSize: '14px',
      width: '100%',
    },
  },
  mobileStepper: {
    '@media (max-width: 600px)': {
      '& .MuiStep-root': {
        paddingLeft: 0,
        paddingRight: 0,
      },
      '& .MuiStepLabel-root': {
        paddingLeft: '8px',
      },
      '& .MuiStepContent-root': {
        marginLeft: '20px',
        paddingLeft: '16px',
      },
    },
  },
}));

const TemplateRepositoryWarningPopup = ({ open, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = [
    {
      label: 'Access Template Repository',
      icon: <GitHubIcon />,
      description: 'Visit the provided Gigaversity repository',
    },
    {
      label: 'Clone & Setup Project',
      icon: <CodeIcon />,
      description: 'Download and set up the project locally',
      code: 'git clone [Gigaversity-repository-url]',
    },
    {
      label: 'Complete Implementation',
      icon: <CheckCircleIcon />,
      description: 'Follow the project guide and implement all features',
    },
    {
      label: 'Create Personal Repository',
      icon: <CloudUploadIcon />,
      description: 'Push your completed work to your GitHub account',
    },
    {
      label: 'Update Project Link',
      icon: <LinkIcon />,
      description: 'Replace the project link with your own repository URL',
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        className: classes.dialogPaper,
      }}
    >
      {/* Header */}
      <Box className={classes.header}>
        <IconButton
          className={classes.closeButton}
          onClick={onClose}
          size={isMobile ? 'small' : 'medium'}
        >
          <CloseIcon />
        </IconButton>
        
        <WarningIcon className={classes.warningIcon} />
        <Typography variant="h4" className={classes.title}>
          Gigavesity Repository Detected
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          Cannot proceed with Gigaversity template repository link
        </Typography>
      </Box>

      {/* Content */}
      <DialogContent className={classes.content}>
        <Alert severity="error" className={classes.errorAlert}>
          <strong>Cannot Proceed:</strong> You are using a Gigaversity template repository link.
        </Alert>

        <Box className={classes.stepperContainer}>
          <Typography variant="h6" sx={{ 
            marginBottom: '20px', 
            color: '#1f2937', 
            fontWeight: 600,
            fontSize: isMobile ? '18px' : '20px'
          }}>
            Required Steps:
          </Typography>

          <Stepper 
            orientation="vertical" 
            className={classes.mobileStepper}
            connector={null}
          >
            {steps.map((step, index) => (
              <Step key={index} active={true}>
                <StepLabel
                  StepIconComponent={() => (
                    <Box className={classes.stepIcon}>
                      {step.icon}
                    </Box>
                  )}
                >
                  <Typography className={classes.stepTitle}>
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography className={classes.stepDescription}>
                    {step.description}
                  </Typography>
                  {step.code && (
                    <Box className={classes.codeBlock}>
                      {step.code}
                    </Box>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>

          <Box className={classes.noteBox}>
            <Typography sx={{ fontWeight: 600, marginBottom: '8px' }}>
              <strong>Note:</strong>
            </Typography>
            <Typography>
              You must complete and host your own version of the project before proceeding.
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions className={classes.actions}>
        <Button
          onClick={onClose}
          className={classes.understoodButton}
          size="large"
        >
          I Understand
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TemplateRepositoryWarningPopup;