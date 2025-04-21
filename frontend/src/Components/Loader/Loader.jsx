import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="1vh"
      width="100%"
      padding="3vh"
    >
      <CircularProgress size={60} thickness={4.5} />
    </Box>
  );
};

export default Loader;
