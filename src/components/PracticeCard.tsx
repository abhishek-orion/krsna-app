import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';

interface PracticeCardProps {
  title: string;
  description: string;
  icon: string;
  iconColor?: string;
  onPress?: () => void;
  duration?: string;
}

export const PracticeCard: React.FC<PracticeCardProps> = ({
  title,
  description,
  icon,
  iconColor = Theme.colors.gold[400],
  onPress,
  duration,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={Theme.gradients.cardSolid as [string, string, ...string[]]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconContainer}>
          <FontAwesome name={icon as any} size={28} color={iconColor} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        {duration && (
          <View style={styles.durationContainer}>
            <FontAwesome name="clock-o" size={12} color={Theme.colors.purple[300]} />
            <Text style={styles.duration}>{duration}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  gradient: {
    padding: Theme.spacing.md,
    minHeight: 160,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs,
  },
  description: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.purple[200],
    lineHeight: Theme.typography.lineHeights.sm,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  duration: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.purple[300],
    marginLeft: Theme.spacing.xs / 2,
  },
});

