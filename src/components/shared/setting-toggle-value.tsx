import { useRef, useEffect, useState } from 'react'
import { Animated, StyleSheet, Easing, Pressable, View, Text } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

interface SettingToggleValueProps {
   value: [string, string]
   w?: number,
   onPress?: () => void
}
export default ({ value, w, onPress }: SettingToggleValueProps): JSX.Element => {
   const translateX: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const [enabled, setEnabled] = useState<boolean>(false)

   useEffect(() => {
      Animated.timing(translateX, {
         duration: 150,
         toValue: enabled ? hS(w && Math.ceil(w * 55 / 120) || 54) : hS(w && Math.ceil(w * 2 / 120) || 2),
         easing: Easing.bezier(1, 0, 0, 1),
         useNativeDriver: true
      }).start()
   }, [enabled])

   const onTogglePressed = () => {
      if (onPress) onPress()
      setEnabled(!enabled)
   }

   return (
      <Pressable 
         style={{
            ...styles.toggle,
            ...w ? {
               width: w, 
               height: w / 4
            } : {}
         }} 
         onPress={onTogglePressed}>
         <Animated.View style={{ ...styles.toggleButton, transform: [{ translateX }] }} />
         <View style={styles.toggleBg}>
            <Text style={styles.toggleText}>{value[0].toUpperCase()}</Text>
            <Text style={styles.toggleText}>{value[1].toUpperCase()}</Text>
         </View>
      </Pressable>
   )
}

const styles = StyleSheet.create({
   toggle: {
      width: hS(120),
      height: vS(30),
      backgroundColor: `rgba(${darkRgb.join(', ')}, .18)`,
      borderRadius: hS(12),
      justifyContent: 'center'
   },

   toggleButton: {
      position: 'absolute',
      height: '80%',
      width: '50%',
      backgroundColor: '#fff',
      elevation: 5,
      shadowColor: darkHex,
      borderRadius: hS(10),
      left: hS(2),
      right: hS(2)
   },

   toggleBg: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: vS(2),
      paddingHorizontal: hS(4)
   },

   toggleText: {
      fontSize: hS(13),
      fontFamily: 'Poppins-Medium'
   }
})