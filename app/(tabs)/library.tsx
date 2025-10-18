import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { GradientBackground } from '../../src/components/GradientBackground';
import { Theme } from '../../constants/Theme';
import { useAuthStore } from '../../src/state/authStore';

type LibraryTab = 'bookmarks' | 'history' | 'notes';

export default function LibraryScreen() {
  const { isAuthenticated, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<LibraryTab>('bookmarks');

  // Placeholder data - will be replaced with real data from Supabase
  const bookmarks = [
    { id: '1', chapter: 2, verse: 47, timestamp: Date.now() },
    { id: '2', chapter: 4, verse: 7, timestamp: Date.now() - 86400000 },
  ];

  const renderAuthPrompt = () => (
    <View style={styles.authPrompt}>
      <FontAwesome name="lock" size={48} color={Theme.colors.saffron[400]} />
      <Text style={styles.authPromptTitle}>Sign in to sync your library</Text>
      <Text style={styles.authPromptText}>
        Create an account to save bookmarks, notes, and access your reading history across devices.
      </Text>
      <TouchableOpacity style={styles.authButton}>
        <Text style={styles.authButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = (icon: string, message: string) => (
    <View style={styles.emptyState}>
      <FontAwesome name={icon as any} size={48} color={Theme.colors.purple[400]} />
      <Text style={styles.emptyStateText}>{message}</Text>
    </View>
  );

  const renderBookmarks = () => {
    if (bookmarks.length === 0) {
      return renderEmptyState('bookmark-o', 'No bookmarks yet. Start saving your favorite verses!');
    }

    return (
      <View style={styles.content}>
        {bookmarks.map((bookmark) => (
          <Link 
            key={bookmark.id}
            href={`/verse/${bookmark.chapter}/${bookmark.verse}`}
            asChild
          >
            <TouchableOpacity style={styles.itemCard}>
              <View style={styles.itemIcon}>
                <FontAwesome name="bookmark" size={20} color={Theme.colors.saffron[500]} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>
                  Chapter {bookmark.chapter}, Verse {bookmark.verse}
                </Text>
                <Text style={styles.itemSubtitle}>
                  Saved {new Date(bookmark.timestamp).toLocaleDateString()}
                </Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color={Theme.colors.purple[300]} />
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    );
  };

  const renderHistory = () => {
    return renderEmptyState('history', 'Your reading history will appear here');
  };

  const renderNotes = () => {
    return renderEmptyState('sticky-note-o', 'No notes yet. Add notes to verses as you read!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'bookmarks':
        return renderBookmarks();
      case 'history':
        return renderHistory();
      case 'notes':
        return renderNotes();
      default:
        return null;
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Library</Text>
          {!isAuthenticated && (
            <TouchableOpacity style={styles.headerButton}>
              <FontAwesome name="sign-in" size={20} color={Theme.colors.saffron[400]} />
            </TouchableOpacity>
          )}
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'bookmarks' && styles.activeTab]}
            onPress={() => setActiveTab('bookmarks')}
          >
            <FontAwesome 
              name="bookmark" 
              size={18} 
              color={activeTab === 'bookmarks' ? Theme.colors.saffron[500] : Theme.colors.purple[300]} 
            />
            <Text style={[styles.tabText, activeTab === 'bookmarks' && styles.activeTabText]}>
              Bookmarks
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <FontAwesome 
              name="history" 
              size={18} 
              color={activeTab === 'history' ? Theme.colors.saffron[500] : Theme.colors.purple[300]} 
            />
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
              History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'notes' && styles.activeTab]}
            onPress={() => setActiveTab('notes')}
          >
            <FontAwesome 
              name="sticky-note-o" 
              size={18} 
              color={activeTab === 'notes' ? Theme.colors.saffron[500] : Theme.colors.purple[300]} 
            />
            <Text style={[styles.tabText, activeTab === 'notes' && styles.activeTabText]}>
              Notes
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {!isAuthenticated ? renderAuthPrompt() : renderContent()}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
  },
  screenTitle: {
    fontSize: Theme.typography.sizes.xxxl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
  },
  headerButton: {
    padding: Theme.spacing.sm,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: Theme.spacing.xs / 2,
    borderRadius: Theme.borderRadius.lg,
  },
  activeTab: {
    backgroundColor: Theme.colors.purple[800],
    borderWidth: 1,
    borderColor: Theme.colors.gold[500],
    ...Theme.shadows.sm,
  },
  tabText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.purple[300],
    marginLeft: Theme.spacing.xs,
    fontWeight: Theme.typography.weights.medium,
  },
  activeTabText: {
    color: Theme.colors.saffron[400],
    fontWeight: Theme.typography.weights.bold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: 85, // Extra padding for sticky tab bar
  },
  content: {
    flex: 1,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.purple[800],
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.purple[700],
    ...Theme.shadows.md,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs / 2,
  },
  itemSubtitle: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.purple[200],
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
  authPrompt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.xxl,
    paddingHorizontal: Theme.spacing.lg,
  },
  authPromptTitle: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  authPromptText: {
    fontSize: Theme.typography.sizes.base,
    color: Theme.colors.purple[200],
    textAlign: 'center',
    lineHeight: Theme.typography.lineHeights.base,
    marginBottom: Theme.spacing.lg,
  },
  authButton: {
    backgroundColor: Theme.colors.gold[500],
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.xl,
    ...Theme.shadows.md,
  },
  authButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.bold,
  },
});
