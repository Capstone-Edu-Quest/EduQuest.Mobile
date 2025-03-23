import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text } from 'react-native';
import { Animated } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { useTheme } from '@/services/hooks/useTheme';
import { useBottomModalStore } from '@/store/bottomModalStore';
import { useModal } from '@/services/hooks/useModal';

type Props = {}

const BottomModal = (props: Props) => {
    const { modalContent, setModalContent } = useBottomModalStore();
    const { hideBottomModal } = useModal();

    const { currentTheme } = useTheme();
    const { height } = Dimensions.get('window');

    const [isVisible, setIsVisible] = useState(!!modalContent);
    const translateY = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        setIsVisible(!!modalContent);
    }, [modalContent]);

    const styles = StyleSheet.create({
        modal: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 300,
            backgroundColor: currentTheme.theme['--tertiary-bg'],
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            transform: [{ translateY }],
        }
    });

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: isVisible ? 0 : height,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);
    return (
        <Modal transparent visible={isVisible} animationType="fade">
            <TouchableOpacity
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
                activeOpacity={1}
                onPress={hideBottomModal}
            />

            <Animated.View style={styles.modal}>
                {modalContent}
            </Animated.View>
        </Modal>
    )
}

export default BottomModal