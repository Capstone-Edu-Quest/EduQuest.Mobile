import Button from '@/components/Button';
import { useLocales } from '@/services/hooks/useLocales';
import { useTheme } from '@/services/hooks/useTheme';
import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'

type Props = {}

const SigninScreen = (props: Props) => {
    const { currentTheme } = useTheme();
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
            marginBottom: 30
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
       
    });

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Edu Quest</Text>
            <Text style={styles.welcomeBack}>Welcome back</Text>
            <Text style={styles.signInToContinue}>Please sign in to continue</Text>

            <Button type="signin" icon="google">Sign in with Google</Button>
        </View>
    )
}

export default SigninScreen


import { StyleSheet } from 'react-native';

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
