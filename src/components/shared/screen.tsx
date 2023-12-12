import { useCallback, useState } from 'react'
import { View, FlatList, Platform, StatusBar, StyleSheet } from 'react-native'
import { BOTTOM_NAVIGATOR_HEIGHT } from '@utils/constants/screen'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import TabHeader from '@components/tab-header'
import StackHeader from './stack-header'

interface PopupProps {
   content: Array<any>
   paddingHorzContent?: boolean
   full?: boolean
   additionalStyles?: any, 
   header?: 'tab' | 'stack', 
   title?: string
} 

const headers = {
   tab: TabHeader,
   stack: StackHeader
}

export default ({ 
   content,
   paddingHorzContent, 
   full, 
   additionalStyles, 
   header,
   title
}: PopupProps): JSX.Element => {
   const [ visibleIndexes, setVisibleIndexes ] = useState<Array<number>>([])
   const bottomBarHeight: number = useDeviceBottomBarHeight()

   const onViewableItemsChanged = useCallback((info) => {
      const indexes = info.viewableItems.map(e => e.index)
      setVisibleIndexes(indexes)
   }, [])

   const Header = header && headers[header] || null

   return (
      <View style={styles.container}>
         <FlatList 
            style={styles.wrapper}
            contentContainerStyle={{
               ...styles.content, 
               ...additionalStyles,  
               paddingBottom: vS(27) + bottomBarHeight + (full ? 0 : vS(BOTTOM_NAVIGATOR_HEIGHT)) 
            }}
            {...{ onViewableItemsChanged }}
            data={Array.from({ length: content.length }).fill(1)} 
            showsVerticalScrollIndicator={false} 
            renderItem={({ item, index }) => {
               const RenderItem = content[index]
               return <RenderItem {...{ isViewable: visibleIndexes.includes(index) }} />
            }}/>
         { Header && <Header title={title} /> }
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      alignItems: 'center'
   },

   wrapper: {
      width: '100%',
      height: '100%', 
      backgroundColor: '#fff'
   },

   content: {
      width: '100%',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
   }
})