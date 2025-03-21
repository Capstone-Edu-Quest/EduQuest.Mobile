import { Tabs, useRouter } from 'expo-router';
import { useTheme } from '@/services/hooks/useTheme';
import { SafeAreaView, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react';
import CustomHeaderBar from '@/components/CustomHeaderBar';
import CustomBottomBar from '@/components/CustomBottomBar';

export default function TabLayout() {
  const router = useRouter();
  const { currentTheme } = useTheme();

  useEffect(() => {
    // router.replace('/(auth)/signin');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      <View style={{ flex: 1 }}>
        <CustomHeaderBar />

        <View style={{ flex: 1, padding: 10 }}>
          <Tabs
            screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                title: 'Explore',
              }}
            />
          </Tabs>
        </View>

        <CustomBottomBar />
      </View>
    </SafeAreaView>
  );
}
