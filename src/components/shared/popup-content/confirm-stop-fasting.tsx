import { memo, useRef, Dispatch, SetStateAction } from 'react'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import { useDispatch } from 'react-redux'
import { resetTimes } from '../../../store/fasting'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import Popup from '../popup'

import {
   Text,
   StyleSheet, 
   TouchableOpacity,
   Animated
} from 'react-native'

const { hex: darkHex } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<boolean>> }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const navigation = useNavigation<any>()

   const onConfirm = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 320, 
         useNativeDriver: true
      }).start(({ finished }) => {
         navigation.navigate('fasting-result')
      })
   }

   return (
      <Popup {...{ type: 'centered', title: 'Confirm', width: hS(300), animateValue, setVisible }}>
         <Text style={styles.content}>Are you sure to end fasting?</Text>
         <TouchableOpacity style={styles.button} activeOpacity={.7} onPress={onConfirm}>
            <LinearGradient 
               style={styles.buttonBg}
               colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
               start={{ x: .5, y: 0 }}
               end={{ x: .5, y: 1 }}>
               <Text style={styles.buttonText}>End fasting now</Text>
            </LinearGradient>
         </TouchableOpacity>
      </Popup>
   )
})

const styles = StyleSheet.create({
   button: {
      width: '100%',
      height: vS(82),
      borderRadius: hS(32),
      overflow: 'hidden',
      marginTop: vS(20)
   },

   content: {
      width: hS(220),
      fontFamily: 'Poppins-Regular', 
      fontSize: hS(12), 
      color: darkHex,
      letterSpacing: .2, 
      lineHeight: vS(22),
      textAlign: 'center'
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