import { useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Image,
	Animated,
	Platform,
	StatusBar
} from 'react-native'

import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import StackHeader from '@components/shared/stack-header'
import Button from '@components/shared/button/Button'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import SettingRow from '@components/setting-row'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	const [ goal, setGoal ] = useState<number>(2350)
	const bottomBarHeight = useDeviceBottomBarHeight()
	return (
		<View style={[styles.container, { paddingBottom: vS(27) + bottomBarHeight }]}>
			<View style={styles.main}>
				<StackHeader title='Reminders' />
				<View style={styles.main}>
					<SettingRow title='Goal' type='value' value={`${goal}ml`} />
					<SettingRow title='Remind' type='toggleValue' value={['ON', 'OFF']}/>
					<SettingRow title='Goal' type='value' value='4 hrs' />
					<SettingRow title='Remind' type='toggleValue' value={['OZ', 'ML']}/>
					<View style={styles.cupSizes}>
						<Text style={styles.settingRowTitle}>Size</Text>
						<View style={styles.cupSizeList}>
						{
							[100, 150, 200, 250, 500, -1].map((e, i) => (
								<View key={i} style={[styles.cupSize, { marginLeft: i === 0 || i === 3 ? 0 : hS(9) }]}>
									{/* {e !== -1 && <Image style={styles.cupSizeIcon} source={require('../assets/images/glass-of-water.png')} />} */}
									<Text style={styles.cupSizeText}>{`${e !== -1 ? e + ' ml' : 'Customize +'}`}</Text>
								</View>
							))
						}
						</View>
					</View>
				</View>
			</View>
			<Button title='Save' size='large' bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'space-between',
		alignItems: 'center', 
		paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0, 
		paddingHorizontal: hS(22)
	},

	cupSizes: {
		paddingTop: vS(16)
	},

	settingRowTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(16),
		color: darkPrimary
	},

	cupSizeList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: vS(10)
	},

	cupSize: {
		justifyContent: 'center',
		alignItems: 'center',
		width: hS(115),
		height: vS(115),
		borderRadius: hS(14),
		borderColor: Colors.strongBlue.hex,
		marginBottom: vS(9),
		backgroundColor: `rgba(${Colors.lightPrimary.rgb.join(', ')}, .4)`
	},

	cupSizeText: {
		marginTop: vS(8),
		fontSize: hS(14),
		fontFamily: 'Poppins-Medium',
		color: darkPrimary

	},

	cupSizeIcon: {
		width: hS(45),
		height: vS(45)
	},

	main: {
		width: '100%'
	},

	customValueText: {
		color: 'gray',
		fontFamily: 'Poppins-Medium',
		fontSize: hS(16)
	}
})

