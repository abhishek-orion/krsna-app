import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';

interface FeaturedCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  onPress?: () => void;
  gradient?: string[];
  imageUri?: string;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  onPress,
  gradient = Theme.gradients.featured as [string, string, ...string[]],
  imageUri,
}) => {
  const content = (
    <View style={styles.container}>
      <LinearGradient
        colors={gradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            {icon && (
              <View style={styles.iconContainer}>
                <FontAwesome name={icon as any} size={24} color={Theme.colors.gold[400]} />
              </View>
            )}
            <View style={styles.textContainer}>
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              <Text style={styles.title}>{title}</Text>
              {description && (
                <Text style={styles.description} numberOfLines={2}>
                  {description}
                </Text>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.touchable}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  touchable: {
    marginBottom: Theme.spacing.md,
  },
  container: {
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  gradient: {
    padding: Theme.spacing.lg,
    minHeight: 140,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.gold[300],
    fontWeight: Theme.typography.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Theme.spacing.xs / 2,
  },
  title: {
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs,
  },
  description: {
    fontSize: Theme.typography.sizes.base,
    color: Theme.colors.white,
    opacity: 0.9,
    lineHeight: Theme.typography.lineHeights.base,
  },
});

