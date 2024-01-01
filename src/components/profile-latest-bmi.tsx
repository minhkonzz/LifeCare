import { useRef, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { PopupContext } from '@contexts/popup'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { getBMI } from '@utils/fomular'
import { getBMIStatus } from '@utils/helpers'
import { EditIcon, PolygonIcon } from '@assets/icons'
import { AnimatedLinearGradient } from './shared/animated'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import LinearGradient from 'react-native-linear-gradient'
import UpdateBMIPopup from '@components/shared/popup/bmi-update'
import bmiRangesData from '@assets/data/bmi-range-data.json'

export default withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }): JSX.Element => {
	const { setPopup } = useContext<any>(PopupContext)
	const { currentWeight, currentHeight } = useSelector((state: AppState) => state.user.metadata)
	const bmiValue: number = getBMI(currentWeight, currentHeight / 100)
	const bmiStatus: string = getBMIStatus(bmiValue)
	const cursorAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current

	return (
		isViewable && 
		<AnimatedLinearGradient
			style={{...styles.container, opacity: animateValue }}
			colors={[`rgba(${[229, 244, 231].join(', ')}, .6)`, '#E5F4E7']}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}>
			<Animated.View style={{ 
				opacity: animateValue,
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [-50, 0]
				}) }]
			}}>
				<View style={styles.header}>
					<Text style={styles.title}>{`Latest BMI (kg/m2)`}</Text>
					<TouchableOpacity
						style={styles.updateButton}
						activeOpacity={.7}
						onPress={() => setPopup(UpdateBMIPopup)}>
						<EditIcon width={hS(16)} height={vS(16)} />
					</TouchableOpacity>
				</View>
				<View style={styles.bmiValue}>
					<Text style={styles.bmiValueNumber}>{bmiValue}</Text>
					<Text style={styles.bmiValueDesc}>{bmiStatus}</Text>
				</View>
			</Animated.View>
			<View>
				<Animated.View style={{
					marginLeft: cursorAnimateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: ['0%', `${(bmiValue - 16) / 24 * 100}%`]
					}) 
				}}>
					<PolygonIcon width={hS(14)} height={vS(14)} />
				</Animated.View>
				<Animated.View style={{
					...styles.rangeColors, 
					height: cursorAnimateValue.interpolate({
						inputRange: [0, 1] ,
						outputRange: [0, vS(20)]
					})	
				}}>
				{
					bmiRangesData.map((e, i) => 
						<View key={i} style={{ width: `${(e.max - e.min + (i > 2 ? -0.5 : i === 1 ? 1.8 : 1)) / 24 * 87}%`, height: vS(32) }}>
							<LinearGradient
								key={`${e.id}-${i}`}
								style={{
									width: '100%',
									height: vS(13),
									borderRadius: 100
								}}
								colors={e.color}
								start={{ x: .5, y: 0 }}
								end={{ x: .5, y: 1 }}
							/>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: vS(4) }}>
								<Text style={{...styles.bmiPoint, marginLeft: i !== 0 ? hS(-7) : 0 }}>{e.min}</Text>
								{ i === bmiRangesData.length - 1 && <Text style={styles.bmiPoint}>{e.max}</Text> }
							</View>
						</View>
					)
				}
				</Animated.View>
			</View>
		</AnimatedLinearGradient>|| <View style={styles.container} />
	)
})

const styles = StyleSheet.create({
	container: {
		marginTop: vS(24),
		width: hS(370),
		height: vS(185),
		borderRadius: hS(24),
		paddingHorizontal: hS(18),
		paddingVertical: vS(16)
	},

	header: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	title: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(15),
		letterSpacing: .2,
		color: darkHex
	},

	bmiValue: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: vS(6)
	},

	bmiValueNumber: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(28),
		color: darkHex,
		letterSpacing: .2
	},

	bmiValueDesc: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2,
		marginLeft: hS(14),
		marginTop: vS(6)
	},

	rangeColors: {
		width: '100%',
      flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end', 
		marginTop: vS(18)
   }, 

	updateButton: {
		width: hS(36), 
		height: vS(36),
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center', 
		backgroundColor: `rgba(${darkRgb.join(', ')}, .16)`
	},

	bmiPoint: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(10),
		color: darkHex,
		letterSpacing: .2
	}
})
