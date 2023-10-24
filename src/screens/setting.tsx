import { useEffect, useRef } from 'react'
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
import settingLayoutData from '@assets/data/setting-layout.json'

const darkPrimary: any = {
	hex: Colors.darkPrimary.hex,
	rgb: `${Colors.darkPrimary.rgb.join(', ')}`
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export default (): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1, 
			duration: 1000, 
			useNativeDriver: true
		}).start()
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
							renderItem={({ item, index }) => <SettingRow title={item.title} type={item.type} value={item.value ?? false} />}
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
