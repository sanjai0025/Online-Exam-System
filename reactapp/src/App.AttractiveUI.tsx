import React from 'react';
import { ThemeProvider, CssBaseline, Container, Stack, Box, Typography } from '@mui/material';
import { 
  Dashboard, 
  Quiz, 
  Assessment, 
  School, 
  Person, 
  Settings,
  TrendingUp,
  EmojiEvents,
  Groups,
  Assignment
} from '@mui/icons-material';
import theme from './theme';
import HeroSection from './components/HeroSection';
import GlassCard from './components/styled/GlassCard';
import StatsCard from './components/styled/StatsCard';
import FeatureCard from './components/styled/FeatureCard';
import GradientButton from './components/styled/GradientButton';

const AttractiveExamSystem = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Stack spacing={8}>
          {/* Stats Section */}
          <Box>
            <Typography 
              variant="h2" 
              textAlign="center" 
              sx={{ 
                mb: 6,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              System Overview
            </Typography>
            
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
                gap: 4,
              }}
            >
              <StatsCard
                icon={<Assignment />}
                number="156"
                label="Total Exams"
              />
              <StatsCard
                icon={<Groups />}
                number="2,847"
                label="Active Students"
              />
              <StatsCard
                icon={<EmojiEvents />}
                number="89%"
                label="Success Rate"
              />
              <StatsCard
                icon={<TrendingUp />}
                number="4.8"
                label="Average Rating"
              />
            </Box>
          </Box>

          {/* Features Section */}
          <Box>
            <Typography 
              variant="h2" 
              textAlign="center" 
              sx={{ 
                mb: 6,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              Key Features
            </Typography>
            
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
                gap: 4,
              }}
            >
              <FeatureCard
                icon={<Dashboard />}
                title="Teacher Dashboard"
                description="Comprehensive dashboard for managing exams, viewing results, and tracking student progress with advanced analytics."
              />
              <FeatureCard
                icon={<Quiz />}
                title="Smart Exam Creation"
                description="Create engaging exams with multiple question types, automatic grading, and customizable time limits."
              />
              <FeatureCard
                icon={<Assessment />}
                title="Detailed Analytics"
                description="Get insights into student performance with detailed reports, grade distributions, and progress tracking."
              />
              <FeatureCard
                icon={<School />}
                title="Student Portal"
                description="User-friendly interface for students to take exams, view results, and track their academic progress."
              />
              <FeatureCard
                icon={<Person />}
                title="Profile Management"
                description="Manage user profiles, preferences, and account settings with a modern, intuitive interface."
              />
              <FeatureCard
                icon={<Settings />}
                title="System Settings"
                description="Configure system preferences, notifications, privacy settings, and customize the learning experience."
              />
            </Box>
          </Box>

          {/* Enhanced UI Showcase */}
          <GlassCard>
            <Stack spacing={4} alignItems="center" textAlign="center">
              <Typography 
                variant="h3" 
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                }}
              >
                Enhanced User Experience
              </Typography>
              
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800 }}>
                Our redesigned interface features modern glassmorphism effects, smooth animations, 
                gradient elements, and an intuitive layout that makes learning and teaching more engaging than ever.
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  What's New:
                </Typography>
                <Stack spacing={2} sx={{ textAlign: 'left', maxWidth: 600 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
                      }} 
                    />
                    <Typography>Glassmorphism design with backdrop blur effects</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' 
                      }} 
                    />
                    <Typography>Smooth hover animations and micro-interactions</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)' 
                      }} 
                    />
                    <Typography>Beautiful gradient buttons and interactive elements</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)' 
                      }} 
                    />
                    <Typography>Enhanced typography with modern font pairings</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' 
                      }} 
                    />
                    <Typography>Improved color contrast and accessibility</Typography>
                  </Box>
                </Stack>
              </Box>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 4 }}>
                <GradientButton variant="contained" size="large">
                  Experience the New UI
                </GradientButton>
                <GradientButton variant="outlined" size="large">
                  View Documentation
                </GradientButton>
              </Stack>
            </Stack>
          </GlassCard>
        </Stack>
      </Container>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AttractiveExamSystem />
    </ThemeProvider>
  );
}