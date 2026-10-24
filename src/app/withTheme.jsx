import React, { useContext } from 'react';
import { ThemeContext } from './AppShell';

export function withTheme(Page) {
  return function ThemedPage() {
    const isDarkMode = useContext(ThemeContext);
    return <Page isDarkMode={isDarkMode} />;
  };
}
