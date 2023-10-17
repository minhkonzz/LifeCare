import { ReactNode } from 'react'
import {
   View, 
   Text,
   StyleSheet, 
   TouchableOpacity
} from 'react-native'

import WhitePlusIcon from '@assets/icons/white_plus.svg'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import FireIcon from '@assets/icons/fire.svg'
import LinearGradient from 'react-native-linear-gradient'

const darkPrimary: string = Colors.darkPrimary.hex

interface NutritionEditorProps {
   title: string,
   totalCalories: number,
   caloriesMethod: string,
   children?: ReactNode
}

export default ({ title, totalCalories, caloriesMethod, children }: NutritionEditorProps): JSX.Element => {
   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <View>
               <Text style={styles.title}>{title}</Text>
               <View style={styles.horz}>
                  <FireIcon width={hS(14)} height={vS(17)} />
                  <Text style={[styles.totalCalories, { marginLeft: hS(8), marginTop: vS(4) }]}>{`${totalCalories} kcal`}</Text>
                  <Text style={[styles.caloriesMethod, { marginLeft: hS(8), marginTop: vS(10) }]}>{caloriesMethod}</Text>
               </View>  
            </View>
            <TouchableOpacity activeOpacity={.7} onPress={() => {}}>
               <LinearGradient
                  style={styles.addButton}
                  colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <WhitePlusIcon width={hS(18)} height={vS(18)} />
               </LinearGradient>
            </TouchableOpacity>
         </View>
         { children }
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%', 
      borderRadius: hS(24),
      paddingHorizontal: hS(17),
      paddingVertical: vS(16), 
      elevation: 5,
      shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`,
      backgroundColor: '#fff', 
      marginTop: vS(24)
   },
   
   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   header: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      marginBottom: vS(27)    
   }, 

   addButton: {
      width: hS(52),
      height: vS(52), 
      borderRadius: hS(22), 
      justifyContent: 'center',
      alignItems: 'center', 
      elevation: 4,
      shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`
   },

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14),
      color: darkPrimary,
      letterSpacing: .2
   },

   totalCalories: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(24), 
      color: darkPrimary, 
      letterSpacing: .2
   },

   caloriesMethod: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(10), 
      color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`,
      letterSpacing: .2
   }
})