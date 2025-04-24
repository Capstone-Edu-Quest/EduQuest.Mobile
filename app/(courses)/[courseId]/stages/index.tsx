import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from '@/services/hooks/useTheme';
import StagesCtn from '@/components/Stage/StageMaterials';
import { ICourse } from '@/interfaces/courseInterfaces';
import { getCourseById } from '@/services/apis/coursesApis';
import { useUserStore } from '@/store/userStore';

type Props = {}

const StageDetails = (props: Props) => {
  const { currentTheme } = useTheme();
  const { token } = useUserStore();

  const router = useRouter();
  const { courseId } = useLocalSearchParams();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 12,
      boxSizing: 'border-box',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginBottom: 12
    },
    backButtonText: {
      fontSize: 14,
      color: currentTheme.theme['--secondary-text'],
    },
    courseName: {
      marginTop: 8,
      fontSize: 12,
      fontWeight: 'bold',
      color: currentTheme.theme['--secondary-text'],
    },
    stageName: {
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 4,
      color: currentTheme.theme['--primary-text'],
    },

    stageChangeSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginVertical: 12,
      justifyContent: 'space-between'
    },
    stageChangeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    stageChangeButtonText: {
      fontSize: 12,
      color: currentTheme.theme['--secondary-text'],

    }

  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<ICourse | null>(null);

  const [currentViewLessonIndex, setCurrentViewLessonIndex] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      onInitCourse()
    }, [])
  );

  const onInitCourse = () => {
    if (!courseId) return;

    setIsLoading(true);
    getCourseById(courseId as string, token?.accessToken as string).then(res => {
      const { errors, isError, message, payload } = res.data;

      if (isError) {
        Alert.alert(message?.content)
        return
      }

      setCourse(payload);
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const onBack = () => {
    router.back();
  }

  const onChangeLesson = (value: number) => {
    setCurrentViewLessonIndex(prev => Math.max(Math.min(prev + value, Number(course?.listLesson?.length) - 1), 0))
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      {
        isLoading
          ? <ActivityIndicator size="large" color={currentTheme.theme['--brand']} />
          :
          course &&

          <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <FontAwesome name="angle-left" size={20} color={currentTheme.theme['--secondary-text']} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.courseName} numberOfLines={1} ellipsizeMode="tail">{course.title}</Text>
            <Text style={styles.stageName}>Lesson {currentViewLessonIndex + 1}: {course.listLesson[currentViewLessonIndex]?.name || "Unnamed"}</Text>
            <View style={styles.stageChangeSection}>
              <TouchableOpacity style={styles.stageChangeButton} onPress={() => onChangeLesson(-1)}>
                <FontAwesome name="angle-left" size={16} color={currentTheme.theme['--secondary-text']} />
                <Text style={styles.stageChangeButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stageChangeButton} onPress={() => onChangeLesson(1)}>
                <Text style={styles.stageChangeButtonText}>Next</Text>
                <FontAwesome name="angle-right" size={16} color={currentTheme.theme['--secondary-text']} />
              </TouchableOpacity>
            </View>

            <StagesCtn courseId={course.id} lesson={course.listLesson[currentViewLessonIndex]} />
          </ScrollView>
      }
    </SafeAreaView>
  )
}

export default StageDetails;