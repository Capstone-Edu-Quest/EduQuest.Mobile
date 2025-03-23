import Button from '@/components/Button';
import LessonItem from '@/components/Lesson/LessonItem';
import { useTheme } from '@/services/hooks/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

type Props = {}

const courseDetailts = (props: Props) => {
  const { courseId } = useLocalSearchParams();
  const { currentTheme } = useTheme();
  const router = useRouter();

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

  const currentStar = 3.5;
  const instructorItems = [
    {
      icon: 'book',
      value: '12 Courses'
    },
    {
      icon: 'user',
      value: '12.345 Learners'
    },
    {
      icon: 'comments',
      value: '12.345 Reviews'
    },
    {
      icon: 'star',
      value: '4.5'
    },
  ]

  const onBack = () => {
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView style={styles.scrollView}>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <FontAwesome name="angle-left" size={20} color={currentTheme.theme['--secondary-text']} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push(`/(courses)/${courseId}/1`)}>
          <Text style={{ color: 'white' }}>Test stage</Text>
        </TouchableOpacity>

        <Image
          source={require('@/assets/images/demo-course-thumb.webp')}
          style={{ width: '100%', height: 200, borderRadius: 20 }}
          resizeMode="cover"
        />
        <Text style={styles.title}>Mastering Typescript</Text>
        <View style={styles.row}>
          <View style={styles.recommendedCoursesItemRating}>
            <Text style={styles.recommendedCoursesItemRatingText}>{currentStar}</Text>
            {
              Array.from({ length: 5 }).map((_, index) => (
                <FontAwesome key={index} name="star" size={12} color={Math.floor(currentStar) > index ? currentTheme.theme['--brand-light'] : currentTheme.theme['--quaternary-text']} />
              ))
            }
            <Text style={styles.numberOfRatings}>({(11432).toLocaleString()})</Text>
          </View>
          <Text style={[styles.text]}>· 1253 learners</Text>
        </View>

        <Text style={styles.price}>$125</Text>
        <View style={styles.recommendedCoursesItemActions}>
          <Button height={30} fontSize={13} onPress={() => { }} type="primary">Add to cart</Button>
          <FontAwesome name="heart" size={20} color={currentTheme.theme['--brand-light']} />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructor</Text>
          <Text style={styles.sectionName}>John Doe</Text>
          <Text style={styles.sectionPosition}>Senior Software Engineer @ Shopee</Text>
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
          <Text style={styles.sectionText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <Text style={styles.sectionText}>1. Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
          <Text style={styles.sectionText}>2. Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
          <Text style={styles.sectionText}>3. Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Lessons</Text>
          {/* <Text style={styles.sectionText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</Text> */}
        </View>

        <View style={styles.lessonContainer}>
          {
            Array(4).fill(1).map((_, index) => (
              <LessonItem key={index} lessonNo={index + 1} />
            ))
          }
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default courseDetailts