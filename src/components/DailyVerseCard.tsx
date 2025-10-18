import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Theme } from '../../constants/Theme';
import { GitaVerse } from '../types';

interface DailyVerseCardProps {
  verse: GitaVerse;
  onPress?: () => void;
}

export const DailyVerseCard: React.FC<DailyVerseCardProps> = ({ verse, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={['#3E2C6B', '#5F3DC4', '#6C5CE7'] as [string, string, ...string[]]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.badge}>
            <FontAwesome name="star" size={14} color={Theme.colors.gold[400]} />
            <Text style={styles.badgeText}>Verse of the Day</Text>
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <FontAwesome name="star-o" size={20} color={Theme.colors.gold[400]} />
          </TouchableOpacity>
        </View>

        <View style={styles.verseReference}>
          <Text style={styles.referenceText}>
            Bhagavad Gita {verse.chapter}.{verse.verse}
          </Text>
        </View>

        {verse.sloka_sanskrit && (
          <Text style={styles.sanskrit} numberOfLines={2}>
            {verse.sloka_sanskrit}
          </Text>
        )}

        <Text style={styles.translation} numberOfLines={4}>
          {verse.translation_en}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.readMore}>Read full context</Text>
          <FontAwesome name="arrow-right" size={14} color={Theme.colors.gold[400]} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    ...Theme.shadows.lg,
  },
  gradient: {
    padding: Theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 197, 23, 0.2)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs / 2,
    borderRadius: Theme.borderRadius.full,
  },
  badgeText: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.gold[400],
    fontWeight: Theme.typography.weights.semibold,
    marginLeft: Theme.spacing.xs / 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseReference: {
    marginBottom: Theme.spacing.md,
  },
  referenceText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.gold[300],
    fontWeight: Theme.typography.weights.semibold,
  },
  sanskrit: {
    fontSize: Theme.typography.sizes.lg,
    color: Theme.colors.gold[200],
    fontStyle: 'italic',
    lineHeight: Theme.typography.lineHeights.lg,
    marginBottom: Theme.spacing.md,
  },
  translation: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.white,
    lineHeight: Theme.typography.lineHeights.md,
    marginBottom: Theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  readMore: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.gold[400],
    fontWeight: Theme.typography.weights.semibold,
    marginRight: Theme.spacing.xs,
  },
});

