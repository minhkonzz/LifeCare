import { FC, useState, useRef } from 'react'
import {
	View,
	StyleSheet,
	Animated,
	Pressable,
	Easing
} from 'react-native'

import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import SettingRow from '@components/setting-row'
import StackHeader from '@components/shared/stack-header'
import Screen from '@components/shared/screen'
import reminderData from '@assets/data/reminder.json'

interface ReminderSectionProps {
	title: string,
	settingList?: Array<any>
}

const ReminderSection: FC<ReminderSectionProps> = ({ title, settingList = [] }) => {
	const height: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const [ isEnabled, setIsEnabled ] = useState<boolean>(false)

	const onPress = () => {
		Animated.timing(height, {
			toValue: 350,
			duration: 100,
			easing: Easing.bounce,
			useNativeDriver: false
		}).start(({ finished }) => {
			setIsEnabled(!isEnabled)
		})
	}

	return (
		<View style={styles.reminderSection}>
			<Pressable {...{ onPress }}>
				<SettingRow {...{ title, type: 'toggle' }} />
			</Pressable>
			<Animated.View style={{ width: '100%', height, borderWidth: 1 }}>
				{settingList.map((e, i) => <SettingRow key={`${e.id}-${i}`} title={e.title} type='value' value={e.value} />)}
			</Animated.View>
		</View>
	)
}

export default (): JSX.Element => {
	return (
		<Screen full paddingHorzContent>
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
		</Screen>
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
	}
})
