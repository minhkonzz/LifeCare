import { useContext, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateNotififcation, updateSyncGoogleFit, updateDarkMode } from '../store/setting'
import { PopupContext } from '@contexts/popup'
import StackHeader from '@components/shared/stack-header'
import SettingRow from '@components/setting-row'
import settingLayoutData from '@assets/data/setting-layout.json'
import RewipeDataWarnPopup from '@components/shared/popup-content/rewipe-data-warn'
import LanguagePopup from '@components/shared/popup-content/gender'

const { hex: darkHex } = Colors.darkPrimary
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const settingRowCallbacks = {}
const settingRowValues = {}

export default (): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const { setPopup } = useContext<any>(PopupContext)

	const { 
		notification,  
		darkmode,
		syncGoogleFit,
		lang
	} = useSelector((state: AppState) => state.setting)
	
	const dispatch = useDispatch()
	const navigation = useNavigation<any>()

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1, 
			duration: 840, 
			useNativeDriver: true
		}).start()
	}, [])

	if (Object.keys(settingRowCallbacks).length === 0) {
		settingRowCallbacks['personal-data'] = () => { navigation.navigate('personal-data') }
		settingRowCallbacks['meal-time'] = () => {}
		settingRowCallbacks['notification'] = () => { dispatch(updateNotififcation()) }
		settingRowCallbacks['reminder'] = () => { navigation.navigate('reminder') }
		settingRowCallbacks['widgets'] = () => {}
		settingRowCallbacks['language'] = () => { setPopup(LanguagePopup) }
		settingRowCallbacks['dark-mode'] = () => { dispatch(updateDarkMode()) }
		settingRowCallbacks['sync-google-fit'] = () => { dispatch(updateSyncGoogleFit()) }
		settingRowCallbacks['privacy-policy'] = () => {}
		settingRowCallbacks['rate-us'] = () => {}
		settingRowCallbacks['feedback'] = () => { navigation.navigate('feedback') }
	}

	settingRowValues['notification'] = notification
	settingRowValues['dark-mode'] = darkmode
	settingRowValues['sync-google-fit'] = syncGoogleFit
	settingRowValues['language'] = lang

	return (
		<View style={styles.container}>
			<StackHeader title='Setting' />
			{
				['About me', 'General', 'Contact us'].map((e, i) => (
					<View key={i} style={{ marginTop: vS(i > 0 ? 24 : 0) }}>
						<Animated.Text 
							style={{
								...styles.settingSectionTitle, 
								opacity: animateValue,
								transform: [{ translateX: animateValue.interpolate({
									inputRange: [0, 1], 
									outputRange: [-150, 0]
								}) }]
							}}>
							{e}
						</Animated.Text>
						<FlatList
							style={{ flexGrow: 0 }}
							showsVerticalScrollIndicator={false}
							data={settingLayoutData[e]}
							keyExtractor={item => item.id}
							renderItem={({ item }) => 
								<SettingRow 
									title={item.title} 
									type={item.type} 
									onPress={settingRowCallbacks[item.cbkey]} 
									{...{ value: settingRowValues[item.cbkey] ?? false }} />
							}
						/>
					</View>
				))
			}
			<View style={styles.bottom}>
				<Animated.Text 
					style={{
						...styles.versionText, 
						opacity: animateValue,
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-150, 0]
						}) }]
					}}>
					Version 1.0.0
				</Animated.Text>
				<AnimatedTouchableOpacity 
					onPress={() => setPopup(RewipeDataWarnPopup)}
					activeOpacity={.7}
					style={{
						...styles.rewipeDataButton, 
						opacity: animateValue,
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-50, 0]
						}) }]
					}}>
					<Text style={styles.rewipeDataButtonText}>Rewipe all data</Text>
				</AnimatedTouchableOpacity>
			</View>
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
