import { useEffect } from "react";
import { View, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { primaryHex, primaryRgb, darkRgb } from "@utils/constants/colors";
import { horizontalScale as hS, verticalScale as vS } from "@utils/responsive";
import Button from "@components/shared/button/Button";
import useAnimValue from "@hooks/useAnimValue";
import styles from "./styles";

export default (): JSX.Element => {
	const animateValue = useAnimValue(0);

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1,
			duration: 700,
			useNativeDriver: true
		}).start();
	}, []);

	const navigation = useNavigation<any>();
	return (
		<View style={styles.container}>
			<Animated.Image 
				style={{...styles.storyset, opacity: animateValue}} 
				source={require('../assets/images/storyset/welcome.gif')} 
			/>
			<View style={styles.texts}>
				<Animated.Text style={{
					...styles.title,
					opacity: animateValue,
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1],
						outputRange: [-50, 0]
					}) }]
				}}>
					Fastiny
				</Animated.Text>
				<Animated.Text style={{
					...styles.title, 
					fontSize: hS(15), 
					color: `rgba(${darkRgb.join(', ')}, .7)`, 
					fontFamily: 'Poppins-Regular',
					marginTop: vS(16),
					lineHeight: vS(28),
					opacity: animateValue,
					transform: [{ translateY: animateValue.interpolate({
						inputRange: [0, 1],
						outputRange: [-50, 0]
					}) }]
				}}>
					Intermittent fasting for people staying in shape
				</Animated.Text>
			</View>
			<Button
				title='Get started'
				size='large'
				bgColor={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
				onPress={() => navigation.navigate('onboarding')}
			/>
		</View>
	)
}

