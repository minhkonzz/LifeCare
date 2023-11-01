import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { NavigationProp } from '@react-navigation/native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS, SCREEN_HEIGHT } from '@utils/responsive'
import { INCREASE, DECREASE } from '@utils/constants/indent'
import { updateLiquid } from '../store/water'
import LinearGradient from 'react-native-linear-gradient'
import BackIcon from '@assets/icons/goback.svg'
import SettingIcon from '@assets/icons/setting.svg'
import WhitePlusIcon from '@assets/icons/white_plus.svg'
import StrongBlueMinusIcon from '@assets/icons/strong_blue_minus.svg'
import WaterWave from '@components/wave'
import AnimatedNumber from '@components/shared/animated-text'
import {
   View,
   Text,
   StyleSheet,
   Animated,
   TouchableOpacity, 
   Pressable
} from 'react-native'

const darkPrimary: string = Colors.darkPrimary.hex
const lightBlue: string = Colors.lightBlue.hex
const strongBlue: string = Colors.strongBlue.hex

export default ({ navigation }: { navigation: NavigationProp<any> }): JSX.Element => {
   // const waterHeight: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const liquidDrinked = useSelector((state: AppState) => state.water.drinked)
   const dispatch = useDispatch()

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1, 
         duration: 920, 
         useNativeDriver: true
      }).start()
   }, [])

   const increaseLiquid = () => {
      // Animated.timing(waterHeight, {
      //    toValue: waterHeight._value + vS(200) * SCREEN_WIDTH / total, 
      //    duration: 500, 
      //    useNativeDriver: false
      // }).start()
      dispatch(updateLiquid(INCREASE))
   }

   const decreaseLiquid = () => {
      // Animated.timing(waterHeight, {
      //    toValue: waterHeight._value - vS(200) * SCREEN_WIDTH / total, 
      //    duration: 500, 
      //    useNativeDriver: false
      // }).start()
      dispatch(updateLiquid(DECREASE))
   }

   return (
      <View style={styles.container}>
         <View style={styles.waveContainer}>
            <WaterWave w={SCREEN_HEIGHT - 300} h={SCREEN_HEIGHT - 300} />
         </View>
         <View style={styles.interacts}>
            <View style={styles.header}>
               <BackIcon width={hS(14)} height={vS(14)} />
               <Text style={styles.headerTitle}>Total today</Text>
               <Pressable onPress={() => navigation.navigate('water-setting') }>
                  <SettingIcon width={hS(18)} height={vS(18)} />
               </Pressable>
            </View>
            <View style={styles.results}>
               <Animated.View 
                  style={[
                     styles.totalMilTextWrapper, 
                     {
                        opacity: animateValue, 
                        transform: [{ translateX: animateValue.interpolate({
                           inputRange: [0, 1], 
                           outputRange: [-150, 0]
                        }) }]
                     }
                  ]}>
                  <AnimatedNumber style={styles.totalMilText} value={liquidDrinked} />
                  <Text style={[styles.totalMilText, styles.totalMilSymbText]}>ml</Text>
               </Animated.View>
               <Animated.Text 
                  style={[
                     styles.goalMilText, 
                     {
                        opacity: animateValue, 
                        transform: [{ translateY: animateValue.interpolate({
                           inputRange: [0, 1], 
                           outputRange: [-20, 0]
                        }) }]
                     }
                  ]}>
                  {`Goal today: ${3000} ml`}
               </Animated.Text>
            </View>
            <View style={styles.updates}>
               <TouchableOpacity style={styles.increaseMilButton} activeOpacity={.9} onPress={increaseLiquid}>
                  <LinearGradient
                     style={styles.increaseMilButton}
                     colors={[lightBlue, `rgba(${Colors.strongBlue.rgb.join(', ')}, .6)`]}
                     start={{ x: .2, y: 0 }}
                     end={{ x: .5, y: 1 }}>
                     <WhitePlusIcon width={hS(20)} height={vS(20)} />
                     <Text style={styles.increaseMilAmount}>200 ml</Text>
                  </LinearGradient>
               </TouchableOpacity>
               <View style={styles.sideUpdates}>
                  <TouchableOpacity
                     style={styles.sideUpdateButton}
                     activeOpacity={.8}
                     onPress={decreaseLiquid}>
                     <StrongBlueMinusIcon width={hS(22)} />
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.sideUpdateButton}
                     activeOpacity={.8}>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },

   waveContainer: {
      left: 0, 
      right: 0,
      bottom: 0,
      position: 'absolute'
   },

   header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },

   headerTitle: {
      fontSize: hS(15),
      fontFamily: 'Poppins-SemiBold',
      color: darkPrimary
   },

   interacts: {
      flex: 1,
      paddingBottom: vS(90),
      paddingHorizontal: hS(22),
      justifyContent: 'space-between',
      alignItems: 'center', 
      paddingTop: vS(22)
   },

   results: {
      alignItems: 'center',
      marginBottom: vS(50)
   },

   totalMilTextWrapper: { 
      flexDirection: 'row', 
      alignItems: 'flex-end', 
      justifyContent: 'space-between'
   },

   totalMilText: {
      fontSize: hS(36),
      fontFamily: 'Poppins-SemiBold',
      color: strongBlue
   },

   totalMilSymbText: {
      marginLeft: hS(8)
   },

   goalMilText: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(14),
      color: darkPrimary
   },

   updates: {
      width: '75%',
      alignItems: 'center'
   },

   increaseMilButton: {
      width: hS(110),
      height: vS(110),
      borderRadius: 500,
      justifyContent: 'center',
      alignItems: 'center'
   },

   sideUpdates: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },

   sideUpdateButton: {
      width: hS(70),
      height: vS(70),
      backgroundColor: `rgba(${Colors.strongBlue.rgb.join(', ')}, .2)`,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 500
   },

   increaseMilAmount: {
      fontFamily: 'Poppins-Medium',
      color: '#fff',
      marginTop: 10
   }
})
