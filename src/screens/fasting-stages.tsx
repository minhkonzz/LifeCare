import { View, StyleSheet, FlatList } from 'react-native'
import { verticalScale as vS } from '@utils/responsive'
import withFastingState from '@hocs/withFastingState'
import StackHeader from '@components/shared/stack-header'
import FastingStage from '@components/fasting-stage'
import fastingStagesData from '@assets/data/fasting-stages.json'

import { 
   BloodSugarDecreaseIcon, 
   BloodSugarIncreaseIcon, 
   BloodSugarNormalIcon, 
   FireColorIcon, 
   IntoFatBurnIcon, 
   FatBurnStartIcon, 
   CleaningIcon, 
   GrowthHormoneIcon, 
   InsulinIcon, 
   BloodCellsIcon, 
   SwitchToFastIcon 
} from '@assets/icons'

const stageIcons = [
   BloodSugarIncreaseIcon,
   BloodSugarDecreaseIcon,
   BloodSugarNormalIcon,
   SwitchToFastIcon,
   IntoFatBurnIcon,
   FireColorIcon,
   FatBurnStartIcon,
   CleaningIcon,
   GrowthHormoneIcon,
   InsulinIcon,
   BloodCellsIcon
]

const data = fastingStagesData.map((e, i) => ({...e, icon: stageIcons[i] }))

export default withFastingState(({ stageData }: { stageData: any }): JSX.Element => {
   if (stageData) {
      const { elapsedTimeInHours } = stageData
      return (
         <View style={styles.container}>
            <StackHeader title='Fasting stages' />
            <View style={styles.main}>
               <FlatList 
                  showsVerticalScrollIndicator={false}
                  data={data}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => <FastingStage {...{ item, elapsedTimeInHours }} />}
               />
            </View>
         </View>
      )
   }

   return <></>
}, true)

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