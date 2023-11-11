import React from 'react'
import { Box,Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export default function ErrorComponent() {
    const error = useRouteError();
    console.log(error);
  return (
    <Box style={{marginLeft:250}}>
        <Typography>There was a error loading this page</Typography>
    </Box>
  )
}
