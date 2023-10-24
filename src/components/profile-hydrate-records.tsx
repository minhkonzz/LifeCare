import { memo, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import BluePlusIcon from '@assets/icons/blue_plus.svg'
import LinearGradient from 'react-native-linear-gradient'
import hyrdrateRecords from '@assets/data/profile-hydrate-data.json'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export default memo(({ isViewable }: { isViewable: boolean }): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
	const progressAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current

	useEffect(() => {
		Animated.parallel([
			Animated.timing(animateValue, {
				toValue: isViewable && 1 || 0,
				duration: 1010,
				useNativeDriver: true
			}),
			Animated.timing(progressAnimateValue, {
				toValue: isViewable && 1 || 0, 
				duration: 1010, 
				delay: 500, 
				useNativeDriver: false
			})
		]).start()
	}, [isViewable])

	return (
		isViewable && 
		<Animated.View style={{ opacity: animateValue }}>
			<LinearGradient
				style={styles.container}
				colors={['rgba(154, 197, 244, .24)', '#9AC5F4']}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}>
				<View style={styles.header}>
					<Animated.View style={{ 
						opacity: animateValue, 
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1],
							outputRange: [-100, 0]
						}) }]
					}}>
						<Text style={styles.headerMainText}>Keep hydrate records</Text>
						<View style={styles.headerNotes}>
							<View style={styles.headerNotePart}>
								<LinearGradient
									style={styles.headerNoteCircle}
									colors={[`rgba(${[120, 193, 243].join(', ')}, .6)`, '#78C1F3']}
									start={{ x: .5, y: 0 }}
									end={{ x: .5, y: 1 }} />
								<Text style={styles.headerNoteText}>Completed</Text>
							</View>
							<View style={[styles.headerNotePart, { marginLeft: hS(38) }]}>
								<View style={[styles.headerNoteCircle, { backgroundColor: '#fafafa' }]} />
								<Text style={styles.headerNoteText}>Goal</Text>
							</View>
						</View>
					</Animated.View>
					<AnimatedTouchableOpacity 
						style={[styles.hydrateRecsUpdateButton, { transform: [{ scale: animateValue }] }]} 
						activeOpacity={.8}>
						<BluePlusIcon width={hS(14)} height={vS(15.3)} />
					</AnimatedTouchableOpacity>
				</View>
				<Animated.FlatList
					style={[styles.records, { opacity: animateValue }]}
					horizontal
					showsHorizontalScrollIndicator={false}
					data={hyrdrateRecords}
					renderItem={({ item, index }) => (
						<View key={index} style={[styles.rec, { marginLeft: (index > 0 ? hS(15) : 0) }]}>
							<Text style={[styles.recText, { height: vS(22) }]}>{item.hrs > 0 ? `${item.hrs}h` : ''}</Text>
							<View style={styles.recProg}>
								<AnimatedLinearGradient
									style={[
										styles.recProgValue, 
										{ 
											height: progressAnimateValue.interpolate({
												inputRange: [0, 1], 
												outputRange: ['0%', `${item.hrs / 24 * 100}%`]
											})
										}
									]}
									colors={['rgba(120, 193, 243, .36)', '#78C1F3']}
									start={{ x: .5, y: 0 }}
									end={{ x: .5, y: 1 }} />
							</View>
							<View style={{ alignItems: 'center', marginTop: vS(7) }}>
								<Text style={styles.recText}>{item.day}</Text>
								<Text style={[styles.recText, { marginTop: vS(-2) }]}>{item.month}</Text>
							</View>
						</View>
					)}
				/>
				<Animated.Text style={[styles.lastUpdatedText, { opacity: animateValue }]}>Last updated 3 minutes</Animated.Text>
			</LinearGradient>
		</Animated.View> || <View style={styles.container} />
	)
})

const styles = StyleSheet.create({
	container: {
		marginTop: vS(24),
		width: hS(370),
		height: vS(350),
		paddingVertical: vS(16),
		paddingHorizontal: hS(18),
		borderRadius: hS(24)
	},

	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	headerMainText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(15),
		color: darkHex,
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

	headerNoteCircle: {
		width: hS(10),
		height: vS(10),
		borderRadius: 200
	},

	headerNoteText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: `rgba(${darkRgb.join(', ')}, .6)`,
		letterSpacing: .2,
		marginLeft: hS(8)
	},

	hydrateRecsUpdateButton: {
		justifyContent: 'center',
		alignItems: 'center',
		width: hS(36),
		height: vS(36),
		borderRadius: 200,
		backgroundColor: '#fff'
	},

	records: {
		width: '100%',
		marginTop: vS(20)
	},

	lastUpdatedText: {
		fontFamily: 'Poppins-Regular', 
		fontSize: hS(11), 
		color: darkHex,
		letterSpacing: .2,
		marginTop: vS(18), 
		alignSelf: 'center'
	},

	rec: {
		alignItems: 'center'
	},

	recText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(11),
		color: darkHex,
		letterSpacing: .4
	},

	recProg: {
		width: hS(54),
		height: vS(121),
		borderRadius: 200,
		justifyContent: 'flex-end',
		backgroundColor: '#fff',
		overflow: 'hidden'
	},

	recProgValue: {
		width: '100%',
		borderRadius: 200
	}
})
