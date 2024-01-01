import { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { PopupContext } from '@contexts/popup'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { kilogramsToPounds } from '@utils/fomular'
import { BackIcon, EditIcon } from '@assets/icons'
import { AnimatedLinearGradient } from './shared/animated'
import AnimatedText from './shared/animated-text'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import ProfileWeightChart from './profile-weight-chart'
import UpdateWeightsPopup from '@components/shared/popup/weights'

export default withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }): JSX.Element => {
   const { setPopup } = useContext<any>(PopupContext)
   const {
      currentWeight, 
      goalWeight, 
      startWeight
   } = useSelector((state: AppState) => state.user.metadata)

   const percent: number = Math.floor((currentWeight - startWeight) / (goalWeight - startWeight) * 100)

   return (
      isViewable && 
      <AnimatedLinearGradient
         style={{
            ...styles.container,
            opacity: animateValue,
            transform: [{ translateX: animateValue.interpolate({
               inputRange: [0, 1],
               outputRange: [-50, 0]
            }) }]
         }}
         colors={[`rgba(255, 211, 110, .2)`, `rgba(255, 211, 110, .8)`]}
         start={{ x: .5, y: 0 }}
         end={{ x: 1, y: 1 }}>
         <View style={[styles.horz, styles.header]}>
            <Animated.View style={{
               ...styles.horz,
               opacity: animateValue,
               transform: [{ translateY: animateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0]
               }) }]
            }}>
               <Text style={styles.title}>Weight</Text>
               <TouchableOpacity
                  activeOpacity={.8} 
                  style={[styles.horz, styles.symb]}>
                  <Text style={styles.symbTitle}>lb</Text>
                  <BackIcon style={styles.symbIndicator} width={hS(5)} height={vS(8.5)} />
               </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity 
               style={styles.editButton} 
               activeOpacity={.8} 
               onPress={() => setPopup(UpdateWeightsPopup)}>
               <EditIcon width={hS(16)} height={vS(16)} />
            </TouchableOpacity>
         </View>
         <View style={styles.main}>
            <View style={styles.horz}>
               <AnimatedText style={styles.weightValue} value={kilogramsToPounds(currentWeight)} />
               <Text style={styles.weightSymb}>lb</Text>
            </View>
            <View style={styles.progressBar}>
               <View style={{...styles.activeBar, width: `${percent}%`}} />
            </View>
            <View style={[styles.horz, styles.progressDesc]}>
               <Animated.Text style={{
                  ...styles.progressText,
                  opacity: animateValue,
                  transform: [{ translateX: animateValue.interpolate({
                     inputRange: [0, 1],
                     outputRange: [-30, 0]
                  }) }] 
               }}>
                  {`Start: ${kilogramsToPounds(startWeight)} lb`}
               </Animated.Text>
               <Animated.Text style={{
                  ...styles.progressText,
                  opacity: animateValue,
                  transform: [{ translateX: animateValue.interpolate({
                     inputRange: [0, 1], 
                     outputRange: [30, 0]
                  }) }]
               }}>
                  {`Goal: ${kilogramsToPounds(goalWeight)} lb`}
               </Animated.Text>
            </View>
         </View>
         <ProfileWeightChart />
      </AnimatedLinearGradient> || <View style={styles.container} />
   )
})

const styles = StyleSheet.create({
   container: {
      marginTop: vS(24),
      width: hS(370),
      height: vS(560), 
      borderRadius: hS(24),
      alignItems: 'center',
      paddingRight: hS(12),
      paddingVertical: vS(16), 
      paddingLeft: hS(24)
   },

   main: {
      width: '100%',
   },

   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   header: {
      width: '100%',
      justifyContent: 'space-between', 
      marginBottom: vS(16)
   },

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(15), 
      color: darkHex, 
      letterSpacing: .2
   }, 

   symb: {
      width: hS(65), 
      height: vS(30), 
      borderRadius: 100, 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .16)`, 
      marginLeft: hS(13), 
      justifyContent: 'center', 
      alignItems: 'center'
   },

   symbTitle: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(14), 
      color: darkHex, 
      letterSpacing: .2, 
      marginRight: hS(8)
   },

   symbIndicator: {
      transform: [{ rotate: '-90deg' }]
   },

   editButton: {
      width: hS(36), 
      height: vS(36), 
      borderRadius: hS(18), 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: `rgba(${darkRgb.join(', ')}, .12)`
   }, 

   weightValue: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(28), 
      color: darkHex, 
      letterSpacing: .2
   }, 

   weightSymb: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(14), 
      color: darkHex, 
      letterSpacing: .2, 
      marginLeft: hS(10), 
      marginTop: vS(8)
   },

   progressBar: {
      width: '100%', 
      height: vS(10), 
      borderRadius: 50, 
      backgroundColor: '#fff',
      overflow: 'hidden'
   }, 

   activeBar: {
      width: '63%', 
      height: '100%', 
      borderRadius: 100,
      backgroundColor: 'rgba(255, 183, 43, .6)'
   },

   progressText: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(10),
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2
   }, 

   progressDesc: {
      marginTop: vS(8), 
      justifyContent: 'space-between'
   },

   chart: {
      flexDirection: 'row', 
      marginTop: vS(32)
   },

   chartValue: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(10),
      color: darkHex,
      letterSpacing: .2
   },

   dayDecor: {
      width: hS(1),
      height: vS(220)
   }
})