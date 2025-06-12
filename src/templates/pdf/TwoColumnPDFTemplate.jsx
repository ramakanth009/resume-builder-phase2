// src/templates/pdf/TwoColumnPDFTemplate.jsx
import React from 'react';
import { Text, View, Link, StyleSheet } from '@react-pdf/renderer';

// Updated styles for single-column layout
const twoColumnStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 15,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 15,
    textAlign: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    lineHeight: 1.1,
  },
  title: {
    fontSize: 10,
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    fontWeight: 'medium',
  },
  contactSection: {
    marginBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  contactItem: {
    fontSize: 8,
    color: '#333333',
    lineHeight: 1.4,
  },
  contactLink: {
    color: '#000000',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#000000',
    paddingBottom: 3,
  },
  summary: {
    fontSize: 9,
    color: '#333333',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    fontSize: 8,
    color: '#333333',
    backgroundColor: '#f8f9fa',
    padding: '3 8',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  experienceItem: {
    marginBottom: 12,
  },
  educationItem: {
    marginBottom: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000000',
    fontSize: 9,
  },
  itemSubtitle: {
    fontSize: 8,
    color: '#333333',
    marginBottom: 2,
    fontStyle: 'italic',
  },
  itemDate: {
    fontSize: 7,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 8,
    marginTop: 3,
  },
  bulletItem: {
    fontSize: 8,
    marginBottom: 2,
    flexDirection: 'row',
    lineHeight: 1.5,
  },
  bullet: {
    width: 6,
    textAlign: 'center',
  },
  bulletText: {
    flex: 1,
    color: '#333333',
  },
});

// Helper component for bullet points
const Bullet = ({ children }) => (
  <View style={twoColumnStyles.bulletItem}>
    <Text style={twoColumnStyles.bullet}>•</Text>
    <Text style={twoColumnStyles.bulletText}>{children}</Text>
  </View>
);

const TwoColumnPDFTemplate = ({ resumeData }) => {
  // Helper functions remain the same...
  const hasEducationData = () => {
    if (Array.isArray(resumeData.education)) {
      return resumeData.education.length > 0 && resumeData.education.some(edu => 
        (edu.degree && edu.degree.trim() !== '') || 
        (edu.institution && edu.institution.trim() !== '')
      );
    }
    return resumeData.education && (
      (resumeData.education.degree && resumeData.education.degree.trim() !== '') || 
      (resumeData.education.institution && resumeData.education.institution.trim() !== '')
    );
  };

  return (
    <View style={twoColumnStyles.container}>
      {/* Header Section */}
      <View style={twoColumnStyles.header}>
        <Text style={twoColumnStyles.name}>{resumeData.header.name}</Text>
        <Text style={twoColumnStyles.title}>{resumeData.header.title}</Text>
        
        <View style={twoColumnStyles.contactSection}>
          <Text style={twoColumnStyles.contactItem}>{resumeData.header.email}</Text>
          <Text style={twoColumnStyles.contactItem}>{resumeData.header.phone}</Text>
          {resumeData.header.location && (
            <Text style={twoColumnStyles.contactItem}>{resumeData.header.location}</Text>
          )}
          {resumeData.header.linkedin && (
            <Text style={twoColumnStyles.contactItem}>
              <Link src={resumeData.header.linkedin} style={twoColumnStyles.contactLink}>
                LinkedIn
              </Link>
            </Text>
          )}
        </View>
      </View>

      {/* Summary Section */}
      {resumeData.summary && (
        <View style={twoColumnStyles.section}>
          <Text style={twoColumnStyles.sectionTitle}>Summary</Text>
          <Text style={twoColumnStyles.summary}>{resumeData.summary}</Text>
        </View>
      )}

      {/* Skills Section */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <View style={twoColumnStyles.section}>
          <Text style={twoColumnStyles.sectionTitle}>Skills</Text>
          <View style={twoColumnStyles.skillsGrid}>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={twoColumnStyles.skillItem}>{skill}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Work Experience Section */}
      {resumeData.workExperience && resumeData.workExperience.length > 0 && (
        <View style={twoColumnStyles.section}>
          <Text style={twoColumnStyles.sectionTitle}>Work Experience</Text>
          {resumeData.workExperience.map((exp, index) => (
            <View key={index} style={twoColumnStyles.experienceItem}>
              <Text style={twoColumnStyles.itemTitle}>{exp.position}</Text>
              <Text style={twoColumnStyles.itemSubtitle}>{exp.companyName}</Text>
              <Text style={twoColumnStyles.itemDate}>{exp.startDate} - {exp.endDate || 'Present'}</Text>
              {exp.responsibilities && (
                <View style={twoColumnStyles.bulletList}>
                  {exp.responsibilities.map((resp, idx) => (
                    <Bullet key={idx}>{resp}</Bullet>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education Section */}
      {hasEducationData() && (
        <View style={twoColumnStyles.section}>
          <Text style={twoColumnStyles.sectionTitle}>Education</Text>
          {Array.isArray(resumeData.education) ? (
            resumeData.education.map((edu, index) => (
              <View key={index} style={twoColumnStyles.educationItem}>
                <Text style={twoColumnStyles.itemTitle}>{edu.institution}</Text>
                <Text style={twoColumnStyles.itemSubtitle}>{edu.degree}</Text>
                <Text style={twoColumnStyles.itemDate}>{edu.graduationYear}</Text>
              </View>
            ))
          ) : (
            <View style={twoColumnStyles.educationItem}>
              <Text style={twoColumnStyles.itemTitle}>{resumeData.education.institution}</Text>
              <Text style={twoColumnStyles.itemSubtitle}>{resumeData.education.degree}</Text>
              <Text style={twoColumnStyles.itemDate}>{resumeData.education.graduationYear}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default TwoColumnPDFTemplate;