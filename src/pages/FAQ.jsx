import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #101138 0%, #1e1c44 50%, #2A2B6A 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  // Floating background elements
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255, 198, 20, 0.1) 0%, rgba(255, 198, 20, 0.05) 100%)',
    animation: '$float 8s ease-in-out infinite',
  },
  circle1: {
    width: '250px',
    height: '250px',
    top: '15%',
    left: '5%',
    animationDelay: '0s',
    '@media (max-width: 600px)': {
      width: '120px',
      height: '120px',
    },
  },
  circle2: {
    width: '180px',
    height: '180px',
    top: '70%',
    right: '10%',
    animationDelay: '3s',
    '@media (max-width: 600px)': {
      width: '90px',
      height: '90px',
    },
  },
  circle3: {
    width: '120px',
    height: '120px',
    bottom: '10%',
    left: '20%',
    animationDelay: '6s',
    '@media (max-width: 600px)': {
      width: '60px',
      height: '60px',
    },
  },
  "@keyframes float": {
    '0%, 100%': {
      transform: 'translateY(0) rotate(0deg)',
      opacity: 0.6,
    },
    '50%': {
      transform: 'translateY(-30px) rotate(180deg)',
      opacity: 1,
    },
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
    paddingTop: '120px',
    paddingBottom: '80px',
    '@media (max-width: 600px)': {
      paddingTop: '100px',
      paddingBottom: '60px',
    },
  },
  container: {
    maxWidth: '1000px !important',
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
    '@media (max-width: 600px)': {
      marginBottom: '3rem',
    },
  },
  title: {
    fontSize: '4rem',
    fontWeight: 900,
    marginBottom: '1.5rem',
    background: 'linear-gradient(45deg, #ffc615 30%, #ffffff 70%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 20px rgba(255, 198, 21, 0.3)',
    '@media (max-width: 960px)': {
      fontSize: '3.5rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '2.8rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '2.2rem',
    },
  },
  subtitle: {
    fontSize: '1.3rem',
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: 1.6,
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
  },
  faqContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  faqBox: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(255, 198, 21, 0.1)',
    border: '1px solid rgba(255, 198, 21, 0.2)',
    transition: 'all 0.4s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 10px 25px rgba(255, 198, 21, 0.2)',
      border: '1px solid rgba(255, 198, 21, 0.4)',
    },
  },
  accordion: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
    border: 'none !important',
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: '0 !important',
    },
  },
  accordionSummary: {
    backgroundColor: 'rgba(255, 198, 21, 0.1)',
    padding: '1.5rem 2rem',
    minHeight: '80px !important',
    borderRadius: '20px 20px 0 0',
    transition: 'all 0.3s ease',
    '&.Mui-expanded': {
      backgroundColor: 'rgba(255, 198, 21, 0.15)',
      borderRadius: '20px 20px 0 0',
    },
    '& .MuiAccordionSummary-content': {
      margin: '0 !important',
      '&.Mui-expanded': {
        margin: '0 !important',
      },
    },
    '@media (max-width: 600px)': {
      padding: '1.2rem 1.5rem',
    },
  },
  question: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#27286c',
    lineHeight: 1.4,
    '@media (max-width: 600px)': {
      fontSize: '1.1rem',
    },
  },
  accordionDetails: {
    backgroundColor: '#ffffff',
    padding: '2rem 2rem 2.5rem 2rem !important',
    borderRadius: '0 0 20px 20px',
    '@media (max-width: 600px)': {
      padding: '1.5rem 1.5rem 2rem 1.5rem !important',
    },
  },
  answer: {
    fontSize: '1.1rem',
    color: '#2a2b6a',
    lineHeight: 1.8,
    textAlign: 'justify',
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
  expandIcon: {
    color: '#27286c',
    fontSize: '2rem !important',
    transition: 'all 0.3s ease',
    '&.Mui-expanded': {
      color: '#ffc615',
      transform: 'rotate(180deg)',
    },
  },
  decorativeElement: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    background: 'linear-gradient(45deg, rgba(255, 198, 21, 0.1), rgba(255, 198, 21, 0.05))',
    borderRadius: '50%',
    top: '50%',
    right: '-50px',
    transform: 'translateY(-50%)',
    zIndex: -1,
  },
}));

const FAQ = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const faqData = [
    {
      question: "What are the best resume templates for freshers available on Gigaversity Resume Builder?",
      answer: "Gigaversity offers a variety of professional, recruiter-approved resume templates designed specifically for freshers. These templates follow the perfect resume format for freshers, ensuring a clean, modern look that highlights your skills, projects, and education while being fully ATS-friendly."
    },
    {
      question: "How does Gigaversity's free resume builder help create ATS-friendly resumes?",
      answer: "Our free resume builder uses expert-designed templates tested for compatibility with leading Applicant Tracking Systems (ATS). This ensures your resume passes through automated screening bots and reaches recruiters, increasing your chances of getting noticed and shortlisted."
    },
    {
      question: "Can I use Gigaversity Resume Builder to switch careers or update my professional resume?",
      answer: "Yes! Gigaversity Resume Builder is perfect for professionals aiming to upgrade roles or make a career switch. It offers smart content suggestions, project recommendations, and flexible templates tailored to showcase your evolving skills and experience."
    },
    {
      question: "How can I build portfolio-ready projects directly from my resume on Gigaversity?",
      answer: "Gigaversity Resume Builder recommends projects based on your target role—whether it's full stack development, data science, UI/UX, or product management. With one click, you can access our GitHub repository featuring real-time projects, step-by-step guides, and code, allowing you to build and showcase hands-on experience straight from your resume."
    },
    {
      question: "How does Gigaversity help me showcase my Gen AI skills on my resume?",
      answer: "Our AI engine suggests relevant Gen AI tools like ChatGPT, Midjourney, Figma AI, Claude, Bard, and DALL·E tailored to your profile. You can add detailed descriptions of how you've used these tools in real-world projects, helping recruiters see your proficiency with cutting-edge AI technologies."
    },
    {
      question: "Can Gigaversity recommend AI-powered projects that match my skills and career goals?",
      answer: "Yes! Based on your profile and target job role, Gigaversity's resume builder smartly recommends AI-powered and other industry-relevant projects that you can build step-by-step. This feature helps you gain practical experience and strengthens your resume with projects aligned to your career ambitions."
    },
    {
      question: "Is the Gigaversity Resume Builder suitable for professionals with career gaps?",
      answer: "Absolutely. Our resume builder helps you craft impactful resumes that highlight your skills, projects, and growth, making it ideal for individuals with career gaps who want to re-enter the job market confidently."
    },
    {
      question: "Are Gigaversity's resume templates recruiter-approved and optimized for top ATS tools?",
      answer: "Yes, every template is designed with input from recruiters and thoroughly tested to ensure compatibility with leading ATS software. This increases your chances of passing automated screenings and getting your resume seen by hiring managers."
    }
  ];

  return (
    <Box className={classes.root}>
      {/* Background Elements */}
      <Box className={classes.backgroundElements}>
        <Box className={`${classes.floatingCircle} ${classes.circle1}`} />
        <Box className={`${classes.floatingCircle} ${classes.circle2}`} />
        <Box className={`${classes.floatingCircle} ${classes.circle3}`} />
      </Box>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box className={classes.contentContainer}>
        <Container className={classes.container}>
          <Box className={classes.header}>
            <Typography variant="h1" className={classes.title}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" className={classes.subtitle}>
              Find answers to common questions about Gigaversity Resume Builder and discover how our AI-powered platform can transform your career journey
            </Typography>
          </Box>

          <Box className={classes.faqContainer}>
            {faqData.map((faq, index) => (
              <Box key={index} className={classes.faqBox} style={{ position: 'relative' }}>
                <Accordion className={classes.accordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                    className={classes.accordionSummary}
                  >
                    <Typography className={classes.question}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordionDetails}>
                    <Typography className={classes.answer}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Box className={classes.decorativeElement} />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default FAQ;