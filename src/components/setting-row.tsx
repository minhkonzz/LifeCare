import { FC, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { BackIcon } from '@assets/icons'
import SettingToggle from '@components/shared/setting-toggle'
import SettingToggleValue from './shared/setting-toggle-value'
import useAnimValue from '@hooks/useAnimValue'

interface SettingRowProps {
    title: string,
    type: 'redirect' | 'value' | 'toggle' | 'toggleValue',
    boldTitle?: boolean,
    value?: string | number | boolean | [string, string],
    onPress?: () => void, 
    additionalStyles?: any
}

const SettingRedirect = () => (
    <Pressable style={styles.redirectWrapper}>
        <BackIcon style={{ transform: [{ rotate: '-180deg' }] }} width={hS(7)} height={vS(12)} />
    </Pressable>
)

const SettingValue: FC<{ value: string | number}> = ({ value }) => (
    <View style={styles.settingValue}>
        <Text style={[styles.text, styles.valueTitle]}>{value}</Text>
        <BackIcon style={{ marginTop: -1, transform: [{ rotate: '-180deg' }] }} width={hS(7)} height={vS(12)} />
    </View>
)

const settingTypes: any = {
    redirect: SettingRedirect,
    value: SettingValue,
    toggle: SettingToggle,
    toggleValue: SettingToggleValue
}

export default ({ title, type, value, boldTitle, onPress, additionalStyles }: SettingRowProps): JSX.Element => {
    const animateValue = useAnimValue(0)

    useEffect(() => {
        Animated.timing(animateValue, {
            toValue: 1, 
            duration: 720,
            delay: 100,
            useNativeDriver: true
        }).start()
    }, [])

    const hasToggles: boolean = ['toggle', 'toggleValue'].includes(type)
    const Wrapper = hasToggles && View || Pressable
    const TargetView = settingTypes[type]
    return (
        <Wrapper 
            {...(!hasToggles && { onPress } || {})} 
            style={{...styles.container, ...additionalStyles}}>
            <Text style={{
                ...styles.text, 
                ...styles.title,
                fontFamily: `Poppins-${boldTitle && 'SemiBold' || 'Regular'}`
            }}>
                {title}
            </Text>
            <TargetView {...{ value, ...(hasToggles && { onPress } || {}) }} />
        </Wrapper>
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
