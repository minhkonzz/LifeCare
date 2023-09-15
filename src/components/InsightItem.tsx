import { FC } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    Animated
} from 'react-native' 

import { Colors } from '@utils/constants/colors'
import { horizontalScale, verticalScale } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

export default (): FC => {
    return (
	<View style={styles.container}>
	    <Image style={styles.background} source={require('../assets/images/insightBackground.png')}/>
	    <LinearGradient 
	    	style={styles.titleWrapper}
		start={{ x: .5, y: 0 }}
		end={{ x: .5, y: .8 }}
		colors={[`rgba(0, 0, 0, .002)`, '#000']}>
		<Text style={styles.title}>How to break a fast: what to eat after fasting</Text>
	    </LinearGradient>
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
	width: horizontalScale(280),
	height: verticalScale(163)
    }, 

    background: {
	width: '100%',
	height: '100%',
	borderRadius: horizontalScale(32)
    }, 

    titleWrapper: {
	position: 'absolute', 
	bottom: 0, 
	left: 0, 
	right: 0,
	height: verticalScale(76),  
	paddingVertical: verticalScale(11), 
	paddingHorizontal: horizontalScale(14), 
	borderBottomLeftRadius: horizontalScale(32), 
	borderBottomRightRadius: horizontalScale(32)
    },

    title: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(12), 
	color: '#fff', 
	lineHeight: verticalScale(20)
    }
})
