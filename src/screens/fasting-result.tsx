import { memo, Dispatch, SetStateAction, useRef, useEffect, useCallback, useContext } from 'react'
import { View, Text, StyleSheet, Animated, Platform, StatusBar, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import { darkHex, darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '../store'
import { resetTimes } from '@store/fasting'
import { addRec, enqueueAction } from '@store/user'
import { getLocalDatetimeV2, toDateTimeV1, toDateTimeV2 } from '@utils/datetimes'
import { PopupContext } from '@contexts/popup'
import { WhiteBackIcon, WhiteEditIcon, PrimaryEditIcon } from '@assets/icons'
import { autoId } from '@utils/helpers'
import { AnimatedLinearGradient } from '@components/shared/animated'
import { NETWORK_REQUEST_FAILED } from '@utils/constants/error-message'
import UpdateStartFastPopup from '@components/shared/popup/update-startfast'
import UpdateEndFastPopup from '@components/shared/popup/update-endfast'
import Button from '@components/shared/button/Button'
import withSync from '@hocs/withSync'
import UserService from '@services/user'
import LinearGradient from 'react-native-linear-gradient'
import CurrentWeightPopup from '@components/shared/popup/current-weight'
import AnimatedNumber from '@components/shared/animated-text'
import useSession from '@hooks/useSession'

const TimeSetting = memo(({ 
	fastingRecId,
	startTimeStamp, 
	endTimeStamp, 
	planName 
}: {
	fastingRecId?: string,
	startTimeStamp: number,
	endTimeStamp: number,
	planName: string
}) => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const { setPopup } = useContext<any>(PopupContext)

	const UpdateStartFastTimePopup = useCallback(memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<any>> }) => {
		return <UpdateStartFastPopup {...{ setVisible, datetime: toDateTimeV2(startTimeStamp), fastingRecId }} />
	}), [])

	const UpdateEndFastTimePopup = useCallback(memo(({ setVisible }: { setVisible: Dispatch<SetStateAction<any>> }) => {
		return <UpdateEndFastPopup {...{ setVisible, datetime: toDateTimeV2(endTimeStamp), fastingRecId }} />
	}), [])

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1, 
			duration: 840, 
			useNativeDriver: true
		}).start()
	}, [])

	return (
		<Animated.View style={{...styles.fastingTimes, opacity: animateValue }}>
			<Animated.View style={{
				...styles.planName,
				opacity: animateValue,
				transform: [{ translateY: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [16, 0]
				}) }]
			}}>
				<Text style={styles.planNameText}>{planName}</Text>
			</Animated.View>
			<View style={styles.wfull}>
				<View style={styles.timeSetting}>
					<View style={styles.timeSettingTitle}>
						<View style={{...styles.timeSettingDecor, backgroundColor: primaryHex }} />
						<Text style={styles.timeSettingTitleText}>Start</Text>
					</View>
					<View style={styles.horz}>
						<Text style={styles.timeSettingValueText}>{toDateTimeV1(startTimeStamp)}</Text>
						<Pressable onPress={() => setPopup(UpdateStartFastTimePopup)}>
							<PrimaryEditIcon width={hS(20)} height={vS(20)} />
						</Pressable>
					</View>
				</View>
				<View style={{...styles.timeSetting, marginTop: vS(28) }}>
					<View style={styles.timeSettingTitle}>
						<View style={{...styles.timeSettingDecor, backgroundColor: 'rgb(255, 155, 133)' }} />
						<Text style={styles.timeSettingTitleText}>End</Text>
					</View>
					<View style={styles.horz}>
						<Text style={styles.timeSettingValueText}>{toDateTimeV1(endTimeStamp)}</Text>
						<Pressable onPress={() => setPopup(UpdateEndFastTimePopup)}>
							<PrimaryEditIcon width={hS(20)} height={vS(20)} />
						</Pressable>
					</View>
				</View>
			</View>
		</Animated.View>
	)
})

const TrackWeight = memo((): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const progressAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const { setPopup } = useContext<any>(PopupContext)
	const { startWeight, goalWeight, currentWeight } = useSelector((state: AppStore) => state.user.metadata)

	useEffect(() => {
		Animated.parallel([
			Animated.timing(animateValue, {
				toValue: 1, 
				duration: 840, 
				useNativeDriver: true
			}),
			Animated.timing(progressAnimateValue, {
				toValue: 1, 
				duration: 840, 
				useNativeDriver: false
			})
		]).start()
	}, [])

	return (
		<Animated.View style={{...styles.trackWeight, opacity: animateValue }}>
			<View style={styles.trackWeightHeader}>
				<View>
					<Animated.Text 
						style={{
							...styles.trackWeightTitle,
							transform: [{ translateX: animateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [-30, 0]
							}) }]
						}}>
						Track your weight
					</Animated.Text>
					<View style={styles.trackWeightValue}>
						<Animated.Text 
							style={{
								...styles.trackWeightValueText,
								transform: [{ translateY: animateValue.interpolate({
									inputRange: [0, 1], 
									outputRange: [10, 0]
								}) }]
							}}>
							{`${currentWeight} kg`}
						</Animated.Text>
						<Animated.Text style={{
							...styles.trackWeightValueNote, 
							opacity: animateValue,
							transform: [{ translateX: animateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [-10, 0]
							}) }]
						}}>
							until now
						</Animated.Text>
					</View>
				</View>
				<TouchableOpacity
					activeOpacity={.7}
					onPress={() => setPopup(CurrentWeightPopup)}>
					<LinearGradient
						style={styles.trackWeightButton}
						colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: 1 }}>
						<WhiteEditIcon width={hS(20)} height={vS(20)} />
					</LinearGradient>
				</TouchableOpacity>
			</View>
			<View style={styles.weightProcess}>
				<Animated.View style={{...styles.weightProcessBar, opacity: animateValue}}>
					<AnimatedLinearGradient
						style={{
							...styles.weightProcessValueBar,
							width: progressAnimateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: ['0%', '60%']
							})
						}}
						colors={[`rgba(${primaryRgb.join(', ')}, .3)`, primaryHex]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: 1 }} />
				</Animated.View>
				<View style={styles.weightProcessTexts}>
					<Animated.Text 
						style={{
							...styles.weightProcessText,
							opacity: animateValue,
							transform: [{ translateX: animateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [-10, 0]
							}) }]
						}}>
						{`Start: ${startWeight} kg`}
					</Animated.Text>
					<Animated.Text 
						style={{
							...styles.weightProcessText,
							opacity: animateValue,
							transform: [{ translateX: animateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [10, 0]
							}) }]
						}}>
						{`Goal: ${goalWeight} kg`}
					</Animated.Text>
				</View>
			</View>
		</Animated.View>
	)
})

export default withSync(({ isOnline }: { isOnline: boolean }): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const bottomBarHeight = useDeviceBottomBarHeight()
	const navigation = useNavigation<any>()
	const dispatch = useDispatch()
	const route = useRoute()
	const screenParams: any = route.params
	const { startTimeStamp: _startTimeStamp, currentPlan } = useSelector((state: AppStore) => state.fasting)

	let startTimeStamp: number, endTimeStamp: number, planName: string
		 
	if (screenParams) {
		const { item } = screenParams
		const { plan, startTimeStamp: _start, endTimeStamp: _end } = item
		startTimeStamp = _start
		endTimeStamp = _end
		planName = plan
	} else {
		startTimeStamp = _startTimeStamp
		endTimeStamp = Date.now()
		planName = currentPlan.name
	}
	
	const { userId } = useSession()
	const totalMins: number = Math.floor((endTimeStamp - startTimeStamp) / (1000 * 60))
	const hours: number = Math.floor(totalMins / 60)
	const mins: number = totalMins % 60

   useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1,
         duration: 840, 
         useNativeDriver: true
      }).start()
   }, [])

	const BottomButtons = useCallback(memo(() => {

		const resetFastingTimes = async () => {
			const resetPayload = { startTimeStamp: 0, endTimeStamp: 0 }
			const cache = () => {
				dispatch(resetTimes())
				if (userId && !isOnline) {
					dispatch(enqueueAction({
						userId, 
						actionId: autoId('qaid'),
						invoker: 'updatePersonalData',
						name: 'UPDATE_FASTING_TIMES',
						params: [userId, resetPayload]
					}))
				}
			}

			if (userId) {
				const errorMessage: string = await UserService.updatePersonalData(userId, resetPayload)
				if (errorMessage === NETWORK_REQUEST_FAILED) cache()
				return
			}
			cache()
		}

		const onSave = async () => {
			let payload: any = { startTimeStamp, endTimeStamp, planName, notes: '' }
			
			const cache = () => {
				const createdAt: string = getLocalDatetimeV2()
				payload = {
					...payload, 
					id: autoId('frec'),
					createdAt,
					updatedAt: createdAt
				}
				dispatch(addRec({ key: 'fastingRecords', rec: payload }))
				if (userId && !isOnline) {
					dispatch(enqueueAction({
						userId,
						actionId: autoId('qaid'),
						invoker: 'saveFastingRecord',
						name: 'ADD_FASTING_REC',
						params: [userId, payload]
					}))
				}
			}
	
			if (userId) {
				const addFastingRecErrorMessage: string = await UserService.saveFastingRecord(userId, payload)
				if (addFastingRecErrorMessage === NETWORK_REQUEST_FAILED) cache()
			}
			else cache()
			await resetFastingTimes()
			navigation.goBack()
		}

		const onDelete = async () => {
			await resetFastingTimes()
			navigation.goBack()
		}

		return (
			<View style={styles.bottom}>
				{ !screenParams && 
				<>
					<TouchableOpacity
						activeOpacity={.7}
						onPress={onDelete}>
						<LinearGradient
							style={styles.bottomButton}
							colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
							start={{ x: .5, y: 0 }}
							end={{ x: .5, y: 1 }}>
							<Text style={styles.bottomButtonText}>Delete</Text>
						</LinearGradient>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={.7}
						onPress={onSave}>
						<LinearGradient
							style={styles.bottomButton}
							colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
							start={{ x: .5, y: 0 }}
							end={{ x: .5, y: 1 }}>
							<Text style={styles.bottomButtonText}>Save</Text>
						</LinearGradient>
					</TouchableOpacity>
				</> || <Button title='Confirm' size='large' bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} /> }
			</View>
		)
	}), [])

	return (
		<ScrollView contentContainerStyle={{...styles.container, paddingBottom: vS(27) + bottomBarHeight}}>
			<AnimatedLinearGradient
				style={{
               ...styles.primeDecor,
					opacity: animateValue,
					transform: [{ scale: animateValue }]
            }}
				colors={[`rgba(${primaryRgb.join(', ')}, .2)`, primaryHex]}
				start={{ x: .5, y: 0 }}
				end={{ x: .52, y: .5 }} />
			<View style={styles.header}>
				<WhiteBackIcon style={styles.backIcon} width={hS(9.2)} height={vS(16)} />
				<Animated.Text 
					style={{
						...styles.headerTitle,
						opacity: animateValue,
						transform: [{ translateY: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-10, 0]
						}) }]
					}}>
					Total fasting time
				</Animated.Text>
				<Animated.View style={{
					...styles.timeTitle,
					opacity: animateValue,
					transform: [{ translateY: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [10, 0]
					}) }]
				}}>
					<AnimatedNumber value={hours} style={styles.numTitle} />
					<Text style={styles.symbolTitle}>h</Text>
					<AnimatedNumber value={mins} style={{...styles.numTitle, marginLeft: hS(17)}} />
					<Text style={styles.symbolTitle}>m</Text>
				</Animated.View>
			</View>
			<TimeSetting {...{ startTimeStamp, endTimeStamp, planName }} />
			<TrackWeight />
			<BottomButtons />
		</ScrollView>
	)
})

const styles = StyleSheet.create({
	wfull: { width: '100%' },

	horz: {
		flexDirection: 'row', 
		alignItems: 'center'
	},

	container: {
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0
	},

	primeDecor: {
		width: hS(800),
		height: vS(800),
		borderRadius: 600,
		position: 'absolute',
		top: vS(-466)
	},

	header: {
		width: '100%',
		alignItems: 'center',
		paddingHorizontal: hS(24)
	},

	backIcon: {
		alignSelf: 'flex-start',
		marginTop: vS(28)
	},

	headerTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(22),
		color: '#fff',
		letterSpacing: .2,
		marginTop: vS(15)
	},

	timeTitle: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginTop: vS(8),
		marginLeft: hS(10)
	},

	numTitle: {
		fontFamily: 'Poppins-Bold',
		fontSize: hS(50),
		color: '#fff',
		letterSpacing: .2
	},

	symbolTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(22),
		color: '#fff',
		marginLeft: hS(10),
		marginBottom: vS(20)
	},

	bottom: {
		position: 'absolute',
		bottom: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		elevation: 15,
		shadowColor: `rgba(${darkRgb.join(', ')}, .6)`,
		paddingHorizontal: hS(22),
		paddingVertical: vS(20)
	},

	bottomButton: {
		width: hS(172),
		height: vS(64),
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},

	bottomButtonText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(14),
		color: '#fff',
		letterSpacing: .2
	},

	fastingTimes: {
		marginTop: vS(52),
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingTop: vS(50),
		paddingBottom: vS(22),
		paddingHorizontal: hS(24),
		width: hS(366),
		elevation: 4,
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`,
		borderRadius: hS(32)
	},

	planName: {
		position: 'absolute',
		top: vS(-20),
		paddingHorizontal: hS(23),
		paddingVertical: vS(10), 
		elevation: 10,
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

	timeSetting: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	timeSettingTitle: {
		flexDirection: 'row',
		alignItems: 'center'
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
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		letterSpacing: .2,
		color: darkHex,
		marginRight: hS(12)
	},

	trackWeight: {
		marginTop: vS(37),
		width: hS(366),
		backgroundColor: '#fff',
		paddingHorizontal: hS(22),
		paddingVertical: vS(22),
		borderRadius: hS(32),
		elevation: 10,
		shadowColor: `rgba(${darkRgb.join(', ')}, .4)`
	},

	trackWeightHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	trackWeightTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(16),
		color: darkHex,
		letterSpacing: .2
	},

	trackWeightValue: {
		flexDirection: 'row',
		marginTop: vS(10)
	},

	trackWeightValueText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(28),
		color: primaryHex,
		letterSpacing: .2
	},

	trackWeightValueNote: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: darkHex,
		marginLeft: hS(6),
		marginTop: vS(18)
	},

	trackWeightButton: {
		width: hS(52),
		height: vS(52),
		borderRadius: hS(22),
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
	},

	weightProcess: {
		width: '100%',
		marginTop: vS(16)
	},

	weightProcessBar: {
		width: '100%',
		height: vS(12),
		backgroundColor: `rgba(${darkRgb.join(', ')}, .1)`,
		borderRadius: 45
	},

	weightProcessValueBar: {
		height: '100%',
		borderRadius: 45
	},

	weightProcessTexts: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: vS(10)
	},

	weightProcessText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: `rgba(${darkRgb.join(', ')}, .6)`,
		letterSpacing: .2
	}
})
