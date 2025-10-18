import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { GitaVerse } from '../types';
import { useRouter } from 'expo-router';
import { Theme } from '../../constants/Theme';

interface VerseCardProps {
  verse: GitaVerse;
  onPress?: () => void;
}

export const VerseCard: React.FC<VerseCardProps> = ({ verse, onPress }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/verse/${verse.chapter}/${verse.verse}`);
    }
  };

  const handleFavorite = (e: any) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <LinearGradient
        colors={Theme.gradients.cardSolid as [string, string, ...string[]]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.referenceContainer}>
            <Text style={styles.reference}>
              Bhagavad Gita {verse.chapter}.{verse.verse}
            </Text>
          </View>
          <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
            <FontAwesome 
              name={isFavorite ? 'star' : 'star-o'} 
              size={18} 
              color={Theme.colors.gold[400]} 
            />
          </TouchableOpacity>
        </View>
        {verse.sloka_sanskrit && (
          <Text style={styles.sanskrit} numberOfLines={2}>
            {verse.sloka_sanskrit}
          </Text>
        )}
        <Text style={styles.translation} numberOfLines={3}>
          {verse.translation_en}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.readMore}>Read full verse</Text>
          <FontAwesome name="arrow-right" size={12} color={Theme.colors.gold[400]} />
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
    padding: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  referenceContainer: {
    flex: 1,
  },
  reference: {
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.gold[400],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sanskrit: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.gold[200],
    marginBottom: Theme.spacing.sm,
    fontStyle: 'italic',
    lineHeight: Theme.typography.lineHeights.md,
  },
  translation: {
    fontSize: Theme.typography.sizes.base,
    color: Theme.colors.white,
    lineHeight: Theme.typography.lineHeights.base,
    marginBottom: Theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  readMore: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.gold[400],
    fontWeight: Theme.typography.weights.semibold,
    marginRight: Theme.spacing.xs / 2,
  },
});

