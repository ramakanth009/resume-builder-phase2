import makeStylesWithTheme from '../styles/makeStylesAdapter';

export const useStyles = makeStylesWithTheme((theme) => ({
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
      navigationButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2rem',
      },
      buttonNext: {
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
      buttonBack: {
        color: '#718096',
        borderColor: '#e2e8f0',
        textTransform: 'none',
        fontWeight: 600,
        padding: '0.5rem 1.5rem',
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: '#f7fafc',
        },
      },
      stepper: {
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: 'transparent',
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
        marginBottom: '1rem',
      },
      viewModeToggle: {
        display: 'flex',
        marginBottom: '1rem',
        justifyContent: 'center',
        gap: '1rem',
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
      },
      templateDialog: {
        '& .MuiDialog-paper': {
          maxWidth: '900px',
          width: '90%',
        },
      },
      templateButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
      }
}));
