import { View, TextInput, Text, StyleSheet } from 'react-native'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

interface MeasureInputProps {
   symb: string, 
   value: string | number
   placeholder?: string
   paddingBottom?: number 
   contentCentered?: boolean
   additionalStyles?: any
   onChangeText?: (input: string) => void
   isError?: boolean
}

export default ({ 
   symb, 
   value,
   placeholder, 
   paddingBottom = 2, 
   contentCentered, 
   additionalStyles, 
   onChangeText, 
   isError
}: MeasureInputProps): JSX.Element => {
   return (
      <View style={[styles.container, additionalStyles]}>
         <TextInput 
            keyboardType='numeric'
            style={{
               ...(isError && {...styles.input, borderBottomColor: 'red' } || styles.input), 
               textAlign: contentCentered && 'center' || 'left', 
               paddingBottom
            }}
            {...{ value: value && value + '' || '', placeholder, onChangeText }} />
         <Text style={isError && {...styles.symb, color: 'red'} || styles.symb}>{symb}</Text>         
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center'
   }, 

   symb: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(14), 
      color: `rgba(${darkRgb.join(', ')}, .8)`, 
      letterSpacing: .2, 
      marginLeft: hS(8),
      marginTop: vS(16)
   }, 

   input: {
      width: hS(127),
      paddingLeft: hS(8),
      fontFamily: 'Poppins-Medium',
      color: darkHex,
      fontSize: hS(32), 
      borderBottomWidth: 1, 
      borderBottomColor: `rgba(${darkRgb.join(', ')}, .3)`
   }
})