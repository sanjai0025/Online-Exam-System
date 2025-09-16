import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledStatsCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
  },
  
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)',
  },
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  margin: '0 auto 16px',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  fontSize: '1.5rem',
  boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
}));

const StatsNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
}));

interface StatsCardProps {
  icon: React.ReactNode;
  number: string | number;
  label: string;
  onClick?: () => void;
}

export default function StatsCard({ icon, number, label, onClick }: StatsCardProps) {
  return (
    <StyledStatsCard onClick={onClick}>
      <IconWrapper>{icon}</IconWrapper>
      <StatsNumber variant="h3">{number}</StatsNumber>
      <Typography variant="body1" color="text.secondary" fontWeight={500}>
        {label}
      </Typography>
    </StyledStatsCard>
  );
}