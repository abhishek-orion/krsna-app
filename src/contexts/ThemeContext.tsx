import React, { createContext, useContext, ReactNode } from 'react';
import { getTheme } from '../../constants/Theme';
import { useSettingsStore } from '../state/settingsStore';

type ThemeContextType = ReturnType<typeof getTheme>;

const ThemeContext = createContext<ThemeContextType>(getTheme('dark'));

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { settings } = useSettingsStore();
  const theme = getTheme(settings.theme);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

