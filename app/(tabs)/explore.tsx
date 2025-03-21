import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useTheme } from '@/services/hooks/useTheme';
import Input from '@/components/Input';
import CourseItemHorizontal from '@/components/CourseItemHorizontal';

type Props = {}

const ExploreScreen = (props: Props) => {
  const { currentTheme } = useTheme();

  const [keyword, setKeyword] = useState<string>('');
  const [confirmedKeyword, setConfirmedKeyword] = useState<string>('');

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
    },
    confirmedKeyword: {
      color: currentTheme.theme['--primary-text'],
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 12
    }
  })

  const onConfirmSearch = () => {
    setConfirmedKeyword(keyword);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Input placeholder="Search (Enter to search)" value={keyword} onChangeText={setKeyword} iconName='search' onBlur={onConfirmSearch} />

      {confirmedKeyword && <Text style={styles.confirmedKeyword}>Found 6 courses for "{confirmedKeyword}"</Text>}
      
      <View style={{ gap: 8, marginTop: 10, marginBottom: 60 }}>
        <CourseItemHorizontal />
        <CourseItemHorizontal />
        <CourseItemHorizontal />
        <CourseItemHorizontal />
        <CourseItemHorizontal />
        <CourseItemHorizontal />
        <CourseItemHorizontal />
      </View>
    </ScrollView>
  )
}

export default ExploreScreen