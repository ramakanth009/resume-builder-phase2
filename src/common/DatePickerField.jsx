import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import makeStylesWithTheme from '../styles/makeStylesAdapter';

const useStyles = makeStylesWithTheme((theme) => ({
  datePickerContainer: {
    marginBottom: '1rem',
  },
  datePicker: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      width: '100%'
    }
  }
}));

/**
 * Date Picker Field Component
 * @param {Object} props - Component props
 * @param {string} props.label - Field label
 * @param {string} props.value - Current date value (string)
 * @param {Function} props.onChange - Function to call on date change
 * @param {Object} props.views - Date picker views (year, month, day)
 * @param {boolean} props.required - Whether field is required
 * @param {string} props.helperText - Helper text for the field
 * @param {number} props.minYear - Minimum allowed year
 * @param {number} props.maxYear - Maximum allowed year
 */
const DatePickerField = ({ 
  label, 
  value, 
  onChange, 
  views = ['year', 'month'],
  required = false,
  helperText = '',
  minYear = 1950,
  maxYear = new Date().getFullYear() + 5 // Allow future dates up to 5 years
}) => {
  const classes = useStyles();

  // Always derive dateValue from prop
  let dateValue = null;
  if (value) {
    if (views.includes('month') && views.includes('year')) {
      try {
        dateValue = new Date(value);
      } catch (e) {
        dateValue = null;
      }
    } else if (views.includes('year') && !views.includes('month')) {
      try {
        dateValue = new Date(parseInt(value), 0, 1);
      } catch (e) {
        dateValue = null;
      }
    }
  }

  // Handle date change from picker
  const handleDateChange = (newDate) => {
    if (!newDate) {
      onChange("");
      return;
    }
    if (views.includes('year') && !views.includes('month')) {
      const year = newDate.getFullYear().toString();
      onChange(year);
    } else if (views.includes('month') && views.includes('year')) {
      const month = newDate.toLocaleString('default', { month: 'long' });
      const year = newDate.getFullYear();
      onChange(`${month} ${year}`);
    }
  };

  // Determine min and max dates
  const minDate = new Date(minYear, 0, 1);
  const maxDate = new Date(maxYear, 11, 31);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={classes.datePickerContainer}>
        <DatePicker
          label={label}
          value={dateValue}
          onChange={handleDateChange}
          views={views}
          minDate={minDate}
          maxDate={maxDate}
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              required: required,
              helperText: helperText,
              className: classes.datePicker
            }
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DatePickerField;