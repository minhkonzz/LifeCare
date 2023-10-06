import { StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'

const circleContainerSize = hS(61)

export default ({ circleX }: { circleX: SharedValue<number> }) => {
   const circleContainerStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
   }), []);
   return <Animated.View style={[circleContainerStyle, styles.container]} />
}

const styles = StyleSheet.create({
   container: {
      position: 'absolute',
      top: -circleContainerSize / 1.8,
      width: circleContainerSize,
      borderRadius: circleContainerSize,
      height: circleContainerSize,
      backgroundColor: '#30E3CA',
      justifyContent: 'center',
      alignItems: 'center',
   },
})

