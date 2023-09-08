import { FC, useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import { horizontalScale, verticalScale } from '@utils/responsive'

const darkPrimary: string = Colors.darkPrimary.hex
const primaryHex: string = Colors.primary.hex

export default (): FC => {

    const opacity: number = useRef<Animated.Value>(new Animated.Value(0)).current

    useEffect(() => {
	Animated.timing(opacity, {
	    toValue: 1, 
	    duration: 500, 
	    useNativeDriver: true
	}).start()
    }, [])

    return (
	<Animated.View style={{ opacity }}>
	    <LinearGradient
	        style={styles.container}
	        colors={[`rgba(${Colors.lightPrimary.rgb.join(', ')}, .6)`, Colors.lightPrimary.hex]}
		start={{ x: .5, y: 0 }}
		end={{ x: .5, y: 1 }}>
	        <View style={styles.header}>
	            <Text style={styles.headerMainText}>Recent Fasting</Text>
	    	    <View style={styles.headerNotes}>
			<View style={styles.headerNotePart}>
			    <LinearGradient
			        style={styles.headerNoteCircle}
			        colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, primaryHex]}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }} />
			    <Text style={styles.headerNoteText}>Completed</Text>
			</View>
			<View style={[styles.headerNotePart, { marginLeft: horizontalScale(38) }]}>
			    <View style={[styles.headerNoteCircle, { backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(' ,')}, .28)` }]} />
			    <Text style={styles.headerNoteText}>24 hours</Text>
			</View>
		    </View>
	        </View>
	    </LinearGradient>
	</Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
	marginTop: verticalScale(24), 
	width: horizontalScale(370), 
	height: verticalScale(282), 
	paddingHorizontal: horizontalScale(18),
	paddingVertical: verticalScale(16),
	borderRadius: horizontalScale(24)
    }, 

    headerMainText: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(15),
	color: darkPrimary, 
	letterSpacing: .2
    }, 

    headerNotes: {
	marginTop: verticalScale(6), 
	flexDirection: 'row', 
	alignItems: 'center'
    },

    headerNotePart: {
	flexDirection: 'row',
	alignItems: 'center'
    },

    headerNoteText: {
	fontFamily: 'Poppins-Regular', 
	fontSize: horizontalScale(12), 
	letterSpacing: .2,
	color: darkPrimary, 
	marginLeft: horizontalScale(8), 
	marginTop: verticalScale(4)
    },

    headerNoteCircle: {
	width: horizontalScale(10), 
	height: verticalScale(10),
	borderRadius: 50
    }
})
