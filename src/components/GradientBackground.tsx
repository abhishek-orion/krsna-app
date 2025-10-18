import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';

interface GradientBackgroundProps {
  children: React.ReactNode;
  colors?: string[];
  style?: ViewStyle;
  variant?: 'primary' | 'spiritual' | 'night' | 'peaceful' | 'peacock';
}

export function GradientBackground({
  children,
  colors,
  style,
  variant = 'primary',
}: GradientBackgroundProps) {
  const theme = useTheme();
  
  // Get gradient colors based on variant if colors not explicitly provided
  const getGradientColors = () => {
    if (colors) return colors;
    
    const gradients = theme.gradients as any;
    
    switch (variant) {
      case 'spiritual':
        return gradients.spiritual || theme.gradients.primary;
      case 'night':
        return gradients.night || theme.gradients.primary;
      case 'peaceful':
        return [theme.colors.primary, theme.colors.secondary, theme.colors.card];
      case 'peacock':
        return gradients.peacock || theme.gradients.primary;
      default:
        return theme.gradients.primary;
    }
  };
  
  // Ensure we have at least 2 colors for LinearGradient and cast to the correct type
  const selectedColors = getGradientColors();
  const gradientColors = (selectedColors.length >= 2 ? selectedColors : [...selectedColors, ...selectedColors]) as [string, string, ...string[]];
  
  return (
    <LinearGradient
      colors={gradientColors}
      style={[styles.container, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
