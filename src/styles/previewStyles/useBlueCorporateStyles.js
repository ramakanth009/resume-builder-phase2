// src/styles/previewStyles/blueCorporateStyles.js
import makeStylesWithTheme from '../makeStylesAdapter';

const useBlueCorporateStyles = makeStylesWithTheme((theme) => ({
  resumeHeader: {
    marginBottom: '2rem',
    textAlign: 'center',
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '2rem 1rem',
    borderRadius: '0',
  },
  resumeName: {
    fontSize: '3.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    lineHeight: 1.1,
  },
  resumeTitle: {
    fontSize: '1.3rem',
    color: '#bfdbfe',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '1.5rem',
    fontWeight: 400,
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '0.5rem',
    display: 'inline-block',
  },
  resumeContact: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
    fontSize: '0.9rem',
    color: '#e5e7eb',
  },
  resumeContactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
  },
  resumeSection: {
    marginBottom: '2rem',
  },
  resumeSectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#1e3a8a',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    borderBottom: '2px solid #1e3a8a',
    paddingBottom: '0.5rem',
    display: 'inline-block',
  },
  resumeSummary: {
    fontSize: '0.95rem',
    color: '#374151',
    lineHeight: 1.7,
    textAlign: 'justify',
    backgroundColor: '#eff6ff',
    padding: '1.5rem',
    borderRadius: '4px',
    borderLeft: '4px solid #3b82f6',
  },
  resumeEducation: {
    marginBottom: '1.5rem',
    backgroundColor: '#f8fafc',
    padding: '1rem',
    borderRadius: '4px',
    borderLeft: '3px solid #64748b',
  },
  resumeSubtitle: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: '#1e293b',
    fontSize: '1rem',
  },
  resumeInstitution: {
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: '0.25rem',
  },
  resumeDate: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    fontWeight: 500,
  },
  resumeSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  resumeSkillChip: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontSize: '0.85rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: '1px solid #93c5fd',
    fontWeight: 500,
  },
  aiSkillChip: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    fontSize: '0.85rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontWeight: 600,
  },
  resumeItem: {
    marginBottom: '1.5rem',
    backgroundColor: '#f8fafc',
    padding: '1.25rem',
    borderRadius: '4px',
    borderLeft: '4px solid #3b82f6',
  },
  resumeItemTitle: {
    fontWeight: 600,
    marginBottom: '0.25rem',
    color: '#1e293b',
    fontSize: '1rem',
  },
  resumeItemSubtitle: {
    fontSize: '0.9rem',
    color: '#64748b',
    marginBottom: '0.25rem',
    fontStyle: 'italic',
  },
  resumeItemDuration: {
    fontSize: '0.85rem',
    color: '#94a3b8',
    marginBottom: '0.75rem',
    fontWeight: 500,
  },
  resumeBullets: {
    paddingLeft: '1.5rem',
    margin: '0.75rem 0',
    listStylePosition: 'outside',
    listStyleType: 'disc',
  },
  resumeBullet: {
    fontSize: '0.9rem',
    color: '#374151',
    marginBottom: '0.5rem',
    lineHeight: 1.6,
  },
  resumeKeySkills: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    backgroundColor: '#dbeafe',
    padding: '1.5rem',
    borderRadius: '4px',
  },
  resumeKeySkillsTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#1e40af',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  resumeKeySkillItem: {
    fontSize: '0.9rem',
    color: '#1e40af',
    fontWeight: 500,
    padding: '0.25rem 0',
    borderBottom: '1px solid #93c5fd',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  resumeAwards: {
    backgroundColor: '#fef3c7',
    padding: '1.5rem',
    borderRadius: '4px',
    borderLeft: '4px solid #f59e0b',
  },
  resumeAwardsTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#92400e',
    textTransform: 'uppercase',
    marginBottom: '1rem',
  },
  resumeAwardItem: {
    fontSize: '0.9rem',
    color: '#92400e',
    fontWeight: 500,
    padding: '0.25rem 0',
    borderBottom: '1px solid #fbbf24',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  contactLink: {
    color: '#e5e7eb',
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      color: 'white',
      textDecoration: 'underline',
    },
  },
  // Mobile responsive
  '@media (max-width: 960px)': {
    resumeName: {
      fontSize: '2.8rem',
    },
    resumeTitle: {
      fontSize: '1.1rem',
    },
    resumeContact: {
      gap: '1rem',
    },
    resumeContactItem: {
      padding: '0.4rem 0.8rem',
    },
  },
  '@media (max-width: 600px)': {
    resumeName: {
      fontSize: '2.2rem',
      letterSpacing: '0.1em',
    },
    resumeTitle: {
      fontSize: '1rem',
    },
    resumeContact: {
      flexDirection: 'column',
      gap: '0.5rem',
    },
    resumeSummary: {
      padding: '1rem',
    },
    resumeItem: {
      padding: '1rem',
    },
  },
}));

export default useBlueCorporateStyles;