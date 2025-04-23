import { IMaterialOverview } from '@/interfaces/courseInterfaces';
import { useTheme } from '@/services/hooks/useTheme';
import { getMaterialName } from '@/utils/material';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
type Props = {
    material: IMaterialOverview;
    i: number;
}

const LessonMaterial = ({ material, i }: Props) => {
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
    });

    return (
        <View style={styles.materialContainer}>
            <View style={styles.leftContainer}>
                <FontAwesome name={getMaterialName(material.type) as any} size={10} color={currentTheme.theme['--primary-text']} />
                <Text style={styles.materialName}>{i + 1}. {material.title}</Text>
            </View>
            <View style={styles.rightContainer}>
                <FontAwesome name="clock-o" size={10} color={currentTheme.theme['--secondary-text']} />
                <Text style={styles.timeText}>
                    {Math.ceil(material.duration)} minutes
                </Text>
            </View>
        </View>
    )
}

export default LessonMaterial