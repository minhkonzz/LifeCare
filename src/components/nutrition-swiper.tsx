import {
   View, 
   Text,
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

export default (): JSX.Element => {
   return (
      <LinearGradient 
         style={styles.container}
         colors={[`rgba(${Colors.lightPrimary.rgb.join(', ')}, .3)`, Colors.lightPrimary.hex]}
         start={{ x: .5, y: 0 }}
         end={{ x: .52, y: .5 }}>
         
      </LinearGradient>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: vS(244),
      borderRadius: hS(32)
   }
})