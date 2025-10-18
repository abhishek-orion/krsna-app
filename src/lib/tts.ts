import * as Speech from 'expo-speech';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { Platform } from 'react-native';
import { TTSSettings } from '../types';

// Initialize audio session for iOS to ensure TTS works even in silent mode
export const initializeAudioSession = async () => {
  try {
    if (Platform.OS === 'ios') {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true, // Critical for iOS TTS
        interruptionModeIOS: InterruptionModeIOS.DuckOthers,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        playThroughEarpieceAndroid: false,
      });
    }
  } catch (error) {
    console.error('Failed to initialize audio session:', error);
  }
};

// TTS service
export const ttsService = {
  async speak(text: string, settings: TTSSettings, callbacks?: {
    onStart?: () => void;
    onDone?: () => void;
    onStopped?: () => void;
    onError?: (error: Error) => void;
  }) {
    try {
      await initializeAudioSession();

      const options: Speech.SpeechOptions = {
        language: settings.language || 'en-US',
        pitch: settings.pitch,
        rate: settings.rate,
        onStart: callbacks?.onStart,
        onDone: callbacks?.onDone,
        onStopped: callbacks?.onStopped,
        onError: callbacks?.onError,
      };

      if (settings.voice) {
        options.voice = settings.voice;
      }

      Speech.speak(text, options);
    } catch (error) {
      console.error('TTS error:', error);
      callbacks?.onError?.(error as Error);
    }
  },

  stop() {
    Speech.stop();
  },

  pause() {
    Speech.pause();
  },

  resume() {
    Speech.resume();
  },

  async getAvailableVoices() {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      return voices;
    } catch (error) {
      console.error('Failed to get voices:', error);
      return [];
    }
  },

  isSpeaking() {
    return Speech.isSpeakingAsync();
  },
};
