import { useState, useRef, useEffect } from 'react'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import StackHeader from '@components/shared/stack-header'
import Button from '@components/shared/button/Button'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import SettingRow from '@components/setting-row'
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Animated,
	Platform,
	StatusBar
} from 'react-native'

const { hex: darkHex } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { rgb: lightRgb } = Colors.lightPrimary

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default (): JSX.Element => {
	const [ goal, setGoal ] = useState<number>(2350)
	const bottomBarHeight = useDeviceBottomBarHeight()
	const initCupsize = useSelector((state: AppState) => state.water.initCupsize)
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1,
			duration: 920, 
			useNativeDriver: true
		}).start()
	}, [])

	return (
		<View style={{...styles.container, paddingBottom: vS(27) + bottomBarHeight}}>
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
							[
								initCupsize,
								initCupsize + 50,
								initCupsize + 100,
								initCupsize + 150,
								initCupsize + 300,
								-1
							].map((e, i) => (
								<AnimatedPressable key={i} style={{...styles.cupSize, marginLeft: i === 0 || i === 3 ? 0 : hS(9)}}>
									<Text style={styles.cupSizeText}>{`${e !== -1 ? e + ' ml' : 'Customize +'}`}</Text>
								</AnimatedPressable>
							))
						}
						</View>
					</View>
				</View>
			</View>
			<Button title='Save' size='large' bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} />
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
		color: darkHex
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
		backgroundColor: `rgba(${lightRgb.join(', ')}, .4)`
	},

	cupSizeText: {
		marginTop: vS(8),
		fontSize: hS(14),
		fontFamily: 'Poppins-Medium',
		color: darkHex

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

