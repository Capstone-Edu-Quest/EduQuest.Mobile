import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useTheme } from '@/services/hooks/useTheme';
import Input from '@/components/Input';
import CourseItemHorizontal from '@/components/CourseItemHorizontal';
import QuestItem from '@/components/QuestItem';

type Props = {}

const QuestsScreen = (props: Props) => {
    const { currentTheme } = useTheme();

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
    })

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Quests</Text>
            <View style={{ gap: 8, flexDirection: 'column' , marginBottom: 60, marginTop: 12}}>
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
                <QuestItem />
            </View>
        </ScrollView>
    )
}

export default QuestsScreen