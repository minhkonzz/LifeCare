import { memo, Dispatch, SetStateAction, useCallback } from 'react'
import { primaryHex, primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { WhiteEditIcon } from '@assets/icons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'
import { getDatesRange, getMonthTitle } from '@utils/datetimes'
import { BlurView } from '@react-native-community/blur'
import { commonStyles } from '@utils/stylesheet'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
   title: string, 
   value: number,
   hd: any[]
   onPressEdit: Dispatch<SetStateAction<boolean>>
}

const { blurOverlay, blurOverlayWrapper, noDataText } = commonStyles

let visitedMonth: string = ''
let visitedValue: number = 0
let startIndex: number = 0
let endIndex: number = 0

export default memo(({ title, value, onPressEdit, hd }: Props): JSX.Element => {
   
   const standardRecords = hd.reduce((acc: any, cur: any) => {
      const { id, createdAt, value } = cur
      const d = new Date(createdAt)
      acc[`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`] = { id, value }
      return acc
   }, {})

   const chartData = getDatesRange(122).map((e: any, i) => {
      const r = standardRecords[e.value]
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

   return (
      <View style={styles.container}>
         <View style={{...styles.hrz, width: '100%', justifyContent: 'space-between' }}>
            <View>
               <Text style={styles.title}>{title}</Text>
               <View style={styles.hrz}>
                  <Text style={styles.currentValue}>{value || '--'}</Text>
                  <Text style={styles.symb}>cm</Text>
               </View>
            </View>
            <TouchableOpacity activeOpacity={.7} onPress={() => onPressEdit(true)}>
               <LinearGradient
                  style={styles.editButton}
                  colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                  start={{ x: .5, y: 0 }}
                  end={{ x: .52, y: .5 }}>
                  <WhiteEditIcon width={hS(20)} height={vS(20)} />
               </LinearGradient>
            </TouchableOpacity>
         </View>
         { value && 
         <LineChart 
            {...{ data: chartData, customDataPoint: CustomDataPoint, startIndex, endIndex }} 
            yAxisTextStyle={styles.axisText}
            xAxisLabelTextStyle={styles.axisText}
            curved 
            showVerticalLines 
            startOpacity={.8}
            startFillColor={primaryHex}
            noOfSections={4}
            color={`rgba(${primaryRgb.join(', ')}, .6)`} 
            thickness={5}
            xAxisColor='#e4e4e4'
            yAxisColor='#e4e4e4' 
            spacing={hS(42)} /> ||
            <View style={blurOverlayWrapper}>
               <BlurView style={blurOverlay} blurType='light' blurAmount={3} />
               <Text style={noDataText}>No data found</Text>
            </View>
         }
      </View>
   )
})

const styles = StyleSheet.create({
   container: {
      width: hS(370), 
      paddingVertical: vS(18),
      paddingHorizontal: hS(22),
      borderRadius: hS(32),
      elevation: 12, 
      backgroundColor: '#fff',
      shadowColor: `rgba(${darkRgb.join(', ')}, .6)`, 
      marginVertical: vS(24)
   },

   customPoint: {
      width: hS(13), 
      height: hS(13), 
      borderRadius: 100, 
      backgroundColor: primaryHex, 
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

   hrz: {
      flexDirection: 'row', 
      alignItems: 'center'
   }, 

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(16),
      color: darkHex,
      letterSpacing: .2
   },

   currentValue: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(28),
      color: darkHex,
      letterSpacing: .2
   }, 

   symb: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: darkHex,
      letterSpacing: .2, 
      marginLeft: hS(8),
      marginTop: vS(10)
   }, 

   editButton: {
      width: hS(52), 
      height: vS(52),
      borderRadius: hS(22), 
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: vS(22),
      elevation: 12, 
      shadowColor: darkHex
   }
})
