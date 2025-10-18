import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../constants/Theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  colors?: string[];
  style?: ViewStyle;
  variant?: 'primary' | 'spiritual' | 'night' | 'peaceful';
}

export function GradientBackground({
  children,
  colors,
  style,
  variant = 'primary',
}: GradientBackgroundProps) {
  // Get gradient colors based on variant if colors not explicitly provided
  const getGradientColors = () => {
    if (colors) return colors;
    
    switch (variant) {
      case 'spiritual':
        return Theme.gradients.spiritual;
      case 'night':
        return Theme.gradients.night;
      case 'peaceful':
        return [Theme.colors.purple[900], Theme.colors.indigo[800], Theme.colors.purple[700]];
      default:
        return Theme.gradients.primary;
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
