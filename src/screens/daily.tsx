import { View, Text, StyleSheet, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { lightHex, darkRgb, darkHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { AnimatedPressable, AnimatedTouchableOpacity } from '@components/shared/animated'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import Screen from '@components/shared/screen'
import LinearGradient from 'react-native-linear-gradient'
import DailyFastingState from '@components/daily-fasting-state'
import WeightTrack from '@components/daily-weight-track'
import BMITrack from '@components/daily-bmi-track'
import WaterTrack from '@components/daily-water-track'
import NutritionTrack from '@components/daily-nutrition-track'

const Header = withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }) => {
	const { name } = useSelector((state: AppState) => state.user.metadata)

	return (
		isViewable && 
		<View style={styles.header}>
			<View style={styles.background}>
				<Animated.View style={{...styles.gray, transform: [{ scale: animateValue }] }} />
				<Animated.View style={{...styles.lightBlue, transform: [{ scale: animateValue }] }} />
			</View>
			<View style={styles.userGreet}>
				<View>
					<Animated.Text style={{
						...styles.nameGreet, 
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-50, 0]
						}) }]
					}}>
						{`Hi, ${name}`}
					</Animated.Text>
					<Animated.Text style={{
						...styles.titleGreet, 
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-50, 0]
						}) }]
					}}>
						Welcome back!
					</Animated.Text>
				</View>
				{/* <Animated.Image 
					style={{...styles.userAvatar, transform: [{ scale: animateValue }] }} 
					source={require('../assets/images/UserAvatar.png')} 
				/> */}
			</View>
		</View> || <View style={styles.header} />
	)
})

const ChatBotAdvertise = withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }) => {
	const navigation = useNavigation<any>()

	return (
		isViewable && 
		<AnimatedPressable 
			style={{...styles.chatbotAdvertise, opacity: animateValue }}
			onPress={() => navigation.navigate('fastai-overview')}>
			<LinearGradient 
				style={styles.chatbotAdvertiseBg}
				colors={[lightHex, darkHex]}
				start={{ x: 1, y: 0 }}
				end={{ x: .65, y: 1 }}>  
				<View style={styles.chatbotAdvertiseMain}>
					<Animated.Text style={{
						...styles.chatbotAdvertiseTitle, 
						opacity: animateValue, 
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-50, 0]
						}) }]
					}}>
						Try our FastAI Chatbot
					</Animated.Text>
					<Animated.Text style={{
						...styles.chatbotAdvertiseDesc, 
						opacity: animateValue, 
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-50, 0]
						}) }]
					}}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry
					</Animated.Text>
					<AnimatedTouchableOpacity 
						style={{
							...styles.chatbotAdvertiseButton,
							opacity: animateValue, 
							transform: [{ translateY: animateValue.interpolate({
								inputRange: [0, 1],
								outputRange: [20, 0]
							}) }]
						}} 
						activeOpacity={.8}>
						<Text style={styles.chatbotAdvertiseButtonText}>Glad to try</Text>
					</AnimatedTouchableOpacity>
				</View>
				<View style={styles.chatbotAdvertiseBottom}>
					<Animated.Image 
						source={require('../assets/lottie/FastAIBotInterface.gif')} 
						style={{
							...styles.animatedChatbotInterface,
							opacity: animateValue,
							transform: [{ translateX: animateValue.interpolate({
								inputRange: [0, 1],
								outputRange: [30, 0],
							}) }]
						}} 
					/>
					<Animated.Text 
						style={{
							...styles.gptRef,
							opacity: animateValue,
							transform: [{ translateY: animateValue.interpolate({
								inputRange: [0, 1],
								outputRange: [10, 0]
							}) }]
						}}>
						Powered by GPT3.5
					</Animated.Text>
				</View>
			</LinearGradient>
		</AnimatedPressable> || <View style={styles.chatbotAdvertise} />
	)
})

const RowMetrics = withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }) => {
	return (
		isViewable && 
		<View style={styles.metricRow}>
			<BMITrack {...{ animateValue }} />
			<WaterTrack {...{ animateValue }} />
		</View> || <View style={styles.metricRow} />
	)
})

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
	chatbotAdvertiseBottom: {
		flexDirection: 'row'
	},

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
		top: vS(-12),
		right: hS(-50),
		alignItems: 'flex-end',
	},

	gray: {
		width: hS(320),
		height: vS(320),
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

	header: {
		width: hS(370),
		height: vS(120), 
		marginTop: vS(22)
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
      marginTop: vS(23),
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
      lineHeight: vS(17)
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
