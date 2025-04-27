// src/components/common/RichTextEditor.jsx
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import makeStylesWithTheme from '../../styles/makeStylesAdapter';
import { Box, Typography } from '@mui/material';

const useStyles = makeStylesWithTheme((theme) => ({
  editorContainer: {
    marginBottom: '1rem',
  },
  label: {
    marginBottom: '0.5rem',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
  },
  editorRoot: {
    '& .ql-container': {
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      fontFamily: 'inherit',
    },
    '& .ql-toolbar': {
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
    },
    '& .ql-editor': {
      minHeight: '150px',
      fontFamily: 'inherit',
    },
  },
  error: {
    color: '#f44336',
    fontSize: '0.75rem',
    marginTop: '3px',
  },
}));

const RichTextEditor = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  required,
}) => {
  const classes = useStyles();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'code-block'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'code-block',
  ];

  return (
    <Box className={classes.editorContainer}>
      {label && (
        <Typography component="label" className={classes.label} required={required}>
          {label}
        </Typography>
      )}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className={classes.editorRoot}
      />
      {error && helperText && (
        <Typography className={classes.error}>{helperText}</Typography>
      )}
    </Box>
  );
};

export default RichTextEditor;