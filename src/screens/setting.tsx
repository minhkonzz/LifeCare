import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Animated
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import StackHeader from '@components/shared/stack-header'
import SettingRow from '@components/setting-row'
import Screen from '@components/shared/screen'

import settingLayoutData from '../assets/data/setting-layout.json'

const darkPrimary: any = {
	hex: Colors.darkPrimary.hex,
	rgb: `${Colors.darkPrimary.rgb.join(', ')}`
}

export default (): JSX.Element => {
	return (
		<Screen full paddingHorzContent>
			<StackHeader title='Setting' />
			<View>
			{
				['About me', 'General', 'Contact us'].map((e, i) => (
					<View key={i} style={[styles.settingSection, { marginTop: vS(i > 0 ? 24 : 8) }]}>
						<Text style={styles.settingSectionTitle}>{e}</Text>
						<FlatList
							style={{ flexGrow: 0 }}
							showsVerticalScrollIndicator={false}
							data={settingLayoutData[e]}
							keyExtractor={item => item.id}
							renderItem={({ item, index }) => <SettingRow title={item.title} type={item.type} value={item.value ?? false} />}
						/>
					</View>
				))
			}
			</View>
			<View style={styles.bottom}>
				<Text style={styles.versionText}>Version 1.0.0</Text>
				<TouchableOpacity style={styles.rewipeDataButton} activeOpacity={.7} onPress={() => { }}>
					<Text style={styles.rewipeDataButtonText}>Rewipe all data</Text>
				</TouchableOpacity>
			</View>
		</Screen>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: hS(24)
	},

	settingSectionTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(16),
		color: darkPrimary
	},

	versionText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(12),
		color: darkPrimary,
		letterSpacing: .2,
		marginBottom: vS(8)
	},

	bottom: {
		alignItems: 'center'
	},

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
