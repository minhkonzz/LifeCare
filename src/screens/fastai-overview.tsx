import { useEffect, useRef } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { primaryHex, primaryRgb, darkHex, darkRgb } from '@utils/constants/colors'
import { useNavigation } from '@react-navigation/native'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useDeviceBottomBarHeight } from '@hooks/useDeviceBottomBarHeight'
import Button from '@components/shared/button/Button'

export default (): JSX.Element => {
	const navigation = useNavigation()
	const bottomBarHeight = useDeviceBottomBarHeight()
	const animatedValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: 1, 
			duration: 1010, 
			useNativeDriver: true
		}).start()
	}, [])

	return (
		<View style={[styles.container, { paddingBottom: vS(27) + bottomBarHeight }]}>
			<View style={styles.horizontalCentered}>
				<Animated.Image 
					style={[
						styles.fastAIInterface, 
						{
							opacity: animatedValue, 
							transform: [{ translateY: animatedValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [-30, 0]
							}) }]
						}
					]} 
					source={require('../assets/lottie/FastAIBotInterface.gif')} 
				/>
				<Animated.Text style={[
					styles.mainTitle, 
					{
						opacity: animatedValue, 
						transform: [{ translateX: animatedValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-100, 0]
						}) }]
					}
				]}>
					AI-based assistant for health care
				</Animated.Text>
			</View>
			<View style={styles.horizontalCentered}>
				<Animated.Text 
					style={[
						styles.smallTitle, 
						{
							opacity: animatedValue, 
							transform: [{ translateY: animatedValue.interpolate({
								inputRange: [0, 1], 
								outputRange: [30, 0]
							}) }]
						}
					]}>
					{`Lorem ipsum is simly dummy text of the\nprinting and typesetting industry`}
				</Animated.Text>
				<Button 
					title='Start' 
					size='large' 
					bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
					onPress={() => navigation.navigate('fastai-mainchat')} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: '#fff', 
		justifyContent: 'space-between', 
		alignItems: 'center', 
		paddingHorizontal: hS(22)
	},

	fastAIInterface: {
		width: hS(400),
		height: vS(412)
	},

	mainTitle: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(28),
		color: darkHex,
		letterSpacing: .2,
		marginTop: vS(-32),
		textAlign: 'center'
	},

	smallTitle: {
		textAlign: 'center',
		lineHeight: 21,
		fontFamily: 'Poppins-Medium',
		fontSize: hS(14),
		color: `rgba(${darkRgb.join(', ')}, .8)`,
		letterSpacing: .2,
		marginBottom: vS(40)
	},

	horizontalCentered: {
		alignItems: 'center'
	}
})
