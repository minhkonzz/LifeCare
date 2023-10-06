import { FC, useState } from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	Animated,
	Pressable,
	TouchableOpacity
} from 'react-native'

import Screen from '@components/shared/screen'
import LinearGradient from 'react-native-linear-gradient'
import DailyFastingState from '@components/daily-fasting-state'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import MoonIcon from '@assets/icons/moon.svg'
import BluePlusIcon from '@assets/icons/blue_plus.svg'
import BackIcon from '@assets/icons/goback.svg'
import EditIcon from '@assets/icons/edit.svg'

const darkPrimary: string = Colors.darkPrimary.hex
// const bmiRangesData: any = require('../assets/data/bmi-range-data.json')
import bmiRangesData from '../assets/data/bmi-range-data.json'

const BMITrack: FC = () => {
	const [bmiValue, setBmiValue] = useState<number>(28.25)
	return (
		<LinearGradient
			style={styles.bmiTrack}
			colors={[`rgb(229, 244, 231)`, `rgba(229, 244, 231, .4)`]}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}>
			<Text style={styles.trackHeaderText}>Latest BMI</Text>
			<View>
				<View style={{
					flexDirection: 'row',
					alignItems: 'flex-end'
				}}>
					<Text style={styles.valueTrack}>28.25</Text>
					<Text style={[
						styles.symbolTrack,
						{
							marginLeft: hS(6),
							marginBottom: vS(8)
						}]}>
						kg/m2
					</Text>
				</View>
				<Text style={styles.bmiStatus}>Overweight</Text>
			</View>
			<View style={styles.bmiRangeColors}>
			{
				bmiRangesData.map((e, i) => {
					return (
						<LinearGradient
							key={`${e.id}-${i}`}
							style={{
								width: 12,
								height: (bmiValue <= e.max && bmiValue >= e.min ? vS(48) : vS(11)),
								borderRadius: 100

							}}
							colors={e.color}
							start={{ x: .5, y: 0 }}
							end={{ x: .5, y: 1 }}
						/>
					)
				})
			}
			</View>
		</LinearGradient>
	)
}

const WaterTrack: FC = () => {
	return (
		<LinearGradient
			style={styles.waterTrack}
			colors={[`rgba(${Colors.lightPrimary.rgb.join(', ')}, .6)`, `rgb(177, 234, 238)`]}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}>
			<View style={styles.waterVisualWrapper}></View>
			<View style={{
				height: vS(127),
				justifyContent: 'space-between'
			}}>
				<View style={[
					styles.trackHeader,
					{ marginRight: hS(4) }
				]}>
					<Text style={styles.trackHeaderText}>Drink water</Text>
					<Image
						style={{
							width: hS(10),
							height: vS(13),
							marginLeft: hS(6)
						}}
						source={require('../assets/images/glass-of-water.png')}
					/>
				</View>
				<View style={{
					marginRight: hS(4),
					marginTop: vS(-8)
				}}>
					<Text style={styles.symbolTrack}>1650 / </Text>
					<View style={{
						flexDirection: 'row',
						alignItems: 'flex-end'
					}}>
						<Text style={styles.valueTrack}>3000</Text>
						<Text style={[
							styles.symbolTrack,
							{
								marginLeft: hS(4),
								marginBottom: vS(8)
							}]}>
							ml
						</Text>
					</View>
				</View>
				<TouchableOpacity style={styles.waterUpdateButton} activeOpacity={.7} onPress={() => { }}>
					<BluePlusIcon width={hS(15)} height={vS(14)} />
				</TouchableOpacity>
			</View>
		</LinearGradient>
	)
}

const WeightTrack: FC = () => {
	return (
		<Pressable style={{ marginTop: vS(23) }} onPress={() => { }}>
			<LinearGradient
				style={styles.weightTrack}
				colors={[`rgba(255, 211, 110, .36)`, `rgba(255, 211, 110, .8)`]}
				start={{ x: .5, y: 0 }}
				end={{ x: .52, y: .5 }}>
				<View style={[
					styles.trackHeader,
					{
						marginBottom: vS(10),
						width: '100%',
						justifyContent: 'space-between'
					}
				]}>
					<Text style={styles.weightTrackTitle}>Weight</Text>
					<BackIcon style={{ transform: [{ rotate: '-180deg' }] }} width={hS(6.5)} height={vS(10)} />
				</View>
				<View style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'flex-end'
				}}>
					<View style={{
						flexDirection: 'row',
						alignItems: 'flex-end',
						height: vS(36)
					}}>
						<Text style={{
							fontFamily: 'Poppins-SemiBold',
							fontSize: hS(28),
							color: darkPrimary,
							letterSpacing: .2
						}}>
							72.52
						</Text>
						<View style={{
							marginBottom: vS(-6),
							marginLeft: hS(7),
							flexDirection: 'row',
							alignItems: 'center'
						}}>
							<Text style={{
								fontFamily: 'Poppins-SemiBold',
								fontSize: hS(14),
								color: darkPrimary,
								letterSpacing: .2
							}}>
								lb
							</Text>
							<View style={{
								alignItems: 'flex-end',
								marginLeft: hS(15)
							}}>
								<Text style={{
									fontFamily: 'Poppins-SemiBold',
									fontSize: hS(14),
									color: Colors.primary.hex,
									letterSpacing: .2
								}}>
									15.09 lb
								</Text>
							</View>
						</View>
					</View>
					<Pressable style={{
						width: hS(36),
						height: vS(36),
						borderRadius: 200,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .14)`,

					}}>
						<EditIcon width={hS(16)} height={vS(16)} />
					</Pressable>
				</View>
				<View style={{
					width: '100%',
					height: vS(37),
					borderRadius: 200,
					backgroundColor: '#fff',
					justifyContent: 'center',
					marginTop: vS(12)
				}}>
					<Text style={{
						position: 'absolute',
						right: hS(16),
						fontFamily: 'Poppins-SemiBold',
						fontSize: hS(10),
						color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`,
						letterSpacing: .2
					}}>
						52%
					</Text>
					<LinearGradient
						style={{
							width: '52%',
							height: '100%',
							borderRadius: 200
						}}
						colors={['#ffb72b', `rgba(255, 183, 43, .6)`]}
						start={{ x: 0, y: .5 }}
						end={{ x: 1, y: .5 }}
					/>
				</View>
				<View style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: vS(12),
					paddingHorizontal: hS(8)
				}}>
					<Text style={{
						fontFamily: 'Poppins-Medium',
						fontSize: hS(10),
						color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`,
						letterSpacing: .2
					}}>
						Starting: 87.61 lb
					</Text>
					<Text style={{
						fontFamily: 'Poppins-Medium',
						fontSize: hS(10),
						color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`,
						letterSpacing: .2
					}}>
						Goal: 62.5
					</Text>
				</View>
				<Pressable style={{ marginTop: vS(16) }} onPress={() => { }}>
					<LinearGradient
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							height: vS(62),
							borderRadius: hS(24),
							paddingVertical: vS(12),
							paddingLeft: hS(16),
							paddingRight: hS(24)
						}}
						colors={[`rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`, darkPrimary]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: .5 }}>
						<View style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}>
							<Image
								style={{
									width: hS(38),
									height: vS(38)
								}}
								source={require('../assets/images/body-measure.png')}
							/>
							<View style={{
								marginLeft: hS(12)
							}}>
								<Text style={{
									fontFamily: 'Poppins-Medium',
									fontSize: hS(12),
									color: '#fff',
									textTransform: 'uppercase',
									letterSpacing: .4,
									marginBottom: vS(2)
								}}>
									BODY MEASUREMENT
								</Text>
								<Text style={{
									borderRadius: 100,
									fontFamily: 'Poppins-Regular',
									fontSize: hS(8),
									color: 'rgba(255, 255, 255, .9)',
									paddingHorizontal: hS(10),
									paddingTop: vS(3),
									paddingBottom: vS(2),
									backgroundColor: 'rgba(255, 255, 255, .12)'
								}}>
									Chest / Waist / Hips / Thigh
								</Text>
							</View>
						</View>
					</LinearGradient>
				</Pressable>
			</LinearGradient>
		</Pressable>
	)
}

const NutritionTrack: FC = () => {
	return (
		<Pressable style={{ marginTop: vS(23) }} onPress={() => { }}>
			<LinearGradient
				style={styles.nutritionTrack}
				colors={[`rgba(${Colors.lightPrimary.rgb.join(', ')}, .36)`, Colors.lightPrimary.hex]}
				start={{ x: .5, y: 0 }}
				end={{ x: .52, y: .5 }}>
				<View style={styles.nutritionTrackHeader}>
					<View>
						<Text style={styles.nutritionTrackSmTitle}>You have consumed</Text>
						<View style={styles.nutritionTrackMainTitle}>
							<Text style={styles.nutritionTrackLgTitle}>500 cal</Text>
							<Text style={[styles.nutritionTrackSmTitle, { marginLeft: hS(8), marginTop: vS(16) }]}>today</Text>
						</View>
					</View>
					<TouchableOpacity
						style={styles.nutritionTrackButton}
						activeOpacity={.7}
						onPress={() => { }}>
						<EditIcon width={hS(16)} height={vS(16)} />
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: vS(14) }}>
					<View style={styles.nutritionProgress}>
						<AnimatedCircularProgress
							style={styles.nutritionProgressCircle}
							width={vS(12)}
							size={hS(160)}
							rotation={360}
							fill={80}
							tintColor='#60E2E7'
							backgroundColor='#C9E4DF'
						/>
						<View style={{ alignItems: 'center' }}>
							<Text style={{
								fontFamily: 'Poppins-SemiBold',
								fontSize: hS(32),
								color: darkPrimary,
								letterSpacing: .2
							}}>
								33%
							</Text>
							<Text style={{
								fontFamily: 'Poppins-Regular',
								fontSize: hS(9),
								color: darkPrimary,
								letterSpacing: .2,
								marginTop: vS(-7)
							}}>
								of 1500 kcal expected
							</Text>
						</View>
					</View>
					<View>
						{
							[
								{
									id: 'nt1',
									title: 'Carbs',
									current: 0,
									max: 150
								},
								{
									id: 'nt2',
									title: 'Protein',
									current: 17.9,
									max: 150
								},
								{
									id: 'nt3',
									title: 'Fat',
									current: 7.2,
									max: 33
								}
							]
								.map((e, i) =>
									<View key={`${e.id}-${i}`} style={{ marginTop: vS(i > 0 ? 18 : 2) }}>
										<View style={{
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'space-between'
										}}>
											<Text style={{
												fontFamily: 'Poppins-Regular',
												fontSize: hS(10),
												color: darkPrimary,
												letterSpacing: .2
											}}>
												{e.title}
											</Text>
											<Text style={{
												fontFamily: 'Poppins-Regular',
												fontSize: hS(8),
												color: darkPrimary,
												letterSpacing: .2
											}}>
												{`${e.current}/${e.max}`}
											</Text>
										</View>
										<View style={{
											width: hS(142),
											height: vS(8),
											backgroundColor: '#C9E4DF',
											borderRadius: 30,
											marginTop: vS(4)
										}}>
											<LinearGradient
												style={{
													width: hS(e.current / e.max * 100),
													height: '100%',
													borderRadius: 30
												}}
												colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
												start={{ x: .5, y: 0 }}
												end={{ x: .5, y: 1 }}
											/>
										</View>
									</View>
								)
						}
					</View>
				</View>
			</LinearGradient>
		</Pressable>
	)
}

const ChatbotAdvertise = (): JSX.Element => {
	return (
		<Pressable style={styles.chatbotAdvertise}>
			<LinearGradient 
				style={styles.chatbotAdvertiseBg}
				colors={[Colors.lightPrimary.hex, darkPrimary]}
				start={{ x: 1, y: 0 }}
				end={{ x: .65, y: 1 }}>  
				<View style={styles.chatbotAdvertiseMain}>
					<Text style={styles.chatbotAdvertiseTitle}>Try our FastAI Chatbot</Text>
					<Text style={styles.chatbotAdvertiseDesc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
					<TouchableOpacity style={styles.chatbotAdvertiseButton} activeOpacity={.8} onPress={() => {}}>
						<Text style={styles.chatbotAdvertiseButtonText}>Glad to try</Text>
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Image source={require('../assets/lottie/FastAIBotInterface.gif')} style={styles.animatedChatbotInterface}/>
					<Text style={styles.gptRef}>Powered by GPT3.5</Text>
				</View>
			</LinearGradient>
		</Pressable>
	)
}

export default (): JSX.Element => {
	return (
		<Screen>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ 
					width: '100%',
					alignItems: 'center',
					paddingHorizontal: hS(24),
					// paddingBottom: vS(27),
					paddingTop: vS(22)
				}}>
				<View style={styles.background}>
					<View style={styles.gray} />
					<View style={styles.lightBlue} />
				</View>
				<Pressable style={styles.darkModeButton}>
					<MoonIcon width={hS(16)} height={vS(16.5)} />
				</Pressable>
				<View style={styles.userGreet}>
					<View>
						<Text style={styles.nameGreet}>Hi, Pham!</Text>
						<Text style={styles.titleGreet}>Welcome back</Text>
					</View>
					<Image style={styles.userAvatar} source={require('../assets/images/UserAvatar.png')} />
				</View>
				<DailyFastingState />
				<View style={{
					width: '100%',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginTop: vS(29)
				}}>
					<BMITrack />
					<WaterTrack />
				</View>
				<NutritionTrack />
				<WeightTrack />
				<ChatbotAdvertise />
			</ScrollView>
		</Screen>
	)
}

const styles = StyleSheet.create({
	nutritionTrack: {
		width: hS(370),
		borderRadius: hS(32),
		paddingHorizontal: hS(18),
		paddingVertical: vS(18),
		verticalScale: vS(23)
	},

	nutritionTrackHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	nutritionTrackSmTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkPrimary,
		letterSpacing: .2
	},

	nutritionTrackLgTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(28),
		color: darkPrimary,
		letterSpacing: .2
	},

	nutritionTrackMainTitle: {
		flexDirection: 'row',
		marginTop: vS(2)
	},

	nutritionTrackButton: {
		width: hS(36),
		height: vS(36),
		borderRadius: 120,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .14)`
	},

	nutritionProgress: {
		width: hS(160),
		height: vS(160),
		justifyContent: 'center',
		alignItems: 'center'
	},

	nutritionProgressCircle: {
		position: 'absolute'
	},

	background: {
		position: 'absolute',
		top: 0,
		right: 0,
		alignItems: 'flex-end'
	},

	gray: {
		width: hS(300),
		height: vS(300),
		backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .04)`,
		borderBottomLeftRadius: 1000
	},

	lightBlue: {
		bottom: vS(192),
		position: 'absolute',
		right: hS(-12),
		width: hS(150),
		height: vS(150),
		backgroundColor: Colors.lightPrimary.hex,
		borderBottomLeftRadius: 1000
	},

	darkModeButton: {
		width: hS(40),
		height: vS(40),
		borderRadius: 200,
		backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .18)`,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end'
	},

	userGreet: {
		width: '100%',
		marginTop: vS(35),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: vS(52)
	},

	nameGreet: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(14),
		color: darkPrimary,
		letterSpacing: .4
	},

	titleGreet: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(20),
		color: darkPrimary,
		letterSpacing: .4
	},

	userAvatar: {
		width: hS(60),
		height: vS(60),
		borderRadius: hS(24)
	},

	bmiTrack: {
		width: hS(176),
		height: vS(161),
		justifyContent: 'space-between',
		borderTopLeftRadius: hS(28),
		borderBottomLeftRadius: hS(28),
		borderTopRightRadius: hS(48),
		borderBottomRightRadius: hS(48),
		paddingVertical: vS(14),
		paddingHorizontal: hS(11),
		elevation: 8,
		shadowColor: `rgba(235, 243, 255, .8)`
	},

	trackHeader: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	trackHeaderText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(10),
		color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .8)`,
		letterSpacing: .4
	},

	waterTrack: {
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
		shadowColor: `rgba(235, 243, 255, .8)`
	},

	valueTrack: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(22),
		color: darkPrimary,
		letterSpacing: .4
	},

	symbolTrack: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(8),
		color: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .6)`,
		letterSpacing: .4
	},

	bmiStatus: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(8),
		color: darkPrimary,
		letterSpacing: .4,
		marginTop: vS(-4)
	},

	bmiRangeColors: {
		flexDirection: 'row',
		alignItems: 'flex-end'
	},

	waterVisualWrapper: {
		width: hS(56),
		height: vS(127),
		borderRadius: 100,
		backgroundColor: '#fff'
	},

	waterUpdateButton: {
		width: hS(36),
		height: vS(36),
		alignItems: 'flex-end',
		borderRadius: 200,
		backgroundColor: '#fff',
		justifyContent: 'center',
		// alignItems: 'center',
		alignSelf: 'flex-end',
		elevation: 7,
		marginBottom: vS(-8),
		shadowColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .5)`
	},

	weightTrack: {
		width: hS(370),
		borderRadius: hS(32),
		paddingVertical: vS(18),
		paddingHorizontal: hS(18)
	},

	weightTrackTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(15),
		color: darkPrimary,
		letterSpacing: .2
	},

	chatbotAdvertise: {
      width: '100%', 
      height: vS(161),
      marginTop: vS(32),
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
      color: darkPrimary
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
