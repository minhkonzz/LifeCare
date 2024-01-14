import { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'       
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

export default (): JSX.Element => {
   const navigation = useNavigation<any>()
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
         <LottieView 
            style={styles.watercup}
            source={require('../assets/lottie/water-screen-animation-2.json')} 
            autoPlay />
         
         <View style={styles.texts}>
            <Animated.Text style={{
               ...styles.text, 
               ...styles.lgText,
               opacity: animateValue,
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [-30, 0]
               }) }]
            }}>
               Congrats!
            </Animated.Text>
            <Animated.Text style={{
               ...styles.text, 
               ...styles.smText,
               opacity: animateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [.7, 1]
               }), 
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [-100, 0]
               }) }]
            }}>
               You've reached your goal today
            </Animated.Text>
         </View>
         <TouchableOpacity
            style={styles.button}
            activeOpacity={.8}
            onPress={() => navigation.goBack()}
            >
            <Text style={[styles.text, styles.buttonText]}>Continue</Text>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#4682A9', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      paddingHorizontal: hS(24),
      paddingVertical: hS(22)
   }, 

   watercup: {
      width: hS(280),
      height: vS(280),
      marginTop: vS(120)
   },

   texts: {
      alignItems: 'center'
   },

   text: {
      color: '#fff', 
      letterSpacing: .2,
      fontFamily: 'Poppins-Medium'
   },

   lgText: {
      fontSize: hS(28),
      marginTop: vS(24)
   }, 

   smText: {
      fontSize: hS(16),
      marginTop: vS(8)
   }, 

   button: {
      width: '100%',
      height: vS(70), 
      borderRadius: hS(28), 
      backgroundColor: '#fff', 
      justifyContent: 'center',
      alignItems: 'center'
   },

   buttonText: {
      color: '#4682A9',
      fontSize: hS(14)
   }
})