import CustomBottomBar from '@/components/CustomBottomBar';
import CustomHeaderBar from '@/components/CustomHeaderBar';
import { Stack, Tabs } from 'expo-router';
import React from 'react'
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {}

const CourseLayout = (props: Props) => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="[courseId]/index" options={{ title: "Details" }} />
            <Stack.Screen name="[courseId]/[stageId]" options={{ title: "Stage Details" }} />
        </Stack>
    );
}

export default CourseLayout