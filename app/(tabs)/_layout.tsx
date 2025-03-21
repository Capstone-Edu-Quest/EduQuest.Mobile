import { Tabs, useRouter } from 'expo-router';
import { useTheme } from '@/services/hooks/useTheme';
import { SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react';
export default function TabLayout() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  useEffect(() => {
    // router.replace('/(auth)/signin');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
