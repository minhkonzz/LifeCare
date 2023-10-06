import { View, Pressable, Text, FlatList, StyleSheet } from 'react-native'
import { FC, useState } from 'react'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import CheckmarkIcon from '@assets/icons/checkmark.svg'

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

const Option: FC = ({ item, index }: { item: any, index: number }) => {
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

export default ({ style }): FC => {
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
      	color: Colors.darkPrimary.hex
    },

    checkmark: {
      	width: hS(32), 
      	height: vS(32)
    },

    checked: {
	borderWidth: 1, 
      	borderColor: Colors.primary.hex,
      	backgroundColor: Colors.lightPrimary.hex
    }
})
