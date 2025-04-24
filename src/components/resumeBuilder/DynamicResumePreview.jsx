import React from 'react';
import ModernTemplate from '../resumeTemplates/ModernTemplate';
import ClassicTemplate from '../resumeTemplates/ClassicTemplate';
import MinimalTemplate from '../resumeTemplates/MinimalTemplate';
import ResumePreview from './ResumePreview';

/**
 * DynamicResumePreview component
 * Renders the appropriate resume template based on the selectedTemplate prop
 */
const DynamicResumePreview = ({ userData, generatedData, selectedTemplate = 'classic' }) => {
  // Determine which data to use (generated or user input)
  const data = generatedData || userData;
  
  // Render the selected template
  switch (selectedTemplate) {
    case 'modern':
      return <ModernTemplate resumeData={data} />;
    
    case 'minimal':
      return <MinimalTemplate resumeData={data} />;
    
    case 'classic':
      return <ClassicTemplate resumeData={data} />;
    
    default:
      // Default to original ResumePreview if template not recognized
      return <ResumePreview userData={userData} generatedData={generatedData} />;
  }
};

export default DynamicResumePreview;