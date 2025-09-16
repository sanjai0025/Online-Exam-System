import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, Button, Stack } from '@mui/material';

// Create a modern theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1',
      light: '#8b5cf6',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a855f7',
      dark: '#7c3aed',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// Mock components to demonstrate the UI without back buttons
const ExamSystemDemo = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h1" color="primary" gutterBottom>
          Online Exam System
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Back buttons have been successfully removed from all components
        </Typography>
      </Box>

      <Stack spacing={4}>
        {/* Dashboard Section */}
        <Box sx={{ 
          p: 3, 
          bgcolor: 'background.paper', 
          borderRadius: 2, 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
        }}>
          <Typography variant="h3" gutterBottom>
            Dashboard Components
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            All dashboard components now display without back buttons while maintaining full functionality.
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="contained" color="primary">
              Teacher Dashboard
            </Button>
            <Button variant="contained" color="secondary">
              Student Dashboard
            </Button>
            <Button variant="outlined" color="primary">
              Exam Results
            </Button>
            <Button variant="outlined" color="secondary">
              Profile Settings
            </Button>
          </Stack>
        </Box>

        {/* Exam Management Section */}
        <Box sx={{ 
          p: 3, 
          bgcolor: 'background.paper', 
          borderRadius: 2, 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
        }}>
          <Typography variant="h3" gutterBottom>
            Exam Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Exam creation, listing, and results viewing components updated without back navigation.
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="contained" color="primary">
              Create New Exam
            </Button>
            <Button variant="outlined" color="primary">
              View All Exams
            </Button>
            <Button variant="outlined" color="secondary">
              Exam Results
            </Button>
          </Stack>
        </Box>

        {/* User Management Section */}
        <Box sx={{ 
          p: 3, 
          bgcolor: 'background.paper', 
          borderRadius: 2, 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
        }}>
          <Typography variant="h3" gutterBottom>
            User Management
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Profile and settings pages streamlined without back button navigation.
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="contained" color="secondary">
              👤 Profile
            </Button>
            <Button variant="outlined" color="primary">
              ⚙️ Settings
            </Button>
            <Button variant="outlined" color="secondary">
              Print Results
            </Button>
          </Stack>
        </Box>

        {/* Changes Summary */}
        <Box sx={{ 
          p: 3, 
          bgcolor: 'primary.main', 
          color: 'white',
          borderRadius: 2, 
          boxShadow: '0 4px 6px rgba(99, 102, 241, 0.3)' 
        }}>
          <Typography variant="h3" gutterBottom sx={{ color: 'white' }}>
            Changes Made
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
            The following back buttons have been removed from the UI:
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
            <li>← Back to Dashboard (from AllResults, ExamList, TeacherExamResults)</li>
            <li>← Back (from Settings, Profile)</li>
            <li>Back to Exams (from ExamResults)</li>
            <li>Back to Dashboard (from StudentExamList empty state)</li>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
            All other functionality and navigation remains intact through the main navigation system.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExamSystemDemo />
    </ThemeProvider>
  );
}