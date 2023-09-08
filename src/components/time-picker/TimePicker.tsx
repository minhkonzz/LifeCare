import { FC, useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { horizontalScale, verticalScale } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): FC => {
    return (
	<View style={styles.container}>
	    <View style={styles.numberInput}>
		<TextInput caretHidden style={styles.input} keyboardType='numeric' maxLength={2} />
	    </View>
	    <Text style={styles.timeAbbrevia}>h</Text>
	    <Text style={styles.colon}>:</Text>
	    <View style={styles.numberInput}>
	        <TextInput caretHidden style={styles.input} keyboardType='numeric' maxLength={2} />
	    </View>
	    <Text style={styles.timeAbbrevia}>m</Text>
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: horizontalScale(232),
	height: verticalScale(64),
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'flex-end',
	marginBottom: verticalScale(45),
	marginTop: verticalScale(23)
    }, 

    numberInput: {
	borderBottomWidth: 1,
	borderBottomColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .3)`
    },

    input: {
        marginBottom: verticalScale(-32),
        color: darkPrimary,
        width: horizontalScale(82),
        fontSize: horizontalScale(42),
	fontFamily: 'Poppins-Regular',
	textAlign: 'center',
	letterSpacing: 2
    }, 

    timeAbbrevia: {
 	fontFamily: 'Poppins-Medium',
	fontSize: horizontalScale(14),
	marginBottom: verticalScale(-9), 
	color: darkPrimary
    }, 

    colon: {
	fontSize: horizontalScale(22),
	fontFamily: 'Poppins-Bold',
	color: darkPrimary,
	marginBottom: verticalScale(-12)
    }
})
