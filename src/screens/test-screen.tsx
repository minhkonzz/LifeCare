import { memo, useRef, useEffect } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
import Screen from '@components/shared/screen'

const Box = memo(({ isViewable }: { isViewable: boolean }) => {
   console.log('run this')
   const animateValue = useRef(new Animated.Value(isViewable && 0 || 1)).current
   
   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: isViewable && 1 || 0,
         duration: 1000, 
         useNativeDriver: false
      }).start()
   }, [isViewable])

   return (
      <View style={{ height: 450, backgroundColor: 'pink' }}> 
      {
         isViewable && 
         <Animated.View 
            style={[styles.box, {
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [-150, 0]
               }) }]
            }]}>
            <Text>Hello World</Text>
         </Animated.View>
      }
      </View>
   )
})

export default (): JSX.Element => {
   return (
      <Screen full content={[
         Box, 
         Box, 
         Box, 
         Box, 
         Box, 
         Box
      ]}/>
   )
}

const styles = StyleSheet.create({
   box: {
      width: 380,
      height: 450,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center'
   }
})