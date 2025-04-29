// src/components/resumeBuilder/ResumePDF.jsx
import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import { getTemplatePDFComponent } from '../../templates/pdfTemplateRegistry';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontWeight: 'normal', fontStyle: 'italic' },
  ]
});

// Base styles
const baseStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    fontSize: 11,
    lineHeight: 1.5,
    color: '#2d3748',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#718096',
  }
});

// This is a wrapper component that loads the correct template component
const ResumePDF = ({ resumeData, templateId = 'classic' }) => {
  // Get the PDF component for the selected template
  const PDFComponent = getTemplatePDFComponent(templateId);
  
  if (!PDFComponent) {
    console.error(`Template component not found for ID: ${templateId}`);
    return null;
  }
  
  return (
    <Document title={`${resumeData.header.name || 'Resume'}`} author={resumeData.header.name || 'Applicant'}>
      <Page size="A4" style={baseStyles.page}>
        <PDFComponent resumeData={resumeData} />
      </Page>
    </Document>
  );
};

export default ResumePDF;