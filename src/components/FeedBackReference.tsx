import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '@components/shared/button/Button'
import { Colors } from '@utils/constants/colors'
import { horizontalScale, verticalScale } from '@utils/responsive'

const darkPrimary: string = Colors.darkPrimary.rgb.join(', ')

export default (): FC => {
    return (
	<View style={styles.container}>
	    <Text style={styles.title}>What else do you want to know?</Text>
	    <Button title='Feedback' size='medium' bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]} />
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
    	backgroundColor: '#fff',
	width: horizontalScale(365), 
	height: verticalScale(135), 
	borderRadius: horizontalScale(32), 
	elevation: 20, 
	shadowColor: `rgba(${darkPrimary}, .24)`,
	alignItems: 'center',
	justifyContent: 'space-between', 
	paddingVertical: verticalScale(22),
	marginTop: verticalScale(36)
    },

    title: {
	color: `rgb(${darkPrimary})`, 
	fontFamily: 'Poppins-Medium', 
	fontSize: horizontalScale(14), 
	letterSpacing: .2
    }
})
