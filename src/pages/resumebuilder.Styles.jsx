import makeStylesWithTheme from '../styles/makeStylesAdapter';

export const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    minHeight: '100vh',
    padding: '2rem 0',
    backgroundColor: '#F8F9FC',
    '@media (max-width: 600px)': {
      padding: '1rem 0',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem 0',
    },
  },
  container: {
    height: '100%',
  },
  mainContentWithSidebar: {
  marginLeft: '220px', // Match the sidebar width
  width: 'calc(100% - 220px)',
  transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
  '@media (max-width: 960px)': {
    marginLeft: '180px', // Match tablet sidebar width
    width: 'calc(100% - 180px)',
  },
  '@media (max-width: 600px)': {
    marginLeft: '64px', // Match mobile sidebar width
    width: 'calc(100% - 64px)',
  },
},
  formColumn: {
  padding: '1rem',
  height: '100%',
  minHeight: '80vh',
  maxHeight: '100%',
  borderRight: {
    xs: 'none',
    md: '1px solid #e2e8f0'
  },
  '@media (max-width: 600px)': {
    padding: '0.75rem',
  },
  '@media (max-width: 480px)': {
    padding: '0.5rem',
  },
},

previewColumn: {
  padding: '1rem',
  height: '100%',
  minHeight: '80vh',
  maxHeight: '100%',
  '@media (max-width: 960px)': {
    display: 'none', // Hide preview on tablets and mobile
  },
},
  previewNotice: {
    display: 'none', // Hidden by default (on desktop)
    '@media (max-width: 960px)': {
      display: 'flex', // Show on tablets and mobile
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      margin: '1.5rem 0',
      backgroundColor: '#ebf8ff',
      color: '#3182ce',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    },
    '@media (max-width: 480px)': {
      padding: '0.75rem',
      margin: '1rem 0',
      fontSize: '0.85rem',
    },
  },
  noticeIcon: {
    marginRight: '0.5rem',
    '@media (max-width: 480px)': {
      fontSize: '1.2rem',
    },
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '0.8rem',
    fontWeight: 600,
    color: '#2d3748',
    fontSize: '1.5rem',
    '@media (max-width: 1200px)': {
      fontSize: '1.4rem',
      marginBottom: '1.25rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.3rem',
      marginBottom: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    },
  },
  paper: {
    padding: '1.5rem',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    '@media (max-width: 600px)': {
      padding: '1.25rem',
      marginBottom: '1.25rem',
    },
    '@media (max-width: 480px)': {
      padding: '1rem',
      marginBottom: '1rem',
    },
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 480px)': {
      fontSize: '1rem',
      marginBottom: '0.75rem',
    },
  },
  saveButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '@media (max-width: 600px)': {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.4rem 0.8rem',
      fontSize: '0.85rem',
    },
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
    '@media (max-width: 600px)': {
      marginTop: '1.5rem',
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  buttonNext: {
    backgroundColor: '#3182ce',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '@media (max-width: 600px)': {
      padding: '0.5rem 1rem',
      width: '100%',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.4rem 0.8rem',
      fontSize: '0.85rem',
    },
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
    '@media (max-width: 600px)': {
      padding: '0.5rem 1rem',
      width: '100%',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.4rem 0.8rem',
      fontSize: '0.85rem',
    },
    '&:hover': {
      backgroundColor: '#f7fafc',
    },
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row', // Default side-by-side on desktop
    '@media (max-width: 960px)': {
      flexDirection: 'column', // Stack vertically on tablets and mobile
    },
  },
columnBox: {
  flex: 1,
  width: '50%', // Default 50% on desktop
  '@media (max-width: 960px)': {
    width: '100%', // Full width on tablets and mobile
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
    '@media (max-width: 600px)': {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      marginLeft: '0.5rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.4rem 0.8rem',
      fontSize: '0.85rem',
      marginLeft: '0.25rem',
    },
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
    '@media (max-width: 600px)': {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      marginLeft: '0.5rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.4rem 0.8rem',
      fontSize: '0.85rem',
      marginLeft: '0.25rem',
    },
    '&:hover': {
      backgroundColor: '#6b46c1',
    },
  },
  disabledButton: {
    backgroundColor: '#a0aec0 !important',
    color: 'white !important',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    '@media (max-width: 600px)': {
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '0.5rem',
    },
  },
  viewModeToggle: {
    display: 'flex',
    marginBottom: '1rem',
    justifyContent: 'center',
    gap: '1rem',
    '@media (max-width: 960px)': {
      display: 'none', // Hide on tablets and mobile since preview is hidden
    },
  },
  editModeButton: {
    backgroundColor: '#805ad5',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '@media (max-width: 600px)': {
      padding: '0.4rem 1rem',
      fontSize: '0.9rem',
    },
    '&:hover': {
      backgroundColor: '#6b46c1',
    },
  },
  previewModeButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '@media (max-width: 600px)': {
      padding: '0.4rem 1rem',
      fontSize: '0.9rem',
    },
    '&:hover': {
      backgroundColor: '#3182ce',
    },
  },
  activeModeButton: {
    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
  },
  resumeIdText: {
    fontSize: '0.875rem',
    color: '#718096',
    marginBottom: '1rem',
    textAlign: 'center',
    fontStyle: 'italic',
    '@media (max-width: 480px)': {
      fontSize: '0.8rem',
    },
  },
  templateSelectorWrapper: {
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  templateActionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem',
    gap: '1rem',
    '@media (max-width: 600px)': {
      justifyContent: 'center',
    },
  },
  templateDialog: {
    '& .MuiDialog-paper': {
      maxWidth: '1000px',
      width: '90%',
      '@media (max-width: 600px)': {
        width: '95%',
      },
    },
  },
  templateButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    '@media (max-width: 600px)': {
      justifyContent: 'center',
    },
  },
  previewWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  previewContent: {
    flex: 1,
    overflow: 'auto',
  },
  // New styles for mobile generated preview
  mobilePreviewContainer: {
    display: 'none', // Hidden by default
    '@media (max-width: 960px)': {
      display: 'block', // Show only on mobile/tablet when in preview mode
      marginTop: '2rem',
    },
  },
  mobilePreviewHeader: {
    textAlign: 'center',
    marginBottom: '1rem',
    padding: '0.75rem',
    backgroundColor: '#ebf8ff',
    borderRadius: '8px',
    color: '#3182ce',
    fontWeight: 600,
    '@media (max-width: 480px)': {
      fontSize: '1rem',
      padding: '0.5rem',
    },
  },
  mobileResumePreview: {
    padding: '1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    overflowX: 'auto',
    '@media (max-width: 480px)': {
      padding: '0.75rem',
    },
  },
  mobileViewToggle: {
    display: 'none', // Hidden by default
    '@media (max-width: 960px)': {
      display: 'flex', // Show on mobile/tablet
      justifyContent: 'center',
      marginTop: '1.5rem',
      gap: '1rem',
    },
    '@media (max-width: 480px)': {
      marginTop: '1rem',
    },
  },
}));

