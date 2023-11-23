import { useEffect, useRef, useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { PopupContext } from '@contexts/popup'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { getBMI } from '@utils/fomular'
import { getBMIStatus } from '@utils/helpers'
import bmiRangesData from '@assets/data/bmi-range-data.json'
import UpdateBMIPopup from '@components/shared/popup-content/bmi-update'

import { 
   View, 
   Text, 
	Pressable,
   StyleSheet, 
	Animated
} from 'react-native'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export default (): JSX.Element => {
	const { currentWeight, currentHeight } = useSelector((state: AppState) => state.user.metadata)
	const bmiValue: number = getBMI(currentWeight, currentHeight / 100)
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const { setPopup } = useContext<any>(PopupContext)

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1, 
			duration: 840, 
			useNativeDriver: false
		}).start()
	}, [])

   return (
		<Pressable onPress={() => setPopup(UpdateBMIPopup)}>
			<AnimatedLinearGradient
				style={[styles.container, { opacity: animateValue }]}
				colors={[`rgb(229, 244, 231)`, `rgba(229, 244, 231, .4)`]}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }}>
				<Animated.Text style={{
					...styles.title, 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-50, 0]
					}) }]
				}}>
					Lastest BMI
				</Animated.Text>
				<Animated.View style={{ opacity: animateValue }}>
					<View style={styles.value}>
						<Text style={styles.valueNumber}>{bmiValue}</Text>
						<Text style={styles.valueSymbol}>kg/m2</Text>
					</View>
					<Text style={styles.status}>{getBMIStatus(bmiValue)}</Text>
				</Animated.View>
				<Animated.View style={{
					...styles.rangeColors, 
					height: animateValue.interpolate({
						inputRange: [0, 1] ,
						outputRange: [0, vS(48)]
					})	
				}}>
				{
					bmiRangesData.map((e, i) => {
						return (
							<LinearGradient
								key={`${e.id}-${i}`}
								style={{
									width: `${(e.max - e.min + (i > 2 ? -0.5 : i === 1 ? 1.8 : 1)) / 24 * 87}%`,
									height: (bmiValue <= e.max && bmiValue >= e.min ? vS(48) : vS(11)),
									borderRadius: hS(10)
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