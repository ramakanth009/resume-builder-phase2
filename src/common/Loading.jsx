import React, { useState, useEffect } from 'react';
import makeStylesWithTheme from '../styles/makeStylesAdapter';
import { CircularProgress, Typography, Box, Fade } from '@mui/material';
import GigaLogo from '../assets/giga-loogo.svg';

const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '1rem',
  },
  logoContainer: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  logo: {
    width: '80px',
    height: '80px',
  },
  logoText: {
    fontWeight: 700,
    color: '#2d3748',
    marginTop: '0.5rem',
  },
  progress: {
    color: '#3182ce',
    marginBottom: '2rem',
  },
  quoteContainer: {
    maxWidth: '600px',
    textAlign: 'center',
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 2rem auto',
  },
  quote: {
    color: '#4a5568',
    fontStyle: 'italic',
    fontSize: '1.1rem',
    lineHeight: 1.6,
  },
  author: {
    color: '#718096',
    marginTop: '0.5rem',
    fontSize: '0.9rem',
  },
  message: {
    color: '#718096',
    marginTop: '1rem',
    fontSize: '1rem',
  },
}));

// Array of inspirational quotes about resumes, career, and job search
const quotes = [
  {
    text: "Your resume is the bridge between your qualifications and your career aspirations.",
    author: "Career Coach"
  },
  {
    text: "The best resume tells a story about your professional journey and where you want to go next.",
    author: "Resume Expert"
  },
  {
    text: "A well-crafted resume opens doors to opportunities you never knew existed.",
    author: "Hiring Manager"
  },
  {
    text: "Your resume is not just a document; it's your personal marketing tool.",
    author: "Marketing Professional"
  },
  {
    text: "The secret to a great resume is not just listing what you did, but showcasing what you achieved.",
    author: "Recruitment Specialist"
  },
  {
    text: "A resume should be a reflection of your professional self – authentic, clear, and compelling.",
    author: "HR Director"
  },
  {
    text: "Your skills and experiences are unique. Make sure your resume highlights what makes you stand out.",
    author: "Career Advisor"
  },
  {
    text: "The best investment you can make in your job search is time spent perfecting your resume.",
    author: "Job Search Strategist"
  },
  {
    text: "A resume is a living document that grows and evolves with your career.",
    author: "Professional Developer"
  },
  {
    text: "Your resume should answer one question: Why are you the perfect fit for this role?",
    author: "Hiring Expert"
  },
  {
    text: "The goal of a resume is not to get you a job, but to get you an interview.",
    author: "Career Counselor"
  },
  {
    text: "A strong resume doesn't just tell; it shows through concrete achievements and numbers.",
    author: "Resume Writer"
  }
];

const Loading = ({ message = 'Loading...' }) => {
  const classes = useStyles();
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Select 2-3 random quotes on component mount
  useEffect(() => {
    const numQuotes = Math.floor(Math.random() * 2) + 2; // 2-3 quotes
    const shuffled = [...quotes].sort(() => 0.5 - Math.random());
    setSelectedQuotes(shuffled.slice(0, numQuotes));
  }, []);

  // Rotate through the selected quotes with fade animation
  useEffect(() => {
    if (selectedQuotes.length > 0) {
      const intervalId = setInterval(() => {
        setFadeIn(false);
        
        setTimeout(() => {
          setCurrentQuoteIndex((prevIndex) => 
            (prevIndex + 1) % selectedQuotes.length
          );
          setFadeIn(true);
        }, 500);
      }, 6000); // Change quote every 6 seconds
      
      return () => clearInterval(intervalId);
    }
  }, [selectedQuotes]);

  // Current quote to display
  const currentQuote = selectedQuotes[currentQuoteIndex] || {
    text: "Creating your professional future...",
    author: "Resume Builder"
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.logoContainer}>
        <img src={GigaLogo} alt="Gigaversity Logo" className={classes.logo} />
        <Typography variant="h6" className={classes.logoText}>
          Gigaversity
        </Typography>
      </Box>
      
      <CircularProgress size={60} thickness={4} className={classes.progress} />
      
      <Box className={classes.quoteContainer}>
        <Fade in={fadeIn} timeout={500}>
          <Box>
            <Typography variant="body1" className={classes.quote}>
              "{currentQuote.text}"
            </Typography>
            <Typography variant="body2" className={classes.author}>
              — {currentQuote.author}
            </Typography>
          </Box>
        </Fade>
      </Box>
      
      <Typography variant="h6" className={classes.message}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;