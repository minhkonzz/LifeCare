import { useState, useRef } from 'react'
import { View, Text, StyleSheet, Animated, ScrollView, Pressable } from 'react-native'
import { darkHex, darkRgb } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import { BluePlusIcon } from '@assets/icons'
import { useSelector } from 'react-redux'
import { AppStore } from '../store'
import { getDatesRange, getMonthTitle } from '@utils/datetimes'
import { formatNum } from '@utils/helpers'
import { BlurView } from '@react-native-community/blur'
import { PolygonIcon } from '@assets/icons'
import { useNavigation } from '@react-navigation/native'
import { AnimatedLinearGradient, AnimatedTouchableOpacity } from './shared/animated'
import { commonStyles } from '@utils/stylesheet'
import withVisiblitySensor from '@hocs/withVisiblitySensor'
import LinearGradient from 'react-native-linear-gradient'

const { blurOverlay, blurOverlayWrapper, noDataText } = commonStyles

const Record = ({ item, index, hideDetail }: { item: any, index: number, hideDetail: boolean }) => {
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

		const { id, date, value, goal } = item
		const [ y, m, d ] = date.split('-')
		const monthTitle = getMonthTitle(m - 1, true)
		const [ shown, setShown ] = useState<boolean>(false)
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
			<Pressable 
				style={{ 
					position: 'relative',
					alignItems: 'center', 
					marginLeft: hS(18),
					justifyContent: 'center'
				}}
				{...{ onPress }}>
				<Text style={styles.recText}>{monthTitle}</Text>
				<View style={styles.recProg}>
					<AnimatedLinearGradient
						style={{...styles.recProgValue, height: `${value / goal * 100}%` }}
						colors={['rgba(120, 193, 243, .36)', '#78C1F3']}
						start={{ x: .5, y: 0 }}
						end={{ x: .5, y: 1 }} 
					/>
				</View>
				<Text style={styles.recText}>{formatNum(d)}</Text>
				{ shown && 
				<AnimatedLinearGradient 
					style={{
						position: 'absolute',
						top: hS(20),
						width: hS(120),
						height: vS(65),
						borderRadius: hS(12),
						justifyContent: 'center', 
						alignItems: 'center',
						opacity: detailAnimateValue,
						transform: [{ translateY: detailAnimateValue.interpolate({
							inputRange: [0, 1],
							outputRange: [-15, 0]
						}) }]
					}}
					colors={[`rgba(${darkRgb.join(', ')}, .6)`, darkHex]}
					start={{ x: .5, y: 0 }}
					end={{ x: .52, y: .5 }}>
					<Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: hS(10), letterSpacing: .2 }}>{`Drinked: ${value}ml`}</Text>
					<Text style={{ color: '#fff', fontFamily: 'Poppins-Medium', fontSize: hS(10), letterSpacing: .2, marginTop: vS(5) }}>{`Goal: ${goal}ml`}</Text>
					<PolygonIcon style={{ position: 'absolute', bottom: vS(-25) }} width={16} />
				</AnimatedLinearGradient> }
			</Pressable>
		)
	}
	return <View style={{...styles.recProg, marginLeft: index > 0 ? hS(18) : 0 }} />
}

export default withVisiblitySensor(({ isViewable, animateValue }: { isViewable: boolean, animateValue: Animated.Value }): JSX.Element => {
	const waterRecords = useSelector((state: AppStore) => state.user.metadata.waterRecords)
	const navigation = useNavigation<any>()

	const standardWaterRecords = waterRecords.reduce((acc: any, cur: any) => {
		const { id, date, value, goal } = cur
		acc[date] = { id, value, goal }
		return acc
	}, {})

	const chartData = getDatesRange(122).map(e => {
		const r = standardWaterRecords[e.value]
		if (r) {
			const { value, goal, id } = r
			return { date: e.value, value, goal, id }
		}
		return `${getMonthTitle(e.month, true)} ${formatNum(e.date)}`
	})

	const noDataFound: boolean = chartData.every(e => typeof e === 'string')

	// if (!isViewable) return <View style={styles.container} />

	return (
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
					activeOpacity={.8}
					onPress={() => navigation.navigate('water')}>
					<BluePlusIcon width={hS(14)} height={vS(15.3)} />
				</AnimatedTouchableOpacity>
			</View>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.records} contentContainerStyle={{ alignItems: 'center' }}>
				{ chartData.map((e, i) => <Record key={i} {...{ item: e, index: i, hideDetail: noDataFound }} />) }
			</ScrollView>
			<Animated.Text style={{...styles.lastUpdatedText, opacity: animateValue }}>Last updated 3 minutes</Animated.Text>
			{ noDataFound && 
			<View style={blurOverlayWrapper}>
				<BlurView style={blurOverlay} blurType='light' blurAmount={3} />
				<Text style={noDataText}>No data found</Text>
			</View> }
		</AnimatedLinearGradient>
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
		borderRadius: hS(24),
		overflow: 'hidden',
		position: 'relative'
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
		position: 'absolute',
		top: 0, 
		left: 0,
		width: '100%',
		height: vS(450),
		overflow: 'visible',
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
