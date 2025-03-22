import CustomBottomBar from '@/components/CustomBottomBar';
import CustomHeaderBar from '@/components/CustomHeaderBar';
import { Tabs } from 'expo-router';
import React from 'react'
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {}

const CourseLayout = (props: Props) => {
    return (
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>
            <View style={{ flex: 1 }}>
                {/* <CustomHeaderBar /> */}

                <View style={{ flex: 1, padding: 10 }}>
                    <Tabs
                        screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
                    >
                        <Tabs.Screen
                            name="index"
                            options={{
                                title: 'Home',
                            }}
                        />
                        <Tabs.Screen
                            name="[courseId]"
                            options={{
                                title: 'Details',
                            }}
                        />
                    </Tabs>
                </View>

                {/* <CustomBottomBar /> */}
            </View>
        </SafeAreaView>
    );
}

export default CourseLayout