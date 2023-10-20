
import Svg, { Path } from 'react-native-svg'
import { WaterWaveProps } from '@utils/interfaces'
import Animated, { 
   useSharedValue, 
   useAnimatedProps, 
   withTiming, 
   withDelay, 
   withRepeat
} from 'react-native-reanimated'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export default ({ w, h }: WaterWaveProps): JSX.Element => {
   const c1y = useSharedValue(.2)
   const c2y = useSharedValue(.8)
   const animatedProps = useAnimatedProps(() => {
      const path = [
         'M 0 0.5', 
         `C 0.4 ${c1y.value}, 0.6 ${c2y.value}, 1 0.5`, 
         'V 1', 
         'H 0'
      ].join(' ')
      return { d: path }
   })

   c1y.value = withRepeat(withTiming(.8, { duration: 500 }), -1, true)
   c2y.value = withDelay(
      200, 
      withRepeat(withTiming(.2, { duration: 500 }), -1, true)
   )

   return (
      <Svg style={{ width: w, height: h }} viewBox='0 0 1 1'>
         <AnimatedPath fill='#91C8E4' {...{ animatedProps }} />
      </Svg>   
   )
}