import React, { useEffect, useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { router } from 'expo-router';

type Props = {}

const index = (props: Props) => {
    useLayoutEffect(() => {
        setTimeout(() => {
            router.replace('/(tabs)');
        }, 0);
    }, []);

    return (
        <View>
            <Text>course screen</Text>
        </View>
    )
}

export default index