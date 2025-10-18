import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../constants/Theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  colors?: string[];
  style?: ViewStyle;
}

export function GradientBackground({
  children,
  colors = Theme.gradients.primary,
  style,
}: GradientBackgroundProps) {
  // Ensure we have at least 2 colors for LinearGradient and cast to the correct type
  const gradientColors = (colors.length >= 2 ? colors : [...colors, ...colors]) as [string, string, ...string[]];
  
  return (
    <LinearGradient
      colors={gradientColors}
      style={[styles.container, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
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
