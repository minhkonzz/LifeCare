import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

interface Props {
   index: number, 
   title: string, 
   cals: number, 
   mins: number 
   METDesc?: string, 
}

export default ({
   index,
   title, 
   cals, 
   METDesc, 
   mins
 }: Props): JSX.Element => {
   return (
      <View style={[styles.container, { marginTop: (index > 0 ? vS(30) : 0) }]}>
         <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{`${cals} cals, ${METDesc ? METDesc : ''}, ${mins} mins`}</Text>
         </View>
         <TouchableOpacity
            onPress={() => {}}
            activeOpacity={.8}
            style={styles.editButton}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center'
   },

   title: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(17), 
      color: darkHex, 
      letterSpacing: .2
   },

   desc: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(11), 
      color: darkHex, 
      letterSpacing: .2,
      marginTop: vS(5)
   }, 

   editButton: {
      flexDirection: 'row', 
      width: hS(32), 
      height: vS(32), 
      borderRadius: hS(14), 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .1)`, 
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: vS(4)
   },

   dot: {
      width: hS(4), 
      marginHorizontal: 1,
      height: vS(4), 
      borderRadius: 10, 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .32)`
   }
})