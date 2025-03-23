import { useModal } from '@/services/hooks/useModal'
import { useTheme } from '@/services/hooks/useTheme'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import StageInfoModal from './MaterialInfo'

type Props = {
    status?: 'current' | 'locked' | 'done'
}

const StageItem = ({ status = 'locked' }: Props) => {
    const { currentTheme } = useTheme();
    const { showBottomModal } = useModal();

    const styles = StyleSheet.create({
        stageItem: {
            position: 'relative',
            backgroundColor: currentTheme.theme[`--stage-body-${status}`],
            height: 65,
            width: 65,
            borderRadius: '50%'
        },
        stageItemSurface: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
            backgroundColor: currentTheme.theme[`--stage-surface-${status}`],
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
        switch (status) {
            case 'current':
                return 'star';
            case 'done':
                return 'check';
            case 'locked':
            default:
                return 'lock'
        }
    }

    const getStageItemIconColor = () => {
        switch (status) {
            case 'current':
            case 'done':
                return currentTheme.theme['--primary-text'];
            case 'locked':
            default:
                return currentTheme.theme['--alert']
        }
    }

    const handleShowStageInfoModal = () => {
        showBottomModal(
            <StageInfoModal />
        )
    }

    const handleViewMaterialInfo = () => {

    }

    const handlePressAction = () => {
        switch (status) {
            case 'current':
            case 'done':
                handleViewMaterialInfo();
                break;
            case 'locked':
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