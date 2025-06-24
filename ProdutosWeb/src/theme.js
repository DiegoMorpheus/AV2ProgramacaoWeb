// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F25270',
    },
    secondary: {
      main: '#F2A7B5',
    },
    error: {
      main: '#F20505',
    },
    warning: {
      main: '#F25252',
    },
    background: {
      default: '#0D0D0D',
      paper: '#1a1a1a', // ou #0D0D0D para fundo escuro total
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#F2A7B5',
    },
  },
});
export default theme;
