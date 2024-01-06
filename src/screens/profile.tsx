import { useContext } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { ClockIcon, LogoutIcon, SettingIcon } from '@assets/icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { lightHex, lightRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { PopupContext } from '@contexts/popup'
import { AnimatedTouchableOpacity, AnimatedLinearGradient } from '@components/shared/animated'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import LatestBMI from '@components/profile-latest-bmi'
import FastingRecords from '@components/profile-fasting-records'
import HydrateRecords from '@components/profile-hydrate-records'
import BodyMeasure from '@components/profile-body-measure'
import Weight from '@components/profile-weight'
import Screen from '@components/shared/screen'
import Backup from '@components/profile-backup'
import ProfileRedirect from '@components/profile-redirect'
import LogoutPopup from '@components/shared/popup/logout'
import useSession from '@hooks/useSession'

const Header = withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }): JSX.Element => {
	const { metadata } = useSelector((state: AppStore) => state.user)
	const { setPopup } = useContext<any>(PopupContext)
	const { userId } = useSession()

	if (userId) {
		const { name, email } = metadata
		return (
			isViewable && 
			<Animated.View style={{...styles.profileUser, ...styles.horz, opacity: animateValue}}>
				<View style={styles.horz}>
					<Animated.Image 
						style={{
							...styles.avatar, 
							opacity: animateValue,
							transform: [{ scale: animateValue.interpolate({
								inputRange: [0, 1],
								outputRange: [.8, 1]
							}) }] 
						}} 
						source={require('../assets/images/UserAvatar.png')} />
					<Animated.View style={{
						...styles.personalTexts, 
						opacity: animateValue, 
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1],
							outputRange: [20, 0]
						}) }]
					}}>
						<Text style={styles.name}>{name}</Text>
						<Text style={styles.email}>{email}</Text>
					</Animated.View>
				</View>
				<AnimatedTouchableOpacity 
					style={{
						...styles.logout, 
						opacity: animateValue, 
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1],
							outputRange: [50, 0]
						}) }] 
					}} 
					activeOpacity={.7}
					onPress={() => setPopup(LogoutPopup)}>
					<LogoutIcon width={hS(18)} height={vS(20)} />
					<Text style={styles.logoutText}>Logout</Text>
				</AnimatedTouchableOpacity>
			</Animated.View> || <View style={styles.profileUser} />
		)
	}

	return <Backup {...{ animateValue }} />
})

const PlanUpgrade = withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }) => {
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
				style={{...styles.upgradePlanButton,
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [50, 0]
					}) }]
				}} 
				activeOpacity={.7}>
				<Text style={styles.upgradePlanButtonText}>Upgrade</Text>
			</AnimatedTouchableOpacity>
		</AnimatedLinearGradient> || <View style={styles.upgradePlan} />
	)	
})

const TimelineRef = withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }) => {
	const navigation = useNavigation<any>()

	return (
		isViewable && 
		<ProfileRedirect title='Timeline' onPress={() => navigation.navigate('timeline')}>
			<ClockIcon width={hS(19)} height={vS(19)} />
		</ProfileRedirect> || <View style={styles.redirect} />
	)
})

const SettingRef = withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }) => {
	const navigation = useNavigation<any>()

	return (
		isViewable && 
		<ProfileRedirect title='Setting' onPress={() => navigation.navigate('setting')}>
			<SettingIcon width={hS(20)} height={vS(20)} />
		</ProfileRedirect> || <View style={styles.redirect} />
	)
})

export default (): JSX.Element => {
	return (
		<Screen paddingHorzContent header='tab' title='Me' content={[
			Header, 
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
}

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
