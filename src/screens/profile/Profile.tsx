import { FC, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, StatusBar, Platform } from 'react-native'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import SettingIcon from '@assets/icons/setting'
import LogoutIcon from '@assets/icons/logout'
import { horizontalScale, verticalScale } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import LatestBMI from '@screens/profile/LatestBMI'
import RecentFasting from '@screens/profile/RecentFasting'
import HydrateRecords from '@screens/profile/HydrateRecords'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): FC => {
    const bottomBarHeight: number = useDeviceBottomBarHeight()
    return (
	<View style={[styles.container, { paddingBottom: bottomBarHeight }]}>
	    <View style={[styles.fullHorizontal, styles.header]}>
		<View style={{ width: horizontalScale(20) }}/>
		<Text style={styles.headerTitle}>Me</Text>
		<SettingIcon width={horizontalScale(20)} height={verticalScale(20)} />
	    </View>

	    {/* isLoggedIn && */}
	    <View style={styles.fullHorizontal}>
		<View style={styles.personal}>
		    <Image style={styles.avatar} source={require('../../assets/images/UserAvatar.png')} />
		    <View style={styles.personalTexts}>
		    	<Text style={styles.name}>Minh Pham</Text>
			<Text style={styles.email}>minhphm37@gmail.com</Text>
		    </View>
		</View>
		<TouchableOpacity style={styles.logout} activeOpacity={.8} onPress={() => {}}>
		    <LogoutIcon width={horizontalScale(18)} height={verticalScale(20)} />
		    <Text style={styles.logoutText}>Logout</Text>
		</TouchableOpacity>
	    </View>
	    <LinearGradient 
	    	style={styles.upgradePlan}
		colors={[`rgba(${Colors.lightPrimary.rgb.join(', ')}, .6)`, Colors.lightPrimary.hex]}
		start={{ x: .5, y: 0 }}
		end={{ x: .5, y: 1 }}>
		<View style={styles.upgradePlanDesc}>
		    <Text style={styles.upgradePlanShortDesc}>Upgrade to Pro</Text>
		    <Text style={styles.upgradePlanLongDesc}>Unlock all features with upgraded plan</Text>
		</View>
		<TouchableOpacity style={styles.upgradePlanButton} onPress={() => {}}>
		    <Text style={styles.upgradePlanButtonText}>Upgrade</Text>
		</TouchableOpacity>
	    </LinearGradient>
	    <LatestBMI />
	    <RecentFasting />
	    <HydrateRecords />
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
	alignItems: 'center',
	paddingHorizontal: horizontalScale(24),
	paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0, 
	backgroundColor: '#fff'
    }, 

    fullHorizontal: {
	width: '100%', 
	flexDirection: 'row', 
	justifyContent: 'space-between', 
	alignItems: 'center'
    },

    header: { 
	paddingVertical: verticalScale(22),
	marginBottom: verticalScale(11)
    },

    headerTitle: {
 	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(18), 
	color: darkPrimary
    }, 

    personal: {
	flexDirection: 'row',
	alignItems: 'center'
    },

    personalTexts: {
	marginLeft: horizontalScale(17)
    },

    avatar: {
	width: horizontalScale(60),
	height: verticalScale(60), 
	borderRadius: horizontalScale(22)
    },

    name: {
	fontFamily: 'Poppins-Medium',
	fontSize: horizontalScale(15),
	color: darkPrimary,
	letterSpacing: .2
    },

    email: {
    	fontFamily: 'Poppins-Medium',
	fontSize: horizontalScale(9),
	color: darkPrimary,
	marginTop: verticalScale(3),
	letterSpacing: .2
    },

    logout: {
	alignItems: 'center'	
    },

    logoutText: {
	fontFamily: 'Poppins-Medium',
	fontSize: horizontalScale(10),
	color: darkPrimary, 
	marginTop: verticalScale(5),
	letterSpacing: .2
    },

    upgradePlan: {
	flexDirection: 'row', 
 	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
	height: verticalScale(76),
	paddingLeft: horizontalScale(20),
	paddingRight: horizontalScale(10),
	borderRadius: horizontalScale(24),
	marginTop: verticalScale(24)
    },

    upgradePlanShortDesc: {
	fontFamily: 'Poppins-SemiBold',
	fontSize: horizontalScale(15),
	color: darkPrimary,
	letterSpacing: .2
    }, 

    upgradePlanLongDesc: {
	fontFamily: 'Poppins-Medium',
	fontSize: horizontalScale(9),
	color: darkPrimary,
	marginTop: verticalScale(2),
	letterSpacing: .2
    },

    upgradePlanButton: {
	width: horizontalScale(124),
	height: verticalScale(56), 
	backgroundColor: '#fff',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: horizontalScale(24)
    },

    upgradePlanButtonText: {
	fontFamily: 'Poppins-SemiBold',
	fontSize: horizontalScale(12),
	color: darkPrimary
    }
})
