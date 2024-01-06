import { memo, useState, useRef, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Animated, Platform, StatusBar } from 'react-native'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '../store'
import { updateCupsize } from '../store/water'
import { formatNum } from '@utils/helpers'
import { PopupContext } from '@contexts/popup'
import { AnimatedPressable } from '@components/shared/animated'
import Button from '@components/shared/button/Button'
import SettingRow from '@components/setting-row'
import StackHeader from '@components/shared/stack-header'
import WaterGoalPopup from '@components/shared/popup/water-setting-goal'
import WaterStartRemindPopup from '@components/shared/popup/water-setting-start-remind'
import WaterEndRemindPopup from '@components/shared/popup/water-setting-end-remind'
import WaterIntervalPopup from '@components/shared/popup/water-setting-interval'

const CupSizes = memo(() => {
	const { initCupsize, cupsize, customCupsize } = useSelector((state: AppStore) => state.water)
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
				customCupsize
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
					<Text style={styles.cupSizeText}>{`${e && e + ' ml' || 'Customize'}`}</Text>
				</AnimatedPressable>
			))
		}
		</>
	)
})

export default (): JSX.Element => {
	const bottomBarHeight = useDeviceBottomBarHeight()
	const { setPopup } = useContext<any>(PopupContext)
	const dailyWater = useSelector((state: AppStore) => state.user.metadata?.dailyWater)
	const [ remindOn, setRemindOn ] = useState<boolean>(false)
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const toggleAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

	const {
		startWater,
		endWater,
		waterInterval
	} = useSelector((state: AppStore) => state.setting.reminders)

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
		}).start(() => {
			setRemindOn(!remindOn)
		})
	}

	return (
		<View style={{...styles.container, paddingBottom: vS(27) + bottomBarHeight}}>
			<View style={{ width: '100%' }}>
				<StackHeader title='Hydration setting' />
				<View style={styles.main}>
					<SettingRow 
						title='Goal' 
						type='value' 
						value={`${dailyWater} ml`} 
						onPress={() => setPopup(WaterGoalPopup)}
					/>
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
							onPress={() => setPopup(WaterIntervalPopup)}
						/>
						<SettingRow 
							title='Start remind at' 
							type='value' 
							value={`${formatNum(startWaterHour)}:${formatNum(startWaterMin)}`} 
							additionalStyles={styles.settingRowAdditional} 
							onPress={() => setPopup(WaterStartRemindPopup)}
						/>
						<SettingRow 
							title='End remind at' 
							type='value' 
							value={`${formatNum(endWaterHour)}:${formatNum(endWaterMin)}`}
							additionalStyles={styles.settingRowAdditional} 
							onPress={() => setPopup(WaterEndRemindPopup)}
						/>
					</Animated.View>
					<View style={styles.cupSizes}>
						<Text style={styles.settingRowTitle}>Size of cup</Text>
						<View style={styles.cupSizeList}>
							<CupSizes />
						</View>
					</View>
				</View>
			</View>
			<Button 
				title='Save'
				size='large' 
				bgColor={['rgba(116, 155, 194, .6)', '#749BC2']} />
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

