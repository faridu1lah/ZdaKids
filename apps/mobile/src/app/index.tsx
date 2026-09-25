import { useQuery } from '@tanstack/react-query';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getHealth } from '@/lib/api';
import { useI18n } from '@/localization';
import { usePreferencesStore } from '@/store/preferences';

export default function HomeScreen() {
  const { locale, isRtl, t } = useI18n();
  const setLocale = usePreferencesStore((state) => state.setLocale);
  const health = useQuery({ queryKey: ['health'], queryFn: getHealth });
  const direction = isRtl ? 'rtl' : 'ltr';
  const textAlign = isRtl ? 'right' : 'left';

  return (
    <View style={[styles.screen, { direction }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.topBar, isRtl && styles.rowReverse]}>
            <View style={styles.brandMark}>
              <Text style={styles.brandEmoji}>✨</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('changeLanguage')}
              onPress={() => setLocale(locale === 'en' ? 'ps' : 'en')}
              style={({ pressed }) => [
                styles.languageButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.languageButtonText}>
                {locale === 'en' ? 'پښتو' : 'English'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.hero}>
            <Text style={styles.heroEmoji}>🌈</Text>
            <Text
              style={[
                styles.eyebrow,
                { textAlign, writingDirection: direction },
              ]}
            >
              {t('hello')}
            </Text>
            <Text
              style={[styles.title, { textAlign, writingDirection: direction }]}
            >
              {t('title')}
            </Text>
            <Text
              style={[
                styles.subtitle,
                { textAlign, writingDirection: direction },
              ]}
            >
              {t('subtitle')}
            </Text>
          </View>

          <Text
            style={[
              styles.sectionTitle,
              { textAlign, writingDirection: direction },
            ]}
          >
            {t('chooseSubject')}
          </Text>

          <View style={styles.cardList}>
            <SubjectCard
              emoji="📖"
              color="#FF8B7B"
              title={t('pashto')}
              subtitle={t('pashtoHint')}
              isRtl={isRtl}
            />
            <SubjectCard
              emoji="🔢"
              color="#72C8A9"
              title={t('math')}
              subtitle={t('mathHint')}
              isRtl={isRtl}
            />
          </View>

          <View style={[styles.apiStatus, isRtl && styles.rowReverse]}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: health.isSuccess
                    ? '#4DAA78'
                    : health.isError
                      ? '#DC6C64'
                      : '#E6AE45',
                },
              ]}
            />
            <Text style={styles.apiStatusText}>
              {health.isSuccess
                ? t('apiConnected')
                : health.isError
                  ? t('apiUnavailable')
                  : t('apiChecking')}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SubjectCard({
  emoji,
  color,
  title,
  subtitle,
  isRtl,
}: SubjectCardProps) {
  const direction = isRtl ? 'rtl' : 'ltr';
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.subjectCard,
        { backgroundColor: color },
        isRtl && styles.rowReverse,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.subjectIcon}>
        <Text style={styles.subjectEmoji}>{emoji}</Text>
      </View>
      <View style={styles.subjectCopy}>
        <Text
          style={[
            styles.subjectTitle,
            {
              textAlign: isRtl ? 'right' : 'left',
              writingDirection: direction,
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subjectSubtitle,
            {
              textAlign: isRtl ? 'right' : 'left',
              writingDirection: direction,
            },
          ]}
        >
          {subtitle}
        </Text>
      </View>
      <Text style={styles.arrow}>{isRtl ? '‹' : '›'}</Text>
    </Pressable>
  );
}

interface SubjectCardProps {
  emoji: string;
  color: string;
  title: string;
  subtitle: string;
  isRtl: boolean;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF7DF' },
  safeArea: { flex: 1 },
  content: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  topBar: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowReverse: { flexDirection: 'row-reverse' },
  brandMark: {
    width: 50,
    height: 50,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D5FEF',
    transform: [{ rotate: '-4deg' }],
  },
  brandEmoji: { fontSize: 26 },
  languageButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8DDBD',
  },
  languageButtonText: { color: '#343256', fontSize: 16, fontWeight: '700' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  hero: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    marginTop: 12,
    marginBottom: 28,
    shadowColor: '#786B45',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  heroEmoji: { fontSize: 48, marginBottom: 14 },
  eyebrow: {
    color: '#F06E5D',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  title: { color: '#28264A', fontSize: 34, lineHeight: 42, fontWeight: '900' },
  subtitle: { color: '#716E8A', fontSize: 17, lineHeight: 25, marginTop: 8 },
  sectionTitle: {
    color: '#343256',
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 14,
  },
  cardList: { gap: 14 },
  subjectCard: {
    minHeight: 112,
    borderRadius: 26,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  subjectIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectEmoji: { fontSize: 36 },
  subjectCopy: { flex: 1 },
  subjectTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
  subjectSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    marginTop: 3,
  },
  arrow: { color: '#FFFFFF', fontSize: 38, fontWeight: '500' },
  apiStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 8,
    marginTop: 26,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: '#F2E9CC',
  },
  statusDot: { width: 9, height: 9, borderRadius: 5 },
  apiStatusText: { color: '#746C51', fontSize: 13, fontWeight: '700' },
});
