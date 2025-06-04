// import makeStylesWithTheme from '../../styles/makeStylesAdapter';

// const colors = {
//   primaryDarkNavy: "#27286c",
//   white: "#ffffff",
//   lightBlue: "#60cae6",
//   royalBlue: "#233f94",
//   goldenYellow: "#ffc615",
//   navyVariant: "#2a2b6a",
//   skyBlue: "#427bbf",
//   midBlue: "#354fa2",
//   deepIndigo: "#1a1b4b",
//   electricBlue: "#4e7ac7",
//   accentTeal: "#38b6d2",
// };

// export const useStyles = makeStylesWithTheme((theme) => ({
//   root: {
//     width: "100%",
//     display: "flex",
//     flexWrap: "wrap",
//     height: "100vh",
//     overflow: "hidden",
//     backgroundColor: colors.white,
//     '@media (max-width: 960px)': {
//       flexDirection: 'column',
//     }
//   },
//   leftSection: {
//     flex: "1 1 300px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: "0px 100px 100px 0px",
//     backgroundColor: colors.white,
//     position: "relative",
//     zIndex: 1,
//     '@media (max-width: 1200px)': {
//       flex: "1 1 250px",
//     },
//     '@media (max-width: 960px)': {
//       width: '100%',
//       borderRadius: 0,
//       padding: '2rem 1rem',
//     },
//     '@media (max-width: 480px)': {
//       padding: '1.5rem 0.75rem',
//     }
//   },
//   rightSection: {
//     flex: "1 1 300px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "stretch",
//     justifyContent: "flex-start",
//     padding: "0.5rem 1rem",
//     background: `linear-gradient(135deg, ${colors.primaryDarkNavy} 0%, ${colors.deepIndigo} 100%)`,
//     position: "relative",
//     overflow: "hidden",
//     '@media (max-width: 960px)': {
//       display: 'none',
//     }
//   },
//   backgroundCircle: {
//     position: "absolute",
//     borderRadius: "50%",
//     opacity: 0.1,
//     background: colors.electricBlue,
//     transition: "all 0.8s ease-in-out",
//   },
//   formContainer: {
//     width: "100%",
//     maxWidth: "500px",
//     margin: "0 auto",
//     padding: "0.5rem",
//     boxSizing: "border-box",
//     '@media (max-width: 600px)': {
//       padding: '0.25rem',
//     }
//   },
//   logoContainer: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "1.5rem",
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     marginRight: "0.5rem",
//   },
//   logoText: {
//     fontWeight: 700,
//     fontSize: "1.5rem",
//     color: colors.navyVariant,
//   },
//   welcomeText: {
//     color: colors.navyVariant,
//     fontWeight: 700,
//     marginBottom: "0.5rem",
//     fontSize: "1.75rem",
//     '@media (max-width: 600px)': {
//       fontSize: '1.5rem',
//     },
//     '@media (max-width: 480px)': {
//       fontSize: '1.25rem',
//     }
//   },
//   subtitle: {
//     color: colors.midBlue,
//     marginBottom: "1.5rem",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     // gap: "1rem",
//     '@media (max-width: 480px)': {
//       gap: '0.75rem',
//     }
//   },
//   textField: {
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "8px",
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: colors.skyBlue,
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: colors.lightBlue,
//     },
//     "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: colors.lightBlue,
//     },
//   },
//   formDivider: {
//     display: "flex",
//     alignItems: "center",
//     margin: "1rem 0",
//     color: colors.midBlue,
//     "&::before, &::after": {
//       content: '""',
//       flex: 1,
//       borderBottom: `1px solid ${colors.skyBlue}`,
//     },
//     "&::before": { marginRight: "0.5rem" },
//     "&::after": { marginLeft: "0.5rem" },
//   },
//   button: {
//     padding: "0.75rem",
//     borderRadius: "8px",
//     fontWeight: 600,
//     textTransform: "none",
//     fontSize: "1rem",
//     marginTop: "0.5rem",
//     backgroundColor: colors.royalBlue,
//     color: colors.white,
//     "&:hover": {
//       backgroundColor: colors.midBlue,
//     },
//     '@media (max-width: 600px)': {
//       padding: '0.6rem',
//       fontSize: '0.9rem',
//     },
//     '@media (max-width: 480px)': {
//       padding: '0.5rem',
//       fontSize: '0.85rem',
//     }
//   },
//   signupLink: {
//     width: '100%',
//     marginTop: '0.5rem',
//     textAlign: 'center',
//   },
//   signupText: {
//     color: colors.midBlue,
//     marginBottom: '0.5rem',
//   },
//   signupButton: {
//     padding: '0.75rem',
//     borderRadius: '8px',
//     fontWeight: 600,
//     textTransform: 'none',
//     fontSize: '1rem',
//     width: '100%',
//     backgroundColor: colors.white,
//     color: colors.royalBlue,
//     border: `1px solid ${colors.royalBlue}`,
//     "&:hover": {
//       backgroundColor: colors.royalBlue,
//       color: colors.white,
//     },
//     '@media (max-width: 600px)': {
//       padding: '0.6rem',
//       fontSize: '0.9rem',
//     },
//     '@media (max-width: 480px)': {
//       padding: '0.5rem',
//       fontSize: '0.85rem',
//     }
//   },
//   loader: {
//     marginLeft: "8px",
//     color: colors.white,
//   },
//   rightContentContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//     position: 'relative',
//     zIndex: 2,
//     padding: '2rem',
//     maxWidth: '90%',
//     margin: '0 auto',
//   },
//   welcomeRight: {
//     color: colors.white,
//     fontWeight: 700,
//     fontSize: "2.2rem",
//     marginBottom: "1.5rem",
//     textAlign: "center",
//     textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
//   },
//   subtitleRight: {
//     color: "rgba(255,255,255,0.9)",
//     marginBottom: "0.5rem",
//     textAlign: "center",
//     maxWidth: "380px",
//     lineHeight: 1.5,
//     fontSize: "1.1rem",
//   },
//   processContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     gap: '1rem',
//     marginTop: '1rem',
//     width: '100%',
//     maxWidth: '320px',
//   },
//   processStep: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1.2rem',
//     width: '100%',
//   },
//   processIcon: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '32px',
//     height: '32px',
//     borderRadius: '50%',
//     backgroundColor: colors.accentTeal,
//     color: colors.white,
//     fontWeight: 'bold',
//     fontSize: '1rem',
//     flexShrink: 0,
//   },
//   processText: {
//     color: colors.white,
//     fontSize: '1rem',
//     lineHeight: 1.4,
//     flex: 1,
//   },
//   studentBenefits: {
//     marginTop: '1rem',
//     width: '100%',
//     maxWidth: '350px',
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     borderRadius: '12px',
//     padding: '1.8rem',
//     backdropFilter: 'blur(10px)',
//     border: '1px solid rgba(255,255,255,0.15)',
//   },
//   benefitsTitle: {
//     color: colors.accentTeal,
//     marginBottom: '1.5rem',
//     fontWeight: 700,
//     fontSize: '1.2rem',
//     letterSpacing: '0.5px',
//     textTransform: 'uppercase',
//     textAlign: 'center',
//   },
//   featureItem: {
//     display: "flex",
//     alignItems: "flex-start",
//     margin: "0.5rem 0",
//     color: colors.white,
//     padding: "0.6rem 0.75rem",
//     borderRadius: "8px",
//   },
//   checkmark: {
//     marginRight: "1rem",
//     fontWeight: "bold",
//     fontSize: "1.2rem",
//     color: colors.accentTeal,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "26px",
//     height: "26px",
//     borderRadius: "50%",
//     background: "rgba(56,182,210,0.15)",
//     border: `1px solid ${colors.accentTeal}`,
//     flexShrink: 0,
//   },
//   highlightText: {
//     color: colors.goldenYellow,
//   },
//   loginLink: {
//     width: '100%',
//     marginTop: '0.5rem',
//     textAlign: 'center',
//   },
//   loginText: {
//     color: colors.midBlue,
//     marginBottom: '0.5rem',
//   },
//   loginButton: {
//     padding: '0.75rem',
//     borderRadius: '8px',
//     fontWeight: 600,
//     textTransform: 'none',
//     fontSize: '1rem',
//     width: '100%',
//     backgroundColor: colors.white,
//     color: colors.royalBlue,
//     border: `1px solid ${colors.royalBlue}`,
//     "&:hover": {
//       backgroundColor: colors.royalBlue,
//       color: colors.white,
//     },
//     '@media (max-width: 600px)': {
//       padding: '0.6rem',
//       fontSize: '0.9rem',
//     },
//     '@media (max-width: 480px)': {
//       padding: '0.5rem',
//       fontSize: '0.85rem',
//     }
//   },
// }));
// src/pages/login/Login.styles.jsx
import makeStylesWithTheme from '../../styles/makeStylesAdapter';

const colors = {
  primaryDarkNavy: "#27286c",
  white: "#ffffff",
  lightBlue: "#60cae6",
  royalBlue: "#233f94",
  goldenYellow: "#ffc615",
  navyVariant: "#2a2b6a",
  skyBlue: "#427bbf",
  midBlue: "#354fa2",
  deepIndigo: "#1a1b4b",
  electricBlue: "#4e7ac7",
  accentTeal: "#38b6d2",
};

export const useStyles = makeStylesWithTheme((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: colors.white,
    '@media (max-width: 960px)': {
      flexDirection: 'column',
    }
  },
  leftSection: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0px 100px 100px 0px",
    backgroundColor: colors.white,
    position: "relative",
    zIndex: 1,
    '@media (max-width: 1200px)': {
      flex: "1 1 250px",
    },
    '@media (max-width: 960px)': {
      width: '100%',
      borderRadius: 0,
      padding: '2rem 1rem',
    },
    '@media (max-width: 480px)': {
      padding: '1.5rem 0.75rem',
    }
  },
  rightSection: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: "0.5rem 1rem",
    background: `linear-gradient(135deg, ${colors.primaryDarkNavy} 0%, ${colors.deepIndigo} 100%)`,
    position: "relative",
    overflow: "hidden",
    '@media (max-width: 960px)': {
      display: 'none',
    }
  },
  backgroundCircle: {
    position: "absolute",
    borderRadius: "50%",
    opacity: 0.1,
    background: colors.electricBlue,
    transition: "all 0.8s ease-in-out",
  },
  formContainer: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "0.5rem",
    boxSizing: "border-box",
    '@media (max-width: 600px)': {
      padding: '0.25rem',
    }
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: "0.5rem",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: colors.navyVariant,
  },
  welcomeText: {
    color: colors.navyVariant,
    fontWeight: 700,
    marginBottom: "0.5rem",
    fontSize: "1.75rem",
    '@media (max-width: 600px)': {
      fontSize: '1.5rem',
    },
    '@media (max-width: 480px)': {
      fontSize: '1.25rem',
    }
  },
  subtitle: {
    color: colors.midBlue,
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    '@media (max-width: 480px)': {
      gap: '0.75rem',
    }
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.skyBlue,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.lightBlue,
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.lightBlue,
    },
    marginBottom: "1rem",
  },
  formDivider: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
    color: colors.midBlue,
    textAlign: "center",
    '& .MuiDivider-root': {
      borderColor: colors.skyBlue,
    },
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      color: colors.midBlue,
      padding: '0 1rem',
      backgroundColor: colors.white,
    },
    // Fallback for non-MUI divider
    "&::before, &::after": {
      content: '""',
      flex: 1,
      borderBottom: `1px solid ${colors.skyBlue}`,
    },
    "&::before": { marginRight: "0.5rem" },
    "&::after": { marginLeft: "0.5rem" },
  },
  button: {
    padding: "0.75rem",
    borderRadius: "8px",
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",
    marginTop: "0.5rem",
    backgroundColor: colors.royalBlue,
    color: colors.white,
    "&:hover": {
      backgroundColor: colors.midBlue,
    },
    '@media (max-width: 600px)': {
      padding: '0.6rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem',
      fontSize: '0.85rem',
    }
  },
  signupLink: {
    width: '100%',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
  signupText: {
    color: colors.midBlue,
    marginBottom: '0.5rem',
  },
  signupButton: {
    padding: '0.75rem',
    borderRadius: '8px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    width: '100%',
    backgroundColor: colors.white,
    color: colors.royalBlue,
    border: `1px solid ${colors.royalBlue}`,
    "&:hover": {
      backgroundColor: colors.royalBlue,
      color: colors.white,
    },
    '@media (max-width: 600px)': {
      padding: '0.6rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem',
      fontSize: '0.85rem',
    }
  },
  loader: {
    marginLeft: "8px",
    color: colors.white,
  },
  rightContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
    zIndex: 2,
    padding: '2rem',
    maxWidth: '90%',
    margin: '0 auto',
  },
  welcomeRight: {
    color: colors.white,
    fontWeight: 700,
    fontSize: "2.2rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
  },
  subtitleRight: {
    color: "rgba(255,255,255,0.9)",
    marginBottom: "0.5rem",
    textAlign: "center",
    maxWidth: "380px",
    lineHeight: 1.5,
    fontSize: "1.1rem",
  },
  processContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
    marginTop: '1rem',
    width: '100%',
    maxWidth: '320px',
  },
  processStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    width: '100%',
  },
  processIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: colors.accentTeal,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: '1rem',
    flexShrink: 0,
  },
  processText: {
    color: colors.white,
    fontSize: '1rem',
    lineHeight: 1.4,
    flex: 1,
  },
  studentBenefits: {
    marginTop: '1rem',
    width: '100%',
    maxWidth: '350px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '1.8rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.15)',
  },
  benefitsTitle: {
    color: colors.accentTeal,
    marginBottom: '1.5rem',
    fontWeight: 700,
    fontSize: '1.2rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    margin: "0.5rem 0",
    color: colors.white,
    padding: "0.6rem 0.75rem",
    borderRadius: "8px",
  },
  checkmark: {
    marginRight: "1rem",
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: colors.accentTeal,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    background: "rgba(56,182,210,0.15)",
    border: `1px solid ${colors.accentTeal}`,
    flexShrink: 0,
  },
  highlightText: {
    color: colors.goldenYellow,
  },
  loginLink: {
    width: '100%',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
  loginText: {
    color: colors.midBlue,
    marginBottom: '0.5rem',
  },
  loginButton: {
    padding: '0.75rem',
    borderRadius: '8px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '1rem',
    width: '100%',
    backgroundColor: colors.white,
    color: colors.royalBlue,
    border: `1px solid ${colors.royalBlue}`,
    "&:hover": {
      backgroundColor: colors.royalBlue,
      color: colors.white,
    },
    '@media (max-width: 600px)': {
      padding: '0.6rem',
      fontSize: '0.9rem',
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem',
      fontSize: '0.85rem',
    }
  },
}));