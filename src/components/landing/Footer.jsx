// src/components/landing/Footer.jsx
import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  footer: {
    backgroundColor: '#1a1b4a',
    color: 'white',
    padding: '60px 0 20px',
    '@media (max-width: 960px)': {
      padding: '40px 0 15px',
    },
    '@media (max-width: 600px)': {
      padding: '30px 0 10px',
    },
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    marginBottom: '40px',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '30px',
      marginBottom: '30px',
    },
  },
  footerSection: {
    flex: 1,
    '@media (max-width: 960px)': {
      textAlign: 'center',
    },
  },
  footerTitle: {
    fontSize: '1.3rem !important',
    fontWeight: 'bold !important',
    color: '#FFC614 !important',
    marginBottom: '20px !important',
    '@media (max-width: 600px)': {
      fontSize: '1.2rem !important',
      marginBottom: '15px !important',
    },
  },
  footerLink: {
    color: 'rgba(255, 255, 255, 0.8) !important',
    textDecoration: 'none !important',
    fontSize: '0.95rem !important',
    display: 'block',
    marginBottom: '10px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#FFC614 !important',
    },
  },
  socialLinks: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px',
    '@media (max-width: 960px)': {
      justifyContent: 'center',
    },
  },
  socialIcon: {
    color: 'rgba(255, 255, 255, 0.8) !important',
    fontSize: '1.5rem !important',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#FFC614 !important',
    },
  },
  footerBottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '20px',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.9rem',
    '@media (max-width: 600px)': {
      paddingTop: '15px',
      fontSize: '0.85rem',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <Box className={classes.footerContent}>
          <Box className={classes.footerSection}>
            <Typography className={classes.footerTitle}>
              Gigaversity Resume
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
              Build professional, ATS-friendly resumes with AI assistance. Get noticed by recruiters and land your dream job.
            </Typography>
            <Box className={classes.socialLinks}>
              <FacebookIcon className={classes.socialIcon} />
              <TwitterIcon className={classes.socialIcon} />
              <LinkedInIcon className={classes.socialIcon} />
              <InstagramIcon className={classes.socialIcon} />
            </Box>
          </Box>
          
          <Box className={classes.footerSection}>
            <Typography className={classes.footerTitle}>
              Product
            </Typography>
            {/* <Link href="#templates" className={classes.footerLink}>Resume Templates</Link> */}
            <Link href="#builder" className={classes.footerLink}>Resume Builder</Link>
            <Link href="#examples" className={classes.footerLink}>Resume Examples</Link>
            <Link href="#tips" className={classes.footerLink}>Resume Tips</Link>
          </Box>
          
          <Box className={classes.footerSection}>
            <Typography className={classes.footerTitle}>
              Resources
            </Typography>
            <Link href="#blog" className={classes.footerLink}>Blog</Link>
            <Link href="#guides" className={classes.footerLink}>Career Guides</Link>
            <Link href="#help" className={classes.footerLink}>Help Center</Link>
            <Link href="#faq" className={classes.footerLink}>FAQ</Link>
          </Box>
          
          <Box className={classes.footerSection}>
            <Typography className={classes.footerTitle}>
              Company
            </Typography>
            <Link href="#about" className={classes.footerLink}>About Us</Link>
            <Link href="#contact" className={classes.footerLink}>Contact</Link>
            <Link href="#privacy" className={classes.footerLink}>Privacy Policy</Link>
            <Link href="#terms" className={classes.footerLink}>Terms of Service</Link>
          </Box>
        </Box>
        
        <Box className={classes.footerBottom}>
          <Typography variant="body2">
            © 2025 Gigaversity Resume Builder. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;