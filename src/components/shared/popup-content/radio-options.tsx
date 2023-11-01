import { memo, Dispatch, SetStateAction, useState, useRef } from 'react'
import Popup from '@components/shared/popup'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

import {
   View, 
   Text,
   Pressable,
   Animated,
   StyleSheet,
   TouchableOpacity
} from 'react-native'

interface RadioOptionsPopupProps {
   options: Array<string> 
   setVisible: Dispatch<SetStateAction<boolean>>
}

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default memo(({ options, setVisible }: RadioOptionsPopupProps): JSX.Element => {
   const [ selectedIndex, setSelectedIndex ] = useState<number>(2)
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   const onSave = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start()
   }

   return (
      <Popup {...{
         type: 'centered',
         width: hS(280),
         title: 'Gender',
         animateValue,
         setVisible 
      }}>
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
                        colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                        start={{ x: .5, y: 0 }}
                        end={{ x: .5, y: 1 }}
                     />
                  }
               </View>
            </Pressable>
         )
      }
         <TouchableOpacity
            onPress={onSave}
            activeOpacity={.7}
            style={styles.button}>
            <LinearGradient
               style={styles.buttonBg}
               colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
               start={{ x: .5, y: 0 }}
               end={{ x: .5, y: 1 }}>
               <Text style={styles.buttonText}>Save</Text>
            </LinearGradient>
         </TouchableOpacity>
      </Popup>
   )
})

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
      color: darkHex,
      letterSpacing: .2
   }, 

   circleBound: {
      width: hS(22), 
      height: vS(22), 
      borderRadius: hS(11), 
      borderWidth: 1, 
      borderColor: `rgba(${darkRgb.join(', ')}, .5)`, 
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   primaryIndicator: {
      width: hS(14), 
      height: vS(14), 
      borderRadius: hS(7)
   },

   button: {
      width: '100%',
      height: vS(82),
      borderRadius: hS(32),
      overflow: 'hidden',
      marginTop: vS(20)
   },

   buttonBg: {
      width: '100%',
      height: '100%',
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   buttonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: '#fff', 
      letterSpacing: .2
   }
})