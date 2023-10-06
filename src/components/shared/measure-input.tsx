import {
   View,
   TextInput, 
   Text, 
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const darkPrimary: string = Colors.darkPrimary.hex

interface MeasureInputProps {
   symb: string, 
   placeholder?: string, 
   paddingBottom?: number, 
   contentCentered?: boolean,
   additionalStyles?: any,
   onChangeText?: () => void
}

export default ({ 
   symb, 
   placeholder, 
   paddingBottom = 2, 
   contentCentered, 
   additionalStyles, 
   onChangeText 
}: MeasureInputProps): JSX.Element => {
   return (
      <View style={[styles.container, additionalStyles]}>
         <TextInput 
            style={[styles.input, { textAlign: contentCentered && 'center' || 'left', paddingBottom }]}
            {...{ placeholder, onChangeText }} />
         <Text style={styles.symb}>{symb}</Text>         
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
      color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`, 
      letterSpacing: .2, 
      marginLeft: hS(8),
      marginTop: vS(16)
   }, 

   input: {
      width: hS(127),
      paddingLeft: hS(8),
      fontFamily: 'Poppins-Medium',
      color: darkPrimary,
      fontSize: hS(32), 
      borderBottomWidth: 1, 
      borderBottomColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .3)`
   }
})