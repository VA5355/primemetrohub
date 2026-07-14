import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Layout from './layout/Layout';
import Home from './pages/Home';
import CreatePurchaseOrder from './pages/purchaseorder/CreatePurchaseOrder';
import { amazonLightTheme, amazonDarkTheme } from './themes';
 
function AppContent() {
  const [themeMode, setThemeMode] = useState('dark');
  const { items } = useSelector(state => state.sidebardata);
 
  const theme = useMemo(() => {
    return createTheme(themeMode === 'light' ? amazonLightTheme : amazonDarkTheme);
  }, [themeMode]);
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<Layout sidebarList={items} themeMode={themeMode} setThemeMode={setThemeMode} />}
          >
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="create/po" element={<CreatePurchaseOrder />} />
            {/* Fallback route redirection */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
 
export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
