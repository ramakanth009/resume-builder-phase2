import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Menu, 
  MenuItem, 
  Tooltip,
  Typography
} from '@mui/material';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import { useFont } from '../contexts/FontContext';
import makeStylesWithTheme from '../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  fontButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '8px',
    padding: '0.4rem 0.8rem',
    backgroundColor: '#f0f4f8',
    color: '#3182ce',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: '#e6f7ff',
      borderColor: '#bee3f8',
      boxShadow: '0 2px 5px rgba(66, 153, 225, 0.2)',
    },
  },
  menuItem: {
    fontWeight: 500,
    minWidth: '150px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f7fafc',
    },
  },
  selectedMenuItem: {
    backgroundColor: '#ebf8ff',
    fontWeight: 600,
    color: '#3182ce',
    '&:hover': {
      backgroundColor: '#e6f7ff',
    },
  },
  buttonText: {
    marginLeft: '0.4rem',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
}));

const FontSwitcher = () => {
  const classes = useStyles();
  const { selectedFont, setSelectedFont, selectedFontName, availableFonts } = useFont();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  const handleSelectFont = (fontValue) => {
    setSelectedFont(fontValue);
    handleCloseMenu();
  };

  return (
    <Box>
      <Tooltip title="Change font" arrow>
        <Button
          className={classes.fontButton}
          onClick={handleOpenMenu}
          startIcon={<FormatSizeIcon />}
        >
          <Typography className={classes.buttonText}>
            {selectedFontName}
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
        {availableFonts.map((font) => (
          <MenuItem
            key={font.name}
            onClick={() => handleSelectFont(font.value)}
            className={`${classes.menuItem} ${selectedFont === font.value ? classes.selectedMenuItem : ''}`}
            style={{ fontFamily: font.value }}
          >
            {font.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FontSwitcher;