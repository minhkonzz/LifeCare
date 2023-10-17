import {
   View, 
   Text,
   StyleSheet
} from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

const data = [
   {
      id: 1, 
      title: 'Carbs', 
      goalGrams: 150, 
      goalPercent: 40, 
      gramsLeft: 150,
      tintColor: '#FFB8B8'
   },
   {
      id: 2, 
      title: 'Protein', 
      goalGrams: 150, 
      goalPercent: 40, 
      gramsLeft: 150, 
      tintColor: '#91C8E4'
   }, 
   {
      id: 3, 
      title: 'Fat', 
      goalGrams: 33, 
      goalPercent: 20, 
      gramsLeft: 25.8, 
      tintColor: '#FFD36E'
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
               <View style={styles.itemProgressWrapper}>
                  <AnimatedCircularProgress
                     lineCap='round'
                     width={hS(8)}
                     size={hS(92)}
                     rotation={360}
                     fill={30}
                     tintColor={e.tintColor}
                     backgroundColor={`rgba(${darkRgb.join(', ')}, .1)`}
                  />
                  <View style={styles.itemProgressInside}>
                     <Text style={styles.leftValue}>{`${e.gramsLeft}g`}</Text>
                     <Text style={styles.leftTitle}>left</Text>
                  </View>
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
      letterSpacing: .2,
      marginTop: vS(3)
   },

   itemProgressWrapper: {
      width: hS(92), 
      height: vS(92), 
      borderRadius: 200,
      backgroundColor: '#fff', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginTop: vS(10)
   },

   leftValue: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(15),
      color: darkHex, 
      letterSpacing: .2,
      marginTop: 4
   },

   leftTitle: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(10), 
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2
   },

   itemProgressInside: {
      position: 'absolute', 
      justifyContent: 'center', 
      alignItems: 'center'
   }
})