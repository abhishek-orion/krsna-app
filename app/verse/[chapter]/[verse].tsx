import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { GradientBackground } from '../../../src/components/GradientBackground';
import { Theme } from '../../../constants/Theme';
import { getVerse } from '../../../src/lib/gitaData';
import { ttsService } from '../../../src/lib/tts';
import { useSettingsStore } from '../../../src/state/settingsStore';

export default function VerseDetailScreen() {
  const { chapter, verse } = useLocalSearchParams();
  const chapterNum = parseInt(chapter as string, 10);
  const verseNum = parseInt(verse as string, 10);
  
  const verseData = getVerse(chapterNum, verseNum);
  const { settings, updateTTSSettings } = useSettingsStore();
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTTSControls, setShowTTSControls] = useState(false);

  useEffect(() => {
    return () => {
      ttsService.stop();
    };
  }, []);

  if (!verseData) {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Text style={styles.errorText}>Verse not found</Text>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  const handleSpeak = async () => {
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = verseData.translation_en;
    
    setIsSpeaking(true);
    
    await ttsService.speak(textToSpeak, settings.tts, {
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleRateChange = (rate: number) => {
    updateTTSSettings({ rate });
  };

  const handlePitchChange = (pitch: number) => {
    updateTTSSettings({ pitch });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `Verse ${chapterNum}:${verseNum}`,
          headerShown: true,
          headerBackTitle: 'Back',
        }}
      />
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.reference}>
                Bhagavad Gita {chapterNum}.{verseNum}
              </Text>
            </View>

            {/* Sanskrit Shloka */}
            {verseData.sloka_sanskrit && (
              <View style={styles.card}>
                <Text style={styles.sectionLabel}>संस्कृत श्लोक</Text>
                <Text style={styles.sanskrit}>{verseData.sloka_sanskrit}</Text>
              </View>
            )}

            {/* Transliteration */}
            {verseData.transliteration && (
              <View style={styles.card}>
                <Text style={styles.sectionLabel}>Transliteration</Text>
                <Text style={styles.transliteration}>{verseData.transliteration}</Text>
              </View>
            )}

            {/* Translation */}
            <View style={[styles.card, styles.translationCard]}>
              <Text style={styles.sectionLabel}>Translation</Text>
              <Text style={styles.translation}>{verseData.translation_en}</Text>
            </View>

            {/* Commentary - New Section */}
            {verseData.commentary_en && (
              <View style={[styles.card, styles.commentaryCard]}>
                <View style={styles.commentaryHeader}>
                  <FontAwesome name="book" size={18} color={Theme.colors.gold[400]} />
                  <Text style={styles.sectionLabel}>  Commentary & Meaning</Text>
                </View>
                <Text style={styles.commentary}>{verseData.commentary_en}</Text>
              </View>
            )}

            {/* TTS Player */}
            <View style={styles.playerCard}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={handleSpeak}
                activeOpacity={0.8}
              >
                <View style={styles.playIconContainer}>
                  <FontAwesome
                    name={isSpeaking ? 'stop-circle' : 'play-circle'}
                    size={56}
                    color={Theme.colors.saffron[500]}
                  />
                </View>
                <Text style={styles.playButtonText}>
                  {isSpeaking ? 'Stop Narration' : 'Listen to Verse'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlsToggle}
                onPress={() => setShowTTSControls(!showTTSControls)}
                activeOpacity={0.7}
              >
                <FontAwesome 
                  name="sliders" 
                  size={18} 
                  color={Theme.colors.purple[300]} 
                />
                <Text style={styles.controlsToggleText}>Voice Settings</Text>
              </TouchableOpacity>

              {showTTSControls && (
                <View style={styles.ttsControls}>
                  <View style={styles.controlRow}>
                    <Text style={styles.controlLabel}>
                      Speed {settings.tts.rate.toFixed(1)}x
                    </Text>
                    <Slider
                      style={styles.slider}
                      minimumValue={0.5}
                      maximumValue={2.0}
                      value={settings.tts.rate}
                      onValueChange={handleRateChange}
                      minimumTrackTintColor={Theme.colors.saffron[500]}
                      maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
                      thumbTintColor={Theme.colors.gold[400]}
                    />
                  </View>

                  <View style={styles.controlRow}>
                    <Text style={styles.controlLabel}>
                      Pitch {settings.tts.pitch.toFixed(1)}x
                    </Text>
                    <Slider
                      style={styles.slider}
                      minimumValue={0.5}
                      maximumValue={2.0}
                      value={settings.tts.pitch}
                      onValueChange={handlePitchChange}
                      minimumTrackTintColor={Theme.colors.saffron[500]}
                      maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
                      thumbTintColor={Theme.colors.gold[400]}
                    />
                  </View>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <View style={styles.actionIconContainer}>
                  <FontAwesome name="bookmark-o" size={22} color={Theme.colors.gold[400]} />
                </View>
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <View style={styles.actionIconContainer}>
                  <FontAwesome name="share-alt" size={22} color={Theme.colors.gold[400]} />
                </View>
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <View style={styles.actionIconContainer}>
                  <FontAwesome name="sticky-note-o" size={22} color={Theme.colors.gold[400]} />
                </View>
                <Text style={styles.actionText}>Note</Text>
              </TouchableOpacity>
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
    paddingVertical: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.md,
  },
  errorText: {
    color: Theme.colors.white,
    textAlign: 'center',
    marginTop: Theme.spacing.xl,
    fontSize: Theme.typography.sizes.lg,
  },
  header: {
    marginBottom: Theme.spacing.lg,
    alignItems: 'center',
  },
  reference: {
    fontSize: Theme.typography.sizes.md,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.saffron[400],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.md,
  },
  translationCard: {
    backgroundColor: 'rgba(126, 87, 255, 0.15)',
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.purple[400],
  },
  commentaryCard: {
    backgroundColor: 'rgba(126, 87, 255, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.accent,
  },
  commentaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  commentary: {
    fontSize: Theme.typography.sizes.md,
    lineHeight: 24,
    color: Theme.colors.white,
    fontFamily: 'System',
  },
  sectionLabel: {
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.gold[300],
    marginBottom: Theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sanskrit: {
    fontSize: Theme.typography.sizes.xl,
    lineHeight: Theme.typography.lineHeights.xl,
    fontFamily: 'serif',
    color: Theme.colors.white,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  transliteration: {
    fontSize: Theme.typography.sizes.md,
    lineHeight: Theme.typography.lineHeights.md,
    fontStyle: 'italic',
    color: Theme.colors.purple[200],
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  translation: {
    fontSize: Theme.typography.sizes.lg,
    lineHeight: Theme.typography.lineHeights.lg,
    color: Theme.colors.white,
    textAlign: 'center',
  },
  playerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    alignItems: 'center',
    ...Theme.shadows.md,
    elevation: 5,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.saffron[600],
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.xl,
    marginBottom: Theme.spacing.md,
    width: '80%',
  },
  playIconContainer: {
    marginRight: Theme.spacing.sm,
  },
  playButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.bold,
  },
  controlsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  controlsToggleText: {
    color: Theme.colors.purple[300],
    marginLeft: Theme.spacing.xs,
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.medium,
  },
  ttsControls: {
    width: '100%',
    marginTop: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: Theme.borderRadius.md,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
  },
  controlLabel: {
    color: Theme.colors.white,
    fontSize: Theme.typography.sizes.sm,
    fontWeight: Theme.typography.weights.medium,
  },
  slider: {
    flex: 1,
    height: 30,
    marginLeft: Theme.spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: Theme.spacing.lg,
  },
  actionButton: {
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
  },
  actionIconContainer: {
    marginBottom: Theme.spacing.xs,
  },
  actionText: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.gold[400],
    fontWeight: Theme.typography.weights.medium,
  },
});
