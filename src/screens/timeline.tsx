import { FC } from 'react'
import {
    View, 
    Text,
    StyleSheet, 
    Animated, 
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
// import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'

export default (): FC => {
    const bottomBarHeight: number = useDeviceBottomBarHeight()
    return (
	<View style={[styles.container, { paddingBottom: vS(27) + bottomBarHeight }]}>

	</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
	alignItems: 'center'
	paddingHorizontal: hS(24), 
	paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
    }
})
