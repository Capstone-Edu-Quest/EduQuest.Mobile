import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/services/hooks/useTheme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from './Button';
import { router } from 'expo-router';

type Props = {
    isPurchased?: boolean;
    isInCart?: boolean;
}

const CourseItemHorizontal = ({ isPurchased = false, isInCart = false }: Props) => {
    const { currentTheme } = useTheme();

    const styles = StyleSheet.create({
        recommendedCoursesItem: {
            width: '100%',
            flexDirection: 'row',
            borderRadius: 10,
            marginRight: 8,
            overflow: 'hidden',
            backgroundColor: currentTheme.theme['--secondary-bg']
        },
        recommendedCoursesItemImage: {
            width: 120,
            height: '100%',
            borderRadius: 8,
        },
        recommendedCoursesItemInfo: {
            flex: 1,
            paddingHorizontal: 8,
            paddingBottom: 8
        },
        recommendedCoursesItemTitle: {
            fontSize: 11,
            fontWeight: 'bold',
            color: currentTheme.theme['--primary-text'],
            marginTop: 8,
        },
        recommendedCoursesItemAuthor: {
            fontSize: 9,
            color: currentTheme.theme['--secondary-text'],
            marginTop: 2,
        },
        recommendedCoursesItemRating: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            gap: 3
        },
        recommendedCoursesItemRatingText: {
            fontSize: 11,
            color: currentTheme.theme['--brand-light'],
            fontWeight: 'bold',
            marginRight: 4
        },
        numberOfRatings: {
            fontSize: 10,
            color: currentTheme.theme['--secondary-text'],
            marginLeft: 4
        },
        recommendedCoursesItemPrice: {
            fontSize: 11,
            color: currentTheme.theme['--brand'],
            fontWeight: 'bold',
            marginTop: 8,
        },
        recommendedCoursesItemActions: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            gap: 8,
        },
        progressBar: {
            height: 13,
            backgroundColor: currentTheme.theme['--tertiary-bg'],
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 12,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 5,
        },
        progressFill: {
            height: '100%',
            backgroundColor: currentTheme.theme['--brand'],
            position: 'absolute',
            left: 0,
            top: 0,
        },
        progressText: {
            top: 0,
            fontSize: 9,
            color: currentTheme.theme['--primary-text'],
            zIndex: 999,
        }
    });

    const onViewCourseDetails = () => {
        router.push('/(courses)/123');
    }

    const currentStar = 3.5;
    const progressPercentage = 20; // Example progress percentage
    return (
        <TouchableOpacity style={styles.recommendedCoursesItem} onPress={onViewCourseDetails}>
            <Image source={require('@/assets/images/demo-course-thumb.webp')} style={styles.recommendedCoursesItemImage} />
            <View style={styles.recommendedCoursesItemInfo}>
                <Text style={styles.recommendedCoursesItemTitle} numberOfLines={2} ellipsizeMode="tail">Course Name Course Name Course Name Course Name Course Name</Text>
                <Text style={styles.recommendedCoursesItemAuthor}>Author Name</Text>
                <View style={styles.recommendedCoursesItemRating}>
                    <Text style={styles.recommendedCoursesItemRatingText}>{currentStar}</Text>
                    {
                        Array.from({ length: 5 }).map((_, index) => (
                            <FontAwesome key={index} name="star" size={12} color={Math.floor(currentStar) > index ? currentTheme.theme['--brand-light'] : currentTheme.theme['--quaternary-text']} />
                        ))
                    }
                    <Text style={styles.numberOfRatings}>({(11432).toLocaleString()})</Text>
                </View>

                {isPurchased ? (
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
                        <Text style={styles.progressText}>{progressPercentage}%</Text>
                    </View>
                ) : (
                    <Text style={styles.recommendedCoursesItemPrice}>$99</Text>
                )}
                <View style={styles.recommendedCoursesItemActions}>
                    {!isPurchased && (
                        <>
                            <Button onPress={() => { }} type="primary">{isInCart ? 'Remove from cart' : 'Add to cart'}</Button>
                            <FontAwesome name="heart" size={15} color={currentTheme.theme['--brand-light']} />
                        </>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CourseItemHorizontal