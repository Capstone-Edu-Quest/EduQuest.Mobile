import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useTheme } from '@/services/hooks/useTheme'
import { FontAwesome } from '@expo/vector-icons'

type Props = {}

const StageInfoModal = (props: Props) => {
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
        }
    })
    return (
        <View style={styles.stageInfoModal}>
            <Text style={styles.materialName}>Loops and Iterations</Text>
            <Text style={styles.materialDescription}>Material Type: Video</Text>
            <Text style={styles.materialDescription}><FontAwesome name="clock-o" size={12} color={currentTheme.theme['--secondary-text']} /> 10 minutes</Text>
        </View>
    )
}

export default StageInfoModal