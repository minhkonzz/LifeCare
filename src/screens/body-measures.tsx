import { useState } from 'react'
import { horizontalScale as hS } from '@utils/responsive'
import StackHeader from '@components/shared/stack-header'
import BodyMeasureSection from '@components/body-measure-section'
import CurrentWaistPopup from '@components/shared/popup/current-waist'
import CurrentChestPopup from '@components/shared/popup/current-chest'
import CurrentHipsPopup from '@components/shared/popup/current-hips'
import CurrentThighPopup from '@components/shared/popup/current-thigh'
import { View, ScrollView, StyleSheet } from 'react-native'

export default (): JSX.Element => {
   const [ currentWaistPopupVisible, setCurrentWaistPopupVisible ] = useState<boolean>(false)
   const [ currentChestPopupVisible, setCurrentChestPopupVisible ] = useState<boolean>(false)
   const [ currentHipsPopupVisible, setCurrentHipsPopupVisible ] = useState<boolean>(false)
   const [ currentThighPopupVisible, setCurrentThighPopupVisible ] = useState<boolean>(false)

   return (
      <View style={styles.container}>
         <StackHeader title='Body measurement' />
         <ScrollView
            style={styles.scrollview}
            contentContainerStyle={styles.scrollviewContent}
            showsVerticalScrollIndicator={false}>
            <BodyMeasureSection title='Waist' value={72} onPressEdit={setCurrentWaistPopupVisible} />
            <BodyMeasureSection title='Hips' value={68} onPressEdit={setCurrentHipsPopupVisible} />
            <BodyMeasureSection title='Thigh' value={65} onPressEdit={setCurrentThighPopupVisible} />
            <BodyMeasureSection title='Chest' value={82} onPressEdit={setCurrentChestPopupVisible} />
         </ScrollView>
         { currentWaistPopupVisible && <CurrentWaistPopup setVisible={setCurrentWaistPopupVisible} /> }
         { currentHipsPopupVisible && <CurrentHipsPopup setVisible={setCurrentHipsPopupVisible} /> }
         { currentThighPopupVisible && <CurrentThighPopup setVisible={setCurrentThighPopupVisible} /> }
         { currentChestPopupVisible && <CurrentChestPopup setVisible={setCurrentChestPopupVisible} /> }
      </View>
   )
}

const styles = StyleSheet.create({
   container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      paddingHorizontal: hS(24), 
      backgroundColor: '#fff'
   }, 

   scrollview: {
      width: hS(400),
      backgroundColor: '#fff'
   }, 

   scrollviewContent: { alignItems: 'center' }
})