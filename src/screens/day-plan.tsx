import { Dispatch, SetStateAction, useState, useCallback, useEffect, useRef, memo, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { updateTimes, updateCurrentPlan } from '../store/fasting'
import { toDateTimeV1, getCurrentTimestamp, toTimestampV1 } from '@utils/datetimes'
import { AppState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { primaryHex, primaryRgb, lightHex, lightRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { enqueueAction } from '@store/user'
import { BackIcon, WhiteBackIcon, PrimaryEditIcon, RestaurantIcon, ElectroIcon, LightIcon } from '@assets/icons'
import { autoId } from '@utils/helpers'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import { PopupContext } from '@contexts/popup'
import withSync from '@hocs/withSync'
import UserService from '@services/user'
import DatetimePicker from '@components/shared/datetime-picker'
import Button from '@components/shared/button/Button'
import LinearGradient from 'react-native-linear-gradient'

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

const TimeSetting = ({ 
	startTime, 
	endTime,
	hrsFast,
	hrsEat
}: { 
	startTime: string, 
	endTime: string,
	hrsFast: number,
	hrsEat: number
}) => {
	const dispatch = useDispatch()
	const { setPopup } = useContext<any>(PopupContext)

	const onSave = async (date: string, hours: number, mins: number) => {
		const timestamp: number = toTimestampV1(date, hours, mins)
		dispatch(updateTimes({
			startTimeStamp: timestamp, 
			endTimeStamp: 0
		}))
	}	

	const DatetimePopup = useCallback(memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<any>> }) => 
		<DatetimePicker {...{ setVisible, title: 'Start fasting time', onSave }} />
	), [])

	return (
		<View style={styles.fastingTimes}>
			<View style={styles.fastingTimesHeader}>
				<View style={styles.horz}>
					<ElectroIcon width={hS(10)} height={vS(12.5)} />
					<Text style={styles.hrsDesc}>{`${hrsFast} hours for fasting`}</Text>
				</View>
				<View style={{...styles.horz, marginTop: vS(12) }}>
					<RestaurantIcon width={hS(11)} height={vS(11)} />
					<Text style={styles.hrsDesc}>{`${hrsEat} hours for eating`}</Text>
				</View>
			</View>
			<View style={styles.wfull}>
				<View style={[styles.horz, styles.timeSetting]}>
					<View style={styles.horz}>
						<View style={{...styles.timeSettingDecor, backgroundColor: primaryHex }} />
						<Text style={styles.timeSettingTitleText}>Start</Text>
					</View>
					<View style={styles.horz}>
						<Text style={styles.timeSettingValueText}>{startTime}</Text>
						<Pressable onPress={() => setPopup(DatetimePopup)}>
							<PrimaryEditIcon width={hS(16)} height={vS(16)} />
						</Pressable>
					</View>
				</View>
				<View style={{...styles.horz, ...styles.timeSetting, marginTop: vS(28) }}>
					<View style={styles.horz}>
						<View style={{...styles.timeSettingDecor, backgroundColor: 'rgb(255, 155, 133)' }} />
						<Text style={styles.timeSettingTitleText}>End</Text>
					</View>
					<Text style={{...styles.timeSettingValueText, marginRight: hS(36) }}>{endTime}</Text>
				</View>
			</View>
			<Text style={styles.timeNote}>Please select the time you start fasting</Text>
		</View>
	)
}

const Content = memo(withSync(({ isOnline }: { isOnline: boolean }) => {
	// console.log('rerender day-plan')
	const dispatch = useDispatch()
	const navigation = useNavigation<any>()
	// const [ isFirstRender, setIsFirstRender ] = useState<boolean>(true)
	const { session } = useSelector((state: AppState) => state.user)
	const userId: string | null = session && session.user.id || null
	const { newPlan, startTimeStamp } = useSelector((state: AppState) => state.fasting)
	// console.log('what is new plan:', newPlan)
	const { hrsFast, hrsEat } = newPlan
	const _startTimeStamp = startTimeStamp || getCurrentTimestamp()
	const endTimeStamp = _startTimeStamp + hrsFast * 60 * 60 * 1000

	const onStartFasting = async () => {
		const payload = { startTimeStamp: _startTimeStamp, endTimeStamp, currentPlanId: newPlan.id }

		const cache = (beQueued = false) => {
			dispatch(updateTimes({ startTimeStamp: _startTimeStamp, endTimeStamp }))
			dispatch(updateCurrentPlan())
			if (beQueued) {
				dispatch(enqueueAction({
					actionId: autoId('qaid'),
					invoker: 'updatePersonalData',
					name: 'UPDATE_FASTING_TIMES',
					params: [userId, payload]
				}))
			}
		}

		if (!userId) cache()
		else if (!isOnline) cache(true)
		else {
			const errorMessage: string = await UserService.updatePersonalData(userId, payload)
			if (errorMessage === NETWORK_REQUEST_FAILED) cache(true)
		}
		navigation.navigate('main')
	}

	return (
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
					<View style={{...styles.horz, marginBottom: vS(5) }}>
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
		</View>
	)
}))

export default (): JSX.Element => {
	const bottomBarHeight: number = useDeviceBottomBarHeight()
	const headerColor = useRef<Animated.Value>(new Animated.Value(0)).current
	const [ headerStyles, setHeaderStyles ] = useState<string>('')

	useEffect(() => {
		Animated.timing(headerColor, {
			toValue: headerStyles ? 1 : 0,
			duration: 200,
			useNativeDriver: false
		}).start()
	}, [headerStyles])

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

	const GoBackIcon = headerStyles && BackIcon || WhiteBackIcon
	console.log('render root day-plan')

	return (
		<View style={{...styles.container, paddingBottom: bottomBarHeight}}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				onScroll={handleScroll}>
				<Content />
			</ScrollView>
			<Animated.View
				style={{
					...styles.horz,
					...styles.header,
					backgroundColor: headerColor.interpolate({
						inputRange: [0, 1],
						outputRange: ['transparent', '#fff']
					}),
					...(headerStyles && JSON.parse(headerStyles) || {})
				}}>
				<Pressable>
					<GoBackIcon width={hS(9.2)} height={vS(16)} />
				</Pressable>
				<Text style={{...styles.headerTitle, color: headerStyles && darkHex || '#fff' }}>1 day plan</Text>
				<View />
			</Animated.View>
			{/* { visible && <DateTimePopup {...{ setVisible, onConfirm }} /> } */}
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
