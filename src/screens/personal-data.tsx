import {
	View,
	Text,
	StyleSheet,
	Animated,
	Pressable
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import StackHeader from '@components/shared/stack-header'
import SettingRow from '@components/setting-row'
import PrimaryToggleValue from '@components/shared/primary-toggle-value'
import personalData from '@assets/data/personal-data.json'

export default (): JSX.Element => {
	return (
		<View style={styles.container}>
			<StackHeader title='Personal data' />
			<View style={{ width: '100%' }}>
				{
					personalData['personal-data-01'].map((e, i) => (
						<SettingRow key={`${e.id}-${i}`} title={e.title} type='value' value={e.value} />
					))
				}
			</View>
			<PrimaryToggleValue />
			{/* <View style={styles.measureSymbols}>
				<LinearGradient
					style={{ position: 'absolute', width: '50%', height: '100%', borderRadius: 100 }}
					colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .5, y: 1 }}
				/>
				<Pressable style={{
					height: '100%',
					width: '50%',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: hS(12), color: '#fff' }}>cm/kg</Text>
				</Pressable>
				<Pressable style={{
					width: '50%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<Text style={{ fontFamily: 'Poppins-Medium', fontSize: hS(12), color: Colors.darkPrimary.hex }}>ft/lb</Text>
				</Pressable>
			</View> */}
			<View style={{ width: '100%' }}>
				{
					personalData['personal-data-02'].map((e, i) => (
						<SettingRow key={`${e.id}-${i}`} title={e.title} type='value' value={e.value} />
					))
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

	// measureSymbols: {
	// 	width: hS(196),
	// 	height: vS(45),
	// 	flexDirection: 'row',
	// 	justifyContent: 'space-between',
	// 	alignItems: 'center',
	// 	borderRadius: 100,
	// 	backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .1)`,
	// 	marginTop: vS(22),
	// 	marginBottom: vS(14)
	// },
})
