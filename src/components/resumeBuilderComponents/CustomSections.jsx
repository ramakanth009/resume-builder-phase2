import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import makeStylesWithTheme from "../../styles/makeStylesAdapter";

const useStyles = makeStylesWithTheme((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    "@media (max-width: 1200px)": {
      gap: "0.9rem",
    },
    "@media (max-width: 960px)": {
      gap: "0.8rem",
    },
    "@media (max-width: 600px)": {
      gap: "0.7rem",
    },
    "@media (max-width: 480px)": {
      gap: "0.6rem",
    },
    "@media (max-width: 375px)": {
      gap: "0.5rem",
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
      "@media (max-width: 600px)": {
        fontSize: "0.85rem",
      },
      "@media (max-width: 480px)": {
        fontSize: "0.8rem",
      },
      "@media (max-width: 375px)": {
        fontSize: "0.75rem",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#14b8a6",
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "1rem",
      "@media (max-width: 600px)": {
        fontSize: "0.9rem",
      },
      "@media (max-width: 480px)": {
        fontSize: "0.85rem",
      },
      "@media (max-width: 375px)": {
        fontSize: "0.8rem",
      },
    },
  },
  formDescription: {
    marginBottom: "24px",
    color: "#666",
    fontSize: "1rem",
    "@media (max-width: 1200px)": {
      marginBottom: "22px",
      fontSize: "0.95rem",
    },
    "@media (max-width: 960px)": {
      marginBottom: "20px",
      fontSize: "0.9rem",
      textAlign: "center",
    },
    "@media (max-width: 600px)": {
      marginBottom: "18px",
      fontSize: "0.85rem",
    },
    "@media (max-width: 480px)": {
      marginBottom: "16px",
      fontSize: "0.8rem",
    },
    "@media (max-width: 375px)": {
      marginBottom: "14px",
      fontSize: "0.75rem",
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
    "@media (max-width: 1200px)": {
      fontSize: "1.4rem",
    },
    "@media (max-width: 960px)": {
      fontSize: "1.3rem",
      textAlign: "center",
    },
    "@media (max-width: 600px)": {
      fontSize: "1.2rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "1.1rem",
    },
    "@media (max-width: 375px)": {
      fontSize: "1rem",
    },
  },
  paper: {
    padding: "1.5rem",
    marginBottom: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    position: "relative",
    "@media (max-width: 1200px)": {
      padding: "1.3rem",
      marginBottom: "1.3rem",
    },
    "@media (max-width: 960px)": {
      padding: "1.2rem",
      marginBottom: "1.2rem",
    },
    "@media (max-width: 600px)": {
      padding: "1rem",
      marginBottom: "1rem",
    },
    "@media (max-width: 480px)": {
      padding: "0.8rem",
      marginBottom: "0.8rem",
    },
    "@media (max-width: 375px)": {
      padding: "0.7rem",
      marginBottom: "0.7rem",
    },
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#2d3748",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.1rem",
    "@media (max-width: 1200px)": {
      fontSize: "1.05rem",
      marginBottom: "0.9rem",
    },
    "@media (max-width: 960px)": {
      fontSize: "1rem",
      marginBottom: "0.8rem",
    },
    "@media (max-width: 600px)": {
      fontSize: "0.95rem",
      marginBottom: "0.7rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "0.9rem",
      marginBottom: "0.6rem",
    },
    "@media (max-width: 375px)": {
      fontSize: "0.85rem",
      marginBottom: "0.5rem",
    },
  },
  deleteButton: {
    color: "#e53e3e",
    position: "absolute",
    top: "1rem",
    right: "1rem",
    "@media (max-width: 1200px)": {
      top: "0.9rem",
      right: "0.9rem",
    },
    "@media (max-width: 960px)": {
      top: "0.8rem",
      right: "0.8rem",
    },
    "@media (max-width: 600px)": {
      top: "0.7rem",
      right: "0.7rem",
      padding: "4px",
    },
    "@media (max-width: 480px)": {
      top: "0.6rem",
      right: "0.6rem",
    },
    "@media (max-width: 375px)": {
      top: "0.5rem",
      right: "0.5rem",
    },
  },
  addButton: {
    backgroundColor: "#ebf8ff",
    color: "#3182ce",
    borderRadius: "8px",
    textTransform: "none",
    height: "56px",
    fontSize: "1rem",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#bee3f8",
    },
    "@media (max-width: 1200px)": {
      height: "52px",
      fontSize: "0.95rem",
    },
    "@media (max-width: 960px)": {
      height: "48px",
      fontSize: "0.9rem",
    },
    "@media (max-width: 600px)": {
      height: "44px",
      fontSize: "0.85rem",
      width: "100%",
    },
    "@media (max-width: 480px)": {
      height: "40px",
      fontSize: "0.8rem",
    },
    "@media (max-width: 375px)": {
      height: "36px",
      fontSize: "0.75rem",
    },
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginBottom: "1rem",
    '& .MuiChip-deleteIcon': {
        color: 'white',
      },
    "@media (max-width: 1200px)": {
      gap: "0.7rem",
      marginTop: "0.9rem",
    },
    "@media (max-width: 960px)": {
      gap: "0.65rem",
      marginTop: "0.8rem",
    },
    "@media (max-width: 600px)": {
      gap: "0.6rem",
      marginTop: "0.7rem",
    },
    "@media (max-width: 480px)": {
      gap: "0.5rem",
      marginTop: "0.6rem",
    },
    "@media (max-width: 375px)": {
      gap: "0.4rem",
      marginTop: "0.5rem",
    },
  },
  chip: {
    background: "#27286c",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "12px",
    fontSize: "0.875rem",
    fontWeight: 500,
    boxShadow: "0 2px 8px rgba(39, 40, 108, 0.2)",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 16px rgba(39, 40, 108, 0.3)",
    },
    "@media (max-width: 1200px)": {
      fontSize: "0.85rem",
      padding: "0.45rem 0.9rem",
    },
    "@media (max-width: 960px)": {
      fontSize: "0.8rem",
      padding: "0.4rem 0.8rem",
      "&:hover": {
        transform: "translateY(-1px)",
      },
    },
    "@media (max-width: 600px)": {
      fontSize: "0.75rem",
      padding: "0.35rem 0.7rem",
      "&:hover": {
        transform: "none",
      },
    },
    "@media (max-width: 480px)": {
      fontSize: "0.7rem",
      padding: "0.3rem 0.6rem",
    },
    "@media (max-width: 375px)": {
      fontSize: "0.65rem",
      padding: "0.25rem 0.5rem",
    },
  },
  inputContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    width: "100%",
    "@media (max-width: 1200px)": {
      gap: "0.9rem",
    },
    "@media (max-width: 960px)": {
      gap: "0.8rem",
    },
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "0.7rem",
    },
    "@media (max-width: 480px)": {
      gap: "0.6rem",
    },
    "@media (max-width: 375px)": {
      gap: "0.5rem",
    },
  },
  inputField: {
    flex: 1,
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  sectionsList: {
    marginTop: "1rem",
    marginBottom: "1rem",
    "@media (max-width: 1200px)": {
      marginTop: "0.9rem",
      marginBottom: "0.9rem",
    },
    "@media (max-width: 960px)": {
      marginTop: "0.8rem",
      marginBottom: "0.8rem",
    },
    "@media (max-width: 600px)": {
      marginTop: "0.7rem",
      marginBottom: "0.7rem",
    },
    "@media (max-width: 480px)": {
      marginTop: "0.6rem",
      marginBottom: "0.6rem",
    },
    "@media (max-width: 375px)": {
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
    },
  },
}));

const suggestedSections = [
  "Languages",
  "Strengths",
  "Hobbies",
  "Used_Tools",
  "Key_Achievements",
  "Metrics_Used",
  "Soft_Skills",
  "Professional_Affiliations",
];

const CustomSections = ({ resumeData, setResumeData }) => {
  const classes = useStyles();
  const [sectionName, setSectionName] = useState("");
  const [itemText, setItemText] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  // Get existing custom section names
  const existingSections = Object.keys(resumeData.customSections || {});

  const handleAddCustomSection = () => {
    if (sectionName.trim() === "") return;

    // Prevent duplicate sections
    if (existingSections.includes(sectionName)) {
      return;
    }

    setResumeData((prev) => ({
      ...prev,
      customSections: {
        ...prev.customSections,
        [sectionName]: [],
      },
    }));

    setSelectedSection(sectionName);
    setSectionName("");
  };

  const handleRemoveSection = (section) => {
    const updatedCustomSections = { ...resumeData.customSections };
    delete updatedCustomSections[section];

    setResumeData((prev) => ({
      ...prev,
      customSections: updatedCustomSections,
    }));

    if (selectedSection === section) {
      setSelectedSection("");
    }
  };

  const handleAddItem = () => {
    if (!selectedSection || itemText.trim() === "") return;

    setResumeData((prev) => ({
      ...prev,
      customSections: {
        ...prev.customSections,
        [selectedSection]: [
          ...(prev.customSections[selectedSection] || []),
          itemText.trim(),
        ],
      },
    }));

    setItemText("");
  };

  const handleRemoveItem = (section, index) => {
    const updatedItems = [...(resumeData.customSections[section] || [])];
    updatedItems.splice(index, 1);

    setResumeData((prev) => ({
      ...prev,
      customSections: {
        ...prev.customSections,
        [section]: updatedItems,
      },
    }));
  };

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  const handleSelectSuggestedSection = (suggestedSection) => {
    // Only add if not already present
    if (!existingSections.includes(suggestedSection)) {
      setResumeData((prev) => ({
        ...prev,
        customSections: {
          ...prev.customSections,
          [suggestedSection]: [],
        },
      }));

      setSelectedSection(suggestedSection);
    } else {
      // If already exists, just select it
      setSelectedSection(suggestedSection);
    }
  };

  // This function renders all created sections
  const renderAllSections = () => {
    if (existingSections.length === 0) {
      return (
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ my: 3 }}
        >
          No custom sections added yet. Add a section to get started.
        </Typography>
      );
    }

    return existingSections.map((section) => (
      <Paper key={section} className={classes.paper}>
        <Box className={classes.sectionTitle}>
          <Typography variant="h6">{section.replace("_", " ")}</Typography>
          <IconButton
            color="error"
            onClick={() => handleRemoveSection(section)}
            className={classes.deleteButton}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        {/* Items in the current section */}
        <Box className={classes.chipContainer}>
          {(resumeData.customSections[section] || []).map((item, index) => (
            <Chip
              key={index}
              label={item}
              onDelete={() => handleRemoveItem(section, index)}
              className={classes.chip}
            />
          ))}
        </Box>

        {/* Add new item to this section */}
        <Box className={classes.inputContainer}>
          <TextField
            className={`${classes.inputField} ${classes.textField}`}
            label={`Add to ${section.replace("_", " ")}`}
            value={section === selectedSection ? itemText : ""}
            onChange={(e) => {
              setSelectedSection(section);
              setItemText(e.target.value);
            }}
            variant="outlined"
            fullWidth
            placeholder="Enter text for this section"
            onKeyDown={(e) => handleKeyDown(e, handleAddItem)}
          />
          <Button
            variant="contained"
            className={classes.addButton}
            onClick={() => {
              setSelectedSection(section);
              handleAddItem();
            }}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>
      </Paper>
    ));
  };

  return (
    <Box className={classes.form}>
      {/* CUSTOM SECTIONS PART */}
      <Box>
        <Typography variant="h6" className={classes.formSubtitle}>
          Custom Sections
        </Typography>
        <Typography variant="subtitle1" className={classes.formDescription}>
          Add sections to highlight your unique strengths.
        </Typography>
      </Box>

      {/* Add new custom section - better aligned horizontally */}
      <Box className={classes.inputContainer}>
        <TextField
          className={`${classes.inputField} ${classes.textField}`}
          label="New Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="e.g., Languages, Hobbies, Publications"
          onKeyDown={(e) => handleKeyDown(e, handleAddCustomSection)}
        />
        <Button
          variant="contained"
          className={classes.addButton}
          onClick={handleAddCustomSection}
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>

      {/* Suggested sections */}
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Or select from suggested sections:
      </Typography>

      <Box className={classes.chipContainer}>
        {suggestedSections.map((section) => (
          <Chip
            key={section}
            label={section.replace("_", " ")}
            onClick={() => handleSelectSuggestedSection(section)}
            className={classes.chip}
            variant={existingSections.includes(section) ? "filled" : "outlined"}
          />
        ))}
      </Box>

      {/* All sections rendered persistently */}
      <Box className={classes.sectionsList}>{renderAllSections()}</Box>
    </Box>
  );
};

export default CustomSections;