import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  Alert,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import makeStylesWithTheme from "../../styles/makeStylesAdapter";

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    '@media (max-width: 1200px)': {
      gap: '0.9rem',
    },
    '@media (max-width: 960px)': {
      gap: '0.8rem',
    },
    '@media (max-width: 600px)': {
      gap: '0.7rem',
    },
    '@media (max-width: 480px)': {
      gap: '0.6rem',
    },
    '@media (max-width: 375px)': {
      gap: '0.5rem',
    },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      background: "rgba(0, 0, 0, 0.03)",
      borderRadius: "16px",
      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      backdropFilter: "blur(10px)",
      "&:hover": {
        borderColor: "rgba(39, 40, 108, 0.12)",
      },
      "&.Mui-focused": {
        background: "rgba(0, 0, 0, 0.05)",
        borderColor: "#14b8a6",
        boxShadow:
          "0 0 0 3px rgba(20, 184, 166, 0.1), 0 4px 16px rgba(39, 40, 108, 0.12)",
        transform: "translateY(-2px)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#427bbf",
      fontWeight: 500,
      fontSize: "0.9rem",
      '@media (max-width: 600px)': {
        fontSize: '0.85rem',
      },
      '@media (max-width: 480px)': {
        fontSize: '0.8rem',
      },
      '@media (max-width: 375px)': {
        fontSize: '0.75rem',
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#14b8a6",
    },
    '& .MuiOutlinedInput-input': {
      fontSize: '1rem',
      '@media (max-width: 600px)': {
        fontSize: '0.9rem',
      },
      '@media (max-width: 480px)': {
        fontSize: '0.85rem',
      },
      '@media (max-width: 375px)': {
        fontSize: '0.8rem',
      },
    },
    '& .MuiFormHelperText-root': {
      '@media (max-width: 600px)': {
        fontSize: '0.75rem',
      },
      '@media (max-width: 480px)': {
        fontSize: '0.7rem',
      },
      '@media (max-width: 375px)': {
        fontSize: '0.65rem',
      },
    },
  },
  formSubtitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#27286c",
    position: "relative",
    paddingBottom: "0.5rem",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "40px",
      height: "2px",
      background: "linear-gradient(90deg, #14b8a6, #a78bfa)",
    },
    '@media (max-width: 1200px)': {
      fontSize: '1.4rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1.3rem',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.2rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '1rem',
    },
  },
  infoAlert: {
    marginBottom: "1.5rem",
    backgroundColor: "#ebf8ff",
    border: "1px solid #bee3f8",
    "& .MuiAlert-icon": {
      color: "#3182ce",
    },
    '@media (max-width: 1200px)': {
      marginBottom: '1.3rem',
    },
    '@media (max-width: 960px)': {
      marginBottom: '1.2rem',
    },
    '@media (max-width: 600px)': {
      marginBottom: '1rem',
    },
    '@media (max-width: 480px)': {
      marginBottom: '0.8rem',
    },
    '@media (max-width: 375px)': {
      marginBottom: '0.7rem',
    },
  },
  socialIcon: {
    color: "#718096",
    transition: "color 0.2s ease",
    fontSize: '1.2rem',
    '@media (max-width: 1200px)': {
      fontSize: '1.1rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.95rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.85rem',
    },
  },
  githubIcon: {
    "&:hover": {
      color: "#333",
    },
  },
  linkedinIcon: {
    "&:hover": {
      color: "#0077b5",
    },
  },
  portfolioIcon: {
    "&:hover": {
      color: "#3182ce",
    },
  },
  helperText: {
    fontSize: "0.75rem",
    color: "#718096",
    marginTop: "0.25rem",
    lineHeight: 1.4,
    '@media (max-width: 1200px)': {
      fontSize: '0.7rem',
    },
    '@media (max-width: 960px)': {
      fontSize: '0.65rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.6rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '0.55rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.5rem',
    },
  },
  formDescription: {
    marginBottom: "24px",
    color: "#666",
    fontSize: "1rem",
    '@media (max-width: 1200px)': {
      marginBottom: '22px',
      fontSize: '0.95rem',
    },
    '@media (max-width: 960px)': {
      marginBottom: '20px',
      fontSize: '0.9rem',
      textAlign: 'center',
    },
    '@media (max-width: 600px)': {
      marginBottom: '18px',
      fontSize: '0.85rem',
    },
    '@media (max-width: 480px)': {
      marginBottom: '16px',
      fontSize: '0.8rem',
    },
    '@media (max-width: 375px)': {
      marginBottom: '14px',
      fontSize: '0.75rem',
    },
  },
  fieldContainer: {
    marginBottom: '1rem',
    '@media (max-width: 1200px)': {
      marginBottom: '0.9rem',
    },
    '@media (max-width: 960px)': {
      marginBottom: '0.8rem',
    },
    '@media (max-width: 600px)': {
      marginBottom: '0.7rem',
    },
    '@media (max-width: 480px)': {
      marginBottom: '0.6rem',
    },
    '@media (max-width: 375px)': {
      marginBottom: '0.5rem',
    },
  },
}));

const SocialLinksSection = ({ resumeData, setResumeData }) => {
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setResumeData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        [name]: value,
      },
    }));
  };

  // Helper function to format URL
  const formatUrl = (url, platform) => {
    if (!url) return "";

    // Remove trailing slash
    url = url.trim().replace(/\/$/, "");

    // Add https:// if no protocol
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    return url;
  };

  // Handle URL formatting on blur
  const handleUrlBlur = (field, value) => {
    const formattedUrl = formatUrl(value, field);
    if (formattedUrl !== value) {
      setResumeData((prev) => ({
        ...prev,
        header: {
          ...prev.header,
          [field]: formattedUrl,
        },
      }));
    }
  };

  return (
    <Box className={classes.form}>
      <Box>
        <Typography variant="h6" className={classes.formSubtitle}>
          Digital Presence
        </Typography>
        <Typography variant="subtitle1" className={classes.formDescription}>
          Connect your professional profiles
        </Typography>
      </Box>

      <Box className={classes.fieldContainer}>
        <TextField
          label="GitHub Profile"
          name="github"
          value={resumeData.header.github || ""}
          onChange={handleInputChange}
          onBlur={(e) => handleUrlBlur("github", e.target.value)}
          variant="outlined"
          fullWidth
          className={classes.textField}
          placeholder="https://github.com/yourusername"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GitHubIcon
                  className={`${classes.socialIcon} ${classes.githubIcon}`}
                />
              </InputAdornment>
            ),
          }}
          helperText="Showcase your coding projects and contributions"
        />
      </Box>

      <Box className={classes.fieldContainer}>
        <TextField
          label="LinkedIn Profile"
          name="linkedin"
          value={resumeData.header.linkedin || ""}
          onChange={handleInputChange}
          onBlur={(e) => handleUrlBlur("linkedin", e.target.value)}
          variant="outlined"
          fullWidth
          className={classes.textField}
          placeholder="https://linkedin.com/in/yourusername"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkedInIcon
                  className={`${classes.socialIcon} ${classes.linkedinIcon}`}
                />
              </InputAdornment>
            ),
          }}
          helperText="Professional network and career achievements"
        />
      </Box>

      <Box className={classes.fieldContainer}>
        <TextField
          label="Portfolio/Website"
          name="portfolio"
          value={resumeData.header.portfolio || ""}
          onChange={handleInputChange}
          onBlur={(e) => handleUrlBlur("portfolio", e.target.value)}
          variant="outlined"
          fullWidth
          className={classes.textField}
          placeholder="https://yourportfolio.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LanguageIcon
                  className={`${classes.socialIcon} ${classes.portfolioIcon}`}
                />
              </InputAdornment>
            ),
          }}
          helperText="Personal website, portfolio, or professional blog"
        />
      </Box>
    </Box>
  );
};

export default SocialLinksSection;