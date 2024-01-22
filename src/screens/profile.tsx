import { useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { ClockIcon, LogoutIcon, SettingIcon } from '@assets/icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { lightHex, lightRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { PopupContext } from '@contexts/popup'
import { AnimatedTouchableOpacity } from '@components/shared/animated'
import { commonStyles } from '@utils/stylesheet'
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
import LinearGradient from 'react-native-linear-gradient'

const { hrz } = commonStyles

const Blank = () => <View style={styles.blank} />

const Header = (): JSX.Element => {
	const { metadata } = useSelector((state: AppStore) => state.user)
	const { setPopup } = useContext<any>(PopupContext)
	const { userId } = useSession()

	if (userId) {
		const { name, email } = metadata
		return ( 
			<View style={{...styles.profileUser, ...hrz}}>
				<View style={hrz}>
					<Image 
						style={styles.avatar} 
						source={require('../assets/images/UserAvatar.png')} />
					<View style={styles.personalTexts}>
						<Text style={styles.name}>{name}</Text>
						<Text style={styles.email}>{email}</Text>
					</View>
				</View>
				<AnimatedTouchableOpacity 
					style={styles.logout} 
					activeOpacity={.7}
					onPress={() => setPopup(LogoutPopup)}>
					<LogoutIcon width={hS(18)} height={vS(20)} />
					<Text style={styles.logoutText}>Logout</Text>
				</AnimatedTouchableOpacity>
			</View>
		)
	}
	return <></>
}

const PlanUpgrade = () => {
	return (
		<LinearGradient
			style={{...hrz, ...styles.upgradePlan }}
			colors={[`rgba(${lightRgb.join(', ')}, .6)`, lightHex]}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}>
			<View>
				<Text style={styles.upgradePlanShortDesc}>Upgrade to Pro</Text>
				<Text style={styles.upgradePlanLongDesc}>Unlock all features with upgraded plan</Text>
			</View>
			<TouchableOpacity style={styles.upgradePlanButton} activeOpacity={.7}>
				<Text style={styles.upgradePlanButtonText}>Upgrade</Text>
			</TouchableOpacity>
		</LinearGradient> 
	)	
}

const TimelineRef = () => {
	const navigation = useNavigation<any>()
	return (
		<ProfileRedirect title='Timeline' onPress={() => navigation.navigate('timeline')}>
			<ClockIcon width={hS(19)} height={vS(19)} />
		</ProfileRedirect> 
	)
}

const SettingRef = () => {
	const navigation = useNavigation<any>()
	return (
		<ProfileRedirect title='Setting' onPress={() => navigation.navigate('setting')}>
			<SettingIcon width={hS(20)} height={vS(20)} />
		</ProfileRedirect>
	)
}

export default (): JSX.Element => {
	return (
		<Screen paddingHorzContent header='tab' title='Me' content={[
			Blank,
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
	blank: { height: vS(65) },

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
