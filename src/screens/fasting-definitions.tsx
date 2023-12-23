import { useRef, useEffect } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'

export default (): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1,
         duration: 840,
         useNativeDriver: true
      }).start()
   }, [])

   return (
      <View style={styles.container}>
         
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: hS(22)
   }
})