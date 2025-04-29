// src/templates/pdf/classicStyles.js
import { StyleSheet } from '@react-pdf/renderer';

const executiveStyles = StyleSheet.create({
 header: {
     marginBottom: 20,
     textAlign: 'center',
     paddingBottom: 15,
     borderBottomWidth: 1,
     borderBottomColor: '#e2e8f0',
   },
   name: {
     fontSize: 20,
     fontWeight: 'bold',
     marginBottom: 5,
     color: '#1a202c',
     textTransform: 'uppercase',
     letterSpacing: 1,
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
   },
   contactLink: {
     color: '#1a202c',
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
     borderBottomColor: '#cbd5e0',
     paddingBottom: 3,
     marginBottom: 8,
     color: '#1a202c',
     textTransform: 'uppercase',
     letterSpacing: 1,
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
     backgroundColor: '#f7fafc',
     color: '#1a202c',
     padding: '3 8',
     borderRadius: 4,
     fontSize: 9,
     borderWidth: 1,
     borderColor: '#e2e8f0',
   },
   experienceItem: {
     marginBottom: 12,
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
     color: '#718096',
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

export default executiveStyles;