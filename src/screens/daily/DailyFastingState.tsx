import { FC, useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Animated,
    Pressable
} from 'react-native'
import { horizontalScale, verticalScale } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import BackIcon from '@assets/icons/goback.svg'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): FC => {
    return (
	<Pressable onPress={() => {}}>
	    <LinearGradient
	        colors={[`rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`, darkPrimary]}
		start={{ x: .5, y: 0 }}
		end={{ x: .52, y: .5 }}
		style={styles.container}>
		<View style={styles.main}>
		    <View style={styles.circle}>
			<Text style={styles.progressText}>99%</Text>
		    </View>
		    <View style={styles.mainTexts}>
			<Text style={styles.t1}>You're fasting</Text>
			<Text style={styles.t2}>Elapsed time</Text>
			<Text style={styles.t3}>15:58:22</Text>
			<Text style={styles.t4}>Period will end at 11:30 today</Text>
		    </View>
		</View>
		<BackIcon style={styles.redirectIcon} width={horizontalScale(8)} height={verticalScale(14)} />
	    </LinearGradient>
	</Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
    	flexDirection: 'row',
    	width: horizontalScale(365),
	height: verticalScale(111),
	borderRadius: 500,
	paddingLeft: horizontalScale(10),
	paddingRight: horizontalScale(49),
	justifyContent: 'space-between', 
	alignItems: 'center', 
	elevation: 20, 
	shadowColor: darkPrimary
    },

    main: {
        height: '100%',
	flexDirection: 'row',
	alignItems: 'center'
    },

    mainTexts: {
	paddingTop: verticalScale(6),
	marginLeft: horizontalScale(12), 
	height: '100%'
    }, 

    circle: {
	width: horizontalScale(92),
	height: verticalScale(92), 
	borderWidth: horizontalScale(8), 
	borderRadius: 500,
	borderColor: Colors.primary.hex, 
	justifyContent: 'center', 
	alignItems: 'center', 
	backgroundColor: '#fff'
    }, 

    progressText: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(20), 
	color: darkPrimary,
	letterSpacing: .2, 
	marginTop: verticalScale(4)
    }, 

    t1: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(16), 
	color: '#fff',
	letterSpacing: .2
    }, 

    t2: {
	fontFamily: 'Poppins-Medium', 
	fontSize: horizontalScale(8), 
	color: '#fff', 
	letterSpacing: .2, 
	marginTop: verticalScale(-2)
    }, 

    t3: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(24), 
	color: '#fff', 
	letterSpacing: 2, 
	marginTop: verticalScale(-2)
    }, 

    t4: {
	fontFamily: 'Poppins-Regular', 
	fontSize: horizontalScale(8), 
	color: '#fff', 
	letterSpacing: .2, 
	paddingHorizontal: horizontalScale(10), 
	paddingVertical: verticalScale(3), 
	backgroundColor: `rgba(255, 255, 255, .12)`,
	borderRadius: 200, 
	marginTop: verticalScale(-3)
    },

    redirectIcon: {
	transform: [{ rotate: '180deg' }]
    }
})
