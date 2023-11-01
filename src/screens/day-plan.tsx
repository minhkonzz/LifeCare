import { Dispatch, SetStateAction, useState, useEffect, useRef, memo } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Platform,
	StatusBar,
	Pressable,
	Animated,
	ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { updateTimes, updateCurrentPlan, resetTimes } from '../store/fasting'
import { toDateTimeV1, getCurrentTimestamp } from '@utils/datetimes'
import { AppState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import DateTimePopup from '@components/shared/popup-content/datetime'
import DayPlanItem from '@components/day-plan-item'
import Button from '@components/shared/button/Button'
import BackIcon from '@assets/icons/goback.svg'
import WhiteBackIcon from '@assets/icons/goback-white.svg'
import EditPrimary from '@assets/icons/edit-primary.svg'
import RestaurantIcon from '@assets/icons/restaurant.svg'
import ElectroIcon from '@assets/icons/electro.svg'
import LightIcon from '@assets/icons/light.svg'
import LinearGradient from 'react-native-linear-gradient'

const { hex: lightHex, rgb: lightRgb } = Colors.lightPrimary
const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

const TimeSetting = ({ 
	setVisible, 
	startTime, 
	endTime,
	hrsFast,
	hrsEat
}: { 
	setVisible: Dispatch<SetStateAction<boolean>>, 
	startTime: string, 
	endTime: string,
	hrsFast: number,
	hrsEat: number
}) => {

	useEffect(() => {
		console.log('render TimeSetting Firsttime')
	}, [])

	return (
		<View style={styles.fastingTimes}>
			<View style={styles.fastingTimesHeader}>
				<View style={styles.horz}>
					<ElectroIcon width={hS(10)} height={vS(12.5)} />
					<Text style={styles.hrsDesc}>{`${hrsFast} hours for fasting`}</Text>
				</View>
				<View style={[styles.horz, { marginTop: vS(12) }]}>
					<RestaurantIcon width={hS(11)} height={vS(11)} />
					<Text style={styles.hrsDesc}>{`${hrsEat} hours for eating`}</Text>
				</View>
			</View>
			<View style={styles.wfull}>
				<View style={[styles.horz, styles.timeSetting]}>
					<View style={styles.horz}>
						<View style={[styles.timeSettingDecor, { backgroundColor: primaryHex }]} />
						<Text style={styles.timeSettingTitleText}>Start</Text>
					</View>
					<View style={styles.horz}>
						<Text style={styles.timeSettingValueText}>{startTime}</Text>
						<Pressable onPress={() => setVisible(true)}>
							<EditPrimary width={hS(16)} height={vS(16)} />
						</Pressable>
					</View>
				</View>
				<View style={[styles.horz, styles.timeSetting, { marginTop: vS(28) }]}>
					<View style={styles.horz}>
						<View style={[styles.timeSettingDecor, { backgroundColor: 'rgb(255, 155, 133)' }]} />
						<Text style={styles.timeSettingTitleText}>End</Text>
					</View>
					<View style={styles.horz}>
						<Text style={styles.timeSettingValueText}>{endTime}</Text>
						<EditPrimary width={hS(16)} height={vS(16)} />
					</View>
				</View>
			</View>
			<Text style={styles.timeNote}>Please select the time you start fasting</Text>
		</View>
	)
}

const Content = memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<boolean>> }) => {
	console.log('render Content component')
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const [ isFirstRender, setIsFirstRender ] = useState<boolean>(true)
	const { newPlan, startTimeStamp } = useSelector((state: AppState) => state.fasting)
	const { hrsFast, hrsEat } = newPlan
	const _startTimeStamp = startTimeStamp || getCurrentTimestamp()
	const endTimeStamp = _startTimeStamp + hrsFast * 60 * 60 * 1000

	useEffect(() => {
		dispatch(resetTimes())
		setIsFirstRender(false)
	}, [])

	const onStartFasting = () => {
		dispatch(updateCurrentPlan())
		// dispatch(updateTimes({ 
		// 	_start: startTimeStamp,
		// 	_end: endTimeStamp
		// }))
		// navigation.navigate('main')
		console.log(toDateTimeV1(startTimeStamp), toDateTimeV1(endTimeStamp))
	}

	return (
		!isFirstRender &&
		<View style={styles.main}>
			<LinearGradient
				style={styles.primeDecor}
				colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}
			/>
			<View style={styles.mainContent}>
				<Text style={styles.planNameTitle}>{newPlan.name}</Text>
				<TimeSetting {...{ 
					setVisible, 
					startTime: toDateTimeV1(_startTimeStamp), 
					endTime: toDateTimeV1(endTimeStamp),
					hrsFast, 
					hrsEat
				}} />
				<LinearGradient
					style={styles.notes}
					colors={[`rgba(${lightRgb.join(', ')}, .3)`, lightHex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .52, y: .5 }}>
					<View style={[styles.horz, { marginBottom: vS(5) }]}>
						<LightIcon width={hS(12)} height={vS(16.5)} />
						<Text style={styles.notesTitle}>PREPARE FOR FASTING</Text>
					</View>
					{
						[
							'Eat enough protein, such as meat, fish, tofu and nuts',
							'Eat high-fiber foods, such as nuts, beans, fruits amd vegetables',
							'Drink plenty of water',
							'Fill yourself with natural foods to help control your appetize at meal times'
						].map((e, i) =>
							<View key={i} style={styles.note}>
								<View style={styles.noteDecor} />
								<Text style={styles.noteText}>{e}</Text>
							</View>
						)
					}
				</LinearGradient>
				<Button 
					title='Start fasting' 
					bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
					size='large' 
					onPress={onStartFasting} />
			</View>
		</View> || <></>
	)
})

export default (): JSX.Element => {
	const dispatch = useDispatch()
	const bottomBarHeight: number = useDeviceBottomBarHeight()
	const [headerStyles, setHeaderStyles] = useState<string>('')
	const [ visible, setVisible ] = useState<boolean>(false)
	const headerColor = useRef<Animated.Value>(new Animated.Value(0)).current

	useEffect(() => {
		animateHeaderColor()
	}, [headerStyles])

	const animateHeaderColor = () => {
		Animated.timing(headerColor, {
			toValue: headerStyles ? 1 : 0,
			duration: 200,
			useNativeDriver: false
		}).start()
	}

	const handleScroll = (event: any) => {
		const scrolledY = event.nativeEvent.contentOffset.y
		if (scrolledY > 0) {
			setHeaderStyles(JSON.stringify({
				elevation: 3,
				shadowColor: `rgba(${darkRgb.join(', ')}, .4)`
			}))
			return
		}
		setHeaderStyles('')
	}

	const onConfirm = (timestamp: number) => {
		dispatch(updateTimes({
			_start: timestamp, 
			_end: 0
		}))
		setVisible(false)
	}

	const GoBackIcon = headerStyles && BackIcon || WhiteBackIcon

	return (
		<View style={[styles.container, { paddingBottom: bottomBarHeight }]}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				onScroll={handleScroll}>
				<Content {...{ setVisible }} />
			</ScrollView>
			<Animated.View
				style={[
					styles.horz,
					styles.header,
					{
						backgroundColor: headerColor.interpolate({
							inputRange: [0, 1],
							outputRange: ['transparent', '#fff']
						}),
						...(headerStyles && JSON.parse(headerStyles) || {})
					}
				]}>
				<Pressable onPress={() => { }}>
					<GoBackIcon width={hS(9.2)} height={vS(16)} />
				</Pressable>
				<Text style={[styles.headerTitle, { color: headerStyles && darkHex || '#fff' }]}>1 day plan</Text>
				<View />
			</Animated.View>
			{ visible && <DateTimePopup {...{ setVisible, onConfirm }} /> }
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
	},

	wfull: {
		width: '100%'
	},

	horz: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	header: {
		position: 'absolute',
		top: 0,
		justifyContent: 'space-between',
		width: '100%',
		paddingVertical: vS(22),
		paddingHorizontal: hS(24)
	},

	headerTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(18),
		letterSpacing: .2,
		marginRight: hS(4)
	},

	main: {
		paddingTop: vS(64),
		alignItems: 'center'
	},

	mainContent: {
		width: '100%',
		alignItems: 'center',
		paddingHorizontal: hS(24)
	},

	primeDecor: {
		width: hS(800),
		height: vS(800),
		borderRadius: 1000,
		position: 'absolute',
		top: vS(-560)
	},

	planNameTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(42),
		color: '#fff',
		letterSpacing: .2,
		marginBottom: vS(12),
		marginLeft: hS(4)
	},

	notes: {
		width: '100%',
		paddingHorizontal: hS(20),
		paddingVertical: vS(12),
		borderRadius: hS(32),
		marginTop: vS(32), 
		marginBottom: vS(32),
		alignItems: 'center'
	},

	note: {
		flexDirection: 'row',
		alignSelf: 'flex-start',
		marginTop: vS(14)
	},

	notesTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(16),
		color: darkHex,
		letterSpacing: .2,
		marginLeft: hS(10),
		marginTop: 2
	},

	noteDecor: {
		width: hS(7),
		height: vS(7),
		backgroundColor: `rgba(${darkRgb.join(', ')}, .6)`,
		borderRadius: 10
	},

	noteText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(11),
		color: darkHex,
		letterSpacing: .2,
		marginLeft: hS(8),
		marginTop: vS(-5),
		lineHeight: vS(19)
	},

	fastingTimes: {
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingTop: vS(20),
		paddingBottom: vS(14),
		paddingHorizontal: hS(24),
		width: '100%',
		elevation: 4,
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
		borderRadius: hS(32)
	},

	fastingTimesHeader: {
		marginBottom: vS(22),
		alignSelf: 'flex-start'
	},

	planName: {
		position: 'absolute',
		top: vS(-20),
		width: hS(229),
		height: vS(41),
		elevation: 4,
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
		borderRadius: hS(25),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},

	planNameText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2
	},

	hrsDesc: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2,
		marginLeft: hS(12)
	},

	timeSetting: {
		width: '100%',
		justifyContent: 'space-between'
	},

	timeSettingDecor: {
		width: hS(7),
		height: vS(7),
		borderRadius: hS(12)
	},

	timeSettingTitleText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2,
		marginLeft: hS(19)
	},

	timeSettingValueText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(12),
		letterSpacing: .2,
		color: darkHex,
		marginRight: hS(20)
	},

	timeNote: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(11),
		color: darkHex,
		marginTop: vS(18),
		letterSpacing: .2
	}
})
