import { useState } from 'react'
import { View, Text, StyleSheet, Pressable, StatusBar, Platform, TouchableOpacity } from 'react-native'
import Button from '@components/shared/button/Button'
import { horizontalScale, verticalScale } from '@utils/responsive'
import { Colors } from '@utils/constants/colors'
import BackIcon from '@assets/icons/goback.svg'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import SettingPart from '@components/shared/setting-part/SettingPart'
import BottomSheet from '@components/shared/bottom-sheet/BottomSheet'

import TimePicker from '@components/time-input'
import LinearGradient from 'react-native-linear-gradient'

const darkPrimary: string = Colors.darkPrimary.hex

export default (): JSX.Element => {
	const bottomBarHeight: number = useDeviceBottomBarHeight()
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const selectedDayIndexes = [0, 2, 4]

	const handleButtonPress = () => {
		setIsVisible(true)
	}

	const handleClose = () => {
		setIsVisible(false)
	}

	return (
		<View style={[styles.container, { paddingBottom: bottomBarHeight }]}>
			<View style={styles.header}>
				<BackIcon width={horizontalScale(9.2)} height={verticalScale(16)} />
				<Text style={styles.headerTitle}>Personal data</Text>
				<View />
			</View>
			<SettingPart title='Goal' value='Improve health' />
			<TouchableOpacity style={styles.button} onPress={handleButtonPress}>
				<Text style={styles.buttonText}>Show bottom sheet</Text>
			</TouchableOpacity>
			<BottomSheet {...{ isVisible, title: 'Repeat current weight', onClose: handleClose }}>
				<>
					<View style={styles.days}>
						{
							['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
								.map((e, i) => {
									const isSelected = selectedDayIndexes.includes(i)
									return (
										<Pressable
											style={[styles.day, { backgroundColor: `rgba(${Colors.darkPrimary.rgb.join(', ')}, .1)` }]}
											key={`${e}-${i}`}
											onPress={() => { }}>
											{
												isSelected &&
												<LinearGradient
													style={styles.day}
													colors={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]}
													start={{ x: .5, y: 0 }}
													end={{ x: .5, y: 1 }}>
													<Text style={[styles.dayText, { color: '#fff' }]}>{e}</Text>
												</LinearGradient> ||
												<Text style={[styles.dayText, { color: darkPrimary }]}>{e}</Text>
											}
										</Pressable>
									)
								})
						}
					</View>
					<TimePicker />
					<Button title='Save' size='large' bgColor={[`rgba(${Colors.primary.rgb.join(', ')}, .6)`, Colors.primary.hex]} />
				</>
			</BottomSheet>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
		paddingHorizontal: horizontalScale(24)
	},

	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: verticalScale(22)
	},

	headerTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: horizontalScale(18),
		color: darkPrimary
	},

	button: {},
	buttonText: {},
	bottomSheetContent: {},

	days: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	day: {
		width: horizontalScale(45),
		height: verticalScale(45),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 250
	},

	dayText: {
		fontFamily: 'Poppins-Regualar',
		fontSize: horizontalScale(11)
	}
})
