import { Stack, Tabs } from 'expo-router';
import React from 'react'

type Props = {}

const CourseLayout = (props: Props) => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="[courseId]/index" options={{ title: "Details" }} />
            <Stack.Screen name="[courseId]/stages" options={{ title: "Stage Details" }} />
            <Stack.Screen name="[courseId]/stages/[materialId]/index" options={{ title: "Material Details" }} />
        </Stack>
    );
}

export default CourseLayout