import React, { useState } from 'react';
import { 
  Box, Button, Menu, MenuItem, Tooltip, Typography
} from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useTheme } from '../contexts/ThemeContext';
import makeStylesWithTheme from '../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  themeButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '8px',
    padding: '0.4rem 0.8rem',
    backgroundColor: '#f0f4f8',
    color: theme.palette.primary.main,
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    minWidth: 'auto',
    marginLeft: '0.5rem',
    '&:hover': {
      backgroundColor: '#e6f7ff',
      borderColor: '#bee3f8',
      boxShadow: '0 2px 5px rgba(66, 153, 225, 0.2)'
    }
  },
  menuItem: {
    fontWeight: 500,
    minWidth: '150px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc'
    }
  },
  selectedMenuItem: {
    backgroundColor: '#ebf8ff',
    fontWeight: 600,
    color: '#3182ce',
    '&:hover': {
      backgroundColor: '#e6f7ff'
    }
  },
  buttonText: {
    marginLeft: '0.4rem',
    '@media (max-width: 600px)': {
      display: 'none'
    }
  },
  colorSwatch: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    marginRight: '8px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
}));

const ThemeSelector = () => {
  const classes = useStyles();
  const { selectedTheme, setSelectedTheme, themeOptions } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  const handleSelectTheme = (themeName) => {
    setSelectedTheme(themeName);
    handleCloseMenu();
  };

  return (
    <Box>
      <Tooltip title="Change theme" arrow>
        <Button
          className={classes.themeButton}
          onClick={handleOpenMenu}
          startIcon={<ColorLensIcon />}
        >
          <Typography className={classes.buttonText}>
            {selectedTheme}
          </Typography>
        </Button>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 3,
          style: {
            borderRadius: '8px',
            marginTop: '8px'
          }
        }}
      >
        {themeOptions.map((theme) => (
          <MenuItem
            key={theme.name}
            onClick={() => handleSelectTheme(theme.name)}
            className={`${classes.menuItem} ${selectedTheme === theme.name ? classes.selectedMenuItem : ''}`}
          >
            <span 
              className={classes.colorSwatch} 
              style={{ backgroundColor: theme.palette.primary.main }}
            ></span>
            {theme.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ThemeSelector;