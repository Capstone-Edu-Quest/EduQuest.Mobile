import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useTheme } from '@/services/hooks/useTheme';
import Input from '@/components/Input';
import CourseItemHorizontal from '@/components/CourseItemHorizontal';
import QuestItem from '@/components/QuestItem';
import { getUserQuest } from '@/services/apis/questsApis';
import { useUserStore } from '@/store/userStore';
import { IQuestOfUser } from '@/interfaces/questInterfaces';
import { useFocusEffect } from 'expo-router';

type Props = {}

const QuestsScreen = (props: Props) => {
    const { token } = useUserStore();
    const { currentTheme } = useTheme();

    const [quests, setQuests] = useState<IQuestOfUser[]>([]);
    const [isLoading, setIsloading] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            iniQuest()

            return () => {
                // optional cleanup
            };
        }, [])
    );


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

    const iniQuest = () => {
        if (!token?.accessToken) return;

        setIsloading(true);
        getUserQuest(token?.accessToken).then(res => {
            const { errors, isError, message, payload } = res.data;

            if (isError) {
                Alert.alert(message?.content)
                return
            }

            setQuests(payload);
        }).finally(() => setIsloading(false))

    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Quests</Text>
            {
                isLoading
                    ?
                    <ActivityIndicator size="large" color={currentTheme.theme['--brand']} />
                    :
                    <View style={{ gap: 8, flexDirection: 'column', marginBottom: 60, marginTop: 12 }}>
                        {
                            quests.map((q, i) => <QuestItem key={i} quest={q} />)
                        }
                    </View>
            }
        </ScrollView>
    )
}

export default QuestsScreen