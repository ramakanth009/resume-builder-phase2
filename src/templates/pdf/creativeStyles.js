// src/templates/pdf/classicStyles.js
import { StyleSheet } from '@react-pdf/renderer';

const creativeStyles = StyleSheet.create({
 header: {
    marginBottom: 20,
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#5a67d8',
    borderRadius: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 5,
  },
  contactItem: {
    fontSize: 10,
    color: 'white',
  },
  contactLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  targetRole: {
    fontSize: 12,
    fontWeight: 'medium',
    textAlign: 'center',
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5a67d8',
    paddingBottom: 2,
    marginBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#5a67d8',
    width: 150,
  },
  summary: {
    fontSize: 10,
    marginBottom: 15,
    fontStyle: 'italic',
    lineHeight: 1.8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  skillChip: {
    backgroundColor: '#5a67d8',
    color: 'white',
    padding: '3 8',
    borderRadius: 10,
    fontSize: 9,
    fontWeight: 'bold',
  },
  experienceItem: {
    marginBottom: 14,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#5a67d8',
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
    color: '#5a67d8',
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

export default creativeStyles;