import { Pressable, StyleSheet, Text, Dimensions } from 'react-native'
import { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { getPathXCenterByIndex } from '@utils/path'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import usePath from '@hooks/usePath'

const SCREEN_WIDTH = Dimensions.get('window').width

const ICON_SIZE = hS(23)
const LABEL_WIDTH = SCREEN_WIDTH / 5

const TabItem = ({ 
   label,
   icon,
   index,
   activeIndex,
   onTabPress 
}) => {

   const Icon = icon
   const { curvedPaths } = usePath()
   const animatedActiveIndex = useSharedValue(activeIndex)
   const iconPosition = getPathXCenterByIndex(curvedPaths, index)
   const labelPosition = getPathXCenterByIndex(curvedPaths, index)

   const tabStyle = useAnimatedStyle(() => {
      const translateY = animatedActiveIndex.value - 1 === index ? -14 : 20
      const iconPositionX = iconPosition - index * ICON_SIZE;
      return {
         width: ICON_SIZE,
         height: ICON_SIZE,
         transform: [
            { translateY: withTiming(translateY) },
            { translateX: iconPositionX - ICON_SIZE / 2 },
         ]
      }
   })

   const labelContainerStyle = useAnimatedStyle(() => {
      const translateY = animatedActiveIndex.value - 1 === index ? 40 : 100;
      return {
         transform: [
            { translateY: withTiming(translateY) },
            { translateX: labelPosition - LABEL_WIDTH / 2 },
         ]
      }
   })

   const iconColor = useSharedValue('#fff')

   useEffect(() => {
      animatedActiveIndex.value = activeIndex;
      iconColor.value = withTiming('#fff')
   }, [activeIndex])
   
   return (
      <>
         <Animated.View style={tabStyle}>
            <Pressable
               testID={`tab${label}`}
               hitSlop={{top: 30, bottom: 30, left: 50, right: 50}}
               onPress={onTabPress}>
               <Icon width={ICON_SIZE} height={ICON_SIZE} />
            </Pressable>
         </Animated.View>
         <Animated.View style={[labelContainerStyle, styles.labelContainer]}>
            <Text style={styles.label}>{label}</Text>
         </Animated.View>
      </>
   )
}

export default TabItem

const styles = StyleSheet.create({
   labelContainer: {
      position: 'absolute',
      alignItems: 'center',
      width: LABEL_WIDTH,
   },

   label: {
      color: '#fff', 
      fontSize: hS(11), 
		fontFamily: 'Poppins-SemiBold' 
   }
});
