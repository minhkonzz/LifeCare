import { useState, useEffect, memo, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Animated, Keyboard } from 'react-native'
import { GoogleIcon, AtIcon, LockIcon } from '@assets/icons'
import AuthInput from '@components/auth-input'
import Button from '@components/shared/button/Button'
import { useSelector } from 'react-redux'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import { LoginComponentProps } from '@utils/interfaces'
import { AppState } from '../store'
import LottieView from 'lottie-react-native'
import UserService from '@services/user'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default memo(({ setIsLogin, invokeAuthMessage, navigation }: LoginComponentProps): JSX.Element => {
	console.log('render SignIn component')
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current 
	const translateY: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1, 
			duration: 640, 
			useNativeDriver: true
		}).start()
		
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			Animated.timing(translateY, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true
			}).start()
		})

		return () => {
			keyboardDidHideListener.remove()
		}
	}, [])

	const onBeforeNavigate = (onAnimateCompleted?: () => void) => {
		invokeAuthMessage('Login success', 'success')
		Animated.timing(animateValue, {
			toValue: 0, 
			duration: 640, 
			useNativeDriver: true
		}).start(({ finished }) => {
			if (onAnimateCompleted) onAnimateCompleted()
		})
	}

	const changeToSignUp = () => {
		onBeforeNavigate(() => setIsLogin(false))
	}

	const onFocusInput = (y: number) => {
		Animated.timing(translateY, {
			toValue: -y,
			duration: 200,
			useNativeDriver: true
		}).start()
	}

	const SignInButton = useCallback(() => {
		const { email, password } = useSelector((state: AppState) => state.auth)
		const [ processing, setProcessing ] = useState<boolean>(false)

		const onSignIn = async() => {
			if (processing) return
			try {
				setProcessing(true)
				const { data, error } = await UserService.signInPassword(email, password)
				if (error) {
					setProcessing(false)
					invokeAuthMessage('Invalid Email or Password. Please check again', 'error')
					return
				}
				const userId = data?.session?.user.id
				if (!userId) {
					setProcessing(false)
					invokeAuthMessage('Unknown exception', 'error')
					return
				}
				const isSurveyed = await UserService.checkUserSurveyed(userId)
				const routeName: string = isSurveyed && 'main' || 'survey'
				onBeforeNavigate(() => { navigation.navigate(routeName) })
			} catch (err) {
				console.error(err)
			}
		}

		return (
			<View>
				<Button 
					title='Sign in' 
					size='large' 
					style={{ marginTop: vS(30) }} 
					bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
					onPress={onSignIn} />
				{ processing && <LottieView
					style={styles.buttonLoading}
					source={require('../assets/lottie/button-loading.json')} 
					autoPlay
					loop/> }
			</View>
		)
	}, [])

	return (
		<Animated.View style={{...styles.container, transform: [{ translateY }] }}>
			<Animated.Image 
				style={{...styles.storyset, transform: [{ scale: animateValue }] }} 
				source={require('../assets/images/storyset/login.gif')} 
			/>
			<Animated.View style={{
				...styles.main,
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [-800, 0]
				}) }]
			}}>
				<View>
					<Text style={styles.lgTitle}>Hello Friend,</Text>
					<Text style={styles.smTitle}>Login to track your fasting now</Text>
				</View>
				<View>
					<AuthInput
						placeholder='Email'
						type='email'
						height={vS(48)}
						onFocus={() => onFocusInput(70)}>
						<AtIcon width={hS(23)} height={vS(22)} />
					</AuthInput>
					<AuthInput
						style={{ marginTop: vS(14) }}
						hide
						type='password'		
						placeholder='Password'
						height={vS(48)}
						onFocus={() => onFocusInput(70)}>
						<LockIcon width={hS(23)} height={vS(23)} />
					</AuthInput>
					<SignInButton />
				</View>
				<View style={styles.googleOption}>
					<View style={styles.googleOptionIndicator}>
						<View style={styles.lineIndicator} />
						<Text style={styles.textIndicator}>OR</Text>
						<View style={styles.lineIndicator} />
					</View>
					<TouchableOpacity
						style={styles.googleLoginButton}
						activeOpacity={.7}>
						<GoogleIcon
							style={styles.googleIcon}
							width={hS(32)}
							height={vS(32)}
						/>
						<Text style={styles.googleLoginButtonText}>Sign in with Google</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
			<Animated.View style={{...styles.registerRef, opacity: animateValue }}>
				<Text style={styles.registerRefTitle}>Are you new come in?</Text>
				<Pressable style={styles.registerRefPress} onPress={changeToSignUp}>
					<Text style={styles.registerRefPressText}>Sign up</Text>
				</Pressable>
			</Animated.View>
		</Animated.View>
	)
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	buttonLoading: {
		position: 'absolute',
		top: '52%',
		left: '34%',
		width: hS(22),
		height: vS(22)
	},

	storyset: {
		width: hS(292), 
		height: vS(292)
	},

	lgTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(22),
		color: darkHex
	},

	smTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(14),
		color: darkHex,
		marginBottom: vS(12)
	},

	googleLoginButton: {
		width: '100%',
		height: vS(82),
		borderRadius: hS(32),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: `rgba(${darkRgb.join(', ')}, .1)`,
		marginTop: vS(-8)
	},

	googleLoginButtonText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(14),
		color: '#8a8a8a'
	},

	registerRef: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	registerRefTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(13),
		color: '#8a8a8a'
	},

	registerRefPress: {
		marginLeft: hS(12)
	},

	registerRefPressText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(13),
		color: primaryHex
	}, 

	main: {
		marginTop: vS(-8),
		marginBottom: vS(22)
	},

	googleOption: {
		marginTop: vS(16)
	},

	googleIcon: {
		position: 'absolute', 
		left: hS(28)
	},

	googleOptionIndicator: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: vS(16),
		justifyContent: 'center'
	},

	lineIndicator: {
		width: hS(70),
		height: 1,
		backgroundColor: '#e4e4e4',
		marginRight: hS(10)
	}, 

	textIndicator: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(14),
		color: '#8a8a8a'
	}
})