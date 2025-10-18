import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { GradientBackground } from '../../src/components/GradientBackground';
import { FeaturedCard } from '../../src/components/FeaturedCard';
import { PracticeCard } from '../../src/components/PracticeCard';
import { DailyVerseCard } from '../../src/components/DailyVerseCard';
import { Theme } from '../../constants/Theme';
import { getVersesByChapter } from '../../src/lib/gitaData';

export default function HomeScreen() {
  const router = useRouter();
  
  // Get a daily verse (for demo, using Chapter 2, Verse 47)
  const verses = getVersesByChapter(2);
  const dailyVerse = verses.find(v => v.verse === 47);

  const handleVersePress = () => {
    if (dailyVerse) {
      router.push(`/verse/${dailyVerse.chapter}/${dailyVerse.verse}`);
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste 🙏</Text>
            <Text style={styles.subtitle}>Your spiritual journey awaits</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <FontAwesome name="user-circle" size={32} color={Theme.colors.gold[400]} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Featured Practice */}
          <View style={styles.section}>
            <FeaturedCard
              title="Krishna Consciousness"
              subtitle="Today's Practice"
              description="Connect with Lord Krishna through guided meditation"
              icon="om"
              onPress={() => router.push('/(tabs)/chat')}
              gradient={['#6C5CE7', '#A990E4', '#B8A4E8'] as [string, string, ...string[]]}
            />
          </View>

          {/* Daily Verse */}
          {dailyVerse && (
            <View style={styles.section}>
              <DailyVerseCard verse={dailyVerse} onPress={handleVersePress} />
            </View>
          )}

          {/* Spiritual Practices */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <FontAwesome name="om" size={20} color={Theme.colors.gold[400]} />
              <Text style={styles.sectionTitle}>Spiritual Practices</Text>
            </View>
            
            <View style={styles.practicesGrid}>
              <PracticeCard
                title="Sacred Verses"
                description="Explore Krishna's wisdom"
                icon="book"
                onPress={() => router.push('/(tabs)/read')}
              />
              <PracticeCard
                title="Divine Guide"
                description="Seek Krishna's guidance"
                icon="comments"
                onPress={() => router.push('/(tabs)/chat')}
              />
              <PracticeCard
                title="Sacred Chants"
                description="Listen to divine mantras"
                icon="music"
                duration="10-30 min"
              />
              <PracticeCard
                title="Meditations"
                description="Connect with Krishna"
                icon="heart"
                duration="5-20 min"
              />
            </View>
          </View>

          {/* Your Journey */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <FontAwesome name="heart" size={20} color={Theme.colors.gold[400]} />
              <Text style={styles.sectionTitle}>Your Journey</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.journeyCard}
              onPress={() => router.push('/(tabs)/library')}
            >
              <View style={styles.journeyIcon}>
                <FontAwesome name="book" size={20} color={Theme.colors.gold[400]} />
              </View>
              <View style={styles.journeyInfo}>
                <Text style={styles.journeyTitle}>Continue Reading</Text>
                <Text style={styles.journeySubtitle}>Chapter 2, Verse 47</Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color={Theme.colors.purple[300]} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.journeyCard}
              onPress={() => router.push('/(tabs)/library')}
            >
              <View style={styles.journeyIcon}>
                <FontAwesome name="history" size={20} color={Theme.colors.gold[400]} />
              </View>
              <View style={styles.journeyInfo}>
                <Text style={styles.journeyTitle}>Reading History</Text>
                <Text style={styles.journeySubtitle}>15 verses explored</Text>
              </View>
              <FontAwesome name="chevron-right" size={16} color={Theme.colors.purple[300]} />
            </TouchableOpacity>
          </View>

          {/* Quick Access */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <FontAwesome name="bolt" size={20} color={Theme.colors.gold[400]} />
              <Text style={styles.sectionTitle}>Quick Access</Text>
            </View>
            
            <View style={styles.quickAccessGrid}>
              <TouchableOpacity 
                style={styles.quickAccessItem}
                onPress={() => router.push('/(tabs)/read')}
              >
                <FontAwesome name="list" size={24} color={Theme.colors.gold[400]} />
                <Text style={styles.quickAccessText}>All Chapters</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickAccessItem}
                onPress={() => router.push('/(tabs)/library')}
              >
                <FontAwesome name="bookmark" size={24} color={Theme.colors.gold[400]} />
                <Text style={styles.quickAccessText}>Bookmarks</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickAccessItem}
                onPress={() => router.push('/(tabs)/settings')}
              >
                <FontAwesome name="cog" size={24} color={Theme.colors.gold[400]} />
                <Text style={styles.quickAccessText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  greeting: {
    fontSize: Theme.typography.sizes.xxxl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
  },
  subtitle: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.purple[200],
    marginTop: Theme.spacing.xs / 2,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.xxl,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.white,
    marginLeft: Theme.spacing.sm,
  },
  practicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  journeyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.purple[800],
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.purple[700],
    ...Theme.shadows.sm,
  },
  journeyIcon: {
    width: 44,
    height: 44,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: 'rgba(255, 197, 23, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  journeyInfo: {
    flex: 1,
  },
  journeyTitle: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs / 2,
  },
  journeySubtitle: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.purple[200],
  },
  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAccessItem: {
    flex: 1,
    backgroundColor: Theme.colors.purple[800],
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginHorizontal: Theme.spacing.xs / 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.purple[700],
    ...Theme.shadows.sm,
  },
  quickAccessText: {
    fontSize: Theme.typography.sizes.xs,
    color: Theme.colors.white,
    marginTop: Theme.spacing.xs,
    textAlign: 'center',
    fontWeight: Theme.typography.weights.medium,
  },
});

