import { memo, ReactNode, SetStateAction, useRef, Dispatch } from 'react'
import { Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { darkHex, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useNavigation } from '@react-navigation/native'
import Popup from '@components/shared/popup'
import LinearGradient from 'react-native-linear-gradient'

export default memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<ReactNode>> }): JSX.Element => {
   const navigation = useNavigation<any>()
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   const onConfirm = () => {
      Animated.timing(animateValue, {
         toValue: 0, 
         duration: 300, 
         useNativeDriver: true
      }).start(() => {
         navigation.navigate('main')
      })
   }

   return (
      <Popup {...{ type: 'centered', title: 'Require', animateValue, setVisible }}>
         <Text style={styles.content}>You must end fasting period of current fasting plan before changing plan</Text>
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
      overflow: 'hidden'
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