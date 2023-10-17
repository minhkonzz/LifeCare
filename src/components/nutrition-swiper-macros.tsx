import {
   View, 
   Text,
   StyleSheet
} from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

const data = [
   {
      id: 1, 
      title: 'Carbs', 
      goalGrams: 150, 
      goalPercent: 40, 
      gramsLeft: 150
   },
   {
      id: 2, 
      title: 'Protein', 
      goalGrams: 150, 
      goalPercent: 40, 
      gramsLeft: 150
   }, 
   {
      id: 3, 
      title: 'Fat', 
      goalGrams: 33, 
      goalPercent: 20, 
      gramsLeft: 25.8
   }
]

export default (): JSX.Element => {
   return (
      <View style={styles.container}>
      {
         data.map((e, i) => 
            <View style={styles.item} key={`${e.id}-${i}`}>
               <Text style={styles.itemTitle}>{e.title}</Text>
               <Text style={styles.itemDaily}>{`${e.goalGrams}g (${e.goalPercent}%)`}</Text>
               <View>
               
               </View>
            </View>
         )
      }
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between'
   },

   item: {
      alignItems: 'center'
   }, 

   itemTitle: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(10), 
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2
   }, 

   itemDaily: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(10), 
      color: darkHex, 
      letterSpacing: .2
   }
})