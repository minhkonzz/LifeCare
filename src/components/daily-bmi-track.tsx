import { ReactNode, Dispatch, SetStateAction, useEffect, useState, useRef, useContext } from 'react'
import { 
   View, 
   Text, 
	Pressable,
   StyleSheet, 
	Animated
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { PopupContext } from '@contexts/popup'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import bmiRangesData from '@assets/data/bmi-range-data.json'
import UpdateBMIPopup from '@components/shared/popup-content/bmi-update'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export default (): JSX.Element => {
   const [ bmiValue, setBMIValue ] = useState<number>(28.25)
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const titleAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const rangeAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const { setPopup } = useContext<{ popup: ReactNode, setPopup: Dispatch<SetStateAction<ReactNode>> }>(PopupContext)

	useEffect(() => {
		Animated.parallel([
			Animated.timing(animateValue, {
				toValue: 1, 
				duration: 720, 
				useNativeDriver: true
			}),
			Animated.timing(titleAnimateValue, {
				toValue: 1, 
				duration: 920, 
				useNativeDriver: true
			}),
			Animated.timing(rangeAnimateValue, {
				toValue: 1, 
				duration: 1010, 
				useNativeDriver: false
			})
		]).start()
	}, [])

   return (
		<Pressable onPress={() => setPopup(UpdateBMIPopup)}>
			<AnimatedLinearGradient
				style={[styles.container, { opacity: animateValue }]}
				colors={[`rgb(229, 244, 231)`, `rgba(229, 244, 231, .4)`]}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}>
				<Animated.Text style={[
					styles.title, 
					{
						transform: [{ translateX: titleAnimateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-100, 0]
						}) }]
					}
				]}>
					Lastest BMI
				</Animated.Text>
				<Animated.View style={{ opacity: rangeAnimateValue }}>
					<View style={styles.value}>
						<Text style={styles.valueNumber}>{bmiValue}</Text>
						<Text style={styles.valueSymbol}>kg/m2</Text>
					</View>
					<Text style={styles.status}>Overweight</Text>
				</Animated.View>
				<Animated.View style={[
					styles.rangeColors, 
					{ 
						height: rangeAnimateValue.interpolate({
							inputRange: [0, 1] ,
							outputRange: [0, vS(48)]
						})	
					}
				]}>
				{
					bmiRangesData.map((e, i) => {
						return (
							<LinearGradient
								key={`${e.id}-${i}`}
								style={{
									width: `${(e.max - e.min + (i > 2 ? -0.5 : i === 1 ? 1.8 : 1)) / 24 * 87}%`,
									height: (bmiValue <= e.max && bmiValue >= e.min ? vS(48) : vS(11)),
									borderRadius: 100
								}}
								colors={e.color}
								start={{ x: .5, y: 0 }}
								end={{ x: .5, y: 1 }}
							/>
						)
					})
				}
				</Animated.View>
			</AnimatedLinearGradient>
		</Pressable>
   )
}

const styles = StyleSheet.create({
   container: {
      width: hS(176),
		height: vS(161),
		justifyContent: 'space-between',
		borderTopLeftRadius: hS(28),
		borderBottomLeftRadius: hS(28),
		borderTopRightRadius: hS(48),
		borderBottomRightRadius: hS(48),
		paddingVertical: vS(14),
		paddingHorizontal: hS(11),
		elevation: 8,
		shadowColor: `rgba(235, 243, 255, .8)`
   },

   title: {
      fontFamily: 'Poppins-Medium',
		fontSize: hS(10),
		color: `rgba(${darkRgb.join(', ')}, .8)`,
		letterSpacing: .4
   },

   value: {
      flexDirection: 'row', 
      alignItems: 'center'
   },

   status: {
      fontFamily: 'Poppins-Medium',
		fontSize: hS(8),
		color: darkHex,
		letterSpacing: .4
   },

   valueNumber: {
      fontFamily: 'Poppins-SemiBold',
		fontSize: hS(22),
		color: darkHex,
		letterSpacing: .4
   }, 

   valueSymbol: {
      fontFamily: 'Poppins-Medium',
		fontSize: hS(8),
		color: `rgba(${darkRgb.join(', ')}, .6)`,
		letterSpacing: .4,
      marginLeft: hS(6),
		marginTop: vS(8)
   },

   rangeColors: {
		width: '90%',
      flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end'
   }
})