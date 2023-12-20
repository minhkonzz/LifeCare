import { useState, useRef } from 'react'
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
const OPTION_WIDTH: number = hS(92)

const { rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

interface PrimaryToggleValue {
   options: string[],
   toggleColor?: string[],
   onChangeOption?: (selectedIndex: number) => void
   additionalStyles?: any
}

export default ({ 
   options, 
   onChangeOption, 
   additionalStyles, 
   toggleColor = [`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex] 
}: PrimaryToggleValue): JSX.Element => {
   const translateX: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const [ selectedIndex, setSelectedIndex ] = useState<number>(0)

   const changeOption = (index: number) => {
      Animated.timing(translateX, {
         toValue: index * OPTION_WIDTH,
         duration: 300, 
         useNativeDriver: true
      }).start(() => {
         if (onChangeOption) onChangeOption(index)
         setSelectedIndex(index)
      })
   }

   return (
      <View style={additionalStyles && {...styles.container, ...additionalStyles} || styles.container}>
         <AnimatedLinearGradient
            style={{...styles.toggleButton, transform: [{ translateX }] }}
            colors={toggleColor}
            start={{ x: .5, y: 0 }}
            end={{ x: .52, y: 1 }} />
         {
            options.map((e, i) => 
               <Pressable 
                  key={`${e}-${i}`} 
                  style={styles.option}
                  onPress={() => changeOption(i)}>
                  <Text style={{
                     ...styles.optionText, 
                     fontFamily: `Poppins-${i === selectedIndex && 'Bold' || 'Regular'}`,
                     color: i === selectedIndex && '#fff' || `rgba(${darkRgb.join(', ')}, .8)`
                  }}>
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
      backgroundColor: `rgba(${darkRgb.join(', ')}, .1)`
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