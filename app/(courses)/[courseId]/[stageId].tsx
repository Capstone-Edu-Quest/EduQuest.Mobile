import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@/services/hooks/useTheme';
import StageItem from '@/components/Stage/Material';
import StagesCtn from '@/components/Stage/StageMaterials';

type Props = {}

const StageDetails = (props: Props) => {
  const { courseId, stageId } = useLocalSearchParams();
  const { currentTheme } = useTheme();
  const router = useRouter();

  const [currentStage, setCurrentStage] = useState<number>(Number(stageId) ?? 1);

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

  });

  const onBack = () => {
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <FontAwesome name="angle-left" size={20} color={currentTheme.theme['--secondary-text']} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.courseName} numberOfLines={1} ellipsizeMode="tail">Mastering Typescript</Text>
        <Text style={styles.stageName}>Stage 1: Basic Typescript syntax</Text>

        <StagesCtn />
      </ScrollView>
    </SafeAreaView>
  )
}

export default StageDetails;