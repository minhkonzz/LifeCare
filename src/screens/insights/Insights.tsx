import { FC, useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Animated,  
    Image, 
    Platform, 
    StatusBar 
} from 'react-native'

import InsightCategory from '@components/InsightCategory'
import FeedBackReference from '@components/FeedBackReference'

import { Colors } from '@utils/constants/colors'
import { horizontalScale, verticalScale } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import Button from '@components/shared/button/Button'
import InsightItem from '@components/InsightItem'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): FC => {
    const bottomBarHeight = useDeviceBottomBarHeight()

    return (
	<View style={[styles.container, { paddingBottom: bottomBarHeight }]}>
	    <View style={styles.header}>
		<Text style={styles.headerTitle}>Insights for you</Text>
	    </View>
	    <InsightCategory />
	    <FeedBackReference />
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
    	flex: 1, 
	alignItems: 'center',
	paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    }, 

    header: {
    	paddingVertical: verticalScale(22),
	justifyContent: 'center', 
	alignItems: 'center'
    }, 

    headerTitle: {
	fontFamily: 'Poppins-SemiBold',
	fontSize: horizontalScale(18),
	color: darkPrimary,
	letterSpacing: .2
    }
})
