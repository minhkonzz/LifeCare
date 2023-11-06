import { FC, useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    Pressable
} from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import SettingToggle from '@components/shared/setting-toggle'
import BackIcon from '@assets/icons/goback.svg'

interface SettingRowProps {
    title: string,
    type: 'redirect' | 'value' | 'toggle' | 'toggleValue',
    boldTitle?: boolean,
    value?: string | number | boolean | [string, string],
    onPress?: () => void, 
    additionalStyles?: any
}

const SettingRedirect: FC<{ onPress: () => void }> = ({ onPress }) => (
    <Pressable style={styles.redirectWrapper} {...{ onPress }}>
        <BackIcon style={{ transform: [{ rotate: '-180deg' }] }} width={hS(7)} height={vS(12)} />
    </Pressable>
)

const SettingValue: FC<{ value: string | number, onPress: () => void }> = ({ value, onPress }) => (
    <Pressable style={styles.settingValue} {...{ onPress }}>
        <Text style={[styles.text, styles.valueTitle]}>{value}</Text>
        <BackIcon style={{ marginTop: -1, transform: [{ rotate: '-180deg' }] }} width={hS(7)} height={vS(12)} />
    </Pressable>
)

const SettingToggleValue: FC<{ value: [string, string], onPress: () => void }> = ({ value, onPress }) => {
    const translateX: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const [ enabled, setEnabled ] = useState<boolean>(false)

	useEffect(() => {
		Animated.timing(translateX, {
			duration: 150,
			toValue: enabled ? hS(54) : 0,
			easing: Easing.bezier(1, 0, 0, 1),
			useNativeDriver: true
		}).start()
	}, [enabled])

    const onTogglePressed = () => {
        onPress()
        setEnabled(!enabled)
    }

	return (
		<Pressable style={styles.toggle} onPress={onTogglePressed}>
			<Animated.View style={[styles.toggleButton, { transform: [{ translateX }] }]} />
			<View style={styles.toggleBg}>
				<Text style={styles.toggleText}>{value[0].toUpperCase()}</Text>
				<Text style={styles.toggleText}>{value[1].toUpperCase()}</Text>
			</View>
		</Pressable>
	)
}

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
        color: Colors.darkPrimary.hex
    },

    settingValue: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    valueTitle: {
        marginRight: hS(12),
        color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`
    },

    toggle: {
		width: hS(120),
		height: vS(28),
		backgroundColor: Colors.lightPrimary.hex,
		borderRadius: hS(12),
		justifyContent: 'center'
	},

	toggleButton: {
		position: 'absolute',
		height: '80%',
		width: '50%',
		backgroundColor: '#fff',
		borderRadius: hS(12),
		left: hS(2),
		right: hS(2)
	},

    toggleBg: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: hS(18),
		marginTop: vS(2)
	},

	toggleText: {
		fontSize: hS(13),
		fontFamily: 'Poppins-Medium'
	},

    redirectWrapper: {
        width: '40%', 
        alignItems: 'flex-end'
    }
})
