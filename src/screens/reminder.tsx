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
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const [ isEnabled, setIsEnabled ] = useState<boolean>(false)
	// console.log('render reminderSection', Date.now())

	const onPress = () => {
		// setIsEnabled(!isEnabled)
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
			<Pressable {...{ onPress }}>
				<SettingRow {...{ title, type: 'toggle' }} />
			</Pressable>
			<Animated.View style={{ width: '100%', height: animateValue.interpolate({
				inputRange: [ 0, 1 ], 
				outputRange: [ 0, vS(settingList.length * 48) ]
			}) }}>
			{ 
				settingList.map((e, i) => 
					<View key={`${e.id}-${i}`}>
						<View style={styles.gap} />
						<SettingRow 
							title={e.title} 
							type='value' 
							value={e.value} 
						/>
					</View>
				) 
			}
			</Animated.View>
			{/* { 
				isEnabled &&
				<View style={{ width: '100%' }}>
					{ 
						settingList.map((e, i) => 
							<View key={`${e.id}-${i}`}>
								<View style={styles.gap} />
								<SettingRow 
									title={e.title} 
									type='value' 
									value={e.value} 
								/>
							</View>
						) 
					}
				</View>
			} */}
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
	},

	gap: {
		height: vS(12)
	}
})
