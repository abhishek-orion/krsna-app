import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { GradientBackground } from '../../src/components/GradientBackground';
import { Theme } from '../../constants/Theme';
import { useSettingsStore } from '../../src/state/settingsStore';
import { useAuthStore } from '../../src/state/authStore';
import { getMetadata } from '../../src/lib/gitaData';

export default function SettingsScreen() {
  const { settings, updateTTSSettings, updateAppSettings, resetSettings } = useSettingsStore();
  const { isAuthenticated, user, signOut } = useAuthStore();
  const metadata = getMetadata();

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Settings</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            {isAuthenticated ? (
              <>
                <View style={styles.card}>
                  <View style={styles.accountInfo}>
                    <FontAwesome name="user-circle" size={48} color={Theme.colors.saffron[500]} />
                    <View style={styles.accountDetails}>
                      <Text style={styles.accountName}>
                        {user?.email || 'Anonymous User'}
                      </Text>
                      <Text style={styles.accountStatus}>Signed In</Text>
                    </View>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.settingItem}
                  onPress={() => signOut()}
                >
                  <FontAwesome name="sign-out" size={20} color={Theme.colors.saffron[400]} />
                  <Text style={styles.settingText}>Sign Out</Text>
                  <FontAwesome name="chevron-right" size={16} color={Theme.colors.purple[300]} />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.settingItem}>
                <FontAwesome name="sign-in" size={20} color={Theme.colors.saffron[400]} />
                <Text style={styles.settingText}>Sign In</Text>
                <FontAwesome name="chevron-right" size={16} color={Theme.colors.purple[300]} />
              </TouchableOpacity>
            )}
          </View>

          {/* TTS Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voice Settings</Text>
            
            <View style={styles.card}>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderHeader}>
                  <Text style={styles.sliderLabel}>Speed</Text>
                  <Text style={styles.sliderValue}>{settings.tts.rate.toFixed(1)}x</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={0.5}
                  maximumValue={2.0}
                  value={settings.tts.rate}
                  onValueChange={(value) => updateTTSSettings({ rate: value })}
                  minimumTrackTintColor={Theme.colors.saffron[500]}
                  maximumTrackTintColor={Theme.colors.purple[700]}
                  thumbTintColor={Theme.colors.gold[400]}
                />
              </View>

              <View style={styles.sliderContainer}>
                <View style={styles.sliderHeader}>
                  <Text style={styles.sliderLabel}>Pitch</Text>
                  <Text style={styles.sliderValue}>{settings.tts.pitch.toFixed(1)}x</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={0.5}
                  maximumValue={2.0}
                  value={settings.tts.pitch}
                  onValueChange={(value) => updateTTSSettings({ pitch: value })}
                  minimumTrackTintColor={Theme.colors.saffron[500]}
                  maximumTrackTintColor={Theme.colors.purple[700]}
                  thumbTintColor={Theme.colors.gold[400]}
                />
              </View>
            </View>
          </View>

          {/* App Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            
            <View style={styles.settingItem}>
              <FontAwesome name="bell" size={20} color={Theme.colors.saffron[400]} />
              <Text style={styles.settingText}>Notifications</Text>
              <Switch
                value={settings.notifications}
                onValueChange={(value) => updateAppSettings({ notifications: value })}
                trackColor={{ 
                  false: Theme.colors.purple[700], 
                  true: Theme.colors.saffron[500] 
                }}
                thumbColor={settings.notifications ? Theme.colors.gold[400] : Theme.colors.gray[400]}
              />
            </View>

            <TouchableOpacity style={styles.settingItem}>
              <FontAwesome name="moon-o" size={20} color={Theme.colors.saffron[400]} />
              <Text style={styles.settingText}>Theme</Text>
              <Text style={styles.settingValue}>{settings.theme === 'dark' ? 'Dark' : 'Light'}</Text>
              <FontAwesome name="chevron-right" size={16} color={Theme.colors.purple[300]} />
            </TouchableOpacity>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            
            <View style={styles.card}>
              <View style={styles.aboutItem}>
                <Text style={styles.aboutLabel}>Version</Text>
                <Text style={styles.aboutValue}>1.0.0</Text>
              </View>
              
              <View style={styles.aboutItem}>
                <Text style={styles.aboutLabel}>Translation</Text>
                <Text style={styles.aboutValue}>{metadata.translator}</Text>
              </View>
              
              <View style={styles.aboutItem}>
                <Text style={styles.aboutLabel}>Source</Text>
                <Text style={styles.aboutValue}>{metadata.translation}</Text>
              </View>
              
              <View style={styles.aboutItem}>
                <Text style={styles.aboutLabel}>License</Text>
                <Text style={styles.aboutValue}>{metadata.license}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.settingItem}>
              <FontAwesome name="book" size={20} color={Theme.colors.saffron[400]} />
              <Text style={styles.settingText}>Content Attribution</Text>
              <FontAwesome name="chevron-right" size={16} color={Theme.colors.purple[300]} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <FontAwesome name="shield" size={20} color={Theme.colors.saffron[400]} />
              <Text style={styles.settingText}>Privacy Policy</Text>
              <FontAwesome name="chevron-right" size={16} color={Theme.colors.purple[300]} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <FontAwesome name="file-text-o" size={20} color={Theme.colors.saffron[400]} />
              <Text style={styles.settingText}>Terms of Service</Text>
              <FontAwesome name="chevron-right" size={16} color={Theme.colors.purple[300]} />
            </TouchableOpacity>
          </View>

          {/* Reset Section */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={resetSettings}
            >
              <FontAwesome name="refresh" size={20} color={Theme.colors.white} />
              <Text style={styles.resetButtonText}>Reset All Settings</Text>
            </TouchableOpacity>
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
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
  },
  screenTitle: {
    fontSize: Theme.typography.sizes.xxxl,
    fontWeight: Theme.typography.weights.bold,
    color: Theme.colors.gold[400],
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
  sectionTitle: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.saffron[400],
    marginBottom: Theme.spacing.md,
  },
  card: {
    backgroundColor: Theme.colors.purple[800],
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.purple[700],
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountDetails: {
    marginLeft: Theme.spacing.md,
    flex: 1,
  },
  accountName: {
    fontSize: Theme.typography.sizes.lg,
    fontWeight: Theme.typography.weights.semibold,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs / 2,
  },
  accountStatus: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.purple[200],
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.purple[800],
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.purple[700],
  },
  settingText: {
    flex: 1,
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.white,
    marginLeft: Theme.spacing.md,
  },
  settingValue: {
    fontSize: Theme.typography.sizes.sm,
    color: Theme.colors.purple[200],
    marginRight: Theme.spacing.sm,
  },
  sliderContainer: {
    marginBottom: Theme.spacing.md,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  sliderLabel: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.white,
    fontWeight: Theme.typography.weights.medium,
  },
  sliderValue: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.saffron[400],
    fontWeight: Theme.typography.weights.semibold,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.purple[700],
  },
  aboutLabel: {
    fontSize: Theme.typography.sizes.base,
    color: Theme.colors.purple[200],
  },
  aboutValue: {
    fontSize: Theme.typography.sizes.base,
    color: Theme.colors.white,
    fontWeight: Theme.typography.weights.medium,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.error,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
  },
  resetButtonText: {
    fontSize: Theme.typography.sizes.md,
    color: Theme.colors.white,
    fontWeight: Theme.typography.weights.bold,
    marginLeft: Theme.spacing.sm,
  },
});
