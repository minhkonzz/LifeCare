import {
   View, 
   Text,
   FlatList,
   StyleSheet
} from 'react-native'

import { primaryHex, primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

const calendarData = [
   { id: 'cld1', day: 9, dayWeek: 'Sun' },
   { id: 'cld2', day: 10, dayWeek: 'Mon' },
   { id: 'cld3', day: 10, dayWeek: 'Tue' },
   { id: 'cld4', day: 11, dayWeek: 'Wed' },
   { id: 'cld5', day: 12, dayWeek: 'Thurs' },
   { id: 'cld6', day: 13, dayWeek: 'Fri' },
   { id: 'cld7', day: 14, dayWeek: 'Sat' }
]

interface CalendarProps {
   ableExpand?: boolean
}

export default ({ ableExpand }: CalendarProps): JSX.Element => {
   const selectedIndex = 3
   return (
      <View style={styles.container}>
         <Text style={styles.date}>12, October 2023</Text>
         <View style={styles.list}>
         {
            calendarData.map((e, i) => 
               i === selectedIndex && 
               <LinearGradient
                  key={e.id}
                  style={[
                     styles.item, 
                     { 
                        height: vS(100),
                        elevation: 8, 
                        shadowColor: darkHex 
                     }
                  ]}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .5, y: 1 }}>
                  <Text style={[styles.dayWeek, { color: '#fff' }]}>{e.dayWeek}</Text>
                  <View style={styles.day}>
                     <Text style={[styles.dayText, { color: darkHex }]}>{e.day}</Text>
                  </View>
               </LinearGradient> || 
               <View key={e.id} style={styles.item}>
                  <Text style={[styles.dayWeek, { color: darkHex }]}>{e.dayWeek}</Text>
                  <Text style={[styles.dayText, { color: `rgba(${darkRgb.join(', ')}, .6)` }]}>{e.day}</Text>
               </View>
            )
         }
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: hS(366), 
      marginTop: vS(105)
   }, 

   date: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(20), 
      color: darkHex,
      letterSpacing: .2,
      marginBottom: vS(12)
   },

   item: { 
      height: vS(92), 
      borderRadius: hS(30),
      paddingHorizontal: hS(8), 
      paddingTop: vS(15), 
      paddingBottom: vS(8), 
      justifyContent: 'space-between',
      alignItems: 'center',
   },

   dayWeek: {
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(13), 
      letterSpacing: .2
   },

   day: {
      width: hS(36), 
      height: vS(36), 
      backgroundColor: '#fff', 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderRadius: 100
   }, 

   dayText: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(14), 
      letterSpacing: .2,
      marginTop: vS(4)
   },

   list: {
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-between'
   }
})