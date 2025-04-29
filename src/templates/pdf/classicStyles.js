// src/templates/pdf/classicStyles.js
import { StyleSheet } from '@react-pdf/renderer';

const classicStyles = StyleSheet.create({
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 10,
  },
  contactLink: {
    color: '#3182ce',
    textDecoration: 'none',
  },
  targetRole: {
    fontSize: 12,
    fontWeight: 'medium',
    textAlign: 'center',
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 3,
    marginBottom: 8,
    color: '#1a202c',
  },
  summary: {
    fontSize: 10,
    marginBottom: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  skillChip: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    padding: '3 6',
    borderRadius: 4,
    fontSize: 9,
  },
  experienceItem: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  duration: {
    fontSize: 9,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 3,
    flexDirection: 'row',
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
});

export default classicStyles;