import { useState, useRef, useMemo, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text, Animated, Pressable } from 'react-native'
import { darkHex, darkRgb, primaryHex, primaryRgb, lightHex, lightRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import { getMonthTitle, milisecondsToHoursMins } from '@utils/datetimes'
import { autoId, formatNum, handleFastingRecords } from '@utils/helpers'
import { BlurView } from '@react-native-community/blur'
import { PolygonIcon } from '@assets/icons'
import { AnimatedLinearGradient } from './shared/animated'
import LinearGradient from 'react-native-linear-gradient'
import { commonStyles } from '@utils/stylesheet'

const Record = ({ item, index, hideDetail }: { item: any, index: number, hideDetail?: boolean }) => {
	if (!hideDetail) {
		if (typeof item === 'string') {
			const [ month, date ] = item.split(' ')
			return (
				<View key={index} style={{ marginLeft: hS(18), alignItems: 'center', justifyContent: 'center' }}>
					<Text style={styles.recText}>{month}</Text>
					<View style={styles.recProg} />
					<Text style={styles.recText}>{date}</Text>
				</View>
			)
		}

		const [ shown, setShown ] = useState<boolean>(false)
		const { date, records } = item
		const [ y, m, d ] = date.split('-')
		const monthTitle = getMonthTitle(m - 1, true)
		console.log('\n')

		const detail = useMemo(() => {
			return records.reduce((acc: any, cur: any) => {
				const { startTime, endTime, totalHours } = cur
				const [ s1, s2 ] = startTime.split(' ')
				const [ hours, mins ] = s1.split(':').map(Number)
				const hoursPassed = hours + (s2 === 'PM' && (hours === 12 ? 0 : 12)) + mins / 60

				const Component = () => {
					return (
					<LinearGradient
						style={{...styles.recProgValue, height: `${totalHours / 24 * 100}%`, top: `${hoursPassed / 24 * 100}%` }}
						colors={[`rgba(${primaryRgb.join(', ')}, .36)`, primaryHex]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: 1 }} 
					/>
					)
				}
	
				return {
					totalHours: acc.totalHours + totalHours,
					times: [...acc.times, { startTime, endTime }],
					components: [...acc.components, Component]
				}
	
			}, { totalHours: 0, times: [], components: [] })
		}, [])

		const { totalHours, times, components } = detail

		const DayRecords = () => <>
			{ components.map((e: any, i: number) => {
				const Component = e
				return <Component key={`${i}-${autoId('k')}`} />
			}) }
		</>

		const detailAnimateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(shown && 1 || 0)).current

		const onPress = () => {
			Animated.timing(detailAnimateValue, {
				toValue: !shown && 1 || 0,
				duration: 200,
				useNativeDriver: true
			}).start(() => {
				setShown(!shown)
			})
		}

		return (
			<Pressable style={{ marginLeft: index > 0 ? hS(18) : 0, alignItems: 'center', position: 'relative' }} {...{ onPress }}>
				<Text style={styles.recText}>{monthTitle}</Text>
				<View style={styles.recProg}>
					<DayRecords />
				</View>
				<Text style={styles.recText}>{formatNum(d)}</Text>
				{ shown && 
				<AnimatedLinearGradient 
					style={{
						position: 'absolute',
						top: hS(20),
						width: hS(132),
						borderRadius: hS(12),
						padding: hS(14),
						opacity: detailAnimateValue,
						transform: [{ translateY: detailAnimateValue.interpolate({
							inputRange: [0, 1],
							outputRange: [-15, 0]
						}) }]
					}}
					colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .52, y: .5 }}>
					<Text style={{ 
						color: '#fff', 
						fontFamily: 'Poppins-Medium', 
						fontSize: hS(10), 
						letterSpacing: .2, 
						height: vS(15), 
						marginVertical: 3
					}}>
						{`Total: ${detail.totalHours} hours`}
					</Text>
					{ 	
						totalHours !== 24 && times.map((e: any) => 
						<Text style={{ 
							color: '#fff', 
							fontFamily: 'Poppins-Medium', 
							fontSize: hS(10), 
							letterSpacing: .2, 
							marginVertical: 3, 
							height: vS(15) 
						}}>
							{`${e.startTime} to ${e.endTime}`}
						</Text> ) 
					}
					<PolygonIcon style={{ position: 'absolute', bottom: vS(-25), left: hS(60) }} width={16} />
				</AnimatedLinearGradient> }
			</Pressable>
		)
	}

	return <View style={{...styles.recProg, marginLeft: index > 0 ? hS(18) : 0}} />
}

export default (): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const fastingRecords = useSelector((state: AppStore) => state.user.metadata.fastingRecords)
	const { chartData, avgHoursPerDay, maxMiliseconds } = useMemo(() => handleFastingRecords(fastingRecords), [fastingRecords])
	const { hours, mins } = milisecondsToHoursMins(maxMiliseconds)
	const noDataFound: boolean = chartData.every(e => typeof e === 'string')

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1,
			duration: 320,
			useNativeDriver: true
		}).start()
	}, [])

	return (
		<LinearGradient
			style={styles.container}
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
				<Text style={styles.headerMainText}>Fasting</Text>
				{ !noDataFound && <View style={commonStyles.hrz}>
					<View>
						<Text style={{...styles.headerNoteText, marginLeft: 0 }}>Avg. per day</Text>
						<Text style={styles.value}>{avgHoursPerDay.toFixed(1)} <Text style={styles.headerNoteText}>hrs</Text></Text>
					</View>
					<View style={styles.longestFast}>
						<Text style={{...styles.headerNoteText, marginLeft: 0 }}>Longest fast</Text>
						<Text style={styles.value}>{hours} <Text style={styles.headerNoteText}>h</Text> {mins} <Text style={styles.headerNoteText}>m</Text></Text>
					</View>
				</View> }
			</Animated.View>
			<View style={styles.main}>
				<View style={styles.dayHours}>
				{
					['00:00 AM', '06:00 AM', '12:00 PM', '06:00 PM', '00:00 AM']
					.map((e, i) => <Text key={i} style={{...styles.dayHour, marginTop: i > 0 ? vS(24) : 0}}>{e}</Text>)
				}
				</View>
				<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.records}>
					{ chartData.map((e, i) => <Record key={`${i}-${autoId('k')}`} {...{ item: e, index: i, hideDetail: noDataFound }}/>) }
				</ScrollView>
			</View>
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
			{ noDataFound && 
			<View style={styles.blurOverlayWrapper}>
				<BlurView style={styles.blurOverlay} blurType='light' blurAmount={3} />
				<Text style={styles.noDataText}>No data found</Text>
			</View> }
		</LinearGradient>
	)
}

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
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	headerNotePart: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: hS(18)
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
		height: vS(440),
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

	value: {
		fontFamily: 'Poppins-SemiBold',
      fontSize: hS(28), 
      color: darkHex, 
      letterSpacing: .2
	},

	longestFast: {
		marginLeft: hS(36)
	},

	records: {
		width: '100%',
		overflow: 'visible',
		marginBottom: 2
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
		backgroundColor: `rgba(${darkRgb.join(', ')}, .12)`, 
		marginVertical: vS(10) 
	},

	recProgValue: {
		width: '100%',
		position: 'absolute'
	}
})
