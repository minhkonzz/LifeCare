import {
   View, 
   Text,
   Pressable,  
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import EditPrimaryIcon from '@assets/icons/edit-primary.svg'

const darkPrimary: string = Colors.darkPrimary.hex

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
            <View style={[styles.indicator, { backgroundColor: indicatorColor }]} />
            <Text style={styles.title}>{title}</Text>
         </View>
         <View style={styles.horz}>
            <Text style={[
               styles.dateTime, 
               {...(active ? 
                  {
                     fontFamily: 'Poppins-SemiBold', 
                     color: Colors.primary.hex    
                  } :
                  {
                     fontFamily: 'Poppins-Regular', 
                     color: `rgba(${Colors.darkPrimary.rgb.join(',')}, .8)`
                  }
               )}
            ]}>
               Today, 12:30PM
            </Text>
            <Pressable onPress={() => {}}>
               <EditPrimaryIcon width={hS(16)} height={vS(16)} />
            </Pressable>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%'
   }, 

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
      color: darkPrimary, 
      letterSpacing: .2, 
      marginLeft: hS(17)
   }, 

   dateTime: {
      fontSize: hS(13), 
      letterSpacing: .2,
      marginRight: hS(24)
   }
})