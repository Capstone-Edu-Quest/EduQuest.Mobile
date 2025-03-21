import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRouter, useSegments } from 'expo-router';
import { useTheme } from '@/services/hooks/useTheme';

type Props = {
    items: { name: string; icon: string; route: string }[];
};

const bottomBarItems = [
    { name: 'Home', icon: 'home', route: '/(tabs)' },
    { name: 'Explore', icon: 'search', route: '/(tabs)/explore' },
    { name: 'Quests', icon: 'crosshairs', route: '/(tabs)/quests' },
    { name: 'Studying', icon: 'book', route: '/(tabs)/studying' },
    { name: 'Profile', icon: 'user', route: '/(tabs)/profile' },
]

const CustomBottomBar = () => {
    const { currentTheme } = useTheme();
    const router = useRouter();
    const segments = useSegments();

    const [pathname, setPathname] = useState(segments.join('/'));

    useEffect(() => {
        setPathname(`/${segments.join('/')}`); // Update when segments change
    }, [segments]);

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 999,
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: [{ translateX: '-50%' }],
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
                        <FontAwesome
                            name={item.icon}
                            size={18}
                            color={pathname === item.route ? currentTheme.theme['--brand'] : currentTheme.theme['--primary-text']}
                        />
                        <Text style={{ ...styles.text, color: pathname === item.route ? currentTheme.theme['--brand'] : currentTheme.theme['--primary-text'] }}>{item.name}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.text}>No items available</Text>
            )}
        </View>
    );
};

export default CustomBottomBar;