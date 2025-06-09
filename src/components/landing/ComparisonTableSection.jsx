import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { CheckCircle, Cancel, Warning } from '@mui/icons-material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    padding: '6rem 2rem',
    background: 'linear-gradient(135deg, #1a1a4a 0%, #2d3748 100%)',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 960px)': {
      padding: '4rem 1.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '3rem 1rem',
    },
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: 'white',
    textAlign: 'center',
    marginBottom: '3rem',
    '@media (max-width: 960px)': {
      fontSize: '2rem',
      marginBottom: '2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.8rem',
    },
  },
  tableContainer: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '2rem',
  },
  tableHead: {
    background: 'linear-gradient(135deg, rgba(255, 198, 20, 0.1) 0%, rgba(255, 198, 20, 0.05) 100%)',
  },
  headerCell: {
    color: 'white',
    fontWeight: 700,
    fontSize: '1.1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1.5rem 1rem',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      padding: '1rem 0.5rem',
    },
  },
  tableRow: {
    '&:nth-of-type(even)': {
      background: 'rgba(255, 255, 255, 0.02)',
    },
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.05)',
    },
  },
  tableCell: {
    color: '#e2e8f0',
    fontSize: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '1.25rem 1rem',
    '@media (max-width: 600px)': {
      fontSize: '0.85rem',
      padding: '1rem 0.5rem',
    },
  },
  featureCell: {
    fontWeight: 500,
    color: 'white',
  },
  iconCell: {
    textAlign: 'center',
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
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: 500,
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
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 0.1,
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255, 198, 20, 0.1) 0%, rgba(255, 198, 20, 0.05) 100%)',
  },
  circle1: {
    width: '250px',
    height: '250px',
    top: '-50px',
    left: '-50px',
  },
  circle2: {
    width: '180px',
    height: '180px',
    bottom: '-40px',
    right: '-40px',
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
      <Box className={classes.backgroundDecor}>
        <Box className={`${classes.decorCircle} ${classes.circle1}`} />
        <Box className={`${classes.decorCircle} ${classes.circle2}`} />
      </Box>
      
      <Box className={classes.container}>
        <Typography className={classes.title}>
          Why Giga Resume Builder Stands Out
        </Typography>

        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.headerCell}>Feature</TableCell>
                <TableCell className={classes.headerCell} align="center">Giga Resume Builder</TableCell>
                <TableCell className={classes.headerCell} align="center">Other Resume Builders</TableCell>
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

        <Box className={classes.ctaContainer}>
          <Typography className={classes.ctaText}>
            Access All these features for Free
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ComparisonTableSection;