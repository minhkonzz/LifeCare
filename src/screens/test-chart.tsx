import { useCallback, useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Pressable, FlatList } from 'react-native'
import { Colors } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { getDatesRange } from '@utils/datetimes'
import LinearGradient from 'react-native-linear-gradient'

const { hex: darkHex, rgb: darkRgb } = Colors.darkPrimary
const { hex: primaryHex, rgb: primaryRgb } = Colors.primary
const { hex: lightHex, rgb: lightRgb } = Colors.lightPrimary
import fastingRecordsData from '@assets/data/timer-fasting-records.json'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const fastingRecords = getDatesRange(122).map(e => ({ date: e.value, totalHours: fastingRecordsData[e.value] ?? 0 }))

const FastingRecordChart2 = (): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const progressAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

	useEffect(() => {
		Animated.parallel([
			Animated.timing(animateValue, {
				toValue: 1,
				duration: 1010,
				useNativeDriver: true
			}), 
			Animated.timing(progressAnimateValue, {
				toValue: 1, 
				duration: 1010, 
				delay: 500, 
				useNativeDriver: false
			})
		]).start()
	}, [])

	const FastingRecord = useCallback(({ item, index }) => {
		const startTime = item.startTime
		const [ s1, s2 ] = startTime.split(" ")
		const [ hours, mins ] = s1.split(":").map(Number)
		const hoursPassed = hours + (s2 === 'PM' ? 12 : hours === 12 ? -12 : 0) + (mins > 50 ? 1 : 0)

		return (
			<Pressable style={{ marginLeft: index > 0 ? hS(18) : 0, alignItems: 'center' }}>
				<Text style={styles.recText}>Nov</Text>
				<View style={{ width: 20, height: vS(180), borderRadius: 100, backgroundColor: `rgba(${darkRgb.join(', ')}, .28)`, marginVertical: vS(10) }}>
					<View style={{ 
						backgroundColor: primaryHex, 
						width: '100%', 
						borderRadius: 100, 
						height: `${item.totalHours / 24 * 100}%`,
						top: `${Math.floor(hoursPassed / 24 * 100)}%`,
						position: 'absolute'
					}}/>
				</View>
				<Text style={styles.recText}>29</Text>
			</Pressable>
		)
	}, [])

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
				<FlatList 
					horizontal
					showsHorizontalScrollIndicator={false}
					data={[
						{
							startTime: '2:00 AM',
							endTime: '06:00 AM',
							totalHours: Math.round(4) // lam tron xuong
						}, 
						{
							startTime: '12:00 AM',
							endTime: '12:00 AM',
							totalHours: 24
						},
						{
							startTime: '12:00 AM',
							endTime: '3:15 AM',
							totalHours: Math.round(3.263888888888889)
						}
					]} 
					renderItem={({ item, index }) => <FastingRecord {...{ item, index }} />} />
			</View>
			{/* <Animated.FlatList
				style={{...styles.records, opacity: animateValue }}
				horizontal
				showsHorizontalScrollIndicator={false}
				data={fastingRecordsData}
				renderItem={({ item, index }) => (
					<View key={index} style={{...styles.rec, marginLeft: (index > 0 ? hS(15) : 0) }}>
						<Text style={{...styles.recText, height: vS(22) }}>{item.hrs > 0 ? `${item.hrs}h` : ''}</Text>
						<LinearGradient
							style={styles.recProg}
							colors={[`rgba(${darkRgb.join(', ')}, .05)`, `rgba(${darkRgb.join(', ')}, .2)`]}
							start={{ x: .5, y: 0 }}
							end={{ x: .5, y: 1 }}>
							<AnimatedLinearGradient
								style={{
									...styles.recProgValue, 
									height: progressAnimateValue.interpolate({
										inputRange: [0, 1], 
										outputRange: ['0%', `${item.hrs / 24 * 100}%`]
									})
								}}
								colors={[`rgba(${primaryRgb.join(', ')}, .2)`, primaryHex]}
								start={{ x: .5, y: 0 }}
								end={{ x: .5, y: 1 }} />
						</LinearGradient>
						<View style={{ alignItems: 'center', marginTop: vS(7) }}>
							<Text style={styles.recText}>{item.day}</Text>
							<Text style={{...styles.recText, marginTop: vS(-2) }}>{item.month}</Text>
						</View>
					</View>
				)}
			/> */}
			<Animated.Text style={{...styles.lastUpdatedText, opacity: animateValue }}>Last updated 3 minutes</Animated.Text>
		</AnimatedLinearGradient>
	)
}

// const FastingRecordChart1 = (): JSX.Element => {
// 	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
// 	const progressAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current

// 	useEffect(() => {
// 		Animated.parallel([
// 			Animated.timing(animateValue, {
// 				toValue: 1, 
// 				duration: 840, 
// 				useNativeDriver: true
// 			}), 
// 			Animated.timing(progressAnimateValue, {
// 				toValue: 1, 
// 				duration: 840, 
// 				delay: 500, 
// 				useNativeDriver: false
// 			})
// 		]).start()
// 	}, [])

// 	const handleFastingRecords = useCallback((start_time_stamp: number, end_time_stamp: number) => {
// 		const startDate = new Date(start_time_stamp)
// 		const endDate = new Date(end_time_stamp)
// 		const fastingData: any[] = []

// 		const currentDate = new Date(startDate)
// 		while (currentDate <= endDate) {
// 			const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
// 			const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)

// 			const startTimeStamp = Math.max(startOfDay.getTime(), startDate.getTime())
// 			const endTimeStamp = Math.min(endOfDay.getTime(), endDate.getTime())

// 			const totalMilliseconds = endTimeStamp - startTimeStamp
// 			const totalHours = totalMilliseconds / (1000 * 60 * 60)

// 			if (totalHours >= 1) {
// 				const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' })
// 				const startTime = formatter.format(new Date(startTimeStamp))
// 				const endTime = formatter.format(new Date(endTimeStamp))
// 				const date = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
// 				fastingData.push({ date, startTime, endTime, totalHours })
// 			}

// 			currentDate.setDate(currentDate.getDate() + 1)
// 		}
// 		return fastingData
// 	}, [])

// 	return (
// 		<Animated.View style={{...styles.container, opacity: animateValue }}>
// 			<View style={styles.header}>
// 				<Animated.Text 
// 					style={{
// 						...styles.title, 
// 						opacity: animateValue, 
// 						transform: [{ translateX: animateValue.interpolate({
// 							inputRange: [0, 1], 
// 							outputRange: [-50, 0]
// 						}) }]
// 					}}>
// 					Fasting records
// 				</Animated.Text>
// 				<Animated.View style={{
// 					...styles.hrz, 
// 					marginTop: vS(8), 
// 					opacity: animateValue, 
// 					transform: [{ translateY: animateValue.interpolate({
// 						inputRange: [0, 1], 
// 						outputRange: [-30, 0]
// 					}) }]
// 				}}>
// 					<View style={styles.hrz}>
// 						<LinearGradient
// 							style={styles.noteColor}
// 							colors={[`rgba(${primaryRgb.join(', ')}, .3)`, primaryHex]}
// 							start={{ x: .5, y: 0 }}
// 							end={{ x: .5, y: 1 }}
// 						/>
// 						<Text style={styles.noteTitle}>Completed</Text>
// 					</View>
// 					<View style={{...styles.hrz, marginLeft: hS(38) }}>
// 						<LinearGradient
// 							style={styles.noteColor}
// 							colors={[`rgba(${darkRgb.join(', ')}, .05)`, `rgba(${darkRgb.join(', ')}, .2)`]}
// 							start={{ x: .5, y: 0 }}
// 							end={{ x: .5, y: 1 }}
// 						/>
// 						<Text style={styles.noteTitle}>Not completed</Text>
// 					</View>
// 				</Animated.View>
// 			</View>
// 			<Animated.FlatList
// 				style={{...styles.records, opacity: animateValue }}
// 				horizontal
// 				showsHorizontalScrollIndicator={false}
// 				data={fastingRecords}
// 				renderItem={({ item, index }) => (
// 					<View key={index} style={{...styles.rec, marginLeft: (index > 0 ? hS(15) : 0) }}>
// 						<Text style={{...styles.recText, height: vS(22) }}>{item.totalHours > 0 ? `${item.totalHours}h` : ''}</Text>
// 						<LinearGradient
// 							style={styles.recProg}
// 							colors={[`rgba(${darkRgb.join(', ')}, .05)`, `rgba(${darkRgb.join(', ')}, .2)`]}
// 							start={{ x: .5, y: 0 }}
// 							end={{ x: .5, y: 1 }}>
// 							<AnimatedLinearGradient
// 								style={{
// 									...styles.recProgValue, 
// 									height: progressAnimateValue.interpolate({
// 										inputRange: [0, 1], 
// 										outputRange: ['0%', `${item.totalHours / 24 * 100}%`]
// 									}) 
// 								}}
// 								colors={[`rgba(${primaryRgb.join(', ')}, .2)`, primaryHex]}
// 								start={{ x: .5, y: 0 }}
// 								end={{ x: .5, y: 1 }} />
// 						</LinearGradient>
// 						<View style={{ alignItems: 'center', marginTop: vS(7) }}>
// 							<Text style={styles.recText}>{item.date.split(' ')[1]}</Text>
// 							<Text style={{...styles.recText, marginTop: vS(-2) }}>{item.date.split(' ')[0]}</Text>
// 						</View>
// 					</View>
// 				)}
// 			/>
// 			<AnimatedPressable style={{...styles.timelineRef, opacity: animateValue }}>
// 				<Text style={styles.timelineText}>Timeline</Text>
// 			</AnimatedPressable>
// 		</Animated.View> || <View style={styles.container} />
// 	)
// }

export default () => {
   return (
      <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
         <FastingRecordChart2 />
      </View>
   )
}

const styles = StyleSheet.create({
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
		// backgroundColor: '#fff',
		width: hS(369),
		height: vS(400),
		borderRadius: hS(32),
		// elevation: 12,
		// shadowColor: `rgba(${darkRgb.join(', ')}, .7)`,
		paddingHorizontal: hS(18),
		paddingTop: vS(18),
		paddingBottom: vS(8),
		marginTop: vS(27)
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
		marginTop: vS(20)
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
