import { useTheme } from '@/services/hooks/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
type Props = {
    lessonNo: number;
}

const LessonMaterial = ({ lessonNo }: Props) => {
    const { currentTheme } = useTheme();

    const styles = StyleSheet.create({
        materialContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginVertical: 4
        },
        materialName: {
            fontSize: 12,
            color: currentTheme.theme['--primary-text'],
        },
        leftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        rightContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4
        },
        timeText: {
            fontSize: 10,
            color: currentTheme.theme['--secondary-text'],
        }
    })

    return (
        <View style={styles.materialContainer}>
            <View style={styles.leftContainer}>
                <FontAwesome name="play" size={10} color={currentTheme.theme['--primary-text']} />
                <Text style={styles.materialName}>{lessonNo}. Lesson Material</Text>
            </View>
            <View style={styles.rightContainer}>
                <FontAwesome name="clock-o" size={10} color={currentTheme.theme['--secondary-text']} />
                <Text style={styles.timeText}>
                    20 minutes
                </Text>
            </View>
        </View>
    )
}

export default LessonMaterial