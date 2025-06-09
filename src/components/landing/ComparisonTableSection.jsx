import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { CheckCircle, Cancel, Warning } from '@mui/icons-material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    padding: '2rem 2rem',
    background: '#fff',
    position: 'relative',
    overflow: 'hidden',
    // Add SVG grid background as ::before
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
      background: `url("data:image/svg+xml,%3Csvg width='800' height='600' viewBox='0 0 800 600' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L100 80L200 40L300 120L400 60L500 140L600 100L700 180L800 120' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M0 200L100 120L200 180L300 100L400 160L500 80L600 140L700 60L800 100' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M0 400L100 320L200 380L300 300L400 360L500 280L600 340L700 260L800 300' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M0 600L100 520L200 580L300 500L400 560L500 480L600 540L700 460L800 500' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M0 0L0 200L0 400L0 600' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M100 80L100 120L100 320L100 520' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M200 40L200 180L200 380L200 580' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M300 120L300 100L300 300L300 500' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M400 60L400 160L400 360L400 560' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M500 140L500 80L500 280L500 480' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M600 100L600 140L600 340L600 540' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M700 180L700 60L700 260L700 460' stroke='%23F3F3F3' stroke-width='1'/%3E%3Cpath d='M800 120L800 100L800 300L800 500' stroke='%23F3F3F3' stroke-width='1'/%3E%3C/svg%3E") repeat`,
      backgroundSize: 'cover',
      pointerEvents: 'none',
      opacity: 1,
    },
    zIndex: 1,
    '@media (max-width: 1200px)': {
      padding: '5rem 1.5rem',
    },
    '@media (max-width: 960px)': {
      padding: '4rem 1rem',
    },
    '@media (max-width: 600px)': {
      padding: '2.5rem 0.5rem',
    },
    '@media (max-width: 480px)': {
      padding: '1.5rem 0.2rem',
    },
    '@media (max-width: 375px)': {
      padding: '1rem 0.1rem',
    },
  },
  container: {
    maxWidth: '1400px',
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
    '@media (max-width: 1200px)': {
      maxWidth: '1000px',
    },
    '@media (max-width: 960px)': {
      maxWidth: '100%',
      padding: '0 0.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '0',
    },
    '@media (max-width: 480px)': {
      padding: '0',
    },
    '@media (max-width: 375px)': {
      padding: '0',
    },
  },
  title: {
    // Match WhyUseSection.jsx sectionTitle styles
    fontSize: '2.5rem !important',
    fontWeight: '800 !important',
    color: '#2A2B6A !important',
    textAlign: 'center',
    marginBottom: '10px !important',
    background: '#fff',
    borderRadius: '18px',
    display: 'inline-block',
    padding: '18px 36px',
    position: 'relative',
    zIndex: 2,
    '& span': {
      color: '#FFC614 !important',
    },
    '@media (max-width: 960px)': {
      fontSize: '2rem !important',
      marginBottom: '30px !important',
      padding: '14px 20px',
    },
    '@media (max-width: 600px)': {
      padding: '10px 8px',
      borderRadius: '12px',
    },
  },
  tableContainer: {
    background: '#fff',
    borderRadius: '18px',
    overflow: 'hidden',
    marginBottom: '2rem',
    boxShadow: '0 6px 32px 0 rgba(0,0,0,0.10)',
    border: '1px solid #e5e7eb',
    transition: 'box-shadow 0.2s',
    '&:hover': {
      boxShadow: '0 10px 40px 0 rgba(0,0,0,0.13)',
    },
  },
  tableHead: {
    background: 'linear-gradient(90deg, #f9fafb 60%, #ffe082 100%)',
  },
  headerCell: {
    color: '#1a202c',
    fontWeight: 700,
    fontSize: '1.1rem',
    borderBottom: '2px solid #e5e7eb',
    padding: '1.25rem 1rem',
    textAlign: 'left',
    background: 'transparent',
    '@media (max-width: 600px)': {
      fontSize: '0.95rem',
      padding: '1rem 0.5rem',
    },
  },
  tableRow: {
    '&:nth-of-type(even)': {
      background: '#f7fafc',
    },
    '&:hover': {
      background: '#fffde7',
    },
    transition: 'background 0.2s',
  },
  tableCell: {
    color: '#374151',
    fontSize: '1rem',
    borderBottom: '1px solid #e5e7eb',
    padding: '1.1rem 1rem',
    textAlign: 'left',
    verticalAlign: 'middle',
    '@media (max-width: 600px)': {
      fontSize: '0.85rem',
      padding: '1rem 0.5rem',
    },
  },
  featureCell: {
    fontWeight: 500,
    color: '#1a202c',
  },
  iconCell: {
    textAlign: 'left',
    minWidth: 180,
  },
  successIcon: {
    color: '#10b981',
    fontSize: '1.5rem',
  },
  errorIcon: {
    color: '#ef4444',
    fontSize: '1.5rem',
  },
  warningIcon: {
    color: '#f59e0b',
    fontSize: '1.5rem',
  },
  statusText: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 500,
    fontSize: '1rem',
  },
  successText: {
    color: '#10b981',
  },
  errorText: {
    color: '#ef4444',
  },
  warningText: {
    color: '#f59e0b',
  },
  ctaContainer: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  ctaText: {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#ffc614',
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
  },
  backgroundDecor: {
    display: 'none', // Hide old decor circles, background now handled by ::before
  },
}));

const comparisonData = [
  {
    feature: 'Gen AI Skill Recommendations',
    giga: { status: 'success', text: 'Yes' },
    others: { status: 'error', text: 'No' }
  },
  {
    feature: 'Real-Time Project Suggestions',
    giga: { status: 'success', text: 'Yes' },
    others: { status: 'error', text: 'No' }
  },
  {
    feature: 'ATS Compatibility Tested',
    giga: { status: 'success', text: 'Yes' },
    others: { status: 'warning', text: 'Limited' }
  },
  {
    feature: 'Free to Use',
    giga: { status: 'success', text: '100% Free' },
    others: { status: 'warning', text: 'Limited Access' }
  },
  {
    feature: 'One-Click GitHub Projects',
    giga: { status: 'success', text: 'Yes' },
    others: { status: 'error', text: 'No' }
  },
  {
    feature: 'Built for Freshers & Tech Roles',
    giga: { status: 'success', text: 'Specifically Designed' },
    others: { status: 'warning', text: 'Generic' }
  }
];

const ComparisonTableSection = () => {
  const classes = useStyles();

  const renderStatusCell = (item) => {
    const { status, text } = item;
    let icon, textClass;
    
    switch (status) {
      case 'success':
        icon = <CheckCircle className={classes.successIcon} />;
        textClass = classes.successText;
        break;
      case 'error':
        icon = <Cancel className={classes.errorIcon} />;
        textClass = classes.errorText;
        break;
      case 'warning':
        icon = <Warning className={classes.warningIcon} />;
        textClass = classes.warningText;
        break;
      default:
        icon = null;
        textClass = '';
    }

    return (
      <Box className={classes.statusText}>
        {icon}
        <Typography className={textClass} component="span">
          {text}
        </Typography>
      </Box>
    );
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mb={4}>
          <Typography className={classes.title}>
            Why Use <span>Giga Resume Builder?</span>
          </Typography>
        </Box>

        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.headerCell}>Feature</TableCell>
                <TableCell className={classes.headerCell}>Giga Resume Builder</TableCell>
                <TableCell className={classes.headerCell}>Other Resume Builders</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index} className={classes.tableRow}>
                  <TableCell className={`${classes.tableCell} ${classes.featureCell}`}>
                    {row.feature}
                  </TableCell>
                  <TableCell className={`${classes.tableCell} ${classes.iconCell}`}>
                    {renderStatusCell(row.giga)}
                  </TableCell>
                  <TableCell className={`${classes.tableCell} ${classes.iconCell}`}>
                    {renderStatusCell(row.others)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <Box className={classes.ctaContainer}>
          <Typography className={classes.ctaText}>
            Access All these features for Free
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

export default ComparisonTableSection;