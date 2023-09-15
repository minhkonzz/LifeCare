import { FC } from 'react'
import { 
    View,
    Text, 
    FlatList,
    StyleSheet, 
    Animated, 
    Pressable
} from 'react-native'

import FeedbackTextBox from '@components/FeedbackTextBox'
import { Colors } from '@utils/constants/colors'
import { horizontalScale, verticalScale } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight' 
import BackIcon from '@assets/icons/goback.svg'
import Button from '@components/shared/button/Button'
import LinearGradient from 'react-native-linear-gradient'

const darkPrimary: string = Colors.darkPrimary.hex
const feedbackNotSatisfiedOptions = require('../../assets/data/feedback-not-satisfied-options.json')
// console.log(Array.isArray(feedbackNotSatisfiedOptions))

export default (): FC => {
    const bottomBarHeight = useDeviceBottomBarHeight()
    const optionIndexesSelected = [1, 2, 4]
    return (
	<View style={[styles.container, { paddingBottom: bottomBarHeight + verticalScale(27) }]}>
	    <View style={styles.header}>
		<BackIcon width={horizontalScale(9.2)} height={verticalScale(16)} />
		<Text style={styles.headerTitle}>Feedback</Text>
		<View />
	    </View>
	    <View style={styles.main}>
		<Text style={styles.mainTitle}>What are you not satisfied with?</Text>
		<View style={styles.feedbackSelectOptions}> 
		{
		    feedbackNotSatisfiedOptions.map((e, i) => {
			return (
		           <Pressable style={{ marginBottom: verticalScale(15), marginLeft: horizontalScale(8) }} key={`${e.id}`}>
			       <LinearGradient
			       	   colors={optionIndexesSelected.includes(i) ? [`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex] : ['#fff', '#fff']}
				   start={{ x: .5, y: 0 }}
				   end={{ x: .5, y: 1 }}
				   style={[
				       styles.feedbackSelectOption, 
				       ...[
				              (!optionIndexesSelected.includes(i) ? 
				                  { 
						      paddingHorizontal: horizontalScale(16), 
						      paddingVertical: verticalScale(10),
				                      borderWidth: 2, 
					              borderColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .24)` 
				                  } : 
				                  {
						      paddingHorizontal: horizontalScale(18), 
						      paddingVertical: verticalScale(12)
				                  }
					      )
					  ]
				   ]}>
				   <Text 
				       style={[
				           styles.feedbackSelectOptionText, 
					   {
					       color: optionIndexesSelected.includes(i) ? '#fff' : darkPrimary, 
					       fontFamily: optionIndexesSelected.includes(i) ? 'Poppins-SemiBold' : 'Poppins-Medium'
					   }
				       ]}>
				       {e.title}
				   </Text>
			       </LinearGradient>
			   </Pressable>
		       )
		    })
		}
		</View> 
		<FeedbackTextBox />
	    </View>
	    <Button title='Submit' size='large' bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}/>
	</View>
    )
}

const styles = StyleSheet.create({
    container: {
    	flex: 1, 
	backgroundColor: '#fff',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingHorizontal: horizontalScale(24)
    },

    header: {
    	paddingVertical: verticalScale(22),
    	width: '100%',
	flexDirection: 'row',
	justifyContent: 'space-between', 
	alignItems: 'center'
    }, 

    headerTitle: {
	fontFamily: 'Poppins-SemiBold', 
	fontSize: horizontalScale(18), 
	color: darkPrimary, 
	letterSpacing: .2
    }, 

    main: {
	alignItems: 'center'
    },

    mainTitle: {
	fontFamily: 'Poppins-Medium', 
	fontSize: horizontalScale(18), 
	color: darkPrimary,
	letterSpacing: .2, 
	marginBottom: verticalScale(22)
    },

    feedbackSelectOptions: {
 	flexDirection: 'row',
	flexWrap: 'wrap', 
	marginBottom: verticalScale(38)
    }, 

    feedbackSelectOption: {
    	borderRadius: 300,  
    },

    feedbackSelectOptionText: { 
	fontSize: horizontalScale(12)
    }
})
