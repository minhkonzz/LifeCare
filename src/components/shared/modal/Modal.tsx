import { FC, ReactNode, useState, useRef } from 'react'
import { View, StyleSheet, Animated, Platform, StatusBar } from 'react-native'
import { horizontalScale, verticalScale } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight' 

const darkPrimary: string = Colors.darkPrimary.hex

interface ModalProps {
    title: string,
    children?: ReactNode 
}

export default (): FC => {

    const bottomBarHeight = useDeviceBottomBarHeight()
    const opacity = useRef<Animated.Value>(new Animated.Value(0)).current
    const translationY = useRef<Animated.Value>(new Animated.Value(0)).current

    const translateModal = () => {}

    return (
	<Animated.View style={[styles.overlay, { paddingBottom: bottomBarHeight }]}>
	    <Animated.View style={styles.modal}>
		<View style={styles.header}>
		    
		</View>
	    </Animated.View>
	</Animated.View>
    )
}

const styles = StyleSheet.create({
    overlay: {
	paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },

    modal: {
	paddingHorizontal: horizontalScale(22), 
	paddingBottom: verticalScale(17)
    }, 

    header: {
	flexDirection: 'row', 
	justifyContent: 'space-between', 
	alignItems: 'center',
	paddingVertical: verticalScale(11)
    }, 

    headerTitle: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(16), 
	color: darkPrimary
    }
})

