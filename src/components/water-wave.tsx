import { useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import WaveSvg from '@assets/images/strong_wave.svg'
import useAnimValue from '@hooks/useAnimValue'

interface WaterWaveProps {
   w: number,
   full?: boolean
}

export default ({ w, full }: WaterWaveProps): JSX.Element => {
   const h = w * 6
   const animateValue = useAnimValue(0)
   const waveAnimateValue = useAnimValue(0)
   const waterTranslateY = useAnimValue(0)

   const { drinked } = useSelector((state: AppStore) => state.water)
   const { dailyWater } = useSelector((state: AppStore) => state.user.metadata)

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1, 
         duration: 1010, 
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
         toValue: (full ? w : h) - w * drinked / dailyWater - w * 20 / 100,
         duration: 1200,
         useNativeDriver: true
      }).start()
   }, [drinked])

   return (
      <Animated.View style={{
         position: 'absolute',
         width: w - 5,
         height: h, 
         opacity: animateValue,
         transform: [
            { translateX: waveAnimateValue.interpolate({ inputRange: [0, 1], outputRange: [0, -Math.floor(w / 2.1)] }) },
            { translateY: waterTranslateY }
         ]
      }}>
         <WaveSvg width='100%' height='100%' />
      </Animated.View>
   )
}