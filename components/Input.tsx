import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@/services/hooks/useTheme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type InputProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    iconName?: string;
    onBlur?: () => void;
    margin?: number;
    secureTextEntry?: boolean;
}

const Input = ({ placeholder, value, onChangeText, iconName, onBlur = () => { }, margin = 10, secureTextEntry = false }: InputProps) => {
    const { currentTheme } = useTheme();

    const styles = StyleSheet.create({
        inputContainer: {
            width: '100%',
            marginVertical: margin,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: currentTheme.theme['--quaternary-text'],
            borderWidth: 1,
            borderRadius: 12,
            backgroundColor: currentTheme.theme['--primary-bg'],
        },
        input: {
            flex: 1,
            height: 36,
            paddingHorizontal: 8,
            color: currentTheme.theme['--primary-text'],
            fontSize: 12,
        },
        icon: {
            marginRight: 10,
        }
    });

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={currentTheme.theme['--secondary-text']}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
            />
            {iconName && <FontAwesome name={iconName} size={14} color={currentTheme.theme['--secondary-text']} style={styles.icon} />}
        </View>
    );
};

export default Input;
