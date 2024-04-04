import useAnimValue from '@hooks/useAnimValue'
import { memo, useEffect, ComponentType } from 'react'
import { Animated } from 'react-native'

export default <P extends object>(BaseComponent: ComponentType<P>) => {
   return memo((props: any) => {
      const { isViewable } = props
      const animateValue = useAnimValue(isViewable && 0 || 1)

      useEffect(() => {
         Animated.timing(animateValue, {
            toValue: isViewable && 1 || 0,
            duration: 720,
            useNativeDriver: true
         }).start()
      }, [isViewable])

      return <BaseComponent {...{...({ isViewable, animateValue } as P), ...props}} />
   })
}