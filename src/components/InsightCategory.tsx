import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale, verticalScale } from '@utils/responsive'
import BackIcon from '@assets/icons/goback.svg' 
import InsightItem from '@components/InsightItem'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): FC => {
    return (
	<View style={styles.container}>
	    <View style={styles.header}>
		<Text style={styles.title}>Most popular</Text>
	        <View style={styles.viewall}>
	            <Text style={styles.viewallText}>See all</Text>
		    <BackIcon style={styles.viewallIcon} width={horizontalScale(5)} height={verticalScale(8)} />
	        </View>
	    </View>
	    <InsightItem />
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
	width: '100%'
    }, 

    header: {
	flexDirection: 'row', 
	alignItems: 'center', 
	justifyContent: 'space-between', 
	marginBottom: verticalScale(15),
	paddingHorizontal: horizontalScale(24)
    }, 

    title: {
	color: darkPrimary, 
	fontFamily: 'Poppins-SemiBold',
	fontSize: horizontalScale(18), 
	letterSpacing: .2
    },

    viewall: {
        flexDirection: 'row',
	alignItems: 'center'
    },

    viewallText: {
    	marginRight: horizontalScale(10),
	fontFamily: 'Poppins-Regular', 
	fontSize: horizontalScale(12), 
	color: darkPrimary
    }, 

    viewallIcon: {
	transform: [{ rotate: '180deg' }], 
	marginBottom: verticalScale(3)
    }
})
