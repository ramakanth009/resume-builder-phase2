import React from "react";
import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import makeStylesWithTheme from "../../styles/makeStylesAdapter";

const useStyles = makeStylesWithTheme((theme) => ({
  // ...copy only the relevant styles from CustomSectionsAndTerms.jsx...
  form: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  formSubtitle: { /* ... */ },
  termsContainer: { /* ... */ },
  checkboxContainer: { /* ... */ },
  checkbox: { /* ... */ },
  checkboxLabel: { /* ... */ },
  disclaimer: { /* ... */ },
  divider: { /* ... */ },
}));

const TermsAndPolicies = ({ termsAccepted, setTermsAccepted }) => {
  const classes = useStyles();

  const handleTermsChange = (event) => {
    const { name, checked } = event.target;
    setTermsAccepted((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <Box className={classes.form}>
      <Divider className={classes.divider} />
      <Box className={classes.termsContainer}>
        <Typography variant="h6" className={classes.formSubtitle}>
          Terms & Policies
        </Typography>
        <Box className={classes.checkboxContainer}>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted.updates}
                onChange={handleTermsChange}
                name="updates"
                className={classes.checkbox}
              />
            }
            label="I accept to receive future updates from Gigaversity."
            className={classes.checkboxLabel}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted.dataSharing}
                onChange={handleTermsChange}
                name="dataSharing"
                className={classes.checkbox}
              />
            }
            label="I consent to AI-enhanced resume generation using my provided information"
            className={classes.checkboxLabel}
          />
        </Box>
        <Typography className={classes.disclaimer}>
          Both checkboxes must be selected to proceed with resume generation.
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsAndPolicies;
