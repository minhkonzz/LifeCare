import { View, StyleSheet } from 'react-native'
import WheelPicker from './wheel-picker'
import { Colors } from '@utils/constants/colors'
import { verticalScale as vS } from '@utils/responsive'
import { WheelPickerProps } from '@utils/interfaces'

// interface ValueWheelPickerProps {
//    items: string[] | number[]
//    itemHeight: number, 
//    onIndexChange?: (index: number) => void
// }

export default ({ items, itemHeight, onIndexChange }: WheelPickerProps): JSX.Element => {
   return (
      <View style={[styles.container, { height: itemHeight * 5 }]}>
         <View style={styles.indicator} />
         <WheelPicker {...{ items, itemHeight, onIndexChange }} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      justifyContent: 'center'
   }, 

   wheelPicker: {
      position: 'absolute',
      width: '100%',
      height: '100%'
   },

   indicator: {
      width: '100%', 
      height: '18%', 
      backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .1)`, 
      borderRadius: 100,
      marginBottom: vS(4)
   }
})

