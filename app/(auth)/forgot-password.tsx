import Button from '@/components/Button';
import Input from '@/components/Input';
import { Opt } from '@/components/OTP';
import { useTheme } from '@/services/hooks/useTheme';
import { validateEmail } from '@/utils/string';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Image, Pressable, Alert } from 'react-native'

type Props = {}

const logo = require('@/assets/images/icon.png');
const ForgotPasswordScreen = (props: Props) => {
    const { currentTheme } = useTheme();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

    const [step, setStep] = useState<number>(1);

    useFocusEffect(
        useCallback(() => {
            setStep(1);
            setEmail('');
            setOtp(Array(6).fill(""));
        }, [])
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: currentTheme.theme['--primary-bg'],
            paddingBottom: '50%',
        },
        logo: {
            height: 120,
            width: 100,
            marginBottom: 5
        },
        text: {
            color: currentTheme.theme['--brand'],
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 18
        },
        welcomeBack: {
            color: currentTheme.theme['--primary-text'],
            fontSize: 16,
            marginBottom: 2,
            fontWeight: 'bold'
        },
        signInToContinue: {
            color: currentTheme.theme['--secondary-text'],
            fontSize: 14,
            marginBottom: 12
        },
        inputContainer: {
            width: '100%',
            paddingHorizontal: 30,
            marginBottom: 20
        },
        inputLabel: {
            color: currentTheme.theme['--primary-text'],
            fontSize: 14,
            marginBottom: 5,
            fontWeight: 'bold'
        },
        sentEmail: {
            color: currentTheme.theme['--primary-text'],
            fontSize: 12,
            marginBottom: 8,
            marginTop: 10
        },
    });

    const onBackToSignin = () => {
        router.push('/');
    }

    const onContinue = () => {
        if (step === 1) {
            if (!validateEmail(email)) {
                Alert.alert('Invalid email', 'Please enter a valid email address');
                return;
            }
            setStep(step + 1);
        }
    }

    const onGoBack = () => {
        setStep(step - 1);
    }

    const onResendOtp = () => {
        console.log('resend otp');
        Alert.alert(`Opt resent to ${email}`);
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Edu Quest</Text>
            <Text style={styles.welcomeBack}>Reset password</Text>
            <Text style={styles.signInToContinue}>Please enter your email to continue</Text>

            <View style={styles.inputContainer}>
                {
                    step === 1 ?
                        <View>
                            <Text style={styles.inputLabel}>Email</Text>
                            <Input placeholder="eduquest@gmail.com" value={email} onChangeText={setEmail} margin={0} />
                            <Pressable style={{ alignSelf: 'flex-end', marginTop: 5 }} onPress={onBackToSignin}>
                                <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12 }}>Back to sign in</Text>
                            </Pressable>
                        </View>
                        :
                        <View>
                            <Text style={styles.sentEmail}>We have sent OTP to {email}</Text>
                            <Opt
                                setOtp={setOtp}
                                otp={otp}
                                resendOtp={onResendOtp}
                            />
                        </View>
                }

            </View>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, width: '100%', paddingHorizontal: 30 }}>
                <Button height={35} fontSize={13} onPress={onContinue} type="primary">Continue</Button>
            </View>
            {step > 1 && <Pressable style={{ alignSelf: 'flex-end', marginTop: 5, marginRight: 30 }} onPress={onGoBack}>
                <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12 }}>Go back</Text>
            </Pressable>}
        </View>
    )
}

export default ForgotPasswordScreen


import { StyleSheet } from 'react-native';
