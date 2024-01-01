import { View, Pressable, Text, FlatList, StyleSheet } from 'react-native'
import { useState } from 'react'
import { darkHex, lightHex, primaryHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { CheckmarkIcon } from '@assets/icons'

const SURVEY_DATA = [
   {
      id: 1, 
      title: 'Choose your goal!', 
      options: [
         {
            id: 2, 
            title: 'Lose weight', 
            value: 'lw'
         },
         {
            id: 3, 
            title: 'Live longer', 
            value: 'll'
         }, 
         {
            id: 4, 
            title: 'Be energetic', 
            value: 'be'
         },
         {
            id: 5, 
            title: 'Gut rest', 
            value: 'gr'
         }
      ]
   }
]

const Option = ({ item, index }: { item: any, index: number }) => {
    const [ isChecked, setIsChecked ] = useState<boolean>(true)
    return (
        <Pressable 
            key={`opt${index}`} 
            onPress={() => setIsChecked(true)} 
            style={{ 
	        ...styles.optionContainer, 
		...(isChecked && styles.checked), 
		marginTop: (index > 0 ? vS(18) : 0)
	    }}>
            <Text style={styles.optionTitle}>{item.title}</Text>
            { isChecked && <CheckmarkIcon width={styles.checkmark.width} height={styles.checkmark.height} /> }
        </Pressable>
    )
} 

export default ({ style }) => {
    return (
        <View style={{ 
	    width: '100%', 
	    marginTop: vS(14), 
	    ...style
	}}>
            <Text style={styles.title}>Choose multiple options</Text>
            <FlatList 
                style={{ marginTop: vS(10) }}
                showsVerticalScrollIndicator={false}
                data={SURVEY_DATA[0].options}
                renderItem={({ item, index }) => <Option {...{ item, index }} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        height: vS(70), 
        backgroundColor: '#f3f3f3',
        borderRadius: hS(12), 
        paddingHorizontal: hS(26)
    }, 

    title: {
 	fontSize: hS(14), 
      	fontFamily: 'Poppins-Medium', 
      	color: '#9f9f9f'
    },

    optionTitle: {
      	fontFamily: 'Poppins-Medium', 
      	fontSize: hS(14),
      	color: darkHex
    },

    checkmark: {
      	width: hS(32), 
      	height: vS(32)
    },

    checked: {
	borderWidth: 1, 
      	borderColor: primaryHex,
      	backgroundColor: lightHex
    }
})
