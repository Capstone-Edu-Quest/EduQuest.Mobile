import CourseItem from '@/components/CourseItem';
import { useTheme } from '@/services/hooks/useTheme';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      paddingTop: 50,
      paddingBottom: 0,
      boxSizing: 'border-box',
    },
    welcomeText: {
      color: currentTheme.theme['--brand'],
      fontSize: 16,
      fontWeight: 'bold',
    },
    recommendedCoursesTitle: {
      color: currentTheme.theme['--brand-light'],
      fontSize: 14,
      fontWeight: 'bold',
    },
    recommendedCoursesContainer: {
      flex: 1,
      marginTop: 8,
      boxSizing: 'border-box',
    },
    recommendedCoursesTitleLink: {
      color: currentTheme.theme['--secondary-text'],
      fontSize: 12,
      fontWeight: '500'
    },
    recommendedCoursesTitleContainer: {
      marginTop: 22,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 12
    }

  });

  const onViewAllCourse = () => {
    router.push('/(tabs)/explore');
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back, Khang <FontAwesome name="bolt" size={14} color={currentTheme.theme['--brand']} /></Text>
      <View style={styles.recommendedCoursesTitleContainer}>
        <Text style={styles.recommendedCoursesTitle}>Recommend</Text>
        <Text style={styles.recommendedCoursesTitleLink} onPress={onViewAllCourse} >View all <FontAwesome name="angle-right" size={14} color={currentTheme.theme['--secondary-text']} /></Text>
      </View>
      <ScrollView horizontal style={styles.recommendedCoursesContainer}>
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </ScrollView>

      <Text style={{ ...styles.recommendedCoursesTitle, marginTop: 18 }}>Studying</Text>
      <ScrollView horizontal style={styles.recommendedCoursesContainer}>
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </ScrollView>
    </ScrollView>
  );
}
