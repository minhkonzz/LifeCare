import {
   View, 
   Text,
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const darkPrimary: string = Colors.darkPrimary.hex

interface CalendarProps {
   ableExpand?: boolean
}

export default ({ ableExpand }: CalendarProps): JSX.Element => {
   return (
      <View style={styles.container}>
         <Text style={styles.date}>12, October 2023</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%'
   }, 

   date: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(20), 
      color: darkPrimary,
      letterSpacing: .2,
      marginBottom: vS(12)
   }
})