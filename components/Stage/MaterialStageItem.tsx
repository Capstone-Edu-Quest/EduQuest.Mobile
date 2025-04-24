import { useModal } from '@/services/hooks/useModal'
import { useTheme } from '@/services/hooks/useTheme'
import { FontAwesome } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import StageInfoModal from './MaterialInfo'
import { MissionStatus } from '@/Enum/courseEnum'
import {  IMaterialOverview } from '@/interfaces/courseInterfaces'
import { router } from 'expo-router'

type Props = {
    courseId: string;
    material: IMaterialOverview
}

const StageItem = ({ courseId, material}: Props) => {
    const { currentTheme } = useTheme();
    const { showBottomModal } = useModal();

    const styles = StyleSheet.create({
        stageItem: {
            position: 'relative',
            // @ts-ignore
            backgroundColor: currentTheme.theme[`--stage-body-${material.status.toLowerCase()}`],
            height: 65,
            width: 65,
            borderRadius: '50%'
        },
        stageItemSurface: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
            // @ts-ignore
            backgroundColor: currentTheme.theme[`--stage-surface-${material.status.toLowerCase()}`],
            borderRadius: '50%',
            height: '80%',
            width: '80%',
            shadowColor: currentTheme.theme['--stage-shadow'],
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 5,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        stageItemIcon: {
            // position: 'absolute',
            // top: '50%',
            // left: '50%',
            // transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
        }
    })

    const getStageItemIcon = () => {
        switch (material.status) {
            case MissionStatus.CURRENT:
                return 'star';
            case MissionStatus.DONE:
                return 'check';
            case MissionStatus.LOCKED:
            default:
                return 'lock'
        }
    }

    const getStageItemIconColor = () => {
        switch (material.status) {
            case MissionStatus.CURRENT:
            case MissionStatus.DONE:
                return currentTheme.theme['--primary-text'];
            case MissionStatus.LOCKED:
            default:
                return currentTheme.theme['--alert']
        }
    }

    const handleShowStageInfoModal = () => {
        showBottomModal(
            <StageInfoModal material={material} />
        )
    }

    const handleViewMaterialInfo = () => {
        router.push(`/(courses)/${courseId}/stages/${material.id}`)
    }

    const handlePressAction = () => {
        switch (material.status) {
            case MissionStatus.CURRENT:
            case MissionStatus.DONE:
                handleViewMaterialInfo();
                break;
            case MissionStatus.LOCKED:
            default:
                handleShowStageInfoModal();
        }
    }


    return (
        <TouchableOpacity style={styles.stageItem} onPress={handlePressAction} onLongPress={handleShowStageInfoModal}>
            <View style={styles.stageItemSurface}>
                <FontAwesome style={styles.stageItemIcon} name={getStageItemIcon()} size={20} color={getStageItemIconColor()} />
            </View>
        </TouchableOpacity>
    )
}

export default StageItem