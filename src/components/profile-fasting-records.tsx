import { memo, useRef, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text, Animated, Pressable } from 'react-native'
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
const { hex: lightHex, rgb: lightRgb } = Colors.lightPrimary

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

const Record = ({ item, index, hideDetail }: { item: any, index: number, hideDetail?: boolean }) => {
	if (!hideDetail) {
		const startTime = item.startTime
		const [ s1, s2 ] = startTime.split(' ')
		const [ hours, mins ] = s1.split(':').map(Number)
		const hoursPassed = hours + (s2 === 'PM' ? 12 : hours === 12 ? -12 : 0) + (mins > 50 ? 1 : 0)

		return (
			<Pressable style={{ marginLeft: index > 0 ? hS(18) : 0, alignItems: 'center' }}>
				{ !hideDetail && <Text style={styles.recText}>Nov</Text> }
				<View style={styles.recProg}>
					<AnimatedLinearGradient
						style={{
							...styles.recProgValue, 
							height: `${item.totalHours / 24 * 100}%`,
							top: `${Math.floor(hoursPassed / 24 * 100)}%`
						}}
						colors={[`rgba(${primaryRgb.join(', ')}, .36)`, primaryHex]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: 1 }} 
					/>
				</View>
				{ !hideDetail && <Text style={styles.recText}>29</Text> }
			</Pressable>
		)
	}

	return <View style={{...styles.recProg, marginLeft: index > 0 ? hS(18) : 0}} />
}

export default withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }): JSX.Element => {
	const fastingRecords = useSelector((state: AppState) => state.user.metadata.fastingRecords)
	const standardFastingRecords = fastingRecords.reduce((acc: any, cur: any) => {
		const { startTimeStamp, endTimeStamp } = cur
		return {...acc, ...handleFastingRecords(startTimeStamp, endTimeStamp) }
	}, {})

	const chartData = getDatesRange(122).map(e => {
		const r = standardFastingRecords[e.value]
		if (r) {
			const { startTime, endTime, totalHours } = r
			return {
				date: e.value,
				startTime,
				endTime,
				totalHours
			}
		}
		return null
	})

	const noDataFound: boolean = chartData.every(e => !e)

	if (!isViewable) return <View style={styles.container} />

	return (
		<AnimatedLinearGradient
			style={{...styles.container, opacity: animateValue }}
			colors={[`rgba(${lightRgb.join(', ')}, .6)`, lightHex]}
			start={{ x: .5, y: 0 }}
			end={{ x: .5, y: 1 }}>
			<Animated.View style={{ 
				...styles.header,
				opacity: animateValue,
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [-50, 0]
				}) }]
			}}>
				<Text style={styles.headerMainText}>Recent Fasting</Text>
				<View style={styles.headerNotes}>
					<View style={styles.headerNotePart}>
						<LinearGradient
							style={styles.headerNoteCircle}
							colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
							start={{ x: .5, y: 0 }}
							end={{ x: .5, y: 1 }} />
						<Text style={styles.headerNoteText}>Fasting</Text>
					</View>
					<View style={{...styles.headerNotePart, marginLeft: hS(38) }}>
						<View style={{...styles.headerNoteCircle, backgroundColor: `rgba(${darkRgb.join(', ')}, .28)` }} />
						<Text style={styles.headerNoteText}>Eating</Text>
					</View>
				</View>
			</Animated.View>
			<View style={styles.main}>
				<View style={styles.dayHours}>
				{
					['00:00 AM', '06:00 AM', '12:00 PM', '06:00 PM', '00:00 AM']
					.map((e, i) => <Text key={i} style={{...styles.dayHour, marginTop: i > 0 ? vS(24) : 0}}>{e}</Text>)
				}
				</View>
				<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.records}>
					{ chartData.map((e, i) => <Record key={i} {...{ item: e, index: i, hideDetail: noDataFound }}/>) }
				</ScrollView>
			</View>
			<Animated.Text style={{...styles.lastUpdatedText, opacity: animateValue }}>Last updated 3 minutes</Animated.Text>
			{ noDataFound && 
			<View style={styles.blurOverlayWrapper}>
				<BlurView style={styles.blurOverlay} blurType='light' blurAmount={5} />
				<Text style={styles.noDataText}>No data found</Text>
			</View> }
		</AnimatedLinearGradient>
	)
})

const styles = StyleSheet.create({
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

	dayHours: {
		alignItems: 'flex-end',
		marginRight: hS(14)
	},

	dayHour: {
		fontFamily: 'Poppins-Medium',
		fontSize: hS(10),
		color: darkHex
	},

	main: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center'
	},

	lastUpdatedText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(11),
		color: darkHex,
		letterSpacing: .2,
		alignSelf: 'center'
	},

	headerNoteCircle: {
		width: hS(10),
		height: vS(10),
		borderRadius: 50
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

	headerNoteText: {
		fontFamily: 'Poppins-Regular',
		fontSize: hS(12),
		letterSpacing: .2,
		color: darkHex,
		marginLeft: hS(8),
		marginTop: vS(4)
	},

	container: {
		alignItems: 'center',
		justifyContent: 'space-between',
		width: hS(369),
		height: vS(400),
		borderRadius: hS(32),
		paddingHorizontal: hS(18),
		paddingTop: vS(18),
		paddingBottom: vS(8),
		marginTop: vS(27),
		overflow: 'hidden'
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
		overflow: 'visible'
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
		width: 20, 
		height: vS(180), 
		borderRadius: 100, 
		backgroundColor: `rgba(${darkRgb.join(', ')}, .12)`, 
		marginVertical: vS(10) 
	},

	recProgValue: {
		width: '100%',
		borderRadius: 100,
		position: 'absolute'
	}
})
