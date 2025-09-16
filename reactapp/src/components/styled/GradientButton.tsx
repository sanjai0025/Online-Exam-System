import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledGradientButton = styled(Button)(({ theme, variant }) => ({
  background: variant === 'contained' 
    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)'
    : 'transparent',
  border: variant === 'outlined' 
    ? '2px solid transparent'
    : 'none',
  backgroundClip: variant === 'outlined' ? 'padding-box' : 'border-box',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  
  ...(variant === 'outlined' && {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
      borderRadius: 'inherit',
      zIndex: -1,
      margin: '-2px',
    },
    background: theme.palette.background.paper,
    backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }),
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
    ...(variant === 'outlined' && {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
      WebkitTextFillColor: 'white',
    }),
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 0,
    height: 0,
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.6s, height 0.6s',
  },
  
  '&:active::after': {
    width: '300px',
    height: '300px',
  },
}));

interface GradientButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function GradientButton({ children, ...props }: GradientButtonProps) {
  return <StyledGradientButton {...props}>{children}</StyledGradientButton>;
}