import makeStylesWithTheme from '../styles/makeStylesAdapter';

export const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    minHeight: '100vh',
    background: '#f1f3f5',
    paddingTop: '100px',
  },
container: {
    display: 'flex',
    minHeight: 'calc(100vh - 100px)',
    position: 'relative',
  },
 mainContentWithSidebar: {
    marginLeft: '280px',
    transition: 'margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (max-width: 768px)': {
      marginLeft: '0',
    },
  },
    formColumn: {
    flex: 1,
    padding: '3rem 2rem',
    maxWidth: '600px',
    '@media (max-width: 768px)': {
      padding: '2rem 1rem',
    },
  },

 previewColumn: {
    flex: 1,
    padding: '3rem 2rem 3rem 1rem',
    position: 'sticky',
    top: '100px',
    height: 'calc(100vh - 100px)',
    overflowY: 'auto',
    '@media (max-width: 960px)': {
      display: 'none',
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
    fontSize: '2.5rem',
    fontWeight: 600,
    color: '#27286c',
    marginBottom: '0.5rem',
    letterSpacing: '-0.03em',
    lineHeight: 1.2,
  },
  paper: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px) saturate(180%)',
    // border: '1px solid rgba(39, 40, 108, 0.08)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 16px rgba(39, 40, 108, 0.08)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      boxShadow: '0 8px 32px rgba(39, 40, 108, 0.12)',
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
  sectionSubtitle: {
    fontSize: '1.125rem',
    color: '#233f94',
    fontWeight: 400,
    marginBottom: '3rem',
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
    marginTop: '3rem',
    gap: '1rem',
  },
  buttonNext: {
    background: 'linear-gradient(135deg, #27286c 0%, #233f94 100%)',
    color: '#fff',
    padding: '1rem 1.5rem',
    borderRadius: '16px',
    fontSize: '1rem',
    fontWeight: 500,
    boxShadow: '0 4px 12px rgba(39, 40, 108, 0.3)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 40px rgba(39, 40, 108, 0.4)',
    },
  },
  buttonBack: {
    background: 'rgba(0, 0, 0, 0.03)',
    // border: '1px solid rgba(39, 40, 108, 0.08)',
    color: '#233f94',
    padding: '1rem 1.5rem',
    borderRadius: '16px',
    fontSize: '1rem',
    fontWeight: 500,
    '&:hover': {
      background: 'rgba(39, 40, 108, 0.05)',
      transform: 'translateY(-2px)',
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

