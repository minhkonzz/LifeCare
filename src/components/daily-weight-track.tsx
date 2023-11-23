import { 
   memo, 
   useEffect, 
   useRef, 
   useContext
} from 'react'
import {
   View, 
   Text,
   Pressable,
   Image,
   Animated,  
   StyleSheet
} from 'react-native'
import BackIcon from '@assets/icons/goback.svg'
import EditIcon from '@assets/icons/edit.svg'
import LinearGradient from 'react-native-linear-gradient'
import UpdateWeightsPopup from '@components/shared/popup-content/weights'
import { useNavigation } from '@react-navigation/native'
import { PopupContext } from '@contexts/popup'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { kilogramsToPounds } from '@utils/fomular'
import { useSelector } from 'react-redux'
import { AppState } from '../store'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default memo(({ isViewable }: { isViewable: boolean }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
   const { startWeight, goalWeight, currentWeight } = useSelector((state: AppState) => state.user.metadata)
   const change: number = kilogramsToPounds(currentWeight - startWeight)
   const { setPopup } = useContext<any>(PopupContext)
   const navigation = useNavigation<any>()

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: isViewable && 1 || 0, 
         duration: 1010, 
         useNativeDriver: true
      }).start()
   }, [isViewable])

   return (
      isViewable && 
      <AnimatedPressable style={[styles.container, { opacity: animateValue }]}>
         <LinearGradient
            style={styles.wrapper}
            colors={[`rgba(255, 211, 110, .36)`, `rgba(255, 211, 110, .8)`]}
            start={{ x: .5, y: 0 }}
				end={{ x: .52, y: .5 }}>
            <View style={[styles.header, styles.horz]}>
               <Animated.Text 
                  style={{
                     ...styles.title, 
                     opacity: animateValue, 
                     transform: [{ translateX: animateValue.interpolate({
                        inputRange: [0, 1], 
                        outputRange: [-50, 0]
                     }) }]
                  }}>
                  Weight
               </Animated.Text>
               <BackIcon style={styles.backIc} width={hS(6.5)} height={vS(10)} />
            </View>
            <View style={styles.current}>
					<Animated.View 
                  style={[
                     styles.current2, 
                     {
                        opacity: animateValue, 
                        transform: [{ translateX: animateValue.interpolate({
                           inputRange: [0, 1], 
                           outputRange: [-50, 0]
                        }) }]
                     }
                  ]}>
						<Text style={styles.current3}>{`${kilogramsToPounds(currentWeight)}`}</Text>
						<View style={styles.current4}>
							<Text style={styles.current5}>lb</Text>
							<View style={styles.current6}>
								<Text style={styles.current7}>{`${change}`}</Text>
							</View>
						</View>
					</Animated.View>
					<AnimatedPressable 
                  style={[
                     styles.editButton, 
                     {
                        opacity: animateValue,
                        transform: [{ translateX: animateValue.interpolate({
                           inputRange: [0, 1], 
                           outputRange: [50, 0]
                        }) }]
                     }
                  ]}
                  onPress={() => setPopup(UpdateWeightsPopup)}>
						<EditIcon width={hS(16)} height={vS(16)} />
					</AnimatedPressable>
				</View>
            <View style={styles.progressBar}>
               <Text style={styles.progressText}>{`${(currentWeight - startWeight) / (goalWeight - startWeight) * 100}%`}</Text>
               <LinearGradient
						style={styles.activeBar}
						colors={['#ffb72b', `rgba(255, 183, 43, .6)`]}
						start={{ x: 0, y: .5 }}
						end={{ x: 1, y: .5 }}
					/>
            </View>
            <View style={styles.current8}>
					<Animated.Text 
                  style={[
                     styles.current9, 
                     {
                        opacity: animateValue, 
                        transform: [{ translateX: animateValue.interpolate({
                           inputRange: [0, 1], 
                           outputRange: [-50, 0]
                        }) }]
                     }
                  ]}>
                  {`Starting: ${kilogramsToPounds(startWeight)} lb`}
               </Animated.Text>
					<Animated.Text 
                  style={[
                     styles.current9, 
                     {
                        opacity: animateValue, 
                        transform: [{ translateX: animateValue.interpolate({
                           inputRange: [0, 1], 
                           outputRange: [50, 0]
                        }) }]
                     }
                  ]}>
                  {`Goal: ${kilogramsToPounds(goalWeight)} lb`}
               </Animated.Text>
				</View>
            <AnimatedPressable 
               style={[
                  styles.bodyMeasureRef, 
                  {
                     opacity: animateValue, 
                     transform: [{ translateX: animateValue.interpolate({
                        inputRange: [0, 1], 
                        outputRange: [50, 0]
                     }) }]
                  }
               ]}
               onPress={() => navigation.navigate('body-measures')}>
					<LinearGradient
						style={styles.bodyMeasureRefWrapper}
						colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: .5 }}>
						<View style={styles.horz}>
							<Image style={styles.bodyMeasureImg} source={require('../assets/images/body-measure.png')} />
							<View>
								<Text style={styles.bodyMeasureTitle}>BODY MEASUREMENT</Text>
								<Text style={styles.bodyMeasureDesc}>Chest / Waist / Hips / Thigh</Text>
							</View>
						</View>
					</LinearGradient>
				</AnimatedPressable>
         </LinearGradient>
      </AnimatedPressable> || <View style={styles.container} />
   )
})

const styles = StyleSheet.create({
   container: {
      marginTop: vS(12), 
      height: vS(268)
   },

   horz: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   wrapper: {
      width: hS(370),
		borderRadius: hS(32),
		padding: hS(18)
   }, 

   header: {
      marginBottom: vS(10),
      width: '100%',
      justifyContent: 'space-between'    
   },

   title: {
      fontFamily: 'Poppins-Medium', 
      fontSize: hS(15), 
      color: darkHex,
      letterSpacing: .2    
   }, 

   backIc: { transform: [{ rotate: '-180deg' }] },

   current: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'flex-end'
   },

   current2: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: vS(36)
   },

   current3: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(28),
      color: darkHex,
      letterSpacing: .2
   },

   current4: {
      marginBottom: vS(-6),
      marginLeft: hS(7),
      flexDirection: 'row',
      alignItems: 'center'
   },

   current5: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(14),
      color: darkHex,
      letterSpacing: .2
   },

   current6: {
      alignItems: 'flex-end',
		marginLeft: hS(15)
   },

   current7: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(14),
      color: Colors.primary.hex,
      letterSpacing: .2
   },

   editButton: {
      width: hS(36),
      height: vS(36),
      borderRadius: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `rgba(${darkRgb.join(', ')}, .14)`
   },

   progressBar: {
      width: '100%',
      height: vS(37),
      borderRadius: 200,
      backgroundColor: '#fff',
      justifyContent: 'center',
      marginTop: vS(12)
   },

   progressText: {
      position: 'absolute',
      right: hS(16),
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(10),
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2
   },

   activeBar: {
      width: '52%',
      height: '100%',
      borderRadius: 200
   },

   current8: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: vS(12),
      paddingHorizontal: hS(8)
   },

   current9: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(10),
      color: `rgba(${darkRgb.join(', ')}, .8)`,
      letterSpacing: .2
   },

   bodyMeasureRef: {
      marginTop: vS(16)
   },

   bodyMeasureRefWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: vS(62),
      borderRadius: hS(24),
      paddingVertical: vS(12),
      paddingLeft: hS(16),
      paddingRight: hS(24)
   }, 

   bodyMeasureImg: {
      width: hS(38),
		height: vS(38),
      marginRight: hS(12)
   }, 

   bodyMeasureTitle: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(12),
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: .4,
      marginBottom: vS(2)
   },

   bodyMeasureDesc: {
      borderRadius: 100,
      fontFamily: 'Poppins-Regular',
      fontSize: hS(8),
      color: 'rgba(255, 255, 255, .9)',
      paddingHorizontal: hS(10),
      paddingVertical: vS(3),
      backgroundColor: 'rgba(255, 255, 255, .12)'
   }
})