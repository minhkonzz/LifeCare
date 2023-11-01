import { 
   View,
   Text,
   StyleSheet,
   FlatList
} from 'react-native'

import NutritionPersonalFood from './nutrition-personal-food'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default (): JSX.Element => {
   return (
      <View style={styles.container}>
         <LinearGradient 
            style={styles.header}
            colors={[`rgba(${darkRgb.join(', ')}, .72)`, darkHex]}
            start={{ x: .5, y: 0 }}
            end={{ x: .52, y: 1 }}>
            <Text style={styles.title}>LUNCH</Text>
            <Text style={styles.cals}>512 kcal</Text>
         </LinearGradient>
         <FlatList 
            data={Array.from({ length: 4 }).fill(1)} 
            showsVerticalScrollIndicator={false} 
            keyExtractor={(item, index) => index.toString()} 
            renderItem={({ item, index }) => <NutritionPersonalFood />}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%'   
   },

   header: {
      width: '100%',
      paddingHorizontal: hS(16),
      paddingVertical: vS(16),
      borderRadius: hS(18),
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center',
      marginBottom: vS(18)
   }, 
   
   title: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(12), 
      color: '#fff', 
      letterSpacing: .2,
      textTransform: 'uppercase'
   }, 

   cals: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(12),
      color: '#fff',
      letterSpacing: .2
   }
})