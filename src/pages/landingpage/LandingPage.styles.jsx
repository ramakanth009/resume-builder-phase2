import makeStylesWithTheme from '../../styles/makeStylesAdapter';

export const colors = {
  primaryDarkNavy: "#27286c",
  white: "#ffffff",
  lightBlue: "#60cae6", 
  royalBlue: "#233f94",
  goldenYellow: "#ffc615",
  navyVariant: "#2a2b6a",
  skyBlue: "#427bbf",
  midBlue: "#354fa2",
  backgroundGradient: "linear-gradient(135deg, #2A2B6A 0%, #3F51B5 100%)",
};

export const useStyles = makeStylesWithTheme((theme) => ({
   root: {
     width: "100%",
     display: "flex",
     flexWrap: "wrap",
     height: "100vh",
   },
   // Enhanced left side styles
   leftSection: {
     flex: "1 1 300px",
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     justifyContent: "center",
     background: colors.backgroundGradient,
     position: "relative",
     overflow: "hidden",
     padding: "1rem",
     "@media (max-width: 960px)": {
       display: "none",
     },
   },
   rightSection: {
     flex: "1 1 300px",
     display: "flex",
     flexDirection: "column",
     alignItems: "stretch",
     justifyContent: "flex-start",
     padding: "0.5rem 1rem",
     "@media (max-width: 960px)": {
       flex: "1 1 100%",
     },
   },
   formContainer: {
     width: "100%",
     maxWidth: "500px",
     margin: "0 auto",
     padding: "0.5rem",
     "@media (max-width: 600px)": {
       padding: "1rem",
     },
     "@media (max-width: 375px)": {
       padding: "0.5rem",
     },
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
     "@media (max-width: 600px)": {
       fontSize: "1.5rem",
     },
     "@media (max-width: 375px)": {
       fontSize: "1.25rem",
     },
   },
   subtitle: {
     color: colors.midBlue,
     marginBottom: "1.5rem",
     "@media (max-width: 600px)": {
       fontSize: "0.9rem",
       marginBottom: "1rem",
     },
   },
   form: {
     display: "flex",
     flexDirection: "column",
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
   },
   formDivider: {
     display: "flex",
     alignItems: "center",
     margin: "1rem 0",
     color: colors.midBlue,
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
   },
   loginLink: {
     width: "100%",
     marginTop: "0.5rem",
     textAlign: "center",
   },
   loginText: {
     color: colors.midBlue,
     marginBottom: "0.5rem",
   },
   loginButton: {
     padding: "0.75rem",
     borderRadius: "8px",
     fontWeight: 600,
     textTransform: "none",
     fontSize: "1rem",
     width: "100%",
     backgroundColor: colors.white,
     color: colors.royalBlue,
     border: `1px solid ${colors.royalBlue}`,
     "&:hover": {
       backgroundColor: colors.royalBlue,
       color: colors.white,
     },
   },
   loader: {
     marginLeft: "8px",
     color: colors.white,
   },
   // Enhanced left side content
   leftContentContainer: {
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     justifyContent: "center",
     padding: "2rem", // Increased padding
     width: "100%",
     position: "relative",
     zIndex: 2,
     maxWidth: "800px", // Added max width
   },
   mainHeadline: {
     color: colors.white,
     fontWeight: 800,
     fontSize: "2.4rem", // Increased from 2rem
     textAlign: "center",
     marginBottom: "1rem", // Increased from 0.5rem
     lineHeight: 1.2,
     "@media (max-width: 1200px)": {
       fontSize: "2rem",
     },
     "@media (max-width: 600px)": {
       fontSize: "1.8rem",
     },
     "@media (max-width: 480px)": {
       fontSize: "1.5rem",
     },
   },
   highlightedText: {
     color: colors.goldenYellow,
     position: "relative",
     "&::after": {
       content: '""',
       position: "absolute",
       left: 0,
       bottom: "-5px",
       width: "100%",
       height: "4px",
       backgroundColor: colors.goldenYellow,
       borderRadius: "2px",
     },
   },
   tagline: {
     color: "rgba(255,255,255,0.9)",
     textAlign: "center",
     marginBottom: "2rem", // Increased from 1rem
     fontWeight: 400,
     fontSize: "1.1rem", // Increased from 0.9rem
   },
   // Enhanced stats grid
   statsGridContainer: {
     display: "flex",
     flexWrap: "wrap",
     gap: "1rem", // Reduced gap
     width: "100%",
     maxWidth: "900px",
     marginBottom: "1rem", // Increased margin
     justifyContent: "center",
     "@media (max-width: 600px)": {
       gap: "0.5rem",
     },
   },
   statCard: {
     backgroundColor: "rgba(255,255,255,0.15)",
     borderRadius: "12px", // Increased radius
     padding: "1rem 1.5rem", // Increased padding
     display: "flex",
     flexDirection: "column",
     transition: "all 0.3s ease",
     flex: "1 1 180px", // Increased flex basis
     maxWidth: "220px", // Increased max width
     minWidth: "160px", // Increased min width
     "@media (max-width: 600px)": {
       flex: "1 1 140px",
       minWidth: "140px",
       padding: "0.75rem 1rem",
     },
     "@media (max-width: 375px)": {
       flex: "1 1 120px",
       minWidth: "120px",
     },
   },
   statNumber: {
     color: colors.goldenYellow,
     fontWeight: 800,
     fontSize: "1.8rem", // Increased from 1.5rem
     marginBottom: "0.5rem", // Increased margin
   },
   statDescription: {
     color: colors.white,
     fontSize: "0.95rem", // Increased from 0.8rem
   },
   // Enhanced features grid
   featuresContainer: {
     width: "100%",
     maxWidth: "800px", // Increased from 280px
     marginTop: "1rem", // Increased from 1rem
     padding: "0 1rem",
   },
   featuresHeading: {
     color: colors.white,
     fontWeight: 700,
     marginBottom: "1.5rem", // Increased from 0.75rem
     textAlign: "center",
     fontSize: "1.4rem", // Increased from 1.1rem
   },
   featuresGrid: {
     display: "flex",
     flexWrap: "wrap",
     gap: "1.5rem",
     width: "100%",
     "@media (max-width: 600px)": {
       gap: "1rem",
     },
   },
   featureItem: {
     flex: "1 1 calc(50% - 0.75rem)",
     minWidth: "280px",
     display: "flex",
     alignItems: "flex-start",
     padding: "1.2rem",
     "@media (max-width: 600px)": {
       minWidth: "100%",
       padding: "1rem",
     },
   },
   featureIcon: {
     width: "32px", // Increased from 22px
     height: "32px", // Increased from 22px
     backgroundColor: colors.goldenYellow,
     borderRadius: "50%",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     color: colors.navyVariant,
     fontWeight: "bold",
     flexShrink: 0,
     marginTop: "0.2rem", // Unchanged
     fontSize: "0.9rem", // Increased from 0.75rem
   },
   featureContent: {
     display: "flex",
     flexDirection: "column",
     gap: "0.5rem",
   },
   featureTitle: {
     color: colors.white,
     fontWeight: 700,
     fontSize: "1.1rem", // Increased from 0.9rem
   },
   featureDescription: {
     color: "rgba(255,255,255,0.8)",
     fontSize: "0.95rem", // Increased from 0.8rem
     lineHeight: "1.5", // Increased from 1.4
   },
   animatedShape: {
     position: "absolute",
     borderRadius: "30% 70% 70% 30% 0% 70%",
     background: "rgba(255,255,255,0.1)",
     animation: "$float 20s infinite",
   },
   "@keyframes float": {
     "0%": { transform: "rotate(0deg) translateX(0)" },
     "50%": { transform: "rotate(180deg) translateX(20px)" },
     "100%": { transform: "rotate(360deg) translateX(0)" },
   },
 }));