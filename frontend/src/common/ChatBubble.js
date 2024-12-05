import React from 'react';
import { Box, Typography, Stack, Avatar, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';

const ChatBubble = styled(Box)(({ theme, sender }) => ({
  backgroundColor: sender ? 'linear-gradient(135deg, #0F2D2E, #102F2F)' : '#262626', 
  color: '#ffffff', 
  padding: theme.spacing(1.5),
  borderRadius: sender ? '16px 16px 0 16px' : '16px 16px 16px 0', 
  display: 'inline-block',
  maxWidth: '85%',
  wordWrap: 'break-word',
  boxShadow: sender ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none', 
}));

const ChatBubbleComponent = ({ text, sender, avatar }) => {
  const mobile = useMediaQuery('(max-width:915px)');
  return (
    <Stack width="100%" direction="row" alignItems="center" pb={2}>
      {sender && <Box flex={1} />} 
      {!sender && (
        <Avatar
          alt="match"
          src={avatar} 
          sx={{ mr: 1.5 }}
        />
      )}
      <ChatBubble sender={sender}>
        <Typography fontSize={mobile ? 16 : '1.2vw'}>{text}</Typography>
      </ChatBubble>
    </Stack>
  );
};

export default ChatBubbleComponent;
