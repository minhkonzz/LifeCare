import { useContext } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { horizontalScale as hS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { PopupContext } from '@contexts/popup'
import { AppStore } from '@store/index'
import StackHeader from '@components/shared/stack-header'
import BodyMeasureSection from '@components/body-measure-section'
import CurrentWaistPopup from '@components/shared/popup/current-waist'
import CurrentChestPopup from '@components/shared/popup/current-chest'
import CurrentHipsPopup from '@components/shared/popup/current-hips'
import CurrentThighPopup from '@components/shared/popup/current-thigh'

export default (): JSX.Element => {
   const { setPopup } = useContext<any>(PopupContext)
   const { chestMeasure, hipsMeasure, waistMeasure, thighMeasure, bodyRecords } = useSelector((state: AppStore) => state.user.metadata)
   const thighMeasureRecords = bodyRecords.filter((e: any) => e.type === 'thigh')
   const chestMeasureRecords = bodyRecords.filter((e: any) => e.type === 'chest')
   const waistMeasureRecords = bodyRecords.filter((e: any) => e.type === 'waist')
   const hipsMeasureRecords = bodyRecords.filter((e: any) => e.type === 'hips')

   return (
      <View style={styles.container}>
         <StackHeader title='Body measurement' />
         <ScrollView
            style={styles.scrollview}
            contentContainerStyle={styles.scrollviewContent}
            showsVerticalScrollIndicator={false}>
            <BodyMeasureSection title='Waist' hd={waistMeasureRecords} value={waistMeasure} onPressEdit={() => setPopup(CurrentWaistPopup)} />
            <BodyMeasureSection title='Hips' hd={hipsMeasureRecords} value={hipsMeasure} onPressEdit={() => setPopup(CurrentHipsPopup)} />
            <BodyMeasureSection title='Thigh' hd={thighMeasureRecords} value={thighMeasure} onPressEdit={() => setPopup(CurrentThighPopup)} />
            <BodyMeasureSection title='Chest' hd={chestMeasureRecords} value={chestMeasure} onPressEdit={() => setPopup(CurrentChestPopup)} />
         </ScrollView>
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