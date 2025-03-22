import React, { ReactNode } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { useTheme } from '@/services/hooks/useTheme';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    children?: ReactNode,
    icon?: string,
    type?: buttonType,
    onPress?: () => void,
    height?: number,
    fontSize?: number
}

type buttonType = 'primary' | 'secondary' | 'signin' | 'danger'

const Button = ({ children, icon, onPress = () => { }, type = 'secondary', height = 25, fontSize = 11 }: Props) => {
    const { currentTheme } = useTheme();

    const stylesList = {
        primary: StyleSheet.create({
            btn: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                backgroundColor: currentTheme.theme['--brand-01'],
                borderColor: currentTheme.theme['--brand-05'],
                borderWidth: 1,
                borderRadius: 8,
                padding: 5,
                height: height,
            },
            btnText: {
                color: currentTheme.theme['--brand'],
                fontSize: fontSize,
            }
        }),
        secondary: StyleSheet.create({
            btn: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
            },
            btnText: {
                color: currentTheme.theme['--brand'],
                fontSize: 12,
            }
        }),
        signin: StyleSheet.create({
            btn: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                maxHeight: 40,
                width: '80%',
                backgroundColor: 'transparent',
                borderColor: currentTheme.theme['--tertiary-text'],
                borderWidth: 1,
                borderRadius: 50,
                padding: 10,
                marginBottom: 20
            },
            btnText: {
                color: currentTheme.theme['--primary-text'],
                fontSize: 14,
            }
        }),
        danger: StyleSheet.create({
            btn: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                backgroundColor: 'transparent',
                borderColor: currentTheme.theme['--alert'],
                borderWidth: 1,
                borderRadius: 8,
                padding: 5,
            },
            btnText: {
                color: currentTheme.theme['--alert'],
                fontSize: 12,
            }
        })
    }

    const getIconColor = () => {
        switch (type) {
            case 'primary':
                return currentTheme.theme['--brand'];
            case 'danger':
                return currentTheme.theme['--alert'];
            default:
                return currentTheme.theme['--primary-text'];
        }
    }
    const getButtonStyle = (key: string) => {
        switch (type) {
            case 'primary':
                return stylesList.primary[key as keyof typeof stylesList.primary];
            case 'secondary':
                return stylesList.secondary[key as keyof typeof stylesList.secondary];
            case 'signin':
                return stylesList.signin[key as keyof typeof stylesList.signin];
            case 'danger':
                return stylesList.danger[key as keyof typeof stylesList.danger];
            default:
                return {}
        }
    }
    return (
        <Pressable style={getButtonStyle('btn')} onPress={onPress}>
            {icon && <Icon name={icon} size={16} color={getIconColor()} />}
            <Text style={getButtonStyle('btnText')}>{children}</Text>
        </Pressable>
    )
}

export default Button