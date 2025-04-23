import CourseItem from '@/components/CourseItem';
import { useTheme } from '@/services/hooks/useTheme';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
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

  const onViewAllCourse = (path: string) => {
    router.push('/(tabs)/' + path as any);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back, Khang <FontAwesome name="bolt" size={14} color={currentTheme.theme['--brand']} /></Text>
      <View style={styles.recommendedCoursesTitleContainer}>
        <Text style={styles.recommendedCoursesTitle}>Recommend</Text>
        <Text style={styles.recommendedCoursesTitleLink} onPress={() => onViewAllCourse('explore')} >Explore <FontAwesome name="angle-right" size={14} color={currentTheme.theme['--secondary-text']} /></Text>
      </View>
      <ScrollView horizontal style={styles.recommendedCoursesContainer}>
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </ScrollView>

      <View style={{ ...styles.recommendedCoursesTitleContainer, marginTop: 24 }}>
        <Text style={styles.recommendedCoursesTitle}>Studying</Text>
        <Text style={styles.recommendedCoursesTitleLink} onPress={() => onViewAllCourse('studying')} >View all <FontAwesome name="angle-right" size={14} color={currentTheme.theme['--secondary-text']} /></Text>
      </View>
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
