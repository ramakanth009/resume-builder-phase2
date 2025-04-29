// src/templates/pdf/classicStyles.js
import { StyleSheet } from '@react-pdf/renderer';

const modernStyles = StyleSheet.create({
 header: {
    marginBottom: 20,
    textAlign: 'left',
    paddingBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#3182ce',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a202c',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 10,
  },
  contactLink: {
    color: '#0366d6',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  targetRole: {
    fontSize: 13,
    fontWeight: 'medium',
    marginBottom: 15,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3182ce',
    marginBottom: 10,
  },
  summary: {
    fontSize: 10,
    marginBottom: 15,
    lineHeight: 1.7,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  skillChip: {
    backgroundColor: '#e6f7ff',
    color: '#0366d6',
    padding: '3 8',
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 'bold',
  },
  experienceItem: {
    marginBottom: 14,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#1a202c',
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  duration: {
    fontSize: 9,
    color: '#3182ce',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 4,
    flexDirection: 'row',
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
});

export default modernStyles;