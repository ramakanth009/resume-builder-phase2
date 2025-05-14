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
  { name: 'Raleway', value: "'Raleway', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap' },
  { name: 'Source Sans Pro', value: "'Source Sans Pro', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap' },
  { name: 'Nunito', value: "'Nunito', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap' },
  { name: 'Merriweather', value: "'Merriweather', serif", url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap' },
  { name: 'PT Sans', value: "'PT Sans', sans-serif", url: 'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap' },
  { name: 'Work Sans', value: "'Work Sans', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap' },
  { name: 'Playfair Display', value: "'Playfair Display', serif", url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap' },
  { name: 'IBM Plex Sans', value: "'IBM Plex Sans', sans-serif", url: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap' },
  { name: 'Crimson Text', value: "'Crimson Text', serif", url: 'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap' },
  { name: 'Inter', value: "'Inter', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
  // Additional distinctive fonts
{ name: 'Cormorant Garamond', value: "'Cormorant Garamond', serif", url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap' },
{ name: 'Josefin Sans', value: "'Josefin Sans', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap' },
{ name: 'Quicksand', value: "'Quicksand', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap' },
{ name: 'Spectral', value: "'Spectral', serif", url: 'https://fonts.googleapis.com/css2?family=Spectral:wght@300;400;500;600;700&display=swap' },
{ name: 'Abril Fatface', value: "'Abril Fatface', cursive", url: 'https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap' },
{ name: 'Space Grotesk', value: "'Space Grotesk', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap' },
{ name: 'DM Serif Display', value: "'DM Serif Display', serif", url: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap' },
{ name: 'Outfit', value: "'Outfit', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap' },
{ name: 'Manrope', value: "'Manrope', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap' },
{ name: 'Bellota', value: "'Bellota', cursive", url: 'https://fonts.googleapis.com/css2?family=Bellota:wght@300;400;700&display=swap' },
{ name: 'Comfortaa', value: "'Comfortaa', cursive", url: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap' },
{ name: 'Tenor Sans', value: "'Tenor Sans', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap' },
{ name: 'Marcellus', value: "'Marcellus', serif", url: 'https://fonts.googleapis.com/css2?family=Marcellus&display=swap' },
{ name: 'Syne', value: "'Syne', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap' },
{ name: 'Questrial', value: "'Questrial', sans-serif", url: 'https://fonts.googleapis.com/css2?family=Questrial&display=swap' }
];

// Get PDF font family from value
const getPdfFontFamily = (fontValue) => {
  // Extract just the first font name without quotes
  if (!fontValue) return 'Roboto';
  const match = fontValue.match(/'([^']+)'/);
  return match ? match[1] : 'Roboto';
};

// FontProvider component
export const FontProvider = ({ children }) => {
  // Get default font from localStorage or use first font in list
  const [selectedFont, setSelectedFont] = useState(() => {
    const savedFont = localStorage.getItem('selectedFont');
    return savedFont || availableFonts[0].value;
  });
  
  // Get font name for display
  const selectedFontName = availableFonts.find(font => font.value === selectedFont)?.name || 'Roboto';
  
  // Get pdf font family (for PDF generation)
  const pdfFontFamily = getPdfFontFamily(selectedFont);
  
  // Save selected font to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedFont', selectedFont);
    
    // Apply font to document root
    document.documentElement.style.fontFamily = selectedFont;
    
    // Apply font to body as well for better cascade
    document.body.style.fontFamily = selectedFont;
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
      pdfFontFamily,
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