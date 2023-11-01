import { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import StackHeader from '@components/shared/stack-header'
import SettingRow from '@components/setting-row'
import settingLayoutData from '@assets/data/setting-layout.json'
import RewipeDataWarnPopup from '@components/shared/popup-content/rewipe-data-warn'
import GenderPopup from '@components/shared/popup-content/radio-options'
import LanguagePopup from '@components/shared/popup-content/radio-options'

import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Animated
} from 'react-native'

const { hex: darkHex } = Colors.darkPrimary
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const settingRowCallbacks = {}

export default (): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const navigation = useNavigation()
	const [ rewipeDataPopupVisible, setRewipeDataPopupVisible ] = useState<boolean>(false)
	const [ genderPopupVisible, setGenderPopupVisible ] = useState<boolean>(false)
	const [ langPopupVisible, setLangPopupVisible ] = useState<boolean>(false)

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1, 
			duration: 920, 
			useNativeDriver: true
		}).start(({ finished }) => {
			settingRowCallbacks['personal-data'] = () => { navigation.navigate('personal-data') }
			settingRowCallbacks['meal-time'] = () => {}
			settingRowCallbacks['notification'] = () => {}
			settingRowCallbacks['reminder'] = () => { navigation.navigate('reminder') }
			settingRowCallbacks['widgets'] = () => {}
			settingRowCallbacks['language'] = () => { setLangPopupVisible(true) }
			settingRowCallbacks['dark-mode'] = () => {}
			settingRowCallbacks['sync-google-fit'] = () => {}
			settingRowCallbacks['privacy-policy'] = () => {}
			settingRowCallbacks['rate-us'] = () => {}
			settingRowCallbacks['feedback'] = () => { navigation.navigate('feedback') }
		})
	}, [])

	return (
		<View style={styles.container}>
			<StackHeader title='Setting' />
			<View>
			{
				['About me', 'General', 'Contact us'].map((e, i) => (
					<View key={i} style={{ marginTop: vS(i > 0 ? 24 : 0) }}>
						<Animated.Text 
							style={[
								styles.settingSectionTitle, 
								{
									opacity: animateValue,
									transform: [{ translateX: animateValue.interpolate({
										inputRange: [0, 1], 
										outputRange: [-150, 0]
									}) }]
								}
							]}>
							{e}
						</Animated.Text>
						<FlatList
							style={{ flexGrow: 0 }}
							showsVerticalScrollIndicator={false}
							data={settingLayoutData[e]}
							keyExtractor={item => item.id}
							renderItem={({ item, index }) => 
								<SettingRow 
									title={item.title} 
									type={item.type} 
									value={item.value ?? false} 
									onPress={settingRowCallbacks[index]} />
							}
						/>
					</View>
				))
			}
			</View>
			<View style={styles.bottom}>
				<Animated.Text 
					style={[
						styles.versionText, 
						{
							opacity: animateValue,
							transform: [{ translateX: animateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [-150, 0]
							}) }]
						}
					]}>
					Version 1.0.0
				</Animated.Text>
				<AnimatedTouchableOpacity 
					activeOpacity={.7}
					style={[
						styles.rewipeDataButton, 
						{
							opacity: animateValue,
							transform: [{ translateX: animateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [-100, 0]
							}) }]
						}
					]}>
					<Text style={styles.rewipeDataButtonText}>Rewipe all data</Text>
				</AnimatedTouchableOpacity>
			</View>
			{ rewipeDataPopupVisible && <RewipeDataWarnPopup setVisible={setRewipeDataPopupVisible} /> }
			{ genderPopupVisible && <GenderPopup setVisible={setGenderPopupVisible} options={['Male', 'Female']} /> }
			{ langPopupVisible && <LanguagePopup setVisible={setLangPopupVisible} options={['English', 'Vietnamese', 'Germany']} /> }
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: hS(24),
		paddingBottom: vS(27),
		backgroundColor: '#fff'
	},

	settingSectionTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(16),
		color: darkHex
	},

	versionText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2,
		marginBottom: vS(8)
	},

	bottom: { alignItems: 'center' },

	rewipeDataButton: {
		width: hS(365),
		height: vS(64),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: hS(24),
		backgroundColor: `rgba(234, 84, 85, .24)`
	},

	rewipeDataButtonText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(14),
		color: '#F45555',
		letterSpacing: .2
	}
})
