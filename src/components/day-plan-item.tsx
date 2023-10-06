import { FC } from 'react'
import {
    View,
    Text,
    StyleSheet, 
    Image
} from 'react-native'

import { Colors } from '@utils/responsive'
import { horizontalScale as hS, verticalScale as vS } from '@utils/constants/colors'
import RestaurantIcon from '@assets/icons/restaurant.svg'
import ElectroIcon from '@assets/icons/electro.svg'

const darkPrimary: string = Colors.darkPrimary.hex

type Props = {
    itemData: any
}

export default ({ itemData }): FC<Props> => {
    return (
	<View style={styles.container}>
	    <View>
		<Text style={styles.planCategory}>{item.plan_category_name}</Text>
		<Text style={styles.planName}>{`${item.hrs_fasting}-${item.hrs_eating}`}</Text>
  		<View style={{ marginTop: vS(16) }}>
		    <View style={styles.hrsDescWrapper}>
		        <ElectroIcon width={hS(8)} height={vS(10)} />
			<Text style={styles.hrsDesc}>{`${item.hrs_fasting} hours for fasting`}</Text>
		    </View>
		    <View style={[styles.hrsDescWrapper, { marginTop: vS(5) }]}>
		        <RestaurantIcon width={hS(9)} height={vS(9)} />
			<Text style={styles.hrsDesc}>{`${item.hrs_eating} hours for eating`}</Text>
		    </View>
		</View>
	    </View>
	    <Image style={styles.planDaysDecor} source={require('../assets/images/plan-num1.png')} />    
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
	justifyContent: 'space-between', 
	width: hS(257), 
	height: vS(148),
	elevation: 4, 
	shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`, 
	backgroundColor: '#fff', 
	borderRadius: hS(32), 
	paddingTop: vS(16), 
	paddingLeft: hS(18), 
	paddingRight: hS(11), 
	paddingBottom: vS(10),
	marginLeft: hS(24),
	marginTop: vS(4)	
    }, 

    planCategory: {
	fontFamily: 'Poppins-Regular', 
	fontSize: hS(8), 
	color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`,
	letterSpacing: .2
    }, 

    planName: {
	fontFamily: 'Poppins-Medium', 
	fontSize: hS(24), 
	color: darkPrimary, 
	letterSpacing: .2, 
	marginTop: vS(4)
    },

    hrsDesc: {
	marginLeft: hS(6), 
	fontFamily: 'Poppins-Regular', 
	fontSize: hS(9), 
	color: darkPrimary, 
	letterSpacing: .2
    }, 

    hrsDescWrapper: {
	flexDirection: 'row', 
	alignItems: 'center'
    }

    planDaysDecor: {
	width: hS(80), 
	height: vS(80),
	alignSelf: 'flex-end'
    }
})
