import { memo, useState, useRef, useMemo, useEffect } from 'react'
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
import { commonStyles } from '@utils/stylesheet'
import LinearGradient from 'react-native-linear-gradient'
import useAnimValue from '@hooks/useAnimValue'

const { 
	wfull,
	hrz, 
	blurOverlay,
	blurOverlayWrapper,
	noDataText,
	headerMainText,
	headerNoteCircle,
	headerNotes,
	headerNoteText 
} = commonStyles

const Record = memo(({ item, index, hideDetail }: { item: any, index: number, hideDetail?: boolean }) => {
	if (!hideDetail) {
		if (typeof item === 'string') {
			const [ month, date ] = item.split(' ')
			return (
				<View style={styles.rec}>
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

		const detailAnimateValue = useAnimValue(shown && 1 || 0)

		const onPress = () => {
			Animated.timing(detailAnimateValue, {
				toValue: !shown && 1 || 0,
				duration: 200,
				useNativeDriver: true
			}).start(() => { setShown(!shown) })
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
						...styles.recDetail,
						opacity: detailAnimateValue,
						transform: [{ translateY: detailAnimateValue.interpolate({
							inputRange: [0, 1],
							outputRange: [-15, 0]
						}) }]
					}}
					colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .52, y: .5 }}>
					<Text style={styles.recDetailText}>{`Total: ${detail.totalHours} hours`}</Text>
					{ totalHours !== 24 && times.map((e: any) => <Text style={styles.recDetailText}>{`${e.startTime} to ${e.endTime}`}</Text> )}
					<PolygonIcon style={styles.polygon} width={16} />
				</AnimatedLinearGradient> }
			</Pressable>
		)
	}

	return <View style={{...styles.recProg, marginLeft: index > 0 ? hS(18) : 0}} />
})

export default (): JSX.Element => {
	const animateValue = useAnimValue(0)
	const { fastingRecords } = useSelector((state: AppStore) => state.user.metadata)
	
	const { chartData, avgHoursPerDay, hours, mins, noDataFound } = useMemo(() => {
		const { chartData, avgHoursPerDay, maxMiliseconds } = handleFastingRecords(fastingRecords)
		const { hours, mins } = milisecondsToHoursMins(maxMiliseconds)
		const noDataFound: boolean = chartData.every(e => typeof e === 'string')
		return { chartData, avgHoursPerDay, hours, mins, noDataFound }
	}, [fastingRecords])

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
				...wfull,
				opacity: animateValue,
				transform: [{ translateX: animateValue.interpolate({
					inputRange: [0, 1], 
					outputRange: [-50, 0]
				}) }]
			}}>
				<Text style={headerMainText}>Fasting</Text>
				{ !noDataFound && <View style={hrz}>
					<View>
						<Text style={{...headerNoteText, marginLeft: 0 }}>Avg. per day</Text>
						<Text style={styles.value}>{avgHoursPerDay.toFixed(1)} <Text style={headerNoteText}>hrs</Text></Text>
					</View>
					<View style={styles.longestFast}>
						<Text style={{...headerNoteText, marginLeft: 0 }}>Longest fast</Text>
						<Text style={styles.value}>{hours} <Text style={headerNoteText}>h</Text> {mins} <Text style={headerNoteText}>m</Text></Text>
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
			<View style={headerNotes}>
				<View style={styles.headerNotePart}>
					<LinearGradient
						style={headerNoteCircle}
						colors={[`rgba(${primaryRgb.join(', ')}, .6)`, primaryHex]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: 1 }} />
					<Text style={headerNoteText}>Fasting</Text>
				</View>
				<View style={{...styles.headerNotePart, marginLeft: hS(38) }}>
					<View style={{...headerNoteCircle, backgroundColor: `rgba(${darkRgb.join(', ')}, .28)` }} />
					<Text style={headerNoteText}>Eating</Text>
				</View>
			</View>
			{ noDataFound && 
			<View style={blurOverlayWrapper}>
				<BlurView style={blurOverlay} blurType='light' blurAmount={3} />
				<Text style={noDataText}>No data found</Text>
			</View> }
		</LinearGradient>
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

	headerNotePart: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: hS(18)
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
		marginLeft: hS(18), 
		alignItems: 'center', 
		justifyContent: 'center'
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
	},

	recDetail: {
		position: 'absolute',
		top: hS(20),
		width: hS(132),
		borderRadius: hS(12),
		padding: hS(14)
	},

	recDetailText: {
		color: '#fff', 
		fontFamily: 'Poppins-Medium', 
		fontSize: hS(10), 
		letterSpacing: .2, 
		height: vS(15), 
		marginVertical: 3
	},

	polygon: {
		position: 'absolute', 
		bottom: vS(-25), 
		left: hS(60)
	}
})
