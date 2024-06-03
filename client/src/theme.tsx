import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { ThemeProvider, createTheme } from '@mui/material';

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#2578F4',
    }
  }
});


const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export const ThemeLayer = ({ children }) => (
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </CacheProvider>
);