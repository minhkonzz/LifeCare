import { memo, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, Animated, FlatList } from 'react-native'
import { Colors } from '@utils/constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import fastingRecordsData from '@assets/data/timer-fasting-records.json'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { hex: lightHex, rgb: lightRgb } = Colors.lightPrimary

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
				colors={[`rgba(${lightRgb.join(', ')}, .6)`, lightHex]}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}>
				<Animated.View style={{ 
					opacity: animateValue,
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-150, 0]
					}) }]
				}}>
					<Text style={styles.headerMainText}>Recent Fasting</Text>
					<View style={styles.headerNotes}>
						<View style={styles.headerNotePart}>
							<LinearGradient
								style={styles.headerNoteCircle}
								colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
								start={{ x: .5, y: 0 }}
								end={{ x: .5, y: 1 }} />
							<Text style={styles.headerNoteText}>Completed</Text>
						</View>
						<View style={[styles.headerNotePart, { marginLeft: hS(38) }]}>
							<View style={[styles.headerNoteCircle, { backgroundColor: `rgba(${darkRgb.join(', ')}, .28)` }]} />
							<Text style={styles.headerNoteText}>24 hours</Text>
						</View>
					</View>
				</Animated.View>
				<Animated.FlatList
					style={[styles.records, { opacity: animateValue }]}
					horizontal
					showsHorizontalScrollIndicator={false}
					data={fastingRecordsData}
					renderItem={({ item, index }) => (
						<View key={index} style={[styles.rec, { marginLeft: (index > 0 ? hS(15) : 0) }]}>
							<Text style={[styles.recText, { height: vS(22) }]}>{item.hrs > 0 ? `${item.hrs}h` : ''}</Text>
							<LinearGradient
								style={styles.recProg}
								colors={[`rgba(${darkRgb.join(', ')}, .05)`, `rgba(${darkRgb.join(', ')}, .2)`]}
								start={{ x: .5, y: 0 }}
								end={{ x: .5, y: 1 }}>
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
									colors={[`rgba(${primaryRgb.join(', ')}, .2)`, primaryHex]}
									start={{ x: .5, y: 0 }}
									end={{ x: .5, y: 1 }} />
							</LinearGradient>
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
		paddingHorizontal: hS(18),
		paddingVertical: vS(16),
		borderRadius: hS(24)
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

	headerNoteText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		letterSpacing: .2,
		color: darkHex,
		marginLeft: hS(8),
		marginTop: vS(4)
	},

	headerNoteCircle: {
		width: hS(10),
		height: vS(10),
		borderRadius: 50
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
		overflow: 'hidden'
	},

	recProgValue: {
		width: '100%',
		borderRadius: 200
	}
})
