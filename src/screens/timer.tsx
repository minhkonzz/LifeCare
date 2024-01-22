import { memo, useContext } from 'react'
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native'
import { AppStore } from '../store'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { BackIcon, PrimaryBookIcon } from '@assets/icons'
import { PopupContext } from '@contexts/popup'
import { AnimatedPressable } from '@components/shared/animated'
import { commonStyles } from '@utils/stylesheet'
import SyncDetector from '@components/sensors/sync-detect'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import FastingClock from '@components/fasting-clock'
import FastingActivator from '@components/fasting-activator'
import FastingRecords from '@components/timer-fasting-records'
import Screen from '@components/shared/screen'
import SuggestionPopup from '@components/shared/popup/suggestion'
import withFastingState from '@hocs/withFastingState'

const { hrz } = commonStyles

const MainTop = withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }) => {
	const { currentPlan, startTimeStamp, endTimeStamp } = useSelector((state: AppStore) => state.fasting)
	const navigation = useNavigation<any>()

	return (
		isViewable && 
		<View style={styles.mainTop}>
			<SyncDetector />
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

const Tips = withVisiblitySensor(
	withFastingState(({
		isFasting, 
		isViewable, 
		animateValue
	}: { 
		isFasting: boolean,
		isViewable: boolean, 
		animateValue: Animated.Value 
	}): JSX.Element => {

	const { setPopup } = useContext<any>(PopupContext)
	return (
		isViewable && (
		isFasting && 
		<View style={styles.tips}>
			<AnimatedPressable onPress={() => setPopup(SuggestionPopup)} style={{
				...styles.tip,
				opacity: animateValue,
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1],
					outputRange: [-50, 0]
				}) }]
			}}>
				<View style={{...hrz, marginBottom: vS(-7) }}>
					<PrimaryBookIcon style={styles.Ic} width={hS(28)} height={vS(28)} />
					<Text style={styles.tipText}>Tips during fasting period</Text>
				</View>
				<BackIcon style={styles.redirectIcon} width={10} height={10} />
			</AnimatedPressable>
		</View> || <></>) || <View style={styles.tips} />
	)
}))

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
	Ic: { marginBottom: vS(5) },

	tips: {
		width: hS(370),
		marginTop: vS(16),
		height: vS(200)
	},

	tip: {
		width: '100%',
		paddingVertical: vS(30),
		paddingHorizontal: hS(24),
		elevation: 5,
		shadowColor: `rgba(${darkRgb.join(', ')}, .3)`,
		borderRadius: hS(24),
		marginTop: vS(8),
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},

	tipText: {
		fontFamily: 'Poppins-SemiBold', 
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2,
		marginLeft: hS(12)
	},	

	redirectIcon: {
		transform: [{ rotate: '180deg' }],
		marginBottom: vS(-4)
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
