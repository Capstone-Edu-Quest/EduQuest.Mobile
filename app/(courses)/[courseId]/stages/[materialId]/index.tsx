import { MaterialTypeEnum } from '@/Enum/courseEnum';
import { ICourse, ILearningMaterial, IMarkedAssignment, ISubmitAssignment, ISubmitQuizReq, ISubmittedQuestResponse } from '@/interfaces/courseInterfaces';
import { getMaterialById, getMyAssignment, markMaterialAsDone, onSubmitAssignment, onSubmitQuiz } from '@/services/apis/coursesApis';
import { useAppreanceStore } from '@/store/apprearanceStore';
import { useUserStore } from '@/store/userStore';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Video } from 'expo-av';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import Button from '@/components/Button';
import { getAlphabetByIndex, onAddZeroToTime } from '@/utils/string';
import { FontAwesome } from '@expo/vector-icons';
import { useCourseStore } from '@/store/courseStore';

type Props = {}

const getLessonIdByMaterialId = (courseDetails: ICourse, materialId: string) => {
    let lessonId = '';
    courseDetails.listLesson.forEach((l) => {
        const index = l.materials.findIndex(
            (m) => m.id === materialId
        );
        if (index !== -1) {
            lessonId = l.id;
        }
    });

    return lessonId;
}

const index = (props: Props) => {
    const { currentTheme } = useAppreanceStore();
    const { token } = useUserStore();
    const { courseId, materialId } = useLocalSearchParams();
    const { viewingCourse } = useCourseStore();

    const [material, setMaterial] = useState<ILearningMaterial | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false)

    useEffect(() => {
        setMaterial(null);
        setIsLoading(false);
        setIsDone(false);
        initMaterial();
    }, [materialId]);

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

    const triggerToNextMaterial = () => {
        if (!viewingCourse) return;

        let currentLessonIndex = 0;

        // Xác định lesson hiện tại dựa vào materialId
        viewingCourse.listLesson.forEach((lesson, lessonIndex) => {
            if (lesson.materials.some(m => m.id === materialId)) {
                currentLessonIndex = lesson.index;
            }
        });

        let nextLessonIndex = -1;
        let nextMaterialIndex = -1

        const currentLesson = viewingCourse.listLesson[currentLessonIndex];
        if (!currentLesson) return;

        const currentMaterialIndex = currentLesson.materials.findIndex(
            (m) => m.id === materialId
        );

        if (currentMaterialIndex === -1) return;

        // 👉 Trường hợp: đang ở cuối material của lesson hiện tại
        if (currentMaterialIndex === currentLesson.materials.length - 1) {
            const nextLesson = viewingCourse.listLesson[currentLessonIndex + 1];
            const nextMaterial = nextLesson?.materials[0];

            if (nextLesson && nextMaterial) {
                // 👉 Sang lesson mới: Có lesson tiếp theo, lấy material đầu tiên của lesson mới
                nextLessonIndex = nextLesson.index;
                nextMaterialIndex = 0
            } else {
                // 👉 Hết luôn: Không còn lesson nào nữa
                nextLessonIndex = -1;
                nextMaterialIndex = -1
                router.push(`/(courses)/${courseId}/stages`);
                Alert.alert('Congratulations', `You have completed ${viewingCourse.title}`)
                return;
            }
        } else {
            // 👉 Trường hợp: còn material tiếp theo trong lesson hiện tại
            nextLessonIndex = currentLesson.index;
            nextMaterialIndex = currentMaterialIndex + 1;
        }

        // console.log('Next lesson:', nextLessonIndex);
        // console.log('Next material:', nextMaterialIndex);

        const nextMaterialId = viewingCourse.listLesson[nextLessonIndex].materials[nextMaterialIndex].id
        router.push(`/(courses)/${courseId}/stages/${nextMaterialId}`);
    };


    const triggerIsDone = () => {
        setIsDone(true)
    }

    const getMaterialComponent = () => {
        if (material?.id !== materialId) return <View></View>
        switch (material?.type) {
            case MaterialTypeEnum.VIDEO:
                return <VideoComponent key={materialId} material={material} triggerToNextMaterial={triggerToNextMaterial} triggerIsDone={triggerIsDone} />;
            case MaterialTypeEnum.DOCUMENT:
                return <DocumentComponent key={materialId} material={material} triggerToNextMaterial={triggerToNextMaterial} triggerIsDone={triggerIsDone} />;
            case MaterialTypeEnum.QUIZ:
                return <QuizComponent key={materialId} material={material} triggerToNextMaterial={triggerToNextMaterial} triggerIsDone={triggerIsDone} />;
            case MaterialTypeEnum.ASSIGNMENT:
                return <AssignmentComponent key={materialId} material={material} triggerToNextMaterial={triggerToNextMaterial} triggerIsDone={triggerIsDone} />
            default:
                return <View></View>
        }
    }

    const onBack = () => {
        router.push(`/(courses)/${courseId}/stages`)
    }

    const styles = StyleSheet.create({
        backButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            margin: 12
        },
        backButtonText: {
            fontSize: 12,
            color: currentTheme.theme['--secondary-text'],
        }
    })

    return (
        <SafeAreaView key={materialId.toString()}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <FontAwesome name="angle-left" size={20} color={currentTheme.theme['--secondary-text']} />
                <Text style={styles.backButtonText}>Back to lessons</Text>
            </TouchableOpacity>
            {
                isLoading
                    ? <ActivityIndicator size="large" color={currentTheme.theme['--brand']} />
                    : material &&
                    <ScrollView>
                        {
                            getMaterialComponent()
                        }
                        {
                            isDone && (
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    maxHeight: 35,
                                    marginTop: 15
                                }}>
                                    <Button onPress={triggerToNextMaterial} type='primary'>Continue to next material</Button>
                                </View>
                            )
                        }
                    </ScrollView>
            }
        </SafeAreaView>
    )
}

export default index;

const VideoComponent = ({ material, triggerToNextMaterial, triggerIsDone }: { material: ILearningMaterial, triggerToNextMaterial: () => void, triggerIsDone: () => void }) => {
    const { currentTheme } = useAppreanceStore();
    const { viewingCourse } = useCourseStore();
    const { token } = useUserStore();

    const video = useRef(null);
    const triggerDoneRef = useRef<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const onTriggerPlayVideo = (status: any) => {
        if (status.isLoaded) {
            const progress = (status.positionMillis / 1000) / (Number(material.video?.duration) * 60);
            if (progress >= 0.8 && !triggerDoneRef.current) {
                const lessonId = getLessonIdByMaterialId(viewingCourse as ICourse, material.id as string);
                markMaterialAsDone(material.id as string, lessonId as string, token?.accessToken as string).then(res => {
                    triggerIsDone();
                }).catch(e => {
                    console.log(JSON.stringify(e))
                })
                triggerDoneRef.current = true;
            }
        } else {
            console.warn("⚠️ Video not loaded yet");
        }
    }

    return (
        <View style={{ flex: 1, marginTop: 12, minHeight: 250, paddingHorizontal: 8 }}>
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

const DocumentComponent = ({ material, triggerToNextMaterial, triggerIsDone }: { material: ILearningMaterial, triggerToNextMaterial: () => void, triggerIsDone: () => void }) => {
    const { currentTheme } = useAppreanceStore();
    const { token } = useUserStore();
    const { width } = useWindowDimensions();
    const { viewingCourse } = useCourseStore();

    const [countdown, setCountdown] = useState<number>(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev === 0) {
                    clearInterval(interval);
                    const lessonId = getLessonIdByMaterialId(viewingCourse as ICourse, material.id as string);
                    markMaterialAsDone(material.id as string, lessonId as string, token?.accessToken as string).then(res => {
                        triggerIsDone();
                    }).catch(e => {
                        console.log(JSON.stringify(e))
                    })
                    return 0;
                }

                return prev - 1
            });
        }, 1000);

        return () => clearInterval(interval)
    }, [])

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

const QuizComponent = ({ material, triggerToNextMaterial, triggerIsDone }: { material: ILearningMaterial, triggerToNextMaterial: () => void, triggerIsDone: () => void }) => {
    const { currentTheme } = useAppreanceStore();
    const { viewingCourse } = useCourseStore();
    const { token } = useUserStore();

    const [isStart, setIsStart] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0)
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({});

    const [result, setResult] = useState<ISubmittedQuestResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

        const lessonId = getLessonIdByMaterialId(viewingCourse as ICourse, material.id as string);

        setIsLoading(true)
        onSubmitQuiz(lessonId, token?.accessToken as string, result).then(res => {
            const { errors, isError, message, payload } = res.data;

            setResult(payload);
            if (payload.isPassed) {
                triggerIsDone();
            }
        }).finally(() => setIsLoading(false))
    }

    const onRetry = () => {
        setIsStart(false);
        setCountdown(0);
        setResult(null)
    }

    return (
        <View style={{ flex: 1, marginTop: 12, paddingHorizontal: 16 }}>
            <Text style={{ color: currentTheme.theme['--primary-text'], fontSize: 16, fontWeight: 600, marginTop: 12 }}>{material.title}</Text>
            <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12, }}>{material.description}</Text>
            {
                isLoading
                    ? <ActivityIndicator size="large" color={currentTheme.theme['--brand']} />
                    :
                    result
                        ?
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: currentTheme.theme['--primary-text'], marginTop: 18 }}>Your result:</Text>
                            <Text style={{ fontSize: 12, color: currentTheme.theme['--secondary-text'] }}>- Correct answers: {result.correctAnswers} ({result.percentage}%)</Text>
                            <Text style={{ fontSize: 12, color: currentTheme.theme['--secondary-text'] }}>- Total time: {Math.round(result.totalTime)}</Text>
                            <Text style={{ fontSize: 12, color: currentTheme.theme['--secondary-text'] }}>- Status: {result.isPassed ? 'Passed' : 'Failed'}</Text>

                            {!result.isPassed && <View style={{ flex: 1, marginTop: 12 }}><Button type="primary" onPress={onRetry}>Retry</Button></View>}
                        </View>
                        :
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

const AssignmentComponent = ({ material, triggerToNextMaterial, triggerIsDone }: { material: ILearningMaterial, triggerToNextMaterial: () => void, triggerIsDone: () => void }) => {
    const { currentTheme } = useAppreanceStore();
    const { viewingCourse } = useCourseStore();
    const { token } = useUserStore();

    const [text, setText] = useState<string>('')
    const [countdown, setCountdown] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [currentAssignment, setCurrentAssignment] = useState<IMarkedAssignment | null>(null)

    useEffect(() => {
        initAssignment();
    }, []);

    const initAssignment = () => {
        const lessonId = getLessonIdByMaterialId(viewingCourse as ICourse, material.id as string);

        setIsLoading(true);
        getMyAssignment(lessonId, material.assignment?.id as string, token?.accessToken as string).then(res => {
            const { errors, isError, message, payload } = res.data;


            if (payload) {
                setCurrentAssignment(payload);
                triggerIsDone();
            } else {
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
            }
        }).finally(() => setIsLoading(false))
    }

    const convertTimeToCountdown = () => {
        const seconds = countdown % 60;

        return `${onAddZeroToTime(
            (countdown - seconds) / 60
        )}:${onAddZeroToTime(seconds)}`;
    }

    const onSubmit = () => {
        const lessonId = getLessonIdByMaterialId(viewingCourse as ICourse, material.id as string);
        setIsLoading(true)
        const result: ISubmitAssignment = {
            assignmentId: material.assignment?.id as string,
            totalTime: Math.ceil(
                Math.abs(
                    (countdown -
                        (material.assignment?.timeLimit ?? 0) * 60) /
                    60
                )
            ),
            answerContent: text,
        };

        onSubmitAssignment(lessonId, token?.accessToken as string, result).then(res => {
            const { errors, isError, message, payload } = res.data;

            setCurrentAssignment(payload);
            triggerIsDone();
        }).finally(() => setIsLoading(false))

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
        <View style={{ flex: 1, marginVertical: 12, paddingHorizontal: 8 }}>

            {
                isLoading
                    ? <ActivityIndicator size="large" color={currentTheme.theme['--brand']} />
                    :
                    !currentAssignment ?
                        <View>

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
                        :
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: 600, color: currentTheme.theme['--primary-text'] }}>Your Assignment:</Text>
                            <Text style={{ fontSize: 12, color: currentTheme.theme['--secondary-text'] }}>- Total: {Math.round(currentAssignment.toTalTime)} minutes</Text>
                            <Text style={{ fontSize: 12, color: currentTheme.theme['--secondary-text'] }}>- Score: {currentAssignment.answerScore === -1 ? "Unmark" : currentAssignment.answerScore}</Text>
                        </View>
            }
        </View>
    )
}