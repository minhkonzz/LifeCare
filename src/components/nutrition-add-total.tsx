import { 
   View,
   Text, 
   TouchableOpacity,
   StyleSheet 
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
import FireIcon from '@assets/icons/fire-color.svg'

const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

interface Props {
   title: string, 
   value: number
}

export default ({ title, value }: Props): JSX.Element => {
   return (
      <View style={[styles.container, styles.horz]}>
         <View>
            <View style={styles.horz}>
               <FireIcon width={hS(16)} height={vS(16)} />
               <Text style={styles.title}>{title}</Text> 
            </View>
            <Text style={styles.value}>{`${value} kcal`}</Text>
         </View>
         <TouchableOpacity activeOpacity={.8}>
            <LinearGradient
               style={styles.saveButton}
               colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
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
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: hS(22), 
      paddingVertical: vS(16),
      justifyContent: 'space-between', 
      backgroundColor: '#fff',
      elevation: 8, 
      shadowColor: darkHex
   }, 

   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   title: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(12),
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2, 
      marginLeft: hS(8),
      marginTop: vS(4)
   },

   value: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(20), 
      color: darkHex,
      letterSpacing: .2, 
      marginTop: vS(4)
   },

   saveButton: {
      width: hS(158), 
      height: vS(53), 
      borderRadius: hS(32), 
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   saveButtonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(12), 
      color: '#fff',
      letterSpacing: .2
   }
})