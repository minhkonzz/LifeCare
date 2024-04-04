import { useRef } from 'react'
import { Animated } from 'react-native'

export default function useAnimValue(initialValue: number) {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(initialValue)).current
   return animateValue
}