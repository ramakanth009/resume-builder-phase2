import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    padding: '3rem 0 1rem 0',
    marginTop: 'auto',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '2rem',
    marginBottom: '2rem',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      gap: '2rem',
    },
  },
  brandSection: {
    flex: '1 1 300px',
    maxWidth: '350px',
  },
  brandTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '1rem',
    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  brandDescription: {
    fontSize: '0.9rem',
    color: '#b0b0b0',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
  },
  socialIcon: {
    fontSize: '1.5rem',
    color: '#b0b0b0',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#667eea',
    },
  },
  footerSection: {
    flex: '1 1 200px',
    minWidth: '150px',
  },
  footerTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#ffffff',
  },
  footerLink: {
    display: 'block',
    color: '#b0b0b0',
    textDecoration: 'none',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      color: '#667eea',
      textDecoration: 'underline',
    },
  },
  footerBottom: {
    borderTop: '1px solid #333',
    paddingTop: '1rem',
    textAlign: 'center',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box component="footer" className={classes.footer}>
      <Container maxWidth="lg">
        <Box className={classes.footerContent}>
          <Box className={classes.brandSection}>
            <Typography className={classes.brandTitle}>
              Giga Resume Builder
            </Typography>
            <Typography className={classes.brandDescription}>
              Get noticed by recruiters and land your dream job.
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
            <Link 
              component={RouterLink} 
              to="/faq" 
              className={classes.footerLink}
            >
              FAQ
            </Link>
          </Box>
          
          <Box className={classes.footerSection}>
            <Typography className={classes.footerTitle}>
              Company
            </Typography>
            <Link 
              component={RouterLink} 
              to="/about" 
              className={classes.footerLink}
            >
              About Us
            </Link>
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