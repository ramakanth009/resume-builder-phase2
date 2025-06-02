// src/styles/previewStyles/executiveModernStyles.js
import makeStylesWithTheme from '../makeStylesAdapter';

const useExecutiveModernStyles = makeStylesWithTheme((theme) => ({
  resumeHeader: {
    marginBottom: '2rem',
    textAlign: 'left',
    position: 'relative',
  },
  resumeName: {
    fontSize: '3rem',
    fontWeight: 300,
    marginBottom: '0.5rem',
    color: '#2d3748',
    textTransform: 'uppercase',
    letterSpacing: '0.3em',
    lineHeight: 1.1,
  },
  resumeTitle: {
    fontSize: '1.2rem',
    color: '#4a5568',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '2rem',
    fontWeight: 400,
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '0.5rem',
  },
  resumeContact: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem',
    marginBottom: '2rem',
    fontSize: '0.9rem',
    color: '#4a5568',
  },
  resumeContactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  resumeSection: {
    marginBottom: '2.5rem',
  },
  resumeSectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2d3748',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    borderBottom: '1px solid #2d3748',
    paddingBottom: '0.3rem',
    display: 'inline-block',
  },
  resumeSummary: {
    fontSize: '0.95rem',
    color: '#4a5568',
    lineHeight: 1.7,
    textAlign: 'justify',
    backgroundColor: '#f7fafc',
    padding: '1.5rem',
    borderRadius: '4px',
    borderLeft: '4px solid #2d3748',
  },
  resumeEducation: {
    marginBottom: '1.5rem',
  },
  resumeSubtitle: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: '#2d3748',
    fontSize: '1rem',
  },
  resumeInstitution: {
    fontSize: '0.9rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
  },
  resumeDate: {
    fontSize: '0.85rem',
    color: '#718096',
    fontWeight: 500,
  },
  resumeSkills: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '0.5rem',
  },
  resumeSkillChip: {
    backgroundColor: '#f7fafc',
    color: '#2d3748',
    fontSize: '0.85rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    fontWeight: 500,
  },
  aiSkillChip: {
    backgroundColor: '#ebf8ff',
    color: '#2b6cb0',
    fontSize: '0.85rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: '1px solid #bee3f8',
    textAlign: 'center',
    fontWeight: 600,
  },
  resumeItem: {
    marginBottom: '2rem',
    borderLeft: '2px solid #e2e8f0',
    paddingLeft: '1.5rem',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '-5px',
      top: '0',
      width: '8px',
      height: '8px',
      backgroundColor: '#2d3748',
      borderRadius: '50%',
    },
  },
  resumeItemTitle: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: '#2d3748',
    fontSize: '1rem',
  },
  resumeItemSubtitle: {
    fontSize: '0.9rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
    fontStyle: 'italic',
  },
  resumeItemDuration: {
    fontSize: '0.85rem',
    color: '#718096',
    marginBottom: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  resumeBullets: {
    paddingLeft: '1.5rem',
    margin: '0.75rem 0',
    listStylePosition: 'outside',
    listStyleType: 'disc',
  },
  resumeBullet: {
    fontSize: '0.9rem',
    color: '#4a5568',
    marginBottom: '0.5rem',
    lineHeight: 1.6,
  },
  contactLink: {
    color: '#2b6cb0',
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  // Mobile responsive
  '@media (max-width: 960px)': {
    resumeName: {
      fontSize: '2.5rem',
    },
    resumeTitle: {
      fontSize: '1rem',
    },
    resumeContact: {
      gridTemplateColumns: '1fr',
    },
  },
  '@media (max-width: 600px)': {
    resumeName: {
      fontSize: '2rem',
      letterSpacing: '0.2em',
    },
    resumeTitle: {
      fontSize: '0.9rem',
    },
    resumeSummary: {
      padding: '1rem',
    },
    resumeSectionTitle: {
      fontSize: '1rem',
    },
  },
}));

export default useExecutiveModernStyles;