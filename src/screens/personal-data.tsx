import { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { useNavigation } from '@react-navigation/native'
import { PopupContext } from '@contexts/popup'
import GenderPopup from '@components/shared/popup-content/gender'
import AgePopup from '@components/shared/popup-content/age'
import CurrentWeightPopup from '@components/shared/popup-content/current-weight'
import HeightPopup from '@components/shared/popup-content/height'
import TargetWeightPopup from '@components/shared/popup-content/target-weight' 
import StackHeader from '@components/shared/stack-header'
import SettingRow from '@components/setting-row'
// import PrimaryToggleValue from '@components/shared/primary-toggle-value'
import personalData from '@assets/data/personal-data.json'

const settingRowCallbacks = {}
const settingRowValues = {}
// const options: string[] = ['cm/kg', 'in/lb']

const Main = () => {
	// const [ genderPopupVisible, setGenderPopupVisible ] = useState<boolean>(false)
	// const [ agePopupVisible, setAgePopupVisible ] = useState<boolean>(false)
	// const [ currentWeightPopupVisible, setCurrentWeightPopupVisible ] = useState<boolean>(false)
	// const [ heightPopupVisible, setHeightPopupVisible ] = useState<boolean>(false)
	// const [ targetWeightPopupVisible, setTargetWeightPopupVisible ] = useState<boolean>(false)
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
			{/* { genderPopupVisible && <GenderPopup setVisible={setGenderPopupVisible} /> }
			{ agePopupVisible && <AgePopup setVisible={setAgePopupVisible} /> }
			{ currentWeightPopupVisible && <CurrentWeightPopup setVisible={setCurrentWeightPopupVisible} /> }
			{ heightPopupVisible && <HeightPopup setVisible={setHeightPopupVisible} /> }
			{ targetWeightPopupVisible && <TargetWeightPopup setVisible={setTargetWeightPopupVisible} /> } */}
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
