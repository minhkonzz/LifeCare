import { View, StyleSheet } from 'react-native'
import WheelPicker from './wheel-picker'
import { Colors } from '@utils/constants/colors'
import { verticalScale as vS } from '@utils/responsive'
import { WheelPickerProps } from '@utils/interfaces'

export default ({ 
   items, 
   itemHeight, 
   onIndexChange, 
   fs,
   initialScrollIndex
}: WheelPickerProps): JSX.Element => {
   return (
      <View style={{...styles.container, height: itemHeight * 5 }}>
         <View style={styles.indicator} />
         <WheelPicker {...{ items, itemHeight, onIndexChange, fs, initialScrollIndex }} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      justifyContent: 'center'
   }, 

   indicator: {
      width: '100%', 
      height: '18%', 
      backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .1)`, 
      borderRadius: 100,
      marginBottom: vS(4)
   }
})

