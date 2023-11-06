import { FC, useState, useRef } from 'react'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { View, StyleSheet, Animated, Easing } from 'react-native'
import { AppState } from '../store'
import { useSelector } from 'react-redux'
import { formatNum } from '@utils/helpers'
import SettingRow from '@components/setting-row'
import StackHeader from '@components/shared/stack-header'
import reminderData from '@assets/data/reminder.json'
import WeightRepeatPopup from '@components/shared/popup-content/weight-remind'
import RemindStartFastPopup from '@components/shared/popup-content/start-fast-remind'
import RemindEndFastPopup from '@components/shared/popup-content/end-fast-remind'
import WaterStartRemindPopup from '@components/shared/popup-content/water-start-remind'
import WaterEndRemindPopup from '@components/shared/popup-content/water-end-remind'
import WaterRemindIntervalPopup from '@components/shared/popup-content/water-interval-remind'
import withSync from '@hocs/withSync'

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
		}).start(({ finished }) => {
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

export default withSync((): JSX.Element => {
	const [ repeatWeightPopupVisible, setRepeatWeightPopupVisible ] = useState<boolean>(false)
	const [ remindStartFastPopupVisible, setRemindStartFastPopupVisible ] = useState<boolean>(false)
	const [ remindEndFastPopupVisible, setRemindEndFastPopupVisible ] = useState<boolean>(false)
	const [ waterStartRemindPopupVisible, setWaterStartRemindPopupVisible ] = useState<boolean>(false)
	const [ waterEndRemindPopupVisible, setWaterEndRemindPopupVisible ] = useState<boolean>(false)
	const [ waterRemindIntervalPopupVisible, setWaterRemindIntervalPopupVisible ] = useState<boolean>(false)
	console.log('render Reminder')
	
	const {
		beforeStartFast,
		beforeEndFast,
		repeatWeight,
		startWater,
		endWater,
		waterInterval
	} = useSelector((state: AppState) => state.setting.reminders)
	
	if (Object.keys(reminderCallbacks).length === 0) {
		reminderCallbacks['start-fast-remind'] = () => { setRemindStartFastPopupVisible(true) }
		reminderCallbacks['end-fast-remind'] = () => { setRemindEndFastPopupVisible(true) }
		reminderCallbacks['repeat-weight'] = () => { setRepeatWeightPopupVisible(true) }
		reminderCallbacks['water-start-remind'] = () => { setWaterStartRemindPopupVisible(true) }
		reminderCallbacks['water-end-remind'] = () => { setWaterEndRemindPopupVisible(true) }
		reminderCallbacks['water-interval-remind'] = () => { setWaterRemindIntervalPopupVisible(true) }
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
	reminderValues['water-interval-remind'] = `${waterInterval.h && waterInterval.h + 'h' || ''} ${waterInterval.m && waterInterval.m + 'm' || ''}`

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
			{ repeatWeightPopupVisible && <WeightRepeatPopup setVisible={setRepeatWeightPopupVisible} /> }
			{ remindStartFastPopupVisible && <RemindStartFastPopup setVisible={setRemindStartFastPopupVisible} /> }
			{ remindEndFastPopupVisible && <RemindEndFastPopup setVisible={setRemindEndFastPopupVisible} /> }
			{ waterStartRemindPopupVisible && <WaterStartRemindPopup setVisible={setWaterStartRemindPopupVisible} /> }
			{ waterEndRemindPopupVisible && <WaterEndRemindPopup setVisible={setWaterEndRemindPopupVisible} /> }
			{ waterRemindIntervalPopupVisible && <WaterRemindIntervalPopup setVisible={setWaterRemindIntervalPopupVisible} /> }
		</View>
	)
})

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
