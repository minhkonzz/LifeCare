import { useCallback, useState } from 'react'
import {
   View,
   FlatList, 
   Platform, 
   StatusBar, 
   StyleSheet
} from 'react-native'
import TabHeader from '@components/tab-header'
import StackHeader from './stack-header'
import { BOTTOMBAR_HEIGHT } from '@utils/constants/screen'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

interface Props {
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
}: Props): JSX.Element => {
   const [ visibleIndexes, setVisibleIndexes ] = useState<Array<number>>([])
   const bottomIndicatorStyles = { marginBottom: vS(27) + (full ? 0 : BOTTOMBAR_HEIGHT) }

   const onViewableItemsChanged = useCallback((info) => {
      const indexes = info.viewableItems.map(e => e.index)
      setVisibleIndexes(indexes)
   }, [])

   const Header = header && headers[header] || null

   return (
      <View style={styles.container}>
         <FlatList 
            style={styles.wrapper}
            contentContainerStyle={[styles.content, additionalStyles]}
            {...{ onViewableItemsChanged }}
            data={Array.from({ length: content.length }).fill(1)} 
            showsVerticalScrollIndicator={false} 
            renderItem={({ item, index }) => {
               const RenderItem = content[index]
               return <RenderItem {...{ isViewable: visibleIndexes.includes(index) }} />
            }}/>
         <View style={bottomIndicatorStyles} />
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