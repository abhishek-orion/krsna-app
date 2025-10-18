import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings, TTSSettings } from '../types';

interface SettingsState {
  settings: AppSettings;
  updateTTSSettings: (newSettings: Partial<TTSSettings>) => void;
  updateAppSettings: (newSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  notifications: true,
  tts: {
    rate: 1.0,
    pitch: 1.0,
    language: 'en-US',
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateTTSSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            tts: {
              ...state.settings.tts,
              ...newSettings,
            },
          },
        })),
      updateAppSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        })),
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    {
      name: 'krsna-app-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

