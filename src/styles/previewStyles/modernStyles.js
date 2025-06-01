// src/templates/pdf/modernStyles.js
import makeStylesWithTheme from '../makeStylesAdapter';

const useModernStyles = makeStylesWithTheme((theme) => ({
  resumeHeader: {
    marginBottom: '2rem',
    textAlign: 'left',
    paddingBottom: '1.5rem',
    borderBottom: '3px solid #3182ce',
  },
  resumeName: {
    fontSize: '2.2rem',
    fontWeight: 800,
    marginBottom: '0.5rem',
    color: '#1a202c',
    textAlign: 'left',
  },
  aiSkillChip: {
    backgroundColor: '#e6f3ff',
    color: '#1565c0',
    padding: '3 6',
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 'bold',
  },
  resumeContact: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '1rem',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
    color: '#4a5568',
    lineHeight: 1.5,
  },
  resumeContactItem: {
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    display: 'inline-flex',
    alignItems: 'center',
  },
  resumeSection: {
    marginBottom: '2rem',
  },
  resumeSectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#3182ce',
    paddingBottom: '0.5rem',
    borderBottom: 'none',
  },
  resumeSummary: {
    color: '#2d3748',
    marginBottom: '1.5rem',
    lineHeight: 1.7,
    fontSize: '1rem',
  },
  resumeEducation: {
    marginBottom: '1.5rem',
  },
  resumeSubtitle: {
    fontWeight: 700,
    marginBottom: '0.25rem',
    color: '#1a202c',
    fontSize: '1.1rem',
  },
  resumeDate: {
    fontSize: '0.875rem',
    color: '#3182ce',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  resumeSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    margin: '0.5rem 0',
  },
  resumeSkillChip: {
    backgroundColor: '#e6f7ff',
    color: '#0366d6',
    fontSize: '0.75rem',
    height: '28px',
    fontWeight: 600,
    borderRadius: '4px',
  },
  resumeItem: {
    marginBottom: '1.5rem',
  },
  resumeItemSubtitle: {
    fontSize: '1rem',
    color: '#2d3748',
    marginBottom: '0.5rem',
  },
  resumeBullets: {
    paddingLeft: '1.5rem',
    margin: '0.75rem 0',
    listStylePosition: 'outside',
  },
  resumeBullet: {
    fontSize: '0.9rem',
    color: '#2d3748',
    marginBottom: '0.5rem',
    lineHeight: 1.6,
    paddingLeft: '0.5rem',
  },
  contactLink: {
    color: '#0366d6',
    textDecoration: 'none',
    fontWeight: 600,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
}));

export default useModernStyles;