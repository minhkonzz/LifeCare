import { FC, useState, useEffect, useRef } from 'react'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import SettingToggle from '@components/shared/setting-toggle'
import SettingToggleValue from './shared/setting-toggle-value'
import BackIcon from '@assets/icons/goback.svg'

import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    Pressable
} from 'react-native'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

interface SettingRowProps {
    title: string,
    type: 'redirect' | 'value' | 'toggle' | 'toggleValue',
    boldTitle?: boolean,
    value?: string | number | boolean | [string, string],
    onPress?: () => void, 
    additionalStyles?: any
}

const SettingRedirect: FC<{ onPress?: () => void }> = ({ onPress }) => (
    <Pressable style={styles.redirectWrapper} {...{ onPress }}>
        <BackIcon style={{ transform: [{ rotate: '-180deg' }] }} width={hS(7)} height={vS(12)} />
    </Pressable>
)

const SettingValue: FC<{ value: string | number, onPress?: () => void }> = ({ value, onPress }) => (
    <Pressable style={styles.settingValue} {...{ onPress }}>
        <Text style={[styles.text, styles.valueTitle]}>{value}</Text>
        <BackIcon style={{ marginTop: -1, transform: [{ rotate: '-180deg' }] }} width={hS(7)} height={vS(12)} />
    </Pressable>
)

const settingTypes: any = {
    redirect: SettingRedirect,
    value: SettingValue,
    toggle: SettingToggle,
    toggleValue: SettingToggleValue
}

export default ({ title, type, value, boldTitle, onPress, additionalStyles }: SettingRowProps): JSX.Element => {
    const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(animateValue, {
            toValue: 1, 
            duration: 720,
            delay: 100,
            useNativeDriver: true
        }).start()
    }, [])

    const TargetView = settingTypes[type]
    return (
        <View style={{...styles.container, ...additionalStyles}}>
            <Animated.Text 
                style={{
                    ...styles.text, 
                    ...styles.title,
                    fontFamily: `Poppins-${boldTitle && 'SemiBold' || 'Regular'}`,
                    opacity: animateValue, 
                    transform: [{ translateX: animateValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-150, 0]
                    }) }]
                }}>
                {title}
            </Animated.Text>
            <Animated.View style={{
                opacity: animateValue,
                transform: [{ translateX: animateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [150, 0]
                }) }]
            }}>
                <TargetView {...{ value, onPress }} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: vS(10)
    },

    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: hS(14),
        letterSpacing: .2
    },

    title: {
        color: darkHex
    },

    settingValue: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    valueTitle: {
        marginRight: hS(12),
        color: `rgba(${darkRgb.join(', ')}, .6)`
    },

    redirectWrapper: {
        width: '40%', 
        alignItems: 'flex-end'
    }
})
