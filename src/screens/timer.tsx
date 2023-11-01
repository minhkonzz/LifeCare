import { 
	memo, 
	ReactNode, 
	useEffect, 
	useRef, 
	useContext, 
	Dispatch, 
	SetStateAction 
} from 'react'
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native'
import { AppState } from '../store'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import PopupProvider, { PopupContext } from '@contexts/popup'
import BackIcon from '@assets/icons/goback.svg'
import FastingClock from '@components/fasting-clock'
import FastingActivator from '@components/fasting-activator'
import FastingRecords from '@components/timer-fasting-records'
import Screen from '@components/shared/screen'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

const MainTop = memo(({ isViewable }: { isViewable: boolean }) => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
	const { currentPlan, startTimeStamp, endTimeStamp } = useSelector((state: AppState) => state.fasting)
	const navigation = useNavigation()

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 1 || 0, 
			duration: 1010, 
			useNativeDriver: true
		}).start()
	}, [isViewable])

	return (
		isViewable && 
		<View style={styles.mainTop}>
			<Animated.Text style={[
				styles.mainTopTitle, 
				{
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-100, 0]
					}) }]
				}
			]}>
				{ startTimeStamp && endTimeStamp && "You're fasting now" || "You're in eating period" }
			</Animated.Text>
			<Animated.View style={[
				styles.plans, 
				{
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({ 
						inputRange: [0, 1], 
						outputRange: [-100, 0]
					}) }]
				}
			]}>
				<Pressable style={styles.plansBox} onPress={() => navigation.navigate('plans')}>
					<Text style={styles.plansBoxText}>{currentPlan && `${currentPlan.name} Intermittent Fasting plan` || 'Select plan'}</Text>
					<BackIcon
						style={styles.backIc}
						width={hS(5)}
						height={vS(10)}
					/>
				</Pressable>
				<Pressable style={styles.planRef}>
					<Text style={styles.planRefText}>?</Text>
				</Pressable>
			</Animated.View>
		</View> || <View style={styles.mainTop} />
	)
})

const Main = memo(() => {
	const { popup: Popup, setPopup } = useContext<{ popup: ReactNode, setPopup: Dispatch<SetStateAction<ReactNode>> }>(PopupContext)
	return (
		<>
			<Screen header='tab' title='Timer' paddingHorzContent content={[
				MainTop,
				FastingClock,
				FastingActivator,
				FastingRecords
			]} />
			{ Popup && <Popup setVisible={setPopup} /> }
		</>
	)
})

export default (): JSX.Element => {
	return (
		<View style={styles.container}>
			<PopupProvider>
				<Main />
			</PopupProvider>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1 },

	mainTop: {
		height: vS(120),
		alignItems: 'center',
		marginTop: vS(110),
		marginBottom: vS(30)
	},

	mainTopTitle: {
		fontFamily: 'Poppins-Bold',
		fontSize: hS(22),
		letterSpacing: .5,
		color: darkHex
	},

	plans: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: hS(36),
		marginTop: vS(18)
	},

	plansBox: {
		borderRadius: 72,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: vS(12),
		paddingHorizontal: hS(13),
		elevation: 14,
		shadowColor: `rgba(${darkRgb.join(', ')}, .3)`
	},

	plansBoxText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2
	},

	planRef: {
		width: hS(22),
		height: vS(22),
		backgroundColor: `rgba(${darkRgb.join(', ')}, .18)`,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 300,
		marginLeft: hS(15)
	},

	planRefText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkHex
	},

	backIc: {
		transform: [{ rotate: '-90deg' }], 
		marginLeft: hS(9.7)
	}
})
