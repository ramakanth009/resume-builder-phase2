import makeStylesWithTheme from '../makeStylesAdapter';

const useProfessionalStyles = makeStylesWithTheme((theme) => ({
  resumeHeader: {
    marginBottom: '2rem',
    textAlign: 'center',
    paddingBottom: '1rem',
    position: 'relative',
    backgroundColor: '#e6f7ff',
    padding: '2rem 1rem',
    borderRadius: '0',
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
    fontSize: '2.2rem',
    fontWeight: 800,
    marginBottom: '0.5rem',
    color: '#2d3748',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  resumeContact: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    marginBottom: '1.5rem',
    position: 'relative',
  },
  resumeSectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#2d3748',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #e2e8f0',
    position: 'relative',
  },
  resumeSummary: {
    color: '#4a5568',
    marginBottom: '1.5rem',
    lineHeight: 1.7,
    fontSize: '0.95rem',
  },
  resumeEducation: {
    marginBottom: '1.5rem',
    position: 'relative',
    paddingLeft: '1rem',
    borderLeft: '2px solid #e2e8f0',
  },
  resumeSubtitle: {
    fontWeight: 700,
    marginBottom: '0.25rem',
    color: '#2d3748',
    fontSize: '1.05rem',
  },
  resumeDate: {
    fontSize: '0.875rem',
    color: '#718096',
    fontStyle: 'normal',
    fontWeight: '500',
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
    fontWeight: 500,
    border: '1px solid #a0aec0',
  },
  resumeItem: {
    marginBottom: '1.5rem',
    position: 'relative',
    paddingLeft: '1rem',
    borderLeft: '2px solid #e2e8f0',
  },
  resumeItemSubtitle: {
    fontSize: '0.95rem',
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
    color: '#3182ce',
    textDecoration: 'none',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
}));

export default useProfessionalStyles;