import { useTheme } from '@/services/hooks/useTheme'
import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import LessonMaterial from './LessonMaterial'
import { ILessonOverview } from '@/interfaces/courseInterfaces'
type Props = {
    lesson: ILessonOverview;
}

const LessonItem = ({ lesson }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { currentTheme } = useTheme();

    const styles = StyleSheet.create({
        lessonItem: {

        },
        lessonInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: currentTheme.theme['--secondary-bg'],
            borderRadius: 12,
        },
        lessonInfoText: {
            fontSize: 14,
            color: currentTheme.theme['--primary-text'],
            fontWeight: 'bold',
        },
        lessonInfoTextSecondary: {
            fontSize: 11,
            color: currentTheme.theme['--secondary-text'],
        },
        materialContainer: {
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: currentTheme.theme['--tertiary-bg'],
            borderRadius: 12,
            transform: [{ translateY: -15 }],
            zIndex: -1,
            paddingTop: 20
        }
    })

    const onToggleLesson = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <View style={styles.lessonItem}>
            <TouchableOpacity style={styles.lessonInfo} onPress={onToggleLesson}>
                <FontAwesome name={isOpen ? 'angle-down' : 'angle-right'} size={18} color={currentTheme.theme['--primary-text']} />
                <View>
                    <Text style={styles.lessonInfoText}>Lesson {lesson.index + 1}</Text>
                    <Text style={styles.lessonInfoTextSecondary}><FontAwesome name="clock-o" size={11} color={currentTheme.theme['--secondary-text']} /> {Math.round(lesson.totalTime)} minutes</Text>
                </View>
            </TouchableOpacity>
            {isOpen &&
                <View style={styles.materialContainer}>
                    {
                        lesson.materials.map((material, index) => (
                            <LessonMaterial key={material.id} material={material} i={index} />
                        ))
                    }
                </View>}
        </View>
    )
}

export default LessonItem