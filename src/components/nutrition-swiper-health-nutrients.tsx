import {
   View, 
   Text,
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

const data = [
   {
      id: 1,
      title: 'Sodium', 
      value: 63, 
      progress: 20
   },
   {
      id: 2,
      title: 'Cholesterol', 
      value: 81.7, 
      progress: 45
   },
   {
      id: 3,
      title: 'Sugar', 
      value: 0, 
      progress: 0
   }
]

export default (): JSX.Element => {
   return (
      <View style={styles.container}>
      {
         data.map((e, i) => 
            <View key={`${e.id}-${i}`} style={{ marginTop: (i > 0 ? vS(20) : 0) }}>
               <View style={styles.header}>
                  <Text style={[styles.itemText, styles.title]}>{e.title}</Text>
                  <Text style={[styles.itemText, styles.value]}>{`took in: ${e.value} mg`}</Text>
               </View>
               <View style={styles.progressBar}>
                  <LinearGradient 
                     style={[styles.activeBar, { width: `${e.value}%` }]} 
                     colors={[`rgba(${primaryRgb.join(', ')}, .2)`, primaryHex]} 
                     start={{ x: .5, y: 0 }}
                     end={{ x: .5, y: 1 }} />
               </View>
            </View>
         )
      }
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%'
   }, 
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',  
      alignItems: 'center', 
      marginBottom: vS(4)
   }, 

   itemText: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(10), 
      letterSpacing: .2
   },

   title: {
      color: darkHex
   }, 

   value: {
      color: `rgba(${darkRgb.join(', ')}, .8)`
   }, 

   progressBar: {
      width: '100%', 
      height: vS(8), 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .18)`, 
      borderRadius: 50
   }, 

   activeBar: {
      height: '100%', 
      borderRadius: 50
   }
})