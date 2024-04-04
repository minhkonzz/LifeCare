import { useState, useEffect } from 'react'
import { View, StyleSheet, Animated, Platform, StatusBar, Easing } from 'react-native'
import { darkHex, darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useNavigation } from '@react-navigation/native'
import Button from '@components/shared/button/Button'
import useAnimValue from '@hooks/useAnimValue'

const onboardingData: Array<any> = [
	{
		id: 'ob1', 
		title: 'Natural and healthy', 
		description: 'Intermittent fasting is a natural way to\nstay fit and healthy', 
		storyset: require('../assets/images/storyset/onboarding1.gif')
	}, 
	{
		id: 'ob2', 
		title: 'Effective and safe', 
		description: 'We’ll help you get through this journey\nas safely and effectively as possible', 
		storyset: require('../assets/images/storyset/onboarding2.gif')
	},
	{
		id: 'ob3', 
		title: 'Fasting for Beginners', 
		description: 'Fasting plans for beginners are the best\nway to lose weight with minimal effort', 
		storyset: require('../assets/images/storyset/onboarding3.gif')
	}
]

export default (): JSX.Element => {
	const navigation = useNavigation<any>()
	const [ index, setIndex ] = useState<number>(0)
	const titleEffectValue = useAnimValue(0)
	const descriptionEffectValue = useAnimValue(0)

	useEffect(() => {
		Animated.parallel([
			Animated.timing(titleEffectValue, {
				toValue: 1, 
				duration: 720,
				useNativeDriver: true
			}), 
			Animated.timing(descriptionEffectValue, {
				toValue: 1, 
				duration: 320, 
				delay: 400,
				easing: Easing.linear,
				useNativeDriver: true
			})
		]).start()	
	}, [index])

	const changeOnboarding = (index: number) => {
		if (index === onboardingData.length - 1) {
			navigation.navigate('auth')
			return
		}
		Animated.parallel([
			Animated.timing(titleEffectValue, {
				toValue: 0, 
				duration: 720, 
				useNativeDriver: true
			}), 
			Animated.timing(descriptionEffectValue, {
				toValue: 0, 
				delay: 100,
				duration: 320, 
				easing: Easing.linear,
				useNativeDriver: true
			})
		]).start(() => { setIndex(index) })
	}

	return (
		<View style={styles.container}>
			<Animated.Image 
				style={{...styles.storySet, transform: [{ scale: descriptionEffectValue }]}} 
				source={onboardingData[index].storyset} 
			/>
			<View style={styles.centerChildHorizontal}>
				<Animated.Text 
					style={{
						...styles.mainTitle, 
						opacity: titleEffectValue, 
						transform: [{ translateX: titleEffectValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [300, 0]
						}) }] 
					}}>
					{onboardingData[index].title}
				</Animated.Text>
				<Animated.Text style={{...styles.description, opacity: descriptionEffectValue }}>
					{ onboardingData[index].description }
				</Animated.Text>
			</View>
			<Button 
				title='Next' 
				size='large' 
				bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]} 
				onPress={() => changeOnboarding(index + 1)} 
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'space-between', 
		alignItems: 'center', 
		backgroundColor: '#fff', 
		paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
		paddingBottom: vS(27)
	},
	
	centerChildHorizontal: {
		alignItems: 'center'
	},

	storySet: {
		width: hS(350),
		height: vS(350),
		marginTop: vS(22)
	},

	mainTitle: {
		fontSize: hS(21),
		fontFamily: 'Poppins-SemiBold',
		color: darkHex
	},

	description: {
		marginTop: vS(28),
		fontSize: hS(14),
		textAlign: 'center',
		lineHeight: hS(26),
		fontFamily: 'Poppins-Medium',
		color: `rgba(${darkRgb.join(', ')}, .5)`
	}
})
