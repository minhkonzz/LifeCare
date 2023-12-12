import { memo, useContext } from 'react'
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native'
import { AppState } from '../store'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { BackIcon } from '@assets/icons'
import { PopupContext } from '@contexts/popup'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import FastingSymptoms from '@components/shared/popup-content/fasting-symptons'
import FastingClock from '@components/fasting-clock'
import FastingActivator from '@components/fasting-activator'
import FastingRecords from '@components/timer-fasting-records'
import Screen from '@components/shared/screen'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const MainTop = withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }) => {
	const { currentPlan, startTimeStamp, endTimeStamp } = useSelector((state: AppState) => state.fasting)
	const navigation = useNavigation<any>()

	return (
		isViewable && 
		<View style={styles.mainTop}>
			<Animated.Text style={{
				...styles.mainTopTitle, 
				opacity: animateValue, 
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [-50, 0]
				}) }]
			}}>
				{ startTimeStamp && endTimeStamp && "You're fasting now" || "You're in eating period" }
			</Animated.Text>
			<Animated.View style={{
				...styles.plans, 
				opacity: animateValue, 
				transform: [{ translateX: animateValue.interpolate({ 
					inputRange: [0, 1], 
					outputRange: [-50, 0]
				}) }]
			}}>
				<Pressable style={styles.plansBox} onPress={() => navigation.navigate('plans')}>
					<Text style={styles.plansBoxText}>{currentPlan && `${currentPlan.name} Intermittent Fasting plan` || 'Choose fasting plan'}</Text>
					<BackIcon style={styles.backIc} width={hS(5)} height={vS(10)} />
				</Pressable>
				<Pressable style={styles.planRef}>
					<Text style={styles.planRefText}>?</Text>
				</Pressable>
			</Animated.View>
		</View> || <View style={styles.mainTop} />
	)
})

const Tips = withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }): JSX.Element => {
	const { setPopup } = useContext<any>(PopupContext)

	return (
		isViewable && 
		<View style={styles.tips}>
			<AnimatedPressable style={{
				...styles.tip,
				opacity: animateValue,
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1],
					outputRange: [-50, 0]
				}) }]
			}}>
				<Text style={styles.tipText}>What should I do during fasting period</Text>
				<BackIcon style={styles.redirectIcon} width={10} height={10} />
			</AnimatedPressable>
			<AnimatedPressable onPress={() => setPopup(FastingSymptoms)} style={{
				...styles.tip,
				opacity: animateValue,
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1],
					outputRange: [-150, 0]
				}) }]
			}}>
				<Text style={styles.tipText}>Symptoms during fasting</Text>
				<BackIcon style={styles.redirectIcon} width={10} height={10} />
			</AnimatedPressable>
		</View> || <View style={styles.tips} />
	)
})

export default memo((): JSX.Element => {
	return (
		<Screen header='tab' title='Timer' paddingHorzContent content={[
			MainTop,
			FastingClock,
			FastingActivator,
			FastingRecords,
			Tips
		]} />
	)
})

const styles = StyleSheet.create({
	tips: {
		width: hS(370),
		marginTop: vS(16),
		height: vS(200)
	},

	tip: {
		width: '100%',
		paddingVertical: vS(30),
		paddingHorizontal: hS(24),
		elevation: 8,
		shadowColor: `rgba(${darkRgb.join(', ')}, .3)`,
		borderRadius: hS(24),
		marginTop: vS(8),
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},

	tipText: {
		fontFamily: 'Poppins-Medium', 
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2,
	},	

	redirectIcon: {
		transform: [{ rotate: '180deg' }]
	},

	mainTop: {
		height: vS(120),
		alignItems: 'center',
		marginTop: vS(110),
		marginBottom: vS(30)
	},

	mainTopTitle: {
		fontFamily: 'Poppins-Bold',
		fontSize: hS(22),
		letterSpacing: .5,
		color: darkHex
	},

	plans: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: hS(36),
		marginTop: vS(18)
	},

	plansBox: {
		borderRadius: 72,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: vS(10),
		paddingHorizontal: hS(14),
		elevation: 14,
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
	},

	plansBoxText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2
	},

	planRef: {
		width: hS(22),
		height: vS(22),
		backgroundColor: `rgba(${darkRgb.join(', ')}, .18)`,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 300,
		marginLeft: hS(15)
	},

	planRefText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkHex
	},

	backIc: {
		transform: [{ rotate: '-90deg' }], 
		marginLeft: hS(9.7)
	}
})
