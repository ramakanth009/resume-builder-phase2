import React from 'react';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import { CircularProgress, Typography, Box } from '@mui/material';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  progress: {
    color: '#3182ce',
    marginBottom: '1rem',
  },
  text: {
    color: '#718096',
  },
}));

const Loading = ({ message = 'Loading...' }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress size={60} thickness={4} className={classes.progress} />
      <Typography variant="h6" className={classes.text}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;