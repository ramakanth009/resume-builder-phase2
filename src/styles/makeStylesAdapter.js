import { makeStyles, createStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// This is a wrapper for makeStyles to make it work with MUI v7
// It passes the theme to makeStyles so it can be used in style definitions
export const makeStylesWithTheme = (styles) => {
  const useStyles = makeStyles((theme) => createStyles(typeof styles === 'function' ? styles(theme) : styles));
  
  return () => {
    const theme = useTheme();
    return useStyles(theme);
  };
};

export default makeStylesWithTheme;