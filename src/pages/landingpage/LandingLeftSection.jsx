import React from "react";
import { Box, Typography, Fade } from "@mui/material";
import { useStyles } from "../Styles.resumebuilder";

const features = [
  {
    title: "ATS-Optimized",
    desc: "Pass automated screening systems used by top companies.",
  },
  {
    title: "Real-Time Preview",
    desc: "See changes instantly as you type.",
  },
  {
    title: "Multiple Templates",
    desc: "Choose from professional templates for various roles.",
  },
  {
    title: "One-Click Download",
    desc: "Export your resume as PDF with a single click.",
  },
];

const LandingLeftSection = () => {
  const classes = useStyles();
  const visibleFeatures = [0, 1, 2, 3];

  return (
    <Box className={classes.leftSection}>
      <Box
        className={classes.animatedShape}
        sx={{ top: "-100px", left: "-50px", width: "300px", height: "300px" }}
      />
      <Box
        className={classes.animatedShape}
        sx={{ bottom: "-150px", right: "-100px", width: "400px", height: "400px" }}
      />
      <Fade in timeout={1000}>
        <Box className={classes.leftContentContainer}>
          <Typography variant="h2" className={classes.mainHeadline}>
            Launch Your Career
            <span className={classes.highlightedText}> With Confidence</span>
          </Typography>
          <Typography variant="subtitle1" className={classes.tagline}>
            The resume builder for students
          </Typography>
          <Box className={classes.statsGridContainer}>
            <Fade in timeout={1200}>
              <Box className={classes.statCard}>
                <Typography variant="h3" className={classes.statNumber}>68%</Typography>
                <Typography variant="body2" className={classes.statDescription}>
                  More interview callbacks
                </Typography>
              </Box>
            </Fade>
            <Fade in timeout={1400}>
              <Box className={classes.statCard}>
                <Typography variant="h3" className={classes.statNumber}>7.4s</Typography>
                <Typography variant="body2" className={classes.statDescription}>
                  Average recruiter review time
                </Typography>
              </Box>
            </Fade>
            <Fade in timeout={1600}>
              <Box className={classes.statCard}>
                <Typography variant="h3" className={classes.statNumber}>100%</Typography>
                <Typography variant="body2" className={classes.statDescription}>
                  Free for students
                </Typography>
              </Box>
            </Fade>
          </Box>
          <Box className={classes.featuresContainer}>
            <Typography variant="h6" className={classes.featuresHeading}>
              Why Choose Us?
            </Typography>
            {visibleFeatures.map((index) => (
              <Fade key={index} in timeout={500 + (index * 100)}>
                <Box
                  className={classes.featureItem}
                  sx={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Box className={classes.featureIcon}>✓</Box>
                  <Box>
                    <Typography variant="subtitle2" className={classes.featureTitle}>
                      {features[index].title}
                    </Typography>
                    <Typography variant="body2" className={classes.featureDescription}>
                      {features[index].desc}
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            ))}
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default LandingLeftSection;
