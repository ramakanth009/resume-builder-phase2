import makeStylesWithTheme from './makeStylesAdapter';

// Common styles that can be reused across components
export const useCommonStyles = makeStylesWithTheme((theme) => ({
  // Form-related styles
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
  },
  button: {
    padding: '0.75rem',
    borderRadius: '8px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    marginTop: '1rem',
    backgroundColor: '#3182ce',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  
  // Typography styles
  pageTitle: {
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#2d3748',
  },
  pageSubtitle: {
    marginBottom: '2rem',
    color: '#718096',
  },
  
  // Container styles
  paper: {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  
  // Helper styles
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Loader
  loader: {
    marginLeft: '10px',
    color: 'white',
  }
}));

// Export any color palettes or theme values that might be reused
export const colors = {
  primary: '#3182ce',
  primaryDark: '#2b6cb0',
  secondary: '#4fd1c5',
  background: '#f9f9f9',
  text: {
    primary: '#2d3748',
    secondary: '#718096',
  },
  error: '#e53e3e',
  success: '#38a169',
};

// Export common breakpoints for responsive design
export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};