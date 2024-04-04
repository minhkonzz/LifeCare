import { useContext } from 'react'
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native'
import { PopupContext } from '@contexts/popup'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import { getBMI } from '@utils/fomular'
import { getBMIStatus } from '@utils/helpers'
import { AnimatedLinearGradient } from './shared/animated'
import LinearGradient from 'react-native-linear-gradient'
import bmiRangesData from '@assets/data/bmi-range-data.json'
import UpdateBMIPopup from '@components/shared/popup/bmi-update'
import AnimatedText from '@components/shared/animated-text'

export default ({ animateValue }: { animateValue: Animated.Value }): JSX.Element => {
	const { currentWeight, currentHeight } = useSelector((state: AppStore) => state.user.metadata)
	const bmiValue: number = getBMI(currentWeight, currentHeight / 100)
	const { setPopup } = useContext<any>(PopupContext)

   return (
		<Pressable onPress={() => setPopup(UpdateBMIPopup)}>
			<AnimatedLinearGradient
				style={{...styles.container, opacity: animateValue }}
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
						<AnimatedText value={bmiValue} style={styles.valueNumber} />
						<Text style={styles.valueSymbol}>kg/m2</Text>
					</View>
					<Text style={styles.status}>{getBMIStatus(bmiValue)}</Text>
				</Animated.View>
				<Animated.View style={{
					...styles.rangeColors, 
					opacity: animateValue,
					transform: [{ translateY: animateValue.interpolate({
						inputRange: [0, 1] ,
						outputRange: [30, 0]
					})	}]
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
		fontSize: hS(10),
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