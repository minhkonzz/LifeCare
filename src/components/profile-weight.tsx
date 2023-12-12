import { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { PopupContext } from '@contexts/popup'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { kilogramsToPounds } from '@utils/fomular'
import { BackIcon, EditIcon } from '@assets/icons'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import ProfileWeightChart from './profile-weight-chart'
import UpdateWeightsPopup from '@components/shared/popup-content/weights'
import LinearGradient from 'react-native-linear-gradient'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

export default withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }): JSX.Element => {
   const { setPopup } = useContext<any>(PopupContext)

   const {
      currentWeight, 
      goalWeight, 
      startWeight
   } = useSelector((state: AppState) => state.user.metadata)

   return (
      isViewable && 
      <LinearGradient
         style={styles.container}
         colors={[`rgba(255, 211, 110, .2)`, `rgba(255, 211, 110, .8)`]}
         start={{ x: .5, y: 0 }}
         end={{ x: 1, y: 1 }}>
         <View style={[styles.horz, styles.header]}>
            <View style={styles.horz}>
               <Text style={styles.title}>Weight</Text>
               <TouchableOpacity
                  activeOpacity={.8} 
                  style={[styles.horz, styles.symb]}>
                  <Text style={styles.symbTitle}>lb</Text>
                  <BackIcon style={styles.symbIndicator} width={hS(5)} height={vS(8.5)} />
               </TouchableOpacity>
            </View>
            <TouchableOpacity 
               style={styles.editButton} 
               activeOpacity={.8} 
               onPress={() => setPopup(UpdateWeightsPopup)}>
               <EditIcon width={hS(16)} height={vS(16)} />
            </TouchableOpacity>
         </View>
         <View>
            <View style={styles.horz}>
               <Text style={styles.weightValue}>{`${kilogramsToPounds(currentWeight)}`}</Text>
               <Text style={styles.weightSymb}>lb</Text>
            </View>
            <View style={styles.progressBar}>
               <View style={styles.activeBar} />
            </View>
            <View style={[styles.horz, styles.progressDesc]}>
               <Text style={styles.progressText}>{`Starting: ${kilogramsToPounds(startWeight)} lb`}</Text>
               <Text style={styles.progressText}>{`Goal: ${kilogramsToPounds(goalWeight)} lb`}</Text>
            </View>
         </View>
         <ProfileWeightChart />
      </LinearGradient> || <View style={styles.container} />
   )
})

const styles = StyleSheet.create({
   container: {
      marginTop: vS(24),
      width: hS(370),
      height: vS(465), 
      borderRadius: hS(24),
      paddingRight: hS(12),
      paddingVertical: vS(16), 
      paddingLeft: hS(24)
   },

   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   header: {
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
      backgroundColor: '#fff'
   }, 

   activeBar: {
      width: '63%', 
      height: '100%', 
      borderRadius: 50
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