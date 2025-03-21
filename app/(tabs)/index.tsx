import CustomBottomBar from '@/components/CustomBottomBar';
import CustomHeaderBar from '@/components/CustomHeaderBar';
import { useTheme } from '@/services/hooks/useTheme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const { currentTheme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: currentTheme.theme['--primary-bg'] }}>
      <CustomHeaderBar />
      <Text>Hello World</Text>

      <CustomBottomBar />
    </View>
  );
}
