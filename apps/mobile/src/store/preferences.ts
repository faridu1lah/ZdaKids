import { create } from 'zustand';
import { getLocales } from 'expo-localization';
import { DEFAULT_LOCALE } from '@zdakids/config';
import type { SupportedLocale } from '@zdakids/types';

interface PreferencesState {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  locale: getLocales()[0]?.languageCode === 'ps' ? 'ps' : DEFAULT_LOCALE,
  setLocale: (locale) => set({ locale }),
}));
