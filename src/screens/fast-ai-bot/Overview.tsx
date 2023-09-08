import { FC, useState, useRef, useEffect } from 'react'
import { View, Text, Image, Animated, StyleSheet, StatusBar, Platform } from 'react-native'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { Colors } from '@utils/constants/colors'
import { horizontalScale, verticalScale } from '@utils/responsive' 
import Button from '@components/shared/button/Button'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): FC => {
    const bottomBarHeight: number = useDeviceBottomBarHeight()
    return (
	<View style={[styles.container, { paddingBottom: bottomBarHeight + verticalScale(27) }]}>
	    <View style={styles.horizontalCentered}>
	        <Image style={styles.fastAIInterface} source={require('../../assets/lottie/FastAIBotInterface.gif')} />
	    	<Text style={styles.mainTitle}>AI-based assistant for health care</Text>
	    </View>
	    <View style={styles.horizontalCentered}>
	    	<Text style={styles.smallTitle}>{`Lorem ipsum is simly dummy text of the\nprinting and typesetting industry`}</Text>
		<Button title='Start' size='large' bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]} />
	    </View>
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
	flex: 1, 
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
	paddingHorizontal: horizontalScale(24)
    }, 

    fastAIInterface: {
	width: horizontalScale(400), 
	height: verticalScale(412)
    }, 

    mainTitle: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(28),
	color: darkPrimary, 
	letterSpacing: .2, 
	marginTop: verticalScale(-32), 
	textAlign: 'center'
    },

    smallTitle: {
        textAlign: 'center',
        lineHeight: 21,
	fontFamily: 'Poppins-Medium', 
	fontSize: horizontalScale(14), 
	color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`, 
	letterSpacing: .2,
	marginBottom: verticalScale(40)
    },

    horizontalCentered: {
	alignItems: 'center'
    }
})
