import React from 'react';
import { Box, Typography, Fade } from '@mui/material';

const LandingLeftSection = ({ classes, statsData, featureData, visibleFeatures }) => (
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
          The professional resume builder designed for students
        </Typography>

        <Box className={classes.statsGridContainer}>
          {statsData.map((stat, index) => (
            <Fade in timeout={1200 + index * 200} key={index}>
              <Box className={classes.statCard}>
                <Typography variant="h3" className={classes.statNumber}>
                  {stat.number}
                </Typography>
                <Typography variant="body2" className={classes.statDescription}>
                  {stat.description}
                </Typography>
              </Box>
            </Fade>
          ))}
        </Box>

        <Box className={classes.featuresContainer}>
          <Typography variant="h6" className={classes.featuresHeading}>
            Why Choose Us?
          </Typography>

          <Box className={classes.featuresGrid}>
            {featureData.map((feature, index) => (
              <Fade in={visibleFeatures.includes(index)} timeout={600} key={index}>
                <Box className={classes.featureItem}>
                  <Box className={classes.featureIcon}>{feature.icon}</Box>
                  <Box className={classes.featureContent}>
                    <Typography variant="subtitle2" className={classes.featureTitle}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className={classes.featureDescription}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            ))}
          </Box>
        </Box>
      </Box>
    </Fade>
  </Box>
);

export default LandingLeftSection;
