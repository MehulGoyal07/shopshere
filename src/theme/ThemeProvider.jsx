import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#131921',
      light: '#232f3e',
      dark: '#0f1111',
    },
    secondary: {
      main: '#ff9900',
      light: '#ffb74d',
      dark: '#f08804',
    },
    background: {
      default: '#f3f3f3',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Amazon Ember", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          backgroundColor: '#ffd814',
          color: '#0f1111',
          '&:hover': {
            backgroundColor: '#f7ca00',
          },
        },
      },
    },
  },
})

export default function ThemeProvider({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}