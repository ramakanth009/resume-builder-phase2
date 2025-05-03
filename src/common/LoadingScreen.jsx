import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Fade, 
  Snackbar, 
  Alert,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import GigaLogo from '../assets/giga-loogo.svg';
import { useAuth } from '../contexts/AuthContext';

// Enhanced color palette
const colors = {
  primary: {
    main: '#3182ce',
    light: '#ebf8ff',
    dark: '#2b6cb0',
  },
  secondary: {
    main: '#4fd1c5',
    light: '#e6fffa',
    dark: '#319795',
  },
  text: {
    primary: '#2d3748',
    secondary: '#718096',
    light: '#ffffff',
  },
  background: {
    default: '#f9f9f9',
    paper: '#ffffff',
    overlay: 'rgba(49, 130, 206, 0.05)',
  },
  error: '#e53e3e',
  success: '#38a169',
  accent: '#805ad5',
};

// 12 engaging quotes/tips about resumes and careers
const resumeTips = [
  {
    text: "A well-designed resume increases your interview chances by 71%.",
    author: "Career Development Institute"
  },
  {
    text: "Recruiters spend an average of 7.4 seconds scanning a resume. Make yours count!",
    author: "Hiring Psychology Study"
  },
  {
    text: "Tailoring your resume to each job application increases response rates by 60%.",
    author: "Job Market Research"
  },
  {
    text: "Quantify your achievements with numbers—they grab attention and demonstrate impact.",
    author: "Resume Strategy"
  },
  {
    text: "95% of large companies use ATS systems. Use ATS-friendly templates to ensure your resume gets seen.",
    author: "Recruitment Technology Report"
  },
  {
    text: "The secret to getting ahead is getting started. Your resume is step one.",
    author: "Mark Twain"
  },
  {
    text: "Your resume is a marketing document, not an autobiography. Sell your value proposition.",
    author: "Personal Branding Expert"
  },
  {
    text: "Action verbs like 'Achieved,' 'Implemented,' and 'Led' create more engaging bullet points.",
    author: "Communication Specialist"
  },
  {
    text: "Keep your resume to one page for early career positions. Brevity with impact is key.",
    author: "Career Coach"
  },
  {
    text: "Students with professional resumes receive 68% more responses from internship applications.",
    author: "University Career Research"
  },
  {
    text: "A consistent visual hierarchy in your resume helps recruiters find the information they need quickly.",
    author: "UX Design for Resumes"
  },
  {
    text: "Overcome the 'experience gap' by highlighting relevant coursework, projects, and volunteer work.",
    author: "Student Career Center"
  }
];

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: colors.background.default,
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundShape: {
    position: 'absolute',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colors.primary.light} 0%, ${colors.secondary.light} 100%)`,
    opacity: 0.5,
    filter: 'blur(40px)',
    zIndex: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '500px',
    padding: '2.5rem',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
    backgroundColor: colors.background.paper,
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: '2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '60px',
    height: '60px',
    marginBottom: '1rem',
  },
  logoText: {
    fontWeight: 700,
    color: colors.text.primary,
    fontSize: '1.5rem',
  },
  progressContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '1rem',
  },
  progressBackground: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colors.primary.light} 0%, ${colors.secondary.light} 100%)`,
    opacity: 0.3,
  },
  progress: {
    color: colors.primary.main,
  },
  message: {
    color: colors.text.primary,
    fontSize: '1.1rem',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '2rem',
  },
  quoteContainer: {
    padding: '1.5rem',
    borderRadius: '1rem',
    backgroundColor: colors.background.overlay,
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)',
  },
  quoteHeader: {
    color: colors.primary.main,
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  quoteIcon: {
    color: colors.secondary.main,
    fontSize: '1.2rem',
  },
  quote: {
    color: colors.text.secondary,
    fontSize: '0.9rem',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '0.75rem',
    margin: '0.5rem 0',
    borderRadius: '0.5rem',
    backgroundColor: colors.background.paper,
    border: `1px solid ${colors.background.overlay}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
      transform: 'translateY(-2px)',
    },
  },
  quoteAuthor: {
    color: colors.text.primary,
    fontSize: '0.8rem',
    fontWeight: 600,
    textAlign: 'right',
    marginTop: '0.5rem',
  },
  errorMessage: {
    color: colors.error,
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: 500,
  },
  alertRoot: {
    width: '100%',
    '& .MuiAlert-message': {
      width: '100%',
    }
  },
  progressText: {
    position: 'absolute',
    color: colors.primary.dark,
    fontWeight: 700,
    fontSize: '0.8rem',
  },
}));

/**
 * Enhanced LoadingScreen component with caching and improved login handling
 */
const LoadingScreen = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, login } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dots, setDots] = useState('');
  const [currentQuotes, setCurrentQuotes] = useState([]);
  const [progress, setProgress] = useState(0);
  
  // Get the destination and login data from location state
  const destination = location.state?.destination || '/resume-builder';
  const loginData = location.state?.loginData;
  
  // Handle error display
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });
  
  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
  };
  
  // Add animated dots to loading message
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate progress percentage
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.random() * 8, 100);
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  // Cycle through quotes - one at a time
  useEffect(() => {
    // Helper to get a single random quote
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * resumeTips.length);
      return [resumeTips[randomIndex]]; // Return as array with single item for compatibility
    };
    
    // Set initial quote
    setCurrentQuotes(getRandomQuote());
    
    // Cycle quotes every 6 seconds
    const interval = setInterval(() => {
      setCurrentQuotes(getRandomQuote());
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle login if credentials are provided - with deduplication
  useEffect(() => {
    let timer;
    
    const performLogin = async () => {
      if (loginData) {
        try {
          // Check if user is already logged in
          if (currentUser) {
            // If already logged in, just redirect to destination
            timer = setTimeout(() => {
              navigate(destination, { replace: true });
            }, 1500);
            return;
          }
          
          try {
            await login(loginData.email, loginData.password);
            // Successful login - redirect after a brief delay 
            timer = setTimeout(() => {
              navigate(destination, { replace: true });
            }, 2000);
          } catch (err) {
            // Log error but continue with navigation
            console.log("Login failed, redirecting anyway:", err.message);
            
            // Still redirect to destination after a delay
            timer = setTimeout(() => {
              navigate(destination, { replace: true });
            }, 2500);
          }
        } catch (e) {
          // Catch any other unexpected errors but don't display them
          console.error("Error in login process:", e);
          
          // Redirect to destination anyway
          timer = setTimeout(() => {
            navigate(destination, { replace: true });
          }, 2000);
        } finally {
          setLoading(false);
        }
      } else {
        // If no login data, just show loading for a moment then redirect
        timer = setTimeout(() => {
          navigate(destination, { replace: true });
        }, 2500);
      }
    };
    
    performLogin();
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [login, loginData, navigate, destination, currentUser]);

  return (
    <Box className={classes.root}>
      {/* Background shapes */}
      <Box 
        className={classes.backgroundShape}
        sx={{ 
          width: '500px', 
          height: '500px', 
          top: '-250px', 
          right: '-100px',
          animation: 'pulse 15s infinite alternate' 
        }}
      />
      <Box 
        className={classes.backgroundShape}
        sx={{ 
          width: '400px', 
          height: '400px', 
          bottom: '-150px', 
          left: '-100px',
          animation: 'pulse 12s infinite alternate-reverse' 
        }}
      />
      
      <Fade in={true} timeout={800}>
        <Box className={classes.container}>
          <Box className={classes.logoContainer}>
            <img src={GigaLogo} alt="Gigaversity Logo" className={classes.logo} />
            <Typography variant="h6" className={classes.logoText}>
              Gigaversity
            </Typography>
          </Box>
          
          <Box className={classes.progressContainer}>
            <Box className={classes.progressBackground} />
            <CircularProgress 
              variant="determinate"
              value={progress}
              size={60} 
              thickness={4} 
              className={classes.progress} 
            />
            <Typography className={classes.progressText}>
              {Math.round(progress)}%
            </Typography>
          </Box>
          
          <Typography variant="body1" className={classes.message}>
            {loginData ? 'Logging you in' : 'Getting things ready'}{dots}
          </Typography>
          
          <Box className={classes.quoteContainer}>
            <Typography className={classes.quoteHeader}>
              <span className={classes.quoteIcon}>💡</span> Resume Tips
            </Typography>
            
            {currentQuotes.map((quote, index) => (
              <Fade key={index} in={true} timeout={500}>
                <Box>
                  <Typography className={classes.quote}>
                    "{quote.text}"
                  </Typography>
                  {quote.author && (
                    <Typography className={classes.quoteAuthor}>
                      - {quote.author}
                    </Typography>
                  )}
                </Box>
              </Fade>
            ))}
          </Box>
        </Box>
      </Fade>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          className={classes.alertRoot}
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      
      {/* Add keyframe animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(1); }
        }
      `}</style>
    </Box>
  );
};

export default LoadingScreen;