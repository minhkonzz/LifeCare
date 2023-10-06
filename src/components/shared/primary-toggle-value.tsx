import { useState, useRef } from 'react'
import {
   View, 
   Text, 
   StyleSheet, 
   Pressable, 
   Animated
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

const options: Array<string> = ["cm/ft", "kg/lb"]
const darkPrimary: string = Colors.darkPrimary.hex
const OPTION_WIDTH: number = hS(98)

interface PrimaryToggleValue {
   onChangeOption?: () => void
}

export default ({ onChangeOption }: PrimaryToggleValue): JSX.Element => {
   const translateX: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const [ selectedIndex, setSelectedIndex ] = useState<number>(0)

   const changeOption = (index: number) => {
      Animated.timing(translateX, {
         toValue: index * OPTION_WIDTH,
         duration: 300, 
         useNativeDriver: true
      }).start(({ finished }) => {
         if (onChangeOption) onChangeOption()
         setSelectedIndex(index)
      })
   }

   return (
      <View style={styles.container}>
         <AnimatedLinearGradient
            style={[styles.toggleButton, { transform: [{ translateX }] }]}
            colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
            start={{ x: .5, y: 0 }}
            end={{ x: .52, y: 1 }} />
         {
            options.map((e, i) => 
               <Pressable 
                  key={`${e}-${i}`} 
                  style={styles.option}
                  onPress={() => changeOption(i)}>
                  <Text style={[
                     styles.optionText, 
                     {  
                        fontFamily: `Poppins-${i === selectedIndex && 'Bold' || 'Regular'}`,
                        color: i === selectedIndex && '#fff' || `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`
                     }
                  ]}>
                     {e}
                  </Text>
               </Pressable>
            )
         }
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      borderRadius: 100,
      backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .1)`
   }, 

   toggleButton: {
      position: 'absolute',
      borderRadius: 100,
      width: OPTION_WIDTH,
      height: vS(45)
   }, 

   options: {
      flexDirection: 'row'
   },

   option: {
      width: OPTION_WIDTH,
      height: vS(45), 
      justifyContent: 'center', 
      alignItems: 'center'
   }, 

   optionText: {
      fontSize: hS(12), 
      letterSpacing: .2
   }
})