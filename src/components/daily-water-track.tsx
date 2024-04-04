import { lightRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { useNavigation } from '@react-navigation/native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'  
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import { BluePlusIcon, WatercupIcon } from '@assets/icons'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { AnimatedPressable } from './shared/animated'
import { commonStyles } from '@utils/stylesheet'
import AnimatedText from '@components/shared/animated-text'
import LinearGradient from 'react-native-linear-gradient'
import WaterWave from '@components/water-wave'

const { hrz } = commonStyles

export default ({ animateValue }: { animateValue: Animated.Value }): JSX.Element => {
   const drinked = useSelector((state: AppStore) => state.water.drinked)
   const { dailyWater, firstTimeTrackWater } = useSelector((state: AppStore) => state.user.metadata)
   const navigation = useNavigation<any>()

   const onPress = () => { navigation.navigate(firstTimeTrackWater && 'water-overview' || 'water') }

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
               <WaterWave w={hS(127)} />
            </Animated.View>
            <View style={styles.main}>
               <Animated.View style={{
                  ...hrz, 
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
                  <View style={hrz}>
                     <AnimatedText value={dailyWater} style={styles.currentValue} /> 
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
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
   }, 

   main: {
      height: vS(127),
		justifyContent: 'space-between'
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