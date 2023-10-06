import { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	const opacity: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	useEffect(() => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		}).start()
	}, [])

	return (
		<Animated.View style={{ opacity }}>
			<LinearGradient
				style={styles.container}
				colors={[`rgba(${[229, 244, 231].join(', ')}, .6)`, '#E5F4E7']}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}>
				<Text style={styles.headerText}>Latest BMI (kg/m2)</Text>
				<View style={styles.bmiValue}>
					<Text style={styles.bmiValueNumber}>28.25</Text>
					<Text style={styles.bmiValueDesc}>Overweight</Text>
				</View>

			</LinearGradient>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: vS(24),
		width: hS(370),
		height: vS(150),
		borderRadius: hS(24),
		paddingHorizontal: hS(18),
		paddingVertical: vS(16)
	},

	headerText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(15),
		letterSpacing: .2,
		color: darkPrimary
	},

	bmiValue: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: vS(6)
	},

	bmiValueNumber: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(28),
		color: darkPrimary,
		letterSpacing: .2
	},

	bmiValueDesc: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(12),
		color: darkPrimary,
		letterSpacing: .2,
		marginLeft: hS(14),
		marginTop: vS(6)
	}
})
