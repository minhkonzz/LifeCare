import { memo, useEffect, useRef } from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	Animated,
	Pressable,
	TouchableOpacity
} from 'react-native'

import Screen from '@components/shared/screen'
import LinearGradient from 'react-native-linear-gradient'
import DailyFastingState from '@components/daily-fasting-state'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import MoonIcon from '@assets/icons/moon.svg'
import WeightTrack from '@components/daily-weight-track'
import BMITrack from '@components/daily-bmi-track'
import WaterTrack from '@components/daily-water-track'
import NutritionTrack from '@components/daily-nutrition-track'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: lightHex } = Colors.lightPrimary

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Header = memo(({ isViewable }: { isViewable: boolean }) => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const titleGreetAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

	useEffect(() => {
		Animated.parallel([
			Animated.timing(animateValue, {
				toValue: 1, 
				duration: 800, 
				useNativeDriver: true
			}),
			Animated.timing(titleGreetAnimateValue, {
				toValue: 1, 
				duration: 800,
				delay: 120,
				useNativeDriver: true
			})
		]).start()
	}, [])

	return (
		isViewable && 
		<View style={styles.header}>
			<View style={styles.background}>
				<Animated.View style={[styles.gray, { transform: [{ scale: animateValue }] }]} />
				<Animated.View style={[styles.lightBlue, { transform: [{ scale: animateValue }] }]} />
			</View>
			<Pressable style={styles.darkModeButton}>
				<MoonIcon width={hS(16)} height={vS(16.5)} />
			</Pressable>
			<View style={styles.userGreet}>
				<View>
					<Animated.Text style={[
						styles.nameGreet, 
						{
							transform: [{ translateX: animateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [-200, 0]
							}) }]
						}
					]}>
						Hi, Pham!
					</Animated.Text>
					<Animated.Text style={[
						styles.titleGreet, 
						{
							transform: [{ translateX: titleGreetAnimateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [-200, 0]
							}) }]
						}
					]}>
						Welcome back
					</Animated.Text>
				</View>
				<Animated.Image 
					style={[styles.userAvatar, { transform: [{ scale: animateValue }] }]} 
					source={require('../assets/images/UserAvatar.png')} 
				/>
			</View>
		</View> || <View style={styles.header} />
	)
})

const ChatBotAdvertise = memo(({ isViewable }: { isViewable: boolean }) => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 1 || 0, 
			duration: 1010, 
			useNativeDriver: true
		}).start()
	}, [isViewable])

	return (
		isViewable && 
		<AnimatedPressable style={[styles.chatbotAdvertise, { opacity: animateValue }]}>
			<LinearGradient 
				style={styles.chatbotAdvertiseBg}
				colors={[lightHex, darkHex]}
				start={{ x: 1, y: 0 }}
				end={{ x: .65, y: 1 }}>  
				<View style={styles.chatbotAdvertiseMain}>
					<Animated.Text style={[
						styles.chatbotAdvertiseTitle, 
						{
							opacity: animateValue, 
							transform: [{ translateX: animateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [-150, 0]
							}) }]
						}
					]}>
						Try our FastAI Chatbot
					</Animated.Text>
					<Animated.Text style={[
						styles.chatbotAdvertiseDesc, 
						{
							opacity: animateValue, 
							transform: [{ translateX: animateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [-150, 0]
							}) }]
						}
					]}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry
					</Animated.Text>
					<TouchableOpacity style={styles.chatbotAdvertiseButton} activeOpacity={.8}>
						<Text style={styles.chatbotAdvertiseButtonText}>Glad to try</Text>
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Image source={require('../assets/lottie/FastAIBotInterface.gif')} style={styles.animatedChatbotInterface}/>
					<Text style={styles.gptRef}>Powered by GPT3.5</Text>
				</View>
			</LinearGradient>
		</AnimatedPressable> || <View style={styles.chatbotAdvertise} />
	)
})

const RowMetrics = ({ isViewable }: { isViewable: boolean }) => {
	return (
		isViewable && 
		<View style={styles.metricRow}>
			<BMITrack />
			<WaterTrack />
		</View> || <View style={styles.metricRow}></View>
	)
}

export default (): JSX.Element => (
	<Screen paddingHorzContent content={[
		Header,
		DailyFastingState,
		RowMetrics,
		NutritionTrack,
		WeightTrack,
		ChatBotAdvertise
	]} />
)

const styles = StyleSheet.create({
	metricRow: {
		width: hS(370),
		height: vS(161),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: vS(29)
	},

	background: {
		position: 'absolute',
		top: vS(-20),
		right: hS(-50),
		alignItems: 'flex-end'
	},

	gray: {
		width: hS(300),
		height: vS(300),
		backgroundColor: `rgba(${darkRgb.join(', ')}, .04)`,
		borderRadius: 1000
	},

	lightBlue: {
		bottom: vS(192),
		position: 'absolute',
		right: hS(-12),
		width: hS(150),
		height: vS(150),
		backgroundColor: lightHex,
		borderRadius: 1000
	},

	darkModeButton: {
		width: hS(40),
		height: vS(40),
		borderRadius: 200,
		backgroundColor: `rgba(${darkRgb.join(', ')}, .18)`,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end'
	},

	header: {
		width: hS(370),
		height: vS(180)
	},

	userGreet: {
		marginTop: vS(35),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: vS(52)
	},

	nameGreet: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(14),
		color: darkHex,
		letterSpacing: .4
	},

	titleGreet: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(20),
		color: darkHex,
		letterSpacing: .4
	},

	userAvatar: {
		width: hS(60),
		height: vS(60),
		borderRadius: hS(24)
	},

	chatbotAdvertise: {
      width: '100%', 
      height: vS(161),
      marginTop: vS(18),
      borderRadius: vS(24)
   },

   chatbotAdvertiseBg: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      height: '100%', 
      borderRadius: vS(24), 
      paddingHorizontal: hS(14),  
      paddingVertical: vS(12) 
   }, 

   chatbotAdvertiseMain: {
      width: '68%',
      height: '100%',
      justifyContent: 'space-between'
   }, 

   chatbotAdvertiseTitle: {
      color: '#fff', 
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(16)
   },
   
   chatbotAdvertiseDesc: {
      fontFamily: 'Poppins-Medium',
      fontSize: hS(9),
      color: '#fff',
      marginTop: vS(-22), 
      lineHeight: vS(16)
   },    

   chatbotAdvertiseButton: {
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#fff', 
      width: hS(125), 
      height: vS(44),
      borderRadius: vS(24)
   },

   chatbotAdvertiseButtonText: {
      fontFamily: 'Poppins-SemiBold', 
      fontSize: hS(12),
      color: darkHex
   }, 

   animatedChatbotInterface: { 
      width: hS(164), 
      height: vS(164), 
      position: 'absolute', 
      top: vS(-28), 
      left: hS(-60) 
   }, 

   gptRef: { 
      alignSelf: 'flex-end', 
      fontFamily: 'Poppins-Medium',
      fontSize: hS(8), 
      color: '#fff' 
   }
})
