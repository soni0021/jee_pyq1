// src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@material-tailwind/react'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import './index.css'

// Create Material UI theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4F46E5',
      light: '#818CF8',
      dark: '#3730A3',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>
)