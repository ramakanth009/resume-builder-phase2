// src/styles/previewStyles/twoColumnStyles.js
import makeStylesWithTheme from '../makeStylesAdapter';

const useTwoColumnStyles = makeStylesWithTheme((theme) => ({
  resumeContainer: {
    display: 'flex',
    gap: '1.5rem',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
  },
  leftColumn: {
    flex: '0 0 35%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  rightColumn: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  resumeHeader: {
    textAlign: 'left',
    marginBottom: '1rem',
  },
  resumeName: {
    fontSize: '2.2rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    lineHeight: 1.1,
  },
  resumeTitle: {
    fontSize: '1rem',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '1.5rem',
    fontWeight: 500,
  },
  resumeContact: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    marginBottom: '1.5rem',
  },
  resumeContactItem: {
    fontSize: '0.9rem',
    color: '#333333',
    lineHeight: 1.4,
  },
  resumeSection: {
    marginBottom: '1.5rem',
  },
  resumeSectionTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    marginBottom: '0.8rem',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    borderBottom: '2px solid #000000',
    paddingBottom: '0.3rem',
  },
  resumeSummary: {
    fontSize: '0.9rem',
    color: '#333333',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  resumeSkills: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  resumeSkillItem: {
    fontSize: '0.9rem',
    color: '#333333',
    lineHeight: 1.4,
  },
  resumeEducation: {
    marginBottom: '1rem',
  },
  resumeSubtitle: {
    fontWeight: 600,
    marginBottom: '0.2rem',
    color: '#000000',
    fontSize: '1rem',
  },
  resumeInstitution: {
    fontSize: '0.9rem',
    color: '#333333',
    marginBottom: '0.2rem',
  },
  resumeDate: {
    fontSize: '0.85rem',
    color: '#666666',
    fontStyle: 'italic',
  },
  resumeItem: {
    marginBottom: '1.2rem',
  },
  resumeItemTitle: {
    fontWeight: 600,
    marginBottom: '0.2rem',
    color: '#000000',
    fontSize: '0.95rem',
  },
  resumeItemSubtitle: {
    fontSize: '0.85rem',
    color: '#666666',
    marginBottom: '0.2rem',
    fontStyle: 'italic',
  },
  resumeItemDuration: {
    fontSize: '0.85rem',
    color: '#666666',
    marginBottom: '0.5rem',
    fontWeight: 500,
  },
  resumeBullets: {
    paddingLeft: '1rem',
    margin: '0.5rem 0',
    listStylePosition: 'outside',
    listStyleType: 'disc',
  },
  resumeBullet: {
    fontSize: '0.85rem',
    color: '#333333',
    marginBottom: '0.3rem',
    lineHeight: 1.5,
  },
  resumeSkillChip: {
    backgroundColor: 'transparent',
    color: '#333333',
    fontSize: '0.9rem',
    fontWeight: 400,
    display: 'block',
    padding: 0,
    margin: 0,
    border: 'none',
    textAlign: 'left',
  },
  aiSkillChip: {
    backgroundColor: 'transparent',
    color: '#333333',
    fontSize: '0.9rem',
    fontWeight: 500,
    display: 'block',
    padding: 0,
    margin: 0,
    border: 'none',
    textAlign: 'left',
  },
  contactLink: {
    color: '#000000',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  // Mobile responsive
  '@media (max-width: 960px)': {
    resumeContainer: {
      flexDirection: 'column',
      gap: '1rem',
      padding: '1.5rem',
    },
    leftColumn: {
      flex: 'none',
    },
    rightColumn: {
      flex: 'none',
    },
    resumeName: {
      fontSize: '1.8rem',
    },
  },
  '@media (max-width: 600px)': {
    resumeContainer: {
      padding: '1rem',
    },
    resumeName: {
      fontSize: '1.5rem',
    },
    resumeSectionTitle: {
      fontSize: '0.9rem',
    },
  },
}));

export default useTwoColumnStyles;