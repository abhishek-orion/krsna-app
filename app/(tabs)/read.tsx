import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { GradientBackground } from '../../src/components/GradientBackground';
import { Theme } from '../../constants/Theme';
import { getChapters, searchVerses } from '../../src/lib/gitaData';
import { GitaChapter, GitaVerse } from '../../src/types';

interface ChapterCardProps {
  chapter: GitaChapter;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter }) => (
  <Link href={`/chapter/${chapter.chapter}`} asChild>
    <TouchableOpacity style={styles.chapterCard}>
      <View style={styles.chapterNumberContainer}>
        <Text style={styles.chapterNumber}>{chapter.chapter}</Text>
      </View>
      <View style={styles.chapterInfo}>
        <Text style={styles.chapterTitle}>{chapter.name_en}</Text>
        {chapter.name_sanskrit && (
          <Text style={styles.chapterSanskrit}>{chapter.name_sanskrit}</Text>
        )}
        <Text style={styles.chapterVerseCount}>{chapter.verses_count} Verses</Text>
      </View>
      <FontAwesome name="chevron-right" size={16} color={Theme.colors.saffron[400]} />
    </TouchableOpacity>
  </Link>
);

interface VerseSearchResultProps {
  verse: GitaVerse;
}

const VerseSearchResult: React.FC<VerseSearchResultProps> = ({ verse }) => (
  <Link href={`/verse/${verse.chapter}/${verse.verse}`} asChild>
    <TouchableOpacity style={styles.verseCard}>
      <Text style={styles.verseReference}>
        {verse.chapter}:{verse.verse}
      </Text>
      <Text style={styles.verseText} numberOfLines={3}>
        {verse.translation_en}
      </Text>
    </TouchableOpacity>
  </Link>
);

export default function ReadScreen() {
  const chapters = getChapters();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GitaVerse[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 2) {
      const results = searchVerses(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Bhagavad Gita</Text>
          <Text style={styles.subtitle}>The Song Celestial</Text>
        </View>

        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={18} color={Theme.colors.purple[300]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search verses..."
            placeholderTextColor={Theme.colors.purple[300]}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <FontAwesome name="times-circle" size={18} color={Theme.colors.purple[300]} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {searchResults.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>
                Search Results ({searchResults.length})
              </Text>
              {searchResults.map((verse) => (
                <VerseSearchResult key={`${verse.chapter}:${verse.verse}`} verse={verse} />
              ))}
            </>
          ) : searchQuery.length > 2 ? (
            <View style={styles.emptyState}>
              <FontAwesome name="search" size={48} color={Theme.colors.purple[400]} />
              <Text style={styles.emptyStateText}>No verses found</Text>
            </View>
          ) : (
            <>
              <Text style={styles.sectionTitle}>18 Chapters</Text>
              {chapters.map((chapter) => (
                <ChapterCard key={chapter.chapter} chapter={chapter} />
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: Theme.typography.sizes.xxxl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.gold[400],
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.purple[200],
    fontStyle: 'italic',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Theme.borderRadius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  searchIcon: {
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: Theme.colors.white,
    fontSize: Theme.typography.sizes.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.xxl,
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.saffron[400],
    marginBottom: Theme.spacing.md,
  },
  chapterCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.purple[800],
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    alignItems: 'center',
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: Theme.colors.purple[700],
  },
  chapterNumberContainer: {
    width: 50,
    height: 50,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.saffron[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  chapterNumber: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
  },
  chapterSanskrit: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.gold[300],
    fontStyle: 'italic',
    marginTop: Theme.spacing.xs,
  },
  chapterVerseCount: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.purple[200],
    marginTop: Theme.spacing.xs,
  },
  verseCard: {
    backgroundColor: Theme.colors.purple[800],
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.saffron[500],
  },
  verseReference: {
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.gold[400],
    marginBottom: Theme.spacing.xs,
  },
  verseText: {
    fontSize: Theme.typography.sizes.base,
    color: Theme.colors.white,
    lineHeight: Theme.typography.lineHeights.base,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.xxl,
  },
  emptyStateText: {
    fontSize: Theme.typography.sizes.lg,
    color: Theme.colors.purple[300],
    marginTop: Theme.spacing.md,
  },
});
