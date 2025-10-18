import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text, View } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { GradientBackground } from '../../src/components/GradientBackground';
import { Theme } from '../../constants/Theme';
import { getChapter, getVersesByChapter } from '../../src/lib/gitaData';
import { GitaVerse } from '../../src/types';

interface VerseItemProps {
  verse: GitaVerse;
}

const VerseItem: React.FC<VerseItemProps> = ({ verse }) => (
  <Link href={`/verse/${verse.chapter}/${verse.verse}`} asChild>
    <TouchableOpacity style={styles.verseItem}>
      <View style={styles.verseNumberContainer}>
        <Text style={styles.verseNumber}>{verse.verse}</Text>
      </View>
      <View style={styles.verseContent}>
        {verse.sloka_sanskrit && (
          <Text style={styles.verseSanskrit} numberOfLines={2}>
            {verse.sloka_sanskrit}
          </Text>
        )}
        <Text style={styles.verseTranslation} numberOfLines={3}>
          {verse.translation_en}
        </Text>
      </View>
      <FontAwesome name="chevron-right" size={14} color={Theme.colors.saffron[400]} />
    </TouchableOpacity>
  </Link>
);

export default function ChapterDetailScreen() {
  const { id } = useLocalSearchParams();
  const chapterNumber = parseInt(id as string, 10);
  
  const chapter = getChapter(chapterNumber);
  const verses = getVersesByChapter(chapterNumber);

  if (!chapter) {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Text style={styles.errorText}>Chapter not found</Text>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `Chapter ${chapterNumber}`,
          headerBackTitle: 'Chapters',
          headerStyle: {
            backgroundColor: Theme.colors.purple[800],
          },
          headerTintColor: Theme.colors.white,
          headerTitleStyle: {
            fontWeight: Theme.typography.weights.bold,
          },
        }}
      />
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Chapter Header */}
            <View style={styles.chapterHeader}>
              <View style={styles.chapterNumberBadge}>
                <Text style={styles.chapterNumberBadgeText}>Chapter {chapterNumber}</Text>
              </View>
              <Text style={styles.chapterTitle}>{chapter.name_en}</Text>
              {chapter.name_sanskrit && (
                <Text style={styles.chapterSanskrit}>{chapter.name_sanskrit}</Text>
              )}
              {chapter.name_transliteration && (
                <Text style={styles.chapterTransliteration}>
                  ({chapter.name_transliteration})
                </Text>
              )}
              {chapter.summary && (
                <View style={styles.summaryContainer}>
                  <Text style={styles.summaryText}>{chapter.summary}</Text>
                </View>
              )}
              <Text style={styles.verseCount}>
                {verses.length} Verses
              </Text>
            </View>

            {/* Verses List */}
            <View style={styles.versesSection}>
              {verses.length > 0 ? (
                verses.map((verse) => (
                  <VerseItem key={`${verse.chapter}:${verse.verse}`} verse={verse} />
                ))
              ) : (
                <View style={styles.emptyState}>
                  <FontAwesome name="book" size={48} color={Theme.colors.purple[400]} />
                  <Text style={styles.emptyStateText}>
                    Verses for this chapter are being loaded...
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
  },
  errorText: {
    color: Theme.colors.white,
    textAlign: 'center',
    marginTop: Theme.spacing.xl,
    fontSize: Theme.typography.sizes.lg,
  },
  chapterHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  chapterNumberBadge: {
    backgroundColor: Theme.colors.saffron[500],
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    marginBottom: Theme.spacing.md,
  },
  chapterNumberBadgeText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chapterTitle: {
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
  },
  chapterSanskrit: {
    fontSize: Theme.typography.sizes.lg,
    color: Theme.colors.gold[300],
    textAlign: 'center',
    marginBottom: Theme.spacing.xs,
  },
  chapterTransliteration: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.purple[200],
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  summaryContainer: {
    backgroundColor: 'rgba(126, 87, 255, 0.2)',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  summaryText: {
    fontSize: Theme.typography.sizes.base,
    lineHeight: Theme.typography.lineHeights.base,
    color: Theme.colors.white,
    textAlign: 'center',
  },
  verseCount: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.saffron[400],
    fontWeight: Theme.typography.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  versesSection: {
    marginTop: Theme.spacing.sm,
  },
  verseItem: {
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
  verseNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.saffron[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  verseNumber: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
  },
  verseContent: {
    flex: 1,
  },
  verseSanskrit: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.gold[300],
    marginBottom: Theme.spacing.xs,
    lineHeight: Theme.typography.lineHeights.sm,
  },
  verseTranslation: {
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
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.purple[300],
    marginTop: Theme.spacing.md,
    textAlign: 'center',
  },
});
