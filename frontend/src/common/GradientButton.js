import { styled } from '@mui/system';
import { Button } from '@mui/material';

const GradientButton = styled(Button)({
  background: 'linear-gradient(135deg, #0F2D2E, #102F2F)',
  borderRadius: '50px',
  color: 'white',
  padding: '10px 20px',
  fontWeight: 600,
  fontSize: '1rem',
  height: '42px',
  textTransform: 'none', 
  '&:hover': {
    background: 'linear-gradient(135deg, #102F2F, #0F2D2E)', 
    boxShadow: '0 6px 15px rgba(0, 255, 204, 0.4)', 
  },
});

export default GradientButton;
