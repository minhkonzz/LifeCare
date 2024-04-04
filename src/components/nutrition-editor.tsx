import AnimatedNumber from '@components/shared/animated-text'
import { WhitePlusIcon, FireIcon } from '@assets/icons'
import { useNavigation } from '@react-navigation/native'
import { primaryHex, primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
import { NutritionEditorProps } from '@utils/interfaces'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default ({ title, totalCalories, caloriesMethod, children }: NutritionEditorProps): JSX.Element => {
   const navigation = useNavigation<any>()

   const onAdd = () => {
      navigation.navigate(title === 'Meal' && 'add-food' || 'add-activity')
   }

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <View>
               <Text style={styles.title}>{title}</Text>
               <View style={styles.horz}>
                  <FireIcon width={hS(14)} height={vS(17)} />
                  <View style={styles.horz}>
                     <AnimatedNumber value={totalCalories} style={styles.totalCalories}/>
                     <Text style={styles.totalCalories}>kcal</Text>
                  </View>
                  <Text style={styles.caloriesMethod}>{caloriesMethod}</Text>
               </View>  
            </View>
            <TouchableOpacity activeOpacity={.7} onPress={onAdd}>
               <LinearGradient
                  style={styles.addButton}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
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
      width: hS(366), 
      borderRadius: hS(24),
      paddingHorizontal: hS(17),
      paddingVertical: vS(16), 
      elevation: 5,
      shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
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
      shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
   },

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14),
      color: darkHex,
      letterSpacing: .2
   },

   totalCalories: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(24), 
      color: darkHex, 
      letterSpacing: .2,
      marginLeft: hS(8), 
      marginTop: vS(4)
   },

   caloriesMethod: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(10), 
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2,
      marginLeft: hS(8),
      marginTop: vS(10)
   }
})