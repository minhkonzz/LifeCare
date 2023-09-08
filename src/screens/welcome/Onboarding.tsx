import React from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Animated, 
    Dimensions, 
    PixelRatio
} from 'react-native'

import { horizontalScale } from '@utils/responsive' 

const { width, height } = Dimensions.get('window')
const widthBase: number = 414
const heightBase: number = 840

export default (): React.FC => {
    return (
	<View style={styles.container}>
	    <Text style={styles.text}>Settings</Text>
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
	flex: 1, 
	paddingTop: 20,
	alignItems: 'center'
    }, 

    text:{
    	fontSize: horizontalScale(18),
	fontFamily: 'Poppins-Medium'
    }
})
