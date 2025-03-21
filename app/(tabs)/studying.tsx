import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/services/hooks/useTheme';
import CourseItemHorizontal from '@/components/CourseItemHorizontal';

type Props = {}

const StudyingScreen = (props: Props) => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      paddingTop: 50,
      boxSizing: 'border-box',
      backgroundColor: currentTheme.theme['--primary-bg'],
    },
    title: {
      color: currentTheme.theme['--brand'],
      fontSize: 16,
      fontWeight: 'bold',
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Studying</Text>
      <View style={{ gap: 8, marginTop: 10, marginBottom: 60 }}>
        <CourseItemHorizontal isPurchased={true} />
        <CourseItemHorizontal isPurchased={true} />
        <CourseItemHorizontal isPurchased={true} />
        <CourseItemHorizontal isPurchased={true} />
        <CourseItemHorizontal isPurchased={true} />
        <CourseItemHorizontal isPurchased={true} />
        <CourseItemHorizontal isPurchased={true} />
      </View>
    </ScrollView>
  );
}

export default StudyingScreen;
