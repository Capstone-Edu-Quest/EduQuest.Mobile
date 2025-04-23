import { Tabs, useRouter } from 'expo-router';
import { useTheme } from '@/services/hooks/useTheme';
import { SafeAreaView, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react';
import CustomHeaderBar from '@/components/CustomHeaderBar';
import CustomBottomBar from '@/components/CustomBottomBar';

export default function TabLayout() {

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
            {/* <Tabs.Screen
              name="explore"
              options={{
                title: 'Explore',
              }}
            /> */}
            <Tabs.Screen
              name="studying"
              options={{
                title: 'Studying',
              }}
            />
            <Tabs.Screen
              name="quests"
              options={{
                title: 'Quests',
              }}
            />
            <Tabs.Screen
              name="wishlist"
              options={{
                title: 'Wishlist',
              }}
            />
            <Tabs.Screen
              name="cart"
              options={{
                title: 'Cart',
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: 'Profile',
              }}
            />
          </Tabs>
        </View>

        <CustomBottomBar />
      </View>
    </SafeAreaView>
  );
}
