import { Pressable, Text, StyleSheet } from 'react-native'
import { CheckmarkIcon } from '@assets/icons'
import { OptionProps } from '@utils/interfaces'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { primaryHex, lightHex, darkHex } from '@utils/constants/colors'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { submitSurveyOption } from '@store/survey'

export default ({ item, index, stateKey }: OptionProps) => {
   const dispatch = useDispatch()
   const value = useSelector((state: AppState) => state.survey[stateKey])
   const isChecked = Array.isArray(value) && value.includes(item) || value === item

   const onPress = () => {
      if (typeof value === 'string') {
         dispatch(submitSurveyOption({ k: stateKey, v: item }))
         return
      }
      if (Array.isArray(value)) 
         dispatch(submitSurveyOption({ k: stateKey, v: value.includes(item) && value.filter(e => e !== item) || [...value, item] }))
   }

   return (
      <Pressable
         {...{ onPress }}
         key={`opt${index}`}
         style={{
            ...styles.container,
            ...(isChecked && styles.checked),
            marginTop: (index > 0 ? vS(18) : 0)
         }}>
         <Text style={styles.title}>{item}</Text>
         { isChecked && <CheckmarkIcon width={hS(32)} height={vS(32)} /> }
      </Pressable>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: vS(70),
      backgroundColor: '#f3f3f3',
      borderRadius: hS(12),
      paddingHorizontal: hS(26)
   },

   title: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(14),
      color: darkHex
   },

   checked: {
      borderWidth: 1.5,
      borderColor: primaryHex,
      backgroundColor: lightHex
   }
})