import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useTheme } from '@/services/hooks/useTheme'
import { FontAwesome } from '@expo/vector-icons'
import { IMaterialOverview } from '@/interfaces/courseInterfaces'

type Props = {
    material: IMaterialOverview
}

const StageInfoModal = ({ material }: Props) => {
    const { currentTheme } = useTheme();

    const styles = StyleSheet.create({
        stageInfoModal: {
        },
        materialName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: currentTheme.theme['--primary-text'],
        },
        materialDescription: {
            fontSize: 12,
            color: currentTheme.theme['--secondary-text'],
            marginTop: 3
        },
    })
    return (
        <View style={styles.stageInfoModal}>
            <Text style={styles.materialName}>{material.title}</Text>
            <Text style={styles.materialDescription}>Material Type: {material.type}</Text>
            <Text style={styles.materialDescription}><FontAwesome name="clock-o" size={12} color={currentTheme.theme['--secondary-text']} /> {Math.round(material.duration)} minutes</Text>
        </View>
    )
}

export default StageInfoModal