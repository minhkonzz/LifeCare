import {
   View,
   Text,
   FlatList,
   StyleSheet,
   Animated,
} from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import StackHeader from '@components/shared/stack-header'
import TimePicker from '@components/time-picker'
import TimelineItem from '@components/timeline-item'

const dataTest: Array<any> =
   [
      {
         id: 1,
         date: 'Today',
         time: '09:26'
      },
      {
         id: 2,
         date: '',
         time: '11:02'
      },
      {
         id: 3,
         date: 'Fri, 29 Aug',
         time: '14:06'
      },
      {
         id: 4,
         date: '',
         time: '12:02'
      },
      {
         id: 5,
         date: '',
         time: '08:14'
      }
   ]

export default (): JSX.Element => {
   return (
      <View style={styles.container}>
         <StackHeader title='Timeline' />
         <View style={styles.timePicker}>
            <TimePicker title='From' indicatorColor={Colors.primary.hex} />
            <TimePicker title='To' indicatorColor='#FF9B85' />
         </View>
         <FlatList
            contentContainerStyle={styles.timeline}
            showsVerticalScrollIndicator={false}
            data={dataTest}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => <TimelineItem {...{ item, index }} />} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: hS(24)
   },

   timePicker: {
      justifyContent: 'space-between',
      marginTop: vS(12),
      width: '100%',
      borderRadius: hS(16),
      height: vS(114),
      elevation: 5,
      backgroundColor: '#fff',
      shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`,
      paddingVertical: vS(21),
      paddingHorizontal: hS(24)
   },

   timeline: {
      marginTop: vS(32),
      alignItems: 'flex-end'
   }
})
