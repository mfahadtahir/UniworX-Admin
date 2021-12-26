import React, { useState } from 'react';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { MyLoader } from './components/MyLoader';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// ----------------------------------------------------------------------

export const LoaderContext = React.createContext();
export default function App() {
  const [loading, setLoading] = useState(false);
  return (
    <ThemeConfig>
      <LoaderContext.Provider value={{ setLoading }}>
        <ScrollToTop />
        <MyLoader load={loading} />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router setLoading={setLoading} />
      </LoaderContext.Provider>
    </ThemeConfig>
  );
}
