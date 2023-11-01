import { memo, useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Circle } from 'react-native-svg'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import FireColorIcon from '@assets/icons/fire-color.svg'

const { rgb: primaryRgb } = Colors.primary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default memo(({ isViewable }: { isViewable: boolean }): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
	const { startTimeStamp, endTimeStamp } = useSelector((state: AppState) => state.fasting)
	const [ timeElapsed, setTimeElapsed ] = useState(0)
	const isFasting = startTimeStamp && endTimeStamp

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined = undefined
		if (isFasting) {
			interval = setInterval(() => {
				const currentTimeStamp = new Date().getTime()
				const elapsedTime = currentTimeStamp - startTimeStamp
				setTimeElapsed(elapsedTime)
			}, 1000)
		}
		return () => { if (interval) clearInterval(interval) }
	}, [])

	const formatTime = (time: number) => {
		const s = isFasting ? Math.floor((time / 1000) % 60).toString().padStart(2, '0') : '00'
		const m = isFasting ? Math.floor((time / 1000 / 60) % 60).toString().padStart(2, '0') : '00'
		const h = isFasting ? Math.floor((time / 1000 / 60 / 60) % 24).toString().padStart(2, '0') : '00'
		return `${h}:${m}:${s}`
	}

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 1 || 0,
			duration: 1010,
			useNativeDriver: true
		}).start()
	}, [isViewable])

	return (
		<Animated.View
			style={[
				styles.container,
				{
					opacity: animateValue,
					transform: [{
						translateX: animateValue.interpolate({
							inputRange: [0, 1],
							outputRange: [-100, 0]
						})
					}]
				}
			]}>
			<View style={styles.main}>
				<Text style={styles.elapsedTime}>{isFasting && `Elapsed time (${(timeElapsed / (endTimeStamp - startTimeStamp) * 100)}%)` || ''}</Text>
				<Text style={styles.time}>{formatTime(timeElapsed)}</Text>
				{ isFasting && <>
				<Text style={styles.nextStageTitle}>Next stage</Text>
				<View style={styles.horz}>
					<FireColorIcon width={hS(16)} height={vS(16)} />
					<Text style={styles.nextStageName}>Fat burning</Text>
				</View></> || 
				<Text style={styles.nextStageTitle}>Press button below to start fasting</Text> }
			</View>
			<AnimatedCircularProgress
				lineCap='round'
				width={hS(28)}
				size={hS(320)}
				rotation={360}
				fill={30}
				tintColor={`rgba(${primaryRgb.join(', ')}, .6)`}
				backgroundColor={`rgba(${darkRgb.join(', ')}, .08)`}
				renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r={hS(20)} fill={darkHex} />}
			/>
		</Animated.View>
	)
})

const styles = StyleSheet.create({
	container: {
		borderRadius: 500,
		width: hS(320),
		height: vS(320),
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#fff'
	},

	horz: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	timeText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(36),
		color: darkHex,
		letterSpacing: .5
	},

	inside: {
		position: 'absolute',
		width: hS(260),
		height: vS(260),
		borderRadius: 500,
		justifyContent: 'center',
		alignItems: 'center'
	},

	main: {
		position: 'absolute',
		width: hS(220),
		height: vS(220),
		backgroundColor: '#fff',
		borderRadius: 500,
		justifyContent: 'center',
		alignItems: 'center'
	},

	elapsedTime: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkHex
	},

	time: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(36),
		color: darkHex,
		letterSpacing: 2,
		marginTop: vS(10),
		marginBottom: vS(5)
	},

	nextStageTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(11),
		color: `rgba(${darkRgb.join(', ')}, .6)`,
		letterSpacing: .2
	},

	nextStageName: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2,
		marginTop: 5,
		marginHorizontal: hS(6)
	}
})
