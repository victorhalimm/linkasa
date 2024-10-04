import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#333840',
      light: '#505860', // Lighter shade for selected items
      contrastText: '#fff',
    },
    secondary: {
      main: '#29b6f6',
      light: '#63ccff', // Lighter shade of secondary color
    },
    background: {
      default: '#eceff1',
      paper: '#ffffff',
    },
    text: {
      primary: '#102027',
      secondary: '#546e7a',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ffa000',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
  },
});

export default theme;
