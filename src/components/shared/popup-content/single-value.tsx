import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import MeasureInput from '../measure-input'

interface SingleValuePopupProps {
   symb: string, 
   options?: Array<string>
}

export default ({ symb, options }: SingleValuePopupProps): JSX.Element => {
   return (
      <>
         <MeasureInput {...{ symb }} contentCentered />
         <TouchableOpacity style={styles.touchable} onPress={() => {}} activeOpacity={.7}>
            <LinearGradient 
               style={styles.saveButton}
               colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
               start={{ x: .5, y: 0 }}
               end={{ x: .5, y: 1 }}>
               <Text style={styles.saveButtonText}>Save</Text>
            </LinearGradient>
         </TouchableOpacity>
      </>
   )
}

const styles = StyleSheet.create({
   saveButton: {
      width: hS(259),
      height: vS(82),
      borderRadius: hS(32),
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   touchable: {
      marginTop: vS(32)
   }, 

   saveButtonText: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(14),
      color: '#fff',
      letterSpacing: .2, 
   }
})