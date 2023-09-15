import { FC, useState } from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    Animated, 
    TouchableOpacity, 
    Pressable
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale, verticalScale } from '@utils/responsive'
import WhitePlusIcon from '@assets/icons/white_plus.svg'
import LinearGradient from 'react-native-linear-gradient'

const darkPrimary: string = Colors.darkPrimary.hex

const DailyItem: FC = () => {
    return (
	<View style={styles.dailyItem}>
	    <View>
		<Text style={styles.dailyItemName}>Chicken, ground, with additives, raw</Text>
		<Text style={styles.dailyItemValue}>25 kcal, 100g</Text>
	    </View>
	    <Pressable style={styles.threedots}>
		<View style={styles.dot} />
		<View style={[styles.dot, { marginLeft: horizontalScale(3) }]} />
		<View style={[styles.dot, { marginLeft: horizontalScale(3) }]} />
	    </Pressable>
	</View>
    )
}

const ProgressCircle: FC = () => {
    return (
	<View style={styles.progressCircle}>
	    <View style={styles.progressCircleTexts}>
		<Text style={styles.progressCircleTitle}>Carbs</Text>
		<Text style={styles.percentText}>0%</Text>
	    </View>
	</View>
    )
}

export default (): FC => {
    return (
	<View style={styles.container}>
	    <View style={styles.header}>
		<View style={styles.headerLeft}>
		    <Text style={styles.headerTitle}>Meal</Text>
		    <Text style={styles.headerCaloriesAmount}>25 kcal</Text>
		</View>
		<Pressable activeOpacity={.7} onPress={() => {}}>                         
		    <LinearGradient 
		    	style={styles.primaryPlusCircleButton}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}
			colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}>
		        <WhitePlusIcon width={horizontalScale(12)} height={verticalScale(12)} />
		    </LinearGradient>
		</Pressable>
	    </View>
	    <View style={styles.processes}>
		<ProgressCircle />
		<ProgressCircle />
		<ProgressCircle />
	    </View>
	    <DailyItem />
	</View>
    )
}

const styles = StyleSheet.create({
    processes: {
	alignSelf: 'center',
	paddingTop: verticalScale(12), 
	flexDirection: 'row'
    },

    progressCircle: {
	width: horizontalScale(55), 
	height: verticalScale(55),
	borderWidth: horizontalScale(5), 
	borderColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .15)`, 
	justifyContent: 'center', 
	alignItems: 'center',
	borderRadius: 500, 
	marginHorizontal: horizontalScale(6)
    },

    progressCircleTexts: {
	alignItems: 'center'
    },

    progressCircleTitle: {
	fontFamily: 'Poppins-Medium', 
	fontSize: horizontalScale(7), 
	color: darkPrimary, 
	letterSpacing: .2
    },

    percentText: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(10),
	color: darkPrimary
    },

    dailyItem: {
       width: '100%',
       paddingVertical: verticalScale(16), 
       flexDirection: 'row', 
       justifyContent: 'space-between', 
       alignItems: 'center', 
       paddingHorizontal: horizontalScale(16)
    },

    dailyItemName: {
	fontFamily: 'Poppins-Medium', 
	fontSize: horizontalScale(10), 
	color: darkPrimary, 
	letterSpacing: .2
    },

    dailyItemValue: {
	fontFamily: 'Poppins-Regular', 
	fontSize: horizontalScale(9), 
	color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .7)`,
	letterSpacing: .2, 
	marginTop: verticalScale(4)
    },

    container: {
        marginTop: verticalScale(45),
    	width: horizontalScale(365),
    	height: verticalScale(196),
	paddingVertical: verticalScale(10),
	borderRadius: horizontalScale(24),
	borderWidth: .4,
	borderColor: 'gray'
    }, 

    header: {
        width: '100%',
	flexDirection: 'row', 
	justifyContent: 'space-between', 
	alignItems: 'center', 
	paddingLeft: horizontalScale(16),
	paddingRight: horizontalScale(8)
    },

    headerLeft: {
	flexDirection: 'row', 
	alignItems: 'center'
    },

    headerTitle: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(15), 
	color: darkPrimary, 
	letterSpacing: .2
    },

    headerCaloriesAmount: {
	fontFamily: 'Poppins-Medium', 
	fontSize: horizontalScale(12), 
	letterSpacing: .2, 
	color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`, 
	marginLeft: horizontalScale(12)
    },

    primaryPlusCircleButton: {
	width: horizontalScale(30), 
	height: verticalScale(30), 
	borderRadius: 300, 
	justifyContent: 'center', 
	alignItems: 'center'
    },

    threedots: {
	flexDirection: 'row', 
	alignItems: 'center'
    }, 

    dot: {
        borderRadius: 10,
	width: horizontalScale(5), 
	height: verticalScale(5), 
	backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`
    }
})
