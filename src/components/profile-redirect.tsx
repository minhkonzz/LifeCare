import { ReactNode } from 'react'
import {
   View, 
   Text,
   Pressable,
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import BackIcon from '@assets/icons/goback.svg'

interface ProfileRedirectProps {
   title: string, 
   onPress?: () => void
   children?: ReactNode
}

export default ({ title, onPress, children }: ProfileRedirectProps): JSX.Element => {
   return (
      <Pressable style={[styles.horz, styles.container]} {...{ onPress }}>
         <View style={styles.horz}>
            { children }
            <Text style={styles.title}>{title}</Text>
         </View>
         <BackIcon style={styles.redirectIc} width={hS(7)} height={vS(12)} />
      </Pressable>
   )
}

const styles = StyleSheet.create({
   container: { 
      width: hS(370),
      height: vS(68),
      justifyContent: 'space-between',
      paddingHorizontal: hS(24), 
      borderRadius: hS(24), 
      backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .12)`, 
      marginTop: vS(16)
   }, 

   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
   }, 

   title: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(14), 
      letterSpacing: .2,
      color: Colors.darkPrimary.hex,
      marginLeft: hS(17),
      marginTop: vS(2)
   }, 

   redirectIc: {
      transform: [{ rotate: '180deg' }]
   }
})