import { memo, FC, useCallback, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { PopupContext } from '@contexts/popup'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { toDateTimeV1, hoursToTimestamp, timestampToDateTime } from '@utils/datetimes'
import { PrimaryEditIcon } from '@assets/icons'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import withFastingStage from '@hocs/withFastingState'
import StartFastingPopup from '@components/shared/popup/start-fasting'
import LinearGradient from 'react-native-linear-gradient'
import ConfirmStopFastingPopup from '@components/shared/popup/confirm-stop-fasting'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

interface ActivateTimeProps {
	title: string
	editable?: boolean
	current?: boolean
	value?: string
}

const FastingActivateTime: FC<ActivateTimeProps> = ({ title, editable, current, value = '' }) => {
	
	const EditButton = useCallback(() => {
		const { setPopup } = useContext<any>(PopupContext)

		return (
			<Pressable onPress={() => setPopup(StartFastingPopup)}>
				<PrimaryEditIcon width={hS(20)} height={vS(20)} />
			</Pressable>
		)
	}, [])

	return (
		<View style={styles.fastingActivateTime}>
			<View style={styles.fastingActivateTimeMain}>
				<View style={{...styles.boundaryC, borderColor: current && primaryHex || '#ff9b85' }}>
					<View style={styles.coreC} />
				</View>
				<Text style={styles.text}>{title}</Text>
				<Text style={{
					...styles.text,
					marginTop: 2,
					fontFamily: `Poppins-${current && 'SemiBold' || 'Regular'}`,
					color: current && primaryHex || darkHex
				}}>
					{value}
				</Text>
			</View>
			{ editable && <EditButton /> }
		</View>
	)
}

const CurrentFastingStage = memo(withFastingStage(({ stageData: data }: { stageData: any }) => {
	const navigation = useNavigation<any>()
	if (data) {
		const { stageElapsedPercent, elapsedTime, stage } = data
		const { title, icon, to } = stage
		const totalMsLeftToNextStage: number = hoursToTimestamp(to) - elapsedTime
		const StageIcon = icon

		return (
			<Pressable 
				onPress={() => navigation.navigate('fasting-stages')}>
				<LinearGradient
					style={styles.stage}
					colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .51, y: .5 }}>
					<View style={{ flexDirection: 'row' }}>
						<View
							style={styles.stageIcBg}>
							<AnimatedCircularProgress
								lineCap='round'
								style={{ position: 'absolute' }}
								width={hS(7)}
								size={hS(80)}
								rotation={360}
								fill={stageElapsedPercent}
								tintColor='#30E3CA'
								backgroundColor='rgba(255, 255, 255, .4)'
							/>
							<StageIcon width={hS(36)} height={vS(36)} />
						</View>
						<View style={{ marginLeft: hS(15) }}>
							<Text style={styles.stageSmText}>CURRENT STAGE</Text>
							<Text style={{...styles.stageLgText, marginBottom: vS(4) }}>{title}</Text>
							{ totalMsLeftToNextStage > 0 && 
							<Text style={styles.stageSmText}>
								{`${timestampToDateTime(totalMsLeftToNextStage)} left to next stage`}
							</Text> }
						</View>
					</View>
				</LinearGradient>
			</Pressable>
		)
	}
	return <></>
}, true))

export default withVisiblitySensor(withFastingStage(({ 
	isViewable, 
	animateValue,
	startTimeStamp,
	endTimeStamp,
	isFasting
}: { 
	isViewable: boolean, 
	animateValue: Animated.Value,
	startTimeStamp: number,
	endTimeStamp: number,
	isFasting: boolean
}): JSX.Element => {
	const navigation = useNavigation<any>()
	const { setPopup } = useContext<any>(PopupContext)
	const { currentPlan } = useSelector((state: AppState) => state.fasting)

	const handleFastingButton = () => {
		if (!currentPlan) {
			navigation.navigate('plans')
			return
		}
		if (isFasting) {
			setPopup(ConfirmStopFastingPopup)
			return 
		}
		setPopup(StartFastingPopup)
	}

	if (isFasting) {
		const currentDate: number = new Date().getDate()
		const isOnStartDate: boolean = new Date(startTimeStamp).getDate() === currentDate
		const isOnEndDate: boolean = new Date(endTimeStamp).getDate() === currentDate

		return (
			isViewable && 
			<View style={styles.container}>
				<Animated.View style={{
					...styles.header, 
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-50, 0]
					}) }]
				}}>
					<FastingActivateTime title='Start' editable current={isOnStartDate} value={toDateTimeV1(startTimeStamp)} />
					<View style={styles.line} />
					<FastingActivateTime title='End' current={isOnEndDate} value={toDateTimeV1(endTimeStamp)} />
				</Animated.View> 
				<AnimatedTouchableOpacity 
					activeOpacity={.7} 
					onPress={handleFastingButton}
					style={{ 
						opacity: animateValue, 
						transform: [{ translateY: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-30, 0]
						}) }]	
					}}>
					<LinearGradient
						style={styles.startStopButton}
						colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: 1 }}>
						<Text style={styles.startStopButtonText}>Finish fasting</Text>
					</LinearGradient>
				</AnimatedTouchableOpacity>
				<CurrentFastingStage />
			</View> || <View style={styles.container} /> 
		)
	}

	return (
		isViewable && 
		<AnimatedTouchableOpacity 
			activeOpacity={.7} 
			onPress={handleFastingButton}
			style={{ 
				opacity: animateValue, 
				transform: [{ translateY: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [-30, 0]
				}) }]	
			}}>
			<LinearGradient
				style={{...styles.startStopButton, marginTop: vS(48) }}
				colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}>
				<Text style={styles.startStopButtonText}>Start Fasting</Text>
			</LinearGradient>
		</AnimatedTouchableOpacity> || <View style={styles.startStopButton} /> 
	)
}))

const styles = StyleSheet.create({
	container: {
		width: hS(366),
		borderRadius: hS(32),
		backgroundColor: '#fff',
		alignItems: 'center',
		elevation: 8,
		shadowColor: `rgba(${darkRgb.join(', ')}, .6)`,
		bordeRadius: hS(32),
		paddingVertical: vS(20),
		paddingHorizontal: hS(18),
		marginTop: vS(39)
	},

	header: {
		width: '100%',
		marginBottom: vS(24)
	},

	line: {
		width: 1,
		height: vS(16),
		borderLeftWidth: .2,
		marginLeft: hS(7),
		borderLeftColor: `rgba(${darkRgb.join(', ')}, .4)`
	},

	fastingActivateTime: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	fastingActivateTimeMain: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	text: {
		fontSize: hS(12),
		fontFamily: 'Poppins-Regular',
		color: darkHex,
		marginLeft: hS(18)
	},

	boundaryC: {
		width: hS(14),
		height: vS(14),
		borderWidth: 1,
		borderRadius: 28,
		justifyContent: 'center',
		alignItems: 'center'
	},

	coreC: {
		width: hS(7),
		height: vS(7),
		borderWidth: .8,
		borderRadius: 28,
		marginRight: .12,
		borderColor: darkHex
	},

	startStopButton: {
		width: hS(334),
		height: vS(82),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: hS(36)
	},

	startStopButtonText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(14),
		color: '#fff'
	},

	stage: {
		borderRadius: 100,
		marginTop: vS(17),
		width: hS(334),
		justifyContent: 'space-between',
		paddingHorizontal: hS(8),
		paddingVertical: vS(11)
	},

	stageSmText: {
		letterSpacing: .4,
		fontFamily: 'Poppins-Regular',
		fontSize: hS(10),
		color: '#fff',
		textTransform: 'uppercase'
	},

	stageLgText: {
		letterSpacing: .4,
		marginTop: vS(5),
		fontFamily: 'Poppins-Regular',
		fontSize: hS(13),
		color: '#fff'
	},

	stageIcBg: {
		marginTop: -0.5,
		width: hS(78),
		height: vS(78),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 500
	}
})
