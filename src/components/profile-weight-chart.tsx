import { useCallback } from 'react'
import { LineChart } from 'react-native-gifted-charts'
import { View, StyleSheet } from 'react-native'
import { darkHex } from '@utils/constants/colors'
import { useSelector } from 'react-redux'
import { AppStore } from '@store/index'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { getDatesRange, getMonthTitle } from '@utils/datetimes'
import PrimaryToggleValue from './shared/primary-toggle-value'

let visitedMonth: string = ''
let visitedValue: number = 0
let startIndex: number = 0
let endIndex: number = 0

export default (): JSX.Element => {
   const { bodyRecords } = useSelector((state: AppStore) => state.user.metadata)
   const weightRecords = bodyRecords.filter((e: any) => e.type === 'weight')
   const standardWeightRecords = weightRecords.reduce((acc: any, cur: any) => {
      const { id, createdAt, value } = cur
      const d = new Date(createdAt)
      acc[`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`] = { id, value }
      return acc
   }, {})

   const chartData = getDatesRange(122).map((e, i) => {
      const r = standardWeightRecords[e.value]
      const { month, date } = e
      const monthTitle: string = getMonthTitle(month, true)
      const isNextMonth: boolean = monthTitle !== visitedMonth
      if (isNextMonth) visitedMonth = monthTitle
      const currentPointTitle = `${isNextMonth ? monthTitle + ' ' : '' }${date}`
      if (r) {
         const { value } = r
         if (!startIndex) startIndex = i
         visitedValue = value
         endIndex = i
         return { value, label: currentPointTitle }
      }
      return { value: visitedValue, label: currentPointTitle, hideDataPoint: true }
   })

   const CustomDataPoint = useCallback(() => <View style={styles.customPoint} />, [])

   const onChangeOption = (index: number) => {
      switch (index) {
         case 1: {
            
         }
         case 2: {

         }
         default: {

         }
      }
   }

   return (
      <>
         <PrimaryToggleValue 
            additionalStyles={styles.visualOptions}
            options={['Day', 'Week', 'Month']} 
            toggleColor={['rgba(255, 183, 43, .6)', '#FFB72B']} 
         />
         <LineChart 
            {...{ data: chartData, customDataPoint: CustomDataPoint, startIndex, endIndex }} 
            yAxisTextStyle={styles.axisText}
            xAxisLabelTextStyle={styles.axisText}
            curved 
            showVerticalLines 
            startOpacity={.8}
            startFillColor="rgba(255, 142, 0, .1)"
            noOfSections={4}
            color='#FF8E00' 
            thickness={5}
            xAxisColor='#e4e4e4' 
            yAxisColor='#e4e4e4' 
            spacing={hS(42)} />
      </>
   )
}

const styles = StyleSheet.create({
   customPoint: {
      width: hS(13), 
      height: hS(13), 
      borderRadius: 100, 
      backgroundColor: 'rgba(255, 183, 43, .8)', 
      borderWidth: 2, 
      borderColor: '#fff', 
      marginBottom: vS(7)
   },

   axisText: {
      fontSize: hS(11),
      fontFamily: 'Poppins_Regular',
      color: darkHex,
      letterSpacing: .2
   },

   visualOptions: {
      marginTop: vS(24),
      marginBottom: vS(20)
   }
})