import { View, FlatList, StyleSheet } from 'react-native'
import { darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { handleTimelineData } from '@utils/helpers'
import { useSelector } from 'react-redux'
import { AppStore } from '@store/index'
import StackHeader from '@components/shared/stack-header'
import TimelineItem from '@components/timeline-item'
// import timeline from '@assets/data/timeline.json'

export default (): JSX.Element => {
   const { waterRecords, bodyRecords, fastingRecords } = useSelector((state: AppStore) => state.user.metadata)
   const timelineData = handleTimelineData(waterRecords, bodyRecords, fastingRecords)
   return (
      <View style={styles.container}>
         <StackHeader title='Timeline' />
         <FlatList
            contentContainerStyle={styles.timeline}
            showsVerticalScrollIndicator={false}
            data={timelineData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => <TimelineItem {...{ item, index, isLast: index === timelineData.length - 1 }} />} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: hS(24), 
      backgroundColor: '#fff'
   },

   timePicker: {
      justifyContent: 'space-between',
      marginTop: vS(12),
      width: '100%',
      borderRadius: hS(16),
      height: vS(114),
      elevation: 12,
      backgroundColor: '#fff',
      shadowColor: `rgba(${darkRgb.join(', ')}, .4)`,
      paddingVertical: vS(21),
      paddingHorizontal: hS(24)
   },

   timeline: {
      marginTop: vS(32),
      alignItems: 'flex-end',
      paddingBottom: vS(10)
   }
})
