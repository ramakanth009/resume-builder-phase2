import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const FontContext = createContext(null);

// List of available fonts
const availableFonts = [
  { name: 'Roboto', value: "'Roboto', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
  { name: 'Open Sans', value: "'Open Sans', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap' },
  { name: 'Poppins', value: "'Poppins', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' },
  { name: 'Montserrat', value: "'Montserrat', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap' },
  { name: 'Lato', value: "'Lato', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' },
];

// FontProvider component
export const FontProvider = ({ children }) => {
  // Get default font from localStorage or use first font in list
  const [selectedFont, setSelectedFont] = useState(() => {
    const savedFont = localStorage.getItem('selectedFont');
    return savedFont || availableFonts[0].value;
  });
  
  // Get font name for display
  const selectedFontName = availableFonts.find(font => font.value === selectedFont)?.name || 'Roboto';
  
  // Save selected font to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedFont', selectedFont);
    
    // Apply font to document root
    document.documentElement.style.fontFamily = selectedFont;
  }, [selectedFont]);
  
  // Load font stylesheet
  useEffect(() => {
    const fontToLoad = availableFonts.find(font => font.value === selectedFont);
    
    if (fontToLoad) {
      // Check if stylesheet already exists
      const existingLink = document.querySelector(`link[href="${fontToLoad.url}"]`);
      
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = fontToLoad.url;
        document.head.appendChild(link);
      }
    }
  }, [selectedFont]);
  
  return (
    <FontContext.Provider value={{ 
      selectedFont, 
      setSelectedFont, 
      selectedFontName,
      availableFonts 
    }}>
      {children}
    </FontContext.Provider>
  );
};

// Custom hook to use the font context
export const useFont = () => {
  const context = useContext(FontContext);
  if (context === null) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
};

export default FontContext;