import {
   View, 
   Text, 
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import WeightOrangeIcon from '@assets/icons/weight-orange.svg'
import WaterCupIcon from '@assets/icons/watercup.svg'

interface TimelineItemProps {
   item?: any 
   index?: any
}

export default ({ item, index }: TimelineItemProps): JSX.Element => {
   return (
      <View style={[styles.container, { marginTop: (index > 0 ? vS(13) : 0) }]}>
         <Text style={styles.date}>{item.date}</Text>
         <View style={styles.iconWrapper}>
            <View style={styles.iconBackground}>
               <WaterCupIcon width={hS(17)} height={vS(23.5)} />
            </View>
            <View style={styles.iconIndicator} />
         </View>
         <View style={styles.timelineRight}>
            <Text style={styles.time}>{item.time}</Text>
            <View style={styles.detail}>
               <Text style={styles.name}>Drink water</Text>
               <View style={styles.valueWrapper}>
                  <Text style={styles.value}>300 ml</Text>
                  <Text style={styles.bonus}>2.5</Text>
               </View>
            </View>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row' ,
      paddingRight: hS(4)
   }, 

   date: {
      marginTop: vS(12),
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(12), 
      color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`, 
      letterSpacing: .2
   }, 

   iconWrapper: {
      marginLeft: hS(15), 
      marginRight: hS(12), 
      alignItems: 'center'
   }, 

   iconBackground: {
      width: hS(48),
      height: vS(48),
      borderRadius: hS(18),
      backgroundColor: `rgba(177, 234, 238, .28)`, 
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   iconIndicator: {
      width: hS(3),
      height: vS(68), 
      marginTop: vS(13),
      backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .3)`
   },

   timelineRight: {
      marginTop: vS(12)
   },

   time: {
      fontFamily: 'Poppins-Medium' ,
      fontSize: hS(14), 
      color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`, 
      letterSpacing: .2, 
      marginBottom: vS(8)
   },

   detail: {
      borderRadius: hS(12), 
      paddingHorizontal: hS(14), 
      paddingVertical: vS(10), 
      width: hS(200),
      elevation: 5, 
      backgroundColor: '#fff', 
      shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`
   }, 

   name: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(11), 
      color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`,
      letterSpacing: .2, 
      marginBottom: vS(8)
   }, 

   valueWrapper: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center'
   }, 

   value: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      letterSpacing: .2, 
      color: `rgba(70, 130, 169, .6)`
   },

   bonus: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(9), 
      color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`, 
      marginTop: vS(4)
   }
})