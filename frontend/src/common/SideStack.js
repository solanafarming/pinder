import React from 'react';
import { Box, Stack, Avatar, Typography, Divider } from '@mui/material';

function SideStack({ name, image, message, main = false }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={1}
      pr={0}
      py={0}
      spacing={1}
      bgcolor={main ? '#1b1b1b' : '#171717'} 
      width="100%"
      height="15.5vh"
      sx={{
        cursor: 'pointer',
        ':hover': {
          bgcolor: '#262626', 
        },
      }}
    >
      <Avatar
        src={image} 
        alt={name}
        sx={{
          height: '13vh',
          width: '13vh',
          boxShadow: '0 4px 15px rgba(0, 255, 204, 0.3)', 
        }}
      />
      <Stack direction="column" alignItems="start" spacing={0}>
        <Typography fontSize="3vh" fontWeight="bold" color="#ffffff">
          {name}
        </Typography>
        <Typography fontSize="2.5vh" color="#a5a5a5">
          {message}
        </Typography>
      </Stack>
      <Box flex={1} />
      {main ? (
        <Box
          width="5px"
          bgcolor="linear-gradient(130deg, #e03c00, orange)"
          height="100%"
        />
      ) : (
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: '#4a4a4a', marginLeft: 0 }}
        />
      )}
    </Stack>
  );
}

export default SideStack;
