// src/components/landing/WhoIsItFor.jsx
import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { animate } from 'animejs';

const useStyles = makeStylesWithTheme((theme) => ({
  audienceSection: {
    background: '#fff',
    padding: '6rem 2rem',
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
    '@media (max-width: 960px)': {
      padding: '4rem 1.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '3rem 0.5rem',
    },
  },
  sectionTitle: {
    fontSize: '2.5rem !important',
    fontWeight: '800 !important',
    color: '#2A2B6A !important',
    textAlign: 'center',
    marginBottom: '40px !important',
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
  wheelContainer: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    margin: '0 auto',
    zIndex: 2,
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  wheel: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'nowrap',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '10%',
      right: '10%',
      top: '50%',
      height: '3px',
      background: '#FFC614',
      zIndex: 1,
      transform: 'translateY(-50%)',
    },
    '@media (max-width: 900px)': {
      gap: '1.5rem',
      '&::before': {
        left: '5%',
        right: '5%',
      },
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      gap: '1rem',
      '&::before': {
        left: '50%',
        right: 'auto',
        top: '10%',
        bottom: '10%',
        width: '3px',
        height: 'auto',
        transform: 'translateX(-50%)',
      },
    },
  },
  wheelItem: {
    position: 'relative',
    width: 180,
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    borderRadius: '50%',
    boxShadow: '0 4px 18px 0 rgba(42,43,106,0.10)',
    border: '3px solid #FFC614',
    transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s',
    cursor: 'pointer',
    padding: '16px',
    zIndex: 2,
    '&:hover': {
      transform: 'scale(1.08)',
      boxShadow: '0 8px 32px 0 #ffc61455, 0 0 0 4px #fff',
      borderColor: '#2A2B6A',
    },
    '@media (max-width: 900px)': {
      width: 130,
      height: 130,
      padding: '12px',
    },
    '@media (max-width: 600px)': {
      width: 90,
      height: 90,
      padding: '8px',
    },
  },
  wheelText: {
    fontSize: '1rem',
    color: '#2A2B6A',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.3,
    zIndex: 3,
    wordBreak: 'break-word',
    maxWidth: '100%',
    '@media (max-width: 900px)': {
      fontSize: '0.85rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.7rem',
    },
  },
  wheelCenter: {
    position: 'relative',
    width: 160,
    height: 160,
    background: 'radial-gradient(circle at 60% 40%, #FFC614 80%, #FFD95C 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
    boxShadow: '0 8px 32px 0 rgba(42,43,106,0.13)',
    border: '4px solid #fff',
    transform: 'none',
    left: 'auto',
    top: 'auto',
    '@media (max-width: 900px)': {
      width: 130,
      height: 130,
    },
    '@media (max-width: 600px)': {
      width: 90,
      height: 90,
    },
  },
  wheelCenterText: {
    color: '#2A2B6A',
    fontWeight: 700,
    fontSize: '1.2rem',
    textAlign: 'center',
    '@media (max-width: 900px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.7rem',
    },
  },
}));

const WhoIsItFor = () => {
  const classes = useStyles();
  const wheelRef = useRef();
  const [activeIdx, setActiveIdx] = React.useState(0);

  const targetAudience = [
    {
      text: "Students and freshers entering the job market"
    },
    {
      text: "Working professionals upgrading roles or switching careers"
    },
    {
      text: "Individuals with career gaps needing impactful resumes"
    },
    {
      text: "Tech enthusiasts wanting to showcase Gen AI & project skills"
    }
  ];

  // Cycle highlight effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % targetAudience.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [targetAudience.length]);

  return (
    <Box className={classes.audienceSection}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mb={4}>
          <Typography variant="h2" className={classes.sectionTitle}>
            Who is it <span>for?</span>
          </Typography>
        </Box>
        <Box className={classes.wheelContainer}>
          <Box className={classes.wheel} ref={wheelRef}>
            {targetAudience.slice(0, 2).map((audience, idx) => (
              <Box
                key={idx}
                className={classes.wheelItem}
                style={activeIdx === idx ? {
                  transform: 'scale(1.08)',
                  boxShadow: '0 8px 32px 0 #ffc61455, 0 0 0 4px #fff',
                  borderColor: '#2A2B6A'
                } : {}}
              >
                <Typography className={classes.wheelText}>{audience.text}</Typography>
              </Box>
            ))}
            <Box className={classes.wheelCenter}>
              <Typography className={classes.wheelCenterText}>
                Giga<br />Resume
              </Typography>
            </Box>
            {targetAudience.slice(2, 4).map((audience, idx) => (
              <Box
                key={idx + 2}
                className={classes.wheelItem}
                style={activeIdx === idx + 2 ? {
                  transform: 'scale(1.08)',
                  boxShadow: '0 8px 32px 0 #ffc61455, 0 0 0 4px #fff',
                  borderColor: '#2A2B6A'
                } : {}}
              >
                <Typography className={classes.wheelText}>{audience.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhoIsItFor;