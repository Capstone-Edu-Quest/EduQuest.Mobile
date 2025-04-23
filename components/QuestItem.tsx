import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { useTheme } from '@/services/hooks/useTheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { IQuestOfUser, IRewardedQuestRes } from '@/interfaces/questInterfaces';
import Button from './Button';
import { QuestMissionEnum, QuestTypeEnum } from '@/Enum/questEnum';
import { claimQuestReward } from '@/services/apis/questsApis';
import { useUserStore } from '@/store/userStore';

type Props = {
    quest: IQuestOfUser
}

const QuestItem = ({ quest }: Props) => {
    const { currentTheme } = useTheme();
    const { token, user, setUser } = useUserStore();

    const [isClaimed, setIsClaimed] = useState<boolean>(quest.isRewardClaimed);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            width: `${quest.currentPoint / quest.pointToComplete * 100}%`,
            backgroundColor: currentTheme.theme['--brand'],
        },
        progressText: {
            position: 'absolute',
            left: 0,
            top: 0,
            // transform: [{ translateX: '-50%' }],
            fontSize: 9,
            width: '100%',
            textAlign: 'center',
            color: currentTheme.theme['--primary-text'],
        },
        Completed: {
            color: currentTheme.theme['--success'],
            textAlign: 'center',
            fontSize: 12,
            marginTop: 8
        }
    });

    const getQuestDescription = () => {
        switch (quest.questType) {
            case QuestMissionEnum.LESSONS:
                return `Complete ${quest.questValue[0]} lessons`;
            case QuestMissionEnum.LESSONS_TIME:
                return `Complete ${quest.questValue[0]} lessons in ${quest.questValue[1]} minutes`;

            case QuestMissionEnum.MATERIALS:
                return `Complete ${quest.questValue[0]} materials`;
            case QuestMissionEnum.MATERIALS_TIME:
                return `Complete ${quest.questValue[0]} materials in ${quest.questValue[1]} minutes`;

            case QuestMissionEnum.QUIZ:
                return `Complete ${quest.questValue[0]} quizzes`;
            case QuestMissionEnum.QUIZ_TIME:
                return `Complete ${quest.questValue[0]} quizzes in ${quest.questValue[1]} minutes`;

            case QuestMissionEnum.COURSES:
                return `Complete ${quest.questValue[0]} courses`;
            case QuestMissionEnum.COURSES_TIME:
                return `Complete ${quest.questValue[0]} courses in ${quest.questValue[1]} minutes`;

            case QuestMissionEnum.LEARNING_TIME:
                return `Spend ${quest.questValue[0]} minutes learning`;
            case QuestMissionEnum.LEARNING_TIME_TIME:
                return `Spend ${quest.questValue[0]} minutes learning in ${quest.questValue[1]} minutes`;

            case QuestMissionEnum.STREAK:
                return `Study ${quest.questValue[0]} days`;

            default:
                return 'Unknown mission';
        }
    }

    const parseQuestReward = (r: IRewardedQuestRes): string => {
        return [
            r.expAdded > 0 && `${r.expAdded} exp`,
            r.goldAdded > 0 && `${r.goldAdded} gold`,
            r.coupon && `Coupon: ${r.coupon}`
        ]
            .filter(Boolean)
            .join(', ');
    }

    const onClaim = () => {
        if (!token) return;

        setIsLoading(true);
        claimQuestReward(token.accessToken, (quest.id as string)).then(res => {
            const { errors, isError, message, payload } = res.data;

            if (isError) {
                Alert.alert(message?.content)
                return;
            }

            const newData = payload as IRewardedQuestRes

            if (user) {
                setIsClaimed(true);
                Alert.alert(`Rewarded successfully`, `${parseQuestReward(newData)}`)
                setUser({ ...user, statistic: { ...user.statistic, gold: newData.statistic.gold, exp: newData.statistic.exp, level: newData.statistic.level } });
            }

        })
            .catch(e => Alert.alert(e))
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <View style={styles.container}>
            <FontAwesome5 name="trophy" size={35} color={currentTheme.theme['--brand-light']} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{quest.title}</Text>
                <Text style={{fontSize: 11, color: currentTheme.theme['--secondary-text']}}>{quest.type === QuestTypeEnum.DAILY ? 'Daily' : 'One time'}</Text>
                <Text style={styles.subtitle}>{getQuestDescription()}</Text>
                {
                    isLoading ?
                        <ActivityIndicator size="small" color={currentTheme.theme['--brand']} />
                        :
                        isClaimed ?
                            <Text style={styles.Completed}>Completed</Text>
                            :
                            quest.isCompleted ?
                                <View style={{ marginTop: 8 }}>
                                    <Button type="primary" onPress={onClaim}>Claim</Button>
                                </View>
                                :
                                <View style={styles.progressBarContainer}>
                                    <View style={styles.progressBar} />
                                    <Text style={styles.progressText}>{quest.currentPoint}/{quest.pointToComplete}</Text>
                                </View>
                }
            </View>
        </View>
    )
}

export default QuestItem