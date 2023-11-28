import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { NavigationProp } from '@react-navigation/native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, SCREEN_HEIGHT, verticalScale as vS } from '@utils/responsive'
import { INCREASE, DECREASE } from '@utils/constants/indent'
import { updateLiquid, resetSpecs } from '../store/water'
import { BackIcon, SettingIcon, WhitePlusIcon, StrongBlueMinusIcon } from '@assets/icons'
import { WaveSvg } from '@assets/images'
import UserService from '@services/user'
import LinearGradient from 'react-native-linear-gradient'
import AnimatedNumber from '@components/shared/animated-text'

import {
   View,
   Text,
   StyleSheet,
   Animated,
   TouchableOpacity, 
   Pressable, 
   Easing
} from 'react-native'

const darkPrimary: string = Colors.darkPrimary.hex
const lightBlue: string = Colors.lightBlue.hex
const strongBlue: string = Colors.strongBlue.hex

export default ({ navigation }: { navigation: NavigationProp<any> }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const waveAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const waterTranslateY: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const { drinked: liquidDrinked, cupsize, needSync, specs, date, changes } = useSelector((state: AppState) => state.water)
   const { dailyWater } = useSelector((state: AppState) => state.user.metadata)
   const { session } = useSelector((state: AppState) => state.user)
   const userId: string = session?.user?.id
   const dispatch = useDispatch()

   console.log('changes:', changes)
   console.log('specs:', specs)

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1, 
         duration: 920, 
         useNativeDriver: true
      }).start()

      Animated.loop(
         Animated.timing(waveAnimateValue, {
            toValue: 1, 
            duration: 1010, 
            useNativeDriver: true,
            easing: Easing.linear
         })
      ).start()
   }, [])

   useEffect(() => {
      Animated.timing(waterTranslateY, {
         toValue: vS(SCREEN_HEIGHT - SCREEN_HEIGHT * liquidDrinked / dailyWater - 20),
         duration: 1500,
         useNativeDriver: true
      }).start()
   }, [liquidDrinked])

   const increaseLiquid = () => {
      dispatch(updateLiquid(INCREASE))
   }

   const decreaseLiquid = () => {
      if (!liquidDrinked) return
      dispatch(updateLiquid(DECREASE))
   }

   const onSync = async () => {
      await UserService.syncDailyWater({
         userId,
         date,
         drinked: liquidDrinked,
         goal: dailyWater,
         specs
      })
      console.log('daily water sync success')
      dispatch(resetSpecs())
   }

   return (
      <View style={styles.container}>
         <Animated.View style={{
            ...styles.waveContainer,
            opacity: animateValue,
            transform: [
               { translateX: waveAnimateValue.interpolate({ inputRange: [0, 1], outputRange: [0, hS(-378)] }) },
               { translateY: waterTranslateY }
            ]
         }}>
            <WaveSvg width={hS(792)} height='100%' />
         </Animated.View>
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
                  style={{
                     ...styles.totalMilTextWrapper,    
                     opacity: animateValue, 
                     transform: [{ translateX: animateValue.interpolate({
                        inputRange: [0, 1], 
                        outputRange: [-50, 0]
                     }) }]
                  }}>
                  <AnimatedNumber style={styles.totalMilText} value={liquidDrinked} />
                  <Text style={[styles.totalMilText, styles.totalMilSymbText]}>ml</Text>
               </Animated.View>
               <Animated.Text 
                  style={{
                     ...styles.goalMilText, 
                     opacity: animateValue, 
                     transform: [{ translateY: animateValue.interpolate({
                        inputRange: [0, 1], 
                        outputRange: [-20, 0]
                     }) }]
                  }}>
                  {`Goal today: ${dailyWater} ml`}
               </Animated.Text>

               { needSync && 
               <TouchableOpacity
                  style={styles.syncButton}
                  activeOpacity={.7}
                  onPress={onSync}>
                  <Text>Sync</Text>
               </TouchableOpacity> }

            </View>
            <View style={styles.updates}>
               <TouchableOpacity style={styles.increaseMilButton} activeOpacity={.9} onPress={increaseLiquid}>
                  <LinearGradient
                     style={styles.increaseMilButton}
                     colors={[lightBlue, `rgba(${Colors.strongBlue.rgb.join(', ')}, .6)`]}
                     start={{ x: .2, y: 0 }}
                     end={{ x: .5, y: 1 }}>
                     <WhitePlusIcon width={hS(20)} height={vS(20)} />
                     <Text style={styles.increaseMilAmount}>{`${cupsize} ml`}</Text>
                  </LinearGradient>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.sideUpdateButton}
                  activeOpacity={.8}
                  onPress={decreaseLiquid}>
                  <StrongBlueMinusIcon width={hS(22)} />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },

   syncButton: {
      width: hS(80),
      height: vS(80),
      borderRadius: hS(40),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: vS(30)
   },

   waveContainer: {
      width: hS(792),
      height: vS(4800),
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
      borderRadius: 500, 
      marginTop: vS(22)
   },

   increaseMilAmount: {
      fontFamily: 'Poppins-Medium',
      color: '#fff',
      marginTop: 10
   }
})
