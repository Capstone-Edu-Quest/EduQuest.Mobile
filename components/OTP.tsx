/** @format */

import { useTheme } from "@/services/hooks/useTheme";
import React, { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View, Text, Alert, StyleSheet } from "react-native";

export const Opt = ({ otp, setOtp, resendOtp }: { otp: string[], setOtp: (otp: string[]) => void, resendOtp: () => void }) => {
    const { currentTheme } = useTheme();

    const [resendCountDown, setResendCountDown] = useState(60);
    const inputRefs = useRef<TextInput[]>([]);

    useEffect(() => {
        onCountdown();
    }, []);

    const onInput = (val: string, index: number) => {
        const clonnedOtp = [...otp];
        clonnedOtp[index] = val;
        setOtp(clonnedOtp);

        if (val === "" && index > 0) return inputRefs.current[index - 1].focus();
        if (val !== "" && index < otp.length - 1)
            return inputRefs.current[index + 1].focus();
    };

    const onCountdown = () => {
        let startTime = new Date().getTime();

        const countdownInterval = setInterval(() => {
            const now = new Date();
            const countdownTime = 60 - (now.getTime() - startTime) / 1000;
            setResendCountDown(Math.round(countdownTime));

            countdownTime <= 0 && clearInterval(countdownInterval);
        }, 1000);
    };

    const onResendOtp = () => {
        if (resendCountDown > 0) return;

        resendOtp()
        setResendCountDown(60);
        onCountdown();
    };

    const OtpStyle = StyleSheet.create({
        mainCtn: {
            marginTop: 0,
            marginBottom: 10,
            minHeight: 90,
            width: '100%',
        },
        otpCtn: {
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            minHeight: 50,
            maxHeight: 50,
            justifyContent: 'space-between'
        },
        otpInput: {
            backgroundColor: currentTheme.theme['--tertiary-bg'],
            height: 50,
            width: '14%',
            borderRadius: 10,
            textAlign: 'center',
            color: currentTheme.theme['--primary-text'],
            fontWeight: 700,
            fontSize: 20
        },
        resendBtn: {
            color: currentTheme.theme['--tertiary-text'],
            fontSize: 12,
            marginTop: 3
        },
        resendActive: {
            color: currentTheme.theme['--primary-text'],
            fontSize: 12,
            marginTop: 3,
        }
    })

    return (
        <View style={OtpStyle.mainCtn}>
            <View style={OtpStyle.otpCtn}>
                {otp.map((val, i) => (
                    <TextInput
                        style={OtpStyle.otpInput}
                        keyboardType="numeric"
                        maxLength={1}
                        value={val}
                        key={i}
                        onChangeText={(inputVal) => onInput(inputVal, i)}
                        ref={(ref) => (inputRefs.current[i] = ref as TextInput)}
                    />
                ))}
            </View>

            <TouchableOpacity
                style={OtpStyle.resendBtn}
                onPress={onResendOtp}
                disabled={resendCountDown > 0}
            >
                <Text
                    style={OtpStyle[resendCountDown === 0 ? "resendActive" : "resendBtn"]}
                >
                    Resend {resendCountDown > 0 && `(${resendCountDown})`}
                </Text>
            </TouchableOpacity>
        </View>
    );
};
