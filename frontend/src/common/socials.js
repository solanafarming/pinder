import React from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const baseUrl = 'http://localhost:5000/static/images'; 
const pairAddress = 'AQi2eNBXchs9899aavN9dg7oCNr1FGqjn8kmed5fhLp7';
const teleLink = `https://t.me/catinder_sol`;
const xLink = 'https://twitter.com/catinder_sol';
const dexLink = `https://dexscreener.com/solana/${pairAddress}`;

const HoverImage = styled('img')({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.2)', 
    boxShadow: '0 4px 15px rgba(0, 255, 204, 0.5)',
  },
  cursor: 'pointer',
});

function Socials({ size1, size2, size3 }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2.25}>
      <HoverImage
        src={`${baseUrl}/telegram.webp`}
        alt="telegram"
        width={size1}
        height="auto"
        onClick={() => window.open(teleLink, '_blank')}
      />
      <HoverImage
        src={`${baseUrl}/x.webp`} 
        alt="x"
        width={size2}
        height="auto"
        onClick={() => window.open(xLink, '_blank')}
      />
      <HoverImage
        src={`${baseUrl}/dex.webp`} 
        alt="dexscreener"
        width={size3}
        height="auto"
        onClick={() => window.open(dexLink, '_blank')}
      />
    </Stack>
  );
}

export default Socials;
