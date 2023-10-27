import { useEffect, useRef } from 'react'
import {
   View, 
   Text,
   TouchableOpacity,
   StyleSheet,
   Animated
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '@utils/constants/colors'
import { useNavigation } from '@react-navigation/native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'  
import BluePlusIcon from '@assets/icons/blue_plus.svg'
import WatercupIcon from '@assets/icons/watercup.svg'
import Wave from './wave'

const { rgb: lightRgb } = Colors.lightPrimary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export default (): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const reportAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
   const navigation = useNavigation()

   useEffect(() => {
      Animated.parallel([
         Animated.timing(animateValue, {
            toValue: 1, 
            duration: 1010, 
            useNativeDriver: true
         }),
         Animated.timing(reportAnimateValue, {
            toValue: 1, 
            delay: 100,
            duration: 1010, 
            useNativeDriver: true
         })
      ]).start()
   }, [])

   return (
      <AnimatedLinearGradient 
         style={[styles.container, { opacity: animateValue }]}
         colors={[`rgba(${lightRgb.join(', ')}, .6)`, `rgb(177, 234, 238)`]}
         start={{ x: .5, y: 0 }}
         end={{ x: .5, y: 1 }}>
         <Animated.View style={[
            styles.waves, 
            {
               opacity: animateValue, 
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [-50, 0]
               }) }]
            }
         ]}>
            <Wave w={hS(58)} h={vS(56)} />
         </Animated.View>
         <View style={styles.main}>
            <Animated.View 
               style={[
                  styles.horz, 
                  styles.header, 
                  {
                     transform: [{ translateX: animateValue.interpolate({
                        inputRange: [0, 1], 
                        outputRange: [100, 0] 
                     }) }]
                  }
               ]}>
               <Text style={styles.headerText}>Drink water</Text>
					<WatercupIcon width={hS(12)} height={vS(14)} />
            </Animated.View>
            <Animated.View 
               style={[
                  styles.value, 
                  {
                     transform: [{ translateX: reportAnimateValue.interpolate({
                        inputRange: [0, 1], 
                        outputRange: [150, 0]
                     }) }]
                  }
               ]}>
               <Text style={styles.currentValueText}>1650 / </Text>
               <View style={styles.horz}>
                  <Text style={styles.currentValue}>3000</Text>
                  <Text style={styles.symbolText}>ml</Text>
               </View>
            </Animated.View>
            <AnimatedTouchableOpacity 
               style={[styles.updateButton, { transform: [{ scale: animateValue }] }]} 
               activeOpacity={.7}
               onPress={() => navigation.navigate('water')}>
					<BluePlusIcon width={hS(15)} height={vS(14)} />
				</AnimatedTouchableOpacity>
         </View>
      </AnimatedLinearGradient>
   )
}

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
		shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`
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