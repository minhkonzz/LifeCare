import { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import Screen from '@components/shared/screen'
import StackHeader from '@components/shared/stack-header'
import FastingStage from '@components/fasting-stage'
import fastingStagesData from '@assets/data/fasting-stages.json'

export default (): JSX.Element => {
   const activeIndex = 2
   return (
      <Screen full paddingHorzContent>
         <StackHeader title='Fasting stages' />
         <View style={styles.main}>
            <FlatList 
               showsVerticalScrollIndicator={false}
               data={fastingStagesData}
               keyExtractor={item => item.id}
               renderItem={({ item, index }) => {
                  const { title, from, to, content } = item
                  return (
                     <FastingStage {...{ 
                        title, 
                        index,
                        fromHrs: from, 
                        toHrs: to, 
                        content, 
                        active: index === activeIndex
                     }}/>
                  )
               }}
            />
         </View>
      </Screen>
   )
}

const styles = StyleSheet.create({
   main: {
      width: '100%', 
      height: '100%',
      paddingTop: vS(12), 
      alignItems: 'center'
   }
})