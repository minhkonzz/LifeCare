import { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { darkHex, strongBlueHex } from '@utils/constants/colors'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { enqueueAction, updateMetadata } from '../store/user'

import withSync from '@hocs/withSync'
import UserService from '@services/user'
import LottieView from 'lottie-react-native'
import useSession from '@hooks/useSession'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'

export default withSync(({ isOnline }: { isOnline: boolean }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const { userId } = useSession()
   const dispatch = useDispatch()
   const navigation = useNavigation<any>()

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1, 
         duration: 840,
         useNativeDriver: true
      }).start()
   }, [])

   const onPress = async () => {
      const payload = { firstTimeWaterTrack: false }

      const cache = () => {
         dispatch(updateMetadata(payload))
         if (userId && !isOnline) {
            dispatch(enqueueAction({
               userId,
               actionId: autoId('qaid'),
               invoker: 'updatePersonalData',
               name: 'UPDATE_FIRST_TRACK_WATER',
               params: [userId, payload]
            }))
         }
      }

      if (userId) {
         const errorMessage: string = await UserService.updatePersonalData(userId, payload)
         if (errorMessage === NETWORK_REQUEST_FAILED) cache()
      } 
      else cache()
      navigation.navigate('water')
   }

   return (
      <View style={styles.container}>
         <View>
            <LottieView 
               style={styles.lottie}
               source={require('../assets/lottie/water-screen-animation-3.json')} 
               autoPlay />
            <Animated.Text style={{
               ...styles.title,
               opacity: animateValue,
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 0]
               }) }]
            }}>
               Usually drink water during fasting period is very important
            </Animated.Text>
         </View>
         <TouchableOpacity {...{ onPress, style: styles.button, activeOpacity: .8 }}>
            <Text style={styles.buttonText}>Start tracking</Text>
         </TouchableOpacity>
      </View>
   )
})

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'space-between', 
      alignItems: 'center',
      paddingHorizontal: hS(24),
      paddingVertical: vS(22)
   },

   lottie: {
      width: hS(320),
      height: hS(320),
      marginTop: vS(60)
   },

   title: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(16),
      color: darkHex,
      letterSpacing: .2,
      textAlign: 'center', 
      lineHeight: vS(28)
   },

   button: {
      width: '100%',
      height: vS(72),
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor: strongBlueHex,
      borderRadius: hS(32),
      marginBottom: vS(6)
   },

   buttonText: {
      color: '#fff',
      fontFamily: 'Poppins-Medium',
      letterSpacing: .2,
      fontSize: hS(13)
   }
})