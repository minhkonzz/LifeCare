import { View, Text, Pressable, StyleSheet } from 'react-native'
import { primaryHex, darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { PrimaryEditIcon } from '@assets/icons'

interface TimePickerProps {
   title: string, 
   editable?: boolean,
   active?: boolean,
   indicatorColor?: string
}

export default ({ title, indicatorColor, editable, active }: TimePickerProps): JSX.Element => {
   return (
      <View style={[styles.container, styles.horz]}>
         <View style={styles.horz}>
            <View style={{...styles.indicator, backgroundColor: indicatorColor }} />
            <Text style={styles.title}>{title}</Text>
         </View>
         <View style={styles.horz}>
            <Text style={{
               ...styles.dateTime, 
               ...(active ? 
               { fontFamily: 'Poppins-SemiBold', color: primaryHex } :
               { fontFamily: 'Poppins-Regular', color: `rgba(${darkRgb.join(',')}, .8)` }
            )}}>
               Today, 12:30PM
            </Text>
            <Pressable>
               <PrimaryEditIcon width={hS(16)} height={vS(16)} />
            </Pressable>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: { width: '100%' }, 

   horz: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center'
   }, 

   indicator: {
      width: hS(8), 
      height: vS(8), 
      borderRadius: hS(4) 
   },

   title: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(13), 
      color: darkHex, 
      letterSpacing: .2, 
      marginLeft: hS(17)
   }, 

   dateTime: {
      fontSize: hS(13), 
      letterSpacing: .2,
      marginRight: hS(24)
   }
})