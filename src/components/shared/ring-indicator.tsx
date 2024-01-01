import { FC, useEffect } from 'react'
import { View } from 'react-native'
import { primaryHex, primaryRgb } from '@utils/constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, withRepeat } from 'react-native-reanimated'

interface RingIndicatorProps {
   color: string, 
   size: number
}

interface RingProps extends RingIndicatorProps {
   index: number
}

const Ring: FC<RingProps> = ({ color, size, index }) => {
   const opacityValue = useSharedValue(.7)
   const scaleValue = useSharedValue(1)

   useEffect(() => {
      opacityValue.value = withDelay(
         index * 600, 
         withRepeat(withTiming(0, {
            duration: 2500
         }), -1, false)
      )

      scaleValue.value = withDelay(
         index * 600, 
         withRepeat(withTiming(3, {
            duration: 2500
         }), -1, false)
      )
   }, [opacityValue, scaleValue, index])

   const rStyle = useAnimatedStyle(() => {
      return {
         transform: [{ scale: scaleValue.value }], 
         opacity: opacityValue.value
      }
   })

   return (
      <Animated.View style={[{
         width: size,
         height: size,
         borderRadius: size / 2, 
         position: 'absolute', 
         backgroundColor: color === 'primary' && primaryHex || color
      }, rStyle]} />
   )
}

export default ({ color, size }: RingIndicatorProps): JSX.Element => {
   const containerProps: any = {
      style: {
         width: size, 
         height: size, 
         borderRadius: size / 2, 
         ...(color === 'primary' && {} || { backgroundColor: '#30E3CA' })
      },
      ...(color === 'primary' && {
         colors: [`rgba(${primaryRgb.join(', ')}, .4)`, primaryHex], 
         start: { x: .5, y: 0 },
         end: { x: .5, y: 1 }
      } || {})
   }

   const Container = color === 'primary' && LinearGradient || View

   return (
      <Container {...containerProps}>
         {[...Array(2).keys()].map((_, i) => <Ring {...{ color, size, key: i, index: i }} />)}
      </Container>
   )
}