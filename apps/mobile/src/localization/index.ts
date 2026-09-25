import { I18n } from 'i18n-js';
import { usePreferencesStore } from '@/store/preferences';

const translations = {
  en: {
    hello: 'Hello, little learner!',
    title: "Let's learn and play",
    subtitle: 'Choose an adventure and discover something new today.',
    chooseSubject: 'What would you like to learn?',
    pashto: 'Pashto',
    pashtoHint: 'Letters, words and stories',
    math: 'Math',
    mathHint: 'Numbers, shapes and puzzles',
    changeLanguage: 'Change language',
    apiConnected: 'Learning service is ready',
    apiUnavailable: 'Learning service is offline',
    apiChecking: 'Checking learning service…',
  },
  ps: {
    hello: 'سلام، کوچني زده کوونکي!',
    title: 'راځئ زده کړه او لوبې وکړو',
    subtitle: 'یوه په زړه پورې موضوع وټاکئ او نن نوی څه زده کړئ.',
    chooseSubject: 'څه شی زده کول غواړې؟',
    pashto: 'پښتو',
    pashtoHint: 'توري، کلمې او کیسې',
    math: 'ریاضي',
    mathHint: 'شمېرې، شکلونه او معماوې',
    changeLanguage: 'ژبه بدله کړئ',
    apiConnected: 'د زده کړې خدمت چمتو دی',
    apiUnavailable: 'د زده کړې خدمت آفلاین دی',
    apiChecking: 'د زده کړې خدمت کتل کېږي…',
  },
} as const;

export function useI18n() {
  const locale = usePreferencesStore((state) => state.locale);
  const i18n = new I18n(translations, {
    locale,
    defaultLocale: 'en',
    enableFallback: true,
  });
  return {
    locale,
    isRtl: locale === 'ps',
    t: (key: keyof (typeof translations)['en']) => i18n.t(key),
  };
}
