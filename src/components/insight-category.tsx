import { useEffect, useMemo, useRef } from 'react'
import { View, FlatList, Animated, StyleSheet } from 'react-native'
import { darkHex } from '@utils/constants/colors'
import { horizontalScale as hS, verticalScale as vS } from '@utils/responsive'
import InsightHorizontalItem from './insight-horizontal-item'
import InsightListItem from './insight-list-item'
import InsightGridItem from './insight-grid-item'

const insightTypes = {
	"grid": InsightGridItem,
	"list": InsightListItem,
	"horizontal-scroll": InsightHorizontalItem
}

export default ({ item, index }: { item: any, index: number }): JSX.Element => {
	const animateValue: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current
	const { title: category, viewType } = item

	const InsightItem = insightTypes[viewType]

	const flatListProps = useMemo(() => {
		switch (viewType) {
			case "grid": return {
				numColumns: 2,
				showsVerticalScrollIndicator: false
			}
			case "list": return {
				showsVerticalScrollIndicator: false
			}
			default: return {
				horizontal: true,
				showsHorizontalScrollIndicator: false,
				contentContainerStyle: { paddingRight: hS(24) }
			}
		}
	}, [])

	useEffect(() => {
		Animated.timing(animateValue, {
			toValue: 1,
			duration: 840, 
			useNativeDriver: true
		}).start()
	}, [])

	return (
		<Animated.View 
			style={{
				...styles.container, 
				marginTop: index > 0 ? vS(28) : 0,
				opacity: animateValue,
				transform: [{ translateY: animateValue.interpolate({
					inputRange: [0, 1],
					outputRange: [50, 0]
				}) }]
			}}>
			<View style={styles.header}>
				<Animated.Text 
					style={{
						...styles.title,
						opacity: animateValue,
						transform: [{ translateY: animateValue.interpolate({
							inputRange: [0, 1], 
							outputRange: [10, 0]
						}) }]
					}}>
					{ category }
				</Animated.Text>
			</View>
			<FlatList 
				{...flatListProps} 
				data={item.items} 
				keyExtractor={item => item.id} 
				renderItem={({ item: insight, index }) => <InsightItem {...{ item: {...insight, category }, index }} />}
			/>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center'
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: vS(15),
		paddingHorizontal: hS(24)
	},

	title: {
		color: darkHex,
		fontFamily: 'Poppins-SemiBold',
		fontSize: hS(18),
		letterSpacing: .2
	}
})
