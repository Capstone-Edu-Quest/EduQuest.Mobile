import React from 'react';
import { ScrollView, Text, StyleSheet, View, Switch } from 'react-native';
import { useTheme } from '@/services/hooks/useTheme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '@/components/Button';

type Props = {}

const ProfileScreen = (props: Props) => {
    const { currentTheme, toggleTheme } = useTheme();

    const statistics = [
        { icon: 'trophy', label: 'Rank', value: '#1' },
        { icon: 'fire', label: 'Highest Learning Streak', value: '22 days' },
        { icon: 'hourglass', label: 'Total Learning Time', value: '232 minutes' },
        { icon: 'book', label: 'Total Courses Completed', value: '12' },
        { icon: 'star', label: 'Favorite Topics', value: 'Typescript' },
    ];

    const personalInfo = [
        { icon: 'envelope', label: 'Email', value: 'khang@example.com' },
        { icon: 'phone', label: 'Phone', value: '+1234567890' }
    ];

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            flex: 1,
            paddingTop: 50,
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

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Gia Khang</Text>

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
                <Button type="danger" onPress={() => { }}>
                    Sign Out
                </Button>
            </View>

        </ScrollView>
    );
}

export default ProfileScreen;