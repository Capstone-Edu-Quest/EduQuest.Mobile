import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useTheme } from '@/services/hooks/useTheme';

type Props = {};

const CustomHeaderBar = (props: Props) => {
    const { currentTheme } = useTheme();
    const router = useRouter();

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 18,
            paddingRight: 18,
            backgroundColor: currentTheme.theme['--primary-bg'],
            shadowColor: currentTheme.theme['--quaternary-bg'],
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 5,
            paddingBottom: 12
        },
        logoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        logo: {
            width: 30,
            height: 32,
            marginRight: 8,
        },
        text: {
            color: currentTheme.theme['--brand'],
            fontSize: 16,
            fontWeight: 'bold',
        },
        iconContainer: {
            flexDirection: 'row',
        },
        icon: {
            marginLeft: 15,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
                <Text style={styles.text}>Edu Quest</Text>
            </View>
            <View style={styles.iconContainer}>
                {/* <TouchableOpacity
                    style={styles.icon}
                    onPress={() => { }}
                >
                    <FontAwesome name="heart-o" size={16} color={currentTheme.theme['--primary-text']} onPress={() => router.push('/(tabs)/wishlist')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.icon, transform: [{ translateY: -1 }] }}
                    onPress={() => { }}
                >
                    <FontAwesome name="shopping-cart" size={16} color={currentTheme.theme['--primary-text']} onPress={() => router.push('/(tabs)/cart')}  />
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

export default CustomHeaderBar;