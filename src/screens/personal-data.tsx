import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { useNavigation } from '@react-navigation/native'
import { PopupContext } from '@contexts/popup'
import GenderPopup from '@components/shared/popup/gender'
import AgePopup from '@components/shared/popup/age'
import CurrentWeightPopup from '@components/shared/popup/current-weight'
import HeightPopup from '@components/shared/popup/height'
import TargetWeightPopup from '@components/shared/popup/target-weight' 
import StackHeader from '@components/shared/stack-header'
import SettingRow from '@components/setting-row'
import personalData from '@assets/data/personal-data.json'

const settingRowCallbacks = {}
const settingRowValues = {}

const Main = () => {
	const { setPopup } = useContext<any>(PopupContext)
	const navigation = useNavigation<any>()

	const {
		gender, 
		age,
		currentHeight, 
		currentWeight, 
		goalWeight,
		goal
	} = useSelector((state: AppState) => state.user.metadata)

	if (Object.keys(settingRowCallbacks).length === 0) {
		settingRowCallbacks['gender'] = () => { setPopup(GenderPopup) }
		settingRowCallbacks['age'] = () => { setPopup(AgePopup) }
		settingRowCallbacks['current-height'] = () => { setPopup(HeightPopup) }
		settingRowCallbacks['current-weight'] = () => { setPopup(CurrentWeightPopup) } 
		settingRowCallbacks['target-weight'] = () => { setPopup(TargetWeightPopup) }
		settingRowCallbacks['goal'] = () => { navigation.navigate('goal') }
	}

	settingRowValues['gender'] = gender
	settingRowValues['age'] = age
	settingRowValues['current-height'] = `${currentHeight} cm`
	settingRowValues['current-weight'] = `${currentWeight} kg`
	settingRowValues['goal-weight'] = `${goalWeight} kg`
	settingRowValues['goal'] = goal.join('/')

	return (
		<>
			<View style={styles.wfull}>
			{
				personalData['personal-data-01'].map((e, i) =>
					<SettingRow 
						key={`${e.id}-${i}`} 
						title={e.title} 
						type='value' 
						onPress={settingRowCallbacks[e.key]} 
						additionalStyles={{ marginVertical: i > 0 ? vS(8) : 0 }}
						{...{ value: settingRowValues[e.key] ?? false }}
					/>
				)
			}
			</View>
			{/* <PrimaryToggleValue additionalStyles={styles.primaryToggle} {...{ options, onChangeOption }} /> */}
			<View style={styles.wfull}>
			{
				personalData['personal-data-02'].map((e, i) =>
					<SettingRow 
						key={`${e.id}-${i}`} 
						title={e.title} 
						type='value' 
						onPress={settingRowCallbacks[e.key]} 
						additionalStyles={{ marginVertical: i > 0 ? vS(8) : 0 }}
						{...{ value: settingRowValues[e.key] ?? false }}
					/>
				)
			}
			</View>
		</>
	)
}

export default (): JSX.Element => {
	return (
		<View style={styles.container}>
			<StackHeader title='Personal data' />
			<Main />
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

	wfull: { width: '100%' },

	primaryToggle: { marginBottom: vS(28) }
})
