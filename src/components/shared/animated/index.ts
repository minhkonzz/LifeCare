import { ComponentType } from 'react'
import { Animated, TouchableOpacity, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
export const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
export const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export const createAnimatedIcon = (icon: ComponentType<any>) => {
   return Animated.createAnimatedComponent(icon)
}