import { memo, ReactNode, useState, useRef, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { SCREEN_WIDTH, verticalScale as vS } from '@utils/responsive'

interface CarouselProps {
   data: any[],
   style?: any,
   indicator?: (index: number) => JSX.Element, 
   items?: any
}

export default memo(({
   data, 
   style, 
   indicator, 
   items
}: CarouselProps): JSX.Element => {

   const [ index, setIndex ] = useState<number>(0)
   const indexRef = useRef(index)
   indexRef.current = index
   const Indicator = indicator

   const onScroll = useCallback((event: any) => {
      const { contentOffset, layoutMeasurement } = event.nativeEvent
      const slideSize = layoutMeasurement.width
      const index = contentOffset.x / slideSize
      const roundedIndex = Math.round(index)
      const distance = Math.abs(roundedIndex - index)
      const isNoMansLand = 0.4 < distance

      if (roundedIndex !== indexRef.current && !!isNoMansLand) {
         setIndex(roundedIndex)
      }
   }, [])

   const optimizationProps = {
      initialNumToRender: 3,
      maxToRenderPerBatch: 1, 
      removeClippedSubviews: true, 
      scrollEventThrottle: 16, 
      keyExtractor: (e: any) => e.id,
      getItemLayout: (_: any, index: number) => ({
         index, 
         length: SCREEN_WIDTH,
         offset: index * SCREEN_WIDTH
      })
   }

   return (
      <View {...{ style }}>
         <FlatList 
            {...{
               data,
               horizontal: true, 
               pagingEnabled: true, 
               style, 
               onScroll,
               ...optimizationProps 
            }} 
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }: { item: any, index: number }) => {
               const RenderItem = Array.isArray(items) && items[index] || items
               return <RenderItem {...{ item, index }} />
            }}/>
         { indicator && <Indicator {...{ index }} /> }
      </View>
   )
})