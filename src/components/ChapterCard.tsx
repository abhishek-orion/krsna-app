import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { GitaChapter } from '../types';
import { useRouter } from 'expo-router';
import { Theme } from '../../constants/Theme';

interface ChapterCardProps {
  chapter: GitaChapter;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/chapter/${chapter.chapter}`);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <LinearGradient
        colors={Theme.gradients.cardSolid as [string, string, ...string[]]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{chapter.chapter}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{chapter.name_en}</Text>
          {chapter.name_sanskrit && (
            <Text style={styles.sanskrit}>{chapter.name_sanskrit}</Text>
          )}
          {chapter.summary && (
            <Text style={styles.summary} numberOfLines={2}>
              {chapter.summary}
            </Text>
          )}
          <View style={styles.footer}>
            <Text style={styles.verseCount}>{chapter.verses_count} verses</Text>
            <FontAwesome name="chevron-right" size={16} color={Theme.colors.gold[400]} />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Theme.spacing.md,
    marginVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    ...Theme.shadows.md,
  },
  gradient: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
  },
  numberContainer: {
    width: 64,
    height: 64,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: Theme.colors.gold[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  number: {
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs / 2,
  },
  sanskrit: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.gold[300],
    fontStyle: 'italic',
    marginBottom: Theme.spacing.xs,
  },
  summary: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.purple[200],
    lineHeight: Theme.typography.lineHeights.sm,
    marginBottom: Theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verseCount: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.gold[400],
    fontWeight: Theme.typography.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

