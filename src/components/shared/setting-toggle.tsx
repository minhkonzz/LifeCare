import { useState, useRef } from 'react'
import {
	StyleSheet,
	Pressable,
	Animated,
	Easing
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

export default (): JSX.Element => {
	const translateX: Animated.Value = useRef<Animated.Value>(new Animated.Value(hS(4))).current
	const [ isEnabled, setIsEnabled ] = useState<boolean>(false)

	const onPress = () => {
		Animated.timing(translateX, {
			toValue: hS(!isEnabled && 40 || 4),
			duration: 100,
			easing: Easing.bounce,
			useNativeDriver: true
		}).start(({ finished }) => {
			setIsEnabled(!isEnabled)
		})
	}

	return (
		<Pressable {...{ onPress }}>
			<LinearGradient
				style={styles.container}
				colors={
					isEnabled &&
					[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex] ||
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
