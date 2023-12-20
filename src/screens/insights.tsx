import { View, StyleSheet, FlatList, Pressable, Platform, StatusBar } from 'react-native'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { BOTTOM_NAVIGATOR_HEIGHT } from '@utils/constants/screen'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import TabHeader from '@components/tab-header'
import InsightCategory from '@components/insight-category'
import FeedBackReference from '@components/feedback-reference'
import { insights } from '@assets/data/insights'

export default (): JSX.Element => {
   const bottomBarHeight: number = useDeviceBottomBarHeight()

   return (
      <View style={styles.container}>
         <FlatList 
            data={[]}
            contentContainerStyle={{ 
               paddingTop: vS(105),
               paddingBottom: vS(27) + bottomBarHeight + vS(BOTTOM_NAVIGATOR_HEIGHT) 
            }}
            showsVerticalScrollIndicator={false}
            renderItem={null} 
            ListHeaderComponent={
               <> 
                  { insights.map((e, i) => <InsightCategory key={`${e.id}-${i}`} {...{ item: e, index: i }} />) }
                  <FeedBackReference />
               </>
            } />
         <TabHeader title='Insights for you' />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
   },

   video: {
      width: hS(346),
      height: vS(212),
      borderRadius: hS(32)
   }
})
