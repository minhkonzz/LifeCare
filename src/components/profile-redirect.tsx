import { ReactNode } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { BackIcon } from '@assets/icons'
import { commonStyles } from '@utils/stylesheet'

interface ProfileRedirectProps {
   title: string, 
   onPress?: () => void
   children?: ReactNode
}

export default ({ title, onPress, children }: ProfileRedirectProps): JSX.Element => {
   return (
      <Pressable style={{...commonStyles.hrz, ...styles.container }} {...{ onPress }}>
         <View style={commonStyles.hrz}>
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
      backgroundColor: `rgba(${darkRgb.join(', ')}, .12)`, 
      marginTop: vS(16)
   }, 

   title: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(14), 
      letterSpacing: .2,
      color: darkHex,
      marginLeft: hS(17),
      marginTop: vS(2)
   }, 

   redirectIc: {
      transform: [{ rotate: '180deg' }]
   }
})