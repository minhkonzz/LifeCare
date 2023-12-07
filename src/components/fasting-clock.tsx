import { memo, useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Circle } from 'react-native-svg'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { timestampToDateTime } from '@utils/datetimes'
import { FireColorIcon, BloodSugarDecreaseIcon, BloodSugarIncreaseIcon, BloodSugarNormalIcon, PrimaryEditIcon } from '@assets/icons'
import { getCurrentTimestamp } from '@utils/datetimes'
import fastingStagesData from '@assets/data/fasting-stages.json'

const { rgb: primaryRgb } = Colors.primary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

const stageIcons = [
	BloodSugarIncreaseIcon,
	BloodSugarDecreaseIcon,
	BloodSugarNormalIcon,
	FireColorIcon
]

const stages = fastingStagesData.map((e, i) => ({...e, icon: stageIcons[i]}))

export default memo(({ isViewable }: { isViewable: boolean }): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 1 || 0)).current
	const { startTimeStamp, endTimeStamp } = useSelector((state: AppState) => state.fasting)
	const [ data, setData ] = useState<{ timeElapsed: number, stage: any, nextStageIndex: number } | null>(null)
	const isFasting: boolean = !!(startTimeStamp && endTimeStamp)

	useEffect(() => {
		let interval: NodeJS.Timeout | undefined = undefined
		if (isFasting) {
			interval = setInterval(() => {
				const currentTimeStamp = getCurrentTimestamp()
				const timeElapsed = currentTimeStamp - startTimeStamp
				const elapsedHours = Math.floor((timeElapsed / 1000 / 60 / 60) % 24)
				let currentStage: any

				if (data && data.stage) {
					const { to } = data.stage
					currentStage = elapsedHours >= to && stages.find(e => elapsedHours >= e.from && elapsedHours <= e.to) || data.stage
				} else {
					currentStage = stages.find(e => elapsedHours >= e.from && elapsedHours <= e.to) || stages.at(-1)
				}
				
				const currentStageIndex = stages.findIndex((e: any) => e.id === currentStage.id)
				setData({ timeElapsed, stage: currentStage, nextStageIndex: currentStageIndex === stages.length - 1 && -1 || currentStageIndex + 1 })

			}, 999)
		}
		return () => { if (interval) clearInterval(interval) }
	}, [startTimeStamp])

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 0 || 1,
			duration: 840,
			useNativeDriver: true
		}).start()
	}, [isViewable])

	if (!isViewable) return <View style={styles.container} />

	if (data && isFasting) {
		const { timeElapsed, stage, nextStageIndex } = data
		const CurrentStageIcon = stage.icon
		const nextStage = stages[nextStageIndex]
		const { icon: NextStageIcon, title: nextStageTitle } = nextStage
		const elapsedPercent: number = Math.floor(timeElapsed / (endTimeStamp - startTimeStamp) * 100)

		return (
			<Animated.View
				style={{
					...styles.container,
					opacity: animateValue,
					transform: [{
						translateX: animateValue.interpolate({
							inputRange: [0, 1],
							outputRange: [-50, 0]
						})
					}]
				}}>
				<View style={styles.main}>
					<Text style={styles.elapsedTime}>{`Elapsed time (${elapsedPercent}%)`}</Text>
					<Text style={{...styles.time, fontSize: hS(isFasting ? 36 : 18) }}>{timestampToDateTime(timeElapsed)}</Text>
					{ nextStageIndex !== -1 && <>
					<Text style={styles.nextStageTitle}>Next stage</Text>
					<View style={styles.horz}>
						<NextStageIcon width={hS(28)} height={vS(28)} />
						<Text style={styles.nextStageName}>{nextStageTitle}</Text>
					</View></> }
				</View>
				<AnimatedCircularProgress
					lineCap='round'
					width={hS(28)}
					size={hS(320)}
					rotation={360}
					fill={elapsedPercent >= 0 ? elapsedPercent : 0}
					tintColor={`rgba(${primaryRgb.join(', ')}, .6)`}
					backgroundColor={`rgba(${darkRgb.join(', ')}, .08)`}
					renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r={hS(16)} fill={darkHex} />}
				/>
			</Animated.View>
		)
	}

	return (
		<Animated.View
			style={{
				...styles.container,
				opacity: animateValue,
				transform: [{
					translateX: animateValue.interpolate({
						inputRange: [0, 1],
						outputRange: [-50, 0]
					})
				}]
			}}>
			<View style={styles.main}>
				<Text style={{...styles.time, fontSize: hS(isFasting ? 36 : 18) }}>Timer not started'</Text>
				<Text style={styles.nextStageTitle}>Press button below to start fasting</Text>
			</View>
			<AnimatedCircularProgress
				lineCap='round'
				width={hS(28)}
				size={hS(320)}
				rotation={360}
				fill={0}
				tintColor={`rgba(${primaryRgb.join(', ')}, .6)`}
				backgroundColor={`rgba(${darkRgb.join(', ')}, .08)`}
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
		color: darkHex,
		letterSpacing: 1.2,
		marginTop: vS(10),
		marginBottom: vS(5)
	},

	nextStageTitle: {
		textAlign: 'center',
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
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
