// src/components/resumeBuilder/ResumePDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';
import { getTemplateStyles } from '../../templates/pdfTemplateRegistry';

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
    marginTop: 20,
    textAlign: 'center',
    fontSize: 8,
    color: '#718096',
  },
});

const Bullet = ({ children, styles }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const ResumePDF = ({ resumeData, templateId = 'classic' }) => {
  // Get template styles dynamically
  const styles = getTemplateStyles(templateId);
  
  // Helper functions
  const hasEducationData = () => {
    // Existing implementation
  };

  // Document rendering with dynamic styles
  return (
    <Document title={`${resumeData.header.name || 'Resume'}`} author={resumeData.header.name || 'Applicant'}>
      <Page size="A4" style={baseStyles.page}>
        {/* Content using dynamic styles */}
        {/* Existing implementation but using styles from registry */}
      </Page>
    </Document>
  );
};

export default ResumePDF;