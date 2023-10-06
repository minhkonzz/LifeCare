import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PrimaryToggleValue from '../primary-toggle-value'
import MeasureInput from '../measure-input'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

export default (): JSX.Element => {
   return (
      <View style={styles.container}>
         <PrimaryToggleValue />
         <MeasureInput symb='cm' contentCentered />
         <MeasureInput symb='kg' contentCentered />
         <TouchableOpacity style={styles.touchable} onPress={() => {}} activeOpacity={.7}>
            <LinearGradient 
               style={styles.saveButton}
               colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
               start={{ x: .5, y: 0 }}
               end={{ x: .5, y: 1 }}>
               <Text style={styles.saveButtonText}>Save</Text>
            </LinearGradient>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      alignItems: 'center'
   },

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