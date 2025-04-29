// src/templates/pdf/executiveStyles.js
import makeStylesWithTheme from '../makeStylesAdapter';

const useExecutiveStyles = makeStylesWithTheme((theme) => ({
  resumeHeader: {
    marginBottom: '2rem',
    textAlign: 'center',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid #e2e8f0',
  },
  resumeName: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '0.75rem',
    color: '#1a202c',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  resumeContact: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1.5rem',
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
    color: '#1a202c',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #cbd5e0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  resumeSummary: {
    color: '#1a202c',
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
    fontSize: '1.05rem',
  },
  resumeDate: {
    fontSize: '0.875rem',
    color: '#718096',
    fontStyle: 'normal',
  },
  resumeSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    margin: '0.5rem 0',
  },
  resumeSkillChip: {
    backgroundColor: '#f7fafc',
    color: '#1a202c',
    fontSize: '0.75rem',
    height: '28px',
    fontWeight: 500,
    border: '1px solid #e2e8f0',
  },
  resumeItem: {
    marginBottom: '1.5rem',
  },
  resumeItemSubtitle: {
    fontSize: '0.925rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
  },
  resumeBullets: {
    paddingLeft: '1.25rem',
    margin: '0.5rem 0',
    listStylePosition: 'outside',
  },
  resumeBullet: {
    fontSize: '0.875rem',
    color: '#4a5568',
    marginBottom: '0.5rem',
    lineHeight: 1.5,
  },
  contactLink: {
    color: '#1a202c',
    textDecoration: 'none',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
}));

export default useExecutiveStyles;