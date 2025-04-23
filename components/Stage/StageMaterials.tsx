import React from 'react'
import { StyleSheet, View } from 'react-native'
import StageItem from './Material'

type Props = {}

const StagesCtn = (props: Props) => {
    const currentStage = 3;
    const curveItems = 4;
    const styles = StyleSheet.create({
        stagesCtn: {
            flex: 1,
            flexDirection: 'column',
            gap: 0,
            marginTop: 18,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })

    const calculateStageItemPosition = (index: number) => {
        // x % 4 === 0 -> middle
        // x % 4 !== 0
        // 1. Round up to the nearest [Y] % 4 === 0
        // 2. [Y] / 4 % 2 === 0 -> Right
        // 3. [Y] / 4 % 2 !== 0 -> Left

        // Lower mock = x - x % 4
        // Higher mock = x + (4 - x % 4)

        const percentagePerIndexFromCenter = 100;

        // Middle
        if (index % curveItems === 0) {
            return 0
        }

        // Example 4, index 1 2 3 -> on the right, 5 6 7 -> on the left
        const greaterNearestMiddle = (index + curveItems - (index % curveItems));
        const greaterNearestMiddleIndex = greaterNearestMiddle / curveItems;

        const lowestDifferenceMiddle = Math.min(index - (index - (index % curveItems)), greaterNearestMiddle - index);
        const distanceFromMiddle = Math.min((1 + lowestDifferenceMiddle / curveItems), lowestDifferenceMiddle) * percentagePerIndexFromCenter * 1.1;

        // Right
        if (greaterNearestMiddleIndex % 2) {
            return `${distanceFromMiddle}%`;
        }

        // Left
        return `${-distanceFromMiddle}%`;
    }

    const calculateStageItemMargin = (index: number) => {
        const marginVertical = 8;

        if (index % curveItems === 0) {
            return 0
        }

        const greaterNearestMiddle = (index + curveItems - (index % curveItems));
        const lowestDifferenceMiddle = Math.min(index - (index - (index % curveItems)), greaterNearestMiddle - index);

        return lowestDifferenceMiddle * marginVertical * 1.1;
    }

    return (
        <View style={styles.stagesCtn}>
            {
                [...Array(10)].map((_, index) => (
                    <View key={index} style={{ transform: [{ translateX: calculateStageItemPosition(index) as any }], marginVertical: calculateStageItemMargin(index) }}>
                        <StageItem status={index === currentStage ? 'current' : index < currentStage ? 'done' : 'locked'} />
                    </View>
                ))
            }
        </View>
    )
}

export default StagesCtn