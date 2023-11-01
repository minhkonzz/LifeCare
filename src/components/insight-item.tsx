import { Text, StyleSheet, Pressable, Image, Animated } from 'react-native'
import { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import LinearGradient from 'react-native-linear-gradient'

const { rgb: darkRgb } = Colors.darkPrimary

type InsightItemProps = {
	item: any,
	index: number
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default ({ item, index }: InsightItemProps): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const navigation = useNavigation()

	useEffect(() => {
      Animated.timing(animateValue, {
         toValue: 1,
         duration: 920,
         useNativeDriver: false
      }).start()
   }, [])

	return (
		<AnimatedPressable 
			style={{
				...styles.container, 
				opacity: animateValue,
				marginLeft: animateValue.interpolate({
					inputRange: [0, 1],
					outputRange: [300, (index > 0 ? hS(11) : hS(24))]
				}) 
			}}
			onPress={() => navigation.navigate('insight-reading', item)}
		>
			<Image style={styles.background} source={item.banner} />
			<LinearGradient
				style={styles.titleWrapper}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: .8 }}
				colors={[`rgba(0, 0, 0, .002)`, `rgba(${darkRgb.join(', ')}, .8)`]}>
				<Text style={styles.title}>{item.title}</Text>
			</LinearGradient>
		</AnimatedPressable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: hS(280),
		height: vS(163),
		elevation: 12,
		shadowColor: `rgba(${darkRgb.join(', ')}, .5)`
	},

	background: {
		width: '100%',
		height: '100%',
		borderRadius: hS(32)
	},

	titleWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: vS(76),
		paddingVertical: vS(11),
		paddingHorizontal: hS(14),
		borderBottomLeftRadius: hS(32),
		borderBottomRightRadius: hS(32)
	},

	title: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(12),
		color: '#fff',
		lineHeight: vS(20)
	}
})
