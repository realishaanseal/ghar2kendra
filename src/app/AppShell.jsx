import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import SectionNav from './components/SectionNav';
import 'leaflet/dist/leaflet.css';

export const ThemeContext = React.createContext(true);

export default function AppShell({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('civic_theme_mode') || 'dark';
  });

  const isDarkMode = themeMode === 'dark';

  useEffect(() => {
    localStorage.setItem('civic_theme_mode', themeMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.body.classList.toggle('dark', isDarkMode);
  }, [themeMode, isDarkMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AuthProvider>
      <ThemeContext.Provider value={isDarkMode}>
        <div className="min-h-screen font-sans flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
          <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
          <SectionNav isDarkMode={isDarkMode} />
          <main className="flex-1">{children}</main>
        </div>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}
