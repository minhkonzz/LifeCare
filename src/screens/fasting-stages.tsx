import { View, StyleSheet, FlatList } from 'react-native'
import { verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import StackHeader from '@components/shared/stack-header'
import FastingStage from '@components/fasting-stage'
import fastingStagesData from '@assets/data/fasting-stages.json'
import BloodSugarIncreaseIcon from '@assets/icons/blood-sugar-increase.svg'
import BloodSugarDecreaseIcon from '@assets/icons/blood-sugar-decrease.svg'
import BloodSugarNormalIcon from '@assets/icons/blood-sugar-normal.svg'
import FireColorIcon from '@assets/icons/fire-color.svg'

const stageIcons = [
   BloodSugarIncreaseIcon,
   BloodSugarDecreaseIcon,
   BloodSugarNormalIcon,
   FireColorIcon
]

const data = fastingStagesData.map((e, i) => ({...e, icon: stageIcons[i] }))

export default (): JSX.Element => {
   const startTimestamp = useSelector((state: AppState) => state.fasting.startTimeStamp)
   const currentTimestamp = new Date().getTime()
   const elapsedHours = Math.floor(((currentTimestamp - startTimestamp) / 1000 / 60 / 60) % 24)

   return (
      <View style={styles.container}>
         <StackHeader title='Fasting stages' />
         <View style={styles.main}>
            <FlatList 
               showsVerticalScrollIndicator={false}
               data={data}
               keyExtractor={item => item.id}
               renderItem={({ item, index }) => <FastingStage {...{ item, index, elapsedHours }} />}
            />
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      alignItems: 'center', 
      backgroundColor: '#fff'
   },

   main: {
      width: '100%', 
      height: '100%',
      paddingTop: vS(12), 
      alignItems: 'center'
   }
})