import { memo, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { getDatesRange } from '@utils/datetimes'
import { handleFastingRecords } from '@utils/helpers'
import { BlurView } from '@react-native-community/blur'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import LinearGradient from 'react-native-linear-gradient'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Record = ({ 
	item, 
	index, 
	hideDetail, 
	animateValue 
}: { 
	item: any, 
	index: number, 
	hideDetail: boolean, 
	animateValue: Animated.Value 
}): JSX.Element => {

	if (!hideDetail) {
		const [ month, day ] = item.date.split(' ')
		return (
			<View key={index} style={{...styles.rec, marginLeft: (index > 0 ? hS(15) : 0) }}>
				<Text style={{...styles.recText, height: vS(22) }}>{item.totalHours > 0 ? `${item.totalHours}h` : ''}</Text>
				<LinearGradient
					style={styles.recProg}
					colors={[`rgba(${darkRgb.join(', ')}, .05)`, `rgba(${darkRgb.join(', ')}, .2)`]}
					start={{ x: .5, y: 0 }}
					end={{ x: .5, y: 1 }}>
					<AnimatedLinearGradient
						style={{
							...styles.recProgValue, 
							height: animateValue.interpolate({
								inputRange: [0, 1], 
								outputRange: ['0%', `${item.totalHours / 24 * 100}%`]
							}) 
						}}
						colors={[`rgba(${primaryRgb.join(', ')}, .2)`, primaryHex]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: 1 }} />
				</LinearGradient>
				<View style={{ alignItems: 'center', marginTop: vS(7) }}>
					<Text style={styles.recText}>{day}</Text>
					<Text style={{...styles.recText, marginTop: vS(-2) }}>{month}</Text>
				</View>
			</View>
		)
	}

	return (
		<View key={index} style={{...styles.rec, marginLeft: (index > 0 ? hS(15) : 0) }}>
			<LinearGradient
				style={styles.recProg}
				colors={[`rgba(${darkRgb.join(', ')}, .05)`, `rgba(${darkRgb.join(', ')}, .2)`]}
				start={{ x: .5, y: 0 }}
				end={{ x: .5, y: 1 }} />
		</View>
	)
}

export default withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }): JSX.Element => {
	const fastingRecords = useSelector((state: AppState) => state.user.metadata.fastingRecords)
	const standardFastingRecords = fastingRecords.reduce((acc: any, cur: any) => {
		const { startTimeStamp, endTimeStamp } = cur
		return {...acc, ...handleFastingRecords(startTimeStamp, endTimeStamp)}
	}, {})

	const chartData = getDatesRange(122).map(e => {
		const r = standardFastingRecords[e.value]
		if (r) return {
			date: e.value,
			totalHours: r.totalHours
		}
		return null
	})

	const noDataFound: boolean = chartData.every(e => !e)

	if (!isViewable) return <View style={styles.container} />

	return (
		<Animated.View style={{...styles.container, opacity: animateValue }}>
			<View style={styles.header}>
				<Animated.Text 
					style={{
						...styles.title, 
						opacity: animateValue, 
						transform: [{ translateX: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [-50, 0]
						}) }]
					}}>
					Fasting records
				</Animated.Text>
				<Animated.View style={{
					...styles.hrz, 
					marginTop: vS(8), 
					opacity: animateValue, 
					transform: [{ translateY: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-30, 0]
					}) }]
				}}>
					<View style={styles.hrz}>
						<LinearGradient
							style={styles.noteColor}
							colors={[`rgba(${primaryRgb.join(', ')}, .3)`, primaryHex]}
							start={{ x: .5, y: 0 }}
							end={{ x: .5, y: 1 }}
						/>
						<Text style={styles.noteTitle}>Completed</Text>
					</View>
					<View style={{...styles.hrz, marginLeft: hS(38) }}>
						<LinearGradient
							style={styles.noteColor}
							colors={[`rgba(${darkRgb.join(', ')}, .05)`, `rgba(${darkRgb.join(', ')}, .2)`]}
							start={{ x: .5, y: 0 }}
							end={{ x: .5, y: 1 }}
						/>
						<Text style={styles.noteTitle}>Not completed</Text>
					</View>
				</Animated.View>
			</View>
			<Animated.FlatList
				style={{...styles.records, opacity: animateValue }}
				horizontal
				showsHorizontalScrollIndicator={false}
				data={chartData}
				renderItem={({ item, index }) => <Record {...{ item, index, hideDetail: noDataFound, animateValue }} />}
			/>
			<AnimatedPressable style={{...styles.timelineRef, opacity: animateValue }}>
				<Text style={styles.timelineText}>Timeline</Text>
			</AnimatedPressable>
			{ noDataFound && 
			<View style={styles.blurOverlayWrapper}>
				<BlurView style={styles.blurOverlay} blurType='light' blurAmount={12} />
				<Text style={styles.noDataText}>No data found</Text>
			</View> }
		</Animated.View>
	)
})

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		width: hS(369),
		borderRadius: hS(32),
		elevation: 5,
		shadowColor: `rgba(${darkRgb.join(', ')}, .7)`,
		paddingHorizontal: hS(18),
		paddingTop: vS(18),
		paddingBottom: vS(8),
		marginTop: vS(27)
	},

	blurOverlayWrapper: {		
		position: 'absolute',
		top: 0,
		left: 0, 
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},

	blurOverlay: {
		position: 'absolute',
		width: '100%',
		height: '100%'
	},

	noDataText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(14),
		color: darkHex,
		letterSpacing: .2
	},

	header: {
		width: '100%'
	},

	title: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(15),
		color: darkHex
	},

	hrz: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	noteColor: {
		width: hS(10),
		height: vS(10),
		borderRadius: 25
	},

	noteTitle: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		color: darkHex,
		letterSpacing: .2,
		marginLeft: hS(8)
	},

	records: {
		width: '100%', 
		marginTop: vS(20),
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
		width: hS(54),
		height: vS(121),
		borderRadius: 200,
		justifyContent: 'flex-end'
	},

	recProgValue: {
		width: '100%',
		borderRadius: 200
	},

	timelineRef: {
		marginTop: vS(16)
	},

	timelineText: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(13),
		color: `rgba(${darkRgb.join(', ')}, .8)`,
		letterSpacing: .4
	}
})
