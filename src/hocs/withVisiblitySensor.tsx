import { memo, useRef, useEffect, ComponentType } from 'react'
import { Animated } from 'react-native'

export default <P extends object>(BaseComponent: ComponentType<P>) => {
   return memo(({ isViewable }: { isViewable: boolean }) => {
      const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
      
      useEffect(() => {
         Animated.timing(animateValue, {
            toValue: isViewable && 1 || 0,
            duration: 840,
            useNativeDriver: true
         }).start()
      }, [isViewable])

      return <BaseComponent {...({ isViewable, animateValue } as P)} />
   })
}