import { createTheme } from '@mui/material/styles';

export const createDynamicTheme = (fontFamily, themeObject) => {
  const defaultTheme = {
    palette: {
      primary: { main: '#3182ce', light: '#ebf8ff', dark: '#2b6cb0' },
      secondary: { main: '#4fd1c5' },
      error: { main: '#e53e3e' },
      background: { default: '#f9f9f9', paper: '#ffffff' },
      text: { primary: '#2d3748', secondary: '#718096' }
    }
  };
  
  const palette = themeObject?.palette || defaultTheme.palette;
  
  return createTheme({
    palette,
    typography: {
      fontFamily: fontFamily || [
        '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
        '"Helvetica Neue"', 'Arial', 'sans-serif'
      ].join(','),
      h3: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none' }
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '0.75rem',
            fontWeight: 600
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: { marginBottom: '1rem' }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: 10 }
        }
      }
    }
  });
};