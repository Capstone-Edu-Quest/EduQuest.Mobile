import Button from '@/components/Button';
import Input from '@/components/Input';
import { useTheme } from '@/services/hooks/useTheme';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, Pressable, Alert, ActivityIndicator } from 'react-native'
import { router } from 'expo-router';

type Props = {}

const SigninScreen = (props: Props) => {
    const { currentTheme } = useTheme();
    const { user, setUser, setToken } = useUserStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setTimeout(() => {
            if (user) {
                router.replace('/(tabs)/studying')
            }
        }, 0)
    }, [user])

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const logo = require('@/assets/images/icon.png');

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
    });

    const onForgotPassword = () => {
        router.push('/forgot-password');
    }

    const handleSignin = () => {
        if (!validateEmail(email)) {
            Alert.alert('Invalid email', 'Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        onSignIn(email, password).then(res => {
            const { errors, isError, message, payload } = res.data;

            if (isError) {
                switch (message.content) {
                    case "WRONG_PASSWORD":
                    case "EMAIL_NOT_FOUND":
                    default:
                        Alert.alert('Failed to signin', 'Invalid email or password, please try again');
                }
                return;
            }

            if (Number(payload?.userData?.roleId) !== WebRole.LEARNER) {
                Alert.alert('Only learner allow to sign in');
                return;
            }
            
            setToken(payload?.token)
            setUser(payload.userData);
        }).finally(() => setIsLoading(false))

    }


    return (
        <View style={styles.container}>

            {isLoading && <ActivityIndicator size="large" color={currentTheme.theme['--brand']} />}

            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Edu Quest</Text>
            <Text style={styles.welcomeBack}>Welcome back</Text>
            <Text style={styles.signInToContinue}>Please sign in to continue</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <Input placeholder="eduquest@gmail.com" value={email} onChangeText={setEmail} margin={0} />

                <Text style={{ ...styles.inputLabel, marginTop: 20 }}>Password</Text>
                <Input placeholder="********" value={password} onChangeText={setPassword} margin={0} secureTextEntry={true} />

                <Pressable style={{ alignSelf: 'flex-end', marginTop: 5 }} onPress={onForgotPassword}>
                    <Text style={{ color: currentTheme.theme['--secondary-text'], fontSize: 12 }}>Forgot password?</Text>
                </Pressable>

            </View>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, width: '100%', paddingHorizontal: 30 }}>

                <Button height={35} fontSize={13} onPress={handleSignin} type="primary">Sign in</Button>
            </View>
        </View>
    )
}

export default SigninScreen


import { StyleSheet } from 'react-native';
import { validateEmail } from '@/utils/string';
import { onSignIn } from '@/services/apis/authApis';
import { DarkTheme } from '@react-navigation/native';
import { useUserStore } from '@/store/userStore';
import { WebRole } from '@/Enum/userEnum';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
// });
