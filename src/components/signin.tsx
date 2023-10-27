import { 
	useEffect, 
	memo, 
	useRef
} from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Pressable, 
	Animated
} from 'react-native'
import GoogleIcon from '@assets/icons/google_logo.svg'
import AtIcon from '@assets/icons/at.svg'
import LockIcon from '@assets/icons/lock.svg'
import AuthInput from '@components/auth-input'
import Button from '@components/shared/button/Button'
import { useSelector } from 'react-redux'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import { LoginComponentProps } from '@utils/interfaces'
import { AppState } from '../store'
import UserService from '@services/user'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

export default memo(({ setIsLogin, navigation }: LoginComponentProps): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current 

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1, 
			duration: 640, 
			useNativeDriver: true
		}).start()
	}, [])

	const onBeforeNavigate = (onAnimateCompleted?: () => void) => {
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

	const SignInButton = () => {
		const { email, password } = useSelector((state: AppState) => state.auth)
		const onSignIn = async() => {
			try {
				const { data, error } = await UserService.signInPassword(email, password)
				if (error) throw new Error('Something went wrong when sign in: Login not success')
				const userId = data.session.user.id
				if (!userId) throw new Error('Something when wrong when sign in: Cannot detect user id')
				const isSurveyed = await UserService.checkUserSurveyed(userId)
				const routeName: string = isSurveyed && 'main' || 'survey'
				onBeforeNavigate(() => { navigation.navigate(routeName) })
			} catch (err) {
				console.error(err)
			}
		}
		return (
			<Button 
				title='Sign in' 
				size='large' 
				style={{ marginTop: vS(30) }} 
				bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
				onPress={onSignIn} />
		)
	}

	return (
		<View style={styles.container}>
			<Animated.Image 
				style={[styles.storyset, { transform: [{ scale: animateValue }] }]} 
				source={require('../assets/images/storyset/login.gif')} 
			/>
			<Animated.View style={[
				styles.main,
				{ 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-800, 0]
					}) }]
				}
			]}>
				<View>
					<Text style={styles.lgTitle}>Hello Friend,</Text>
					<Text style={styles.smTitle}>Login to track your fasting now</Text>
				</View>
				<View style={{ marginTop: vS(14) }}>
					<AuthInput
						placeholder='Email'
						type='email'
						height={vS(48)}>
						<AtIcon width={hS(23)} height={vS(22)} />
					</AuthInput>
					<AuthInput
						style={{ marginTop: vS(14) }}
						hide
						type='password'		
						placeholder='Password'
						height={vS(48)}>
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
			<Animated.View style={[styles.registerRef, { opacity: animateValue }]}>
				<Text style={styles.registerRefTitle}>Are you new come in?</Text>
				<Pressable style={styles.registerRefPress} onPress={changeToSignUp}>
					<Text style={styles.registerRefPressText}>Sign up</Text>
				</Pressable>
			</Animated.View>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	storyset: {
		width: hS(292), 
		height: vS(292)
	},

	lgTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(24),
		color: darkHex
	},

	smTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(16),
		color: darkHex
	},

	googleLoginButton: {
		width: '100%',
		height: vS(82),
		borderRadius: hS(32),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: `rgba(${darkRgb.join(', ')}, .1)`
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
		fontSize: hS(14),
		color: '#8a8a8a'
	},

	registerRefPress: {
		marginLeft: hS(12)
	},

	registerRefPressText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(14),
		color: primaryHex
	}, 

	main: {
		marginTop: vS(-8)
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