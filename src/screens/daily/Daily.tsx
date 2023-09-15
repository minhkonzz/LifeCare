import { FC, useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Animated, 
    TouchableOpacity, 
    Platform,
    StatusBar
} from 'react-native'

import ProgressCircle from '@components/shared/ProgressCircle'
import DailyNutrition from '@components/DailyNutrition'
import DailyMealTracker from '@components/DailyMealTracker'
import DailyFastingState from '@screens/daily/DailyFastingState'
import { Colors } from '@utils/constants/colors'
import { horizontalScale, verticalScale } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): FC => {
    const bottomBarHeight = useDeviceBottomBarHeight()
    return (
	<View style={[styles.container, { paddingBottom: bottomBarHeight }]}>
	    <View style={styles.header}>
		<Text style={styles.headerTitle}>Daily</Text>
	    </View>
	    <DailyFastingState />
	    <ProgressCircle percentage={75} radius={20} strokeWidth={5} color='orange'/>
	    <DailyMealTracker />
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
	flex: 1, 
	backgroundColor: '#fff',
	alignItems: 'center',
	paddingHorizontal: horizontalScale(24), 
	paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    },

    header: {
	width: '100%', 
	justifyContent: 'center', 
	alignItems: 'center', 
	paddingVertical: verticalScale(22)
    },

    headerTitle: {
	fontSize: horizontalScale(18), 
	fontFamily: 'Poppins-SemiBold', 
	color: darkPrimary, 
	letterSpacing: .2
    }
})
