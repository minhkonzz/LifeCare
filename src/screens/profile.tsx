import { memo, useEffect, useRef, useContext } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { ClockIcon, LogoutIcon, SettingIcon } from '@assets/icons'
import { useNavigation } from '@react-navigation/native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import LatestBMI from '@components/profile-latest-bmi'
import FastingRecords from '@components/profile-fasting-records'
import HydrateRecords from '@components/profile-hydrate-records'
import BodyMeasure from '@components/body-measure-profile'
import Weight from '@components/profile-weight'
import Screen from '@components/shared/screen'
import Backup from '@components/profile-backup'
import ProfileRedirect from '@components/profile-redirect'
import { PopupContext } from '@contexts/popup'
import LogoutPopup from '@components/shared/popup-content/logout'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: lightHex, rgb: lightRgb } = Colors.lightPrimary

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const ProfileUser = memo(({ isViewable }: { isViewable: boolean }) => {
	const { setPopup } = useContext<any>(PopupContext)

	return (
		isViewable && 
		<View style={[styles.profileUser, styles.horz]}>
			<View style={styles.horz}>
				<Image style={styles.avatar} source={require('../assets/images/UserAvatar.png')} />
				<View style={styles.personalTexts}>
					<Text style={styles.name}>Minh Pham</Text>
					<Text style={styles.email}>minhphm37@gmail.com</Text>
				</View>
			</View>
			<TouchableOpacity 
				style={styles.logout} 
				activeOpacity={.7}
				onPress={() => setPopup(LogoutPopup)}>
				<LogoutIcon width={hS(18)} height={vS(20)} />
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>
		</View> || <View style={styles.profileUser} />
	)
})

const PlanUpgrade = memo(({ isViewable }: { isViewable: boolean }) => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 1 || 0, 
			duration: 1010, 
			useNativeDriver: true
		}).start()
	}, [isViewable])

	return (
		isViewable &&
		<AnimatedLinearGradient
			style={{...styles.horz, ...styles.upgradePlan, opacity: animateValue }}
			colors={[`rgba(${lightRgb.join(', ')}, .6)`, lightHex]}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}>
			<Animated.View style={{
				opacity: animateValue, 
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [-50, 0]
				}) }]
			}}>
				<Text style={styles.upgradePlanShortDesc}>Upgrade to Pro</Text>
				<Text style={styles.upgradePlanLongDesc}>Unlock all features with upgraded plan</Text>
			</Animated.View>
			<AnimatedTouchableOpacity 
				style={[styles.upgradePlanButton, {
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [50, 0]
					}) }]
				}]} 
				activeOpacity={.7}>
				<Text style={styles.upgradePlanButtonText}>Upgrade</Text>
			</AnimatedTouchableOpacity>
		</AnimatedLinearGradient> || <View style={styles.upgradePlan} />
	)	
})

const TimelineRef = memo(({ isViewable }: { isViewable: boolean }) => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
	const navigation = useNavigation<any>()

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 1 || 0, 
			duration: 1010, 
			useNativeDriver: true
		}).start()
	}, [isViewable])

	return (
		isViewable && 
		<AnimatedTouchableOpacity 
			style={{
				opacity: animateValue,
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [-50, 0]
				}) }]
			}}
			onPress={() => navigation.navigate('timeline')}>
			<ProfileRedirect title='Timeline'>
				<ClockIcon width={hS(19)} height={vS(19)} />
			</ProfileRedirect>
		</AnimatedTouchableOpacity> || <View style={styles.redirect} />
	)
})

const SettingRef = memo(({ isViewable }: { isViewable: boolean }) => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
	const navigation = useNavigation<any>()

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 1 || 0, 
			duration: 840, 
			delay: 100, 
			useNativeDriver: true
		}).start()
	}, [isViewable])

	return (
		isViewable && 
		<AnimatedTouchableOpacity 
			style={{
				opacity: animateValue,
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [-50, 0]
				}) }]
			}}
			onPress={() => navigation.navigate('setting')}>
			<ProfileRedirect title='Setting'>
				<SettingIcon width={hS(20)} height={vS(20)} />
			</ProfileRedirect>
		</AnimatedTouchableOpacity> || <View style={styles.redirect} />
	)
})

export default (): JSX.Element => (
	<Screen paddingHorzContent header='tab' title='Me' content={[
		ProfileUser, 
		Backup, 
		PlanUpgrade, 
		LatestBMI, 
		FastingRecords, 
		Weight, 
		HydrateRecords, 
		BodyMeasure,
		TimelineRef, 
		SettingRef
	]} />
)

const styles = StyleSheet.create({	
	container: { flex: 1 },

	horz: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	profileUser: {
		width: hS(366),
		height: vS(100),
		justifyContent: 'space-between',
		marginTop: vS(92)
	},

	personalTexts: {
		marginLeft: hS(17)
	},

	avatar: {
		width: hS(60),
		height: vS(60),
		borderRadius: hS(22)
	},

	name: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(15),
		color: darkHex,
		letterSpacing: .2
	},

	email: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(9),
		color: darkHex,
		marginTop: vS(3),
		letterSpacing: .2
	},

	logout: {
		alignItems: 'center'
	},

	logoutText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(10),
		color: darkHex,
		marginTop: vS(5),
		letterSpacing: .2
	},

	upgradePlan: {
		width: hS(370),
		height: vS(76),
		paddingLeft: hS(20),
		paddingRight: hS(10),
		borderRadius: hS(24),
		marginTop: vS(24), 
		justifyContent: 'space-between'
	},

	upgradePlanShortDesc: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(15),
		color: darkHex,
		letterSpacing: .2
	},

	upgradePlanLongDesc: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(9),
		color: darkHex,
		marginTop: vS(2)
	},

	upgradePlanButton: {
		width: hS(124),
		height: vS(56),
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: hS(24),
		elevation: 5, 
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
	},

	upgradePlanButtonText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(12),
		color: darkHex
	},

	redirect: { height: vS(68) }
})
