import React from 'react';
import { 
  Box,
  Button
} from '@mui/material';
import { dummyResumes } from '../../data/dummyResumeData';

const DummyDataLoader = ({ onLoadData }) => {
  const handleLoadData = () => {
    const dummyData = dummyResumes[0];
    onLoadData(dummyData);
  };

  return (
    <Box sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button
        variant="outlined"
        onClick={handleLoadData}
        color="primary"
      >
        Load Dummy Data
      </Button>
    </Box>
  );
};

export default DummyDataLoader;
