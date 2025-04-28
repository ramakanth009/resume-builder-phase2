import makeStylesWithTheme from '../makeStylesAdapter';

const useCreativeBlueStyles = makeStylesWithTheme((theme) => ({
  resumeHeader: {
    marginBottom: '1.5rem',
    textAlign: 'left',
    position: 'relative',
    borderBottom: 'none',
  },
  resumeName: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#0047ab', // Royal blue
    textAlign: 'left',
    fontFamily: 'Georgia, serif',
  },
  resumeContact: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '1rem',
    marginTop: '1rem',
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
    color: '#2d3748',
    lineHeight: 1.5,
    padding: '0.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    backgroundColor: '#f8fafc',
  },
  resumeContactItem: {
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    display: 'inline-flex',
    alignItems: 'center',
  },
  resumeSection: {
    marginBottom: '2rem',
    position: 'relative',
  },
  resumeSectionTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#0047ab', // Royal blue
    paddingBottom: '0.25rem',
    borderBottom: 'none',
    position: 'relative',
  },
  resumeSummary: {
    color: '#2d3748',
    marginBottom: '1.5rem',
    lineHeight: 1.8,
    fontSize: '0.95rem',
  },
  resumeEducation: {
    marginBottom: '1.5rem',
    position: 'relative',
    paddingLeft: '1.5rem',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '0.5rem',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#0047ab', // Royal blue
    },
  },
  resumeSubtitle: {
    fontWeight: 700,
    marginBottom: '0.25rem',
    color: '#2d3748',
    fontSize: '1.1rem',
  },
  resumeDate: {
    fontSize: '0.875rem',
    color: '#0047ab', // Royal blue
    fontWeight: 500,
    fontStyle: 'normal',
  },
  resumeSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    margin: '0.5rem 0',
  },
  resumeSkillChip: {
    backgroundColor: '#e6f0ff',
    color: '#0047ab', // Royal blue
    fontSize: '0.75rem',
    height: '28px',
    fontWeight: 600,
    border: 'none',
  },
  resumeItem: {
    marginBottom: '1.5rem',
    position: 'relative',
    paddingLeft: '1.5rem',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '0.5rem',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#0047ab', // Royal blue
    },
  },
  resumeItemSubtitle: {
    fontSize: '0.95rem',
    color: '#4a5568',
    marginBottom: '0.25rem',
  },
  resumeBullets: {
    paddingLeft: '1.25rem',
    margin: '0.5rem 0',
    listStyleType: 'square',
  },
  resumeBullet: {
    fontSize: '0.875rem',
    color: '#2d3748',
    marginBottom: '0.5rem',
    lineHeight: 1.6,
  },
  contactLink: {
    color: '#0047ab', // Royal blue
    textDecoration: 'none',
    fontWeight: 600,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
}));

export default useCreativeBlueStyles;