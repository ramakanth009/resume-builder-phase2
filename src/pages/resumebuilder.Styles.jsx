import makeStylesWithTheme from '../styles/makeStylesAdapter';

export const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    minHeight: '100vh',
    background: '#f1f3f5',
    paddingTop: '100px',
    '@media (max-width: 960px)': {
      paddingTop: '90px',
    },
    '@media (max-width: 600px)': {
      paddingTop: '80px',
    },
  },
  container: {
    display: 'flex',
    minHeight: 'calc(100vh - 100px)',
    position: 'relative',
    '@media (max-width: 960px)': {
      minHeight: 'calc(100vh - 90px)',
    },
    '@media (max-width: 600px)': {
      minHeight: 'calc(100vh - 80px)',
    },
  },
  mainContentWithSidebar: {
    marginLeft: '220px',
    transition: 'margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (max-width: 1200px)': {
      marginLeft: '240px',
    },
    '@media (max-width: 960px)': {
      marginLeft: '0',
    },
    '@media (max-width: 768px)': {
      marginLeft: '0',
    },
  },
  subheading: {
    borderBottom: '1px solid #eee',
    paddingBottom: '0.5rem',
    marginBottom: '1rem',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      paddingBottom: '0.4rem',
      marginBottom: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.85rem',
    },
  },
  formColumn: {
    flex: 1,
    padding: '0rem 1rem 0rem 0rem',
    maxWidth: '510px',
    '@media (max-width: 1200px)': {
      padding: '1rem 0.8rem',
      maxWidth: '550px',
    },
    '@media (max-width: 960px)': {
      maxWidth: '100%',
      padding: '1rem',
    },
    '@media (max-width: 768px)': {
      padding: '2rem 1rem',
    },
    '@media (max-width: 600px)': {
      padding: '1.5rem 0.8rem',
    },
    '@media (max-width: 480px)': {
      padding: '1rem 0.5rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.8rem 0.4rem',
    },
  },
  previewColumn: {
    flex: 1,
    // padding: '1rem 2rem 3rem 1rem',
    position: 'sticky',
    top: '100px',
    borderRadius: '16px',
    height: 'calc(120vh - 100px)',
    '@media (max-width: 1200px)': {
      padding: '1rem 1.5rem 3rem 0.8rem',
      top: '90px',
      height: 'calc(100vh - 90px)',
    },
    '@media (max-width: 960px)': {
      display: 'none', // Hide on tablets and mobile - replaced by mobile preview
    },
  },
  previewNotice: {
    display: 'none',
    '@media (max-width: 960px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      margin: '1.5rem 0',
      backgroundColor: '#ebf8ff',
      color: '#3182ce',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    },
    '@media (max-width: 600px)': {
      padding: '0.8rem',
      margin: '1.2rem 0',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.75rem',
      margin: '1rem 0',
      fontSize: '0.85rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.6rem',
      margin: '0.8rem 0',
      fontSize: '0.8rem',
    },
  },
  noticeIcon: {
    marginRight: '0.5rem',
    '@media (max-width: 600px)': {
      fontSize: '1.3rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.1rem',
    },
  },
  sectionHeader: {
    fontSize: '2.5rem',
    fontWeight: 600,
    color: '#27286c',
    marginBottom: '0.5rem',
    letterSpacing: '-0.03em',
    lineHeight: 1.2,
    '@media (max-width: 1200px)': {
      fontSize: '2.2rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '2rem',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.6rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1.4rem',
    },
  },
  paper: {
    background: 'transparent',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: 'none',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      boxShadow: '0 4px 6px rgba(39, 40, 108, 0.05)',
    },
    '@media (max-width: 1200px)': {
      padding: '1.8rem',
    },
    '@media (max-width: 960px)': {
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '1.2rem',
      marginBottom: '1.2rem',
      borderRadius: '12px',
    },
    '@media (max-width: 480px)': {
      padding: '1rem',
      marginBottom: '1rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.8rem',
      marginBottom: '0.8rem',
    },
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2d3748',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 600px)': {
      fontSize: '1rem',
      marginBottom: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.95rem',
      marginBottom: '0.75rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.9rem',
    },
  },
  sectionSubtitle: {
    fontSize: '1.125rem',
    color: '#233f94',
    fontWeight: 400,
    marginBottom: '3rem',
    '@media (max-width: 960px)': {
      fontSize: '1rem',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.95rem',
      marginBottom: '1.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
      marginBottom: '1.2rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.85rem',
      marginBottom: '1rem',
    },
  },
  saveButton: {
    backgroundColor: '#3182ce',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '@media (max-width: 1200px)': {
      padding: '0.5rem 1.3rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.4rem 0.8rem',
      fontSize: '0.85rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.4rem 0.7rem',
      fontSize: '0.8rem',
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
    '@media (max-width: 960px)': {
      marginTop: '2.5rem',
    },
    '@media (max-width: 600px)': {
      marginTop: '2rem',
      gap: '0.8rem',
    },
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '0.8rem',
    },
    '@media (max-width: 375px)': {
      marginTop: '1.5rem',
      gap: '0.6rem',
    },
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
    '@media (max-width: 1200px)': {
      padding: '0.9rem 1.3rem',
      fontSize: '0.95rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.8rem 1.2rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.8rem 1rem',
      fontSize: '0.9rem',
      width: '100%',
    },
    '@media (max-width: 375px)': {
      padding: '0.7rem 0.9rem',
      fontSize: '0.85rem',
    },
  },
  buttonBack: {
    background: 'rgba(0, 0, 0, 0.03)',
    color: '#233f94',
    padding: '1rem 1.5rem',
    borderRadius: '16px',
    fontSize: '1rem',
    fontWeight: 500,
    '&:hover': {
      background: 'rgba(39, 40, 108, 0.05)',
      transform: 'translateY(-2px)',
    },
    '@media (max-width: 1200px)': {
      padding: '0.9rem 1.3rem',
      fontSize: '0.95rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.8rem 1.2rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.8rem 1rem',
      fontSize: '0.9rem',
      width: '100%',
    },
    '@media (max-width: 375px)': {
      padding: '0.7rem 0.9rem',
      fontSize: '0.85rem',
    },
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 960px)': {
      flexDirection: 'column', // Stack vertically on tablets and mobile
    },
  },
  columnBox: {
    flex: 1,
    width: '50%',
    '@media (max-width: 1200px)': {
      width: '50%', // Still side by side on large tablets
    },
    '@media (max-width: 960px)': {
      width: '100%', // Full width when stacked
    },
  },
  loader: {
    marginLeft: '0.5rem',
    color: 'white',
    '@media (max-width: 480px)': {
      marginLeft: '0.3rem',
    },
  },
  stepLabel: {
    cursor: 'pointer',
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.85rem',
    },
  },
  downloadButton: {
    backgroundColor: '#38a169',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    marginLeft: '1rem',
    '&:hover': {
      backgroundColor: '#2f855a',
    },
    '@media (max-width: 1200px)': {
      padding: '0.5rem 1.3rem',
      fontSize: '0.95rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      marginLeft: '0.5rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.4rem 0.8rem',
      fontSize: '0.85rem',
      marginLeft: '0.25rem',
      width: '100%',
      marginTop: '0.5rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.4rem 0.7rem',
      fontSize: '0.8rem',
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
    '&:hover': {
      backgroundColor: '#6b46c1',
    },
    '@media (max-width: 1200px)': {
      padding: '0.5rem 1.3rem',
      fontSize: '0.95rem',
    },
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
    '@media (max-width: 375px)': {
      padding: '0.4rem 0.7rem',
      fontSize: '0.8rem',
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
    '@media (max-width: 960px)': {
      justifyContent: 'center',
    },
    '@media (max-width: 600px)': {
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '0.5rem',
    },
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '0.5rem',
    },
  },
  viewModeToggle: {
    display: 'flex',
    marginBottom: '1rem',
    justifyContent: 'center',
    gap: '1rem',
    '@media (max-width: 960px)': {
      display: 'none', // Hide on tablets and mobile since preview behavior changes
    },
  },
  editModeButton: {
    backgroundColor: '#805ad5',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#6b46c1',
    },
    '@media (max-width: 1200px)': {
      padding: '0.4rem 1.2rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.4rem 1rem',
      fontSize: '0.9rem',
    },
  },
  previewModeButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.5rem 1.5rem',
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: '#3182ce',
    },
    '@media (max-width: 1200px)': {
      padding: '0.4rem 1.2rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      padding: '0.4rem 1rem',
      fontSize: '0.9rem',
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
    '@media (max-width: 600px)': {
      fontSize: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.75rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.7rem',
    },
  },
  templateSelectorWrapper: {
    marginTop: '1rem',
    marginBottom: '2rem',
    '@media (max-width: 600px)': {
      marginTop: '0.8rem',
      marginBottom: '1.5rem',
    },
    '@media (max-width: 480px)': {
      marginTop: '0.6rem',
      marginBottom: '1.2rem',
    },
  },
  templateActionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem',
    gap: '1rem',
    '@media (max-width: 960px)': {
      justifyContent: 'center',
    },
    '@media (max-width: 600px)': {
      justifyContent: 'center',
      gap: '0.8rem',
    },
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      gap: '0.6rem',
    },
  },
  templateDialog: {
    '& .MuiDialog-paper': {
      maxWidth: '1000px',
      width: '90%',
      '@media (max-width: 1200px)': {
        width: '95%',
      },
      '@media (max-width: 960px)': {
        width: '95%',
        margin: '1rem',
      },
      '@media (max-width: 600px)': {
        width: '95%',
        margin: '0.5rem',
      },
      '@media (max-width: 480px)': {
        width: '98%',
        margin: '0.25rem',
      },
      '@media (max-width: 375px)': {
        width: '100%',
        margin: '0',
      },
    },
  },
  templateButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
    '@media (max-width: 960px)': {
      justifyContent: 'center',
    },
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
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(39, 40, 108, 0.2)',
      borderRadius: '3px',
    },
  },
  // Mobile preview container - appears below form on mobile/tablet
  mobilePreviewContainer: {
    display: 'none',
    '@media (max-width: 960px)': {
      display: 'block',
      marginTop: '2rem',
      order: 2, // Ensures it appears after the form
    },
    '@media (max-width: 600px)': {
      marginTop: '1.5rem',
    },
    '@media (max-width: 480px)': {
      marginTop: '1.2rem',
    },
    '@media (max-width: 375px)': {
      marginTop: '1rem',
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
    '@media (max-width: 600px)': {
      fontSize: '1rem',
      padding: '0.6rem',
      marginBottom: '0.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.95rem',
      padding: '0.5rem',
      marginBottom: '0.7rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.9rem',
      padding: '0.4rem',
      marginBottom: '0.6rem',
    },
  },
  mobileResumePreview: {
    padding: '1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    '@media (max-width: 600px)': {
      padding: '0.8rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.75rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.6rem',
    },
  },
  mobileViewToggle: {
    display: 'none',
    '@media (max-width: 960px)': {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1.5rem',
      gap: '1rem',
    },
    '@media (max-width: 600px)': {
      marginTop: '1.2rem',
      gap: '0.8rem',
    },
    '@media (max-width: 480px)': {
      marginTop: '1rem',
      gap: '0.6rem',
      flexDirection: 'column',
    },
    '@media (max-width: 375px)': {
      marginTop: '0.8rem',
      gap: '0.5rem',
    },
  },
}));