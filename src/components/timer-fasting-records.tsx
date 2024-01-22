import { memo, useMemo } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { darkHex, darkRgb, primaryHex, primaryRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import { getMonthTitle } from '@utils/datetimes'
import { formatNum, handleFastingRecords } from '@utils/helpers'
import { BlurView } from '@react-native-community/blur'
import { AnimatedPressable } from './shared/animated'
import { commonStyles } from '@utils/stylesheet'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import LinearGradient from 'react-native-linear-gradient'

const { 
	wfull,
	hrz, 
	blurOverlayWrapper, 
	blurOverlay, 
	noDataText,
	headerMainText,
	headerNoteCircle 
} = commonStyles

const Record = memo(({ 
	item, 
	index, 
	hideDetail
}: { 
	item: any, 
	index: number, 
	hideDetail: boolean
}): JSX.Element => {

	if (!hideDetail) {
		if (typeof item === 'string') {
			const [ month, day ] = item.split(' ')
			return (
				<View style={{...styles.rec, marginLeft: (index > 0 ? hS(15) : 0)}}>
					<Text></Text>
					<LinearGradient
						style={styles.recProg}
						colors={[`rgba(${darkRgb.join(', ')}, .05)`, `rgba(${darkRgb.join(', ')}, .2)`]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: 1 }} />
					<View style={{ alignItems: 'center', marginTop: vS(7) }}>
						<Text style={styles.recText}>{day}</Text>
						<Text style={{...styles.recText, marginTop: vS(-2) }}>{month}</Text>
					</View>
				</View>
			)
		}

		const { date, records } = item 
		const [ y, m, d ] = date.split('-')
		const monthTitle = getMonthTitle(m - 1, true)
		const totalHours = useMemo(() => records.reduce((acc: any, cur: any) => acc + cur.totalHours, 0), []) 

		return (
			<View key={index} style={{...styles.rec, marginLeft: (index > 0 ? hS(15) : 0) }}>
				<Text style={{...styles.recText, height: vS(22) }}>{totalHours > 0 ? `${totalHours}h` : ''}</Text>
				<LinearGradient
					style={styles.recProg}
					colors={[`rgba(${darkRgb.join(', ')}, .05)`, `rgba(${darkRgb.join(', ')}, .2)`]}
					start={{ x: .5, y: 0 }}
					end={{ x: .5, y: 1 }}>
					<LinearGradient
						style={{
							...styles.recProgValue,
							height: '100%',
							top: `${100 - totalHours / 24 * 100}%`
						}}
						colors={[`rgba(${primaryRgb.join(', ')}, .2)`, primaryHex]}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: 1 }} />
				</LinearGradient>
				<View style={{ alignItems: 'center', marginTop: vS(7) }}>
					<Text style={styles.recText}>{formatNum(d)}</Text>
					<Text style={{...styles.recText, marginTop: vS(-2) }}>{monthTitle}</Text>
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
})

export default withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }): JSX.Element => {
	const fastingRecords = useSelector((state: AppStore) => state.user.metadata.fastingRecords)
	const { chartData } = useMemo(() => handleFastingRecords(fastingRecords), [fastingRecords])
	const noDataFound: boolean = chartData.every(e => typeof e === 'string')

	if (!isViewable) return <View style={styles.container} />

	return (
		<Animated.View style={{...styles.container, opacity: animateValue }}>
			<View style={wfull}>
				<Animated.Text style={{
					...headerMainText, 
					opacity: animateValue, 
					transform: [{ translateX: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-50, 0]
					}) }]
				}}>
					Fasting records
				</Animated.Text>
				<Animated.View style={{
					...hrz, 
					marginTop: vS(8), 
					opacity: animateValue, 
					transform: [{ translateY: animateValue.interpolate({
						inputRange: [0, 1], 
						outputRange: [-30, 0]
					}) }]
				}}>
					<View style={hrz}>
						<LinearGradient
							style={headerNoteCircle}
							colors={[`rgba(${primaryRgb.join(', ')}, .3)`, primaryHex]}
							start={{ x: .5, y: 0 }}
							end={{ x: .5, y: 1 }}
						/>
						<Text style={styles.noteTitle}>Completed</Text>
					</View>
					<View style={{...hrz, marginLeft: hS(38) }}>
						<LinearGradient
							style={headerNoteCircle}
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
				renderItem={({ item, index }) => <Record {...{ item, index, hideDetail: noDataFound }} />}
			/>
			<AnimatedPressable style={{...styles.timelineRef, opacity: animateValue }}>
				<Text style={styles.timelineText}>Timeline</Text>
			</AnimatedPressable>
			{ noDataFound && 
			<View style={blurOverlayWrapper}>
				<BlurView style={blurOverlay} blurType='light' blurAmount={6} />
				<Text style={noDataText}>No data found</Text>
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
		borderRadius: 100,
		justifyContent: 'flex-end',
		overflow: 'hidden'
	},

	recProgValue: {
		width: '100%',
		borderRadius: 100,
		position: 'absolute'
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
