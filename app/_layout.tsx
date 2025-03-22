import { router, Stack } from 'expo-router';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { useTheme } from '@/services/hooks/useTheme';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

export default function RootLayout() {
  const { currentTheme } = useTheme();
  const [fontsLoaded] = useFonts({
    'BeVietnamPro-Black': require('../assets/fonts/BeVietnamPro-Black.ttf'),
    'BeVietnamPro-Bold': require('../assets/fonts/BeVietnamPro-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider
      value={{
        dark: true,
        colors: {
          primary: currentTheme.theme['--brand'],
          background: currentTheme.theme['--primary-bg'],
          card: currentTheme.theme['--secondary-bg'],
          text: currentTheme.theme['--primary-text'],
          border: currentTheme.theme['--tertiary-text'],
          notification: currentTheme.theme['--brand'],
        },
        fonts: {
          regular: { fontFamily: 'BeVietnamPro-Regular', fontWeight: 'normal' },
          bold: { fontFamily: 'BeVietnamPro-Bold', fontWeight: 'bold' },
          medium: { fontFamily: 'BeVietnamPro-Medium', fontWeight: 'normal' },
          heavy: { fontFamily: 'BeVietnamPro-Black', fontWeight: 'normal' },
        }
      }}
    >
      <StatusBar style={currentTheme.name === 'dark' ? 'light' : 'dark'} animated  />
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="(courses)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
