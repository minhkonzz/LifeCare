import { memo, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { updateCupsize } from '../store/water'
import { formatNum } from '@utils/helpers'
import SettingRow from '@components/setting-row'
import StackHeader from '@components/shared/stack-header'
import WaterGoalPopup from '@components/shared/popup-content/water-setting-goal'
import WaterStartRemindPopup from '@components/shared/popup-content/water-setting-start-remind'
import WaterEndRemindPopup from '@components/shared/popup-content/water-setting-end-remind'
import WaterIntervalPopup from '@components/shared/popup-content/water-setting-interval'

import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Animated,
	Platform,
	StatusBar
} from 'react-native'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const CupSizes = memo(() => {
	const { initCupsize, cupsize } = useSelector((state: AppState) => state.water)
	const dispatch = useDispatch()
	return (
		<>
		{
			[
				initCupsize,
				initCupsize + 50,
				initCupsize + 100,
				initCupsize + 150,
				initCupsize + 300,
				-1
			].map((e, i) => (
				<AnimatedPressable 
					key={i} 
					style={{
					...styles.cupSize, 
					borderStyle: e === -1 && 'dashed' || 'solid',
					marginLeft: i === 0 || i === 3 ? 0 : hS(12),
					...(e === cupsize ? {
						borderWidth: 3,
						borderColor: '#749BC2'
					} : {})
					}}
					onPress={() => dispatch(updateCupsize(e))}>
					<Text style={styles.cupSizeText}>{`${e !== -1 ? e + ' ml' : 'Customize'}`}</Text>
				</AnimatedPressable>
			))
		}
		</>
	)
})

const Main = memo(({
	setWaterGoalPopupVisible,
	setWaterStartRemindPopupVisible,
	setWaterEndRemindPopupVisible,
	setWaterIntervalPopupVisible
}: {
	setWaterGoalPopupVisible: Dispatch<SetStateAction<boolean>>,
	setWaterStartRemindPopupVisible: Dispatch<SetStateAction<boolean>>,
	setWaterEndRemindPopupVisible: Dispatch<SetStateAction<boolean>>,
	setWaterIntervalPopupVisible: Dispatch<SetStateAction<boolean>>
}) => {
	const dailyWater = useSelector((state: AppState) => state.user.metadata?.dailyWater)
	const [ remindOn, setRemindOn ] = useState<boolean>(false)
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const toggleAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

	const {
		startWater,
		endWater,
		waterInterval
	} = useSelector((state: AppState) => state.setting.reminders)

	const { h: startWaterHour, m: startWaterMin } = startWater
	const { h: endWaterHour, m: endWaterMin } = endWater
	const { h: waterIntervalHours, m: waterIntervalMins } = waterInterval

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1,
			duration: 920, 
			useNativeDriver: true
		}).start()
	}, [])

	const onToggleRemind = () => {
		Animated.timing(toggleAnimateValue, {
			toValue: !remindOn && 1 || 0,
			duration: 450,
			useNativeDriver: false
		}).start(({ finished }) => {
			setRemindOn(!remindOn)
		})
	}

	return (
		<View style={styles.main}>
			<StackHeader title='Hydration setting' />
			<View style={styles.main}>
				<SettingRow 
					title='Goal' 
					type='value' 
					value={`${dailyWater} ml`} 
					onPress={() => setWaterGoalPopupVisible(true)} />
				<SettingRow 
					title='Remind' 
					type='toggleValue' 
					value={['OFF', 'ON']} 
					onPress={onToggleRemind} 
					additionalStyles={styles.settingRowAdditional} />
				<Animated.View style={{
					opacity: toggleAnimateValue.interpolate({
						inputRange: [0, .9, 1], 
						outputRange: [0, 0, 1]
					}), 
					height: toggleAnimateValue.interpolate({
						inputRange: [0, 1],
						outputRange: [0, vS(168)]
					})
				}}>
					<SettingRow 
						title='Interval' 
						type='value' 
						value={`${waterIntervalHours && waterIntervalHours + ' hrs ' || ''}${waterIntervalMins && waterIntervalMins + ' mins' || ''}`}
						additionalStyles={styles.settingRowAdditional} 
						onPress={() => setWaterIntervalPopupVisible(true)} />
					<SettingRow 
						title='Start remind at' 
						type='value' 
						value={`${formatNum(startWaterHour)}:${formatNum(startWaterMin)}`} 
						additionalStyles={styles.settingRowAdditional} 
						onPress={() => setWaterStartRemindPopupVisible(true)} />
					<SettingRow 
						title='End remind at' 
						type='value' 
						value={`${formatNum(endWaterHour)}:${formatNum(endWaterMin)}`}
						additionalStyles={styles.settingRowAdditional} 
						onPress={() => setWaterEndRemindPopupVisible(true)} />
				</Animated.View>
				<View style={styles.cupSizes}>
					<Text style={styles.settingRowTitle}>Size of cup</Text>
					<View style={styles.cupSizeList}>
						<CupSizes />
					</View>
				</View>
			</View>
		</View>
	)
})

export default (): JSX.Element => {
	const bottomBarHeight = useDeviceBottomBarHeight()
	const [ waterGoalPopupVisible, setWaterGoalPopupVisible ] = useState<boolean>(false)
	const [ waterStartRemindPopupVisible, setWaterStartRemindPopupVisible ] = useState<boolean>(false)
	const [ waterEndRemindPopupVisible, setWaterEndRemindPopupVisible ] = useState<boolean>(false)
	const [ waterIntervalPopupVisible, setWaterIntervalPopupVisible ] = useState<boolean>(false)	

	return (
		<View style={{...styles.container, paddingBottom: vS(27) + bottomBarHeight}}>
			<Main {...{
				setWaterGoalPopupVisible,
				setWaterStartRemindPopupVisible,
				setWaterEndRemindPopupVisible,
				setWaterIntervalPopupVisible
			}} />
			{ waterGoalPopupVisible && <WaterGoalPopup setVisible={setWaterGoalPopupVisible} /> }
			{ waterStartRemindPopupVisible && <WaterStartRemindPopup setVisible={setWaterStartRemindPopupVisible} /> }
			{ waterEndRemindPopupVisible && <WaterEndRemindPopup setVisible={setWaterEndRemindPopupVisible} /> }
			{ waterIntervalPopupVisible && <WaterIntervalPopup setVisible={setWaterIntervalPopupVisible} /> }
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'space-between',
		alignItems: 'center', 
		backgroundColor: '#fff',
		paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0, 
		paddingHorizontal: hS(22)
	},

	cupSizes: {
		paddingTop: vS(16)
	},

	settingRowAdditional: {
		marginVertical: vS(5)
	},

	settingRowTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(16),
		color: darkHex
	},

	cupSizeList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: vS(10)
	},

	cupSize: {
		justifyContent: 'center',
		alignItems: 'center',
		width: hS(115),
		height: vS(50),
		borderRadius: hS(28),
		borderColor: `rgba(${darkRgb.join(', ')}, .3)`,
		borderWidth: 1.5,
		marginBottom: vS(12)
	},

	cupSizeText: {
		fontSize: hS(12),
		fontFamily: 'Poppins-Medium',
		color: `rgba(${darkRgb.join(', ')}, .6)`,
		letterSpacing: .2
	},

	cupSizeIcon: {
		width: hS(45),
		height: vS(45)
	},

	main: {
		width: '100%'
	},

	customValueText: {
		color: 'gray',
		fontFamily: 'Poppins-Medium',
		fontSize: hS(16)
	}
})

