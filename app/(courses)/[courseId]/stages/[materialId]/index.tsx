import { MaterialTypeEnum } from '@/Enum/courseEnum';
import { ILearningMaterial, ISubmitQuizReq } from '@/interfaces/courseInterfaces';
import { getMaterialById } from '@/services/apis/coursesApis';
import { useAppreanceStore } from '@/store/apprearanceStore';
import { useUserStore } from '@/store/userStore';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Video } from 'expo-av';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import Button from '@/components/Button';
import { getAlphabetByIndex, onAddZeroToTime } from '@/utils/string';
import { FontAwesome } from '@expo/vector-icons';

type Props = {}

const index = (props: Props) => {
    const { currentTheme } = useAppreanceStore();
    const { token } = useUserStore();
    const { materialId } = useLocalSearchParams();

    const [material, setMaterial] = useState<ILearningMaterial | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        initMaterial();
    }, []);

    const initMaterial = () => {
        setIsLoading(true)
        getMaterialById(materialId as string, token?.accessToken as string).then(res => {
            const { errors, isError, message, payload } = res.data;

            if (isError) {
                Alert.alert(message?.content)
                return
            }

            setMaterial(payload);
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const getMaterialComponent = () => {
        switch (material?.type) {
            case MaterialTypeEnum.VIDEO:
                return <VideoComponent material={material} />;
            case MaterialTypeEnum.DOCUMENT:
                return <DocumentComponent material={material} />;
            case MaterialTypeEnum.QUIZ:
                return <QuizComponent material={material} />;
            case MaterialTypeEnum.ASSIGNMENT:
                return <AssignmentComponent material={material} />
            default:
                return <View></View>
        }
    }

    return (
        <SafeAreaView>
            {
                isLoading
                    ? <ActivityIndicator size="large" color={currentTheme.theme['--brand']} />
                    : material &&
                    <ScrollView>
                        {
                            getMaterialComponent()
                        }
                    </ScrollView>
            }
        </SafeAreaView>
    )
}

export default index;

const VideoComponent = ({ material }: { material: ILearningMaterial }) => {
    const { currentTheme } = useAppreanceStore();
    const video = useRef(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onTriggerPlayVideo = (status: any) => {
        if (status.isLoaded) {
            const progress = (status.positionMillis / 1000) / (Number(material.video?.duration) * 60);
            if (progress >= 0.8) {

            }
        } else {
            console.warn("⚠️ Video not loaded yet");
        }
    }

    return (
        <View style={{ flex: 1, marginTop: 12, minHeight: 500, paddingHorizontal: 8 }}>
            {
                isLoading
                && <ActivityIndicator size="large" color={currentTheme.theme['--brand']} />

            }
            <Video
                ref={video}
                onLoad={() => setIsLoading(false)}
                source={{ uri: material.video?.urlMaterial as string }}
                useNativeControls
                style={{ width: '100%', height: 260 }}
                onPlaybackStatusUpdate={onTriggerPlayVideo}
            />

            <Text style={{ color: currentTheme.theme['--primary-text'], fontSize: 16, fontWeight: 600, marginTop: 12 }}>{material.title}</Text>
            <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12, }}>{material.description}</Text>
        </View>
    )
}

const DocumentComponent = ({ material }: { material: ILearningMaterial }) => {
    const { currentTheme } = useAppreanceStore();
    const { width } = useWindowDimensions();

    return (
        <View style={{ flex: 1, marginTop: 12, minHeight: 500, paddingHorizontal: 8 }}>
            <Text style={{ color: currentTheme.theme['--primary-text'], fontSize: 16, fontWeight: 600, marginVertical: 12 }}>{material.title}</Text>
            <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12, }}>{material.description}</Text>
            <View style={{ paddingHorizontal: 12, marginTop: 24 }}>
                <RenderHTML
                    contentWidth={width}
                    tagsStyles={{
                        h1: {
                            fontSize: 22,
                            color: currentTheme.theme['--brand'],
                        },
                        h2: {
                            fontSize: 20,
                            color: currentTheme.theme['--primary-text']
                        },
                        h3: {
                            fontSize: 18,
                            color: currentTheme.theme['--primary-text']
                        },
                        h4: {
                            fontSize: 16,
                            color: currentTheme.theme['--primary-text']
                        },
                        code: {
                            backgroundColor: currentTheme.theme['--tertiary-bg'],
                            paddingHorizontal: 4,
                            paddingVertical: 2,
                            borderRadius: 2,
                            color: currentTheme.theme['--primary-text']
                        },
                        blockquote: {
                            borderLeftWidth: 4,
                            borderLeftColor: currentTheme.theme['--quaternary-bg'],
                            paddingLeft: 8,
                            color: currentTheme.theme['--primary-text']
                        },
                        p: {
                            width: '100%',
                            color: currentTheme.theme['--primary-text']
                        },
                        a: {
                            color: currentTheme.theme['--brand']
                        }
                    }}
                    source={{ html: material.content || "" }}
                />
            </View>
        </View>
    )
}

const QuizComponent = ({ material }: { material: ILearningMaterial }) => {
    const { currentTheme } = useAppreanceStore();
    const [isStart, setIsStart] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0)
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({})

    const onStartQuiz = () => {
        setIsStart(true);
        setCountdown(Number(material.quiz?.timeLimit) * 60);
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev === 0) {
                    clearInterval(interval)
                    return 0;
                }

                return prev - 1
            });
        }, 1000);

        material.quiz?.questions.forEach(question => {
            setSelectedAnswers(prev => ({ ...prev, [question.id as string]: null }))
        })
    }

    const convertTimeToCountdown = () => {
        const seconds = countdown % 60;

        return `${onAddZeroToTime(
            (countdown - seconds) / 60
        )}:${onAddZeroToTime(seconds)}`;
    }

    const onSelect = (questionId: string, answerId: string) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: answerId }))
    }

    const onSubmit = () => {
        const result: ISubmitQuizReq = {
            totalTime: Math.ceil(
                Math.abs(
                    (countdown - Number(material.quiz?.timeLimit) * 60) / 60
                )
            ),
            quizId: material.quiz?.id as string,
            answers: Object.entries(selectedAnswers)
                .map(([key, value]) => ({ questionId: key, answerId: value as string }))
                .filter((result) => result.answerId !== null)
        }

        console.log(result)
    }

    return (
        <View style={{ flex: 1, marginTop: 12, minHeight: 500, paddingHorizontal: 16 }}>
            <Text style={{ color: currentTheme.theme['--primary-text'], fontSize: 16, fontWeight: 600, marginTop: 12 }}>{material.title}</Text>
            <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12, }}>{material.description}</Text>
            {
                isStart
                    ?
                    <View>
                        <Text style={{ color: currentTheme.theme['--brand-light'], fontSize: 14, marginTop: 12, fontWeight: 600, marginBottom: 16 }}>{convertTimeToCountdown()}</Text>

                        {
                            (material.quiz?.questions ?? []).map(question => (
                                <View key={question.id} style={{ marginBottom: 10 }}>
                                    <Text style={{ color: currentTheme.theme['--primary-text'], fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{question.questionTitle}</Text>
                                    {
                                        (question.answers ?? []).map((answer, i) => (
                                            <TouchableOpacity onPress={() => onSelect(question.id as string, answer.id as string)} key={i} style={{ marginBottom: 2, flex: 1, flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                                <FontAwesome name="circle" style={{ color: selectedAnswers[question?.id as any] !== answer.id ? currentTheme.theme['--quaternary-text'] : currentTheme.theme['--brand-light'] }}></FontAwesome>
                                                <Text style={{ color: currentTheme.theme['--primary-text'], fontSize: 12 }}>
                                                    {getAlphabetByIndex(i)}. {answer.answerContent}
                                                </Text>
                                            </TouchableOpacity>
                                        ))
                                    }

                                </View>
                            ))
                        }
                        <Button height={30} type='primary' onPress={onSubmit}>Submit Quiz</Button>
                    </View>
                    :
                    <View>
                        <Text style={{ color: currentTheme.theme['--primary-text'], fontSize: 16, fontWeight: 600, marginTop: 24 }}>Quiz Informations</Text>
                        <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12 }}>- Over {material.quiz?.passingPercentage}% to pass</Text>
                        <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12 }}>- Maximum {material.quiz?.timeLimit} minutes</Text>
                        <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12, marginBottom: 16 }}>- {material.quiz?.questions.length} questions</Text>

                        <Button height={30} type='primary' onPress={onStartQuiz}>Start Quiz</Button>
                    </View>
            }
        </View>

    )
}

const AssignmentComponent = ({ material }: { material: ILearningMaterial }) => {
    const { currentTheme } = useAppreanceStore();

    const [text, setText] = useState<string>('')
    const [countdown, setCountdown] = useState<number>(0);

    useEffect(() => {
        setCountdown(Number(material.assignment?.timeLimit) * 60);
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev === 0) {
                    clearInterval(interval)
                    return 0;
                }

                return prev - 1
            });
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    const convertTimeToCountdown = () => {
        const seconds = countdown % 60;

        return `${onAddZeroToTime(
            (countdown - seconds) / 60
        )}:${onAddZeroToTime(seconds)}`;
    }

    const onSubmit = () => {

    }

    const styles = StyleSheet.create({
        textArea: {
            height: 250,
            borderColor: '#ccc',
            borderWidth: 1,
            padding: 10,
            textAlignVertical: 'top',
            borderRadius: 8,
            fontSize: 12,
            marginBottom: 18,
            backgroundColor: currentTheme.theme['--secondary-bg'],
            color: currentTheme.theme['--primary-text']
        },
    });

    return (
        <View style={{ flex: 1, marginTop: 12, minHeight: 500, paddingHorizontal: 8 }}>
            <Text style={{ color: currentTheme.theme['--primary-text'], fontSize: 16, fontWeight: 600, marginVertical: 12 }}>{material.title}</Text>
            <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12, }}>{material.description}</Text>

            <Text style={{ color: currentTheme.theme['--brand-light'], fontSize: 14, marginTop: 12, fontWeight: 600, marginBottom: 16 }}>{convertTimeToCountdown()}</Text>

            <Text style={{ color: currentTheme.theme['--primary-text'], fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Question: "{material.assignment?.question}"</Text>
            <TextInput
                value={text}
                onChangeText={setText}
                multiline={true}
                numberOfLines={20}
                placeholder="Write something..."
                style={styles.textArea}
            />

            <Button height={30} type='primary' onPress={onSubmit}>Submit Assignment</Button>
        </View>
    )
}