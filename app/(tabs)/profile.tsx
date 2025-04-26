import React from 'react';
import { ScrollView, Text, StyleSheet, View, Switch, Platform } from 'react-native';
import { useTheme } from '@/services/hooks/useTheme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '@/components/Button';
import { router } from 'expo-router';
import { useUserStore } from '@/store/userStore';

type Props = {}

const ProfileScreen = (props: Props) => {
    const { user, setUser, setToken } = useUserStore();
    const { currentTheme, toggleTheme } = useTheme();

    const statistics = [
        { icon: 'trophy', label: 'Rank', value: user?.statistic?.rank },
        { icon: 'fire', label: 'Highest Learning Streak', value: `${user?.statistic?.longestStreak} days` },
        { icon: 'circle', label: 'Gold', value: `${user?.statistic?.gold ?? 0} golds` },
        { icon: 'spinner', label: 'Level', value: `${user?.statistic?.level ?? 0} (${user?.statistic?.exp ?? 0}/${user?.statistic?.maxExpLevel ?? 0})` },
        // { icon: 'star', label: 'Favorite Topics', value: 'Typescript' },
    ];

    const personalInfo = [
        { icon: 'envelope', label: 'Email', value: user?.email },
        { icon: 'phone', label: 'Phone', value: user?.phone }
    ];

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            flex: 1,
            paddingTop: 50 + (Platform.OS === 'android' ? 24 : 0),
            boxSizing: 'border-box',
            backgroundColor: currentTheme.theme['--primary-bg'],
        },
        title: {
            color: currentTheme.theme['--brand'],
            fontSize: 16,
            fontWeight: 'bold',
        },
        section: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            paddingHorizontal: 10,
        },
        sectionTitle: {
            marginTop: 4,
            color: currentTheme.theme['--primary-text'],
            fontSize: 14,
            fontWeight: 'bold',
        },
        sectionContent: {
            color: currentTheme.theme['--secondary-text'],
            fontSize: 13,
            marginLeft: 6
        },
        sectionInfo: {
            color: currentTheme.theme['--primary-text'],
            fontSize: 13,
            marginLeft: 6
        },
        sectionLine: {
            borderBottomColor: currentTheme.theme['--quaternary-text'],
            borderBottomWidth: 1,
            marginVertical: 5,
        },
        infoCtn: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        infoTextLabelWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });

    const onSignOut = () => {
        setUser(null)
        setToken(null)
        router.replace("/(auth)");
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{user?.username}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <FontAwesome name="pencil" size={12} color={currentTheme.theme['--secondary-text']} />
            </View>
            <View style={styles.sectionLine} />
            {personalInfo.map((stat, index) => (
                <View key={index} style={[styles.infoCtn, { marginBottom: 3 }]}>
                    <View style={styles.infoTextLabelWrapper}>
                        <FontAwesome name={stat.icon} size={12} color={currentTheme.theme['--secondary-text']} />
                        <Text style={[styles.sectionContent]}>{stat.label}</Text>
                    </View>
                    <Text style={styles.sectionInfo}>{stat.value}</Text>
                </View>
            ))}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Statistics</Text>
                <FontAwesome name="pencil" size={12} color={currentTheme.theme['--secondary-text']} />
            </View>
            <View style={styles.sectionLine} />
            {/*  */}
            {statistics.map((stat, index) => (
                <View key={index} style={[styles.infoCtn, { marginBottom: 4 }]}>
                    <View style={styles.infoTextLabelWrapper}>
                        <FontAwesome name={stat.icon} size={12} color={currentTheme.theme['--secondary-text']} />
                        <Text style={[styles.sectionContent]}>{stat.label}</Text>
                    </View>
                    <Text style={styles.sectionInfo}>{stat.value}</Text>
                </View>
            ))}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Theme</Text>
                <View style={{ ...styles.infoCtn, paddingRight: 0 }}>
                    <Switch
                        value={currentTheme.name === 'light'}
                        onValueChange={toggleTheme}
                        thumbColor={currentTheme.theme['--primary-text']}
                        style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }], marginRight: 0 }}
                        trackColor={{ false: currentTheme.theme['--secondary-text'], true: currentTheme.theme['--brand-light'] }}
                    />
                </View>
            </View>
            <View style={styles.sectionLine} />

            <View style={{ marginTop: 40 }}>
                <Button type="danger" onPress={onSignOut}>
                    Sign Out
                </Button>
            </View>

        </ScrollView>
    );
}

export default ProfileScreen;