import { memo, useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import { useNavigation } from '@react-navigation/native'
import { BackIcon, SpoonForkIcon } from '@assets/icons'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { getCurrentTimestamp, timestampToDateTime } from '@utils/datetimes'
import LinearGradient from 'react-native-linear-gradient'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { rgb: primaryRgb } = Colors.primary

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
let interval: NodeJS.Timeout | undefined

export default memo(({ isViewable }: { isViewable: boolean }): JSX.Element => {
	const navigation = useNavigation<any>()
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
	const { startTimeStamp, endTimeStamp } = useSelector((state: AppState) => state.fasting)
	const isFasting: boolean = !!(startTimeStamp && endTimeStamp)
	const [ timeElapsed, setTimeElapsed ] = useState<number>(0)
 
	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 1 || 0, 
			duration: 840, 
			useNativeDriver: true
		}).start()
	}, [isViewable])

	useEffect(() => {
		if (isFasting) {
			interval = setInterval(() => {
				const currentTimestamp = getCurrentTimestamp()
				const elapsedTime = currentTimestamp - startTimeStamp
				setTimeElapsed(elapsedTime)
			}, 999)
		}

		return () => { if (interval) clearInterval(interval) }
	}, [startTimeStamp])

	if (isViewable) {
		if (isFasting) {
			const elapsedPercent: number = Math.floor(timeElapsed / (endTimeStamp - startTimeStamp) * 100)
			const currentTimestamp: number = getCurrentTimestamp()
			const currentDate: number = new Date(currentTimestamp).getDate()
			const endDatetime: Date = new Date(endTimeStamp)
			const endDate: number = endDatetime.getDate()
			const endHour: number = endDatetime.getHours()
			const endMin: number = endDatetime.getMinutes()
			const notificationString: string = `Period will end at ${endHour}:${endMin} ${endDate - currentDate === 0 && 'today' || 'tomorrow'}`
			
			return (
				<AnimatedPressable 
					style={{
						opacity: animateValue, 
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-50, 0]
						}) }]
					}}
					onPress={() => navigation.navigate('Timer')}>
					<LinearGradient
						colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
						start={{ x: .5, y: 0 }}
						end={{ x: .52, y: .5 }}
						style={styles.container}>
						<View style={styles.main}>
							<View style={styles.circle}>
								{ isFasting && <Text style={styles.progressText}>{`${elapsedPercent}%`}</Text> }
								<AnimatedCircularProgress 
									lineCap='round' 
									width={hS(8)}
									size={hS(105)}
									rotation={360}
									fill={elapsedPercent}
									tintColor={`rgba(${primaryRgb.join(', ')}, .6)`}
									backgroundColor={`rgba(255, 255, 255, .4)`}
								/>
							</View>
							<View style={styles.mainTexts}>
								<Text style={styles.t1}>You're fasting</Text>
								<Text style={styles.t2}>Elapsed time</Text>
								<Text style={styles.t3}>{timestampToDateTime(timeElapsed)}</Text>
								<Text style={styles.t4}>{notificationString}</Text>
							</View>
						</View>
						<BackIcon style={styles.redirectIcon} width={hS(8)} height={vS(14)} />
					</LinearGradient>
				</AnimatedPressable>
			)
		}

		return (
			<AnimatedPressable 
				style={{
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-50, 0]
					}) }]
				}}
				onPress={() => navigation.navigate('Timer')}>
				<LinearGradient
					colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .52, y: .5 }}
					style={styles.container}>
					<View style={styles.main}>
						<View style={styles.circle}>
							<SpoonForkIcon style={styles.spoonForkIc} width={hS(40)} />
							<AnimatedCircularProgress 
								lineCap='round' 
								width={hS(8)}
								size={hS(105)}
								rotation={360}
								fill={0}
								tintColor={`rgba(${primaryRgb.join(', ')}, .6)`}
								backgroundColor={`rgba(255, 255, 255, .4)`}
							/>
						</View>
						<Text style={{...styles.t1, marginLeft: hS(16) }}>Eating times!</Text>
					</View>
					<BackIcon style={styles.redirectIcon} width={hS(8)} height={vS(14)} />
				</LinearGradient>
			</AnimatedPressable>
		)
	}

	return <View style={styles.blank} />
})

const styles = StyleSheet.create({
	blank: { height: vS(132) },

	spoonForkIc: {
		position: 'absolute'
	},

	container: {
		flexDirection: 'row',
		width: hS(365),
		height: vS(132),
		borderRadius: 500,
		paddingLeft: hS(10),
		paddingRight: hS(36),
		paddingVertical: vS(10),
		justifyContent: 'space-between',
		alignItems: 'center',
		elevation: 20,
		shadowColor: darkHex
	},

	main: {
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center'
	},

	mainTexts: {
		marginLeft: hS(12),
		height: '100%'
	},

	circle: {
		justifyContent: 'center',
		alignItems: 'center'
	},

	progressText: {
		position: 'absolute',
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(20),
		color: '#fff',
		letterSpacing: .2
	},

	t1: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(16),
		color: '#fff',
		letterSpacing: .2
	},

	t2: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(8),
		color: '#fff',
		letterSpacing: .2,
		marginTop: vS(-2)
	},

	t3: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(24),
		color: '#fff',
		letterSpacing: 2,
		marginTop: vS(-2)
	},

	t4: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(8),
		color: '#fff',
		letterSpacing: .2,
		paddingHorizontal: hS(10),
		paddingVertical: vS(3),
		backgroundColor: `rgba(255, 255, 255, .12)`,
		borderRadius: 200,
		marginTop: vS(-3)
	},

	redirectIcon: {
		transform: [{ rotate: '180deg' }]
	}
})
