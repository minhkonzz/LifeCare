import { FC, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Animated, Pressable } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale, verticalScale } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

const darkPrimary: string = Colors.darkPrimary.hex
const fastingRecordsData = require('../assets/data/timer-fasting-records.json')

export default (): FC => {
    return (
	<View style={styles.container}>
	    <View style={styles.header}>
	        <Text style={styles.title}>Fasting records</Text>
		<View style={[styles.hrz, { marginTop: verticalScale(8) }]}>
		    <View style={styles.hrz}>
			<LinearGradient 
  			    style={styles.noteColor}
			    colors={[`rgba(${Colors.primary.rgb.join(', ')}, .3)`, Colors.primary.hex]}
			    start={{ x: .5, y: 0 }}
			    end={{ x: .5, y: 1 }}
			/>
			<Text style={styles.noteTitle}>Completed</Text>
		    </View>
		    <View style={[styles.hrz, { marginLeft: horizontalScale(38) }]}>
			<LinearGradient 
			     style={styles.noteColor}
			     colors={[`rgba(${Colors.darkPrimary.rgb.join(', ')}, .05)`, `rgba(${Colors.darkPrimary.rgb.join(', ')}, .2)`]}
			     start={{ x: .5, y: 0 }}
			     end={{ x: .5, y: 1 }}
			/>
			<Text style={styles.noteTitle}>Not completed</Text>
		    </View>
		</View>
	    </View>
	    <FlatList 
	        style={{ width: '100%', marginTop: verticalScale(20) }}
	        horizontal
		showsHorizontalScrollIndicator={false}
		data={fastingRecordsData}
		renderItem={({ item, index }) => (
		    <View key={index} style={[styles.rec, { marginLeft: (index > 0 ? horizontalScale(15) : 0) }]}>
			<Text style={[styles.recText, { height: verticalScale(22) }]}>{item.hrs > 0 ? `${item.hrs}h` : ''}</Text>
			<LinearGradient 
			    style={styles.recProg}
			    colors={[`rgba(${Colors.darkPrimary.rgb.join(', ')}, .05)`, `rgba(${Colors.darkPrimary.rgb.join(', ')}, .2)`]}
			    start={{ x: .5, y: 0 }}
			    end={{ x: .5, y: 1 }}>
			    <LinearGradient 
			        style={[styles.recProgValue, { height: `${item.hrs / 24 * 100}%` }]} 
				colors={[`rgba(${Colors.primary.rgb.join(', ')}, .2)`, Colors.primary.hex]}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }} />
			</LinearGradient>
			<View style={{ alignItems: 'center', marginTop: verticalScale(7) }}>
			    <Text style={styles.recText}>{item.day}</Text>
			    <Text style={[styles.recText, { marginTop: verticalScale(-2) }]}>{item.month}</Text>
			</View>
		    </View>
		)}
	    />
	    <Pressable style={styles.timelineRef}>
		<Text style={styles.timelineText}>Timeline</Text>
	    </Pressable>
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
	backgroundColor: '#fff', 
	width: horizontalScale(369),
	borderRadius: horizontalScale(32),
	elevation: 5, 
	shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .7)`,
	paddingHorizontal: horizontalScale(18),
	paddingTop: verticalScale(18),
	paddingBottom: verticalScale(8),
	marginTop: verticalScale(27)
    },

    header: {
	width: '100%'
    },

    title: {
	fontFamily: 'Poppins-SemiBold',
	fontSize: horizontalScale(15),
	color: darkPrimary
    }, 

    hrz: {
	flexDirection: 'row', 
	alignItems: 'center'
    }, 

    noteColor: {
	width: horizontalScale(10),
	height: verticalScale(10),
	borderRadius: 25
    },

    noteTitle: {
	fontFamily: 'Poppins-Regular', 
	fontSize: horizontalScale(12),
	color: darkPrimary,
	letterSpacing: .2,
	marginLeft: horizontalScale(8)
    }, 

    rec: {
	alignItems: 'center'
    }, 

    recText: {
	fontFamily: 'Poppins-Regular', 
	fontSize: horizontalScale(11),
	color: darkPrimary,
	letterSpacing: .4
    },

    recProg: {
	width: horizontalScale(54), 
	height: verticalScale(121),
	borderRadius: 200,
	justifyContent: 'flex-end'
    },

    recProgValue: {
	width: '100%',
	borderRadius: 200
    },

    timelineRef: {
	marginTop: verticalScale(16)
    },

    timelineText: {
	fontFamily: 'Poppins-Medium',
	fontSize: horizontalScale(13),
	color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`,
	letterSpacing: .4
    }
})
