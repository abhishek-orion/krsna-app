import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GitaChapter } from '../types';
import { useRouter } from 'expo-router';

interface ChapterCardProps {
  chapter: GitaChapter;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/chapter/${chapter.number}`);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{chapter.number}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{chapter.title_en}</Text>
        {chapter.title_sanskrit && (
          <Text style={styles.sanskrit}>{chapter.title_sanskrit}</Text>
        )}
        {chapter.summary && (
          <Text style={styles.summary} numberOfLines={2}>
            {chapter.summary}
          </Text>
        )}
        <Text style={styles.verseCount}>{chapter.verse_count} verses</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  numberContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  number: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  sanskrit: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  summary: {
    fontSize: 13,
    color: '#777',
    lineHeight: 18,
    marginBottom: 6,
  },
  verseCount: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
});

