import React from 'react';
import { Box, Typography } from '@mui/material';

export default function TabPanel(props) {
    const { children, value, index} = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
      >
        {value === index && (
          <Box sx={{ p: 3, margin: 'auto'}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}