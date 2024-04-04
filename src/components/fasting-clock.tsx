import { View, Text, StyleSheet, Animated } from 'react-native'
import { primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Circle } from 'react-native-svg'
import { timestampToDateTime } from '@utils/datetimes'
import { commonStyles } from '@utils/stylesheet'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import withFastingState from '@hocs/withFastingState'

const { hrz } = commonStyles

export default withVisiblitySensor(withFastingState(({ 
	isViewable, 
	animateValue,
	stageData 
}: { 
	isViewable: boolean, 
	animateValue: Animated.Value, 
	stageData: any
}): JSX.Element => {

	if (!isViewable) return <View style={styles.container} />

	if (stageData) {
		const { elapsedTimeText, elapsedTimePercent, nextStage, timeExceededValue } = stageData
		const NextStage = nextStage && (() => {
			const { icon: NextStageIcon, title: nextStageTitle } = nextStage
			return <>
				<Text style={styles.nextStageTitle}>Next stage</Text>
				<View style={hrz}>
					<NextStageIcon width={hS(28)} height={vS(28)} />
					<Text style={styles.nextStageName}>{nextStageTitle}</Text>
				</View>
			</>
		}) || (() => <></>)
		
		if (timeExceededValue) {
			const timeExceededText: string = timestampToDateTime(timeExceededValue)
			return (
				<Animated.View style={{
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
						<Text style={styles.elapsedTime}>{`Elapsed time (${elapsedTimePercent}%)`}</Text>
						<Text style={{...styles.time, fontSize: hS(36) }}>{elapsedTimeText}</Text>
						<Text style={{...styles.elapsedTime, marginBottom: vS(10), marginTop: vS(-8)}}>{`Exceeded: +${timeExceededText}`}</Text>
						<NextStage />
					</View>
					<AnimatedCircularProgress
						lineCap='round'
						width={hS(28)}
						size={hS(348)}
						rotation={360}
						fill={100}
						tintColor={`rgba(${primaryRgb.join(', ')}, .6)`}
						backgroundColor={`rgba(${darkRgb.join(', ')}, .08)`}
					/>
				</Animated.View>
			)
		}

		return (
			<Animated.View style={{
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
					<Text style={styles.elapsedTime}>{elapsedTimePercent >= 0 && `Elapsed time (${elapsedTimePercent}%)` || 'Fasting period will start after'}</Text>
					<Text style={{...styles.time, fontSize: hS(36) }}>{elapsedTimeText}</Text>
					<NextStage />
				</View>
				<AnimatedCircularProgress
					lineCap='round'
					width={hS(28)}
					size={hS(348)}
					rotation={360}
					fill={elapsedTimePercent >= 0 ? elapsedTimePercent : 0}
					tintColor={`rgba(${primaryRgb.join(', ')}, .6)`}
					backgroundColor={`rgba(${darkRgb.join(', ')}, .08)`}
					renderCap={({ center }) => elapsedTimePercent >= 0 && <Circle cx={center.x} cy={center.y} r={hS(16)} fill={darkHex} /> || <></>}
				/>
			</Animated.View>
		)
	}
	
	return (
		<Animated.View style={{
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
				<Text style={{...styles.time, fontSize: hS(18) }}>Timer not started</Text>
				<Text style={styles.nextStageTitle}>Press button below to start fasting</Text>
			</View>
			<AnimatedCircularProgress
				lineCap='round'
				width={hS(28)}
				size={hS(348)}
				rotation={360}
				fill={0}
				tintColor={`rgba(${primaryRgb.join(', ')}, .6)`}
				backgroundColor={`rgba(${darkRgb.join(', ')}, .08)`}
			/>
		</Animated.View>
	)
}, true))

const styles = StyleSheet.create({
	container: {
		borderRadius: 500,
		width: hS(350),
		height: vS(350),
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#fff'
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
		fontSize: hS(13),
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
