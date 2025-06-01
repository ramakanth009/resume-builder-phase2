// src/templates/pdf/creativeStyles.js
import makeStylesWithTheme from '../makeStylesAdapter';

const useCreativeStyles = makeStylesWithTheme((theme) => ({
  resumeHeader: {
    marginBottom: '2rem',
    textAlign: 'center',
    padding: '2rem 1rem',
    backgroundColor: '#5a67d8',
    color: 'white',
    borderRadius: '8px',
  },
  aiSkillChip: {
    backgroundColor: '#e6f3ff',
    color: '#1565c0',
    padding: '3 6',
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 'bold',
  },
  resumeName: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '1rem',
    color: 'white',
    textAlign: 'center',
  },
  resumeContact: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
    color: 'white',
    lineHeight: 1.5,
  },
  resumeContactItem: {
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    display: 'inline-flex',
    alignItems: 'center',
  },
  resumeSection: {
    marginBottom: '2.5rem',
  },
  resumeSectionTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    marginBottom: '1rem',
    color: '#5a67d8',
    paddingBottom: '0.25rem',
    display: 'inline-block',
    borderBottom: '3px solid #5a67d8',
  },
  resumeSummary: {
    color: '#2d3748',
    marginBottom: '1.5rem',
    lineHeight: 1.8,
    fontSize: '1.05rem',
    fontStyle: 'italic',
  },
  resumeEducation: {
    marginBottom: '1.5rem',
  },
  resumeSubtitle: {
    fontWeight: 700,
    marginBottom: '0.25rem',
    color: '#1a202c',
    fontSize: '1.2rem',
  },
  resumeDate: {
    fontSize: '0.875rem',
    color: '#5a67d8',
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
    backgroundColor: '#5a67d8',
    color: 'white',
    fontSize: '0.75rem',
    height: '28px',
    fontWeight: 600,
    borderRadius: '20px',
  },
  resumeItem: {
    marginBottom: '1.5rem',
    position: 'relative',
    paddingLeft: '1rem',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '0.5rem',
      bottom: '0.5rem',
      width: '3px',
      backgroundColor: '#5a67d8',
      borderRadius: '4px',
    },
  },
  resumeItemSubtitle: {
    fontSize: '1rem',
    color: '#4a5568',
    marginBottom: '0.5rem',
  },
  resumeBullets: {
    paddingLeft: '1.5rem',
    margin: '0.75rem 0',
    listStyleType: 'square',
  },
  resumeBullet: {
    fontSize: '0.9rem',
    color: '#2d3748',
    marginBottom: '0.5rem',
    lineHeight: 1.6,
  },
  contactLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 600,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  contentLink: {
    color: '#5a67d8',
    textDecoration: 'none',
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline',
    },
  }
}));

export default useCreativeStyles;