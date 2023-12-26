import { memo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { CloudBackupIcon } from '@assets/icons'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
const AnimatedIcon = Animated.createAnimatedComponent(CloudBackupIcon)

export default memo(({ animateValue }: { animateValue: Animated.Value }): JSX.Element => {
   return (
      <AnimatedLinearGradient 
         style={{...styles.container, opacity: animateValue }}
         colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
         start={{ x: .5, y: 0 }}
         end={{ x: .52, y: .5 }}>
         <View>
            <Animated.Text style={{
               ...styles.title,
               opacity: animateValue, 
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [-50, 0]
               }) }]
            }}>
               Backup & Restore
            </Animated.Text>
            <Animated.Text style={{
               ...styles.desc,
               opacity: animateValue, 
               transform: [{ translateY: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [10, 0]
               }) }]
            }}>
               Sign in and synchronize your data
            </Animated.Text>
            <TouchableOpacity style={styles.syncDataButton} activeOpacity={.8}>
               <Text style={styles.syncDataButtonText}>SYNC DATA</Text>
            </TouchableOpacity>
         </View>
         <AnimatedIcon 
            style={{
               ...styles.cloudSvg,
               opacity: animateValue, 
               transform: [{ translateX: animateValue.interpolate({
                  inputRange: [0, 1], 
                  outputRange: [50, 0]
               }) }]
            }} 
            width={hS(92)} 
            height={vS(92)} />
      </AnimatedLinearGradient>
   )
})

const styles = StyleSheet.create({
   container: {
      width: hS(370),
      height: vS(160),
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: vS(24), // delete
      borderRadius: hS(24),
      paddingHorizontal: hS(16), 
      paddingVertical: vS(16)
   }, 

   title: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(15), 
      color: '#fff', 
      letterSpacing: .2
   }, 

   desc: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(10), 
      color: '#fff', 
      letterSpacing: .2,
      marginTop: vS(4)
   }, 

   syncDataButton: {
      width: hS(150), 
      height: vS(56), 
      borderRadius: hS(24), 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#fff', 
      marginTop: vS(28)
   }, 

   syncDataButtonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(12), 
      color: darkHex, 
      letterSpacing: .2,
      textTransform: 'uppercase'
   }, 

   cloudSvg: {
      marginBottom: vS(-18)
   }
})