// useDummyResumeData.js
// A custom hook to easily import and use the dummy resume data in your components

import { useState } from 'react';
import dummyResumeData from './dummyResumeData';

/**
 * A custom hook that provides functions to work with dummy resume data
 * @returns {Object} Functions to load and reset dummy data
 */
const useDummyResumeData = (initialData, setResumeData) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to load the dummy data into the form
  const loadDummyData = () => {
    setResumeData(dummyResumeData);
    setIsLoaded(true);
    return true;
  };

  // Function to reset the form to its initial state
  const resetData = () => {
    setResumeData(initialData);
    setIsLoaded(false);
    return true;
  };

  return {
    loadDummyData,
    resetData,
    isLoaded
  };
};

export default useDummyResumeData;