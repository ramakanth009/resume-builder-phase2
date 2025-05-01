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
          maxWidth: '1000px',
          width: '90%',
        },
      },
      templateButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
      },
      leftSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #e9f7fe 0%, #f9f9f9 100%)',
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      },
      rightSection: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        minHeight: '100vh',
        padding: '2rem 1rem',
        position: 'relative',
      },
      animatedShape: {
        position: 'absolute',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #90cdf4 0%, #fbb6ce 100%)',
        opacity: 0.15,
        zIndex: 0,
      },
      leftContentContainer: {
        position: 'relative',
        zIndex: 1,
        maxWidth: 520,
        marginLeft: 0,
      },
      mainHeadline: {
        fontWeight: 800,
        fontSize: '2.8rem',
        lineHeight: 1.1,
        marginBottom: '1.2rem',
        color: '#2d3748',
      },
      highlightedText: {
        color: '#3182ce',
        fontWeight: 900,
      },
      tagline: {
        fontSize: '1.2rem',
        color: '#4a5568',
        marginBottom: '2rem',
      },
      statsGridContainer: {
        display: 'flex',
        gap: '2rem',
        marginBottom: '2rem',
      },
      statCard: {
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(49,130,206,0.07)',
        padding: '1.2rem 1.5rem',
        minWidth: 100,
        textAlign: 'center',
      },
      statNumber: {
        fontWeight: 700,
        fontSize: '2rem',
        color: '#3182ce',
      },
      statDescription: {
        fontSize: '0.95rem',
        color: '#4a5568',
      },
      featuresContainer: {
        marginTop: '2rem',
      },
      featuresHeading: {
        fontWeight: 700,
        fontSize: '1.15rem',
        color: '#2d3748',
        marginBottom: '1rem',
      },
      featureItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        marginBottom: '1.1rem',
      },
      featureIcon: {
        color: '#38a169',
        fontSize: '1.5rem',
        marginTop: '0.2rem',
      },
      featureTitle: {
        fontWeight: 600,
        color: '#2d3748',
      },
      featureDescription: {
        color: '#4a5568',
        fontSize: '0.98rem',
      },
      formContainer: {
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(49,130,206,0.10)',
        padding: '2.5rem 2rem',
        width: '100%',
        maxWidth: 420,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.7rem',
        marginBottom: '1.5rem',
      },
      logo: {
        width: 38,
        height: 38,
        objectFit: 'contain',
      },
      logoText: {
        fontWeight: 700,
        fontSize: '1.25rem',
        color: '#3182ce',
        letterSpacing: '0.03em',
      },
      welcomeText: {
        fontWeight: 700,
        fontSize: '1.5rem',
        marginBottom: '0.5rem',
        color: '#2d3748',
      },
      subtitle: {
        color: '#4a5568',
        fontSize: '1.05rem',
        marginBottom: '1.5rem',
      },
      form: {
        width: '100%',
        marginTop: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.1rem',
      },
      textField: {
        marginBottom: 0,
      },
      button: {
        backgroundColor: '#3182ce',
        color: 'white',
        textTransform: 'none',
        fontWeight: 600,
        padding: '0.7rem 0',
        borderRadius: '8px',
        marginTop: '0.5rem',
        '&:hover': {
          backgroundColor: '#2b6cb0',
        },
      },
      loader: {
        marginLeft: '0.5rem',
        color: 'white',
      },
      formDivider: {
        textAlign: 'center',
        color: '#a0aec0',
        margin: '1.2rem 0 0.5rem 0',
        fontSize: '1rem',
      },
      loginLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.3rem',
        marginTop: '0.5rem',
      },
      loginText: {
        color: '#4a5568',
      },
      loginButton: {
        color: '#3182ce',
        fontWeight: 600,
        textTransform: 'none',
        padding: 0,
        minWidth: 0,
        background: 'none',
        '&:hover': {
          background: 'none',
          textDecoration: 'underline',
        },
      },
}));
