import { StyleSheet, Pressable, Animated, Easing } from 'react-native'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
import useAnimValue from '@hooks/useAnimValue'

interface SettingToggleProps {
	value: boolean, 
	onPress?: () => void
}

export default ({ value, onPress }: SettingToggleProps): JSX.Element => {
	const translateX = useAnimValue(hS(value && 40 || 4))

	const onToggle = () => {
		Animated.timing(translateX, {
			toValue: hS(!value && 40 || 4),
			duration: 100,
			easing: Easing.bounce,
			useNativeDriver: true
		}).start(() => {
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
				<Animated.View style={{...styles.circle, transform: [{ translateX }] }} />
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
