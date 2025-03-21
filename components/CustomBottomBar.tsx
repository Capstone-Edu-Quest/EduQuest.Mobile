import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useTheme } from '@/services/hooks/useTheme';

type Props = {
    items: { name: string; icon: string; route: string }[];
};

const bottomBarItems = [
    { name: 'Explore', icon: 'search', route: '/Explore' },
    { name: 'Quests', icon: 'crosshairs', route: '/quests' },
    { name: 'Studying', icon: 'book', route: '/studying' },
    { name: 'Profile', icon: 'user', route: '/profile' },
]

const CustomBottomBar = () => {
    const { currentTheme } = useTheme();
    const router = useRouter();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            position: 'fixed',
            top: '90%',
            left: 0,
            right: 0,
            backgroundColor: currentTheme.theme['--secondary-bg'],
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            padding: 8,
            elevation: 5,
            width: '95%',
            alignSelf: 'center',
        },
        item: {
            alignItems: 'center',
        },
        text: {
            color: currentTheme.theme['--primary-text'],
            fontSize: 11,
            marginTop: 3,
        },
    });

    return (
        <View style={styles.container}>
            {bottomBarItems.length > 0 ? (
                bottomBarItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.item}
                        onPress={() => router.push(item.route as any)}
                    >
                        <FontAwesome name={item.icon} size={18} color={currentTheme.theme['--primary-text']} />
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.text}>No items available</Text>
            )}
        </View>
    );
};

export default CustomBottomBar;