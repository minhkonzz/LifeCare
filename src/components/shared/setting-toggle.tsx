import { useRef } from 'react'
import { StyleSheet, Pressable, Animated, Easing } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

interface SettingToggleProps {
	value: boolean, 
	onPress?: () => void
}

export default ({ value, onPress }: SettingToggleProps): JSX.Element => {
	const translateX: Animated.Value = useRef<Animated.Value>(new Animated.Value(hS(value && 40 || 4))).current

	const onToggle = () => {
		Animated.timing(translateX, {
			toValue: hS(!value && 40 || 4),
			duration: 100,
			easing: Easing.bounce,
			useNativeDriver: true
		}).start(({ finished }) => {
			if (onPress) onPress()
		})
	}

	return (
		<Pressable onPress={onToggle}>
			<LinearGradient
				style={styles.container}
				colors={
					value &&
					[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex] ||
					Array(2).fill('#e3e3e3')
				}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}>
				<Animated.View style={[styles.circle, { transform: [{ translateX }] }]} />
			</LinearGradient>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: hS(60),
		height: vS(24),
		justifyContent: 'center',
		borderRadius: 200
	},

	circle: {
		position: 'absolute',
		width: hS(16),
		height: vS(16),
		borderRadius: 300,
		backgroundColor: '#fff',
		elevation: 4
	}
})
