import { memo, useEffect, useRef } from 'react'
import { Colors } from '@utils/constants/colors'
import { useNavigation } from '@react-navigation/native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'  
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { BluePlusIcon, WatercupIcon } from '@assets/icons'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import WaterWave from '@components/water-wave'

const { rgb: lightRgb } = Colors.lightPrimary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default memo((): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const drinked = useSelector((state: AppState) => state.water.drinked)
   const dailyWater = useSelector((state: AppState) => state.user.metadata?.dailyWater)
   const navigation = useNavigation<any>()

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1, 
         duration: 840, 
         useNativeDriver: true
      }).start()
   }, [])

   const onPress = () => { navigation.navigate('water') }

   return (
      <AnimatedPressable style={{ opacity: animateValue }} {...{ onPress }}>
         <LinearGradient 
            style={styles.container}
            colors={[`rgba(${lightRgb.join(', ')}, .6)`, `rgb(177, 234, 238)`]}
            start={{ x: .5, y: 0 }}
            end={{ x: .5, y: 1 }}>
            <Animated.View style={{
               ...styles.waves, 
               opacity: animateValue, 
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [-50, 0]
               }) }]
            }}>
               <WaterWave />
            </Animated.View>
            <View style={styles.main}>
               <Animated.View style={{
                  ...styles.horz, 
                  ...styles.header, 
                  transform: [{ translateX: animateValue.interpolate({
                     inputRange: [0, 1], 
                     outputRange: [50, 0] 
                  }) }]
               }}>
                  <Text style={styles.headerText}>Drink water</Text>
                  <WatercupIcon width={hS(12)} height={vS(14)} />
               </Animated.View>
               <Animated.View style={{
                  ...styles.value, 
                  transform: [{ translateX: animateValue.interpolate({
                     inputRange: [0, 1], 
                     outputRange: [50, 0]
                  }) }]
               }}>
                  <Text style={styles.currentValueText}>{`${drinked} / `}</Text>
                  <View style={styles.horz}>
                     <Text style={styles.currentValue}>{dailyWater}</Text>
                     <Text style={styles.symbolText}>ml</Text>
                  </View>
               </Animated.View>
               <TouchableOpacity 
                  style={styles.updateButton} 
                  activeOpacity={.7}
                  {...{ onPress }}>
                  <BluePlusIcon width={hS(15)} height={vS(14)} />
               </TouchableOpacity>
            </View>
         </LinearGradient>
      </AnimatedPressable>
   )
})

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: hS(176),
		height: vS(161),
		borderTopLeftRadius: hS(48),
		borderBottomLeftRadius: hS(48),
		borderTopRightRadius: hS(28),
		borderBottomRightRadius: hS(28),
		paddingVertical: vS(14),
		paddingHorizontal: hS(11),
		elevation: 8,
		shadowColor: `rgba(235, 243, 255, .8)`,
      overflow: 'hidden'
   }, 

   waves: {
      width: hS(56),
		height: vS(127),
		borderRadius: 100,
      justifyContent: 'flex-end',
		backgroundColor: '#fff',
      overflow: 'hidden'
   },

   updateButton: {
      width: hS(36),
		height: vS(36),
		borderRadius: 200,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end',
		elevation: 7,
		marginBottom: vS(-8),
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
   }, 

   main: {
      height: vS(127),
		justifyContent: 'space-between'
   },

   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   header: {
      marginRight: hS(4)
   },

   headerText: {
      fontFamily: 'Poppins-Medium',
		fontSize: hS(10),
		color: `rgba(${darkRgb.join(', ')}, .8)`,
		letterSpacing: .4,
      marginRight: 4
   }, 

   value: {
      marginRight: hS(4)
   }, 

   currentValueText: {
      fontFamily: 'Poppins-Medium',
		fontSize: hS(10),
      color: `rgba(${darkRgb.join(', ')}, .6)`,
      letterSpacing: .4
   },

   symbolText: {
      fontFamily: 'Poppins-Medium',
		fontSize: hS(8),
		color: `rgba(${darkRgb.join(', ')}, .6)`,
      marginLeft: hS(4),
		marginTop: vS(4),
		letterSpacing: .4
   },

   currentValue: {
      fontFamily: 'Poppins-SemiBold',
		fontSize: hS(22),
		color: darkHex,
		letterSpacing: .4
   }
})