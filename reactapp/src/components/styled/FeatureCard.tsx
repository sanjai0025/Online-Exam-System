import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFeatureCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: -1,
  },
  
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 25px 50px rgba(99, 102, 241, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    
    '&::before': {
      opacity: 0.1,
    },
    
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      filter: 'drop-shadow(0 8px 16px rgba(99, 102, 241, 0.4))',
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  color: 'white',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
}));

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function FeatureCard({ icon, title, description, onClick }: FeatureCardProps) {
  return (
    <StyledFeatureCard onClick={onClick}>
      <IconWrapper className="feature-icon">
        {icon}
      </IconWrapper>
      <Stack spacing={2}>
        <Typography 
          variant="h5" 
          fontWeight={600}
          sx={{
            background: 'linear-gradient(135deg, #1a202c 0%, #4a5568 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" lineHeight={1.6}>
          {description}
        </Typography>
      </Stack>
    </StyledFeatureCard>
  );
}