import { useState } from 'react'
import {
   View, 
   Text,
   Pressable, 
   StyleSheet
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

interface RadioOptionsPopupProps {
   options: Array<string> 
}

export default ({ options }: RadioOptionsPopupProps): JSX.Element => {
   const [ selectedIndex, setSelectedIndex ] = useState<number>(2)
   return (
      <>
      {
         options.map((e, i) => 
            <Pressable 
               key={i} 
               style={[styles.option, { marginTop: (i === 0 ? 0 : vS(33)) }]}
               onPress={() => setSelectedIndex(i)}>
               <Text style={styles.optionText}>{e}</Text>
               <View style={styles.circleBound}>
                  { 
                     selectedIndex === i && 
                     <LinearGradient 
                        style={styles.primaryIndicator}
                        colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
                        start={{ x: .5, y: 0 }}
                        end={{ x: .5, y: 1 }}
                     />
                  }
               </View>
            </Pressable>
         )
      }
      </>
   )
}

const styles = StyleSheet.create({
   option: {
      width: '100%', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center'
   },

   optionText: {
      fontFamily: 'Poppins-Ragular', 
      fontSize: hS(15), 
      color: Colors.darkPrimary.hex,
      letterSpacing: .2
   }, 

   circleBound: {
      width: hS(22), 
      height: vS(22), 
      borderRadius: hS(11), 
      borderWidth: 1, 
      borderColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`, 
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   primaryIndicator: {
      width: hS(14), 
      height: vS(14), 
      borderRadius: hS(7)
   }
})