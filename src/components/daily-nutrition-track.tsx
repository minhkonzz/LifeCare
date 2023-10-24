import { memo, useEffect, useRef } from 'react'
import {
   View, 
   Text, 
   TouchableOpacity,
   Pressable, 
   StyleSheet, 
   Animated
} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import EditIcon from '@assets/icons/edit.svg'

const { hex: lightHex, rgb: lightRgb } = Colors.lightPrimary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export default memo(({ isViewable }: { isViewable: boolean }): JSX.Element => {
   const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: isViewable && 1 || 0,
         duration: 1100, 
         useNativeDriver: true
      }).start()
   }, [isViewable])

   return (
      isViewable && 
      <AnimatedPressable style={[styles.container, { opacity: animateValue }]}>
         <LinearGradient 
            style={styles.wrapper}
            colors={[`rgba(${lightRgb.join(', ')}, .36)`, lightHex]}
				start={{ x: .5, y: 0 }}
				end={{ x: .52, y: .5 }}>
            <View style={styles.header}>
					<Animated.View style={{ 
                  opacity: animateValue,
                  transform: [{ translateX: animateValue.interpolate({
                     inputRange: [0, 1], 
                     outputRange: [-150, 0]
                  }) }]
               }}>
						<Text style={styles.smallTitle}>You have consumed</Text>
						<View style={styles.mainTitle}>
							<Text style={styles.largeTitle}>500 cal</Text>
							<Text style={[styles.smallTitle, styles.todayTitle]}>today</Text>
						</View>
					</Animated.View>
					<AnimatedTouchableOpacity
						style={[styles.trackButton, { transform: [{ scale: animateValue }] }]}
						activeOpacity={.7}>
						<EditIcon width={hS(16)} height={vS(16)} />
					</AnimatedTouchableOpacity>
				</View>
            <View style={styles.main}>
					<View style={styles.progress}>
						<AnimatedCircularProgress
                     lineCap='round'
							style={styles.progressCircle}
							width={vS(12)}
							size={hS(160)}
							rotation={360}
							fill={80}
							tintColor='#60E2E7'
							backgroundColor='#C9E4DF'
						/>
						<View style={styles.progressInside}>
							<Text style={styles.percentText}>33%</Text>
							<Text style={styles.descText}>of 1500 kcal expected</Text>
						</View>
					</View>
					<Animated.View style={{ 
                  opacity: animateValue,
                  transform: [{ translateX: animateValue.interpolate({
                     inputRange: [0, 1], 
                     outputRange: [150, 0]
                  }) }]
               }}>
               {
                  [
                     { id: 'nt1', title: 'Carbs', current: 0, max: 150 },
                     { id: 'nt2', title: 'Protein', current: 17.9, max: 150 },
                     { id: 'nt3', title: 'Fat', current: 7.2, max: 33 }
                  ]
                  .map((e, i) =>
                     <View key={`${e.id}-${i}`} style={{ marginTop: vS(i > 0 ? 18 : 2) }}>
                        <View style={styles.part}>
                           <Text style={styles.partTitle}>{e.title}</Text>
                           <Text style={styles.partValue}>{`${e.current}/${e.max}`}</Text>
                        </View>
                        <View style={styles.progressBar}>
                           <LinearGradient
                              style={[styles.activeProgressBar, { width: hS(e.current / e.max * 100) }]}
                              colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
                              start={{ x: .5, y: 0 }}
                              end={{ x: .5, y: 1 }}
                           />
                        </View>
                     </View>
                  )
               }
					</Animated.View>
				</View>
         </LinearGradient>
      </AnimatedPressable> || <View style={styles.container}></View>
   )
})

const styles = StyleSheet.create({
   container: {
      marginTop: vS(23),
      height: vS(295)
   },

   wrapper: {
      width: hS(370),
		borderRadius: hS(32),
		paddingHorizontal: hS(18),
		paddingVertical: vS(18),
		verticalScale: vS(23)
   },

   header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	smallTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2
	},

   todayTitle: {
      marginLeft: hS(8), 
      marginTop: vS(16)
   },

	largeTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(28),
		color: darkHex,
		letterSpacing: .2
	},

	mainTitle: {
		flexDirection: 'row',
		marginTop: vS(2)
	},

	trackButton: {
		width: hS(36),
		height: vS(36),
		borderRadius: 120,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .14)`
	},

   main: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginTop: vS(14)
   },

	progress: {
		width: hS(160),
		height: vS(160),
		justifyContent: 'center',
		alignItems: 'center'
	},

	progressCircle: {
		position: 'absolute'
	},

   progressInside: {
      alignItems: 'center'
   },

   percentText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: hS(32),
      color: darkHex,
      letterSpacing: .2
   },

   descText: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(9),
      color: darkHex,
      letterSpacing: .2,
      marginTop: vS(-7)
   },

   part: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
   },

   partTitle: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(10),
      color: darkHex,
      letterSpacing: .2
   },

   partValue: {
      fontFamily: 'Poppins-Regular',
      fontSize: hS(8),
      color: darkHex,
      letterSpacing: .2
   },

   progressBar: {
      width: hS(142),
      height: vS(8),
      backgroundColor: '#C9E4DF',
      borderRadius: 30,
      marginTop: vS(4)
   },

   activeProgressBar: {
      height: '100%',
      borderRadius: 30
   }
})


