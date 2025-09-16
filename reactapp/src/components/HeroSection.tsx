import React from 'react';
import { Box, Typography, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CelebrationOutlined, EmojiEventsOutlined, SchoolOutlined } from '@mui/icons-material';
import GradientButton from './styled/GradientButton';

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `
    linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%),
    url('https://images.unsplash.com/photo-1618367588421-400296bac364?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxncmFkaWVudCUyMGFic3RyYWN0JTIwYmFja2dyb3VuZHxlbnwwfDB8fHB1cnBsZXwxNzU3OTA1MjAzfDA&ixlib=rb-4.1.0&q=85')
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(248, 250, 252, 0.9)',
    backdropFilter: 'blur(1px)',
  },
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
  animation: 'float 6s ease-in-out infinite',
  
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  textAlign: 'center',
}));

export default function HeroSection() {
  return (
    <HeroContainer>
      {/* Floating Elements */}
      <FloatingElement 
        sx={{ 
          top: '10%', 
          left: '10%', 
          width: 60, 
          height: 60,
          animationDelay: '0s' 
        }} 
      />
      <FloatingElement 
        sx={{ 
          top: '20%', 
          right: '15%', 
          width: 40, 
          height: 40,
          animationDelay: '2s' 
        }} 
      />
      <FloatingElement 
        sx={{ 
          bottom: '15%', 
          left: '20%', 
          width: 80, 
          height: 80,
          animationDelay: '4s' 
        }} 
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={6} alignItems="center" textAlign="center">
          {/* Main Title */}
          <Stack spacing={3}>
            <GradientText variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.5rem' } }}>
              Online Exam System
            </GradientText>
            <Typography 
              variant="h4" 
              color="text.secondary"
              sx={{ 
                maxWidth: 600,
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              Experience the future of education with our modern, intuitive exam platform
            </Typography>
          </Stack>

          {/* Feature Highlights */}
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={4}
            sx={{ mt: 4 }}
          >
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  boxShadow: '0 12px 24px rgba(99, 102, 241, 0.4)',
                }}
              >
                <SchoolOutlined fontSize="large" />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                Smart Learning
              </Typography>
            </Stack>

            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  boxShadow: '0 12px 24px rgba(139, 92, 246, 0.4)',
                }}
              >
                <EmojiEventsOutlined fontSize="large" />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                Achievement Focused
              </Typography>
            </Stack>

            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  boxShadow: '0 12px 24px rgba(236, 72, 153, 0.4)',
                }}
              >
                <CelebrationOutlined fontSize="large" />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                Celebrate Success
              </Typography>
            </Stack>
          </Stack>

          {/* Call to Action */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 6 }}>
            <GradientButton 
              variant="contained" 
              size="large"
              sx={{ 
                px: 4, 
                py: 2,
                fontSize: '1.1rem',
                minWidth: 200,
              }}
            >
              Get Started Today
            </GradientButton>
            <GradientButton 
              variant="outlined" 
              size="large"
              sx={{ 
                px: 4, 
                py: 2,
                fontSize: '1.1rem',
                minWidth: 200,
              }}
            >
              Learn More
            </GradientButton>
          </Stack>
        </Stack>
      </Container>
    </HeroContainer>
  );
}