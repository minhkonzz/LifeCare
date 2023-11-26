import { memo, useContext } from 'react'
import { View, Text, FlatList, StyleSheet, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import PopupProvider, { PopupContext } from '@contexts/popup'
import StackHeader from '@components/shared/stack-header'
import TimePicker from '@components/time-range-picker'
import TimelineItem from '@components/timeline-item'
import timeline from '@assets/data/timeline.json'
import { handleTimelineData } from '@utils/helpers'

const MainContent = memo(() => {
   const timelineData = handleTimelineData(timeline.waterRecords, timeline.bodyRecords)

   return (
      <>
         <StackHeader title='Timeline' />
         <View style={styles.timePicker}>
            <TimePicker title='From' indicatorColor={Colors.primary.hex} />
            <TimePicker title='To' indicatorColor='#FF9B85' />
         </View>
         <FlatList
            contentContainerStyle={styles.timeline}
            showsVerticalScrollIndicator={false}
            data={timelineData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => <TimelineItem {...{ item, index }} />} />
      </>
   )  
})

const Main = () => {
   const { popup: Popup, setPopup } = useContext<any>(PopupContext)
   return (
      <>
         <MainContent />
         { Popup && <Popup setVisible={setPopup} /> }
      </>
   )
}

export default (): JSX.Element => {
   return (
      <View style={styles.container}>
         <PopupProvider>
            <Main />
         </PopupProvider>
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
      shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .4)`,
      paddingVertical: vS(21),
      paddingHorizontal: hS(24)
   },

   timeline: {
      marginTop: vS(32),
      alignItems: 'flex-end'
   }
})
