import { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import StrongWaveSvg from '@assets/images/strong_wave.svg'

interface WaterWaveProps {
   w: number
}

export default ({ w }: WaterWaveProps): JSX.Element => {
   const h = vS(w * 6)
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
            duration: 840, 
            useNativeDriver: true,
            easing: Easing.linear
         })
      ).start()
   }, [])

   useEffect(() => {
      Animated.timing(waterTranslateY, {
         toValue: h - vS(w * drinked / dailyWater),
         duration: 1200,
         useNativeDriver: true
      }).start()
   }, [drinked])

   return (
      <Animated.View style={{
         width: w - 5,
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