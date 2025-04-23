import Button from '@/components/Button';
import LessonItem from '@/components/Lesson/LessonItem';
import { ICourse } from '@/interfaces/courseInterfaces';
import { getCourseById } from '@/services/apis/coursesApis';
import { useTheme } from '@/services/hooks/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';

type Props = {}

const courseDetailts = (props: Props) => {
  const { courseId } = useLocalSearchParams();
  const { currentTheme } = useTheme();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<ICourse | null>(null)

  useFocusEffect(
    useCallback(() => {
      onInitCourse()
    }, [])
  );

  const onInitCourse = () => {
    if (!courseId) return;

    setIsLoading(true);
    getCourseById(courseId as string).then(res => {
      const { errors, isError, message, payload } = res.data;


      if (isError) {
        Alert.alert(message?.content)
        return
      }

      setCourse(payload)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      paddingHorizontal: 12, boxSizing: 'border-box'
    },
    title: {
      color: currentTheme.theme['--primary-text'],
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 15
    },
    row: {
      flexDirection: 'row',
      gap: 4,
      marginTop: 4,
    },
    text: {
      color: currentTheme.theme['--secondary-text'],
      fontSize: 11,
    },
    recommendedCoursesItemRating: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3
    },
    recommendedCoursesItemRatingText: {
      fontSize: 11,
      color: currentTheme.theme['--brand-light'],
      fontWeight: 'bold',
      marginRight: 4
    },
    numberOfRatings: {
      fontSize: 11,
      color: currentTheme.theme['--secondary-text'],
      marginLeft: 4
    },
    sectionContainer: {
      marginTop: 25
    },
    sectionTitle: {
      fontSize: 16,
      color: currentTheme.theme['--brand-light'],
      fontWeight: 'bold',
      marginBottom: 4
    },
    sectionName: {
      fontSize: 13,
      color: currentTheme.theme['--primary-text'],
      fontWeight: 'bold',
      marginBottom: 2
    },
    sectionText: {
      fontSize: 12,
      color: currentTheme.theme['--primary-text'],
    },
    sectionPosition: {
      fontSize: 10,
      color: currentTheme.theme['--secondary-text'],
    },
    statsCtn: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 5
    },
    statsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4
    },
    statsItemText: {
      fontSize: 10,
      color: currentTheme.theme['--primary-text'],
    },
    price: {
      fontSize: 16,
      color: currentTheme.theme['--brand'],
      fontWeight: 'bold',
      marginTop: 18
    },
    recommendedCoursesItemActions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
      gap: 8,
    },
    lessonContainer: {
      flexDirection: 'column',
      gap: 4
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
    }
  });

  const instructorItems = [
    {
      icon: 'book',
      value: `${course?.author.totalCourseCreated} courses`
    },
    {
      icon: 'user',
      value: `${course?.author.totalLearner} Learners`
    },
    {
      icon: 'comments',
      value: `${course?.author.totalReview} Reviews`
    },
    {
      icon: 'star',
      value: `${course?.author.rating ?? 0}`
    },
  ]

  const onBack = () => {
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      {
        isLoading
          ? <ActivityIndicator size="large" color={currentTheme.theme['--brand']} />
          :
          course &&
          <ScrollView style={styles.scrollView}>

            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <FontAwesome name="angle-left" size={20} color={currentTheme.theme['--secondary-text']} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: course.photoUrl }}
              style={{ width: '100%', height: 200, borderRadius: 20 }}
              resizeMode="cover"
            />

            <Text style={styles.title}>{course?.title}</Text>
            <View style={styles.row}>
              <View style={styles.recommendedCoursesItemRating}>
                <Text style={styles.recommendedCoursesItemRatingText}>{course?.rating ?? 0}</Text>
                {
                  Array.from({ length: 5 }).map((_, index) => (
                    <FontAwesome key={index} name="star" size={12} color={Math.floor(course?.rating ?? 0) > index ? currentTheme.theme['--brand-light'] : currentTheme.theme['--quaternary-text']} />
                  ))
                }
                <Text style={styles.numberOfRatings}>({(Math.round(course.totalReview))})</Text>
              </View>
              <Text style={[styles.text]}>· {course?.totalLearner} learners</Text>
            </View>

            <Text style={styles.price}>${course?.price}</Text>
            <View style={styles.recommendedCoursesItemActions}>
              <Button height={30} fontSize={13} onPress={() => router.push(`/(courses)/${courseId}/stages`)} type="primary">View Lessons</Button>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Instructor</Text>
              <Text style={styles.sectionName}>{course?.author.username}</Text>
              <Text style={styles.sectionPosition}>{course?.author.headline}</Text>
            </View>
            <View style={styles.statsCtn}>
              {
                instructorItems.map((item, index) => (
                  <View key={index} style={styles.statsItem}>
                    <FontAwesome name={item.icon as any} size={10} color={currentTheme.theme['--secondary-text']} />
                    <Text style={styles.statsItemText}>{item.value}</Text>
                  </View>
                ))
              }
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.sectionText}>{course?.description}</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Requirements</Text>
              {
                course.requirementList.map((req, i) => (
                  <Text key={i} style={styles.sectionText}>{i + 1}. {req}</Text>
                ))
              }
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Lessons</Text>
              {/* <Text style={styles.sectionText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</Text> */}
            </View>

            <View style={styles.lessonContainer}>
              {
                course.listLesson.map((lesson, index) => (
                  <LessonItem key={index} lesson={lesson} />
                ))
              }
            </View>


          </ScrollView>
      }

    </SafeAreaView>
  )
}

export default courseDetailts