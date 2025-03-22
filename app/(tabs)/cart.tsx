import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/services/hooks/useTheme';
import CourseItemHorizontal from '@/components/CourseItemHorizontal';
import Input from '@/components/Input';
import Button from '@/components/Button';

type Props = {}

const CartScreen = (props: Props) => {
    const { currentTheme } = useTheme();

    const [couponCode, setCouponCode] = useState<string>('');

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
        sectionLine: {
            borderBottomColor: currentTheme.theme['--quaternary-text'],
            borderBottomWidth: 1,
            marginVertical: 15,
        },
        priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
        priceLeft: { color: currentTheme.theme['--primary-text'], fontSize: 13 },
        priceRight: { color: currentTheme.theme['--primary-text'], fontSize: 13 },
    });

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Cart</Text>
            <View style={{ gap: 8, marginTop: 10 }}>
                <CourseItemHorizontal isInCart={true} />
                <CourseItemHorizontal isInCart={true} />
                <CourseItemHorizontal isInCart={true} />
                <CourseItemHorizontal isInCart={true} />
            </View>

            <View style={styles.sectionLine} />

            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 15 }}>
                <View style={{ width: '80%' }}>
                    <Input placeholder="Coupon code" value={couponCode} onChangeText={setCouponCode} />
                </View>
                <Button height={36} onPress={() => { /* Apply coupon logic here */ }} type="primary">Apply</Button>
            </View>

            <View style={styles.priceRow}>
                <Text style={styles.priceLeft}>Original price</Text>
                <Text style={styles.priceRight}>$100</Text>
            </View>
            <View style={styles.priceRow}>
                <Text style={styles.priceLeft}>Discount</Text>
                <Text style={{ ...styles.priceRight, color: currentTheme.theme['--alert'] }}>-$30</Text>
            </View>
            <View style={styles.priceRow}>
                <Text style={styles.priceLeft}>Total</Text>
                <Text style={styles.priceRight}>$70</Text>
            </View>

            <View style={{ marginBottom: 55 }}>
                <Button onPress={() => { }} type="primary">Checkout</Button>
            </View>

        </ScrollView>
    );
}

export default CartScreen;