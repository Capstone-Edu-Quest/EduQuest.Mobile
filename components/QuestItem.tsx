import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/services/hooks/useTheme';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = {}

const QuestItem = (props: Props) => {
    const { currentTheme } = useTheme();

    const [currentValue, setCurrentValue] = useState<number>(6);
    const [totalValue, setTotalValue] = useState<number>(100);

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 16,
            backgroundColor: currentTheme.theme['--secondary-bg'],
            borderRadius: 10,
            overflow: 'hidden',
        },
        icon: {
            marginRight: 10,
        },
        textContainer: {
            flex: 1,
            paddingHorizontal: 12
        },
        title: {
            fontSize: 15,
            fontWeight: 'bold',
            color: currentTheme.theme['--primary-text'],
        },
        subtitle: {
            fontSize: 11,
            marginTop: 1,
            color: currentTheme.theme['--secondary-text'],
        },
        progressBarContainer: {
            marginTop: 12,
            height: 12,
            width: '100%',
            backgroundColor: currentTheme.theme['--tertiary-bg'],
            borderRadius: 5,
            overflow: 'hidden',
            position: 'relative',
        },
        progressBar: {
            height: '100%',
            width: `${currentValue / totalValue * 100}%`,
            backgroundColor: currentTheme.theme['--brand'],
        },
        progressText: {
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: [{ translateX: '-50%' }],
            fontSize: 9,
            color: currentTheme.theme['--primary-text'],
        },
    });

    return (
        <View style={styles.container}>
            <FontAwesome5 name="trophy" size={35} color={currentTheme.theme['--brand-light']} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Study Master</Text>
                <Text style={styles.subtitle}>Study 100 hours</Text>
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar} />
                    <Text style={styles.progressText}>{currentValue}/{totalValue}</Text>
                </View>
            </View>
        </View>
    )
}

export default QuestItem