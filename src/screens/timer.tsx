import { memo, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import BackIcon from '@assets/icons/goback.svg'
import FastingClock from '@components/fasting-clock'
import FastingActivator from '@components/fasting-activator'
import FastingRecords from '@components/timer-fasting-records'
import Screen from '@components/shared/screen'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

const MainTop = memo(({ isViewable }: { isViewable: boolean }) => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
	const navigation = useNavigation()

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 1 || 0, 
			duration: 1010, 
			useNativeDriver: true
		}).start()
	}, [isViewable])

	return (
		isViewable && 
		<View style={styles.mainTop}>
			<Animated.Text style={[
				styles.mainTopTitle, 
				{
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-100, 0]
					}) }]
				}
			]}>
				You're fasting now
			</Animated.Text>
			<Animated.View style={[
				styles.plans, 
				{
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({ 
						inputRange: [0, 1], 
						outputRange: [-100, 0]
					}) }]
				}
			]}>
				<Pressable style={styles.plansBox} onPress={() => navigation.navigate('plans')}>
					<Text style={styles.plansBoxText}>16:8 Intermittent Fasting plan</Text>
					<BackIcon
						style={{ transform: [{ rotate: '-90deg' }], marginLeft: hS(9.7) }}
						width={hS(5)}
						height={vS(10)}
					/>
				</Pressable>
				<Pressable style={styles.planRef} onPress={() => { }}>
					<Text style={styles.planRefText}>?</Text>
				</Pressable>
			</Animated.View>
		</View> || <View style={styles.mainTop} />
	)
})

export default (): JSX.Element => {
	return (
		<Screen header='tab' title='Timer' paddingHorzContent content={[
			MainTop,
			FastingClock,
			FastingActivator,
			FastingRecords
		]} />
	)
}

const styles = StyleSheet.create({
	mainTop: {
		height: vS(180), 
		alignItems: 'center',
		marginTop: vS(35),
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
		paddingVertical: vS(12),
		paddingHorizontal: hS(13),
		elevation: 14,
		shadowColor: `rgba(${darkRgb.join(', ')}, .3)`
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
	}
})
