import { useState, useCallback } from 'react'
import { View, Text, StyleSheet, Platform, StatusBar, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { darkHex } from '@utils/constants/colors'
import Login from '@components/signin'
import Register from '@components/signup'
import LottieView from 'lottie-react-native'
import useAnimValue from '@hooks/useAnimValue'

const messageIcons = {
   success: require('../assets/lottie/success-float.json'), 
   error: require('../assets/lottie/error-float.json')
}

export default (): JSX.Element => {
   const animateValue = useAnimValue(0)
   const navigation = useNavigation<any>()
   const bottomBarHeight: number = useDeviceBottomBarHeight()
   const [ isLogin, setIsLogin ] = useState<boolean>(true)
   const AuthComponent = isLogin && Login || Register
   const [ messagePopup, setMessagePopup ] = useState<{ message: string, type: string } | null>(null)

   const invokeAuthMessage = useCallback((message: string, type: string) => {
      setMessagePopup({ message, type })
      Animated.sequence([
         Animated.timing(animateValue, {
            toValue: 1,
            duration: 320, 
            useNativeDriver: true
         }), 
         Animated.timing(animateValue, {
            toValue: 0,
            delay: 3500,
            duration: 320,
            useNativeDriver: true
         })
      ]).start()
   }, [])

   return (
      <View style={{...styles.container, paddingBottom: vS(18) + bottomBarHeight }}>
         <AuthComponent {...{ setIsLogin, invokeAuthMessage, navigation }} />
         {
            messagePopup && 
            <Animated.View style={{...styles.messagePopup, transform: [{ translateY: animateValue.interpolate({ 
               inputRange: [0, 1], 
               outputRange: [0, vS(225)]
            }) }]}}>
               <LottieView source={messageIcons[messagePopup.type]} style={styles.messageIc} autoPlay loop={false} />
               <Text style={styles.messageText}>{messagePopup.message}</Text>
            </Animated.View>
         }
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingHorizontal: hS(22),
      paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
   },

   messagePopup: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: hS(-200),
      paddingHorizontal: hS(12),
      paddingVertical: vS(8),
      backgroundColor: '#fff',
      elevation: 12, 
      shadowColor: darkHex,
      borderRadius: hS(12)
   },

   messageText: {
      width: hS(300),
      fontFamily: 'Poppins-Medium',
      fontSize: hS(12),
      color: darkHex,
      letterSpacing: .2, 
      marginLeft: hS(12), 
      marginTop: vS(5)
   }, 

   messageIc: {
      width: hS(40),
      height: vS(40)
   }
})
