import { memo, FC, ReactNode, useRef, useEffect, useContext, Dispatch, SetStateAction } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import PrimaryEditIcon from '@assets/icons/edit-primary.svg'
import LinearGradient from 'react-native-linear-gradient'
import ConfirmStopFastingPopup from '@components/shared/popup-content/confirm-stop-fasting'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { PopupContext } from '@contexts/popup'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface ActivateTimeProps {
	activate?: boolean
	current?: boolean
	value?: string
}

const FastingActivateTime: FC<ActivateTimeProps> = ({ activate, current, value = '' }) => {
	return (
		<View style={styles.fastingActivateTime}>
			<View style={styles.fastingActivateTimeMain}>
				<View style={[styles.boundaryC, { borderColor: activate && primaryHex || '#ff9b85' }]}>
					<View style={styles.coreC} />
				</View>
				<Text style={styles.text}>{activate && 'Started:' || 'Stop in:'}</Text>
				<Text style={[
					styles.text,
					{
						marginTop: 2,
						fontFamily: `Poppins-${current && 'SemiBold' || 'Regular'}`,
						color: current && primaryHex || darkHex
					}]}>
					{value}
				</Text>
			</View>
			{
				current &&
				<Pressable>
					<PrimaryEditIcon width={hS(20)} height={vS(20)} />
				</Pressable>
			}
		</View>
	)
}

export default memo(({ isViewable }: { isViewable: boolean }): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
	const navigation = useNavigation()
	const { setPopup } = useContext<{ popup: ReactNode, setPopup: Dispatch<SetStateAction<ReactNode>> }>(PopupContext)

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 1 || 0, 
			duration: 1010, 
			delay: 500, 
			useNativeDriver: true
		}).start()
	}, [isViewable])

	return (
		<View style={styles.container}>
			<Animated.View style={[
				styles.header, 
				{
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-50, 0]
					}) }]
				}
			]}>
				<FastingActivateTime activate value='Yesterday, 8:30 PM' />
				<View style={styles.line} />
				<FastingActivateTime current value='Today, 12:30 PM' />
			</Animated.View>
			<AnimatedTouchableOpacity 
				activeOpacity={.7} 
				onPress={() => setPopup(ConfirmStopFastingPopup)}
				style={{ 
					opacity: animateValue, 
					transform: [{ translateY: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-30, 0]
					}) }]	
				}}>
				<LinearGradient
					style={styles.startStopButton}
					colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .5, y: 1 }}>
					<Text style={styles.startStopButtonText}>Stop Fasting</Text>
				</LinearGradient>
			</AnimatedTouchableOpacity>
			<AnimatedPressable 
				onPress={() => navigation.navigate('fasting-stages')}
				style={{ opacity: animateValue }}>
				<LinearGradient
					style={styles.stage}
					colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .51, y: .5 }}>
					<View style={{ flexDirection: 'row' }}>
						<LinearGradient
							style={{
								marginTop: -0.5,
								width: hS(78),
								height: vS(78),
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: 500
							}}
							colors={['#000', 'rgba(0, 0, 0, 0)']}
							start={{ x: .5, y: 0 }}
							end={{ x: .5, y: 1 }}>
							<AnimatedCircularProgress
								lineCap='round'
								style={{ position: 'absolute' }}
								width={hS(7)}
								size={hS(80)}
								rotation={360}
								fill={80}
								tintColor='#30E3CA'
								backgroundColor='#fff'
							/>
							<Image
								style={{ width: hS(36), height: vS(36) }}
								source={require('../assets/images/blood-sugar-rise.jpg')} />
						</LinearGradient>
						<Animated.View 
							style={{ 
								marginLeft: hS(15), 
								opacity: animateValue, 
								transform: [{ translateX: animateValue.interpolate({
									inputRange: [0, 1], 
									outputRange: [-50, 0]
								}) }] 
							}}>
							<Text style={{
								letterSpacing: .4,
								fontFamily: 'Poppins-Regular',
								fontSize: hS(10),
								color: '#fff',
								textTransform: 'uppercase'
							}}>CURRENT STAGE</Text>

							<Text style={{
								letterSpacing: .4,
								marginTop: vS(5),
								fontFamily: 'Poppins-Regular',
								fontSize: hS(13),
								color: '#fff'
							}}>Blood sugar rise</Text>
						</Animated.View>
					</View>
				</LinearGradient>
			</AnimatedPressable>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		width: hS(366),
		borderRadius: hS(32),
		backgroundColor: '#fff',
		alignItems: 'center',
		elevation: 8,
		shadowColor: `rgba(${darkRgb.join(', ')}, .6)`,
		bordeRadius: hS(32),
		paddingVertical: vS(20),
		paddingHorizontal: hS(18),
		marginTop: vS(39)
	},

	header: {
		width: '100%',
		marginBottom: vS(24)
	},

	line: {
		width: 1,
		height: vS(16),
		borderLeftWidth: .2,
		marginLeft: hS(7),
		borderLeftColor: `rgba(${darkRgb.join(', ')}, .4)`
	},

	fastingActivateTime: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	fastingActivateTimeMain: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	text: {
		fontSize: hS(12),
		fontFamily: 'Poppins-Regular',
		color: darkHex,
		marginLeft: hS(18)
	},

	boundaryC: {
		width: hS(14),
		height: vS(14),
		borderWidth: 1,
		borderRadius: 28,
		justifyContent: 'center',
		alignItems: 'center'
	},

	coreC: {
		width: hS(7),
		height: vS(7),
		borderWidth: .8,
		borderRadius: 28,
		marginRight: .12,
		borderColor: darkHex
	},

	startStopButton: {
		width: hS(334),
		height: vS(82),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: hS(36),
		elevation: 4,
		shadowColor: primaryHex
	},

	startStopButtonText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(14),
		color: '#fff'
	},

	stage: {
		borderRadius: 100,
		marginTop: vS(17),
		width: hS(334),
		justifyContent: 'space-between',
		paddingHorizontal: hS(8),
		paddingVertical: vS(11)
	}
})
