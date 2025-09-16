import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1',
      light: '#8b5cf6',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
    '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
    '0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)',
    '0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)',
    '0px 24px 48px rgba(0, 0, 0, 0.35), 0px 19px 19px rgba(0, 0, 0, 0.22)',
    '0px 32px 64px rgba(0, 0, 0, 0.40), 0px 24px 24px rgba(0, 0, 0, 0.22)',
    '0px 40px 80px rgba(0, 0, 0, 0.45), 0px 30px 30px rgba(0, 0, 0, 0.22)',
    '0px 48px 96px rgba(0, 0, 0, 0.50), 0px 36px 36px rgba(0, 0, 0, 0.22)',
    '0px 56px 112px rgba(0, 0, 0, 0.55), 0px 42px 42px rgba(0, 0, 0, 0.22)',
    '0px 64px 128px rgba(0, 0, 0, 0.60), 0px 48px 48px rgba(0, 0, 0, 0.22)',
    '0px 72px 144px rgba(0, 0, 0, 0.65), 0px 54px 54px rgba(0, 0, 0, 0.22)',
    '0px 80px 160px rgba(0, 0, 0, 0.70), 0px 60px 60px rgba(0, 0, 0, 0.22)',
    '0px 88px 176px rgba(0, 0, 0, 0.75), 0px 66px 66px rgba(0, 0, 0, 0.22)',
    '0px 96px 192px rgba(0, 0, 0, 0.80), 0px 72px 72px rgba(0, 0, 0, 0.22)',
    '0px 104px 208px rgba(0, 0, 0, 0.85), 0px 78px 78px rgba(0, 0, 0, 0.22)',
    '0px 112px 224px rgba(0, 0, 0, 0.90), 0px 84px 84px rgba(0, 0, 0, 0.22)',
    '0px 120px 240px rgba(0, 0, 0, 0.95), 0px 90px 90px rgba(0, 0, 0, 0.22)',
    '0px 128px 256px rgba(0, 0, 0, 1.00), 0px 96px 96px rgba(0, 0, 0, 0.22)',
    '0px 136px 272px rgba(0, 0, 0, 1.00), 0px 102px 102px rgba(0, 0, 0, 0.22)',
    '0px 144px 288px rgba(0, 0, 0, 1.00), 0px 108px 108px rgba(0, 0, 0, 0.22)',
    '0px 152px 304px rgba(0, 0, 0, 1.00), 0px 114px 114px rgba(0, 0, 0, 0.22)',
    '0px 160px 320px rgba(0, 0, 0, 1.00), 0px 120px 120px rgba(0, 0, 0, 0.22)',
    '0px 168px 336px rgba(0, 0, 0, 1.00), 0px 126px 126px rgba(0, 0, 0, 0.22)',
  ],
});

export default theme;