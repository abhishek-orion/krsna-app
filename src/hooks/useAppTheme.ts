/**
 * Custom hook to use the app theme throughout components
 * This provides the current theme based on user settings (light/dark mode)
 */
import { useTheme } from '../contexts/ThemeContext';

export const useAppTheme = () => {
  return useTheme();
};

