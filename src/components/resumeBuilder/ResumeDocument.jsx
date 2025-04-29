import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';

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
  },
});

/**
 * Main Resume Document component for PDF generation
 * 
 * @param {Object} props - Component props
 * @param {Object} props.resumeData - Resume data to render
 * @param {Object} props.template - Template configuration object
 * @returns {React.Component} - React-PDF Document component
 */
const ResumeDocument = ({ resumeData, template }) => {
  const { PDFComponent } = template;
  
  return (
    <Document title={`${resumeData.header.name || 'Resume'}`} author={resumeData.header.name || 'Applicant'}>
      <Page size="A4" style={baseStyles.page}>
        <PDFComponent resumeData={resumeData} />
      </Page>
    </Document>
  );
};

export default ResumeDocument;