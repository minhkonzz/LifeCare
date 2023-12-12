import { useCallback } from 'react'
import { LineChart } from 'react-native-gifted-charts'
import { View, StyleSheet } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

export default (): JSX.Element => {
   const data = [
      { value: 15, label: 'Jan' }, 
      { value: 30, label: 'Feb' }, 
      { value: 26, label: 'Mar' }, 
      { value: 120, label: 'Apr' },
      { value: 80, label: 'May' },
      { value: 80, label: 'June' },
      { value: 80, label: 'July' }
   ]

   const CustomDataPoint = useCallback(() => <View style={styles.customPoint} />, [])

   return (
      <LineChart 
         {...{ data, customDataPoint: CustomDataPoint }} 
         yAxisTextStyle={styles.axisText}
         xAxisLabelTextStyle={styles.axisText}
         areaChart 
         curved 
         showVerticalLines 
         startOpacity={.8}
         startFillColor="rgba(255, 142, 0, .1)"
         noOfSections={4}
         color='#FF8E00' 
         thickness={5}
         xAxisColor='#e4e4e4' 
         yAxisColor='#e4e4e4' 
         spacing={hS(44)} />
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
      color: Colors.darkPrimary.hex,
      letterSpacing: .2
   }
})