import { FC, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const darkPrimary: string = Colors.darkPrimary.hex
const primaryHex: string = Colors.primary.hex

export default (): JSX.Element => {
	const opacity: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true
		}).start()
	}, [])

	return (
		<Animated.View style={{ opacity }}>
			<LinearGradient
				style={styles.container}
				colors={[`rgba(${Colors.lightPrimary.rgb.join(', ')}, .6)`, Colors.lightPrimary.hex]}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}>
				<View>
					<Text style={styles.headerMainText}>Recent Fasting</Text>
					<View style={styles.headerNotes}>
						<View style={styles.headerNotePart}>
							<LinearGradient
								style={styles.headerNoteCircle}
								colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, primaryHex]}
								start={{ x: .5, y: 0 }}
								end={{ x: .5, y: 1 }} />
							<Text style={styles.headerNoteText}>Completed</Text>
						</View>
						<View style={[styles.headerNotePart, { marginLeft: hS(38) }]}>
							<View style={[styles.headerNoteCircle, { backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(' ,')}, .28)` }]} />
							<Text style={styles.headerNoteText}>24 hours</Text>
						</View>
					</View>
				</View>
			</LinearGradient>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: vS(24),
		width: hS(370),
		height: vS(282),
		paddingHorizontal: hS(18),
		paddingVertical: vS(16),
		borderRadius: hS(24)
	},

	headerMainText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(15),
		color: darkPrimary,
		letterSpacing: .2
	},

	headerNotes: {
		marginTop: vS(6),
		flexDirection: 'row',
		alignItems: 'center'
	},

	headerNotePart: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	headerNoteText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		letterSpacing: .2,
		color: darkPrimary,
		marginLeft: hS(8),
		marginTop: vS(4)
	},

	headerNoteCircle: {
		width: hS(10),
		height: vS(10),
		borderRadius: 50
	}
})
