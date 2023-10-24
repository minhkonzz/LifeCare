import { memo, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import bmiRangesData from '@assets/data/bmi-range-data.json'
import PolygonIcon from '@assets/icons/polygon.svg'

const darkPrimary: string = Colors.darkPrimary.hex
const AnimatedPolygonIcon = Animated.createAnimatedComponent(PolygonIcon)

export default memo(({ isViewable }: { isViewable: boolean }): JSX.Element => {
	const bmiValue = 28.25
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
	const rangeAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current

	useEffect(() => {
		Animated.parallel([
			Animated.timing(animateValue, {
				toValue: isViewable && 1 || 0,
				duration: 1010,
				useNativeDriver: true
			}), 
			Animated.timing(rangeAnimateValue, {
				toValue: isViewable && 1 || 0,
				duration: 1100, 
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
				colors={[`rgba(${[229, 244, 231].join(', ')}, .6)`, '#E5F4E7']}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}>
				<Animated.View style={{ 
					opacity: animateValue,
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-150, 0]
					}) }]
				}}>
					<Text style={styles.headerText}>Latest BMI (kg/m2)</Text>
					<View style={styles.bmiValue}>
						<Text style={styles.bmiValueNumber}>{bmiValue}</Text>
						<Text style={styles.bmiValueDesc}>Overweight</Text>
					</View>
				</Animated.View>
				<View>
					<Animated.View style={{
						marginLeft: rangeAnimateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: ['0%', `${(bmiValue - 16) / 24 * 100}%`]
						}) 
					}}>
						<PolygonIcon width={hS(14)} height={vS(14)} />
					</Animated.View>
					<Animated.View style={[
						styles.rangeColors, 
						{ 
							height: rangeAnimateValue.interpolate({
								inputRange: [0, 1] ,
								outputRange: [0, vS(20)]
							})	
						}
					]}>
					{
						bmiRangesData.map((e, i) => {
							return (
								<LinearGradient
									key={`${e.id}-${i}`}
									style={{
										width: `${(e.max - e.min + (i > 2 ? -0.5 : i === 1 ? 1.8 : 1)) / 24 * 87}%`,
										height: vS(11),
										borderRadius: 100
									}}
									colors={e.color}
									start={{ x: .5, y: 0 }}
									end={{ x: .5, y: 1 }}
								/>
							)
						})
					}
					</Animated.View>
				</View>
			</LinearGradient>
		</Animated.View> || <View style={styles.container} />
	)
})

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
	},

	rangeColors: {
		width: '100%',
      flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end'
   }
})
