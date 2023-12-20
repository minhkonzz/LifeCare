import { FC, useState, useRef, useContext } from 'react'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { View, StyleSheet, Animated, Easing } from 'react-native'
import { AppState } from '../store'
import { useSelector } from 'react-redux'
import { formatNum } from '@utils/helpers'
import { PopupContext } from '@contexts/popup'
import SettingRow from '@components/setting-row'
import StackHeader from '@components/shared/stack-header'
import reminderData from '@assets/data/reminder.json'
import WeightRepeatPopup from '@components/shared/popup/weight-remind'
import RemindStartFastPopup from '@components/shared/popup/start-fast-remind'
import RemindEndFastPopup from '@components/shared/popup/end-fast-remind'
import WaterStartRemindPopup from '@components/shared/popup/water-start-remind'
import WaterEndRemindPopup from '@components/shared/popup/water-end-remind'
import WaterRemindIntervalPopup from '@components/shared/popup/water-interval-remind'

interface ReminderSectionProps {
	title: string,
	settingList?: Array<any>
}

const reminderCallbacks = {}
const reminderValues = {}

const ReminderSection: FC<ReminderSectionProps> = ({ title, settingList = [] }) => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const [ isEnabled, setIsEnabled ] = useState<boolean>(false)

	const onPress = () => {
		Animated.timing(animateValue, {
			toValue: !isEnabled ? 1 : 0,
			duration: 320,
			easing: Easing.ease,
			useNativeDriver: false
		}).start(() => {
			setIsEnabled(!isEnabled)
		})
	}

	return (
		<View style={styles.reminderSection}>
			<SettingRow boldTitle {...{ title, type: 'toggle', value: isEnabled, onPress }} />
			<Animated.View style={{ 
				width: '100%', 
				opacity: animateValue,
				height: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [0, vS(settingList.length * 48)]
				}) 
			}}>
			{ 
				settingList.map((e, i) => 
					<View key={`${e.id}-${i}`}>
						<View style={styles.gap} />
						<SettingRow 
							title={e.title} 
							type='value' 
							value={reminderValues[e.key]} 
							onPress={reminderCallbacks[e.key]}
						/>
					</View>
				) 
			}
			</Animated.View>
		</View>
	)
}

export default (): JSX.Element => {
	const { setPopup } = useContext<any>(PopupContext)
	
	const {
		beforeStartFast,
		beforeEndFast,
		repeatWeight,
		startWater,
		endWater,
		waterInterval
	} = useSelector((state: AppState) => state.setting.reminders)
	
	if (Object.keys(reminderCallbacks).length === 0) {
		reminderCallbacks['start-fast-remind'] = () => { setPopup(RemindStartFastPopup) }
		reminderCallbacks['end-fast-remind'] = () => { setPopup(RemindEndFastPopup) }
		reminderCallbacks['repeat-weight'] = () => { setPopup(WeightRepeatPopup) }
		reminderCallbacks['water-start-remind'] = () => { setPopup(WaterStartRemindPopup) }
		reminderCallbacks['water-end-remind'] = () => { setPopup(WaterEndRemindPopup) }
		reminderCallbacks['water-interval-remind'] = () => { setPopup(WaterRemindIntervalPopup) }
	}

	reminderValues['start-fast-remind'] = `${beforeStartFast} mins` 
	reminderValues['end-fast-remind'] = `${beforeEndFast} mins`
	reminderValues['repeat-weight'] = [...repeatWeight.days.map(e => 
		e === 'Mon' && 'T.2' || 
		e === 'Tue' && 'T.3' ||
		e === 'Wed' && 'T.4' || 
		e === 'Thurs' && 'T.5' ||
		e === 'Fri' && 'T.6' || 
		e === 'Sat' && 'T.7' || 
		e === 'Sun' && 'CN'
	)].join(', ')

	reminderValues['water-start-remind'] = `${formatNum(startWater.h)}:${formatNum(startWater.m)}`
	reminderValues['water-end-remind'] = `${formatNum(endWater.h)}:${formatNum(endWater.m)}`
	reminderValues['water-interval-remind'] = `${waterInterval.h && waterInterval.h + ' hrs ' || ''}${waterInterval.m && waterInterval.m + ' mins' || ''}`

	return (
		<View style={styles.container}>
			<StackHeader title='Reminder' />
			<View style={{ width: '100%' }}>
			{
				[
					'Start fasting',
					'End fasting',
					'Current weight',
					'Drink water'
				].map((e, i) => <ReminderSection key={`r${i}`} title={e} settingList={reminderData[e]} />)
			}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: hS(24),
		backgroundColor: '#fff'
	},

	reminderSection: {
		width: '100%',
		marginBottom: vS(22)
	},

	gap: { height: vS(12) }
})
