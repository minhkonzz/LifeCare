import { View, StyleSheet } from 'react-native'
import { darkRgb } from '@utils/constants/colors'
import { verticalScale as vS } from '@utils/responsive'
import { WheelPickerProps } from '@utils/interfaces'
import WheelPicker from './wheel-picker'

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
      backgroundColor: `rgba(${darkRgb.join(', ')}, .1)`, 
      borderRadius: 100,
      marginBottom: vS(4)
   }
})

