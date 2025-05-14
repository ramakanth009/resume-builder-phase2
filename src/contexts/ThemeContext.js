import React, { createContext, useState, useContext, useEffect } from 'react';

// Theme options
const themeOptions = [
  {
    name: 'Light',
    palette: {
      primary: { main: '#3182ce', light: '#ebf8ff', dark: '#2b6cb0' },
      secondary: { main: '#4fd1c5' },
      error: { main: '#e53e3e' },
      background: { default: '#f9f9f9', paper: '#ffffff' },
      text: { primary: '#2d3748', secondary: '#718096' }
    }
  },
  {
    name: 'Dark',
    palette: {
      primary: { main: '#90cdf4', light: '#1a365d', dark: '#bee3f8' },
      secondary: { main: '#76e4d7' },
      error: { main: '#fc8181' },
      background: { default: '#1a202c', paper: '#2d3748' },
      text: { primary: '#f7fafc', secondary: '#e2e8f0' }
    }
  },
  {
    name: 'Modern',
    palette: {
      primary: { main: '#6366f1', light: '#a5b4fc', dark: '#4f46e5' },
      secondary: { main: '#8b5cf6' },
      error: { main: '#ef4444' },
      background: { default: '#f8fafc', paper: '#ffffff' },
      text: { primary: '#1e293b', secondary: '#64748b' }
    }
  },
  {
    name: 'Vibrant',
    palette: {
      primary: { main: '#0ea5e9', light: '#bae6fd', dark: '#0284c7' },
      secondary: { main: '#f59e0b' },
      error: { main: '#dc2626' },
      background: { default: '#fafafa', paper: '#ffffff' },
      text: { primary: '#171717', secondary: '#525252' }
    }
  },
  {
    name: 'Minimal',
    palette: {
      primary: { main: '#525252', light: '#e5e5e5', dark: '#262626' },
      secondary: { main: '#0ea5e9' },
      error: { main: '#dc2626' },
      background: { default: '#fafafa', paper: '#ffffff' },
      text: { primary: '#171717', secondary: '#525252' }
    }
  }
];

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    return savedTheme || 'Light';
  });
  
  const themeObject = themeOptions.find(theme => theme.name === selectedTheme) || themeOptions[0];
  
  useEffect(() => {
    localStorage.setItem('selectedTheme', selectedTheme);
  }, [selectedTheme]);
  
  return (
    <ThemeContext.Provider value={{ 
      selectedTheme,
      setSelectedTheme,
      themeObject,
      themeOptions
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;