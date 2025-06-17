// import React from "react";
// import { Box, Typography, TextField, Autocomplete } from "@mui/material";
// import makeStylesWithTheme from "../../styles/makeStylesAdapter";
// import DatePickerField from "../../common/DatePickerField";

// const useStyles = makeStylesWithTheme((theme) => ({
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: '0.5rem',
//   },
//   textField: {
//     "& .MuiOutlinedInput-root": {
//       background: "rgba(0, 0, 0, 0.03)",
//       // border: '1px solid rgba(39, 40, 108, 0.08)',
//       borderRadius: "16px",
//       transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
//       backdropFilter: "blur(10px)",
//       "&:hover": {
//         borderColor: "rgba(39, 40, 108, 0.12)",
//       },
//       "&.Mui-focused": {
//         background: "rgba(0, 0, 0, 0.05)",
//         borderColor: "#14b8a6",
//         boxShadow:
//           "0 0 0 3px rgba(20, 184, 166, 0.1), 0 4px 16px rgba(39, 40, 108, 0.12)",
//         transform: "translateY(-2px)",
//       },
//     },
//     "& .MuiInputLabel-root": {
//       color: "#427bbf",
//       fontWeight: 500,
//       fontSize: "0.9rem",
//     },
//     "& .MuiInputLabel-root.Mui-focused": {
//       color: "#14b8a6",
//     },
//   },
//   formSubtitle: {
//     fontSize: "1.5rem",
//     fontWeight: 600,
//     color: "#27286c",
//     // marginBottom: "1.5rem",
//     position: "relative",
//     // paddingBottom: "0.5rem",
//     "&::after": {
//       content: '""',
//       position: "absolute",
//       bottom: 0,
//       left: 0,
//       width: "40px",
//       height: "2px",
//       background: "linear-gradient(90deg, #14b8a6, #a78bfa)",
//     },
//   },
//   formDescription: {
//     marginBottom: '24px',
//     color: '#666',
//     fontSize: '1rem'
//   },
//   fieldRow: {
//     display: "flex",
//     gap: "1rem",
//     marginBottom: "1rem",
//     "@media (max-width: 600px)": {
//       flexDirection: "column",
//       gap: "0.5rem",
//     },
//   },
//   fieldContainer: {
//     flex: 1,
//   },
//   institutionContainer: {
//     flex: 2, // Takes more space
//   },
//   yearContainer: {
//     flex: 1, // Takes less space
//   },
// }));

// // Degree options for the dropdown
// const degreeOptions = [
//   // Bachelor's Degrees
//   "Bachelor of Arts (BA)",
//   "Bachelor of Fine Arts (BFA)",
//   "Bachelor of Social Work (BSW)",
//   "Bachelor of Music (BM/BMus)",
//   "Bachelor of Performing Arts (BPA)",
//   "Bachelor of Science (BSc)",
//   "Bachelor of Computer Applications (BCA)",
//   "Bachelor of Science in Agriculture (B.Sc. Ag.)",
//   "Bachelor of Commerce (BCom)",
//   "Bachelor of Business Administration (BBA)",
//   "Bachelor of Technology (BTech)",
//   "Bachelor of Engineering (BE)",
//   "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
//   "Bachelor of Dental Surgery (BDS)",
//   "Bachelor of Pharmacy (BPharm)",
//   "Bachelor of Laws (LLB)",
//   "Bachelor of Education (BEd)",
//   "Bachelor of Architecture (BArch)",
//   "Bachelor of Design (BDes)",
//   // Master's Degrees
//   "Master of Arts (MA)",
//   "Master of Science (MSc)",
//   "Master of Business Administration (MBA)",
//   "Master of Technology (MTech)",
//   "Master of Engineering (ME)",
//   "Master of Commerce (MCom)",
//   "Master of Computer Applications (MCA)",
//   "Master of Laws (LLM)",
//   // Doctoral Degrees
//   "Doctor of Philosophy (PhD)",
//   "Doctor of Medicine (MD)",
// ];

// const EducationSection = ({ resumeData, setResumeData }) => {
//   const classes = useStyles();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setResumeData((prev) => ({
//       ...prev,
//       education: {
//         ...prev.education,
//         [name]: value,
//       },
//     }));
//   };

//   // Handle degree change from Autocomplete
//   const handleDegreeChange = (event, newValue) => {
//     setResumeData((prev) => ({
//       ...prev,
//       education: {
//         ...prev.education,
//         degree: newValue || "",
//       },
//     }));
//   };

//   // Handle graduation year change from DatePicker
//   const handleGraduationYearChange = (value) => {
//     setResumeData((prev) => ({
//       ...prev,
//       education: {
//         ...prev.education,
//         graduation_year: value,
//         graduationYear: value, // Update both formats for compatibility
//       },
//     }));
//   };

//   return (
//     <Box className={classes.form}>
//       <Box>
//         <Typography variant="h6" className={classes.formSubtitle}>
//           Education
//         </Typography>
//         <Typography variant="subtitle1" className={classes.formDescription}>
//           Connect your professional profiles
//         </Typography>
//       </Box>
//       {/* Degree and Specialization side by side */}
//       <Box className={classes.fieldRow}>
//         <Box className={classes.fieldContainer}>
//           {/* Degree Autocomplete Dropdown */}
//           <Autocomplete
//             options={degreeOptions}
//             value={resumeData.education.degree || null}
//             onChange={handleDegreeChange}
//             freeSolo
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Degree"
//                 name="degree"
//                 variant="outlined"
//                 fullWidth
//                 className={classes.textField}
//                 placeholder="e.g., Bachelor of Science"
//                 required
//               />
//             )}
//           />
//         </Box>
//         <Box className={classes.fieldContainer}>
//           <TextField
//             label="Specialization"
//             name="specialization"
//             value={resumeData.education.specialization}
//             onChange={handleInputChange}
//             variant="outlined"
//             fullWidth
//             className={classes.textField}
//             placeholder="e.g., Computer Science"
//             required
//           />
//         </Box>
//       </Box>

//       {/* Institution and Graduation Year side by side with different proportions */}
//       <Box className={classes.fieldRow}>
//         <Box className={classes.institutionContainer}>
//           <TextField
//             label="Institution"
//             name="institution"
//             value={resumeData.education.institution}
//             onChange={handleInputChange}
//             variant="outlined"
//             fullWidth
//             className={classes.textField}
//             placeholder="e.g., Stanford University"
//             required
//           />
//         </Box>
//         <Box className={classes.yearContainer}>
//           {/* Year picker for graduation year */}
//           <DatePickerField
//             label="Year"
//             value={
//               resumeData.education.graduation_year ||
//               resumeData.education.graduationYear ||
//               ""
//             }
//             onChange={handleGraduationYearChange}
//             views={["year"]} // Only show year picker
//             required
//             helperText="Select graduation year"
//             minYear={1950}
//             maxYear={new Date().getFullYear() + 10} // Allow future dates for students
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default EducationSection;
import React from "react";
import { Box, Typography, TextField, Autocomplete } from "@mui/material";
import makeStylesWithTheme from "../../styles/makeStylesAdapter";
import DatePickerField from "../../common/DatePickerField";

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: '0.5rem',
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
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#14b8a6",
    },
  },
  formSubtitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#27286c",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "40px",
      height: "2px",
      background: "linear-gradient(90deg, #14b8a6, #a78bfa)",
    },
  },
  formDescription: {
    marginBottom: '24px',
    color: '#666',
    fontSize: '1rem'
  },
  fieldRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "0.5rem",
    },
  },
  fieldContainer: {
    flex: 1,
  },
  institutionContainer: {
    flex: 2, // Takes more space
  },
  yearContainer: {
    flex: 1, // Takes less space
  },
}));

// Degree options for the dropdown
const degreeOptions = [
  // Bachelor's Degrees
  "Bachelor of Arts (BA)",
  "Bachelor of Fine Arts (BFA)",
  "Bachelor of Social Work (BSW)",
  "Bachelor of Music (BM/BMus)",
  "Bachelor of Performing Arts (BPA)",
  "Bachelor of Science (BSc)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Science in Agriculture (B.Sc. Ag.)",
  "Bachelor of Commerce (BCom)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Technology (BTech)",
  "Bachelor of Engineering (BE)",
  "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
  "Bachelor of Dental Surgery (BDS)",
  "Bachelor of Pharmacy (BPharm)",
  "Bachelor of Laws (LLB)",
  "Bachelor of Education (BEd)",
  "Bachelor of Architecture (BArch)",
  "Bachelor of Design (BDes)",
  // Master's Degrees
  "Master of Arts (MA)",
  "Master of Science (MSc)",
  "Master of Business Administration (MBA)",
  "Master of Technology (MTech)",
  "Master of Engineering (ME)",
  "Master of Commerce (MCom)",
  "Master of Computer Applications (MCA)",
  "Master of Laws (LLM)",
  // Doctoral Degrees
  "Doctor of Philosophy (PhD)",
  "Doctor of Medicine (MD)",
];

const EducationSection = ({ resumeData, setResumeData, validationErrors = {}, clearValidationErrors }) => {
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear validation errors when user starts typing
    if (clearValidationErrors) {
      clearValidationErrors();
    }

    setResumeData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [name]: value,
      },
    }));
  };

  // Handle degree change from Autocomplete
  const handleDegreeChange = (event, newValue) => {
    // Clear validation errors when user makes selection
    if (clearValidationErrors) {
      clearValidationErrors();
    }

    setResumeData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        degree: newValue || "",
      },
    }));
  };

  // Handle graduation year change from DatePicker
  const handleGraduationYearChange = (value) => {
    // Clear validation errors when user makes selection
    if (clearValidationErrors) {
      clearValidationErrors();
    }
    
    setResumeData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        graduation_year: value,
        graduationYear: value, // Update both formats for compatibility
      },
    }));
  };

  return (
    <Box className={classes.form}>
      <Box>
        <Typography variant="h6" className={classes.formSubtitle}>
          Education
        </Typography>
        <Typography variant="subtitle1" className={classes.formDescription}>
          Share your educational background
        </Typography>
      </Box>
      {/* Degree and Specialization side by side */}
      <Box className={classes.fieldRow}>
        <Box className={classes.fieldContainer}>
          {/* Degree Autocomplete Dropdown */}
          <Autocomplete
            options={degreeOptions}
            value={resumeData.education.degree || null}
            onChange={handleDegreeChange}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Degree"
                name="degree"
                variant="outlined"
                fullWidth
                className={classes.textField}
                placeholder="e.g., Bachelor of Science"
                required
                error={!!validationErrors['education.degree']}
                helperText={validationErrors['education.degree'] || ''}
              />
            )}
          />
        </Box>
        <Box className={classes.fieldContainer}>
          <TextField
            label="Specialization"
            name="specialization"
            value={resumeData.education.specialization}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            className={classes.textField}
            placeholder="e.g., Computer Science"
            required
            error={!!validationErrors['education.specialization']}
            helperText={validationErrors['education.specialization'] || ''}
          />
        </Box>
      </Box>

      {/* Institution and Graduation Year side by side with different proportions */}
      <Box className={classes.fieldRow}>
        <Box className={classes.institutionContainer}>
          <TextField
            label="Institution"
            name="institution"
            value={resumeData.education.institution}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            className={classes.textField}
            placeholder="e.g., Stanford University"
            required
            error={!!validationErrors['education.institution']}
            helperText={validationErrors['education.institution'] || ''}
          />
        </Box>
        <Box className={classes.yearContainer}>
          {/* Year picker for graduation year */}
          <DatePickerField
            label="Year"
            value={
              resumeData.education.graduation_year ||
              resumeData.education.graduationYear ||
              ""
            }
            onChange={handleGraduationYearChange}
            views={["year"]} // Only show year picker
            required
            helperText={validationErrors['education.graduation_year'] || "Select graduation year"}
            error={!!validationErrors['education.graduation_year']}
            minYear={1950}
            maxYear={new Date().getFullYear() + 10} // Allow future dates for students
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EducationSection;