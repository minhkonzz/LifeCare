import { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale, verticalScale } from '@utils/responsive'
import BluePlusIcon from '@assets/icons/blue_plus.svg'
import LinearGradient from 'react-native-linear-gradient'

const darkPrimary: string = Colors.darkPrimary.hex

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
				colors={[`rgba(${[154, 197, 244].join(', ')}, .28)`, '#9AC5F4']}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}>
				<View style={styles.header}>
					<View>
						<Text style={styles.headerMainText}>Keep hydrate records</Text>
						<View style={styles.headerNotes}>
							<View style={styles.headerNotePart}>
								<LinearGradient
									style={styles.headerNoteCirlce}
									colors={[`rgba(${[120, 193, 243].join(', ')}, .6)`, '#78C1F3']}
									start={{ x: .5, y: 0 }}
									end={{ x: .5, y: 1 }} />
								<Text style={styles.headerNoteText}>Completed</Text>
							</View>
							<View style={[styles.headerNotePart, { marginLeft: horizontalScale(38) }]}>
								<View style={[styles.headerNoteCircle, { backgroundColor: '#fafafa' }]} />
								<Text style={styles.headerNoteText}>Goal</Text>
							</View>
						</View>
					</View>
					<TouchableOpacity style={styles.hydrateRecsUpdateButton} activeOpacity={.8} onPress={() => { }}>
						<BluePlusIcon width={horizontalScale(14)} height={verticalScale(15.3)} />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: verticalScale(24),
		width: horizontalScale(370),
		height: verticalScale(282),
		paddingVertical: verticalScale(16),
		paddingHorizontal: horizontalScale(18),
		borderRadius: horizontalScale(24)
	},

	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	headerMainText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: horizontalScale(15),
		color: darkPrimary,
		letterSpacing: .2
	},

	headerNotes: {
		marginTop: verticalScale(6),
		flexDirection: 'row',
		alignItems: 'center'
	},

	headerNotePart: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	headerNoteCircle: {
		width: horizontalScale(10),
		height: verticalScale(10),
		borderRadius: 200
	},

	headerNoteText: {
		fontFamily: 'Poppins-Regular',
		fontSize: horizontalScale(12),
		color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`,
		letterSpacing: .2,
		marginLeft: horizontalScale(8)
	},

	hydrateRecsUpdateButton: {
		justifyContent: 'center',
		alignItems: 'center',
		width: horizontalScale(36),
		height: verticalScale(36),
		borderRadius: 200,
		backgroundColor: '#fff'
	}
})
