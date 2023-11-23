import { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { horizontalScale as hS, SCREEN_HEIGHT, verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import StrongWaveSvg from '@assets/images/strong_wave.svg'

interface WaterWaveProps {
   w?: number, 
   h?: number
}

export default ({ w = hS(127), h = vS(762) }: WaterWaveProps): JSX.Element => {
   console.log('screen_height:', SCREEN_HEIGHT)
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const waveAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const waterTranslateY: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   const { drinked } = useSelector((state: AppState) => state.water)
   const { dailyWater } = useSelector((state: AppState) => state.user.metadata)

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1, 
         duration: 920, 
         useNativeDriver: true
      }).start()

      Animated.loop(
         Animated.timing(waveAnimateValue, {
            toValue: 1, 
            duration: 1010, 
            useNativeDriver: true,
            easing: Easing.linear
         })
      ).start()
   }, [])

   useEffect(() => {
      Animated.timing(waterTranslateY, {
         // toValue: vS(h - h * drinked / dailyWater - 20 * h / SCREEN_HEIGHT),
         // toValue: vS(h + (20 * h / SCREEN_HEIGHT) * drinked / dailyWater),
         toValue: h - vS(63),
         duration: 1500,
         useNativeDriver: true
      }).start()
   }, [drinked])

   return (
      <Animated.View style={{
         width: w,
         height: h, 
         opacity: animateValue,
         transform: [
            { translateX: waveAnimateValue.interpolate({ inputRange: [0, 1], outputRange: [0, -Math.floor(w / 2)] }) },
            { translateY: waterTranslateY }
         ]
      }}>
         <StrongWaveSvg width='100%' height='100%' />
      </Animated.View>
   )
}