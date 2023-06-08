// import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// import axios from 'axios';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components

import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post('http://141.144.237.21:3000/login', {
  //         username: 'vasAdmin',
  //         password: 'password123',
  //       });

  //       const data = response;
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
