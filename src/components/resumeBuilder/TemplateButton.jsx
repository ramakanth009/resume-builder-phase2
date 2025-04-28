import React from 'react';
import { Button } from '@mui/material';
import TemplateIcon from '@mui/icons-material/Dashboard';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  templateButton: {
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
}));

const TemplateButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.templateButton}
      onClick={onClick}
      startIcon={<TemplateIcon />}
    >
      Choose Template
    </Button>
  );
};

export default TemplateButton;