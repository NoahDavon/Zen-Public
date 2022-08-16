import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from '../components/Navbar';
import "@fontsource/noto-serif"
import "@fontsource/roboto"
import Footer from '../components/Footer';
import Head from 'next/head';
import {CartProvider} from 'react-use-cart'
import React, { useState, useEffect } from 'react';
import analytics from 'react-ga';
import Router from "next/router";
import { CircularProgress } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { AuthContext } from '../lib/context';


analytics.initialize('UA-235437289-1');
 var theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ebedc1',
    },
    secondary: {
      main: '#acb5b0',
    },
    background: {
      default: '#0c1f23',
      paper: '#0c1f23'
    },
    text: {
      primary: '#ebedc1',
      secondary: '#ebedc1',
      disabled: 'rgba(255, 255, 255, 0.3)'
    },
    success: {
      main: '#4caf51',
    },
    action: {
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabled: 'rgba(255, 255, 255, 0.3)'
    },

    divider:'#ebedc1'
  },
  typography: {
    h1: {
      fontFamily: 'Noto Serif',
      fontSize: '4.5rem',
    },
    h2:{
      fontFamily: 'Noto Serif',
      fontSize: '3rem',
    },
    h3:{
      fontFamily:'Noto Serif',
      fontSize:'2.5rem'
    },
    
    h4:{
      fontFamily:'Noto Serif',
      fontSize:'2rem'
    },
    
    h5:{
      fontFamily:'Noto Serif',
      fontSize:'1.5rem'
    },

    body1:{
      fontFamily: 'Roboto',
      fontSize: '1.5rem',
    }
  },
  components: {
    // Name of the component
    MuiLinearProgress: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: '#0c1f23'
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        // Name of the slot
        expandIconWrapper: {
          // Some CSS
          color: '#ebedc1',
        },
      },
    },
  },
});

var lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0c1f23',
    },
    secondary: {
      main: '#acb5b0',
    },
    background: {
      default: '#ebedc1',
      paper: '#0c1f23'
    },
    text: {
      primary: '#0c1f23',
      secondary: '#0c1f23',
      disabled: 'rgba(255, 255, 255, 0.3)'
    },
    success: {
      main: '#4caf51',
    },
    action: {
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabled: 'rgba(255, 255, 255, 0.3)'
    },

    divider:'#0c1f23'
  },
  typography: {
    h1: {
      fontFamily: 'Noto Serif',
      fontSize: '4.5rem',
    },
    h2:{
      fontFamily: 'Noto Serif',
      fontSize: '3rem',
    },
    h3:{
      fontFamily:'Noto Serif',
      fontSize:'2.5rem'
    },
    
    h4:{
      fontFamily:'Noto Serif',
      fontSize:'2rem'
    },
    
    h5:{
      fontFamily:'Noto Serif',
      fontSize:'1.5rem'
    },

    body1:{
      fontFamily: 'Roboto',
      fontSize: '1.5rem',
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: '#ebedc1'
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: '#ebedc1'
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        "root": {
          "&.Mui-disabled": {
            "backgroundColor": "#0c1f23"
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: '#ebedc1',
          color: '#0c1f23',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        // Name of the slot
        expandIconWrapper: {
          // Some CSS
          color: '#0c1f23',
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    analytics.pageview(window.location.pathname + window.location.search);
  }, []);
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <ThemeProvider theme={dark? theme: lightTheme}>
      <CssBaseline />
      <Head>
      <title>Zen Specialty Coffee</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CartProvider>
        <AuthContext.Provider value={{user: user}}>
          <Navbar setDark={setDark} dark={dark}/>
          {loading? <div style={{justifySelf:'center', margin:'auto', width:'fit-content', backgroundColor:'#0c1f23'}}><CircularProgress size={200} sx={{marginX:'auto', marginY:'100px'}} color='primary'/></div> :
          <Component {...pageProps}/>
          }
          <Footer/>
        </AuthContext.Provider>
      </CartProvider>
    </ThemeProvider>
  
  )
}

export default MyApp
