import React, { createContext, useState, useContext, useEffect } from 'react';
import templatesData from '../data/templatesData';

// Create context
const TemplateContext = createContext(null);

// Template provider component
export const TemplateProvider = ({ children }) => {
  // Get default template ID from template data
  const defaultTemplateId = templatesData.find(t => t.isDefault)?.id || 'classic';
  
  // Initialize state with default template or from localStorage if available
  const [selectedTemplateId, setSelectedTemplateId] = useState(() => {
    const savedTemplate = localStorage.getItem('selectedTemplateId');
    return savedTemplate || defaultTemplateId;
  });
  
  // Save selected template to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedTemplateId', selectedTemplateId);
  }, [selectedTemplateId]);
  
  // Get the current template object based on ID
  const currentTemplate = templatesData.find(t => t.id === selectedTemplateId) || 
    templatesData.find(t => t.isDefault);
  
  // Value to be provided by the context
  const value = {
    templateId: selectedTemplateId,
    setTemplateId: setSelectedTemplateId,
    currentTemplate,
    allTemplates: templatesData
  };
  
  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};

// Custom hook to use the template context
export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (context === null) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

export default TemplateContext;