import { FC } from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    Animated, 
    Pressable, 
    StatusBar, 
    TouchableOpacity, 
    ScrollView
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import LinearGradient from 'react-native-linear-gradient'
import BackIcon from '@assets/icons/goback-white.svg'
import EditPrimary from '@assets/icons/edit-primary.svg'
import EditWhite from '@assets/icons/edit-white.svg'

const TimeSetting: FC = () => {
    return (
	<View style={styles.fastingTimes}>
	    <View style={styles.planName}>
	    	<Text style={styles.planNameText}>16:8 Intermittent Fasting plan</Text>
	    </View>
	    <View style={{ width: '100%' }}>
		<View style={styles.timeSetting}>
		    <View style={styles.timeSettingTitle}>
			<View style={[styles.timeSettingDecor, { backgroundColor: Colors.primary.hex }]} />
			<Text style={styles.timeSettingTitleText}>Start</Text>
		    </View>
		    <View style={styles.timeSettingValue}>
			<Text style={styles.timeSettingValueText}>Today, 8:30 PM</Text> 
			<EditPrimary width={hS(16)} height={vS(16)} />
		    </View>
		</View>
		<View style={[styles.timeSetting, { marginTop: vS(28) }]}>
		    <View style={styles.timeSettingTitle}>
			<View style={[styles.timeSettingDecor, { backgroundColor: 'rgb(255, 155, 133)' }]} />
			<Text style={styles.timeSettingTitleText}>End</Text>
		    </View>
		    <View style={styles.timeSettingValue}>
			<Text style={styles.timeSettingValueText}>Today, 8:30 PM</Text> 
			<EditPrimary width={hS(16)} height={vS(16)} />
		    </View>
		</View>	
	    </View>
	    <Text style={styles.timeNote}>Please select the time you start fasting</Text>
	</View>
    )
}

const TrackWeight: FC = () => {
    return (
	<View style={styles.trackWeight}>
	    <View style={styles.trackWeightHeader}>
	        <View>
	  	    <Text style={styles.trackWeightTitle}>Track your weight</Text>
		    <View style={styles.trackWeightValue}>
		        <Text style={styles.trackWeightValueText}>64.5 kg</Text>
		        <Text style={styles.trackWeightValueNote}>until now</Text>
		    </View>
		</View>
		<TouchableOpacity
		    activeOpacity={.7}
		    onPress={() => {}}>
		    <LinearGradient
		        style={styles.trackWeightButton}
			colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}>
			<EditWhite width={hS(20)} height={vS(20)} />
		    </LinearGradient>
		</TouchableOpacity>
	    </View>
	    <View style={styles.weightProcess}>
	        <View style={styles.weightProcessBar}>
		    <LinearGradient 
		        style={styles.weightProcessValueBar} 
			colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]} 
			start={{ x: .5, y: 0 }} 
			end={{ x: .5, y: 1 }} />
		</View>
		<View style={styles.weightProcessTexts}>
		    <Text style={styles.weightProcessText}>Starting: 89 kg</Text>
		    <Text style={styles.weightProcessText}>Goal: 62 kg</Text>
		</View>
	    </View>
	</View>
    )
}

export default (): FC => {
    const bottomBarHeight = useDeviceBottomBarHeight()
    return (
	<ScrollView contentContainerStyle={[styles.container, { paddingBottom: vS(27) + bottomBarHeight }]}>
	    <LinearGradient 
	        style={styles.primeDecor} 
		colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
		start={{ x: .5, y: 0 }}
		end={{ x: .5, y: 1 }} />

	    <View style={styles.header}>
	        <BackIcon style={styles.backIcon} width={hS(9.2)} height={vS(16)} />
		<Text style={styles.headerTitle}>Total fasting time</Text>
		<View style={styles.timeTitle}>
		    <Text style={styles.numTitle}>16</Text>
		    <Text style={styles.symbolTitle}>h</Text>
		    <Text style={[styles.numTitle, { marginLeft: hS(17) }]}>24</Text>
		    <Text style={styles.symbolTitle}>m</Text>
		</View>
	    </View>
	    <TimeSetting />
	    <TrackWeight />
	    <View style={styles.bottom}>
		<TouchableOpacity
		    activeOpacity={.7}
		    onPress={() => {}}>
		    <LinearGradient
		        style={styles.bottomButton}
			colors={[`rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`, Colors.darkPrimary.hex]}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}>
			<Text style={styles.bottomButtonText}>Delete</Text>
		    </LinearGradient>
		</TouchableOpacity>
		<TouchableOpacity
		    activeOpacity={.7}
		    onPress={() => {}}>
		    <LinearGradient
		        style={styles.bottomButton}
			colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}>
			<Text style={styles.bottomButtonText}>Save</Text>
		    </LinearGradient>
		</TouchableOpacity>
	    </View>
	</ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    	flex: 1, 
	alignItems: 'center', 
	paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },

    primeDecor: {
	width: hS(800), 
	height: vS(800), 
	borderRadius: 600, 
	position: 'absolute', 
	top: vS(-466)
    }, 

    header: {
	width: '100%', 
	alignItems: 'center', 
	paddingHorizontal: hS(24)
    }, 

    backIcon: {
	alignSelf: 'flex-start', 
	marginTop: vS(28)
    },

    headerTitle: {
        fontFamily: 'Poppins-SemiBold', 
        fontSize: hS(22),
	color: '#fff', 
	letterSpacing: .2, 
	marginTop: vS(15)
    }, 

    timeTitle: {
	flexDirection: 'row', 
	alignItems: 'flex-end', 
	marginTop: vS(8), 
	marginLeft: hS(10)
    }, 

    numTitle: {
	fontFamily: 'Poppins-Bold', 
	fontSize: hS(50), 
	color: '#fff', 
	letterSpacing: .2
    }, 

    symbolTitle: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: hS(22), 
	color: '#fff', 
	marginLeft: hS(10), 
	marginBottom: vS(16)
    }, 

    bottom: {
        position: 'absolute',
	bottom: 0,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
	alignItems: 'center', 
	width: '100%', 
	elevation: 5, 
	shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .12)`, 
	paddingHorizontal: hS(22), 
	paddingVertical: vS(20)
    },

    bottomButton: {
	width: hS(172), 
	height: vS(72), 
	borderRadius: 100, 
	justifyContent: 'center', 
	alignItems: 'center'
    },

    bottomButtonText: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: hS(14), 
	color: '#fff',
	letterSpacing: .2
    },

    fastingTimes: {
        marginTop: vS(52), 
        backgroundColor: '#fff',
        alignItems: 'center', 
        paddingTop: vS(50),
	paddingBottom: vS(22), 
	paddingHorizontal: hS(24),
	width: hS(366),  
	elevation: 4, 
	shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`,
	borderRadius: hS(32)
    }, 

    planName: {
        position: 'absolute',
	top: vS(-20),
	width: hS(229), 
	height: vS(41), 
	elevation: 4, 
	shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`,
	borderRadius: hS(25), 
	justifyContent: 'center', 
	alignItems: 'center', 
	backgroundColor: '#fff'
    }, 

    planNameText: {
	fontFamily: 'Poppins-Medium', 
	fontSize: hS(12), 
	color: Colors.darkPrimary.hex,
	letterSpacing: .2
    },

    timeSetting: {
        flexDirection: 'row', 
	width: '100%',
	justifyContent: 'space-between',
	alignItems: 'center'
    },

    timeSettingTitle: {
	flexDirection: 'row', 
	alignItems: 'center'
    },

    timeSettingDecor: {
	width: hS(7), 
	height: vS(7), 
	borderRadius: hS(12)
    },

    timeSettingTitleText: {
	fontFamily: 'Poppins-Regular', 
	fontSize: hS(12),
	color: Colors.darkPrimary.hex, 
	letterSpacing: .2,
	marginLeft: hS(19)
    },

    timeSettingValue: {
	flexDirection: 'row', 
	alignItems: 'center'
    }, 

    timeSettingValueText: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: hS(12), 
	letterSpacing: .2, 
	color: Colors.primary.hex, 
	marginRight: hS(20)
    },

    timeNote: {
	fontFamily: 'Poppins-Regular', 
	fontSize: hS(11), 
	color: Colors.darkPrimary.hex, 
	marginTop: vS(18),
	letterSpacing: .2
    },

    trackWeight: {
        marginTop: vS(37),
        width: hS(366),
        backgroundColor: '#fff',
        paddingHorizontal: hS(22), 
	paddingVertical: vS(22),
        borderRadius: hS(32),
	height: vS(180),
	elevation: 4, 
	shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`
    }, 

    trackWeightHeader: { 
	flexDirection: 'row', 
	justifyContent: 'space-between'
    },

    trackWeightTitle: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: hS(16), 
	color: Colors.darkPrimary.hex,
	letterSpacing: .2
    },

    trackWeightValue: {
	flexDirection: 'row', 
	marginTop: vS(10)
    }, 

    trackWeightValueText: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: hS(28), 
	color: Colors.primary.hex, 
	letterSpacing: .2
    },

    trackWeightValueNote: {
	fontFamily: 'Poppins-Regular',
	fontSize: hS(12), 
	color: Colors.darkPrimary.hex,
	marginLeft: hS(6), 
	marginTop: vS(18)
    },

    trackWeightButton: {
	width: hS(52), 
	height: vS(52), 
	borderRadius: hS(22),
	justifyContent: 'center', 
	alignItems: 'center',
	elevation: 5, 
	shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`
    },

    weightProcess: {
	width: '100%', 
	marginTop: vS(16)
    }, 

    weightProcessBar: {
	width: '100%', 
	height: vS(12), 
	backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .1)`, 
        borderRadius: 45
    }, 

    weightProcessValueBar: {
	width: '60%', 
	height: '100%',
	borderRadius: 45
    },

    weightProcessTexts: {
	flexDirection: 'row', 
	justifyContent: 'space-between', 
	alignItems: 'center', 
	marginTop: vS(10)
    },

    weightProcessText: {
	fontFamily: 'Poppins-Regular', 
	fontSize: hS(10), 
	color: Colors.darkPrimary.hex, 
	letterSpacing: .2 
    }
})
