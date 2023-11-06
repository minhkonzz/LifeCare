import { memo, Dispatch, SetStateAction } from 'react'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import WhiteEditIcon from '@assets/icons/edit-white.svg'
import LinearGradient from 'react-native-linear-gradient'
import {
   View,
   Text, 
   StyleSheet,
   TouchableOpacity,
   FlatList, 
   Animated
} from 'react-native'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

interface Props {
   title: string, 
   value: number,
   onPressEdit: Dispatch<SetStateAction<boolean>>
}

export default memo(({ title, value, onPressEdit }: Props): JSX.Element => {
   const maxValueMeasure = 130
   const days = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

   return (
      <View style={styles.container}>
         <View style={{...styles.hrz, width: '100%', justifyContent: 'space-between' }}>
            <View>
               <Text style={styles.title}>{title}</Text>
               <View style={styles.hrz}>
                  <Text style={styles.currentValue}>{value}</Text>
                  <Text style={styles.symb}>cm</Text>
               </View>
            </View>
            <TouchableOpacity activeOpacity={.7} onPress={() => onPressEdit(true)}>
               <LinearGradient
                  style={styles.editButton}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .52, y: .5 }}>
                  <WhiteEditIcon width={hS(20)} height={vS(20)} />
               </LinearGradient>
            </TouchableOpacity>
         </View>
         <View style={styles.chart}>
            <View style={styles.leftColumn}>
            {
               Array.from({ length: 6 }, (_, i) => maxValueMeasure - 10 * i).map((e, i) => 
                  <Text key={i} style={{...styles.chartValue, marginTop: i > 0 ? vS(22) : 0}}>{e}</Text>
               )
            }
            </View>
            <FlatList 
               horizontal
               showsHorizontalScrollIndicator={false}
               data={days} 
               renderItem={({ item, index }) => 
                  <View key={index} style={{ alignItems: 'center', marginLeft: index > 0 ? hS(28) : 0 }}>
                     <View style={styles.dayDecor} />
                     <Text style={{...styles.chartValue, marginTop: vS(8)}}>{item}</Text>
                  </View>
               } />
         </View>
      </View>
   )
})

const styles = StyleSheet.create({
   container: {
      width: hS(370), 
      paddingVertical: vS(18),
      paddingHorizontal: hS(22),
      borderRadius: hS(32),
      elevation: 12, 
      backgroundColor: '#fff',
      shadowColor: `rgba(${darkRgb.join(', ')}, .6)`, 
      marginVertical: vS(24)
   },

   hrz: {
      flexDirection: 'row', 
      alignItems: 'center'
   }, 

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(16),
      color: darkHex,
      letterSpacing: .2
   },

   currentValue: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(28),
      color: darkHex,
      letterSpacing: .2
   }, 

   symb: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: darkHex,
      letterSpacing: .2, 
      marginLeft: hS(8),
      marginTop: vS(10)
   }, 

   editButton: {
      width: hS(52), 
      height: vS(52),
      borderRadius: hS(22), 
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: vS(22),
      elevation: 12, 
      shadowColor: darkHex
   },

   chart: {
      flexDirection: 'row',
      marginTop: vS(20)
   },

   leftColumn: {
      marginRight: hS(14),
      alignItems: 'flex-end'
   },

   chartValue: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(10),
      color: darkHex,
      letterSpacing: .2
   },

   dayDecor: {
      width: 1,
      height: vS(220),
      backgroundColor: 'rgba(0, 0, 0, .1)'
   }
})
