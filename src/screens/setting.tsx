import { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { AppStore } from '../store'
import { darkHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { updateNotififcation, updateDarkMode } from '@store/setting'
import { PopupContext } from '@contexts/popup'
import StackHeader from '@components/shared/stack-header'
import SettingRow from '@components/setting-row'
import settingLayoutData from '@assets/data/setting-layout.json'
import RewipeDataWarnPopup from '@components/shared/popup/rewipe-data-warn'
import LanguagePopup from '@components/shared/popup/languages'

const settingRowCallbacks = {}
const settingRowValues = {}

export default (): JSX.Element => {
	const { setPopup } = useContext<any>(PopupContext)

	const { 
		notification,  
		darkmode,
		// syncGoogleFit,
		lang
	} = useSelector((state: AppStore) => state.setting)
	
	const dispatch = useDispatch()
	const navigation = useNavigation<any>()

	if (Object.keys(settingRowCallbacks).length === 0) {
		settingRowCallbacks['personal-data'] = () => { navigation.navigate('personal-data') }
		settingRowCallbacks['notification'] = () => { dispatch(updateNotififcation()) }
		settingRowCallbacks['reminder'] = () => { navigation.navigate('reminder') }
		settingRowCallbacks['widgets'] = () => {}
		settingRowCallbacks['language'] = () => { setPopup(LanguagePopup) }
		settingRowCallbacks['dark-mode'] = () => { dispatch(updateDarkMode()) }
		// settingRowCallbacks['sync-google-fit'] = () => { dispatch(updateSyncGoogleFit()) }
		settingRowCallbacks['feedback'] = () => { navigation.navigate('feedback') }
	}

	settingRowValues['notification'] = notification
	settingRowValues['dark-mode'] = darkmode
	// settingRowValues['sync-google-fit'] = syncGoogleFit
	settingRowValues['language'] = lang

	return (
		<View style={styles.container}>
			<StackHeader title='Setting' />
			{
				['About me', 'General', 'Contact us'].map((e, i) => (
					<View key={i} style={{ marginTop: vS(i > 0 ? 24 : 0) }}>
						<Text style={styles.settingSectionTitle}>{e}</Text>
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
				<Text style={styles.versionText}>Version 1.0.0</Text>
				<TouchableOpacity 
					onPress={() => setPopup(RewipeDataWarnPopup)}
					activeOpacity={.7}
					style={styles.rewipeDataButton}>
					<Text style={styles.rewipeDataButtonText}>Rewipe all data</Text>
				</TouchableOpacity>
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
