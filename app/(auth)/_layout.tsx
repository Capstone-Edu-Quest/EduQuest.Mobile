import { Stack, Tabs } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';
import 'react-native-reanimated';
import { useTheme } from '@/services/hooks/useTheme';
import { StyleSheet } from 'react-native';
import CustomBottomBar from '@/components/CustomBottomBar';


export default function AuthLayout() {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.theme['--primary-bg'],
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
        <Tabs.Screen name="signin" />
      </Tabs>

      <Text style={{ color: currentTheme.theme['--primary-text'] }}>Hello</Text>
    </SafeAreaView>
  );
}