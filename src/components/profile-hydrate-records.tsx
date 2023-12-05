import { memo, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity, FlatList, Pressable } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { BluePlusIcon } from '@assets/icons'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { getDatesRange } from '@utils/datetimes'
import LinearGradient from 'react-native-linear-gradient'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

const Record = ({ item, index }: { item: any, index: number }) => {
	return (
		<Pressable style={{ marginLeft: index > 0 ? hS(18) : 0, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={styles.recText}>Nov</Text>
			<View style={styles.recProg}>
				<AnimatedLinearGradient
					style={{
						...styles.recProgValue, 
						height: `${item.value / item.goal * 100}%`
					}}
					colors={['rgba(120, 193, 243, .36)', '#78C1F3']}
					start={{ x: .5, y: 0 }}
					end={{ x: .5, y: 1 }} 
				/>
			</View>
			<Text style={styles.recText}>29</Text>
		</Pressable>
	)
}

export default memo(({ isViewable }: { isViewable: boolean }): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(isViewable && 0 || 1)).current
	const waterRecords = useSelector((state: AppState) => state.user.metadata.waterRecords)
	const standardWaterRecords = waterRecords.reduce((acc: any, cur: any) => {
		const { id, date, value, goal } = cur
		acc[date] = { id, value, goal }
		return acc
	}, {})

	const chartData = getDatesRange(122).map(e => {
		const date = e.value
		const { value, goal, id } = standardWaterRecords[date]
		return { date, value, goal, id }
	})

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: isViewable && 1 || 0,
			duration: 840,
			useNativeDriver: true
		}).start()
	}, [isViewable])

	return (
		isViewable && 
		<AnimatedLinearGradient
			style={{...styles.container, opacity: animateValue }}
			colors={['rgba(154, 197, 244, .24)', 'rgba(154, 197, 244, .7)']}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}>
			<View style={styles.header}>
				<Animated.View style={{ 
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1],
						outputRange: [-50, 0]
					}) }]
				}}>
					<Text style={styles.headerMainText}>Keep hydrate records</Text>
					<View style={styles.headerNotes}>
						<View style={styles.headerNotePart}>
							<LinearGradient
								style={styles.headerNoteCircle}
								colors={[`rgba(${[120, 193, 243].join(', ')}, .6)`, '#78C1F3']}
								start={{ x: .5, y: 0 }}
								end={{ x: .5, y: 1 }} />
							<Text style={styles.headerNoteText}>Completed</Text>
						</View>
						<View style={{...styles.headerNotePart, marginLeft: hS(38) }}>
							<View style={{...styles.headerNoteCircle, backgroundColor: '#fafafa' }} />
							<Text style={styles.headerNoteText}>Goal</Text>
						</View>
					</View>
				</Animated.View>
				<AnimatedTouchableOpacity 
					style={{...styles.hydrateRecsUpdateButton, transform: [{ scale: animateValue }] }} 
					activeOpacity={.8}>
					<BluePlusIcon width={hS(14)} height={vS(15.3)} />
				</AnimatedTouchableOpacity>
			</View>
			<FlatList 
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.id}
				data={chartData} 
				renderItem={({ item, index }) => <Record {...{ item, index }} />} 
			/>
			<Animated.Text style={{...styles.lastUpdatedText, opacity: animateValue }}>Last updated 3 minutes</Animated.Text>
		</AnimatedLinearGradient> || <View style={styles.container} />
	)
})

const styles = StyleSheet.create({
	container: {
		marginTop: vS(24),
		width: hS(370),
		height: vS(400),
		justifyContent: 'space-between',
		paddingVertical: vS(16),
		paddingHorizontal: hS(18),
		borderRadius: hS(24)
	},

	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	headerMainText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(15),
		color: darkHex,
		letterSpacing: .2
	},

	headerNotes: {
		marginTop: vS(6),
		flexDirection: 'row',
		alignItems: 'center'
	},

	headerNotePart: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	headerNoteCircle: {
		width: hS(10),
		height: vS(10),
		borderRadius: 200
	},

	headerNoteText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: `rgba(${darkRgb.join(', ')}, .6)`,
		letterSpacing: .2,
		marginLeft: hS(8)
	},

	hydrateRecsUpdateButton: {
		justifyContent: 'center',
		alignItems: 'center',
		width: hS(36),
		height: vS(36),
		borderRadius: 200,
		backgroundColor: '#fff'
	},

	records: {
		width: '100%'
	},

	lastUpdatedText: {
		fontFamily: 'Poppins-Regular', 
		fontSize: hS(11), 
		color: darkHex,
		letterSpacing: .2,
		alignSelf: 'center'
	},

	rec: {
		alignItems: 'center'
	},

	recText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(11),
		color: darkHex,
		letterSpacing: .4
	},

	recProg: {
		width: hS(20), 
		height: vS(180), 
		borderRadius: 100, 
		backgroundColor: `rgba(${darkRgb.join(', ')}, .08)`,
		marginVertical: vS(10), 
		justifyContent: 'flex-end'
	},

	recProgValue: {
		width: '100%',
		borderRadius: 200
	}
})
