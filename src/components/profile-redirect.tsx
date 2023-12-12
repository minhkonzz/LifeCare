import { ReactNode, useRef, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { BackIcon } from '@assets/icons'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface ProfileRedirectProps {
   title: string, 
   onPress?: () => void
   children?: ReactNode
}

export default ({ title, onPress, children }: ProfileRedirectProps): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   
   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1,
         duration: 840,
         useNativeDriver: true
      }).start()
   }, [])

   return (
      <AnimatedPressable 
         style={{
            ...styles.horz, 
            ...styles.container,
            opacity: animateValue,
            transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [-50, 0]
				}) }]
         }} 
         {...{ onPress }}>
         <View style={styles.horz}>
            { children }
            <Text style={styles.title}>{title}</Text>
         </View>
         <BackIcon style={styles.redirectIc} width={hS(7)} height={vS(12)} />
      </AnimatedPressable>
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