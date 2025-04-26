import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import { useTheme } from '@/services/hooks/useTheme';
import CourseItemHorizontal from '@/components/CourseItemHorizontal';
import { ICourseOverview } from '@/interfaces/courseInterfaces';
import { useUserStore } from '@/store/userStore';
import { getStudyingCourses } from '@/services/apis/coursesApis';
import { useFocusEffect } from 'expo-router';

type Props = {}

const StudyingScreen = (props: Props) => {
  const { currentTheme } = useTheme();
  const { token } = useUserStore();

  const [isLoading, setIsloading] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourseOverview[]>([]);


  useFocusEffect(
    useCallback(() => {
      onInitStudyingCourses()

    }, [])
  );


  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      paddingTop: 50 + (Platform.OS === 'android' ? 24 : 0),
      boxSizing: 'border-box',
      backgroundColor: currentTheme.theme['--primary-bg'],
    },
    title: {
      color: currentTheme.theme['--brand'],
      fontSize: 16,
      fontWeight: 'bold',
    }
  });

  const onInitStudyingCourses = () => {
    if (!token?.accessToken) return;

    setIsloading(true);
    getStudyingCourses(token.accessToken).then(res => {
      const { errors, isError, message, payload } = res.data;
      if (isError) {
        Alert.alert(message?.content)
        return
      }

      setCourses(payload);
    }).finally(() => {
      setIsloading(false)
    })
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Studying</Text>
      {
        isLoading
          ? <ActivityIndicator size="large" color={currentTheme.theme['--brand']} />
          :
          <View style={{ gap: 8, marginTop: 10, marginBottom: 60 }}>
            {
              courses.map((course) => <CourseItemHorizontal key={course.id} course={course} />)
            }

          </View>
      }
    </ScrollView>
  );
}

export default StudyingScreen;
