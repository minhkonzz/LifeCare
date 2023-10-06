import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import SettingIcon from '@assets/icons/setting.svg'
import LogoutIcon from '@assets/icons/logout-red.svg'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import LatestBMI from '@components/latest-bmi'
import FastingRecords from '@components/fasting-records'
import HydrateRecords from '@components/hydrate-records'
import Screen from '@components/shared/screen'
import TabHeader from '@components/tab-header'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	return (
		<>
			<Screen scroll paddingHorzContent>
				<View style={[styles.horz, styles.horzFullWidthBetween]}>
					<View style={styles.horz}>
						<Image style={styles.avatar} source={require('../assets/images/UserAvatar.png')} />
						<View style={styles.personalTexts}>
							<Text style={styles.name}>Minh Pham</Text>
							<Text style={styles.email}>minhphm37@gmail.com</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.logout} activeOpacity={.8} onPress={() => { }}>
						<LogoutIcon width={hS(18)} height={vS(20)} />
						<Text style={styles.logoutText}>Logout</Text>
					</TouchableOpacity>
				</View>
				<LinearGradient
					style={[styles.horz, styles.horzFullWidthBetween, styles.upgradePlan]}
					colors={[`rgba(${Colors.lightPrimary.rgb.join(', ')}, .6)`, Colors.lightPrimary.hex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .5, y: 1 }}>
					<View>
						<Text style={styles.upgradePlanShortDesc}>Upgrade to Pro</Text>
						<Text style={styles.upgradePlanLongDesc}>Unlock all features with upgraded plan</Text>
					</View>
					<TouchableOpacity style={styles.upgradePlanButton} onPress={() => { }}>
						<Text style={styles.upgradePlanButtonText}>Upgrade</Text>
					</TouchableOpacity>
				</LinearGradient>
				<LatestBMI />
				<FastingRecords />
				<HydrateRecords />
			</Screen>
			<TabHeader title='Me' />
		</>
	)
}

const styles = StyleSheet.create({
	horz: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	horzFullWidthBetween: {
		width: '100%', 
		justifyContent: 'space-between'
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
		color: darkPrimary,
		letterSpacing: .2
	},

	email: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(9),
		color: darkPrimary,
		marginTop: vS(3),
		letterSpacing: .2
	},

	logout: {
		alignItems: 'center'
	},

	logoutText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(10),
		color: darkPrimary,
		marginTop: vS(5),
		letterSpacing: .2
	},

	upgradePlan: {
		height: vS(76),
		paddingLeft: hS(20),
		paddingRight: hS(10),
		borderRadius: hS(24),
		marginTop: vS(24)
	},

	upgradePlanShortDesc: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(15),
		color: darkPrimary,
		letterSpacing: .2
	},

	upgradePlanLongDesc: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(9),
		color: darkPrimary,
		marginTop: vS(2),
		letterSpacing: .2
	},

	upgradePlanButton: {
		width: hS(124),
		height: vS(56),
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: hS(24)
	},

	upgradePlanButtonText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(12),
		color: darkPrimary
	}
})
