import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider} from '@apollo/client';
import { ApolloClientService } from './services/ApolloClientService.jsx'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { TokenContextProvider } from './context/TokenContextProvider.jsx';

const client = new ApolloClientService();
const theme = createTheme({
  palette: {
    primary: {
      main: "#D4CDC1"
    },
    secondary: {
      main: "#733A14"
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: "3.5rem",
      fontWeight: 600,
      color: "#040404",
      '@media (max-width:600px)': {
        fontSize: "2.5rem", // Adjust the font size for smaller devices here
      },
    },
    h3: {
      '@media (max-width:600px)': {
        fontSize: "2rem", // Adjust the font size for smaller devices here
      },
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <TokenContextProvider>
            <App />
          </TokenContextProvider>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
